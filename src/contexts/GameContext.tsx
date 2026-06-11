/*
 * v2 状態管理（プロフィール対応・spec §9 / §6-3）
 * - 起動時に profiles / settings / customQuestions / v1検出 を読み込む
 * - selectProfile 時に「日付戻しガード＋日替わり＋月スタンプ」を正規化して保存（spec §6-3）
 * - updateSave / updateSettings は保存失敗（容量超過等）を握りつぶさず SaveResult を返し、
 *   lastSaveError にも残す（UI が容量警告を出せる・spec §9-5）
 * - v1 データの移行はプロフィール作成時（migrateV1=true）に migrateV1ToProfile を呼ぶ
 */
/* eslint-disable react-refresh/only-export-components --
   Context と useGame フックは同じファイルに置く設計（画面係の import 先を1つにする）。
   Fast Refresh はこのファイル編集時のみフルリロードになるが実害なし。 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type {
  ChildSettings,
  Grade,
  Profile,
  Question,
  SaveData,
  Settings,
} from '../types'
import { DEFAULT_CHILD_SETTINGS, newSaveData } from '../lib/constants'
import { isDateBefore, monthStr, todayStr } from '../lib/dateUtil'
import { storage } from '../lib/storage'
import type { SaveResult } from '../lib/storage'
import { detectV1Data, migrateV1ToProfile } from '../lib/migration'

export interface GameContextValue {
  ready: boolean
  profiles: Profile[]
  currentProfileId: string | null
  currentProfile: Profile | null
  settings: Settings
  save: SaveData | null
  childSettings: ChildSettings
  hasV1Data: boolean
  selectProfile(id: string): void
  clearCurrentProfile(): void
  createProfile(input: {
    name: string
    grade: Grade
    iconId: string
    migrateV1?: boolean
  }): Profile
  deleteProfile(id: string): void
  updateSave(updater: (s: SaveData) => SaveData): SaveResult
  updateSettings(updater: (s: Settings) => Settings): SaveResult
  customQuestions: Question[]
  refreshCustomQuestions(): void
  lastSaveError: string | null
}

const GameContext = createContext<GameContextValue | null>(null)

function generateProfileId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
  } catch {
    // 古い環境では下のフォールバックへ
  }
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/** 子別設定の既定値（ネストも複製して共有参照を避ける） */
function freshChildSettings(): ChildSettings {
  return {
    ...DEFAULT_CHILD_SETTINGS,
    coinRewards: { ...DEFAULT_CHILD_SETTINGS.coinRewards },
  }
}

/**
 * 日付戻しガード＋日替わり＋月スタンプの正規化（spec §6-3）。
 * - 端末日付が lastPlayedDate より過去（時計の巻き戻し）→ 同日扱い：何も変えない
 *   （ガチャ回数も月カウンタもリセットしない＝巻き戻しで上限を回避できない）
 * - 通常の日替わり → dailyGachaCount=0・lastPlayedDate を今日に
 * - 月が変わっていたら monthly を当月スタンプ {month, coins:0, harvested:0} に
 * 変更が無ければ同一参照を返す（保存スキップ判定に使う）。
 */
export function normalizeSaveForToday(
  save: SaveData,
  today: string = todayStr(),
  month: string = monthStr()
): SaveData {
  if (isDateBefore(today, save.lastPlayedDate)) return save
  let next = save
  if (save.lastPlayedDate !== today) {
    next = { ...next, lastPlayedDate: today, dailyGachaCount: 0 }
  }
  if (next.monthly.month !== month) {
    next = { ...next, monthly: { month, coins: 0, harvested: 0 } }
  }
  return next
}

export function GameProvider(props: { children: ReactNode }) {
  // 起動時読み込み：localStorage は同期なので lazy initializer で読む（effect 内 setState を避ける）
  const [profiles, setProfiles] = useState<Profile[]>(() => storage.getProfiles())
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null)
  const [save, setSaveState] = useState<SaveData | null>(null)
  const [settings, setSettingsState] = useState<Settings>(() => storage.getSettings())
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() =>
    storage.getCustomQuestions()
  )
  const [hasV1Data, setHasV1Data] = useState<boolean>(() => detectV1Data())
  const [lastSaveError, setLastSaveError] = useState<string | null>(null)

  // 同期読み込みのため常に true（将来 非同期ストレージに変える時の口として残す）
  const ready = true

  // 同一イベント内で連続呼び出しされても最新値を参照できるよう ref を併用する
  const profilesRef = useRef<Profile[]>(profiles)
  const currentProfileIdRef = useRef<string | null>(null)
  const saveRef = useRef<SaveData | null>(null)
  const settingsRef = useRef<Settings>(settings)

  const commitProfiles = useCallback((list: Profile[]) => {
    profilesRef.current = list
    setProfiles(list)
  }, [])

  const commitCurrentProfileId = useCallback((id: string | null) => {
    currentProfileIdRef.current = id
    setCurrentProfileId(id)
  }, [])

  const commitSave = useCallback((s: SaveData | null) => {
    saveRef.current = s
    setSaveState(s)
  }, [])

  const commitSettings = useCallback((s: Settings) => {
    settingsRef.current = s
    setSettingsState(s)
  }, [])

  // ---- プロフィール選択（§6-3 の正規化を適用して保存） ----
  const selectProfile = useCallback(
    (id: string) => {
      const profile = profilesRef.current.find((p) => p.id === id)
      if (!profile) return
      const loaded = storage.getSave(id)
      const base = loaded ?? newSaveData(todayStr(), monthStr())
      const normalized = normalizeSaveForToday(base)
      if (loaded === null || normalized !== base) {
        const res = storage.saveSave(id, normalized)
        if (!res.ok) setLastSaveError(res.error ?? 'セーブの保存に失敗しました')
      }
      commitCurrentProfileId(id)
      commitSave(normalized)
    },
    [commitCurrentProfileId, commitSave]
  )

  const clearCurrentProfile = useCallback(() => {
    commitCurrentProfileId(null)
    commitSave(null)
  }, [commitCurrentProfileId, commitSave])

  // ---- プロフィール作成（migrateV1=true なら v1 データを引き継ぐ・spec §9-2） ----
  const createProfile = useCallback(
    (input: { name: string; grade: Grade; iconId: string; migrateV1?: boolean }): Profile => {
      const profile: Profile = {
        id: generateProfileId(),
        name: input.name,
        grade: input.grade,
        iconId: input.iconId,
      }
      const nextProfiles = [...profilesRef.current, profile]
      const rp = storage.saveProfiles(nextProfiles)
      if (!rp.ok) setLastSaveError(rp.error ?? 'プロフィールの保存に失敗しました')
      commitProfiles(nextProfiles)

      if (input.migrateV1 && detectV1Data()) {
        const report = migrateV1ToProfile(profile.id, input.grade)
        if (!report.ok) {
          setLastSaveError('旧データの移行に失敗しました（容量不足の可能性）。旧データは残っています。')
        }
        // 移行で settings / customQuestions / セーブが書き換わったので読み直す
        commitSettings(storage.getSettings())
        setCustomQuestions(storage.getCustomQuestions())
        setHasV1Data(detectV1Data())
      } else {
        const fresh = newSaveData(todayStr(), monthStr())
        const rs = storage.saveSave(profile.id, fresh)
        if (!rs.ok) setLastSaveError(rs.error ?? 'セーブの作成に失敗しました')
      }

      // perChild に既定を補完（移行時は migrateV1ToProfile が設定済み）
      const current = settingsRef.current
      if (!current.perChild[profile.id]) {
        const nextSettings: Settings = {
          ...current,
          perChild: { ...current.perChild, [profile.id]: freshChildSettings() },
        }
        const rset = storage.saveSettings(nextSettings)
        if (rset.ok) commitSettings(nextSettings)
        else setLastSaveError(rset.error ?? '設定の保存に失敗しました')
      }

      return profile
    },
    [commitProfiles, commitSettings]
  )

  // ---- プロフィール削除（一覧から除外＋セーブ削除＋子別設定の掃除） ----
  const deleteProfile = useCallback(
    (id: string) => {
      const nextProfiles = profilesRef.current.filter((p) => p.id !== id)
      const rp = storage.saveProfiles(nextProfiles)
      if (!rp.ok) setLastSaveError(rp.error ?? 'プロフィールの保存に失敗しました')
      commitProfiles(nextProfiles)
      storage.resetProfileSave(id)

      const current = settingsRef.current
      if (current.perChild[id]) {
        const nextPerChild = { ...current.perChild }
        delete nextPerChild[id]
        const nextSettings: Settings = { ...current, perChild: nextPerChild }
        const rs = storage.saveSettings(nextSettings)
        if (rs.ok) commitSettings(nextSettings)
        else setLastSaveError(rs.error ?? '設定の保存に失敗しました')
      }

      if (currentProfileIdRef.current === id) {
        commitCurrentProfileId(null)
        commitSave(null)
      }
    },
    [commitProfiles, commitSettings, commitCurrentProfileId, commitSave]
  )

  // ---- セーブ更新（updater 適用 → 保存 → 失敗は lastSaveError へ） ----
  const updateSave = useCallback(
    (updater: (s: SaveData) => SaveData): SaveResult => {
      const pid = currentProfileIdRef.current
      const cur = saveRef.current
      if (!pid || !cur) {
        const result: SaveResult = { ok: false, error: 'プロフィールが選択されていません' }
        setLastSaveError(result.error ?? null)
        return result
      }
      const next = updater(cur)
      const res = storage.saveSave(pid, next)
      // 画面の整合性を保つためメモリ上は常に反映し、失敗は警告として残す（spec §9-5）
      commitSave(next)
      if (res.ok) setLastSaveError(null)
      else setLastSaveError(res.error ?? 'セーブの保存に失敗しました（容量不足の可能性）')
      return res
    },
    [commitSave]
  )

  // ---- 設定更新 ----
  const updateSettings = useCallback(
    (updater: (s: Settings) => Settings): SaveResult => {
      const next = updater(settingsRef.current)
      const res = storage.saveSettings(next)
      commitSettings(next)
      if (res.ok) setLastSaveError(null)
      else setLastSaveError(res.error ?? '設定の保存に失敗しました（容量不足の可能性）')
      return res
    },
    [commitSettings]
  )

  const refreshCustomQuestions = useCallback(() => {
    setCustomQuestions(storage.getCustomQuestions())
  }, [])

  const currentProfile = useMemo(
    () => profiles.find((p) => p.id === currentProfileId) ?? null,
    [profiles, currentProfileId]
  )

  const childSettings = useMemo<ChildSettings>(() => {
    if (currentProfileId) {
      const cs = settings.perChild[currentProfileId]
      if (cs) return cs
    }
    return DEFAULT_CHILD_SETTINGS
  }, [currentProfileId, settings])

  const value = useMemo<GameContextValue>(
    () => ({
      ready,
      profiles,
      currentProfileId,
      currentProfile,
      settings,
      save,
      childSettings,
      hasV1Data,
      selectProfile,
      clearCurrentProfile,
      createProfile,
      deleteProfile,
      updateSave,
      updateSettings,
      customQuestions,
      refreshCustomQuestions,
      lastSaveError,
    }),
    [
      ready,
      profiles,
      currentProfileId,
      currentProfile,
      settings,
      save,
      childSettings,
      hasV1Data,
      selectProfile,
      clearCurrentProfile,
      createProfile,
      deleteProfile,
      updateSave,
      updateSettings,
      customQuestions,
      refreshCustomQuestions,
      lastSaveError,
    ]
  )

  return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) {
    throw new Error('useGame は <GameProvider> の中でのみ使えます')
  }
  return ctx
}

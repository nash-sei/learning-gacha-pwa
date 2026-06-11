/*
 * v1 → v2 データ移行（spec §9-2）
 * - 旧キー learning_gacha_user / _settings / _custom_questions を検出
 * - プロフィール1へ割当て：coins / treeCoins / 月実績（=おこづかい実績・最優先・月スタンプ化）/
 *   unlockedSeals / questionClearCounts / カスタム問題 / 親設定 を引き継ぐ
 * - 移行完了後、旧キーを lg1_backup_* に改名（削除しない＝巻き戻し保険・二重移行を構造的に防ぐ）
 */
import type {
  Answer,
  ChildSettings,
  Difficulty,
  Grade,
  Question,
  Rarity,
  SaveData,
} from '../types'
import {
  DATA_VERSION,
  DEFAULT_CHILD_SETTINGS,
  STORAGE_KEYS,
  V1_KEYS,
  newSaveData,
} from './constants'
import { monthStr, todayStr } from './dateUtil'
import { storage } from './storage'

// ---- v1 のデータ形（移行のためだけのローカル型） ----
interface V1User {
  coins?: number
  monthlyCoins?: number
  treeCoins?: number
  lastPlayedDate?: string
  dailyGachaCount?: number
  unlockedSeals?: string[]
  monthlyHarvestedCoins?: number
  questionClearCounts?: Record<string, number>
  monsters?: unknown[]
}
interface V1Seal {
  id: string
  name?: string
  imageUrl?: string
  rarity?: Rarity
}
interface V1Settings {
  maxDailyGacha?: number
  maxMonthlyCoins?: number
  coinRewards?: { easy?: number; normal?: number; hard?: number }
  parentPasscode?: string
  customSeals?: V1Seal[]
}
interface V1CustomQuestion {
  id: string
  type?: string
  difficulty?: string
  category?: string
  text?: string
  answer?: string | number
  choices?: (string | number)[]
}

export interface MigrationReport {
  ok: boolean
  migrated: boolean
  carried: {
    coins: number
    treeCoins: number
    monthlyHarvested: number
    seals: number
    clearCounts: number
    customQuestions: number
  }
  warnings: string[]
}

/** 旧データが端末に残っているか（＝移行を提案すべきか） */
export function detectV1Data(): boolean {
  // 既に v1→v2 移行済みなら、たとえバックアップ改名がストレージ満杯で失敗して旧キーが
  // 残っていても、二重移行で v2 セーブを旧データで上書きしないよう false を返す（spec §9-2）。
  if (storage.getMeta().migratedFrom === 'v1') return false
  return (
    localStorage.getItem(V1_KEYS.user) != null ||
    localStorage.getItem(V1_KEYS.settings) != null ||
    localStorage.getItem(V1_KEYS.customQuestions) != null
  )
}

function readV1<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch (e) {
    console.error('[migration] read failed', key, e)
    return null
  }
}

function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

function backupAndRemove(key: string): void {
  const raw = localStorage.getItem(key)
  if (raw == null) return
  try {
    localStorage.setItem(`${STORAGE_KEYS.backupPrefix}${key}`, raw)
  } catch (e) {
    // バックアップ保存に失敗してもアプリは続行（元キーは消さない方が安全）
    console.error('[migration] backup failed', key, e)
    return
  }
  localStorage.removeItem(key)
}

function convertV1Question(q: V1CustomQuestion, grade: Grade): Question {
  const difficulty: Difficulty =
    q.difficulty === 'easy' || q.difficulty === 'normal' || q.difficulty === 'hard'
      ? q.difficulty
      : 'normal'

  let answer: Answer
  if (Array.isArray(q.choices) && q.choices.length > 0) {
    const opts = q.choices.map((c) => String(c))
    const correct = opts.findIndex((c) => c === String(q.answer))
    answer = { kind: 'choice', options: opts, correct: correct >= 0 ? correct : 0 }
  } else if (Number.isFinite(Number(q.answer))) {
    answer = { kind: 'number', value: Number(q.answer) }
  } else {
    answer = { kind: 'choice', options: [String(q.answer ?? '')], correct: 0 }
  }

  return {
    id: q.id,
    subject: 'math',
    type: 'calc',
    grade,
    difficulty,
    text: q.text ?? '',
    answer,
    explain: [],
    pack: 'custom',
  }
}

/** 旧データをプロフィール profileId に移行する */
export function migrateV1ToProfile(profileId: string, grade: Grade): MigrationReport {
  const warnings: string[] = []
  const today = todayStr()
  const month = monthStr()

  const v1user = readV1<V1User>(V1_KEYS.user)
  const v1settings = readV1<V1Settings>(V1_KEYS.settings)
  const v1custom = readV1<V1CustomQuestion[]>(V1_KEYS.customQuestions)

  // ---- SaveData ----
  const save: SaveData = newSaveData(today, month)
  if (v1user) {
    save.coins = num(v1user.coins)
    save.treeCoins = num(v1user.treeCoins)
    // おこづかい実績 最優先：当月スタンプに載せて保全（月ズレでも失わない。親メニューで調整可）
    save.monthly = {
      month,
      coins: num(v1user.monthlyCoins),
      harvested: num(v1user.monthlyHarvestedCoins),
    }
    save.lastPlayedDate = v1user.lastPlayedDate || today
    save.dailyGachaCount = num(v1user.dailyGachaCount)
    save.unlockedSeals = Array.isArray(v1user.unlockedSeals) ? v1user.unlockedSeals : []
    save.questionClearCounts =
      v1user.questionClearCounts && typeof v1user.questionClearCounts === 'object'
        ? v1user.questionClearCounts
        : {}
    if (Array.isArray(v1user.monsters) && v1user.monsters.length > 0) {
      warnings.push(
        `旧版のホーム飾りモンスター${v1user.monsters.length}体は新しい収集モンスターとは別物のため引き継ぎません`
      )
    }
  }

  // ---- Settings ----
  const settings = storage.getSettings()
  const childSettings: ChildSettings = v1settings
    ? {
        maxDailyGacha: num(v1settings.maxDailyGacha, DEFAULT_CHILD_SETTINGS.maxDailyGacha),
        maxMonthlyCoins: num(v1settings.maxMonthlyCoins, DEFAULT_CHILD_SETTINGS.maxMonthlyCoins),
        coinRewards: {
          easy: num(v1settings.coinRewards?.easy, DEFAULT_CHILD_SETTINGS.coinRewards.easy),
          normal: num(v1settings.coinRewards?.normal, DEFAULT_CHILD_SETTINGS.coinRewards.normal),
          hard: num(v1settings.coinRewards?.hard, DEFAULT_CHILD_SETTINGS.coinRewards.hard),
        },
      }
    : { ...DEFAULT_CHILD_SETTINGS }
  settings.perChild[profileId] = childSettings
  if (v1settings?.parentPasscode) {
    settings.parentPasscode = v1settings.parentPasscode
    // 既に 0000 から変えてあった家庭は再変更を強制しない
    settings.passcodeChanged = v1settings.parentPasscode !== '0000'
  }
  if (v1settings && Array.isArray(v1settings.customSeals)) {
    settings.customSeals = v1settings.customSeals.map((s) => ({
      id: s.id,
      name: s.name ?? 'シール',
      rarity: s.rarity ?? 'N',
      imageData: s.imageUrl ?? '',
    }))
  }

  // ---- カスタム問題 ----
  const customQs: Question[] = Array.isArray(v1custom)
    ? v1custom.map((q) => convertV1Question(q, grade))
    : []

  // ---- 書き込み（失敗を握りつぶさない） ----
  const r1 = storage.saveSave(profileId, save)
  const r2 = storage.saveSettings(settings)
  const r3 = storage.saveCustomQuestions(customQs)

  const carried = {
    coins: save.coins,
    treeCoins: save.treeCoins,
    monthlyHarvested: save.monthly.harvested,
    seals: save.unlockedSeals.length,
    clearCounts: Object.keys(save.questionClearCounts).length,
    customQuestions: customQs.length,
  }

  if (!r1.ok || !r2.ok || !r3.ok) {
    warnings.push(
      '移行データの保存に一部失敗しました（容量不足の可能性）。旧データは消さずに残しました。'
    )
    return { ok: false, migrated: false, carried, warnings }
  }

  // ---- メタを先に確定（バックアップ改名が容量不足で失敗して旧キーが残っても、
  //      detectV1Data がこれを見て二重移行＝v2セーブの旧データ上書きを防ぐ・spec §9-2） ----
  storage.saveMeta({ dataVersion: DATA_VERSION, migratedFrom: 'v1' })

  // ---- 旧キーをバックアップへ改名（削除しない＝巻き戻し保険） ----
  backupAndRemove(V1_KEYS.user)
  backupAndRemove(V1_KEYS.settings)
  backupAndRemove(V1_KEYS.customQuestions)

  return { ok: true, migrated: true, carried, warnings }
}

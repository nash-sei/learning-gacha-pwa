/*
 * v2 保存層（spec §9）
 * - lg2_* キーで保存。データリセットは lg2_* のみ削除（v1 の localStorage.clear() 全消しは禁止）。
 * - 保存失敗（容量超過等）を握りつぶさず { ok:false } を返す（spec §9-5）。呼び出し側が親へ警告できる。
 */
import type { MetaData, Profile, Question, SaveData, Settings } from '../types'
import {
  STORAGE_KEYS,
  defaultMeta,
  defaultSettings,
} from './constants'

export interface SaveResult {
  ok: boolean
  error?: string
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return null
    return JSON.parse(raw) as T
  } catch (e) {
    console.error(`[storage] read failed: ${key}`, e)
    return null
  }
}

function writeJSON(key: string, value: unknown): SaveResult {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return { ok: true }
  } catch (e) {
    // 容量超過(QuotaExceededError)等を握りつぶさない（spec §9-5）
    const msg = e instanceof Error ? e.message : String(e)
    console.error(`[storage] write failed: ${key}`, e)
    return { ok: false, error: msg }
  }
}

/** 設定を既定値とマージ（後から増えたフィールドの欠落を防ぐ） */
function mergeSettings(loaded: Partial<Settings> | null): Settings {
  const base = defaultSettings()
  if (!loaded) return base
  return {
    parentPasscode: loaded.parentPasscode ?? base.parentPasscode,
    passcodeChanged: loaded.passcodeChanged ?? base.passcodeChanged,
    perChild: loaded.perChild ?? base.perChild,
    sound: { ...base.sound, ...(loaded.sound ?? {}) },
    customSeals: loaded.customSeals ?? base.customSeals,
  }
}

export const storage = {
  // ---- プロフィール ----
  getProfiles(): Profile[] {
    return readJSON<Profile[]>(STORAGE_KEYS.profiles) ?? []
  },
  saveProfiles(list: Profile[]): SaveResult {
    return writeJSON(STORAGE_KEYS.profiles, list)
  },

  // ---- 子別セーブ ----
  getSave(profileId: string): SaveData | null {
    return readJSON<SaveData>(STORAGE_KEYS.user(profileId))
  },
  saveSave(profileId: string, data: SaveData): SaveResult {
    return writeJSON(STORAGE_KEYS.user(profileId), data)
  },

  // ---- 設定 ----
  getSettings(): Settings {
    return mergeSettings(readJSON<Partial<Settings>>(STORAGE_KEYS.settings))
  },
  saveSettings(s: Settings): SaveResult {
    return writeJSON(STORAGE_KEYS.settings, s)
  },

  // ---- カスタム問題 ----
  getCustomQuestions(): Question[] {
    return readJSON<Question[]>(STORAGE_KEYS.customQuestions) ?? []
  },
  saveCustomQuestions(list: Question[]): SaveResult {
    return writeJSON(STORAGE_KEYS.customQuestions, list)
  },

  // ---- メタ ----
  getMeta(): MetaData {
    return readJSON<MetaData>(STORAGE_KEYS.meta) ?? defaultMeta()
  },
  saveMeta(m: MetaData): SaveResult {
    return writeJSON(STORAGE_KEYS.meta, m)
  },

  // ---- データリセット（lg2_* のみ・spec §9-2） ----
  /** 1人分のセーブだけ削除 */
  resetProfileSave(profileId: string): void {
    localStorage.removeItem(STORAGE_KEYS.user(profileId))
  },
  /** 全 lg2_* を削除（v1 バックアップ lg1_backup_* は残す） */
  resetAllV2(): void {
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith('lg2_')) toRemove.push(k)
    }
    toRemove.forEach((k) => localStorage.removeItem(k))
  },

  // ---- 概算容量（spec §9-5・base64 シール追加前のチェックに使用） ----
  /** localStorage 全体の概算使用バイト数（UTF-16 を2バイト換算） */
  estimateUsageBytes(): number {
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k) continue
      const v = localStorage.getItem(k) ?? ''
      total += (k.length + v.length) * 2
    }
    return total
  },

  /** 生 setItem を試す（容量見積りの実検証用・失敗時 false） */
  tryWrite(key: string, value: unknown): SaveResult {
    return writeJSON(key, value)
  },

  rawRemove(key: string): void {
    localStorage.removeItem(key)
  },
}

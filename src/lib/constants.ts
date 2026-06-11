/*
 * 学習ガチャ v2 定数・初期値（spec §6 / §9）
 */
import type {
  ChildSettings,
  Difficulty,
  MetaData,
  Rarity,
  SaveData,
  Settings,
} from '../types'

// ========== localStorage キー（spec §9-1） ==========
export const STORAGE_KEYS = {
  profiles: 'lg2_profiles',
  settings: 'lg2_settings',
  customQuestions: 'lg2_custom_questions',
  meta: 'lg2_meta',
  /** 子別セーブ */
  user: (profileId: string): string => `lg2_user_${profileId}`,
  /** v1 バックアップ接頭辞（移行後に旧キーをこの名前へ改名） */
  backupPrefix: 'lg1_backup_',
}

// ========== v1 キー（移行検出用・spec §9-2） ==========
export const V1_KEYS = {
  user: 'learning_gacha_user',
  settings: 'learning_gacha_settings',
  customQuestions: 'learning_gacha_custom_questions',
}

export const DATA_VERSION = 2

// ========== 既定設定 ==========
export const DEFAULT_CHILD_SETTINGS: ChildSettings = {
  maxDailyGacha: 3,
  maxMonthlyCoins: 1000,
  coinRewards: { easy: 15, normal: 22, hard: 30 },
}

export function defaultSettings(): Settings {
  return {
    parentPasscode: '0000',
    passcodeChanged: false,
    perChild: {},
    sound: { se: true, bgm: true },
    customSeals: [],
  }
}

export function defaultMeta(): MetaData {
  return { dataVersion: DATA_VERSION, migratedFrom: null }
}

export function newSaveData(today: string, month: string): SaveData {
  return {
    coins: 0,
    treeCoins: 0,
    monthly: { month, coins: 0, harvested: 0 },
    lastPlayedDate: today,
    dailyGachaCount: 0,
    monsters: [],
    partnerId: null,
    shards: 0,
    shardEggLastUsedWeek: null,
    unlockedSeals: [],
    questionClearCounts: {},
    pityCounters: { noRareStreak: 0, totalSinceUR: 0 },
  }
}

// ========== レア度確率（spec §6-2） ==========
/** 難易度別の N/R/SR/UR 確率（合計=1）。難しい問題ほどレアが出やすい。 */
export const RARITY_TABLE: Record<Difficulty, Record<Rarity, number>> = {
  easy: { N: 0.7, R: 0.25, SR: 0.045, UR: 0.005 },
  normal: { N: 0.55, R: 0.33, SR: 0.1, UR: 0.02 },
  hard: { N: 0.4, R: 0.38, SR: 0.17, UR: 0.05 },
}

// ========== 天井（spec §6-2） ==========
/** N が5連続 → 次は R 以上確定 */
export const PITY_NO_RARE_STREAK = 5
/** 累計40回で UR 未所持 → 次は UR 確定 */
export const PITY_UR_THRESHOLD = 40

// ========== ダブり → ホシのかけら（spec §6-4） ==========
export const SHARD_BY_RARITY: Record<Rarity, number> = {
  N: 1,
  R: 3,
  SR: 8,
  UR: 20,
}

/** かけらタマゴ：50かけら=SR以上確定・週1（spec §8） */
export const SHARD_EGG_COST = 50

/** かけらタマゴで UR が出る確率（残りは SR・SR以上確定） */
export const SHARD_EGG_UR_RATE = 0.2

// ========== コインの木 ==========
/** 実1個 = 10コイン（v1踏襲） */
export const COINS_PER_FRUIT = 10

// ========== リトライ時のレア率降格（spec §5-1） ==========
export const DIFFICULTY_DEMOTE: Record<Difficulty, Difficulty> = {
  hard: 'normal',
  normal: 'easy',
  easy: 'easy',
}

// ========== 難易度ごとの出題数（spec §5-1） ==========
export const QUESTION_COUNT: Record<Difficulty, number> = {
  easy: 3,
  normal: 4,
  hard: 5,
}

// ========== 表示ラベル ==========
export const RARITY_LABEL: Record<Rarity, string> = {
  N: 'ノーマル',
  R: 'レア',
  SR: 'スーパーレア',
  UR: 'ウルトラレア',
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'かんたん',
  normal: 'ふつう',
  hard: 'むずかしい',
}

export const RARITY_COLOR: Record<Rarity, string> = {
  N: 'var(--color-rarity-n)',
  R: 'var(--color-rarity-r)',
  SR: 'var(--color-rarity-sr)',
  UR: 'var(--color-rarity-ur)',
}

/** 理解チェック正解で付与するかけら（spec §5-2） */
export const SHARD_FOR_UNDERSTANDING = 1

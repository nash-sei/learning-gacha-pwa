/*
 * 学習ガチャ v2 定数・初期値（spec §6 / §9）
 */
import type {
  AdultData,
  ChildSettings,
  Difficulty,
  MetaData,
  Rarity,
  SaveData,
  Settings,
  Subject,
} from '../types'

// ========== localStorage キー（spec §9-1） ==========
export const STORAGE_KEYS = {
  profiles: 'lg2_profiles',
  settings: 'lg2_settings',
  customQuestions: 'lg2_custom_questions',
  meta: 'lg2_meta',
  /** 子別セーブ */
  user: (profileId: string): string => `lg2_user_${profileId}`,
  /** 大人モード専用データ（全プロフィール共通・1つだけ・spec ルーレット） */
  adult: 'lg2_adult',
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
    dangerYenAwarded: [],
  }
}

/** 大人モード専用データの初期値（lg2_adult・子供のセーブとは独立） */
export function defaultAdultData(): AdultData {
  return { perfectStreak: 0, zukan: [], rewardTotal: 0 }
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

/** かけらタマゴ：30かけら=SR以上確定・週1（spec §8） */
export const SHARD_EGG_COST = 30

/** かけらタマゴで UR が出る確率（残りは SR・SR以上確定） */
export const SHARD_EGG_UR_RATE = 0.2

// ========== DANGER討伐イベント（追加機能1-C） ==========
/**
 * 通常クイズ全問正解（→ガチャ）後に DANGER が発生する確率。
 * 本番運用は 0.2（5回に1回くらい）。テストで毎回出したいときだけ一時的に 1.0 にする。
 */
export const DANGER_RATE = 0.2
/**
 * デンジャー祭り（毎週 金・土・日）の出現率。
 * ふだんは DANGER_RATE（0.2）、祭りの日だけこの値になる。currentDangerRate() で切り替え。
 */
export const DANGER_RATE_FESTIVAL = 0.4
/**
 * デンジャー祭りを開催する曜日（JS の Date.getDay：0=日 … 5=金 6=土）＝金・土・日。
 */
export const FESTIVAL_DAYS: readonly number[] = [0, 5, 6]
/** デンジャー祭りバナーの背景イラスト（public/ui/ 同梱・外部URL禁止＝spec §1-3） */
export const FESTIVAL_BANNER_IMG = '/ui/festival-banner.webp'
/** デンジャー祭りバナー左：かわいいモンスターの顔（透過・バナー専用） */
export const FESTIVAL_FACE_CUTE_IMG = '/ui/festival-face-cute.webp'
/** デンジャー祭りバナー右：かっこいいモンスターの顔（透過・バナー専用） */
export const FESTIVAL_FACE_COOL_IMG = '/ui/festival-face-cool.webp'
/** 討伐成功でもらえる現金（円・コインとは別枠の特別ごほうび） */
export const DANGER_YEN = 200
/** 討伐で出題する難問の数（全問正解で成功・1問でも間違えたら即終了） */
export const DANGER_QUESTION_COUNT = 3

// ========== コインの木 ==========
/** 実1個 = 10コイン（v1踏襲） */
export const COINS_PER_FRUIT = 10

/** コインの木の本番イラスト（public/tree/ 同梱・外部URL禁止＝spec §1-3） */
export const TREE_IMG = '/tree/coin-tree.webp'
/** コインの実の本番イラスト */
export const FRUIT_IMG = '/tree/coin-fruit.webp'
/** コインの木の画面の聖域背景（縦1024x1536・object-coverで全画面） */
export const TREE_BG = '/tree/sanctuary-bg.webp'
/** きの ようせい キララ（コインの木の画面だけの案内役・図鑑/ガチャ対象外） */
export const FAIRY_IMG = '/tree/fairy.webp'

// ========== ホーム神殿ステージ（ホーム画面リニューアル 2026-07） ==========
/** 神殿ステージの背景・昼（古代遺跡・public/ui/ 同梱・外部URL禁止＝spec §1-3） */
export const TEMPLE_DAY_IMG = '/ui/temple-day.webp'
/** 神殿ステージの背景・夜（同上・暗い背景でモンスターが映える） */
export const TEMPLE_NIGHT_IMG = '/ui/temple-night.webp'
/** 昼／夜の選択を覚える localStorage キー（表示専用・セーブとは独立） */
export const HOME_STAGE_MODE_KEY = 'lg2_home_stage_mode'
/** ホームの神殿に飾れるモンスターの最大数（相棒＋お気に入りの合計） */
export const HOME_FAVORITES_MAX = 3
/** レア度ごとのホーム表示サイズ（px・レアなほど大きい・社長承認 2026-07・バランス版で大きめに） */
export const HOME_MONSTER_SIZE: Record<Rarity, number> = {
  N: 180,
  R: 220,
  SR: 255,
  UR: 295,
}

// ========== タイトル・オープニング（追加機能1） ==========
/** タイトルロゴ「ガクモン」（public/title/ 同梱・外部URL禁止＝spec §1-3） */
export const TITLE_LOGO_IMG = '/title/logo.webp'
/** オープニングでシルエット表示するモンスター（N=m01 / R=m12 / SR=m46 / UR=m49） */
export const OPENING_MONSTER_IDS = ['m01', 'm12', 'm46', 'm49'] as const

// ========== リトライ時のレア率降格（spec §5-1） ==========
export const DIFFICULTY_DEMOTE: Record<Difficulty, Difficulty> = {
  hard: 'normal',
  normal: 'easy',
  easy: 'easy',
}

// ========== 難易度ごとの出題数（spec §5-1） ==========
export const QUESTION_COUNT: Record<Difficulty, number> = {
  easy: 5,
  normal: 5,
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

/** 教科の表示ラベル（子供モードの教科えらび・2026-07 社会追加） */
export const SUBJECT_LABEL: Record<Subject, string> = {
  math: 'さんすう',
  japanese: 'こくご',
  shakai: 'しゃかい',
}

/** 教科のアイコン絵文字（教科えらび画面） */
export const SUBJECT_EMOJI: Record<Subject, string> = {
  math: '🔢',
  japanese: '📖',
  shakai: '🗾',
}

/** 教科の ひとこと（教科えらび画面のサブ表示） */
export const SUBJECT_NOTE: Record<Subject, string> = {
  math: 'けいさん・かたち・とけい',
  japanese: 'かんじ・ことば・おはなし',
  shakai: 'とどうふけん・れきし・くらし',
}

export const RARITY_COLOR: Record<Rarity, string> = {
  N: 'var(--color-rarity-n)',
  R: 'var(--color-rarity-r)',
  SR: 'var(--color-rarity-sr)',
  UR: 'var(--color-rarity-ur)',
}

/** 理解チェック正解で付与するかけら（spec §5-2） */
export const SHARD_FOR_UNDERSTANDING = 1

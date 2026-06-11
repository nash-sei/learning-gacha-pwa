/*
 * 学習ガチャ v2 ドメイン型定義（spec §9）
 * - tsconfig は erasableSyntaxOnly（enum 禁止）なので、すべて union 型 + interface で表す。
 * - verbatimModuleSyntax のため、ここからは型のみを export する。
 */

// ========== 基本ユニオン ==========

/** 学年（プロフィールに紐づく。将来 4 以上を追加可能） */
export type Grade = 2 | 3

export type Difficulty = 'easy' | 'normal' | 'hard'

export type Subject = 'math' | 'japanese'

export type QuestionType =
  | 'calc' // けいさん
  | 'word' // ぶんしょうだい（2ステップ）
  | 'shape' // ずけい
  | 'clock' // とけい
  | 'money' // おかね
  | 'story' // みじかいおはなし（読解）
  | 'vocab' // ことばのいみ
  | 'order' // ぶんのならべかえ

export type Rarity = 'N' | 'R' | 'SR' | 'UR'

// ========== 図（figure・SVG レンダラーが解釈） ==========

export type FigureType =
  | 'tape' // テープ図
  | 'money' // 硬貨・お札
  | 'clock' // アナログ時計
  | 'shape' // 三角形・四角形
  | 'grid' // 面積・マス（1.1）
  | 'numberline' // 数直線（1.1）
  | 'scene' // 共通場面ライブラリの絵（ID 参照）

export interface Figure {
  type: FigureType
  params?: Record<string, unknown>
}

// ========== 理解チェック（よむ→わかる） ==========

export type CheckKind = 'asked-what' | 'number-tap' | 'scene-pick'

/**
 * 理解チェック（文章題・読解のみ）。spec §5-2。
 * - asked-what : きかれているのはどれ？（3択テキスト）。options=テキスト, answer=正解index
 * - scene-pick : 正しい絵をえらぼう。options=sceneId[], answer=正解index
 * - number-tap : だいじな数字はどれ？（問題文中の数字をタップ）。answerNumber=正解の数値
 */
export type QuestionCheck =
  | { kind: 'asked-what'; prompt: string; options: string[]; answer: number }
  | { kind: 'scene-pick'; prompt: string; options: string[]; answer: number }
  | { kind: 'number-tap'; prompt: string; answerNumber: number }

// ========== 解答 ==========

export type AnswerKind = 'number' | 'choice' | 'order'

/**
 * 解答。spec §9-4。
 * - number : 数値入力
 * - choice : 選択肢から正解を選ぶ（表示時シャッフル）
 * - order  : tokens を正しい順に並べる（表示時シャッフル）
 */
export type Answer =
  | { kind: 'number'; value: number; unit?: string }
  | { kind: 'choice'; options: string[]; correct: number }
  | { kind: 'order'; tokens: string[] }

// ========== 問題 ==========

export interface Question {
  id: string
  subject: Subject
  type: QuestionType
  grade: Grade
  difficulty: Difficulty
  /** 問題文（ルビ記法 {漢字|かんじ}） */
  text: string
  figure?: Figure
  /** 理解チェック（文章題・読解のみ） */
  check?: QuestionCheck
  answer: Answer
  /** 段階解説（相棒が話す・1行ずつ） */
  explain: string[]
  /** 由来パック（'legacy' / '2026-06' 等） */
  pack?: string
}

// ========== プロフィール ==========

export interface Profile {
  id: string
  name: string
  grade: Grade
  iconId: string
}

// ========== モンスター ==========

/** 図鑑マスター（アプリ同梱・固定 24 体） */
export interface MonsterDef {
  id: string
  name: string
  rarity: Rarity
  /** ひとことせつめい */
  blurb: string
  /** 進化段階数（1=進化なし／2,3 で stage が上がると見た目が変わる・母数は増えない） */
  stages: number
}

/** セーブ内のモンスター所持状態 */
export interface MonsterOwned {
  monsterId: string
  /** 入手数（ダブり込み） */
  count: number
  xp: number
  level: number
  stage: number
}

// ========== セーブデータ（プロフィール別・spec §9-1） ==========

/** 月スタンプ式の月次カウンタ（spec §6-3） */
export interface MonthStamp {
  /** "2026-06" */
  month: string
  /** 今月の付与コイン */
  coins: number
  /** 今月の収穫（＝おこづかい実績） */
  harvested: number
}

export interface PityCounters {
  /** N が連続した回数（5 連続で次は R 以上確定） */
  noRareStreak: number
  /** UR 未入手の累計（40 で次は UR 確定） */
  totalSinceUR: number
}

export interface SaveData {
  /** 総コイン（累積・参考表示用） */
  coins: number
  /** 木の上の未収穫コイン */
  treeCoins: number
  /** 月スタンプ式の月次カウンタ */
  monthly: MonthStamp
  /** YYYY-MM-DD */
  lastPlayedDate: string
  dailyGachaCount: number
  monsters: MonsterOwned[]
  /** 相棒に設定したモンスター ID */
  partnerId: string | null
  /** ホシのかけら */
  shards: number
  /** かけらタマゴを最後に使った週（"2026-W24"・週1制限） */
  shardEggLastUsedWeek: string | null
  /** 獲得シール ID（きけんモード=1.1・親カスタム） */
  unlockedSeals: string[]
  /** 問題 ID → 正解回数（苦手優先出題に使う） */
  questionClearCounts: Record<string, number>
  pityCounters: PityCounters
}

// ========== 設定（spec §10） ==========

/** 子別の設定 */
export interface ChildSettings {
  /** 1 日のガチャ上限 */
  maxDailyGacha: number
  /** 月の目標コイン（＝月上限） */
  maxMonthlyCoins: number
  /** 難易度別の正解報酬コイン */
  coinRewards: { easy: number; normal: number; hard: number }
}

/** 親が登録するカスタムシール（自動縮小済み base64） */
export interface CustomSeal {
  id: string
  name: string
  rarity: Rarity
  imageData: string
}

export interface Settings {
  parentPasscode: string
  /** 初回 0000 からの変更が済んだか（spec §10・未変更なら先へ進めない） */
  passcodeChanged: boolean
  /** profileId → 子別設定 */
  perChild: Record<string, ChildSettings>
  sound: { se: boolean; bgm: boolean }
  customSeals: CustomSeal[]
}

// ========== メタ ==========

export interface MetaData {
  dataVersion: number
  /** 移行元（'v1' / null） */
  migratedFrom: string | null
}

// ========== 共通場面ライブラリ（scene-pick / figure scene） ==========

export interface SceneDef {
  id: string
  /** タグ：かいもの・こうえん・きょうしつ・どうぶつ・たべもの… */
  tags: string[]
  /** 画面に出すラベル（読み上げはしない・補助表示） */
  label: string
}

/*
 * 学習ガチャ v2 ドメイン型定義（spec §9）
 * - tsconfig は erasableSyntaxOnly（enum 禁止）なので、すべて union 型 + interface で表す。
 * - verbatimModuleSyntax のため、ここからは型のみを export する。
 */

// ========== 基本ユニオン ==========

/** 学年（プロフィールに紐づく。将来 4 以上を追加可能） */
export type Grade = 2 | 3 | 4

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
 *
 * order の correctTokenCount（任意・ダミー札＝おとり対応）：
 *   tokens の「先頭 correctTokenCount 個（＝元 index 0..correctTokenCount-1）」が正解札で、
 *   その並び順が正解。残りの tokens はダミー（おとり）。
 *   例：8 札中 4 札が正解なら correctTokenCount: 4 とし、tokens[0..3] に正解を正しい順で、
 *       tokens[4..7] にダミーを置く（表示時はすべてシャッフルされる）。
 *   未指定（既存問題）は「全 tokens を使い、全一致で正解」（従来どおり）。
 */
export type Answer =
  | { kind: 'number'; value: number; unit?: string }
  | { kind: 'choice'; options: string[]; correct: number }
  | { kind: 'order'; tokens: string[]; correctTokenCount?: number }

// ========== 出題ジェネレータ（数字ランダム生成・覚えゲー化対策） ==========

/**
 * 出題1回分の「その回だけの中身」。gen が返し、materializeQuestion が問題に差し替える。
 * text / answer / explain は必須。figure / check は指定したときだけ差し替える（未指定は元のまま）。
 */
export interface QuestionVariant {
  text: string
  answer: Answer
  explain: string[]
  figure?: Figure
  check?: QuestionCheck
}

/**
 * 数字を毎回変える出題ジェネレータ（任意）。出題時に一度だけ rng を渡して呼ばれる。
 * id は変えないので questionClearCounts（苦手記録）はそのまま引き継がれる。
 */
export type QuestionGen = (rng: () => number) => QuestionVariant

// ========== 問題 ==========

export interface Question {
  id: string
  subject: Subject
  type: QuestionType
  grade: Grade
  difficulty: Difficulty
  /** 問題文（ルビ記法 {漢字|かんじ}）。gen があるときは出題時に上書きされる予備値。 */
  text: string
  figure?: Figure
  /** 理解チェック（文章題・読解のみ） */
  check?: QuestionCheck
  answer: Answer
  /** 段階解説（相棒が話す・1行ずつ） */
  explain: string[]
  /** 由来パック（'legacy' / '2026-06' 等） */
  pack?: string
  /** 大人モード用の一言ヒント（任意・答えそのものは書かない） */
  hint?: string
  /**
   * 数字ランダム生成（任意）。あれば出題時に materializeQuestion が呼び、
   * text / answer / explain（必要なら figure / check）を差し替える。id は不変。
   */
  gen?: QuestionGen
}

// ========== プロフィール ==========

export interface Profile {
  id: string
  name: string
  grade: Grade
  iconId: string
  /** 大人プロフィール（学年ではなく大人モード・任意・未定義は子供扱い） */
  isAdult?: boolean
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
  /** DANGER討伐限定モンスター（通常ガチャには出さず・図鑑は別枠表示・追加機能1-C） */
  isDanger?: boolean
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

/**
 * DANGER討伐の「現金200円」ごほうび1件（追加機能1-C）。
 * コイン（おこづかい）とは別枠。親が実際に現金を渡す管理に使う。
 */
export interface DangerAward {
  /** 一意ID（"danger-" + 時刻 + 乱数） */
  id: string
  /** 付与日時（ISO8601 文字列） */
  awardedAt: string
  /** 同時に渡した DANGER 限定モンスターの ID（無ければ空文字） */
  monsterId: string
  /** 親が現金を渡したか（受け渡しチェック用） */
  received: boolean
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
  /** DANGER討伐の現金200円ごほうび履歴（コインとは別枠・親メニューで受け渡し管理・追加機能1-C） */
  dangerYenAwarded: DangerAward[]
  /**
   * ホームの神殿に飾るモンスター ID（最大3体・表示専用・ホーム画面リニューアル2026-07）。
   * 相棒（partnerId）は自動で先頭に出るため、この配列は相棒以外の「飾る」選択を持つ。
   * 旧セーブには無いので optional（未定義は空配列扱い）。
   */
  favoriteMonsterIds?: string[]
}

// ========== 大人モード専用データ（子供のセーブとは別保存・lg2_adult） ==========

/**
 * 大人モードのルーレット専用データ。子供のプロフィール／セーブとは完全に独立し、
 * lg2_adult キーに1つだけ保存する（全プロフィール共通）。バックアップ／全消去は
 * lg2_ 接頭辞で storage が自動的に拾う。
 */
export interface AdultData {
  /** 連続全問正解の回数（10問正解で+1・1問でも逃すと0・3でプレミアム解放→0にリセット） */
  perfectStreak: number
  /** 大人専用ずかん：初級ルーレットで当てたモンスターID（重複はスキップ） */
  zukan: string[]
  /** ごほうび合計（上級・プレミアムで当たった金額の累計・円） */
  rewardTotal: number
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

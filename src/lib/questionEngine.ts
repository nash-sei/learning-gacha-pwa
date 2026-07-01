/*
 * 出題エンジン（spec §5-1 / §5-2）
 * - 苦手優先（questionClearCounts＝正解回数の少ない順）＋未出題（=0回）の新問題が自然に混ざる
 * - 同じ check 形式（asked-what / number-tap / scene-pick）が連続しないよう並べる努力（§5-2）
 * - 理解チェック・解答の判定は純粋関数。UI から切り離す
 * - 選択肢・並べかえトークンの表示順シャッフル補助（覚えゲー化対策・§5-2）
 */
import type { Answer, Difficulty, Grade, Question, QuestionCheck } from '../types'

/**
 * gen（数字ランダム生成）があれば、出題1回分の具体問題に展開する（無ければそのまま返す）。
 * - text / answer / explain を差し替え、figure / check は gen が返したときだけ差し替える。
 * - id は変えない＝questionClearCounts（苦手記録）を保つ。
 * - 展開後は gen を外す（同じ問題を二度展開して数字が途中で変わるのを防ぐ保険）。
 * 出題セットを作るとき（selectQuestions の直後）に一度だけ呼ぶこと。
 */
export function materializeQuestion(q: Question, rng: () => number = Math.random): Question {
  if (!q.gen) return q
  const v = q.gen(rng)
  return {
    ...q,
    text: v.text,
    answer: v.answer,
    explain: v.explain,
    figure: v.figure !== undefined ? v.figure : q.figure,
    check: v.check !== undefined ? v.check : q.check,
    gen: undefined,
  }
}

/** 非破壊 Fisher-Yates シャッフル（rng は 0..1） */
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}

export interface SelectQuestionsOptions {
  difficulty: Difficulty
  grade: Grade
  pool: Question[]
  /** 問題ID → 正解回数（未出題はキーなし=0扱い） */
  clearCounts: Record<string, number>
  count: number
  rng?: () => number
}

/**
 * 同じ check 形式が連続しないよう貪欲に並べ替える（努力目標・無理なら連続を許す）。
 * check なし（calc 等）は連続してもよい。
 */
function arrangeAvoidConsecutiveCheckKind(items: Question[]): Question[] {
  const remaining = items.slice()
  const out: Question[] = []
  while (remaining.length > 0) {
    const prevKind = out.length > 0 ? out[out.length - 1].check?.kind : undefined
    let idx = 0
    if (prevKind != null) {
      const found = remaining.findIndex((q) => q.check?.kind !== prevKind)
      if (found >= 0) idx = found
    }
    out.push(remaining[idx])
    remaining.splice(idx, 1)
  }
  return out
}

/**
 * 出題セットを選ぶ（spec §5-1）。
 * - 同 difficulty を必須とし、grade 一致を優先（該当が少なければ他学年の同難易度を混ぜる）
 * - clearCounts 少ない順（同率はランダム）で count 件。未出題=0回 が苦手問題と同じ最優先層に混ざる
 * - 足りなければある分だけ返す
 */
export function selectQuestions(opts: SelectQuestionsOptions): Question[] {
  const { difficulty, grade, clearCounts, count } = opts
  const rng = opts.rng ?? Math.random

  // 同一IDの重複を除去（内蔵パック＋カスタムの衝突保険）
  const seen = new Set<string>()
  const pool = opts.pool.filter((q) => {
    if (seen.has(q.id)) return false
    seen.add(q.id)
    return true
  })

  const sameDifficulty = pool.filter((q) => q.difficulty === difficulty)
  const sameGrade = sameDifficulty.filter((q) => q.grade === grade)

  // grade 違いは緩く許容：学年一致だけで十分な余裕（count の2倍）が無ければ他学年も混ぜる
  let candidates = sameGrade
  if (sameGrade.length < count * 2) {
    const otherGrades = sameDifficulty.filter((q) => q.grade !== grade)
    candidates = [...sameGrade, ...otherGrades]
  }

  // 苦手優先：先にシャッフルしてから clearCounts 昇順の安定ソート（同率はランダム順になる）
  const mixed = shuffle(candidates, rng)
  const ranked = mixed
    .map((q, i) => ({ q, key: clearCounts[q.id] ?? 0, i }))
    .sort((a, b) => a.key - b.key || a.i - b.i)
    .map((x) => x.q)

  const picked = ranked.slice(0, count)
  return arrangeAvoidConsecutiveCheckKind(picked)
}

/**
 * 理解チェック（わかる）の判定（spec §5-2）。
 * - asked-what / scene-pick … given.index が正解 index と一致
 * - number-tap … given.number が answerNumber と一致
 * 表示順をシャッフルした場合は buildAskedOptions の answer（新index）を元の index に
 * 写してから渡すか、選んだ選択肢の元 index を渡すこと。
 */
export function checkUnderstanding(
  check: QuestionCheck,
  given: { index?: number; number?: number }
): boolean {
  switch (check.kind) {
    case 'asked-what':
    case 'scene-pick':
      return given.index != null && given.index === check.answer
    case 'number-tap':
      return given.number != null && given.number === check.answerNumber
  }
}

/**
 * 解答（とく）の判定（spec §9-4）。
 * - number … given.number === value
 * - choice … given.index === correct（元データの index。表示シャッフルは buildChoiceOptions 参照）
 * - order  … given.order は「子供が並べた順に元 tokens の index を並べた配列」。
 *            [0,1,2,…] と一致（=元の正しい順に戻せた）なら正解。
 *            ダミー札（おとり）対応：correctTokenCount 指定時は「正解札 correctTokenCount 個を
 *            正しい順に選べたか」だけを見る（並べた札数も correctTokenCount に一致が必要）。
 */
export function checkAnswer(
  answer: Answer,
  given: { number?: number; index?: number; order?: number[] }
): boolean {
  switch (answer.kind) {
    case 'number':
      return given.number != null && given.number === answer.value
    case 'choice':
      return given.index != null && given.index === answer.correct
    case 'order': {
      const order = given.order
      // 期待する並べる札数。correctTokenCount 未指定（既存問題）は全 tokens を使う＝従来どおり。
      const expectedLen = answer.correctTokenCount ?? answer.tokens.length
      if (!order || order.length !== expectedLen) return false
      // 先頭 expectedLen 個（＝元 index 0..expectedLen-1）が、その順で選ばれているか。
      return order.slice(0, expectedLen).every((originalIndex, position) => originalIndex === position)
    }
  }
}

/**
 * 理解チェックの選択肢を表示用にシャッフルする補助（spec §5-2 表示順は毎回シャッフル）。
 * 返り値の answer はシャッフル後の正解 index。number-tap は選択肢が無いので null。
 */
export function buildAskedOptions(
  check: QuestionCheck,
  rng: () => number = Math.random
): { options: string[]; answer: number } | null {
  if (check.kind === 'number-tap') return null
  const indexed = check.options.map((text, i) => ({ text, i }))
  const mixed = shuffle(indexed, rng)
  return {
    options: mixed.map((o) => o.text),
    answer: mixed.findIndex((o) => o.i === check.answer),
  }
}

/**
 * choice 解答の選択肢を表示用にシャッフルする補助。
 * 返り値の correct はシャッフル後の正解 index。choice 以外は null。
 */
export function buildChoiceOptions(
  answer: Answer,
  rng: () => number = Math.random
): { options: string[]; correct: number } | null {
  if (answer.kind !== 'choice') return null
  const indexed = answer.options.map((text, i) => ({ text, i }))
  const mixed = shuffle(indexed, rng)
  return {
    options: mixed.map((o) => o.text),
    correct: mixed.findIndex((o) => o.i === answer.correct),
  }
}

export interface ShuffledToken {
  text: string
  /** 元の tokens 配列での index（checkAnswer の given.order にこの値を並べて渡す） */
  originalIndex: number
}

/**
 * order 解答のトークンを表示用にシャッフルする補助。
 * 偶然正解順のままにならないよう混ぜ直す（読まずに正解できてしまうのを防ぐ）。
 * ダミー札（おとり）対応：answer.tokens には正解札＋ダミー札の「すべて」が入っている前提で、
 * 全札を originalIndex 付きでシャッフルして返す（correctTokenCount の有無に関わらず同じ扱い）。
 * order 以外は null。
 */
export function buildOrderTokens(
  answer: Answer,
  rng: () => number = Math.random
): ShuffledToken[] | null {
  if (answer.kind !== 'order') return null
  const tokens: ShuffledToken[] = answer.tokens.map((text, originalIndex) => ({
    text,
    originalIndex,
  }))
  if (tokens.length <= 1) return tokens

  const isIdentity = (list: ShuffledToken[]): boolean =>
    list.every((t, i) => t.originalIndex === i)

  let mixed = shuffle(tokens, rng)
  for (let tries = 0; tries < 5 && isIdentity(mixed); tries++) {
    mixed = shuffle(tokens, rng)
  }
  if (isIdentity(mixed)) {
    // 最後の保険：先頭2つを入れ替えて必ず崩す
    const swapped = mixed.slice()
    const first = swapped[0]
    swapped[0] = swapped[1]
    swapped[1] = first
    mixed = swapped
  }
  return mixed
}

/*
 * 出題ジェネレータ（数字ランダム生成・覚えゲー化対策）
 * ────────────────────────────────────────────────────────
 * 目的：計算問題の「38 + 25 = 63」を丸暗記できないように、出題のたびに数字を変える。
 *   - 各ジェネレータは純粋関数 (rng)=>QuestionVariant。副作用なし・同じ rng なら同じ結果。
 *   - 難易度は「数字の範囲」で固定するので、元問題と同じくらいの手ごたえになる。
 *   - explain は実際に生成した数字で組み立てるので必ず正しい。
 *     explain[0] は「答え・途中の答えを言わない手がかり」（子供向け作問9ルール準拠）。
 *   - 問題オブジェクトの id は変えない（materializeQuestion が中身だけ差し替える）ので、
 *     questionClearCounts（苦手記録）はそのまま引き継がれる。
 *
 * 使い方（パック側）：
 *   { id:'m26-0001', subject:'math', type:'calc', grade:2, difficulty:'easy',
 *     // ↓ text/answer/explain は出題時に gen が上書きするので「予備（gen が無い環境用）」でよい
 *     text:'38 + 25 は いくつかな？', answer:{kind:'number',value:63}, explain:[...],
 *     gen: genAdd({ aMin:21, aMax:58, bMin:14, bMax:41, requireCarry:true, maxSum:99 }),
 *     pack:'2026-06' }
 */
import type { Answer, QuestionCheck, QuestionGen, QuestionVariant } from '../types'

// ========== 乱数ヘルパー ==========

/** rng(0..1) から min..max（両端をふくむ）の整数を返す */
export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

/** 配列から1つランダムに選ぶ */
export function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[randInt(rng, 0, arr.length - 1)]
}

/** 制約を満たすまで作り直す（最大 tries 回・満たせなければ最後の値を返す） */
function sampleUntil<T>(make: () => T, ok: (v: T) => boolean, tries = 200): T {
  let v = make()
  for (let i = 0; i < tries && !ok(v); i++) v = make()
  return v
}

// ========== たし算 ==========

interface AddOpts {
  aMin: number
  aMax: number
  bMin: number
  bMax: number
  /** 一のくらいで くり上がりを必ず出す */
  requireCarry?: boolean
  /** 合計の上限（easy を2けたに収めたいとき等） */
  maxSum?: number
  /** 合計の下限（hard で百のくらいに くり上げたいとき等） */
  minSum?: number
}

function addExplain(a: number, b: number): string[] {
  const ao = a % 10
  const bo = b % 10
  const onesSum = ao + bo
  const carry = onesSum >= 10 ? 1 : 0
  const lines: string[] = ['一のくらいから じゅんばんに たしていこう。くり上がりに ちゅうい！']
  lines.push(
    carry
      ? `一のくらいは ${ao} + ${bo} = ${onesSum}。${onesSum % 10} を かいて 1 くり上がるよ`
      : `一のくらいは ${ao} + ${bo} = ${onesSum}`
  )
  lines.push(`ぜんぶ たすと ${a + b}！`)
  return lines
}

export function genAdd(opts: AddOpts): QuestionGen {
  return (rng) => {
    const { a, b } = sampleUntil(
      () => ({ a: randInt(rng, opts.aMin, opts.aMax), b: randInt(rng, opts.bMin, opts.bMax) }),
      ({ a, b }) => {
        if (opts.requireCarry && (a % 10) + (b % 10) < 10) return false
        if (opts.maxSum != null && a + b > opts.maxSum) return false
        if (opts.minSum != null && a + b < opts.minSum) return false
        return true
      }
    )
    return {
      text: `${a} + ${b} は いくつかな？`,
      answer: { kind: 'number', value: a + b },
      explain: addExplain(a, b),
    }
  }
}

// ========== ひき算 ==========

interface SubOpts {
  aMin: number
  aMax: number
  bMin: number
  bMax: number
  /** 一のくらいで くり下がり（10 をかりる）を必ず出す */
  requireBorrow?: boolean
  /** a > b を保証（こたえが 0 以上・省略時 true） */
  positive?: boolean
}

function subExplain(a: number, b: number): string[] {
  const ao = a % 10
  const bo = b % 10
  const borrow = ao < bo
  const lines: string[] = ['一のくらいが ひけない ときは、十のくらいから 10 を かりてこよう']
  lines.push(
    borrow
      ? `一のくらいは 10 を かりて ${ao + 10} - ${bo} = ${ao + 10 - bo}`
      : `一のくらいは ${ao} - ${bo} = ${ao - bo}`
  )
  lines.push(`こたえは ${a - b}！`)
  return lines
}

export function genSub(opts: SubOpts): QuestionGen {
  const positive = opts.positive ?? true
  return (rng) => {
    const { a, b } = sampleUntil(
      () => ({ a: randInt(rng, opts.aMin, opts.aMax), b: randInt(rng, opts.bMin, opts.bMax) }),
      ({ a, b }) => {
        if (positive && a <= b) return false
        if (opts.requireBorrow && a % 10 >= b % 10) return false
        return true
      }
    )
    return {
      text: `${a} - ${b} は いくつかな？`,
      answer: { kind: 'number', value: a - b },
      explain: subExplain(a, b),
    }
  }
}

// ========== 3けたのたし算・ひき算（explain は一般的な手がかりにする） ==========

export function genAdd3(opts: { aMin: number; aMax: number; bMin: number; bMax: number }): QuestionGen {
  return (rng) => {
    const a = randInt(rng, opts.aMin, opts.aMax)
    const b = randInt(rng, opts.bMin, opts.bMax)
    return {
      text: `${a} + ${b} は いくつかな？`,
      answer: { kind: 'number', value: a + b },
      explain: [
        '一のくらい → 十のくらい → 百のくらいの じゅんばんに たそう。くり上がりを わすれずに！',
        `一のくらいは ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}`,
        `ぜんぶ たすと ${a + b}！`,
      ],
    }
  }
}

export function genSub3(opts: { aMin: number; aMax: number; bMin: number; bMax: number }): QuestionGen {
  return (rng) => {
    // a > b を保証
    const { a, b } = sampleUntil(
      () => ({ a: randInt(rng, opts.aMin, opts.aMax), b: randInt(rng, opts.bMin, opts.bMax) }),
      ({ a, b }) => a > b
    )
    return {
      text: `${a} - ${b} は いくつかな？`,
      answer: { kind: 'number', value: a - b },
      explain: [
        '大きい くらいから じゅんに ひくよ。ひけない ときは となりの くらいから 10 を かりてくる',
        '一のくらいから じゅんばんに けいさんしよう',
        `こたえは ${a - b}！`,
      ],
    }
  }
}

// ========== かけ算 ==========

/** 九九（1けた × 1けた） */
export function genKuku(opts?: { min?: number; max?: number }): QuestionGen {
  const min = opts?.min ?? 2
  const max = opts?.max ?? 9
  return (rng) => {
    const a = randInt(rng, min, max)
    const b = randInt(rng, min, max)
    return {
      text: `${a} × ${b} は いくつかな？`,
      answer: { kind: 'number', value: a * b },
      explain: [
        `${a} が ${b} こぶん という いみだよ`,
        `九九で おもいだそう`,
        `こたえは ${a * b}！`,
      ],
    }
  }
}

/** 2けた × 1けた（十のくらいと一のくらいに わけて かける） */
export function genMul2x1(opts: { aMin: number; aMax: number; bMin: number; bMax: number }): QuestionGen {
  return (rng) => {
    const a = randInt(rng, opts.aMin, opts.aMax)
    const b = randInt(rng, opts.bMin, opts.bMax)
    const tens = Math.floor(a / 10) * 10
    const ones = a % 10
    return {
      text: `${a} × ${b} は いくつかな？`,
      answer: { kind: 'number', value: a * b },
      explain: [
        `${a} を ${tens} と ${ones} に わけて かんがえよう`,
        `${tens} × ${b} = ${tens * b}、${ones} × ${b} = ${ones * b}`,
        `たすと ${a * b}！`,
      ],
    }
  }
}

/** 3けた × 1けた（筆算・くり上がりに注意） */
export function genMul3x1(opts: { aMin: number; aMax: number; bMin: number; bMax: number }): QuestionGen {
  return (rng) => {
    const a = randInt(rng, opts.aMin, opts.aMax)
    const b = randInt(rng, opts.bMin, opts.bMax)
    return {
      text: `${a} × ${b} は いくつかな？`,
      answer: { kind: 'number', value: a * b },
      explain: [
        '一のくらいから じゅんばんに かけていこう。くり上がりに ちゅうい！',
        `一のくらいは ${a % 10} × ${b} = ${(a % 10) * b}`,
        `こたえは ${a * b}！`,
      ],
    }
  }
}

// ========== わり算 ==========

/** あまりの ない わり算（九九の はんい・こたえ number） */
export function genDivExact(opts?: { qMin?: number; qMax?: number; dMin?: number; dMax?: number }): QuestionGen {
  const qMin = opts?.qMin ?? 2
  const qMax = opts?.qMax ?? 9
  const dMin = opts?.dMin ?? 2
  const dMax = opts?.dMax ?? 9
  return (rng) => {
    const q = randInt(rng, qMin, qMax)
    const d = randInt(rng, dMin, dMax)
    const dividend = q * d
    return {
      text: `${dividend} ÷ ${d} は いくつかな？`,
      answer: { kind: 'number', value: q },
      explain: [
        `${dividend} を ${d}つに おなじ かずずつ わけるよ`,
        `九九で かんがえよう。${d} × ${q} = ${dividend}`,
        `だから こたえは ${q}！`,
      ],
    }
  }
}

/** あまりの ある わり算（3択・こたえ choice） */
export function genDivRemainderChoice(opts?: {
  qMin?: number
  qMax?: number
  dMin?: number
  dMax?: number
}): QuestionGen {
  const qMin = opts?.qMin ?? 3
  const qMax = opts?.qMax ?? 8
  const dMin = opts?.dMin ?? 3
  const dMax = opts?.dMax ?? 9
  return (rng) => {
    const d = randInt(rng, dMin, dMax)
    const q = randInt(rng, Math.max(qMin, 2), qMax)
    const r = randInt(rng, 1, d - 1) // 1 <= r <= d-1（あまりは わる数より 小さい）
    const dividend = d * q + r
    // 選択肢：正解／あまりが 大きすぎ（1つ 少なく わけた）／こたえが 大きすぎ
    const correctText = `${q}あまり${r}`
    const wrongBigRemainder = `${q - 1}あまり${r + d}` // 4×6+6 のような「あまりが わる数以上」
    const wrongBigQuotient = `${q + 1}あまり${r}` // わりすぎ（dividend を こえる）
    const options = [correctText, wrongBigRemainder, wrongBigQuotient]
    const answer: Answer = { kind: 'choice', options, correct: 0 }
    return {
      text: `${dividend} ÷ ${d} の こたえは どれ？`,
      answer,
      explain: [
        `${d}のだんの 九九で、${dividend} を こえない いちばん 大きい こたえを さがそう`,
        `${d} × ${q} = ${d * q}。${dividend} まで あと ${r} のこるね。だから ${q}あまり${r}！`,
        `${d} × ${q + 1} = ${d * (q + 1)} は ${dividend} より 大きいから つかえないよ`,
      ],
    }
  }
}

// ========== お金（フェーズ1b で使用予定・土台のみ） ==========
// 図（figure）の再生成をともなうので、calc の安定稼働を確認してから追加する。

// 型を使うだけの再エクスポート（将来 word/money/clock 用）
export type { QuestionVariant, QuestionCheck }

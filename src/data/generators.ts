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

/**
 * 3けた × 1けた（百・十・一のくらいに わけて かける）。
 * maxProduct を指定すると、こたえがその値をこえない数だけ出す（答えの桁数＝難易度を一定に保つ）。
 */
export function genMul3x1(opts: {
  aMin: number
  aMax: number
  bMin: number
  bMax: number
  /** こたえの上限（例 999 で 3けたの答えに固定） */
  maxProduct?: number
}): QuestionGen {
  return (rng) => {
    const { a, b } = sampleUntil(
      () => ({ a: randInt(rng, opts.aMin, opts.aMax), b: randInt(rng, opts.bMin, opts.bMax) }),
      ({ a, b }) => (opts.maxProduct == null ? true : a * b <= opts.maxProduct)
    )
    const parts = [Math.floor(a / 100) * 100, (Math.floor(a / 10) % 10) * 10, a % 10].filter((x) => x > 0)
    return {
      text: `${a} × ${b} は いくつかな？`,
      answer: { kind: 'number', value: a * b },
      explain: [
        '百のくらい・十のくらい・一のくらいに わけて かけると かんたんだよ',
        `${a} = ${parts.join(' + ')} だね`,
        `${parts.map((p) => `${p} × ${b} = ${p * b}`).join('、')}`,
        `ぜんぶ たすと ${a * b}！`,
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

// ==========================================================================
// お金・時計・図形（さいころ化 第2弾）
// - figure（お金/時計/図形）も毎回 数に あわせて 作り直す。
// - choice の distractor は「原理のある まちがい」（はりの読みまちがい等）にして
//   ・正解と別 ・おたがい重複しない ・もっともらしい を守る（gen-test で機械チェック）。
// - explain[0] は 答えを言わない手がかり（子供向け作問9ルール）。
// ==========================================================================

/** こうかの よびかた（1000えん以上は おさつ） */
function denomName(yen: number): string {
  return yen >= 1000 ? `${yen}えんさつ` : `${yen}えんだま`
}
/** 1..12 に おさめる（13→1・0→12） */
function wrap12(h: number): number {
  return (((h - 1) % 12) + 12) % 12 + 1
}
/** 分の counter の よみ（「ふん」か「ぷん」か・一のくらいで決まる） */
function punFun(n: number): string {
  return [2, 5, 7, 9].includes((((n % 10) + 10) % 10)) ? 'ふん' : 'ぷん'
}
/** 分の 表示（例 45→"45ふん"、10→"10ぷん"） */
function minLabel(n: number): string {
  return `${n}${punFun(n)}`
}

// ---------- お金 ----------

interface CoinSpec {
  yen: number
  min: number
  max: number
}

/** こうか・おさつを かぞえて ごうけい（number＋お金の図・図は数に あわせて作り直す） */
export function genMoneyCoinSum(opts: { coins: CoinSpec[]; maxCoins?: number }): QuestionGen {
  const maxCoins = opts.maxCoins ?? 18
  return (rng) => {
    const counts = sampleUntil(
      () => opts.coins.map((c) => randInt(rng, c.min, c.max)),
      (cs) => cs.every((n) => n >= 1) && cs.reduce((s, n) => s + n, 0) <= maxCoins
    )
    const coins = opts.coins.map((c, i) => ({ yen: c.yen, count: counts[i] }))
    const total = coins.reduce((s, c) => s + c.yen * c.count, 0)
    return {
      text: `${coins.map((c) => `${denomName(c.yen)}が ${c.count}まい`).join('、')} あります。ぜんぶで なんえん？`,
      answer: { kind: 'number', value: total, unit: 'えん' },
      explain: [
        'おなじ こうかごとに まとめてから、さいごに ぜんぶ たそう',
        coins.map((c) => `${c.yen}えんが ${c.count}まいで ${c.yen * c.count}えん`).join('、'),
        `ぜんぶ たすと ${total}えん！`,
      ],
      figure: { type: 'money', params: { coins } },
    }
  }
}

/** おつり（number＋はらった こうかの図）。payment - price。 */
export function genMoneyChange(opts: {
  payment: number
  priceMin: number
  priceMax: number
  step?: number
  items?: string[]
}): QuestionGen {
  const step = opts.step ?? 10
  const items = opts.items ?? ['ジュース', 'パン', 'けしゴム', 'おかし', 'いろえんぴつ', 'ノート']
  return (rng) => {
    // 安全柵：おつりが 0以下に ならないよう price < payment を保証（設定ミス対策）
    const price = sampleUntil(
      () => randInt(rng, Math.ceil(opts.priceMin / step), Math.floor(opts.priceMax / step)) * step,
      (p) => p > 0 && p < opts.payment
    )
    const item = pick(rng, items)
    const change = opts.payment - price
    const payPhrase = opts.payment >= 1000 ? `${opts.payment}えんさつを だして、` : `${opts.payment}えんだまで `
    return {
      text: `${payPhrase}${price}えんの ${item}を かいました。おつりは なんえん？`,
      answer: { kind: 'number', value: change, unit: 'えん' },
      explain: [
        'おつりは「はらったお金 − ねだん」だよ',
        `${opts.payment} - ${price} を けいさんしよう`,
        `おつりは ${change}えん！`,
      ],
      figure: { type: 'money', params: { coins: [{ yen: opts.payment, count: 1 }] } },
    }
  }
}

/** 2品 かって のこり（number＋はらった こうかの図）。payment -(a+b)。 */
export function genMoneyTwoItemChange(opts: {
  payment: number
  aMin: number
  aMax: number
  bMin: number
  bMax: number
  step?: number
  names?: [string, string]
}): QuestionGen {
  const step = opts.step ?? 10
  const [nameA, nameB] = opts.names ?? ['ジュース', 'パン']
  return (rng) => {
    const { a, b } = sampleUntil(
      () => ({
        a: randInt(rng, Math.ceil(opts.aMin / step), Math.floor(opts.aMax / step)) * step,
        b: randInt(rng, Math.ceil(opts.bMin / step), Math.floor(opts.bMax / step)) * step,
      }),
      ({ a, b }) => a + b < opts.payment
    )
    const rest = opts.payment - (a + b)
    return {
      text: `${opts.payment}えんだまが 1まい あります。${a}えんの ${nameA}と ${b}えんの ${nameB}を かうと、のこりは なんえん？`,
      answer: { kind: 'number', value: rest, unit: 'えん' },
      explain: [
        'まず ふたつの ごうけいを けいさんしよう。のこりは そのあとだよ',
        `ごうけいは ${a} + ${b} = ${a + b}えん`,
        `${opts.payment} - ${a + b} = ${rest}。のこりは ${rest}えん！`,
      ],
      figure: { type: 'money', params: { coins: [{ yen: opts.payment, count: 1 }] } },
    }
  }
}

/** 2品 かって あわせて いくら（number・図なし）。a + b。 */
export function genMoneySum(opts: {
  aMin: number
  aMax: number
  bMin: number
  bMax: number
  step?: number
  names?: [string, string]
}): QuestionGen {
  const step = opts.step ?? 10
  const [nameA, nameB] = opts.names ?? ['パン', 'ジュース']
  return (rng) => {
    const a = randInt(rng, Math.ceil(opts.aMin / step), Math.floor(opts.aMax / step)) * step
    const b = randInt(rng, Math.ceil(opts.bMin / step), Math.floor(opts.bMax / step)) * step
    return {
      text: `${a}えんの ${nameA}と ${b}えんの ${nameB}を かいました。あわせて なんえん？`,
      answer: { kind: 'number', value: a + b, unit: 'えん' },
      explain: ['あわせるから たしざんだよ', `${a} + ${b} を けいさんしよう`, `あわせて ${a + b}えん！`],
    }
  }
}

// ---------- 時計（すべて choice・図の はりも 数に あわせて 動かす） ----------

/** 「なんじ」（ちょうど）を よむ */
export function genClockReadHour(): QuestionGen {
  return (rng) => {
    const h = randInt(rng, 1, 12)
    const cands = [12, wrap12(h + 6), wrap12(h + 3), wrap12(h - 3), wrap12(h + 1)]
    const distractors: number[] = []
    for (const c of cands) {
      if (c !== h && !distractors.includes(c) && distractors.length < 2) distractors.push(c)
    }
    return {
      text: 'とけいは なんじを さしているかな？',
      answer: { kind: 'choice', options: [`${h}じ`, `${distractors[0]}じ`, `${distractors[1]}じ`], correct: 0 },
      explain: [
        '「なんじ」は みじかい はりが おしえて くれるよ',
        `みじかい はりは ${h}、ながい はりは 12。ながい はりが 12のときは「ちょうど」だよ`,
        `だから ${h}じ！`,
      ],
      figure: { type: 'clock', params: { hour: h, minute: 0 } },
    }
  }
}

/** 「なんじはん」を よむ */
export function genClockReadHalf(): QuestionGen {
  return (rng) => {
    const h = randInt(rng, 1, 12)
    const prev = wrap12(h - 1)
    const next = wrap12(h + 1)
    return {
      text: 'とけいは なんじはんを さしているかな？',
      answer: { kind: 'choice', options: [`${h}じはん`, `${prev}じはん`, `${next}じはん`], correct: 0 },
      explain: [
        'ながい はりが 6を さすと「はん」（30ぷん）だよ',
        `みじかい はりは ${h}と ${next}の あいだ。まだ ${next}に なっていないね`,
        `だから ${h}じはん！`,
      ],
      figure: { type: 'clock', params: { hour: h, minute: 30 } },
    }
  }
}

/** 「なんじなんぷん」を よむ（分は 5とび） */
export function genClockReadMinute(): QuestionGen {
  const MINS = [5, 10, 15, 20, 25, 35, 40, 45, 50, 55]
  return (rng) => {
    const h = randInt(rng, 1, 12)
    const m = pick(rng, MINS)
    const next = wrap12(h + 1)
    const numberOnDial = m / 5 // ながい針が さす 文字ばんの数字
    return {
      text: 'とけいは なんじなんぷんを さしているかな？',
      answer: {
        kind: 'choice',
        options: [`${h}じ${minLabel(m)}`, `${next}じ${minLabel(m)}`, `${h}じ${minLabel(numberOnDial)}`],
        correct: 0,
      },
      explain: [
        '「なんぷん」は ながい はりを 5、10、15…と 5とびで かぞえるよ',
        `ながい はりは ${numberOnDial}のところ。かぞえると ${minLabel(m)}`,
        `みじかい はりは ${h}と ${next}の あいだだから、まだ ${h}じ。だから ${h}じ${minLabel(m)}！`,
      ],
      figure: { type: 'clock', params: { hour: h, minute: m } },
    }
  }
}

/** じこく＋すすむ分 → おわりの じこく（時を またぐ） */
export function genClockAfter(opts: { phrasing: 'after' | 'activity'; activities?: string[] }): QuestionGen {
  const activities = opts.activities ?? ['さんぽ', 'べんきょう', 'おてつだい', 'ピアノの れんしゅう']
  return (rng) => {
    const { h, m, d } = sampleUntil(
      () => ({
        h: randInt(rng, 1, 11),
        m: pick(rng, [40, 45, 50, 55]),
        d: pick(rng, [15, 20, 25, 30, 35, 40]),
      }),
      ({ m, d }) => m + d > 60 && (m + d) % 60 !== 0
    )
    const endH = wrap12(h + 1)
    const endM = m + d - 60
    const toNext = 60 - m
    const dMinWrong = endM + 10 <= 55 ? endM + 10 : endM - 10
    const text =
      opts.phrasing === 'after'
        ? `いま ${h}じ${minLabel(m)}です。${minLabel(d)}ごは なんじなんぷん？`
        : `${h}じ${minLabel(m)}から ${d}${punFun(d)}かん ${pick(rng, activities)}を しました。おわったのは なんじなんぷん？`
    return {
      text,
      answer: {
        kind: 'choice',
        options: [`${endH}じ${minLabel(endM)}`, `${endH}じ${minLabel(dMinWrong)}`, `${wrap12(endH + 1)}じ${minLabel(endM)}`],
        correct: 0,
      },
      explain: [
        'まず 「つぎの ちょうどの じかん」まで あと なんぷんか かんがえよう。のこりの ぷんは そのあと たすよ',
        `${h}じ${minLabel(m)}から ${minLabel(toNext)}で ${endH}じ。のこりは ${d} - ${toNext} = ${minLabel(endM)}`,
        `${endH}じから ${minLabel(endM)} すすんで、${endH}じ${minLabel(endM)}！`,
      ],
      figure: { type: 'clock', params: { hour: h, minute: m } },
    }
  }
}

/** いまから 予定まで あと なんぷん（時を またぐ） */
export function genClockUntil(opts?: { events?: string[] }): QuestionGen {
  const events = opts?.events ?? ['サッカーの れんしゅう', 'えいがの じょうえい', 'おけいこ', 'すきな アニメ']
  return (rng) => {
    const h = randInt(rng, 1, 11)
    const m = pick(rng, [35, 40, 45, 50, 55])
    const m2 = pick(rng, [5, 10, 15, 20, 25])
    const h2 = wrap12(h + 1)
    const toNext = 60 - m
    const duration = toNext + m2
    return {
      text: `いま ${h}じ${minLabel(m)}です。${pick(rng, events)}は ${h2}じ${minLabel(m2)}に はじまります。あと なんぷんで はじまる？`,
      answer: {
        kind: 'choice',
        options: [`${duration}${punFun(duration)}`, `${toNext}${punFun(toNext)}`, `${m + duration}${punFun(m + duration)}`],
        correct: 0,
      },
      explain: [
        `「${h2}じに なるまで」と「${h2}じから あと」の ふたつに わけて かんがえよう`,
        `${h}じ${minLabel(m)}から ${h2}じまでは ${minLabel(toNext)}。${h2}じから ${h2}じ${minLabel(m2)}までは ${minLabel(m2)}`,
        `${toNext} + ${m2} = ${duration}。あと ${duration}${punFun(duration)}で はじまるよ！`,
      ],
      figure: { type: 'clock', params: { hour: h, minute: m } },
    }
  }
}

/** ふたつの 分を たして なんじかんなんぷん（60を こえる・図なし） */
export function genClockSumChoice(): QuestionGen {
  return (rng) => {
    const { a, b } = sampleUntil(
      () => ({ a: pick(rng, [30, 35, 40, 45, 50]), b: pick(rng, [30, 35, 40, 45, 50]) }),
      ({ a, b }) => a + b > 60 && a + b < 120 && (a + b) % 60 !== 0
    )
    const sum = a + b
    const rem = sum - 60
    const wrongRem = rem + 10 <= 55 ? rem + 10 : rem - 10
    return {
      text: `${a}${punFun(a)} + ${b}${punFun(b)} は なんじかんなんぷん？`,
      answer: {
        kind: 'choice',
        options: [`1じかん${minLabel(rem)}`, `1じかん${minLabel(wrongRem)}`, `${sum}${punFun(sum)}`],
        correct: 0,
      },
      explain: [
        'まず ふたつを たして なんぷんか だそう。60ぷんを こえたら「なんじかん なんぷん」に なおすのを わすれずに！',
        `${a} + ${b} = ${minLabel(sum)}。60ぷんで 1じかんだから…`,
        `${minLabel(sum)}は 1じかん${minLabel(rem)}！`,
      ],
    }
  }
}

// ---------- 図形（number は図の再生成つき／name は かたちを 出しわけ） ----------

const SHAPE_NAME: Record<'triangle' | 'square' | 'rectangle', string> = {
  triangle: 'さんかくけい',
  square: 'せいほうけい',
  rectangle: 'ちょうほうけい',
}
const SHAPE_NAME_EXPLAIN: Record<'triangle' | 'square' | 'rectangle', string[]> = {
  triangle: ['へんの かずと かどの かずを かぞえて みよう', 'へんが 3ぼん、かどが 3つ。だから さんかくけい！'],
  square: [
    'へんの ながさを くらべて みよう。たてと よこは おなじかな？ちがうかな？',
    'かどが ぜんぶ ちょっかくで、へんの ながさが みんな おなじだね。だから せいほうけい！',
    'たてと よこが ちがう ながさなら ちょうほうけいだよ',
  ],
  rectangle: [
    'かどが ぜんぶ かくかく（ちょっかく）の しかくけいだね',
    'たてと よこの ながさが ちがうから、ちょうほうけい！',
    'ぜんぶ おなじ ながさなら せいほうけいだよ',
  ],
}

/** かたちの なまえは どれ（三角形/正方形/長方形を 出しわけ・choice） */
export function genShapeName(): QuestionGen {
  const kinds: Array<'triangle' | 'square' | 'rectangle'> = ['triangle', 'square', 'rectangle']
  return (rng) => {
    const kind = pick(rng, kinds)
    const correct = SHAPE_NAME[kind]
    const priority = kind === 'square' ? 'ちょうほうけい' : kind === 'rectangle' ? 'せいほうけい' : 'えん'
    const rest = ['さんかくけい', 'せいほうけい', 'ちょうほうけい', 'えん'].filter((n) => n !== correct && n !== priority)
    return {
      text: 'この かたちの なまえは どれ？',
      answer: { kind: 'choice', options: [correct, priority, pick(rng, rest)], correct: 0 },
      explain: SHAPE_NAME_EXPLAIN[kind],
      figure: { type: 'shape', params: { kind } },
    }
  }
}

/** 正三角形の まわりの ながさ（number＋図） */
export function genShapePerimeterEqTriangle(opts: { sMin: number; sMax: number }): QuestionGen {
  return (rng) => {
    const s = randInt(rng, opts.sMin, opts.sMax)
    const p = s * 3
    return {
      text: `へんの ながさが どれも ${s}cmの さんかくけいが あります。まわりの ながさは なんcm？`,
      answer: { kind: 'number', value: p, unit: 'cm' },
      explain: [
        'へんが みんな おなじ さんかくけいを {正三角形|せいさんかくけい}と いうよ',
        'まわりの ながさは へん 3ぼんぶん',
        `${s} + ${s} + ${s} = ${p}。こたえは ${p}cm！`,
      ],
      figure: { type: 'shape', params: { kind: 'triangle', sides: [s, s, s], labels: [`${s}cm`, `${s}cm`, `${s}cm`] } },
    }
  }
}

/** 長方形の まわりの ながさ（number＋図・たて≠よこ） */
export function genShapePerimeterRect(opts: { wMin: number; wMax: number; hMin: number; hMax: number }): QuestionGen {
  return (rng) => {
    const { w, h } = sampleUntil(
      () => ({ w: randInt(rng, opts.wMin, opts.wMax), h: randInt(rng, opts.hMin, opts.hMax) }),
      ({ w, h }) => w !== h
    )
    const p = 2 * (w + h)
    return {
      text: `たて ${h}cm、よこ ${w}cmの ちょうほうけいが あります。まわりの ながさは なんcm？`,
      answer: { kind: 'number', value: p, unit: 'cm' },
      explain: [
        'ちょうほうけいは むかいあう へんが おなじ ながさだよ',
        `たてが 2ほん、よこが 2ほん。${h} + ${w} + ${h} + ${w} を けいさんしよう`,
        `こたえは ${p}cm！`,
      ],
      figure: { type: 'shape', params: { kind: 'rectangle', sides: [w, h], labels: [`${w}cm`, `${h}cm`] } },
    }
  }
}

/** 正方形の まわりの ながさ（number＋図） */
export function genShapePerimeterSquare(opts: { sMin: number; sMax: number }): QuestionGen {
  return (rng) => {
    const s = randInt(rng, opts.sMin, opts.sMax)
    const p = s * 4
    return {
      text: `へんの ながさが ${s}cmの せいほうけいが あります。まわりの ながさは なんcm？`,
      answer: { kind: 'number', value: p, unit: 'cm' },
      explain: [
        'せいほうけいは 4つの へんが みんな おなじ ながさだよ',
        `${s}cmの へんが 4ほんぶん。${s} + ${s} + ${s} + ${s} だね`,
        `こたえは ${p}cm！`,
      ],
      figure: { type: 'shape', params: { kind: 'square', sides: [s], labels: [`${s}cm`] } },
    }
  }
}

/** まわりの ながさ → 1ぺんの ながさ（正方形・number＋図） */
export function genShapeSideFromPerimeterSquare(opts: { sMin: number; sMax: number }): QuestionGen {
  return (rng) => {
    const s = randInt(rng, opts.sMin, opts.sMax)
    const p = s * 4
    return {
      text: `まわりの ながさが ${p}cmの せいほうけいが あります。1ぺんの ながさは なんcm？`,
      answer: { kind: 'number', value: s, unit: 'cm' },
      explain: [
        'せいほうけいは へんが みんな おなじ ながさだよ',
        `まわりの ながさ ${p}cmを 4つに わけよう。${p} ÷ 4 だね`,
        `1ぺんは ${s}cm！`,
      ],
      figure: { type: 'shape', params: { kind: 'square' } },
    }
  }
}

/** 三角形の なまえ（にとうへん or せいさんかく・choice＋図） */
export function genShapeTriangleClassify(opts: { min: number; max: number }): QuestionGen {
  return (rng) => {
    const equilateral = rng() < 0.35
    let sides: number[]
    if (equilateral) {
      const s = randInt(rng, opts.min, opts.max)
      sides = [s, s, s]
    } else {
      const { a, b } = sampleUntil(
        () => ({ a: randInt(rng, opts.min, opts.max), b: randInt(rng, opts.min, opts.max) }),
        ({ a, b }) => a !== b && a < 2 * b
      )
      sides = [a, b, b]
    }
    const explain = equilateral
      ? [
          '3つの へんの ながさを よーく くらべて みよう。きづく ことは あるかな？',
          `3つの へんが ぜんぶ ${sides[0]}cmで おなじだね。3つとも おなじ ながさの さんかくけいを せいさんかくけいと いうよ`,
          '2つだけ おなじ ながさなら にとうへんさんかくけいだね',
        ]
      : [
          '3つの へんの ながさを よーく くらべて みよう。きづく ことは あるかな？',
          `${sides[1]}cmの へんが 2ほん あるね。2つの へんが おなじ ながさの さんかくけいを にとうへんさんかくけいと いうよ`,
          '3つ ぜんぶ おなじなら せいさんかくけいだね',
        ]
    return {
      text: `へんの ながさが ${sides[0]}cm、${sides[1]}cm、${sides[2]}cmの さんかくけいが あります。この かたちの なまえは どれ？`,
      answer: {
        kind: 'choice',
        options: ['にとうへんさんかくけい', 'せいさんかくけい', 'ちょっかくさんかくけい'],
        correct: equilateral ? 1 : 0,
      },
      explain,
      figure: { type: 'shape', params: { kind: 'triangle', sides, labels: sides.map((x) => `${x}cm`) } },
    }
  }
}

// 型を使うだけの再エクスポート
export type { QuestionVariant, QuestionCheck }

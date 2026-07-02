/*
 * 出題ジェネレータの自動検算（node --experimental-strip-types で実行）
 * 各ジェネレータを N 回まわし、表示テキストから答えを「別計算」で復元して一致を確認する。
 * さらに難易度の条件（くり上がり・くり下がり・合計の範囲など）と、選択肢の妥当性も確認。
 *
 * 実行: node --experimental-strip-types scripts/gen-test.ts
 */
import {
  genAdd,
  genAdd3,
  genSub,
  genSub3,
  genKuku,
  genMul2x1,
  genMul3x1,
  genDivExact,
  genDivRemainderChoice,
  genMoneyCoinSum,
  genMoneyChange,
  genMoneyTwoItemChange,
  genMoneySum,
  genClockReadHour,
  genClockReadHalf,
  genClockReadMinute,
  genClockAfter,
  genClockUntil,
  genClockSumChoice,
  genShapeName,
  genShapePerimeterEqTriangle,
  genShapePerimeterRect,
  genShapePerimeterSquare,
  genShapeSideFromPerimeterSquare,
  genShapeTriangleClassify,
} from '../src/data/generators.ts'
import type { QuestionGen, QuestionVariant } from '../src/types/index.ts'

let pass = 0
let fail = 0
const fails: string[] = []
function check(cond: boolean, msg: string) {
  if (cond) pass++
  else {
    fail++
    if (fails.length < 40) fails.push(msg)
  }
}

const N = 4000

function parseBinary(text: string): { a: number; op: string; b: number } | null {
  const m = text.match(/^(\d+)\s*([+\-×÷])\s*(\d+)/)
  if (!m) return null
  return { a: Number(m[1]), op: m[2], b: Number(m[3]) }
}

/** すべてのジェネレータ共通の健全性チェック */
function baseChecks(label: string, v: QuestionVariant) {
  check(typeof v.text === 'string' && v.text.length > 0 && !/undefined|NaN/.test(v.text), `${label}: text異常 :: ${v.text}`)
  check(Array.isArray(v.explain) && v.explain.length >= 1, `${label}: explainが空`)
  check(!v.explain.some((l) => /undefined|NaN/.test(l)), `${label}: explainにNaN/undefined :: ${v.explain.join(' | ')}`)
  // 最後のヒントには答えの数字が入っている（number のとき）
  if (v.answer.kind === 'number') {
    const last = v.explain[v.explain.length - 1]
    check(last.includes(String(v.answer.value)), `${label}: 最後のヒントに答え(${v.answer.value})が無い :: ${last}`)
  }
}

/** number 型の四則を、テキストから復元して照合 */
function verifyArithmetic(label: string, gen: QuestionGen, extra?: (v: QuestionVariant) => void) {
  for (let i = 0; i < N; i++) {
    const v = gen(Math.random)
    baseChecks(label, v)
    if (v.answer.kind !== 'number') {
      check(false, `${label}: numberのはずが ${v.answer.kind}`)
      continue
    }
    const p = parseBinary(v.text)
    check(!!p, `${label}: 式を読めない :: ${v.text}`)
    if (p) {
      let exp = 0
      if (p.op === '+') exp = p.a + p.b
      else if (p.op === '-') exp = p.a - p.b
      else if (p.op === '×') exp = p.a * p.b
      else exp = Math.floor(p.a / p.b)
      check(v.answer.value === exp, `${label}: ${p.a}${p.op}${p.b} 期待${exp} 実際${v.answer.value}`)
      check(v.answer.value >= 0, `${label}: 答えが負 :: ${v.text} = ${v.answer.value}`)
    }
    if (extra) extra(v)
  }
}

// ---- たし算 ----
verifyArithmetic('add-0001(easy,carry,≤99)', genAdd({ aMin: 23, aMax: 58, bMin: 15, bMax: 39, requireCarry: true, maxSum: 99 }), (v) => {
  const p = parseBinary(v.text)!
  check((p.a % 10) + (p.b % 10) >= 10, `add-0001: くり上がり無し ${p.a}+${p.b}`)
  check(p.a + p.b <= 99, `add-0001: 合計>99 ${p.a}+${p.b}`)
})
verifyArithmetic('add-0003(normal,carry,≤99)', genAdd({ aMin: 25, aMax: 69, bMin: 24, bMax: 49, requireCarry: true, maxSum: 99 }), (v) => {
  const p = parseBinary(v.text)!
  check((p.a % 10) + (p.b % 10) >= 10, `add-0003: くり上がり無し ${p.a}+${p.b}`)
  check(p.a + p.b <= 99, `add-0003: 合計>99 ${p.a}+${p.b}`)
})
verifyArithmetic('add-0006(hard,→百,100..180)', genAdd({ aMin: 45, aMax: 89, bMin: 45, bMax: 89, requireCarry: true, minSum: 100, maxSum: 180 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a + p.b >= 100 && p.a + p.b <= 180, `add-0006: 合計範囲外 ${p.a}+${p.b}`)
})

// ---- ひき算 ----
verifyArithmetic('sub-0002(easy,borrow)', genSub({ aMin: 41, aMax: 79, bMin: 14, bMax: 38, requireBorrow: true }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a > p.b, `sub-0002: a<=b ${p.a}-${p.b}`)
  check(p.a % 10 < p.b % 10, `sub-0002: くり下がり無し ${p.a}-${p.b}`)
})
verifyArithmetic('sub-0004(normal,borrow)', genSub({ aMin: 52, aMax: 95, bMin: 26, bMax: 59, requireBorrow: true }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a > p.b, `sub-0004: a<=b ${p.a}-${p.b}`)
  check(p.a % 10 < p.b % 10, `sub-0004: くり下がり無し ${p.a}-${p.b}`)
})

// ---- 九九・かけ算 ----
verifyArithmetic('kuku-0005', genKuku({ min: 2, max: 9 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a >= 2 && p.a <= 9 && p.b >= 2 && p.b <= 9, `kuku: 範囲外 ${p.a}×${p.b}`)
})
verifyArithmetic('mul2x1-0010', genMul2x1({ aMin: 12, aMax: 39, bMin: 3, bMax: 5 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a >= 12 && p.a <= 39 && p.b >= 3 && p.b <= 5, `mul2x1: 範囲外 ${p.a}×${p.b}`)
})
verifyArithmetic('mul3x1-0012', genMul3x1({ aMin: 113, aMax: 329, bMin: 3, bMax: 4, maxProduct: 999 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a >= 113 && p.a <= 329 && p.b >= 3 && p.b <= 4, `mul3x1: 範囲外 ${p.a}×${p.b}`)
  if (v.answer.kind === 'number') check(v.answer.value >= 100 && v.answer.value <= 999, `mul3x1: 答えが3けたでない ${p.a}×${p.b}=${v.answer.value}`)
})

// ---- 3けた ----
verifyArithmetic('add3-0008', genAdd3({ aMin: 120, aMax: 480, bMin: 120, bMax: 480 }))
verifyArithmetic('sub3-0009', genSub3({ aMin: 300, aMax: 900, bMin: 150, bMax: 480 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a > p.b, `sub3: a<=b ${p.a}-${p.b}`)
})

// ---- わり算あまりなし ----
verifyArithmetic('divExact-0007', genDivExact({ qMin: 2, qMax: 9, dMin: 2, dMax: 5 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a % p.b === 0, `divExact: 割り切れない ${p.a}÷${p.b}`)
})

// ---- わり算あまりあり（choice）----
{
  const gen = genDivRemainderChoice({ qMin: 5, qMax: 8, dMin: 3, dMax: 6 })
  const label = 'divRem-0011'
  for (let i = 0; i < N; i++) {
    const v = gen(Math.random)
    baseChecks(label, v)
    if (v.answer.kind !== 'choice') {
      check(false, `${label}: choiceのはず`)
      continue
    }
    const m = v.text.match(/^(\d+)\s*÷\s*(\d+)/)
    check(!!m, `${label}: 式を読めない ${v.text}`)
    if (m) {
      const dividend = Number(m[1])
      const d = Number(m[2])
      const q = Math.floor(dividend / d)
      const r = dividend % d
      const expected = `${q}あまり${r}`
      const opts = v.answer.options
      check(opts.length === 3, `${label}: 選択肢が3個でない`)
      check(new Set(opts).size === 3, `${label}: 選択肢が重複 ${opts.join('/')}`)
      check(opts[v.answer.correct] === expected, `${label}: 正解不一致 期待${expected} 実際${opts[v.answer.correct]}（${dividend}÷${d}）`)
      check(r >= 1 && r < d, `${label}: あまり範囲外 ${dividend}÷${d}=${q}あまり${r}`)
    }
  }
}

// ================= 第2弾：お金・時計・図形 =================
const punFun2 = (n: number): string => ([2, 5, 7, 9].includes(((n % 10) + 10) % 10) ? 'ふん' : 'ぷん')
const minLabel2 = (n: number): string => `${n}${punFun2(n)}`
const wrap12b = (h: number): number => (((h - 1) % 12) + 12) % 12 + 1
const SHAPE_NAME2: Record<string, string> = {
  triangle: 'さんかくけい',
  square: 'せいほうけい',
  rectangle: 'ちょうほうけい',
}

/** 共通：explain[0]に答えを書いていない／choiceの健全性（重複なし・正解index妥当） */
function commonChecks(label: string, v: QuestionVariant) {
  baseChecks(label, v)
  if (v.answer.kind === 'number') {
    check(!v.explain[0].includes(String(v.answer.value)), `${label}: explain[0]に答え(${v.answer.value}) :: ${v.explain[0]}`)
  } else if (v.answer.kind === 'choice') {
    const opts = v.answer.options
    check(opts.length === 3, `${label}: 選択肢が3個でない :: ${opts.join('/')}`)
    check(new Set(opts).size === opts.length, `${label}: 選択肢が重複 :: ${opts.join('/')}`)
    check(v.answer.correct >= 0 && v.answer.correct < opts.length, `${label}: 正解indexが範囲外`)
    check(!v.explain[0].includes(opts[v.answer.correct]), `${label}: explain[0]に答え(${opts[v.answer.correct]})`)
  }
}
const coinsOf = (v: QuestionVariant): { yen: number; count: number }[] => {
  const f = v.figure
  if (!f || f.type !== 'money') return []
  const raw = (f.params as { coins?: unknown }).coins
  return Array.isArray(raw) ? (raw as { yen: number; count: number }[]) : []
}
const figHM = (v: QuestionVariant): { h: number; m: number } => {
  const p = (v.figure?.params ?? {}) as { hour?: number; minute?: number }
  return { h: Number(p.hour), m: Number(p.minute) }
}
const sidesOf = (v: QuestionVariant): number[] => {
  const p = (v.figure?.params ?? {}) as { sides?: unknown }
  return Array.isArray(p.sides) ? (p.sides as unknown[]).map((x) => Number(x)) : []
}
const nums = (text: string, re: RegExp): number[] => [...text.matchAll(re)].map((m) => Number(m[1]))
const val = (v: QuestionVariant): number => (v.answer.kind === 'number' ? v.answer.value : NaN)
const correctOpt = (v: QuestionVariant): string => (v.answer.kind === 'choice' ? v.answer.options[v.answer.correct] : '')

// --- お金 ---
{
  const g = genMoneyCoinSum({ coins: [{ yen: 100, min: 1, max: 3 }, { yen: 10, min: 1, max: 6 }, { yen: 1, min: 1, max: 5 }] })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('money-coinSum', v)
    const coins = coinsOf(v)
    const sum = coins.reduce((s, c) => s + c.yen * c.count, 0)
    check(val(v) === sum, `money-coinSum: 図の合計 ${sum} と答え ${val(v)} 不一致`)
    check(coins.reduce((s, c) => s + c.count, 0) <= 24, `money-coinSum: こうかが24枚超`)
  }
}
{
  const g = genMoneyChange({ payment: 500, priceMin: 120, priceMax: 480, step: 10 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('money-change', v)
    const pay = coinsOf(v)[0]?.yen
    const price = nums(v.text, /(\d+)えんの/g)[0]
    check(val(v) === pay - price, `money-change: ${pay}-${price} と答え ${val(v)} 不一致`)
    check(val(v) > 0, `money-change: おつりが0以下 ${v.text}`)
  }
}
{
  const g = genMoneyChange({ payment: 1000, priceMin: 300, priceMax: 900, step: 10 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('money-change1000', v)
    const pay = coinsOf(v)[0]?.yen
    const price = nums(v.text, /(\d+)えんの/g)[0]
    check(val(v) === pay - price, `money-change1000: ${pay}-${price} 不一致`)
  }
}
{
  const g = genMoneyTwoItemChange({ payment: 500, aMin: 100, aMax: 250, bMin: 100, bMax: 250, step: 10 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('money-2item', v)
    const pay = coinsOf(v)[0]?.yen
    const ab = nums(v.text, /(\d+)えんの/g)
    check(val(v) === pay - (ab[0] + ab[1]), `money-2item: ${pay}-(${ab[0]}+${ab[1]}) 不一致`)
    check(val(v) > 0, `money-2item: 残り0以下`)
  }
}
{
  const g = genMoneySum({ aMin: 60, aMax: 250, bMin: 60, bMax: 250, step: 10 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('money-sum', v)
    const ab = nums(v.text, /(\d+)えんの/g)
    check(val(v) === ab[0] + ab[1], `money-sum: ${ab[0]}+${ab[1]} 不一致`)
  }
}

// --- 時計 ---
{
  const g = genClockReadHour()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('clock-hour', v)
    const { h, m } = figHM(v)
    check(m === 0, `clock-hour: 分が0でない`)
    check(correctOpt(v) === `${h}じ`, `clock-hour: 正解 ${correctOpt(v)} が図(${h}じ)と不一致`)
  }
}
{
  const g = genClockReadHalf()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('clock-half', v)
    const { h, m } = figHM(v)
    check(m === 30, `clock-half: 分が30でない`)
    check(correctOpt(v) === `${h}じはん`, `clock-half: 正解不一致`)
  }
}
{
  const g = genClockReadMinute()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('clock-minute', v)
    const { h, m } = figHM(v)
    check(m % 5 === 0 && m !== 0 && m !== 30, `clock-minute: 分が5とびでない`)
    check(correctOpt(v) === `${h}じ${minLabel2(m)}`, `clock-minute: 正解 ${correctOpt(v)} 期待 ${h}じ${minLabel2(m)}`)
  }
}
{
  for (const phrasing of ['after', 'activity'] as const) {
    const g = genClockAfter({ phrasing })
    for (let i = 0; i < N; i++) {
      const v = g(Math.random)
      commonChecks(`clock-after-${phrasing}`, v)
      const { h, m } = figHM(v)
      const d = nums(v.text, /(\d+)(?:ふん|ぷん)(?:ご|かん)/g)[0]
      const total = m + d
      const endM = total - 60
      const expected = `${wrap12b(h + 1)}じ${minLabel2(endM)}`
      check(total > 60 && endM > 0, `clock-after: 時をまたいでいない ${h}:${m}+${d}`)
      check(correctOpt(v) === expected, `clock-after: 正解 ${correctOpt(v)} 期待 ${expected}`)
    }
  }
}
{
  const g = genClockUntil()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('clock-until', v)
    const { m } = figHM(v)
    const mm = v.text.match(/は (\d+)じ(\d+)(?:ふん|ぷん)に はじまり/)
    const m2 = mm ? Number(mm[2]) : NaN
    const dur = 60 - m + m2
    check(correctOpt(v) === `${dur}${punFun2(dur)}`, `clock-until: 正解 ${correctOpt(v)} 期待 ${dur}`)
  }
}
{
  const g = genClockSumChoice()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('clock-sum', v)
    const p = v.text.match(/^(\d+)(?:ふん|ぷん) \+ (\d+)(?:ふん|ぷん)/)
    const a = Number(p![1])
    const b = Number(p![2])
    const sum = a + b
    const rem = sum - 60
    check(sum > 60 && sum < 120 && rem > 0, `clock-sum: 範囲外 ${a}+${b}`)
    check(correctOpt(v) === `1じかん${minLabel2(rem)}`, `clock-sum: 正解 ${correctOpt(v)} 期待 1じかん${minLabel2(rem)}`)
  }
}

// --- 図形 ---
{
  const g = genShapePerimeterEqTriangle({ sMin: 3, sMax: 9 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-triEq', v)
    const s = sidesOf(v)
    check(s.length === 3 && s[0] === s[1] && s[1] === s[2], `shape-triEq: 辺が3つ等しくない ${s.join(',')}`)
    check(val(v) === s[0] * 3, `shape-triEq: まわり不一致`)
  }
}
{
  const g = genShapePerimeterRect({ wMin: 3, wMax: 12, hMin: 2, hMax: 9 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-rect', v)
    const s = sidesOf(v)
    check(s.length === 2 && s[0] !== s[1], `shape-rect: 長方形でない ${s.join(',')}`)
    check(val(v) === 2 * (s[0] + s[1]), `shape-rect: まわり不一致`)
  }
}
{
  const g = genShapePerimeterSquare({ sMin: 3, sMax: 12 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-sq', v)
    const s = sidesOf(v)
    check(val(v) === s[0] * 4, `shape-sq: まわり不一致`)
  }
}
{
  const g = genShapeSideFromPerimeterSquare({ sMin: 3, sMax: 12 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-sqSide', v)
    const P = nums(v.text, /まわりの ながさが (\d+)cm/g)[0]
    check(P % 4 === 0 && val(v) === P / 4, `shape-sqSide: 1ぺん不一致 P=${P}`)
  }
}
{
  const g = genShapeName()
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-name', v)
    const kind = (v.figure!.params as { kind?: string }).kind ?? ''
    check(correctOpt(v) === SHAPE_NAME2[kind], `shape-name: 名前が図(${kind})と不一致 :: ${correctOpt(v)}`)
  }
}
{
  const g = genShapeTriangleClassify({ min: 3, max: 9 })
  for (let i = 0; i < N; i++) {
    const v = g(Math.random)
    commonChecks('shape-triClass', v)
    const s = sidesOf(v)
    const allEq = s[0] === s[1] && s[1] === s[2]
    const twoEq = new Set(s).size === 2
    if (allEq) check(correctOpt(v) === 'せいさんかくけい', `shape-triClass: 正三角形なのに ${correctOpt(v)}`)
    else check(twoEq && correctOpt(v) === 'にとうへんさんかくけい', `shape-triClass: 二等辺判定/名前ちがい ${s.join(',')} → ${correctOpt(v)}`)
  }
}

console.log(`\n===== 出題ジェネレータ検算 =====`)
console.log(`OK: ${pass}  NG: ${fail}`)
if (fail > 0) {
  console.log(`--- 失敗の例（最大40件）---`)
  for (const f of fails) console.log('  ✗ ' + f)
  process.exit(1)
} else {
  console.log('✅ すべて合格')
}

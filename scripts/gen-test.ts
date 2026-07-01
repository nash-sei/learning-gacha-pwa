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
verifyArithmetic('mul3x1-0012', genMul3x1({ aMin: 113, aMax: 329, bMin: 3, bMax: 4 }), (v) => {
  const p = parseBinary(v.text)!
  check(p.a >= 113 && p.a <= 329 && p.b >= 3 && p.b <= 4, `mul3x1: 範囲外 ${p.a}×${p.b}`)
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

console.log(`\n===== 出題ジェネレータ検算 =====`)
console.log(`OK: ${pass}  NG: ${fail}`)
if (fail > 0) {
  console.log(`--- 失敗の例（最大40件）---`)
  for (const f of fails) console.log('  ✗ ' + f)
  process.exit(1)
} else {
  console.log('✅ すべて合格')
}

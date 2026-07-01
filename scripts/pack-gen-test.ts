/*
 * 全パック横断の出題ジェネレータ検算（esbuildで束ねてから node で実行）
 *   ./node_modules/.bin/esbuild scripts/pack-gen-test.ts --bundle --platform=node --format=esm --outfile=$TMPDIR/pack-test.mjs
 *   node $TMPDIR/pack-test.mjs
 *
 * 各パックの全問を見て、gen（数字ランダム）が付いた問題を 1問 3000 回まわし、
 * 表示テキストから答えを「別計算」で復元して一致を確認する。
 * 誰が変換しても（分身AIでも）自動で全部チェックできる。
 */
import { LEGACY_QUESTIONS, PACK_2026_06, PACK_2026_07, PACK_2026_06B } from '../src/data/packs/index'
import { PACK_DANGER } from '../src/data/packs/pack-danger'
import type { Question } from '../src/types'

const packs: Array<[string, Question[]]> = [
  ['legacy', LEGACY_QUESTIONS],
  ['2026-06', PACK_2026_06],
  ['2026-07', PACK_2026_07],
  ['2026-06b', PACK_2026_06B],
  ['danger', PACK_DANGER],
]

let pass = 0
let fail = 0
let genCount = 0
let manual = 0
const fails: string[] = []
const converted: Record<string, string[]> = {}
function check(cond: boolean, msg: string) {
  if (cond) pass++
  else {
    fail++
    if (fails.length < 60) fails.push(msg)
  }
}

const N = 3000

for (const [packName, questions] of packs) {
  converted[packName] = []
  for (const q of questions) {
    if (!q.gen) continue
    genCount++
    converted[packName].push(q.id)
    // スコープ確認：この段階では calc のみに gen が付くはず
    if (q.type !== 'calc') {
      check(false, `${q.id}: calc以外にgenが付いている(type=${q.type})`)
    }
    for (let i = 0; i < N; i++) {
      const v = q.gen(Math.random)
      // 基本
      const textOk = typeof v.text === 'string' && v.text.length > 0 && !/undefined|NaN/.test(v.text)
      check(textOk, `${q.id}: text異常 :: ${v.text}`)
      check(Array.isArray(v.explain) && v.explain.length >= 1, `${q.id}: explainが空`)
      check(!v.explain.some((l) => /undefined|NaN/.test(l)), `${q.id}: explainにNaN/undefined`)

      if (v.answer.kind === 'number') {
        const last = v.explain[v.explain.length - 1]
        check(last.includes(String(v.answer.value)), `${q.id}: 最後のヒントに答え(${v.answer.value})が無い`)
        const m = v.text.match(/^(\d+)\s*([+\-×÷])\s*(\d+)/)
        if (m) {
          const a = Number(m[1])
          const b = Number(m[3])
          let exp = 0
          if (m[2] === '+') exp = a + b
          else if (m[2] === '-') exp = a - b
          else if (m[2] === '×') exp = a * b
          else exp = Math.floor(a / b)
          check(v.answer.value === exp, `${q.id}: ${a}${m[2]}${b} 期待${exp} 実際${v.answer.value}`)
          check(v.answer.value >= 0, `${q.id}: 答えが負 ${v.text}=${v.answer.value}`)
        } else {
          manual++
          if (i === 0) fails.push(`(要目視) ${q.id}: number式を自動照合できない :: ${v.text}`)
        }
      } else if (v.answer.kind === 'choice') {
        const opts = v.answer.options
        check(opts.length >= 2, `${q.id}: 選択肢が少ない`)
        check(new Set(opts).size === opts.length, `${q.id}: 選択肢重複 ${opts.join('/')}`)
        check(v.answer.correct >= 0 && v.answer.correct < opts.length, `${q.id}: 正解indexが範囲外`)
        const m = v.text.match(/(\d+)\s*÷\s*(\d+)/)
        if (m && /こたえは どれ/.test(v.text)) {
          const dividend = Number(m[1])
          const d = Number(m[2])
          const qq = Math.floor(dividend / d)
          const r = dividend % d
          check(opts[v.answer.correct] === `${qq}あまり${r}`, `${q.id}: 余り正解不一致 期待${qq}あまり${r} 実際${opts[v.answer.correct]}`)
          check(r >= 1 && r < d, `${q.id}: あまり範囲外 ${dividend}÷${d}`)
        } else {
          manual++
          if (i === 0) fails.push(`(要目視) ${q.id}: choiceを自動照合できない :: ${v.text}`)
        }
      } else {
        manual++
      }
    }
  }
}

console.log(`\n===== 全パック横断 ジェネレータ検算 =====`)
for (const [packName] of packs) {
  console.log(`  [${packName}] gen付き ${converted[packName].length}問: ${converted[packName].join(', ') || '(なし)'}`)
}
console.log(`gen付き合計: ${genCount}問  検算OK: ${pass}  NG: ${fail}  自動照合不可(要目視): ${manual}`)
if (fail > 0) {
  console.log(`--- 失敗/要目視（最大60件）---`)
  for (const f of fails) console.log('  ✗ ' + f)
  process.exit(1)
} else {
  console.log('✅ すべて合格' + (manual > 0 ? `（ただし ${manual} 回ぶんは自動照合できず＝要目視）` : ''))
}

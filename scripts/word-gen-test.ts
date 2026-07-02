/*
 * 文章題(word)ジェネレータの ふかい検算（esbuildで束ねてから node で実行）
 *   ./node_modules/.bin/esbuild scripts/word-gen-test.ts --bundle --platform=node --format=esm --outfile=$TMPDIR/word-test.mjs
 *   node $TMPDIR/word-test.mjs
 *
 * 文章題は自然文なので pack-gen-test の式パースでは「要目視」に落ちる。
 * ここでは 各問を N 回まわし、次の 独立チェックで 答え・図・ヒント・タップの一貫性を確かめる：
 *  1 answer は 正の整数
 *  2 最後の explain 行に 答えの数
 *  3 explain[0] に 答えの数を書かない（9ルール）。ただし 問題文にもとから ある数（日付など）は除外
 *  4 explain 内の「A op B = C」式を すべて 独立に再計算して照合
 *  5 tape図の params から 答えを 別経路で 再計算＝一致
 *  6 number-tap の answerNumber が 問題文に ちょうど1回（タップ先が 一意）
 *  7 text/explain に undefined/NaN なし
 */
import { PACK_2026_06, PACK_2026_07, PACK_2026_06B } from '../src/data/packs/index'
import type { Question } from '../src/types'

const packs: Array<[string, Question[]]> = [
  ['2026-06', PACK_2026_06],
  ['2026-07', PACK_2026_07],
  ['2026-06b', PACK_2026_06B],
]

let pass = 0
let fail = 0
const fails: string[] = []
function check(cond: boolean, msg: string) {
  if (cond) pass++
  else {
    fail++
    if (fails.length < 80) fails.push(msg)
  }
}

/** ルビ {漢字|かな} を のぞいて 文中の 数字を すべて とり出す（number-tap の一意チェックと そろえる） */
function textNumbers(text: string): number[] {
  const bare = text.replace(/\{[^|}]*\|[^}]*\}/g, '')
  return (bare.match(/\d+/g) ?? []).map(Number)
}

/** explain 内の「A op B = C」を すべて 独立に 再計算して照合 */
function verifyEquations(id: string, lines: string[]) {
  const re = /(\d+)\s*([+\-×÷])\s*(\d+)\s*=\s*(\d+)/g
  for (const line of lines) {
    re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      const a = Number(m[1])
      const b = Number(m[3])
      const c = Number(m[4])
      let exp: number
      if (m[2] === '+') exp = a + b
      else if (m[2] === '-') exp = a - b
      else if (m[2] === '×') exp = a * b
      else exp = b !== 0 && a % b === 0 ? a / b : NaN
      check(exp === c, `${id}: 式まちがい ${a}${m[2]}${b}=${c}（正しくは ${exp}）`)
    }
  }
}

/** tape図の params から 答えを 別経路で 再計算（説明の式とは 別の 独立チェック） */
function figureAnswer(params: Record<string, unknown>): number | null {
  const parts = Array.isArray(params.parts) ? (params.parts as Array<{ value: number }>) : []
  if (params.mode === 'compare' && parts.length >= 2) {
    return Math.abs(parts[0].value - parts[1].value)
  }
  if (params.unknown === 'total') {
    return parts.reduce((s, p) => s + p.value, 0)
  }
  const total = typeof params.total === 'number' ? params.total : null
  if (params.unknown === 'part' && total != null) {
    const allZero = parts.length > 0 && parts.every((p) => p.value === 0)
    if (allZero) return total % parts.length === 0 ? total / parts.length : NaN // 等分：total / n
    return total - parts.reduce((s, p) => s + p.value, 0) // のこり・2段階・おつり
  }
  return null
}

const N = 5000
const targets: string[] = []
for (const [packName, questions] of packs) {
  for (const q of questions) {
    if (q.type !== 'word' || !q.gen) continue
    targets.push(`${packName}/${q.id}`)
    for (let i = 0; i < N; i++) {
      const v = q.gen(Math.random)
      // 7 健全性
      check(
        typeof v.text === 'string' && v.text.length > 0 && !/undefined|NaN/.test(v.text),
        `${q.id}: text異常 :: ${v.text}`
      )
      check(
        v.explain.length >= 1 && !v.explain.some((l) => /undefined|NaN/.test(l)),
        `${q.id}: explain異常`
      )
      // 1 答えは 正の整数
      check(v.answer.kind === 'number', `${q.id}: answerがnumberでない`)
      if (v.answer.kind !== 'number') continue
      const ans = v.answer.value
      check(Number.isInteger(ans) && ans > 0, `${q.id}: 答えが正の整数でない (${ans})`)
      // 2 最後のヒントに答え
      const last = v.explain[v.explain.length - 1]
      check(last.includes(String(ans)), `${q.id}: 最後のヒントに答え(${ans})が無い :: ${last}`)
      // 3 explain[0] に 答えの数を書かない（問題文にある数＝日付などは除外）
      const hint0Nums = textNumbers(v.explain[0])
      const textNums = textNumbers(v.text)
      check(
        !hint0Nums.includes(ans) || textNums.includes(ans),
        `${q.id}: explain[0]に答え(${ans})が出ている :: ${v.explain[0]}`
      )
      // 4 式の独立再計算
      verifyEquations(q.id, v.explain)
      // 5 tape図から 別経路で再計算
      if (v.figure && v.figure.type === 'tape' && v.figure.params) {
        const fa = figureAnswer(v.figure.params as Record<string, unknown>)
        check(fa === ans, `${q.id}: 図と答えが不一致 図=${fa} 答え=${ans} :: ${v.text}`)
      }
      // 6 number-tap の答えが 文中に ちょうど1回
      if (v.check && v.check.kind === 'number-tap') {
        const target = v.check.answerNumber
        const cnt = textNums.filter((n) => n === target).length
        check(cnt === 1, `${q.id}: number-tapの答え(${target})が 文中に${cnt}回 :: ${v.text}`)
      }
    }
  }
}

console.log(`\n===== 文章題(word) ジェネレータ ふかい検算 =====`)
console.log(`対象 ${targets.length}問: ${targets.join(', ')}`)
console.log(`検算OK: ${pass}  NG: ${fail}`)
if (fail > 0) {
  console.log(`--- 失敗（最大80件）---`)
  for (const f of fails) console.log('  ✗ ' + f)
  process.exit(1)
} else {
  console.log(`✅ すべて合格（各問 ${N}回）`)
}

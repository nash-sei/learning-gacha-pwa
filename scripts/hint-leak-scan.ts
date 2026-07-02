/*
 * 全ての子供問題の「折り畳みヒント(explain[0])」に 答えが 混じっていないか スキャン。
 *   ./node_modules/.bin/esbuild scripts/hint-leak-scan.ts --bundle --platform=node --format=esm --outfile=<out>
 *   node <out>
 * gen付きは 何回か 展開して チェック。static は そのまま。
 * number答え … explain[0] に 答えの数(token)が あり かつ 問題文に その数が 無い＝漏れ疑い
 *              （日付など 問題文にある数は 除外）。
 * choice答え … explain[0] に 正解の選択肢テキスト（丸ごと）が 含まれる＝漏れ疑い。
 */
import { LEGACY_QUESTIONS, PACK_2026_06, PACK_2026_07, PACK_2026_06B } from '../src/data/packs/index'
import type { Question } from '../src/types'

const packs: Array<[string, Question[]]> = [
  ['legacy', LEGACY_QUESTIONS],
  ['2026-06', PACK_2026_06],
  ['2026-07', PACK_2026_07],
  ['2026-06b', PACK_2026_06B],
]

function nums(s: string): number[] {
  const bare = s.replace(/\{[^|}]*\|[^}]*\}/g, '')
  return (bare.match(/\d+/g) ?? []).map(Number)
}

interface Leak {
  pack: string
  id: string
  type: string
  diff: string
  kind: string
  hint0: string
  answer: string
  text: string
}
const leaks: Leak[] = []

function checkOne(pack: string, q: Question, text: string, explain: string[], answerKind: string, answerNum: number | null, correctOpt: string | null) {
  const hint0 = explain[0] ?? ''
  const textNums = nums(text)
  let leaked = false
  if (answerNum != null) {
    // number: ヒントに答えの数が あり かつ 問題文に その数が 無い
    if (nums(hint0).includes(answerNum) && !textNums.includes(answerNum)) leaked = true
  }
  if (correctOpt != null && correctOpt.length > 0) {
    if (hint0.includes(correctOpt)) leaked = true
  }
  if (leaked) {
    leaks.push({
      pack,
      id: q.id,
      type: q.type,
      diff: q.difficulty,
      kind: answerKind,
      hint0,
      answer: answerNum != null ? String(answerNum) : String(correctOpt),
      text,
    })
  }
}

for (const [pack, questions] of packs) {
  for (const q of questions) {
    const reps = q.gen ? 8 : 1
    for (let i = 0; i < reps; i++) {
      const v = q.gen ? q.gen(Math.random) : { text: q.text, explain: q.explain, answer: q.answer }
      const a = v.answer
      if (a.kind === 'number') checkOne(pack, q, v.text, v.explain, 'number', a.value, null)
      else if (a.kind === 'choice') checkOne(pack, q, v.text, v.explain, 'choice', null, a.options[a.correct])
      else checkOne(pack, q, v.text, v.explain, 'order', null, null)
    }
  }
}

// 重複id をまとめる
const byId = new Map<string, Leak>()
for (const l of leaks) if (!byId.has(l.id)) byId.set(l.id, l)

console.log(`\n===== ヒント(explain[0])に答えが混じっている疑い =====`)
console.log(`疑いのある問題: ${byId.size}件\n`)
for (const l of byId.values()) {
  console.log(`[${l.pack}/${l.id}] type=${l.type} diff=${l.diff} 答え(${l.kind})=${l.answer}`)
  console.log(`   問題: ${l.text}`)
  console.log(`   ヒント: ${l.hint0}`)
  console.log('')
}

/*
 * choice / story / vocab / order（数字でない答え）の問題の explain[0] と 正解を 一覧。
 * ヒント(explain[0])が 答えを 言葉で ばらしていないか 目視するため。
 */
import { LEGACY_QUESTIONS, PACK_2026_06, PACK_2026_07, PACK_2026_06B } from '../src/data/packs/index'
import type { Question } from '../src/types'

const packs: Array<[string, Question[]]> = [
  ['legacy', LEGACY_QUESTIONS],
  ['2026-06', PACK_2026_06],
  ['2026-07', PACK_2026_07],
  ['2026-06b', PACK_2026_06B],
]

for (const [pack, questions] of packs) {
  for (const q of questions) {
    const v = q.gen ? q.gen(Math.random) : { text: q.text, explain: q.explain, answer: q.answer }
    const a = v.answer
    if (a.kind === 'number') continue
    const correct = a.kind === 'choice' ? a.options[a.correct] : a.kind === 'order' ? `[order] ${a.tokens.join('/')}` : ''
    console.log(`[${pack}/${q.id}] type=${q.type} diff=${q.difficulty}`)
    console.log(`   Q : ${v.text}`)
    console.log(`   ✔ : ${correct}`)
    console.log(`   H0: ${v.explain[0]}`)
    console.log('')
  }
}

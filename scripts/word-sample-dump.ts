/*
 * 文章題(word)の 出題サンプルを 読める形で ダンプ（独立チェック用）。
 *   ./node_modules/.bin/esbuild scripts/word-sample-dump.ts --bundle --platform=node --format=esm --outfile=<out>
 *   node <out>
 * 各 word 問題を SAMPLES 回 展開し、text / answer / figure / check / explain を そのまま出す。
 */
import { PACK_2026_06, PACK_2026_07, PACK_2026_06B } from '../src/data/packs/index'
import type { Question } from '../src/types'

const packs: Array<[string, Question[]]> = [
  ['2026-06', PACK_2026_06],
  ['2026-07', PACK_2026_07],
  ['2026-06b', PACK_2026_06B],
]

const SAMPLES = 4
for (const [packName, questions] of packs) {
  for (const q of questions) {
    if (q.type !== 'word' || !q.gen) continue
    console.log(`\n########## ${packName} / ${q.id} (grade ${q.grade} / ${q.difficulty}) ##########`)
    for (let i = 0; i < SAMPLES; i++) {
      const v = q.gen(Math.random)
      const a = v.answer
      const ansStr =
        a.kind === 'number' ? `${a.value}${a.unit ?? ''}` : a.kind === 'choice' ? `choice[${a.correct}]=${a.options[a.correct]}` : 'order'
      console.log(`  [${i + 1}] ${v.text}`)
      console.log(`      こたえ: ${ansStr}`)
      if (v.figure) console.log(`      ず: ${v.figure.type} ${JSON.stringify(v.figure.params)}`)
      if (v.check) {
        const c = v.check
        const detail = c.kind === 'number-tap' ? `answerNumber=${c.answerNumber}` : `answer=${c.answer} options=${JSON.stringify(c.options)}`
        console.log(`      チェック(${c.kind}): ${c.prompt} / ${detail}`)
      }
      console.log(`      ヒント: ${JSON.stringify(v.explain)}`)
    }
  }
}

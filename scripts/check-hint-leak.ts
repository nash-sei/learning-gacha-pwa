/*
 * 段階ヒント方式（実機FB 2026-06-13）の品質チェック：
 * 「解説の途中の行（特に1行目=最初のヒント）に答えがそのまま書かれていないか」を全問検査する。
 * - CRITICAL: explain[0] に答えが含まれる（1回目のヒントで答えがバレる）
 * - WARN    : 最終行より前の行に答えが含まれる（2回目のヒントでバレる）
 * 使い方: npx esbuild scripts/check-hint-leak.ts --bundle --format=esm \
 *           --outfile=$TMPDIR/check-hint-leak.mjs && node $TMPDIR/check-hint-leak.mjs
 */
import { BUILTIN_QUESTIONS } from '../src/data/packs'
import type { Question } from '../src/types'

const stripRuby = (s: string) => s.replace(/\{([^|}]+)\|[^}]+\}/g, '$1')

function answerLabel(q: Question): string {
  const a = q.answer
  if (a.kind === 'number') return String(a.value)
  if (a.kind === 'choice') return stripRuby(a.options[a.correct])
  return a.tokens.join('')
}

function lineLeaks(line: string, q: Question): boolean {
  const l = stripRuby(line)
  const a = q.answer
  if (a.kind === 'number') {
    // 数値は前後に数字が続かない単独出現のみ答え漏れとみなす（15 の中の 5 は除外）
    return new RegExp(`(^|[^0-9])${a.value}([^0-9]|$)`).test(l)
  }
  if (a.kind === 'choice') {
    return l.includes(stripRuby(a.options[a.correct]))
  }
  const joined = a.tokens.map(stripRuby).join('')
  return l.replace(/[ 　]/g, '').includes(joined.replace(/[ 　]/g, ''))
}

let critical = 0
let warn = 0
for (const q of BUILTIN_QUESTIONS) {
  const lines = q.explain
  lines.forEach((line, i) => {
    if (i === lines.length - 1) return // 最終行は答えを言ってよい
    if (!lineLeaks(line, q)) return
    const sev = i === 0 ? 'CRITICAL' : 'WARN'
    if (i === 0) critical++
    else warn++
    console.log(`${sev}\t${q.id}\t${q.type}\tanswer=${answerLabel(q)}\tline[${i}]=${line}`)
  })
}
console.log(`---\n全${BUILTIN_QUESTIONS.length}問 / CRITICAL(1行目漏れ)=${critical} / WARN(中間行漏れ)=${warn}`)

/*
 * ルビ記法 {漢字|かんじ} のパーサ。読み上げ(TTS)は使わず、ふりがな表示で読みを支える（spec §5-3 / §1-4）。
 */

export interface RubySegment {
  base: string
  ruby?: string
}

const RUBY_RE = /\{([^|{}]+)\|([^|{}]+)\}/g

/** 文字列をルビセグメント列に分解 */
export function parseRuby(text: string): RubySegment[] {
  const segments: RubySegment[] = []
  let last = 0
  let m: RegExpExecArray | null
  RUBY_RE.lastIndex = 0
  while ((m = RUBY_RE.exec(text)) !== null) {
    if (m.index > last) segments.push({ base: text.slice(last, m.index) })
    segments.push({ base: m[1], ruby: m[2] })
    last = RUBY_RE.lastIndex
  }
  if (last < text.length) segments.push({ base: text.slice(last) })
  return segments
}

/** ルビ記法を外したプレーン文字列（数字抽出・場面判定などに使う） */
export function stripRuby(text: string): string {
  return text.replace(/\{([^|{}]+)\|([^|{}]+)\}/g, '$1')
}

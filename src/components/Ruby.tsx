/*
 * ルビ（ふりがな）表示コンポーネント（spec §5-3）
 * - ルビ記法 {漢字|かんじ} を <ruby>漢字<rt>かんじ</rt></ruby> で描画
 * - 読み上げ(TTS)は使わない方針のため、ふりがな表示が読み支援の本体
 * - ふりがな前提でゆったりした行間（rt の見た目は index.css の @layer base で統一）
 */
import { parseRuby } from '../lib/ruby'

export interface RubyProps {
  text: string
  className?: string
}

export default function Ruby({ text, className }: RubyProps) {
  const segments = parseRuby(text)
  return (
    <span className={`leading-[2.1] whitespace-pre-wrap ${className ?? ''}`}>
      {segments.map((seg, i) =>
        seg.ruby ? (
          <ruby key={i}>
            {seg.base}
            <rt>{seg.ruby}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.base}</span>
        )
      )}
    </span>
  )
}

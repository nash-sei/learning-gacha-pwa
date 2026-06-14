/*
 * タイトルロゴ「ガクモン」（追加機能1-A）
 * 画像ではなく端末内蔵の丸ゴシックを CSS で装飾する（外部フォントなし＝spec §1-4 / 文字が絶対に正しい）。
 * 4文字をアーチ状（中央が上がる弧）に並べ、立体・太い白フチ・カラフルにする。
 * サイズは親から font-size（Tailwind の text-* クラス）を渡して全体スケールする。
 * dy/フチ/影は em 単位なので、font-size を変えても見た目の比率は保たれる。
 */

interface Letter {
  ch: string
  color: string
  /** 回転（度）。両端を外向きに傾けてアーチ感を出す */
  rot: number
  /** 下方向オフセット（em）。両端を下げて弧にする */
  dy: string
}

const LETTERS: Letter[] = [
  { ch: 'ガ', color: '#3aa0ff', rot: -12, dy: '0.22em' },
  { ch: 'ク', color: '#ff5ea0', rot: -4, dy: '0.03em' },
  { ch: 'モ', color: '#ffc02e', rot: 4, dy: '0.03em' },
  { ch: 'ン', color: '#5fc04a', rot: 12, dy: '0.22em' },
]

export interface TitleLogoProps {
  /** Tailwind の text-* など（フォントサイズ＝全体の大きさ） */
  className?: string
}

export default function TitleLogo({ className = '' }: TitleLogoProps) {
  return (
    <div
      role="img"
      aria-label="ガクモン"
      className={`flex select-none items-end justify-center font-extrabold ${className}`}
    >
      {LETTERS.map((l, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block leading-none"
          style={{
            color: l.color,
            transform: `rotate(${l.rot}deg) translateY(${l.dy})`,
            // 太い白フチ（塗りの上にフチを描かない＝paintOrder で塗りを前面に）
            WebkitTextStroke: '0.085em #ffffff',
            paintOrder: 'stroke',
            // 立体感：真下の濃い影＋やわらかいドロップシャドウ
            textShadow:
              '0 0.05em 0 rgba(0,0,0,0.18), 0 0.09em 0.14em rgba(0,0,0,0.30)',
            margin: '0 -0.01em',
          }}
        >
          {l.ch}
        </span>
      ))}
    </div>
  )
}

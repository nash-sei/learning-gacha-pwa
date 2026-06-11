/*
 * 図形の図（spec §5-4・三角形/正方形/長方形＋辺ラベル）
 * params: { kind:'triangle'|'square'|'rectangle', sides?: number[], labels?: string[] }
 * 辺の順番の規約（問題データ係と共通）：
 * - triangle  … [した, ひだり, みぎ]
 * - square    … [した, みぎ]（正方形は1辺で十分。あれば2つ目も表示）
 * - rectangle … [した(よこ), みぎ(たて)]。sides の比率で形を描く
 * labels があればそれを表示（単位込みの文字列推奨）。無ければ sides の数値のみ表示。
 */

function sideText(labels: string[], sides: number[], i: number): string {
  const label = labels[i]
  if (typeof label === 'string' && label !== '') return label
  const v = sides[i]
  return typeof v === 'number' ? String(v) : ''
}

const FILL = '#dbe7ff'
const STROKE = 'var(--color-ink)'

export default function ShapeFigure({ params }: { params: Record<string, unknown> }) {
  const kind =
    params.kind === 'triangle' || params.kind === 'square' || params.kind === 'rectangle'
      ? params.kind
      : null
  if (kind === null) {
    return (
      <div className="mx-auto my-2 w-fit rounded-xl bg-[var(--color-bg-2)] px-4 py-2 text-sm text-[var(--color-ink-soft)]">
        （ず）
      </div>
    )
  }

  const sides = Array.isArray(params.sides)
    ? params.sides.filter((v): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0)
    : []
  const labels = Array.isArray(params.labels)
    ? params.labels.filter((v): v is string => typeof v === 'string')
    : []
  const text = (i: number): string => sideText(labels, sides, i)

  let body
  if (kind === 'triangle') {
    // A(上) B(左下) C(右下)。辺順 = [した B-C, ひだり A-B, みぎ A-C]
    body = (
      <>
        <polygon
          points="100,16 26,126 174,126"
          fill={FILL}
          stroke={STROKE}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {text(0) !== '' && (
          <text x={100} y={144} textAnchor="middle" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(0)}
          </text>
        )}
        {text(1) !== '' && (
          <text x={54} y={70} textAnchor="end" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(1)}
          </text>
        )}
        {text(2) !== '' && (
          <text x={146} y={70} textAnchor="start" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(2)}
          </text>
        )}
      </>
    )
  } else if (kind === 'square') {
    // 辺順 = [した, みぎ]
    body = (
      <>
        <rect x={52} y={22} width={96} height={96} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
        {text(0) !== '' && (
          <text x={100} y={136} textAnchor="middle" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(0)}
          </text>
        )}
        {text(1) !== '' && (
          <text x={154} y={74} textAnchor="start" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(1)}
          </text>
        )}
      </>
    )
  } else {
    // rectangle：sides の比率で描く（既定 3:2）。辺順 = [した(よこ), みぎ(たて)]
    const wVal = sides[0] ?? 3
    const hVal = sides[1] ?? 2
    const scale = Math.min(140 / wVal, 92 / hVal)
    const w = Math.max(wVal * scale, 36)
    const h = Math.max(hVal * scale, 30)
    const x = 100 - w / 2
    const y = 68 - h / 2
    body = (
      <>
        <rect x={x} y={y} width={w} height={h} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
        {text(0) !== '' && (
          <text x={100} y={y + h + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(0)}
          </text>
        )}
        {text(1) !== '' && (
          <text x={x + w + 6} y={72} textAnchor="start" fontSize={13} fontWeight={700} fill={STROKE}>
            {text(1)}
          </text>
        )}
      </>
    )
  }

  return (
    <svg
      viewBox="0 0 200 150"
      className="mx-auto block w-full max-w-[240px]"
      role="img"
      aria-label="ずけいのず"
    >
      {body}
    </svg>
  )
}

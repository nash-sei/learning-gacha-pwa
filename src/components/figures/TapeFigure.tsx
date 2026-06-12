/*
 * テープ図（spec §5-4・小2小3の文章題の数量関係）
 * params: { mode?: 'compare', total?: number, parts?: {label:string, value:number}[], unknown?: 'total'|'part' }
 * 規約（問題データ係と共通）：
 * - 既定（部分‐全体）… parts を1本のテープに連結し、下に「ぜんぶで {total}」を出す
 *   - unknown==='total' … 「ぜんぶ」の数字を ？ にする
 *   - unknown==='part'  … parts の最後の要素と value===0 の要素の数字を ？ にする（値は幅の比率計算にのみ使用。
 *     等分のわり算は全パート value:0 で「？/？/？」になる＝「0」を描いて誤誘導しない）
 * - mode==='compare' … 2量の「ちがい（差）」用。2本のバーを並べて差を「ちがい ？」で示す。
 *   （差を問う問題で「ぜんぶで（合計）」を出すと子供が合計を答えと誤読するため別レイアウトにする）
 * params が不正でも壊さず控えめなプレースホルダを出す。
 */

interface TapePart {
  label: string
  value: number
}

const FILLS = ['#aecbff', '#ffc1dc', '#ffe3a3', '#b9f0cd']

// 幅：各パート最小40pxを保証し、残りを値の比率で配分（合計300px）
const X0 = 10
const TAPE_W = 300
const MIN_W = 40

interface Seg extends TapePart {
  x: number
  w: number
  i: number
}

/** レイアウト計算（レンダー外の純関数・値の比率→x座標と幅） */
function layoutSegments(parts: TapePart[]): Seg[] {
  const sum = parts.reduce((s, p) => s + p.value, 0)
  const flexible = Math.max(TAPE_W - MIN_W * parts.length, 0)
  let cursor = X0
  return parts.map((p, i) => {
    // 全パート未知（等分のわり算＝値が全て0）のときは均等割りにして、下の「ぜんぶで」ブレース幅と一致させる
    const ratio = sum > 0 ? p.value / sum : 1 / parts.length
    const w = MIN_W + ratio * flexible
    const seg = { ...p, x: cursor, w, i }
    cursor += w
    return seg
  })
}

function parseParts(raw: unknown): TapePart[] {
  if (!Array.isArray(raw)) return []
  const out: TapePart[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue
    const rec = item as Record<string, unknown>
    const value =
      typeof rec.value === 'number' && Number.isFinite(rec.value) && rec.value >= 0
        ? rec.value
        : null
    if (value === null) continue
    out.push({ label: typeof rec.label === 'string' ? rec.label : '', value })
  }
  return out
}

/** 比較レイアウト（2量の差）。2本のバーを左そろえで並べ、長い方のはみ出しを「ちがい ？」で示す。 */
function CompareTape({ parts }: { parts: TapePart[] }) {
  const two = parts.slice(0, 2)
  const maxVal = Math.max(...two.map((p) => p.value), 1)
  const scale = TAPE_W / maxVal
  const bars = two.map((p, i) => ({
    ...p,
    i,
    w: Math.max(MIN_W, p.value * scale),
    y: 16 + i * 46,
  }))
  const widths = bars.map((b) => b.w)
  const xShort = X0 + Math.min(...widths)
  const xLong = X0 + Math.max(...widths)
  const hasGap = xLong - xShort > 1

  return (
    <svg
      viewBox="0 0 320 150"
      className="mx-auto block w-full max-w-[340px]"
      role="img"
      aria-label="くらべる テープず"
    >
      {bars.map((b) => (
        <g key={b.i}>
          {b.label !== '' && (
            <text x={X0} y={b.y - 4} fontSize={11} fill="var(--color-ink-soft)">
              {b.label}
            </text>
          )}
          <rect
            x={X0}
            y={b.y}
            width={b.w}
            height={32}
            rx={4}
            fill={FILLS[b.i % FILLS.length]}
            stroke="var(--color-ink)"
            strokeWidth={2}
          />
          <text
            x={X0 + b.w - 8}
            y={b.y + 21}
            textAnchor="end"
            fontSize={15}
            fontWeight={700}
            fill="var(--color-ink)"
          >
            {b.value}
          </text>
        </g>
      ))}
      {hasGap && (
        <g>
          <line
            x1={xShort}
            y1={12}
            x2={xShort}
            y2={114}
            stroke="var(--color-ink-soft)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <path
            d={`M ${xShort} 118 v 6 H ${xLong} v -6`}
            fill="none"
            stroke="var(--color-danger)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <text
            x={(xShort + xLong) / 2}
            y={140}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fill="var(--color-danger)"
          >
            ちがい ？
          </text>
        </g>
      )}
    </svg>
  )
}

export default function TapeFigure({ params }: { params: Record<string, unknown> }) {
  const parts = parseParts(params.parts)
  if (params.mode === 'compare' && parts.length >= 2) {
    return <CompareTape parts={parts} />
  }
  const totalParam =
    typeof params.total === 'number' && Number.isFinite(params.total) && params.total >= 0
      ? params.total
      : null
  const unknown = params.unknown === 'total' || params.unknown === 'part' ? params.unknown : null

  // parts が無く total だけなら 1 本のテープとして描く
  const effectiveParts: TapePart[] =
    parts.length > 0 ? parts : totalParam != null ? [{ label: '', value: totalParam }] : []
  if (effectiveParts.length === 0) {
    return (
      <div className="mx-auto my-2 w-fit rounded-xl bg-[var(--color-bg-2)] px-4 py-2 text-sm text-[var(--color-ink-soft)]">
        （ず）
      </div>
    )
  }

  const total = totalParam ?? effectiveParts.reduce((s, p) => s + p.value, 0)
  const segs = layoutSegments(effectiveParts)

  return (
    <svg
      viewBox="0 0 320 112"
      className="mx-auto block w-full max-w-[340px]"
      role="img"
      aria-label="テープず"
    >
      {segs.map((seg) => (
        <g key={seg.i}>
          <rect
            x={seg.x}
            y={12}
            width={seg.w}
            height={36}
            fill={FILLS[seg.i % FILLS.length]}
            stroke="var(--color-ink)"
            strokeWidth={2}
          />
          <text
            x={seg.x + seg.w / 2}
            y={36}
            textAnchor="middle"
            fontSize={15}
            fontWeight={700}
            fill="var(--color-ink)"
          >
            {unknown === 'part' && (seg.i === segs.length - 1 || seg.value === 0)
              ? '？'
              : seg.value}
          </text>
          {seg.label !== '' && (
            <text
              x={seg.x + seg.w / 2}
              y={62}
              textAnchor="middle"
              fontSize={11}
              fill="var(--color-ink-soft)"
            >
              {seg.label}
            </text>
          )}
        </g>
      ))}
      {/* ぜんぶ（合計）のブレース */}
      <path
        d={`M ${X0} 70 v 7 H ${X0 + TAPE_W} v -7`}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <text
        x={X0 + TAPE_W / 2}
        y={96}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="var(--color-ink)"
      >
        ぜんぶで {unknown === 'total' ? '？' : total}
      </text>
    </svg>
  )
}

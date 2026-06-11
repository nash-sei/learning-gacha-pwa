/*
 * アナログ時計の図（spec §5-4）
 * params: { hour:number, minute:number }
 * - 1〜12 の数字つき文字盤＋長針/短針。範囲外の値は丸め込む
 */

/** 中心(cx,cy)から角度deg(12時=0・時計回り)・長さlenの先端座標 */
function tip(cx: number, cy: number, deg: number, len: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180
  return { x: cx + len * Math.sin(rad), y: cy - len * Math.cos(rad) }
}

export default function ClockFigure({ params }: { params: Record<string, unknown> }) {
  const hourRaw =
    typeof params.hour === 'number' && Number.isFinite(params.hour) ? Math.floor(params.hour) : 0
  const minuteRaw =
    typeof params.minute === 'number' && Number.isFinite(params.minute)
      ? Math.floor(params.minute)
      : 0
  const hour = ((hourRaw % 12) + 12) % 12
  const minute = ((minuteRaw % 60) + 60) % 60

  const C = 70
  const minuteDeg = minute * 6
  const hourDeg = hour * 30 + minute * 0.5
  const hourTip = tip(C, C, hourDeg, 30)
  const minuteTip = tip(C, C, minuteDeg, 44)

  const numbers = []
  for (let n = 1; n <= 12; n++) {
    const pos = tip(C, C, n * 30, 45)
    numbers.push(
      <text
        key={n}
        x={pos.x}
        y={pos.y + 4.5}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill="var(--color-ink)"
      >
        {n}
      </text>
    )
  }

  const ticks = []
  for (let i = 0; i < 60; i++) {
    const major = i % 5 === 0
    const outer = tip(C, C, i * 6, 58)
    const inner = tip(C, C, i * 6, major ? 53 : 56)
    ticks.push(
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke={major ? 'var(--color-ink)' : 'var(--color-ink-faint)'}
        strokeWidth={major ? 2.5 : 1}
        strokeLinecap="round"
      />
    )
  }

  return (
    <svg
      viewBox="0 0 140 140"
      className="mx-auto block w-full max-w-[180px]"
      role="img"
      aria-label="とけいのず"
    >
      <circle cx={C} cy={C} r={62} fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth={3.5} />
      {ticks}
      {numbers}
      {/* 短針（じ） */}
      <line
        x1={C}
        y1={C}
        x2={hourTip.x}
        y2={hourTip.y}
        stroke="var(--color-ink)"
        strokeWidth={6}
        strokeLinecap="round"
      />
      {/* 長針（ふん） */}
      <line
        x1={C}
        y1={C}
        x2={minuteTip.x}
        y2={minuteTip.y}
        stroke="var(--color-primary-dark)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={C} cy={C} r={4.5} fill="var(--color-ink)" />
    </svg>
  )
}

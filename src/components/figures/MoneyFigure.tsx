/*
 * お金の図（spec §5-4・硬貨/お札の組合せ）
 * params: { coins: {yen:number, count:number}[] }
 * - yen >= 1000 はお札（長方形）、それ未満は硬貨（円）として並べる
 * - 5円・50円は穴あき。表示は最大24枚（数えやすさと画面の都合）
 * params が不正でも壊さず控えめなプレースホルダを出す。
 */

interface MoneyItem {
  yen: number
  isBill: boolean
}

const COIN_FILL: Record<number, string> = {
  1: '#e6eaef',
  5: '#d9b95c',
  10: '#c08552',
  50: '#dde2e8',
  100: '#ccd2da',
  500: '#bfc6d2',
}

const BILL_FILL: Record<number, string> = {
  1000: '#dbe9f7',
  5000: '#f3e4d3',
  10000: '#e9e0f0',
}

const HOLE_DENOMS = new Set([5, 50])
const MAX_ITEMS = 24

interface PlacedItem extends MoneyItem {
  x: number
  y: number
  idx: number
}

/** 左から流し込み配置（はみ出したら次の行へ）。レンダー外の純関数 */
function layoutItems(items: MoneyItem[]): { placed: PlacedItem[]; height: number } {
  const MAX_X = 312
  let x = 8
  let y = 8
  const placed = items.map((item, idx) => {
    const w = item.isBill ? 68 : 40
    if (x + w > MAX_X) {
      x = 8
      y += 46
    }
    const p = { ...item, x, y, idx }
    x += w
    return p
  })
  return { placed, height: y + 46 + 4 }
}

export default function MoneyFigure({ params }: { params: Record<string, unknown> }) {
  const rawCoins = Array.isArray(params.coins) ? params.coins : []
  const items: MoneyItem[] = []
  for (const raw of rawCoins) {
    if (typeof raw !== 'object' || raw === null) continue
    const rec = raw as Record<string, unknown>
    const yen =
      typeof rec.yen === 'number' && Number.isFinite(rec.yen) && rec.yen > 0 ? rec.yen : null
    const count =
      typeof rec.count === 'number' && Number.isFinite(rec.count) && rec.count > 0
        ? Math.floor(rec.count)
        : 0
    if (yen === null || count === 0) continue
    for (let i = 0; i < count && items.length < MAX_ITEMS; i++) {
      items.push({ yen, isBill: yen >= 1000 })
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto my-2 w-fit rounded-xl bg-[var(--color-bg-2)] px-4 py-2 text-sm text-[var(--color-ink-soft)]">
        （ず）
      </div>
    )
  }

  const { placed, height } = layoutItems(items)

  return (
    <svg
      viewBox={`0 0 320 ${height}`}
      className="mx-auto block w-full max-w-[340px]"
      role="img"
      aria-label="おかねのず"
    >
      {placed.map((p) =>
        p.isBill ? (
          <g key={p.idx}>
            <rect
              x={p.x}
              y={p.y + 5}
              width={62}
              height={30}
              rx={4}
              fill={BILL_FILL[p.yen] ?? '#e3e6ea'}
              stroke="var(--color-ink)"
              strokeWidth={1.5}
            />
            <text
              x={p.x + 31}
              y={p.y + 24}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {p.yen}
            </text>
          </g>
        ) : (
          <g key={p.idx}>
            <circle
              cx={p.x + 19}
              cy={p.y + 19}
              r={18}
              fill={COIN_FILL[p.yen] ?? '#d8dce2'}
              stroke="var(--color-ink)"
              strokeWidth={1.5}
            />
            {HOLE_DENOMS.has(p.yen) && (
              <circle cx={p.x + 19} cy={p.y + 19} r={4.5} fill="var(--color-surface)" />
            )}
            <text
              x={p.x + 19}
              y={p.y + (HOLE_DENOMS.has(p.yen) ? 33 : 24)}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {p.yen}
            </text>
          </g>
        )
      )}
    </svg>
  )
}

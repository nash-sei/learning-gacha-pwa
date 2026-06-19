/*
 * 大人モードの円盤ルーレット（汎用UI部品）
 * - segments（枠の配分）を外から受け取り、確率（weight）どおりに1枠を当てる。
 *   将来 上級／プレミアムでもこの部品をそのまま使う（初級は今回から稼働）。
 * - 当たりの「中身」処理（モンスター抽選・お金加算など）は呼び出し側（AdultMode）が行う。
 *   この部品は「円盤を回して当たり枠を返す」ところまで責任を持つ。
 * - 演出は試作HTMLと同じ：CSS transform の回転＋ease-out。子供のガチャ資産には触らない。
 */
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { audio } from '../../lib/audio'

export type RouletteKind = 'monster' | 'yen' | 'miss'

export interface RouletteSegment {
  label: string
  /** 当たりやすさの重み（合計に対する比率で角度が決まる） */
  weight: number
  /** 扇形の色 */
  color: string
  kind: RouletteKind
  /** kind==='yen' のときの金額 */
  yen?: number
}

interface Props {
  title: string
  cond?: string
  segments: RouletteSegment[]
  /** 円盤が止まったら当たり枠を返す（中身の処理は親が行う） */
  onFinish: (seg: RouletteSegment, index: number) => void
}

const ADULT_BG = 'linear-gradient(to bottom, #24344d, #141d2e)'
const SPIN_MS = 4800

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}
function sectorPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`
}

export default function AdultRoulette({ title, cond, segments, onFinish }: Props) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)

  const total = useMemo(() => segments.reduce((s, x) => s + x.weight, 0), [segments])

  const shapes = useMemo(() => {
    let acc = 0
    const paths: ReactNode[] = []
    const labels: ReactNode[] = []
    segments.forEach((seg, i) => {
      const a0 = (acc / total) * 360
      acc += seg.weight
      const a1 = (acc / total) * 360
      paths.push(
        <path key={`p${i}`} d={sectorPath(150, 150, 140, a0, a1)} fill={seg.color} stroke="#0b1220" strokeWidth={1.5} />
      )
      const mid = (a0 + a1) / 2
      const [lx, ly] = polar(150, 150, 98, mid)
      const fs = a1 - a0 < 14 ? 10 : 13
      labels.push(
        <text key={`t${i}`} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize={fs} fontWeight={800} fill="#0b1220">
          {seg.label}
        </text>
      )
    })
    return { paths, labels }
  }, [segments, total])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    audio.playSe('drumroll')
    // 重みで当たり枠を抽選
    let r = Math.random() * total
    let acc = 0
    let idx = 0
    for (let i = 0; i < segments.length; i++) {
      acc += segments[i].weight
      if (r < acc) {
        idx = i
        break
      }
    }
    // その枠の角度範囲（端を避けて中央寄りで止める）
    let before = 0
    for (let i = 0; i < idx; i++) before += segments[i].weight
    const a0 = (before / total) * 360
    const a1 = ((before + segments[idx].weight) / total) * 360
    const targetAngle = a0 + (a1 - a0) * (0.18 + 0.64 * Math.random())
    const spins = 5
    const desiredMod = (((360 - targetAngle) % 360) + 360) % 360
    const curMod = ((rotation % 360) + 360) % 360
    const delta = (desiredMod - curMod + 360) % 360
    setRotation(rotation + spins * 360 + delta)
    window.setTimeout(() => {
      const seg = segments[idx]
      audio.playSe(seg.kind === 'miss' ? 'wrong' : 'reveal-sr')
      onFinish(seg, idx)
    }, SPIN_MS + 100)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 p-6" style={{ background: ADULT_BG }}>
      <h1 className="text-center text-2xl font-extrabold text-white">{title}</h1>
      {cond && <p className="text-center text-sm font-bold text-[#ffe9a8]">{cond}</p>}
      <div className="relative" style={{ width: 300, height: 316 }}>
        <div
          style={{
            position: 'absolute',
            top: -2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderTop: '26px solid #fbbf24',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.5))',
            zIndex: 5,
          }}
        />
        <svg width={300} height={300} viewBox="0 0 300 300">
          <circle cx={150} cy={150} r={146} fill="#0b1220" />
          <g
            style={{
              transformOrigin: '150px 150px',
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.16,0.86,0.18,1)` : 'none',
            }}
          >
            {shapes.paths}
            {shapes.labels}
          </g>
          <circle cx={150} cy={150} r={26} fill="#16213a" stroke="#fbbf24" strokeWidth={3} />
          <text x={150} y={150} textAnchor="middle" dominantBaseline="middle" fontSize={20}>
            🎯
          </text>
        </svg>
      </div>
      <button
        disabled={spinning}
        onClick={spin}
        className="btn-kid bg-[var(--color-accent)] px-10 py-3 text-lg disabled:opacity-60"
      >
        {spinning ? 'まわってる…' : 'まわす！'}
      </button>
    </div>
  )
}

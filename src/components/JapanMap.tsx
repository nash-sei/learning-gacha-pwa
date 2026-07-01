/*
 * 日本地図（社会・都道府県の「地図で答える」入力）。
 * - いまは「8つの地方＋沖縄」レベル（絵コンテ v3 で社長承認）。
 * - 本番の 47 都道府県レベル化は次の集中作業（都道府県マップ・別モック予定）。
 * - タップした地域の ID（'hokkaido' 等）を onPick で返すだけ。正解判定は Quiz 側（checkAnswer の map）。
 * - 外部URL・画像は使わず SVG を同梱（spec §1-3）。
 */
import { audio } from '../lib/audio'

export interface JapanMapProps {
  /** 地域をタップしたとき（地域ID を返す） */
  onPick: (regionId: string) => void
  /** 判定後などタップを止めたいとき */
  disabled?: boolean
}

interface Region {
  id: string
  label: string
  /** path の d（circle の場合は未使用） */
  d?: string
  /** 沖縄など circle 表現 */
  circle?: { cx: number; cy: number; r: number }
  /** ラベル位置 */
  lx: number
  ly: number
}

const REGIONS: Region[] = [
  { id: 'hokkaido', label: 'ほっかいどう', d: 'M215,20 q35,-8 40,25 q5,30 -20,40 q-30,8 -38,-18 q-6,-38 18,-47 z', lx: 230, ly: 52 },
  { id: 'tohoku', label: 'とうほく', d: 'M186,92 q26,-4 30,20 l2,44 q-2,20 -26,20 q-20,-2 -20,-24 l0,-40 q0,-16 4,-20 z', lx: 200, ly: 150 },
  { id: 'kanto', label: 'かんとう', d: 'M190,178 q24,-2 26,18 q2,20 -18,24 q-22,4 -26,-14 q-4,-22 18,-28 z', lx: 200, ly: 202 },
  { id: 'chubu', label: 'ちゅうぶ', d: 'M150,168 q22,-4 30,16 q6,22 -6,34 q-16,10 -34,-2 q-16,-14 -6,-34 q6,-12 16,-14 z', lx: 155, ly: 196 },
  { id: 'kinki', label: 'きんき', d: 'M116,192 q22,-4 26,14 q3,20 -16,24 q-22,4 -26,-14 q-3,-20 16,-24 z', lx: 122, ly: 212 },
  { id: 'chugoku', label: 'ちゅうごく', d: 'M74,196 q26,-4 30,12 q3,16 -18,20 q-30,4 -34,-10 q-3,-16 22,-22 z', lx: 86, ly: 214 },
  { id: 'shikoku', label: 'しこく', d: 'M92,232 q22,-3 26,8 q2,12 -14,15 q-22,3 -26,-8 q-2,-12 14,-15 z', lx: 102, ly: 248 },
  { id: 'kyushu', label: 'きゅうしゅう', d: 'M50,232 q20,-4 24,14 q4,22 -8,34 q-14,12 -28,0 q-14,-14 -6,-34 q6,-12 18,-14 z', lx: 56, ly: 266 },
  { id: 'okinawa', label: 'おきなわ', circle: { cx: 30, cy: 300, r: 12 }, lx: 30, ly: 303 },
]

export default function JapanMap({ onPick, disabled }: JapanMapProps) {
  const handle = (id: string) => {
    if (disabled) return
    audio.playSe('tap')
    onPick(id)
  }
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)] p-2">
      <svg viewBox="0 0 300 320" className="block h-auto w-full" role="group" aria-label="にほんちず">
        {REGIONS.map((reg) => (
          <g
            key={reg.id}
            onClick={() => handle(reg.id)}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
            className="transition active:opacity-70"
          >
            {reg.d ? (
              <path d={reg.d} fill="#a5d8c8" stroke="#2ec4a6" strokeWidth={2} />
            ) : reg.circle ? (
              <circle cx={reg.circle.cx} cy={reg.circle.cy} r={reg.circle.r} fill="#a5d8c8" stroke="#2ec4a6" strokeWidth={2} />
            ) : null}
            <text
              x={reg.lx}
              y={reg.ly}
              textAnchor="middle"
              style={{ fontSize: 9, fontWeight: 800, fill: '#0b3d34', pointerEvents: 'none' }}
            >
              {reg.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/*
 * ガチャ演出の共通パーツ（Gacha と ShardEgg で共用・spec §6 / §8）
 * - SR/UR を「ゴージャスに見せる」ための見た目だけの部品。状態は持たない。
 */
import { motion } from 'framer-motion'

/** 虹色グラデ（UR・かけらタマゴ共通） */
export const RAINBOW = 'linear-gradient(90deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)'

export interface StarPiece {
  id: number
  /** 卵の中心からの角度（ラジアン） */
  angle: number
  /** 卵の中心からの距離（px） */
  radius: number
  delay: number
  size: number
}

/** SR：卵のまわりをぐるりと囲む金色の星（ピカピカ・卵に寄せて散らす） */
export function SparkleStars({ stars }: { stars: StarPiece[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {stars.map((s) => {
        const dx = Math.cos(s.angle) * s.radius
        const dy = Math.sin(s.angle) * s.radius * 1.25 // 卵は縦長なので縦に広げる
        return (
          <motion.span
            key={s.id}
            className="absolute font-black leading-none"
            style={{
              fontSize: s.size,
              color: '#ffe27a',
              textShadow: '0 0 12px rgba(255,196,60,1), 0 0 5px #ffffff',
            }}
            initial={{ x: dx, y: dy, opacity: 0.1, scale: 0.4 }}
            animate={{ x: dx, y: dy, opacity: [0.1, 1, 0.1], scale: [0.4, 1.4, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.0, delay: s.delay, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
        )
      })}
    </div>
  )
}

export interface RainbowBand {
  id: number
  side: 'left' | 'right'
  top: number
  delay: number
}

/** UR：卵に降りそそぐ虹のすじ（卵フェーズで重ねる） */
export function RainbowFall({ bands }: { bands: RainbowBand[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bands.map((b) => {
        const fromLeft = b.side === 'left'
        return (
          <motion.div
            key={b.id}
            className="absolute h-2.5 w-44 rounded-full"
            style={{
              top: `${b.top}%`,
              [fromLeft ? 'left' : 'right']: '-30%',
              rotate: fromLeft ? '38deg' : '-38deg',
              background: RAINBOW,
            }}
            initial={{ x: fromLeft ? '-60%' : '60%', y: '-130%', opacity: 0 }}
            animate={{ x: fromLeft ? '40%' : '-40%', y: '130%', opacity: [0, 0.95, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: b.delay, ease: 'easeIn' }}
          />
        )
      })}
    </div>
  )
}

/** UR：太鼓のかわりの導入。まず右から、つづいて左から、虹がふわっと流れてくる */
export function RainbowSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* まず右から */}
      <motion.div
        className="absolute inset-x-0 h-28 rounded-full"
        style={{ top: '24%', background: RAINBOW, filter: 'blur(11px)' }}
        initial={{ x: '120%', opacity: 0, rotate: -6 }}
        animate={{ x: ['120%', '0%', '-25%'], opacity: [0, 0.95, 0.5], rotate: -6 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      {/* つづいて左から（おくれて） */}
      <motion.div
        className="absolute inset-x-0 h-28 rounded-full"
        style={{ top: '52%', background: RAINBOW, filter: 'blur(11px)' }}
        initial={{ x: '-120%', opacity: 0, rotate: 6 }}
        animate={{ x: ['-120%', '0%', '25%'], opacity: [0, 0.95, 0.5], rotate: 6 }}
        transition={{ duration: 1.6, delay: 0.75, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** 虹色のコニックグラデ（円盤・オーロラ用） */
const RAINBOW_CONIC =
  'conic-gradient(#ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff, #ff5e5e)'

/** SR：卵の背後でゆっくり回り続ける金色の放射光（点ではなく「面」で光らせる） */
export function GoldRays() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-[130%] w-[130%] rounded-full"
        style={{
          background:
            'repeating-conic-gradient(rgba(255,255,255,0) 0deg, rgba(255,205,90,0.55) 4deg, rgba(255,255,255,0) 12deg)',
          maskImage: 'radial-gradient(circle, #000 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle, #000 10%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.6 }}
        transition={{
          rotate: { repeat: Infinity, duration: 9, ease: 'linear' },
          opacity: { duration: 0.6 },
        }}
      />
    </div>
  )
}

/** UR：画面全体にぼんやり広がる虹のオーロラ（ゆっくりうねる土台の光） */
export function RainbowAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-[230%] w-[230%] rounded-full"
        style={{ background: RAINBOW_CONIC, filter: 'blur(70px)', mixBlendMode: 'screen' }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.5 }}
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: 'linear' },
          opacity: { duration: 1 },
        }}
      />
    </div>
  )
}

/** SR/UR：登場したモンスターの背後で回る後光（王冠のような光輪） */
export function RevealHalo({ kind }: { kind: 'gold' | 'rainbow' }) {
  const bg =
    kind === 'rainbow'
      ? RAINBOW_CONIC
      : 'repeating-conic-gradient(rgba(255,255,255,0) 0deg, rgba(255,210,90,0.75) 5deg, rgba(255,255,255,0) 15deg)'
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="h-72 w-72 rounded-full"
        style={{
          background: bg,
          filter: kind === 'rainbow' ? 'blur(10px)' : 'none',
          mixBlendMode: 'screen',
          maskImage: 'radial-gradient(circle, #000 18%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, #000 18%, transparent 70%)',
        }}
        initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 360, scale: 1, opacity: 0.9 }}
        transition={{
          rotate: { repeat: Infinity, duration: 7, ease: 'linear' },
          scale: { type: 'spring', stiffness: 200, damping: 18 },
          opacity: { duration: 0.4 },
        }}
      />
    </div>
  )
}

/** SR/UR：登場の瞬間に広がる光の輪（1発） */
export function ShockRing({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="rounded-full"
        style={{ width: 120, height: 120, border: `5px solid ${color}` }}
        initial={{ scale: 0.3, opacity: 0.9 }}
        animate={{ scale: 3.6, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}

/**
 * SR/UR：卵が割れた瞬間、卵から放射状に光が飛び出す（円形フラッシュではなく光のすじ）。
 * tint＝光の色味（SR=金 / UR=虹むらさき）。
 */
export function EggBurst({ tint }: { tint: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
      {/* 放射状の光のすじ（卵から外へ飛び出す） */}
      <motion.div
        className="absolute h-[150%] w-[150%] rounded-full"
        style={{
          background: `repeating-conic-gradient(rgba(255,255,255,0) 0deg, ${tint} 3deg, rgba(255,255,255,0.95) 6deg, rgba(255,255,255,0) 11deg)`,
          maskImage: 'radial-gradient(circle, #000 6%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle, #000 6%, transparent 60%)',
        }}
        initial={{ scale: 0.04, opacity: 0, rotate: 0 }}
        animate={{ scale: [0.04, 1, 1.55], opacity: [0, 1, 0], rotate: [0, 16, 30] }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      />
      {/* まんなかの強い光（卵から出る芯） */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 80,
          height: 80,
          background:
            'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0) 72%)',
        }}
        initial={{ scale: 0.15, opacity: 0 }}
        animate={{ scale: [0.15, 3.2, 5], opacity: [0.95, 1, 0] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  )
}

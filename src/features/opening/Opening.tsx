/*
 * オープニング演出（追加機能1-B）＝見比べ用に「4パターン切り替え」版
 * モンスターのカラー絵が「一部だけ」大きく見切れて次々あらわれ、最後に「ガクモン」ロゴが登場。
 * 画面タップでホームへ。右下の「つぎ▶」ボタンで演出パターンを切り替えて見比べできる。
 * ※採用パターンが決まったら PATTERNS を1つに絞り、切り替えボタンを外す予定。
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { monsterSprite } from '../../data/monsters'
import { audio } from '../../lib/audio'
import TitleLogo from '../../components/TitleLogo'

/** 1体あたりの表示時間（ms）。ゆっくり流す */
const SILHOUETTE_MS = 1200

/** オープニングに出すモンスター（N=m01 / R=m12 / SR=m46 / UR=m49） */
const MONSTER_IDS = ['m01', 'm12', 'm46', 'm49']

interface Frame {
  fromX: string
  fromY: string
  toX: string
  toY: string
  exitX: string
  exitY: string
  scaleFrom?: number
  scaleTo?: number
}

interface Pattern {
  label: string
  width: string
  duration: number
  zoom?: boolean
  frames: Frame[]
}

/** 見比べ用の4パターン（社長が「つぎ▶」で切り替えて選ぶ） */
const PATTERNS: Pattern[] = [
  {
    label: 'ジグザグ',
    width: 'max(150vw, 150vh)',
    duration: 1.15,
    frames: [
      { fromX: '-26%', fromY: '-24%', toX: '-3%', toY: '-2%', exitX: '20%', exitY: '24%' },
      { fromX: '26%', fromY: '-24%', toX: '3%', toY: '-2%', exitX: '-20%', exitY: '24%' },
      { fromX: '-26%', fromY: '-22%', toX: '-2%', toY: '3%', exitX: '20%', exitY: '26%' },
      { fromX: '26%', fromY: '-24%', toX: '2%', toY: '1%', exitX: '-20%', exitY: '24%' },
    ],
  },
  {
    label: 'よこながれ',
    width: 'max(150vw, 150vh)',
    duration: 1.25,
    frames: [
      { fromX: '-36%', fromY: '-2%', toX: '0%', toY: '-2%', exitX: '36%', exitY: '-2%' },
      { fromX: '36%', fromY: '2%', toX: '0%', toY: '2%', exitX: '-36%', exitY: '2%' },
      { fromX: '-36%', fromY: '-5%', toX: '0%', toY: '-5%', exitX: '36%', exitY: '-5%' },
      { fromX: '36%', fromY: '5%', toX: '0%', toY: '5%', exitX: '-36%', exitY: '5%' },
    ],
  },
  {
    label: 'ズームイン',
    width: 'max(130vw, 130vh)',
    duration: 1.1,
    zoom: true,
    frames: [
      { fromX: '-6%', fromY: '-8%', toX: '-2%', toY: '-2%', exitX: '6%', exitY: '10%', scaleFrom: 0.6, scaleTo: 1.2 },
      { fromX: '6%', fromY: '-8%', toX: '2%', toY: '-2%', exitX: '-6%', exitY: '10%', scaleFrom: 0.6, scaleTo: 1.2 },
      { fromX: '-6%', fromY: '-6%', toX: '-2%', toY: '2%', exitX: '6%', exitY: '12%', scaleFrom: 0.6, scaleTo: 1.2 },
      { fromX: '6%', fromY: '-8%', toX: '2%', toY: '0%', exitX: '-6%', exitY: '10%', scaleFrom: 0.6, scaleTo: 1.2 },
    ],
  },
  {
    label: 'ゆっくりパン',
    width: 'max(175vw, 175vh)',
    duration: 1.5,
    frames: [
      { fromX: '-30%', fromY: '-30%', toX: '0%', toY: '0%', exitX: '30%', exitY: '30%' },
      { fromX: '30%', fromY: '-30%', toX: '0%', toY: '0%', exitX: '-30%', exitY: '30%' },
      { fromX: '-30%', fromY: '-28%', toX: '2%', toY: '2%', exitX: '30%', exitY: '30%' },
      { fromX: '30%', fromY: '-30%', toX: '-2%', toY: '0%', exitX: '-30%', exitY: '30%' },
    ],
  },
]

const STARS = [
  { left: '12%', top: '18%', size: 10, delay: '0s' },
  { left: '78%', top: '14%', size: 14, delay: '0.4s' },
  { left: '24%', top: '72%', size: 12, delay: '0.8s' },
  { left: '86%', top: '64%', size: 9, delay: '0.2s' },
  { left: '52%', top: '10%', size: 8, delay: '0.6s' },
  { left: '66%', top: '82%', size: 13, delay: '1s' },
  { left: '8%', top: '48%', size: 11, delay: '0.3s' },
  { left: '92%', top: '40%', size: 10, delay: '0.9s' },
]

export interface OpeningProps {
  onDone: () => void
}

export default function Opening({ onDone }: OpeningProps) {
  const [patternIndex, setPatternIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'silhouettes' | 'title'>('silhouettes')
  const doneRef = useRef(false)

  // シルエットを順番に送り、最後まで来たらタイトルへ
  useEffect(() => {
    if (phase !== 'silhouettes') return
    audio.playSe('drumroll')
    const timer = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= MONSTER_IDS.length) {
          window.clearInterval(timer)
          setPhase('title')
          return i
        }
        return i + 1
      })
    }, SILHOUETTE_MS)
    return () => window.clearInterval(timer)
  }, [phase, patternIndex])

  // タイトル登場で派手な音
  useEffect(() => {
    if (phase === 'title') audio.playSe('reveal-ur')
  }, [phase])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    audio.playSe('tap')
    onDone()
  }

  // タップ：タイトルならホームへ進む / シルエット中ならスキップしてタイトルへ
  const handleTap = () => {
    if (phase === 'title') finish()
    else setPhase('title')
  }

  // 「つぎ▶」：次の演出パターンへ＋最初から再生（ボタンのタップは親に伝えない）
  const nextPattern = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    audio.playSe('tap')
    setPatternIndex((p) => (p + 1) % PATTERNS.length)
    setIndex(0)
    setPhase('silhouettes')
  }

  const v = PATTERNS[patternIndex]
  const f = v.frames[index]

  return (
    <div
      className="relative grid min-h-dvh cursor-pointer place-items-center overflow-hidden"
      style={{
        background: 'radial-gradient(120% 80% at 50% 32%, #3b3f72, #1c1e38 68%, #0d0e1c)',
      }}
      onClick={handleTap}
    >
      {/* きらめく星 */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="anim-sparkle pointer-events-none absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
          }}
        />
      ))}

      {/* mode 指定なし＝入れ替えを重ねてクロスフェード */}
      <AnimatePresence>
        {phase === 'silhouettes' ? (
          <motion.img
            key={`${patternIndex}-${MONSTER_IDS[index]}`}
            src={monsterSprite(MONSTER_IDS[index])}
            alt=""
            draggable={false}
            className="pointer-events-none col-start-1 row-start-1 max-w-none select-none object-contain"
            style={{
              width: v.width,
              filter: 'drop-shadow(0 0 26px rgba(150,180,255,0.5))',
            }}
            initial={{ x: f.fromX, y: f.fromY, opacity: 0, ...(v.zoom ? { scale: f.scaleFrom } : {}) }}
            animate={{ x: f.toX, y: f.toY, opacity: 0.95, ...(v.zoom ? { scale: f.scaleTo } : {}) }}
            exit={{ x: f.exitX, y: f.exitY, opacity: 0, ...(v.zoom ? { scale: f.scaleTo } : {}) }}
            transition={{ duration: v.duration, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div key="title" className="col-start-1 row-start-1 flex flex-col items-center gap-7 px-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.12 }}
            >
              <TitleLogo className="text-7xl sm:text-8xl" />
            </motion.div>
            <motion.p
              className="text-xl font-extrabold text-white"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ delay: 0.6, duration: 1.6, repeat: Infinity }}
            >
              タップして はじめる
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 見比べ用：演出パターン切り替えボタン（採用が決まったら外す） */}
      <button
        onClick={nextPattern}
        className="absolute right-4 bottom-5 z-20 rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-[var(--color-ink)] shadow-lg active:scale-95"
      >
        えんしゅつ {patternIndex + 1}/{PATTERNS.length}（{v.label}）つぎ ▶
      </button>
    </div>
  )
}

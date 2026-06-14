/*
 * オープニング演出（追加機能1-B）＝「よこながれ」採用版（社長決定: 2番）
 * モンスターのカラー絵が左右交互に横からスーッと流れ、画面中央で顔・体がよく見える。
 * 全身は見せず（画面より少し大きい＝端が切れる）「これ何のモンスター!?」を残す。
 * 最後に「ガクモン」タイトルロゴが登場。画面タップでホームへ。
 *
 * 大きさ：width=max(120vw,120vh)＝画面より少しだけ大きい。大きすぎず、形が分かる。
 * 位置：to を中央(x:0)にして、一番見える瞬間にモンスターの真ん中が画面中央に来る。
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { monsterSprite } from '../../data/monsters'
import { audio } from '../../lib/audio'
import TitleLogo from '../../components/TitleLogo'

/** 1体あたりの表示時間（ms）。ゆっくり見せる */
const SILHOUETTE_MS = 1400

/** モンスターの画像の大きさ（画面の長い辺より少し大きく＝端が少し切れる程度） */
const IMG_WIDTH = 'max(120vw, 120vh)'

/**
 * 左右交互の横ながれ（N=m01 / R=m12 / SR=m46 / UR=m49）。
 * to は中央(x:0)＝一番見える瞬間に顔・体が画面中央に来る。y は少しだけずらして単調さを防ぐ。
 */
const SLIDES = [
  { id: 'm01', fromX: '-32%', toX: '0%', exitX: '32%', y: '-2%' },
  { id: 'm12', fromX: '32%', toX: '0%', exitX: '-32%', y: '2%' },
  { id: 'm46', fromX: '-32%', toX: '0%', exitX: '32%', y: '-2%' },
  { id: 'm49', fromX: '32%', toX: '0%', exitX: '-32%', y: '2%' },
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
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'silhouettes' | 'title'>('silhouettes')
  const doneRef = useRef(false)

  // モンスターを順番に流し、最後まで来たらタイトルへ
  useEffect(() => {
    if (phase !== 'silhouettes') return
    audio.playSe('drumroll')
    const timer = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= SLIDES.length) {
          window.clearInterval(timer)
          setPhase('title')
          return i
        }
        return i + 1
      })
    }, SILHOUETTE_MS)
    return () => window.clearInterval(timer)
  }, [phase])

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

  // タップ：タイトルならホームへ進む / 流れている途中ならスキップしてタイトルへ
  const handleTap = () => {
    if (phase === 'title') finish()
    else setPhase('title')
  }

  const s = SLIDES[index]

  return (
    <div
      className="relative grid min-h-dvh cursor-pointer place-items-center overflow-hidden"
      style={{
        background: 'radial-gradient(120% 80% at 50% 32%, #3b3f72, #1c1e38 68%, #0d0e1c)',
      }}
      onClick={handleTap}
    >
      {/* きらめく星 */}
      {STARS.map((st, i) => (
        <span
          key={i}
          className="anim-sparkle pointer-events-none absolute rounded-full bg-white"
          style={{
            left: st.left,
            top: st.top,
            width: st.size,
            height: st.size,
            animationDelay: st.delay,
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
          }}
        />
      ))}

      {/* mode 指定なし＝入れ替えを重ねてクロスフェード */}
      <AnimatePresence>
        {phase === 'silhouettes' ? (
          <motion.img
            key={s.id}
            src={monsterSprite(s.id)}
            alt=""
            draggable={false}
            className="pointer-events-none col-start-1 row-start-1 max-w-none select-none object-contain"
            style={{
              width: IMG_WIDTH,
              filter: 'drop-shadow(0 0 26px rgba(150,180,255,0.5))',
            }}
            initial={{ x: s.fromX, y: s.y, opacity: 0 }}
            animate={{ x: s.toX, y: s.y, opacity: 0.95 }}
            exit={{ x: s.exitX, y: s.y, opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
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
    </div>
  )
}

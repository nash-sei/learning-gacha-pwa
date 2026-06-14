/*
 * オープニング演出（追加機能1-B）
 * 起動時に N/R/SR/UR モンスターのシルエットが「一部だけ大きく見切れて」次々あらわれ、
 * 上から斜め下へゆっくり流れる。中身が分からず「これ何のモンスター!?」をかき立てる。
 * 最後に「ガクモン」タイトルロゴがボンっと登場。画面タップでホームへ進む。
 * - 拡大＋位置ずらし＋親の overflow-hidden で体の一部分だけを見せる（全身は出さない）
 * - 半透明＋青い発光で輪郭だけうっすら見せる
 * - 毎起動で1回（App 側の showOpening がリロードで true に戻る）
 * - シルエット中にタップすると即タイトルへスキップ（子供が待ちきれない時の救済）
 * - 音はタップ前は鳴らない場合がある（iOS 自動再生制限）が、演出は崩れない
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { monsterSprite } from '../../data/monsters'
import { audio } from '../../lib/audio'
import TitleLogo from '../../components/TitleLogo'

/** シルエット1体あたりの表示時間（ms）。ゆっくり流す */
const SILHOUETTE_MS = 1200

/**
 * オープニングに出すシルエット（N=m01 / R=m12 / SR=m46 / UR=m49）。
 * scale で拡大して画面からはみ出させ、from→to の移動で「見える部分」と「斜め下へ流れる動き」を作る。
 * 数値は px（モバイル縦を基準にした感覚値・実機で微調整可）。
 */
const SILHOUETTES = [
  { id: 'm01', fromX: '-12%', fromY: '-32%', toX: '-6%', toY: '-12%', exitX: '0%', exitY: '8%' },
  { id: 'm12', fromX: '14%', fromY: '-34%', toX: '8%', toY: '-6%', exitX: '14%', exitY: '12%' },
  { id: 'm46', fromX: '-14%', fromY: '-24%', toX: '4%', toY: '10%', exitX: '10%', exitY: '28%' },
  { id: 'm49', fromX: '10%', fromY: '-36%', toX: '-3%', toY: '6%', exitX: '4%', exitY: '24%' },
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

  // シルエットを順番に送り、最後まで来たらタイトルへ
  useEffect(() => {
    if (phase !== 'silhouettes') return
    audio.playSe('drumroll')
    const timer = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= SILHOUETTES.length) {
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

  // タップ：タイトルならホームへ進む / シルエット中ならスキップしてタイトルへ
  const handleTap = () => {
    if (phase === 'title') finish()
    else setPhase('title')
  }

  const cur = SILHOUETTES[index]

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

      {/* mode 指定なし＝入れ替えを重ねてクロスフェード（mode="wait" だと前の退場を待ち間延びする） */}
      <AnimatePresence>
        {phase === 'silhouettes' ? (
          <motion.img
            key={cur.id}
            src={monsterSprite(cur.id)}
            alt=""
            draggable={false}
            className="pointer-events-none col-start-1 row-start-1 max-w-none select-none object-contain"
            style={{
              // 画面の長い辺より大きく＝どの端末でも必ず一部だけ見える
              width: 'max(118vw, 118vh)',
              // カラーのまま見せる（白く塗りつぶさない）。青い発光で縁を少し際立たせる
              filter: 'drop-shadow(0 0 26px rgba(150,180,255,0.5))',
            }}
            initial={{ x: cur.fromX, y: cur.fromY, opacity: 0 }}
            animate={{ x: cur.toX, y: cur.toY, opacity: 0.95 }}
            exit={{ x: cur.exitX, y: cur.exitY, opacity: 0 }}
            transition={{ duration: 1.15, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div key="title" className="col-start-1 row-start-1 flex flex-col items-center gap-7 px-6">
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
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

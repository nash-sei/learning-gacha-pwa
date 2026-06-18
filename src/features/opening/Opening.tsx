/*
 * オープニング演出（追加機能1-B）＝「よこながれ」採用版（社長決定: 2番）
 * モンスターのカラー絵が左右交互に横からスーッと流れ、画面中央で顔・体がよく見える。
 * 全身は見せず（画面より少し大きい＝端が切れる）「これ何のモンスター!?」を残す。
 * 最後に「ガクモン」タイトルロゴが画面中央に登場。画面タップでホームへ。
 *
 * タイトルは「画面全体の中央レイヤー」として別に出す（モンスター画像の大きさに引っぱられて
 * 位置がズレる＝『が』が右に出る不具合を防ぐ）。モンスターはグリッド中央、タイトルは absolute 中央。
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { monsterSprite } from '../../data/monsters'
import { audio } from '../../lib/audio'
import TitleLogo from '../../components/TitleLogo'

/** 1体あたりの表示時間（ms）。ゆっくり見せる */
const SILHOUETTE_MS = 1400

/** モンスター画像の大きさ（画面の長い辺より少し大きく＝端が少し切れる程度） */
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

/*
 * タイトル登場シーンの背景に散りばめる「モンスターのシルエット（影絵）」。
 * 新規画像は作らず既存 public/monsters/*.webp を暗いフィルタ＋青いふちの光で影絵にする。
 * 中央（タイトル＋本の場所）は空けて、タイトルをぐるりと囲むように配置する。
 * left/top は「中央520pxの枠」基準の中心点（widescreen でもタイトルから離れすぎない）。
 * 要素は translate(-50%,-50%) で中央寄せ。dur/delay でゆらゆらをバラす。
 */
const SILHOUETTES = [
  { id: 'm07', left: '50%', top: '7%', size: 74, delay: '0.9s', dur: '4.5s' }, // 真上
  { id: 'm03', left: '22%', top: '13%', size: 94, delay: '0s', dur: '4.2s' }, // 左上
  { id: 'm46', left: '78%', top: '12%', size: 100, delay: '0.5s', dur: '3.7s' }, // 右上
  { id: 'm24', left: '12%', top: '35%', size: 78, delay: '0.7s', dur: '4.0s' }, // 左
  { id: 'm31', left: '88%', top: '35%', size: 76, delay: '0.3s', dur: '4.8s' }, // 右
  { id: 'm12', left: '11%', top: '64%', size: 84, delay: '0.6s', dur: '4.6s' }, // 左下
  { id: 'm49', left: '89%', top: '64%', size: 90, delay: '0.2s', dur: '4.3s' }, // 右下
  { id: 'd04', left: '27%', top: '85%', size: 84, delay: '1.0s', dur: '3.9s' }, // 下左
  { id: 'm20', left: '73%', top: '85%', size: 74, delay: '0.4s', dur: '4.4s' }, // 下右
]

export interface OpeningProps {
  onDone: () => void
}

export default function Opening({ onDone }: OpeningProps) {
  const [index, setIndex] = useState(0)
  // 'start'=「タップしてはじめる」画面。最初のタップで音を解禁してから本編が始まる
  // （iPhone等は仕様上、画面タップ前は音が鳴らせないため。これでどの端末でも頭から曲が鳴る）
  const [phase, setPhase] = useState<'start' | 'silhouettes' | 'title'>('start')
  // 最後のモンスターが流れ去ってから true。タイトル＆シルエットはこれが true のときだけ出す
  //（モンスターと重なって「タイトルが2回・ずれて出る」不具合を防ぐ）
  const [titleReady, setTitleReady] = useState(false)
  const doneRef = useRef(false)

  // モンスターを順番に流し、最後まで来たらタイトルへ
  useEffect(() => {
    if (phase !== 'silhouettes') return
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

  // タイトルへ移ったら、最後のモンスターが流れ去る(exit≈0.45s)のを待ってからタイトルを出す＝重なり防止
  useEffect(() => {
    if (phase !== 'title') return
    const t = window.setTimeout(() => setTitleReady(true), 520)
    return () => window.clearTimeout(t)
  }, [phase])

  // タイトルが実際に出る瞬間に派手な音（モンスター退場中は鳴らさない）
  useEffect(() => {
    if (titleReady) audio.playSe('reveal-ur')
  }, [titleReady])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    audio.playSe('tap')
    onDone()
  }

  // タップ：start=音を鳴らして本編開始 / 流れ中=スキップ / 退場待ち中=すぐタイトル / タイトル表示中=ホームへ
  const handleTap = () => {
    if (phase === 'start') {
      // この瞬間（ユーザー操作）に音が解禁される＝どの端末でもOP曲が頭から鳴る
      audio.playBgm('opening')
      setPhase('silhouettes')
    } else if (phase === 'silhouettes') {
      setPhase('title') // 流れている途中はスキップしてタイトルへ
    } else if (titleReady) {
      finish() // タイトル表示中ならホームへ進む
    } else {
      setTitleReady(true) // モンスター退場の待ち時間中なら、すぐタイトルを出す
    }
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

      {/* スタート画面「タップして はじめる」＝最初のタップで音を解禁してから本編へ */}
      {phase === 'start' && (
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/ui/book.webp"
            alt=""
            draggable={false}
            className="anim-float select-none"
            style={{
              width: 'min(56vw, 236px)',
              animationDuration: '3.4s',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
            }}
          />
          <motion.p
            className="text-2xl font-extrabold text-white sm:text-3xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55)' }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.06, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            タップして はじめる
          </motion.p>
        </motion.div>
      )}

      {/* モンスターのシルエット（影絵）＝タイトル登場シーンの背景。中央は空けて縁に配置 */}
      {titleReady && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {/* 中央520pxの枠に閉じ込める＝画面が広いPCでもタイトルの近くに集まる */}
          <div
            className="absolute left-1/2 top-0 h-full -translate-x-1/2"
            style={{ width: 'min(100vw, 520px)' }}
          >
            {SILHOUETTES.map((sil, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: sil.left, top: sil.top }}
              >
                <img
                  src={monsterSprite(sil.id)}
                  alt=""
                  draggable={false}
                  className="anim-float select-none"
                  style={{
                    width: sil.size,
                    animationDuration: sil.dur,
                    animationDelay: sil.delay,
                    // 色を消した真っ黒の影＋うっすら青い光。気配だけ感じる薄さにする
                    opacity: 0.3,
                    filter:
                      'brightness(0) drop-shadow(0 0 9px rgba(130,160,255,0.35))',
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* モンスター（横ながれ）。タイトル中は出さない */}
      <AnimatePresence>
        {phase === 'silhouettes' && (
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
            exit={{ x: s.exitX, y: s.y, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* タイトル（画面全体の中央レイヤー＝モンスターの大きさに影響されない） */}
      {titleReady && (
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* タイトルの上に載せる「開いた本」（勉強アプリだと一目で分かる目印） */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: -12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <img
              src="/ui/book.webp"
              alt=""
              draggable={false}
              className="anim-float select-none"
              style={{
                width: 'min(58vw, 248px)',
                animationDuration: '3.4s',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
              }}
            />
          </motion.div>
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
    </div>
  )
}

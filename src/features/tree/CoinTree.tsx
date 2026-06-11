/*
 * コインの木（spec §6 / §6-3・旧版ロジック移植）
 * - save.treeCoins / COINS_PER_FRUIT 個の実を木に表示。実タップで収穫：
 *   monthly.harvested を childSettings.maxMonthlyCoins で頭打ち（capで丸め）・treeCoins -= COINS_PER_FRUIT
 * - 上限到達時は収穫せず Dialog「こんげつの おこづかいは いっぱい！」
 * - 収穫は即保存（commit-then-animate）→ 実が落ちるアニメ＋ audio.playSe('harvest')
 * - updateSave 失敗時は「ほぞんに しっぱいしたかも」Dialog（spec §9-5）
 * - 月カウンタは GameContext がプロフィール選択時に月スタンプ式で正規化済み（spec §6-3）
 */
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../../contexts/GameContext'
import { COINS_PER_FRUIT } from '../../lib/constants'
import { audio } from '../../lib/audio'
import Dialog from '../../components/Dialog'

export interface CoinTreeProps {
  onBack: () => void
}

/** 表示する実の最大数（これ以上は木に乗り切らない。超過分は収穫で減ると順次見える運用） */
const MAX_FRUITS = 50

/** 樹冠の楕円クラスタ（実の配置先・旧版の座標を踏襲） */
const CANOPY_CLUSTERS = [
  { x: 0, y: -450, rx: 120, ry: 100, rotate: 0 },
  { x: -130, y: -380, rx: 100, ry: 80, rotate: -30 },
  { x: 130, y: -380, rx: 100, ry: 80, rotate: 30 },
  { x: -180, y: -280, rx: 90, ry: 70, rotate: -45 },
  { x: 180, y: -280, rx: 90, ry: 70, rotate: 45 },
  { x: 0, y: -320, rx: 110, ry: 90, rotate: 0 },
]

/** 決定的な疑似乱数（実の位置がレンダーごとに変わらない） */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface FruitPos {
  id: number
  x: number
  y: number
}

export default function CoinTree({ onBack }: CoinTreeProps) {
  const { save, childSettings, updateSave } = useGame()

  // マウント時点の実の数で配置を固定（収穫で index がずれて実が飛ばないように・旧版踏襲）
  const [initialFruitCount] = useState(() =>
    Math.min(Math.floor((save?.treeCoins ?? 0) / COINS_PER_FRUIT), MAX_FRUITS)
  )
  const [harvestedIds, setHarvestedIds] = useState<number[]>([])
  const [capDialog, setCapDialog] = useState(false)
  const [saveWarn, setSaveWarn] = useState(false)
  /** 「+10」ポップ演出のキー（収穫ごとに増える） */
  const [gainPulse, setGainPulse] = useState(0)

  const fruits = useMemo<FruitPos[]>(() => {
    const rand = mulberry32(20260611)
    return Array.from({ length: MAX_FRUITS }).map((_, i) => {
      const cluster = CANOPY_CLUSTERS[i % CANOPY_CLUSTERS.length]
      const angle = rand() * Math.PI * 2
      const d = rand() * 0.8
      return {
        id: i,
        x: cluster.x + Math.cos(angle) * cluster.rx * d,
        y: cluster.y + Math.sin(angle) * cluster.ry * d,
      }
    })
  }, [])

  if (!save) return null

  const cap = childSettings.maxMonthlyCoins
  const capReached = save.monthly.harvested >= cap
  const visibleFruits = fruits
    .slice(0, initialFruitCount)
    .filter((f) => !harvestedIds.includes(f.id))

  const handleHarvest = (fruitId: number) => {
    if (harvestedIds.includes(fruitId)) return

    if (capReached) {
      audio.playSe('tap')
      setCapDialog(true)
      return
    }

    // 先に保存（commit-then-animate・spec §6-1 と同思想）。cap はアップデータ内でも再チェック
    const res = updateSave((s) => {
      if (s.monthly.harvested >= cap) return s
      return {
        ...s,
        treeCoins: Math.max(0, s.treeCoins - COINS_PER_FRUIT),
        monthly: {
          ...s.monthly,
          harvested: Math.min(s.monthly.harvested + COINS_PER_FRUIT, cap),
        },
      }
    })

    audio.playSe('harvest')
    setHarvestedIds((prev) => [...prev, fruitId])
    setGainPulse((n) => n + 1)
    if (!res.ok) setSaveWarn(true)
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      {/* ===== 空と地面 ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-sky-300 to-sky-100" />
      <div className="absolute top-[8%] right-[10%] h-14 w-14 rounded-full bg-[var(--color-accent)] shadow-[0_0_40px_12px_rgba(255,192,67,0.55)]" />
      <div className="absolute bottom-0 left-[-10%] h-[30%] w-[120%] rounded-t-[50%] bg-gradient-to-b from-green-300 to-green-500" />

      {/* ===== ヘッダー ===== */}
      <header className="relative z-20 flex items-start justify-between p-4">
        <button
          aria-label="もどる"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface)] text-2xl shadow-md active:scale-90"
          onClick={() => {
            audio.playSe('tap')
            onBack()
          }}
        >
          ←
        </button>
        <div className="flex flex-col items-end gap-2">
          <div className="relative rounded-full border-2 border-[var(--color-accent-dark)] bg-white/90 px-4 py-1 text-base font-extrabold text-[var(--color-ink)]">
            💰 こんげつの おこづかい：
            <span className="text-[var(--color-accent-dark)]">{save.monthly.harvested}</span>
            <span className="text-sm text-[var(--color-ink-soft)]"> / {cap}</span>
            <AnimatePresence>
              {gainPulse > 0 && (
                <motion.span
                  key={gainPulse}
                  className="absolute -bottom-7 right-2 text-xl font-extrabold text-[var(--color-accent-dark)] drop-shadow"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.9 }}
                >
                  +{COINS_PER_FRUIT}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="rounded-full border-2 border-[var(--color-accent-dark)] bg-white/90 px-4 py-1 text-base font-extrabold text-[var(--color-ink)]">
            🌳 きの コイン：<span className="text-[var(--color-accent-dark)]">{save.treeCoins}</span>
          </div>
        </div>
      </header>

      {/* ===== 木（SVG）===== */}
      <main className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
        <div className="pointer-events-auto relative h-full w-full max-w-[500px]">
          <svg viewBox="0 0 500 800" className="h-full w-full overflow-visible">
            <defs>
              <radialGradient id="goldLeafGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#a16207" />
              </radialGradient>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3f1d0b" />
                <stop offset="50%" stopColor="#7c3a1b" />
                <stop offset="100%" stopColor="#3f1d0b" />
              </linearGradient>
            </defs>

            <g transform="translate(250, 800)">
              {/* 幹 */}
              <path
                d="M-40,0 Q-60,-5 -90,20 L-130,-10 Q-90,-20 -70,-80 Q-50,-150 -60,-250 Q-80,-350 -120,-420 L-80,-450 Q-40,-400 0,-360 Q40,-400 80,-450 L120,-420 Q80,-350 60,-250 Q50,-150 70,-80 Q90,-20 130,-10 L90,20 Q60,-5 40,0 Z"
                fill="url(#trunkGradient)"
              />

              {/* ゆれる樹冠＋実 */}
              <motion.g
                animate={{ rotate: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '0px -300px' }}
              >
                {CANOPY_CLUSTERS.map((c, idx) => (
                  <ellipse
                    key={idx}
                    cx={c.x}
                    cy={c.y}
                    rx={c.rx}
                    ry={c.ry}
                    fill="url(#goldLeafGradient)"
                    transform={`rotate(${c.rotate}, ${c.x}, ${c.y})`}
                  />
                ))}

                <AnimatePresence>
                  {visibleFruits.map((fruit) => (
                    <motion.g
                      key={fruit.id}
                      initial={{ scale: 0, opacity: 0, x: fruit.x, y: fruit.y }}
                      animate={{ scale: 1, opacity: 1, x: fruit.x, y: fruit.y }}
                      exit={{
                        y: 800,
                        opacity: 0,
                        rotate: 180,
                        transition: { duration: 0.9, ease: 'easeIn' },
                      }}
                      style={{ cursor: 'pointer' }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleHarvest(fruit.id)
                      }}
                    >
                      <circle r="15" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
                      <circle
                        r="11"
                        fill="transparent"
                        stroke="#fde047"
                        strokeWidth="1"
                        strokeDasharray="3 2"
                      />
                      <text
                        y="6"
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="900"
                        fill="#b45309"
                        style={{ pointerEvents: 'none' }}
                      >
                        ¥
                      </text>
                    </motion.g>
                  ))}
                </AnimatePresence>
              </motion.g>
            </g>
          </svg>
        </div>
      </main>

      {/* ===== 足元の案内 ===== */}
      <footer className="absolute right-0 bottom-5 left-0 z-20 text-center">
        <div className="card-kid inline-block px-6 py-3">
          {visibleFruits.length > 0 ? (
            <p className="text-lg font-extrabold">
              ✨ あと{' '}
              <span className="text-2xl text-[var(--color-accent-dark)]">
                {visibleFruits.length}
              </span>{' '}
              こ じゅくしてるよ！タップで しゅうかく！
            </p>
          ) : (
            <p className="text-lg font-extrabold text-[var(--color-ink-soft)]">
              クイズに せいかいすると
              <br />
              きに コインが みのるよ！
            </p>
          )}
        </div>
      </footer>

      {/* ===== 月上限 Dialog ===== */}
      <Dialog
        open={capDialog}
        title="こんげつの おこづかいは いっぱい！"
        onClose={() => setCapDialog(false)}
        actions={
          <button
            className="btn-kid bg-[var(--color-primary)] text-xl"
            onClick={() => {
              audio.playSe('tap')
              setCapDialog(false)
            }}
          >
            わかった
          </button>
        }
      >
        <p className="text-center">
          こんげつは もう {cap} コイン あつめたよ。すごい！
          <br />
          つづきは らいげつ しゅうかくしようね。
        </p>
      </Dialog>

      {/* ===== 保存失敗の警告 ===== */}
      <Dialog
        open={saveWarn}
        title="ほぞんに しっぱいしたかも"
        onClose={() => setSaveWarn(false)}
        actions={
          <button
            className="btn-kid bg-[var(--color-primary)] text-xl"
            onClick={() => setSaveWarn(false)}
          >
            わかった
          </button>
        }
      >
        <p className="text-center">
          しゅうかくが ほぞんできなかった かもしれないよ。
          <br />
          おうちのひとに みせてね。
        </p>
      </Dialog>
    </div>
  )
}

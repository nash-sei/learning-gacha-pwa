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
import { COINS_PER_FRUIT, FRUIT_IMG, TREE_BG, TREE_IMG } from '../../lib/constants'
import { audio } from '../../lib/audio'
import Dialog from '../../components/Dialog'

export interface CoinTreeProps {
  onBack: () => void
}

/** 表示する実の最大数（これ以上は木に乗り切らない。超過分は収穫で減ると順次見える運用） */
const MAX_FRUITS = 50

/**
 * 樹冠のクラスタ（実の配置先）。本番イラスト coin-tree.webp の樹冠形状に合わせた
 * コンテナ比%座標（コンテナは正方形なので x/y とも同じスケール）。
 */
const CANOPY_CLUSTERS = [
  { x: 50, y: 15, rx: 20, ry: 7 },
  { x: 28, y: 28, rx: 14, ry: 9 },
  { x: 72, y: 28, rx: 14, ry: 9 },
  { x: 50, y: 32, rx: 18, ry: 8 },
  { x: 18, y: 42, rx: 8, ry: 6 },
  { x: 82, y: 42, rx: 8, ry: 6 },
]

/** 実の表示幅（コンテナ比%・タップしやすさ優先で実画像の余白込み） */
const FRUIT_W_PCT = 11

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
      {/* ===== 聖域の背景（神秘の森・縦長をobject-coverで全画面に） ===== */}
      <img
        src={TREE_BG}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />

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

      {/* ===== 木（本番イラスト・モンスターと同テイスト）===== */}
      <main className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
        <div className="pointer-events-auto relative aspect-square w-full max-w-[520px]">
          {/* 木全体がゆっくりゆれる（実も一緒にゆれて樹冠に張り付いたまま） */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: [-0.6, 0.6, -0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '50% 92%' }}
          >
            <img
              src={TREE_IMG}
              alt="コインのき"
              draggable={false}
              className="h-full w-full select-none object-contain"
            />
            <AnimatePresence>
              {visibleFruits.map((fruit) => (
                <motion.button
                  key={fruit.id}
                  aria-label="みを しゅうかくする"
                  className="absolute cursor-pointer"
                  style={{
                    width: `${FRUIT_W_PCT}%`,
                    left: `${fruit.x - FRUIT_W_PCT / 2}%`,
                    top: `${fruit.y - FRUIT_W_PCT / 2}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    y: 420,
                    opacity: 0,
                    rotate: 180,
                    transition: { duration: 0.9, ease: 'easeIn' },
                  }}
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleHarvest(fruit.id)
                  }}
                >
                  <img
                    src={FRUIT_IMG}
                    alt=""
                    draggable={false}
                    className="h-full w-full select-none"
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
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

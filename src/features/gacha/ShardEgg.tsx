/*
 * かけらタマゴ画面（spec §8）
 * - ホシのかけら 50 こで「SR以上 確定」のタマゴを1回ひける（週1回まで）
 * - commit-then-animate（spec §6-1 と同じ・最重要）：「ひく！」のタップで
 *   ①performShardEgg で抽選（かけら−50・週ロック・図鑑反映済みの nextSave を作る）→
 *   ②先に updateSave で保存（失敗は Dialog 警告）→ ③その後に特別演出（虹色・キラキラ）。
 * - 入室ガード：かけら不足／今週使用済み → 「いまは ひけないよ」Dialog → onDone で戻る
 * - 1回ひいたら phase が 'ready' に戻らない＋セーブの週ロックで同セッション再抽選不可
 * - デイリーガチャとは別物：dailyGachaCount・コイン系は一切変えない（performShardEgg 側で保証）
 */
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GachaResult } from '../../lib/gacha'
import { performShardEgg } from '../../lib/gacha'
import { RARITY_COLOR, RARITY_LABEL, SHARD_EGG_COST } from '../../lib/constants'
import { weekStr } from '../../lib/dateUtil'
import { audio } from '../../lib/audio'
import { useGame } from '../../contexts/GameContext'
import Dialog from '../../components/Dialog'
import MonsterSprite from '../../components/MonsterSprite'

export interface ShardEggProps {
  onDone: () => void
}

type Phase = 'ready' | 'gather' | 'egg' | 'crack' | 'reveal' | 'result'

/** 虹色（UR 演出と同系・とくべつ感） */
const RAINBOW = 'linear-gradient(135deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)'
const RAINBOW_GLOW = 'rgba(176,107,255,0.75)'

const CONFETTI_COLORS = ['#ffc043', '#ff7eb6', '#4f9dff', '#4ade80', '#b06bff']

/** レンダー中でも使える決定的な擬似乱数 0..1（Gacha.tsx と同方式・見た目のバラつき用途） */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

interface SparklePiece {
  id: number
  x: number
  y: number
  delay: number
}

/** かけらが卵に吸い込まれていくキラキラ（gather 演出） */
function GatherSparkles({ pieces }: { pieces: SparklePiece[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl"
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0, scale: 0.6 }}
          animate={{ left: '48%', top: '46%', opacity: [0, 1, 1, 0], scale: [0.6, 1.2, 0.4] }}
          transition={{ delay: p.delay, duration: 1.1, ease: 'easeIn' }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  )
}

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  color: string
  rotate: number
}

/** 紙吹雪（reveal で降らせる・SR以上確定なので毎回） */
function Confetti({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 block h-3 w-2 rounded-sm"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: -24, opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0.6], rotate: p.rotate }}
          transition={{ delay: p.delay, duration: 2.6, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

/** 卵のヒビ（crack で重ねる） */
function EggCracks() {
  return (
    <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <polyline
        points="50,8 44,28 56,44 46,62"
        fill="none"
        stroke="rgba(60,47,42,0.55)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <polyline
        points="30,40 40,52 34,68"
        fill="none"
        stroke="rgba(60,47,42,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="70,36 62,50 70,66"
        fill="none"
        stroke="rgba(60,47,42,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ShardEgg({ onDone }: ShardEggProps) {
  const { save, updateSave } = useGame()

  const [phase, setPhase] = useState<Phase>('ready')
  const [outcome, setOutcome] = useState<GachaResult | null>(null)
  const [saveWarnOpen, setSaveWarnOpen] = useState(false)

  const sparkles = useMemo<SparklePiece[]>(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: pseudoRandom(i + 1) * 92,
        y: pseudoRandom(i + 41) * 86,
        delay: pseudoRandom(i + 81) * 0.5,
      })),
    []
  )

  const confetti = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        x: pseudoRandom(i + 7) * 100,
        delay: pseudoRandom(i + 107) * 0.7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: 180 + pseudoRandom(i + 207) * 540,
      })),
    []
  )

  // ホームBGMを止めて演出の音を立たせる（Gacha と同じ）
  useEffect(() => {
    audio.stopBgm()
  }, [])

  // 段階演出のタイマー進行（音と同期）
  useEffect(() => {
    let t: number | undefined
    switch (phase) {
      case 'gather':
        t = window.setTimeout(() => setPhase('egg'), 1400)
        break
      case 'egg':
        t = window.setTimeout(() => setPhase('crack'), 1100)
        break
      case 'crack':
        audio.playSe('crack')
        t = window.setTimeout(() => setPhase('reveal'), 700)
        break
      case 'reveal':
        if (outcome) audio.playSe(outcome.rarity === 'UR' ? 'reveal-ur' : 'reveal-sr')
        t = window.setTimeout(() => setPhase('result'), 2000)
        break
      case 'ready':
      case 'result':
        break
    }
    return () => {
      if (t !== undefined) window.clearTimeout(t)
    }
  }, [phase, outcome])

  if (!save) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl items-center justify-center p-6">
        <button className="btn-kid bg-[var(--color-primary)]" onClick={onDone}>
          もどる
        </button>
      </div>
    )
  }

  const week = weekStr()
  const notEnough = save.shards < SHARD_EGG_COST
  const usedThisWeek = save.shardEggLastUsedWeek === week
  // 入室ガード：まだ何も引いていない（outcome なし）のに条件未達 → ひけないよ Dialog
  const blocked = phase === 'ready' && outcome === null && (notEnough || usedThisWeek)

  // ---- commit-then-animate：先に保存、あとから演出（spec §6-1 / §8） ----
  const handlePull = () => {
    if (phase !== 'ready' || outcome !== null || notEnough || usedThisWeek) return
    audio.unlock()

    // ① 抽選（nextSave は かけら−50・週ロック・図鑑反映 確定済み）
    const { result, nextSave } = performShardEgg(save)

    // ② 先に保存（失敗は握りつぶさず警告・spec §9-5）
    const r = updateSave(() => nextSave)
    if (!r.ok) setSaveWarnOpen(true)

    // ③ ここから演出
    setOutcome(result)
    audio.playSe('drumroll')
    setPhase('gather')
  }

  const result = outcome

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center p-4">
      {/* ヘッダー：いまのかけら＋週1の説明 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="rounded-full bg-[var(--color-bg-2)] px-4 py-2 text-base font-bold text-[var(--color-ink-soft)]">
          ✨ かけら <span className="text-[var(--color-shard)]">{save.shards}</span> こ
        </span>
        <span
          className="rounded-full px-3 py-1 text-sm font-bold text-white"
          style={{ background: RAINBOW }}
        >
          しゅうに 1かい
        </span>
      </div>

      {/* ステージ */}
      <div className="card-kid relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden p-6">
        {/* ---- かまえ ---- */}
        {phase === 'ready' && !blocked && (
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="anim-float h-40 w-32 rounded-[50%_50%_50%_50%/60%_60%_42%_42%]"
              style={{
                background: RAINBOW,
                boxShadow: `0 0 40px 12px ${RAINBOW_GLOW}, 0 10px 24px rgba(58,47,42,0.18)`,
              }}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
            <p className="text-center text-2xl font-extrabold text-[var(--color-ink)]">
              ホシのかけら {SHARD_EGG_COST}こで
              <br />
              とくべつな タマゴが ひけるよ！
            </p>
            <p className="text-center text-sm font-bold text-[var(--color-ink-soft)]">
              スーパーレアいじょう かくてい！（しゅうに 1かい）
            </p>
            <button className="btn-kid px-10" style={{ background: RAINBOW }} onClick={handlePull}>
              ✨ ひく！（かけら −{SHARD_EGG_COST}）
            </button>
          </div>
        )}

        {/* ---- かけらが あつまる ---- */}
        {phase === 'gather' && (
          <div className="flex flex-col items-center gap-6">
            <GatherSparkles pieces={sparkles} />
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              ✨
            </motion.div>
            <p className="text-2xl font-extrabold text-[var(--color-ink)]">
              かけらが あつまっていく…
            </p>
          </div>
        )}

        {/* ---- 虹色の卵 → ゆれる → ヒビ ---- */}
        {(phase === 'egg' || phase === 'crack') && (
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="relative h-48 w-40 rounded-[50%_50%_50%_50%/60%_60%_42%_42%]"
              style={{
                background: RAINBOW,
                boxShadow: `0 0 64px 22px ${RAINBOW_GLOW}, 0 10px 24px rgba(58,47,42,0.2)`,
              }}
              initial={{ scale: 0, y: 40 }}
              animate={{ scale: 1, y: 0, rotate: [0, -7, 7, -7, 7, 0] }}
              transition={{
                rotate: { repeat: Infinity, duration: 0.55 },
                scale: { type: 'spring', stiffness: 260, damping: 16 },
              }}
            >
              {phase === 'crack' && <EggCracks />}
            </motion.div>
            <p className="text-xl font-extrabold text-[var(--color-ink-soft)]">
              なにが でるかな…！
            </p>
          </div>
        )}

        {/* ---- ジャーン！（SR以上確定・虹バースト＋紙吹雪） ---- */}
        {(phase === 'reveal' || phase === 'result') && result && (
          <div className="flex w-full flex-col items-center gap-3">
            {/* UR 特別カットイン */}
            <AnimatePresence>
              {phase === 'reveal' && result.rarity === 'UR' && (
                <motion.div
                  className="absolute inset-x-0 top-6 z-10 py-3 text-center text-3xl font-extrabold text-white"
                  style={{ background: RAINBOW }}
                  initial={{ x: '-110%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '110%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                >
                  ✨ ウルトラレア！！ ✨
                </motion.div>
              )}
            </AnimatePresence>

            {/* 虹色の光のバースト */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 42%, ${RAINBOW_GLOW}, transparent 62%)`,
              }}
              animate={{ opacity: [0.3, 0.9, 0.55] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
            {phase === 'reveal' && <Confetti pieces={confetti} />}

            <motion.div
              initial={{ scale: 0.3, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
              className="relative"
            >
              <MonsterSprite monsterId={result.monster.id} size={160} />
              {result.isNew && (
                <motion.span
                  className="absolute -top-2 -right-6 rounded-full bg-[var(--color-danger)] px-3 py-1 text-lg font-extrabold text-white"
                  animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                >
                  NEW!
                </motion.span>
              )}
            </motion.div>

            <p className="text-3xl font-extrabold text-[var(--color-ink)]">{result.monster.name}</p>
            <span
              className="rounded-full px-4 py-1 text-lg font-extrabold text-white"
              style={{ backgroundColor: RARITY_COLOR[result.rarity] }}
            >
              {RARITY_LABEL[result.rarity]}
            </span>

            {/* ---- 結果のくわしい表示 ---- */}
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full max-w-sm flex-col items-center gap-2"
              >
                {!result.isNew && result.shardGain > 0 && (
                  <p className="text-xl font-extrabold text-[var(--color-shard)]">
                    ホシのかけら +{result.shardGain}
                  </p>
                )}
                <p className="text-base font-bold text-[var(--color-ink-soft)]">
                  つかった かけら −{SHARD_EGG_COST}
                </p>
                <p className="text-sm text-[var(--color-ink-faint)]">
                  いまの かけら {save.shards} こ・つぎは らいしゅう ひけるよ
                </p>
                <button
                  className="btn-kid mt-2 w-full bg-[var(--color-primary)]"
                  onClick={() => {
                    audio.playSe('tap')
                    onDone()
                  }}
                >
                  とじる
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* 入室ガード：かけら不足／今週使用済み（spec §8・週1回） */}
      <Dialog
        open={blocked}
        title="かけらタマゴ"
        onClose={onDone}
        actions={
          <button className="btn-kid bg-[var(--color-primary)]" onClick={onDone}>
            もどる
          </button>
        }
      >
        <p className="text-center text-lg">
          いまは ひけないよ。
          <br />
          {usedThisWeek
            ? 'こんしゅうは もう つかったよ。また らいしゅう ひこうね！'
            : `ホシのかけらが たりないよ。あと ${SHARD_EGG_COST - save.shards} こ あつめよう！`}
        </p>
      </Dialog>

      {/* 保存失敗の警告（spec §9-5・握りつぶさない） */}
      <Dialog
        open={saveWarnOpen}
        title="ほぞんエラー"
        onClose={() => setSaveWarnOpen(false)}
        actions={
          <button
            className="btn-kid bg-[var(--color-primary)]"
            onClick={() => setSaveWarnOpen(false)}
          >
            OK
          </button>
        }
      >
        <p className="text-center text-base">
          データの保存に失敗しました（容量不足の可能性）。
          <br />
          おうちのひとへ：親メニューでカスタムシール等の容量を確認してください。
          この画面の獲得結果は端末に保存されていない可能性があります。
        </p>
      </Dialog>
    </div>
  )
}

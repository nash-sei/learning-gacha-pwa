/*
 * タマゴガチャ画面（spec §6）
 * - commit-then-animate（spec §6-1・最重要）：「あける！」のタップで
 *   ①performGacha で抽選 → ②コイン報酬を加えた committed セーブを作る → ③先に updateSave で保存 →
 *   ④その後に段階演出（ドラムロール→卵→ゆれ→ヒビ→シルエット→ジャーン）。
 *   演出中に PWA 更新のリロードが走っても報酬は既に保存済みで消えない。
 * - retryUsed=true なら実効難易度を1段階降格（spec §5-1）
 * - レア度別演出：N=ふつう / R=青い光 / SR=金の光+紙吹雪 / UR=虹+特別カットイン
 * - 月間コインは childSettings.maxMonthlyCoins で頭打ち（spec §6-3）
 */
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Difficulty, Rarity, SaveData } from '../../types'
import type { GachaResult } from '../../lib/gacha'
import { demote, performGacha, pickMonster } from '../../lib/gacha'
import { MONSTERS } from '../../data/monsters'
import { DIFFICULTY_LABEL, RARITY_COLOR, RARITY_LABEL } from '../../lib/constants'
import { audio } from '../../lib/audio'
import type { SeName } from '../../lib/audio'
import { useGame } from '../../contexts/GameContext'
import Dialog from '../../components/Dialog'
import MonsterSprite from '../../components/MonsterSprite'
import {
  SparkleStars,
  RainbowFall,
  RainbowSweep,
  EggBurst,
  GoldRays,
  RainbowAurora,
  RevealHalo,
  ShockRing,
} from './effects'
import type { StarPiece, RainbowBand } from './effects'

export interface GachaProps {
  difficulty: Difficulty
  retryUsed: boolean
  onDone: () => void
  /** テスト用：指定レア度の演出を「見るだけ」表示する（保存もガチャ回数消費もしない・npm run dev 限定） */
  debugRarity?: Rarity
}

type Phase =
  | 'ready'
  | 'drumroll'
  | 'rainbow'
  | 'egg'
  | 'shake'
  | 'crack'
  | 'silhouette'
  | 'flash'
  | 'reveal'
  | 'result'

const REVEAL_SE: Record<Rarity, SeName> = {
  N: 'reveal-n',
  R: 'reveal-r',
  SR: 'reveal-sr',
  UR: 'reveal-ur',
}

/** レア度別の卵の見た目（色・光でレア度を予告する） */
const EGG_STYLE: Record<Rarity, { base: string; glow: string }> = {
  N: { base: 'linear-gradient(160deg, #f2f5f8, #9aa4b2)', glow: 'rgba(154,164,178,0.45)' },
  R: { base: 'linear-gradient(160deg, #cfe4ff, #4f9dff)', glow: 'rgba(79,157,255,0.65)' },
  SR: { base: 'linear-gradient(160deg, #ffe9b8, #ffb020)', glow: 'rgba(255,176,32,0.7)' },
  UR: {
    base: 'linear-gradient(135deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)',
    glow: 'rgba(176,107,255,0.75)',
  },
}

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  color: string
  rotate: number
}

const CONFETTI_COLORS = ['#ffc043', '#ff7eb6', '#4f9dff', '#4ade80', '#b06bff']

/** レンダー中でも使える決定的な擬似乱数 0..1（react-hooks/purity 対応。見た目のバラつき用途で十分） */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** 紙吹雪（SR/UR の reveal で降らせる） */
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

/** 卵のヒビ（crack 以降に重ねる） */
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

export default function Gacha({ difficulty, retryUsed, onDone, debugRarity }: GachaProps) {
  const { save, childSettings, updateSave } = useGame()

  const [phase, setPhase] = useState<Phase>('ready')
  const [outcome, setOutcome] = useState<{ result: GachaResult; reward: number } | null>(null)
  const [saveWarnOpen, setSaveWarnOpen] = useState(false)

  // 実効難易度：リトライを使った回は1段階降格（spec §5-1）
  const effDiff = retryUsed ? demote(difficulty) : difficulty
  const demoted = effDiff !== difficulty

  const confetti = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: pseudoRandom(i + 1) * 100,
        delay: pseudoRandom(i + 101) * 0.7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: 180 + pseudoRandom(i + 201) * 540,
      })),
    []
  )

  // SR の金色の星（タマゴの中心からぐるりと囲むように配置＝卵のまわりでピカピカ）
  const stars = useMemo<StarPiece[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        angle: (i / 22) * Math.PI * 2 + pseudoRandom(i + 3) * 0.35,
        radius: 110 + pseudoRandom(i + 53) * 65,
        delay: pseudoRandom(i + 103) * 0.9,
        size: 18 + pseudoRandom(i + 153) * 20,
      })),
    []
  )

  // UR の虹のすじ（左右交互に降ってくる）
  const rainbowBands = useMemo<RainbowBand[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        side: i % 2 === 0 ? 'left' : 'right',
        top: 2 + pseudoRandom(i + 11) * 58,
        delay: i * 0.18,
      })),
    []
  )

  // クイズBGMはここで止めて演出の音を立たせる
  useEffect(() => {
    audio.stopBgm()
  }, [])

  // 段階演出のタイマー進行（音と同期）
  useEffect(() => {
    // SR/UR は「だれかな？」を飛ばし、割れた瞬間にピカッ→そのまま登場（とくべつ感）
    const rarity = outcome?.result.rarity
    const special = rarity === 'SR' || rarity === 'UR'
    let t: number | undefined
    switch (phase) {
      case 'drumroll':
        t = window.setTimeout(() => setPhase('egg'), 1500)
        break
      case 'rainbow':
        // UR 導入：右→左で虹がふわっと流れたあと卵へ
        t = window.setTimeout(() => setPhase('egg'), 1900)
        break
      case 'egg':
        t = window.setTimeout(() => setPhase('shake'), 1000)
        break
      case 'shake':
        t = window.setTimeout(() => setPhase('crack'), 1200)
        break
      case 'crack':
        audio.playSe('crack')
        t = window.setTimeout(() => setPhase(special ? 'flash' : 'silhouette'), special ? 650 : 800)
        break
      case 'silhouette':
        t = window.setTimeout(() => setPhase('reveal'), 1000)
        break
      case 'flash':
        t = window.setTimeout(() => setPhase('reveal'), 600)
        break
      case 'reveal':
        if (outcome) audio.playSe(REVEAL_SE[outcome.result.rarity])
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

  // テスト時は回数制限を無視して何度でも開けるようにする
  const canPull = debugRarity != null || save.dailyGachaCount < childSettings.maxDailyGacha

  // 演出スタート：UR だけ太鼓をやめ、先に虹がふわっと流れる導入にする
  const startReveal = (result: GachaResult, reward: number) => {
    setOutcome({ result, reward })
    if (result.rarity === 'UR') {
      audio.playSe('harvest') // やわらかい光の音（太鼓のかわり）
      setPhase('rainbow')
    } else {
      audio.playSe('drumroll')
      setPhase('drumroll')
    }
  }

  // ---- commit-then-animate：先に保存、あとから演出（spec §6-1） ----
  const handleOpen = () => {
    if (!canPull || phase !== 'ready') return
    audio.unlock()

    // テスト用：指定レア度の演出を「見るだけ」表示（保存しない・回数を消費しない）
    if (debugRarity) {
      const monster = pickMonster(debugRarity, save, MONSTERS, Math.random)
      const result: GachaResult = {
        monster,
        rarity: debugRarity,
        isNew: true,
        shardGain: 0,
        pityTriggered: false,
      }
      startReveal(result, childSettings.coinRewards[effDiff])
      return
    }

    // ① 抽選（nextSave は monster/shards/dailyGachaCount/pity 確定済・コインは含まない）
    const { result, nextSave } = performGacha(save, effDiff)

    // ② コイン報酬（月間は maxMonthlyCoins で頭打ち・spec §6-3）
    const reward = childSettings.coinRewards[effDiff]
    const committed: SaveData = {
      ...nextSave,
      coins: nextSave.coins + reward,
      treeCoins: nextSave.treeCoins + reward,
      monthly: {
        ...nextSave.monthly,
        coins: Math.min(childSettings.maxMonthlyCoins, nextSave.monthly.coins + reward),
      },
    }

    // ③ 先に保存（失敗は握りつぶさず警告・spec §9-5）
    const r = updateSave(() => committed)
    if (!r.ok) setSaveWarnOpen(true)

    // ④ ここから演出
    startReveal(result, reward)
  }

  const result = outcome?.result ?? null
  const eggStyle = result ? EGG_STYLE[result.rarity] : EGG_STYLE.N
  // SR/UR は光のにじみ（bloom）を多段に重ねて豪華に見せる
  const eggBloom =
    result?.rarity === 'UR'
      ? `0 0 50px 14px ${eggStyle.glow}, 0 0 110px 40px rgba(176,107,255,0.5), 0 0 175px 70px rgba(120,200,255,0.3), 0 10px 24px rgba(58,47,42,0.2)`
      : result?.rarity === 'SR'
        ? `0 0 50px 14px ${eggStyle.glow}, 0 0 110px 40px rgba(255,200,80,0.55), 0 0 175px 70px rgba(255,170,30,0.3), 0 10px 24px rgba(58,47,42,0.2)`
        : `0 0 56px 18px ${eggStyle.glow}, 0 10px 24px rgba(58,47,42,0.2)`
  const showEgg = phase === 'egg' || phase === 'shake' || phase === 'crack'

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center p-4">
      {/* ヘッダー：ガチャ回数 */}
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="rounded-full bg-[var(--color-bg-2)] px-4 py-2 text-base font-bold text-[var(--color-ink-soft)]">
          きょうのガチャ {Math.min(save.dailyGachaCount, childSettings.maxDailyGacha)}/
          {childSettings.maxDailyGacha}
        </span>
        <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-sm font-bold text-white">
          {DIFFICULTY_LABEL[effDiff]}のタマゴ
        </span>
      </div>

      {/* ステージ */}
      <div className="card-kid relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden p-6">
        {/* ---- かまえ ---- */}
        {phase === 'ready' && (
          <div className="flex flex-col items-center gap-5">
            {canPull ? (
              <>
                <motion.div
                  className="anim-float h-40 w-32 rounded-[50%_50%_50%_50%/60%_60%_42%_42%]"
                  style={{
                    background: 'linear-gradient(160deg, #fff4dd, #e8d5b5)',
                    boxShadow: '0 10px 24px rgba(58,47,42,0.18)',
                  }}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                />
                <p className="text-center text-2xl font-extrabold text-[var(--color-ink)]">
                  ごほうびの タマゴが とどいたよ！
                </p>
                {demoted && (
                  <p className="text-center text-sm font-bold text-[var(--color-ink-soft)]">
                    「もういちど」を つかったから
                    <br />
                    タマゴは「{DIFFICULTY_LABEL[effDiff]}」に なったよ
                  </p>
                )}
                <button className="btn-kid bg-[var(--color-secondary)] px-10" onClick={handleOpen}>
                  あける！
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl">🌙</div>
                <p className="text-center text-2xl font-extrabold text-[var(--color-ink)]">
                  きょうの ガチャは おしまい！
                  <br />
                  <span className="text-lg font-bold text-[var(--color-ink-soft)]">
                    また あした あそぼうね
                  </span>
                </p>
                <button
                  className="btn-kid bg-[var(--color-primary)]"
                  onClick={() => {
                    audio.playSe('tap')
                    onDone()
                  }}
                >
                  とじる
                </button>
              </>
            )}
          </div>
        )}

        {/* ---- ドラムロール ---- */}
        {phase === 'drumroll' && (
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="text-6xl"
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 0.45 }}
            >
              🥁
            </motion.div>
            <p className="text-2xl font-extrabold text-[var(--color-ink)]">
              なにが でるかな…
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
              >
                …
              </motion.span>
            </p>
          </div>
        )}

        {/* ---- UR 導入：太鼓のかわりに、右→左で虹がふわっと流れる ---- */}
        {phase === 'rainbow' && (
          <div className="flex flex-col items-center gap-4">
            <RainbowAurora />
            <RainbowSweep />
            <motion.p
              className="z-10 text-2xl font-extrabold text-white"
              style={{ textShadow: '0 2px 12px rgba(176,107,255,0.9)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1], scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              にじいろの よかん…！
            </motion.p>
          </div>
        )}

        {/* ---- 卵（色・光でレア度予告）→ ゆれる → ヒビ ---- */}
        {showEgg && result && (
          <div className="flex flex-col items-center gap-4">
            {/* SR：背後で回る金の放射光／UR：虹のオーロラ（面で光らせる土台） */}
            {result.rarity === 'SR' && <GoldRays />}
            {result.rarity === 'UR' && <RainbowAurora />}
            {/* SR：金色の星がピカピカ／UR：虹が左右から交互に降ってくる */}
            {result.rarity === 'SR' && <SparkleStars stars={stars} />}
            {result.rarity === 'UR' && <RainbowFall bands={rainbowBands} />}
            <motion.div
              className="relative h-48 w-40 rounded-[50%_50%_50%_50%/60%_60%_42%_42%]"
              style={{
                background: eggStyle.base,
                boxShadow: eggBloom,
              }}
              initial={{ scale: 0, y: 40 }}
              animate={
                phase === 'shake' || phase === 'crack'
                  ? { scale: 1, y: 0, rotate: [0, -7, 7, -7, 7, 0] }
                  : { scale: 1, y: 0 }
              }
              transition={
                phase === 'shake' || phase === 'crack'
                  ? { rotate: { repeat: Infinity, duration: 0.55 }, scale: { type: 'spring' } }
                  : { type: 'spring', stiffness: 260, damping: 16 }
              }
            >
              {phase === 'crack' && <EggCracks />}
            </motion.div>
            {result.pityTriggered && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-[var(--color-accent)] px-4 py-1 text-base font-extrabold text-white"
              >
                やくそくの ごほうび！
              </motion.p>
            )}
          </div>
        )}

        {/* ---- シルエット（N/R のみ・SR/UR は飛ばしてフラッシュ） ---- */}
        {phase === 'silhouette' && result && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="flex flex-col items-center gap-3"
          >
            <MonsterSprite monsterId={result.monster.id} size={150} silhouette />
            <p className="text-2xl font-extrabold text-[var(--color-ink-soft)]">だれかな…？</p>
          </motion.div>
        )}

        {/* ---- ピカッ（SR/UR：卵から光のすじが飛び出す） ---- */}
        {phase === 'flash' && result && (
          <EggBurst
            tint={result.rarity === 'UR' ? 'rgba(176,107,255,0.95)' : 'rgba(255,190,60,0.95)'}
          />
        )}

        {/* ---- ジャーン！（レア度別） ---- */}
        {(phase === 'reveal' || phase === 'result') && result && (
          <div className="flex w-full flex-col items-center gap-3">
            {/* UR 特別カットイン */}
            <AnimatePresence>
              {phase === 'reveal' && result.rarity === 'UR' && (
                <motion.div
                  className="absolute inset-x-0 top-6 z-20 py-3 text-center text-4xl font-black text-white"
                  style={{
                    background:
                      'linear-gradient(90deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.9)',
                    textShadow: '0 3px 10px rgba(0,0,0,0.4)',
                    boxShadow: '0 0 30px rgba(176,107,255,0.7)',
                  }}
                  initial={{ x: '-110%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '110%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                >
                  ✨ ウルトラレア！！ ✨
                </motion.div>
              )}
            </AnimatePresence>

            {/* 光のバースト（R 以上） */}
            {result.rarity !== 'N' && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 42%, ${eggStyle.glow}, transparent 62%)`,
                }}
                animate={{ opacity: [0.3, 0.9, 0.55] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
            )}
            {(result.rarity === 'SR' || result.rarity === 'UR') && phase === 'reveal' && (
              <Confetti pieces={confetti} />
            )}

            {/* SR=金 / UR=虹：モンスター背後の回る後光 */}
            {(result.rarity === 'SR' || result.rarity === 'UR') && (
              <RevealHalo kind={result.rarity === 'UR' ? 'rainbow' : 'gold'} />
            )}
            {/* 登場の瞬間に広がる光の輪（1発） */}
            {(result.rarity === 'SR' || result.rarity === 'UR') && phase === 'reveal' && (
              <ShockRing
                color={
                  result.rarity === 'UR' ? 'rgba(200,150,255,0.9)' : 'rgba(255,210,110,0.95)'
                }
              />
            )}
            {/* UR：登場の瞬間の白い閃光＋集中線（必殺技風） */}
            {result.rarity === 'UR' && phase === 'reveal' && (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.5, times: [0, 0.2, 1], ease: 'easeOut' }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'repeating-conic-gradient(rgba(255,255,255,0) 0deg, rgba(255,255,255,0.5) 1.6deg, rgba(255,255,255,0) 5deg)',
                    maskImage: 'radial-gradient(circle, transparent 22%, #000 60%)',
                    WebkitMaskImage: 'radial-gradient(circle, transparent 22%, #000 60%)',
                  }}
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [1.3, 1, 1] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </>
            )}

            <motion.div
              initial={{ scale: 0.3, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
              className="relative"
              style={
                result.rarity === 'UR'
                  ? {
                      filter:
                        'drop-shadow(0 0 16px rgba(176,107,255,0.9)) drop-shadow(0 0 28px rgba(120,200,255,0.6))',
                    }
                  : result.rarity === 'SR'
                    ? { filter: 'drop-shadow(0 0 16px rgba(255,200,80,0.95))' }
                    : undefined
              }
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
            {phase === 'result' && outcome && (
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
                <p className="text-xl font-extrabold text-[var(--color-accent-dark)]">
                  コイン +{outcome.reward}
                </p>
                {result.pityTriggered && (
                  <p className="text-base font-bold text-[var(--color-ink-soft)]">
                    やくそくの ごほうびが でたよ！
                  </p>
                )}
                {demoted && (
                  <p className="text-sm font-bold text-[var(--color-ink-soft)]">
                    「もういちど」を つかったから「{DIFFICULTY_LABEL[effDiff]}」のタマゴだったよ
                  </p>
                )}
                <p className="text-sm text-[var(--color-ink-faint)]">
                  きょうのガチャ {save.dailyGachaCount}/{childSettings.maxDailyGacha} かい
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

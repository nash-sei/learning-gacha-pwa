/*
 * ホーム「にわ」（spec §4-2）
 * - コインの木がある庭＋獲得モンスターがゆっくり歩き回る（framer-motion・rel空間にabsolute配置）
 * - 各画面への大きな入口（クイズ / ずかん / コインのき / おやメニュー）＋プロフィールこうたい
 * - 上部に 今月のおこづかい（save.monthly.harvested / 上限）・かけら・図鑑進捗（所持/24）
 * - 右上に音 ON/OFF（SoundToggle）。BGM は home 曲（初回タップで解放後に鳴る）
 */
import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Screen } from '../../App'
import type { MonsterOwned } from '../../types'
import { useGame } from '../../contexts/GameContext'
import { MONSTERS } from '../../data/monsters'
import { COINS_PER_FRUIT, SHARD_EGG_COST, TREE_IMG } from '../../lib/constants'
import { storage } from '../../lib/storage'
import { weekStr } from '../../lib/dateUtil'
import { audio } from '../../lib/audio'
import MonsterSprite from '../../components/MonsterSprite'
import SoundToggle from '../../components/SoundToggle'
import TitleLogo from '../../components/TitleLogo'

export interface HomeProps {
  go: (s: Screen) => void
}

/** 決定的な疑似乱数（モンスターごとに同じ散歩コースになる） */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface WanderPath {
  xs: string[]
  ys: string[]
  duration: number
}

function makeWanderPath(seed: number): WanderPath {
  const rand = mulberry32(seed)
  const xs: string[] = []
  const ys: string[] = []
  for (let i = 0; i < 5; i++) {
    xs.push(`${(4 + rand() * 78).toFixed(1)}%`)
    ys.push(`${(14 + rand() * 58).toFixed(1)}%`)
  }
  return { xs, ys, duration: 22 + rand() * 16 }
}

/** 庭を歩き回るモンスター1体 */
function Wanderer(props: { monsterId: string; stage: number; seed: number; isPartner: boolean }) {
  const path = useMemo(() => makeWanderPath(props.seed), [props.seed])
  return (
    <motion.div
      className="absolute"
      initial={{ left: path.xs[0], top: path.ys[0] }}
      animate={{ left: path.xs, top: path.ys }}
      transition={{
        duration: path.duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    >
      <div className="anim-float relative">
        <MonsterSprite monsterId={props.monsterId} stage={props.stage} size={56} />
        {props.isPartner && (
          <span className="absolute -top-2 -right-2 rounded-full bg-[var(--color-secondary)] px-1.5 py-0.5 text-xs font-extrabold text-white shadow">
            ❤
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Home({ go }: HomeProps) {
  const { currentProfile, save, childSettings, clearCurrentProfile } = useGame()
  const isAdult = currentProfile?.isAdult === true

  // にわの BGM（音源が無ければ無音・初回タップで解放）
  useEffect(() => {
    audio.playBgm('home')
  }, [])

  // 大人プロフィールのずかん（lg2_adult・子供セーブとは独立）。ホーム表示用に読む
  const adultZukan = useMemo(() => (isAdult ? storage.getAdultData().zukan : []), [isAdult])

  // 庭に出すモンスター（最大12体）。大人は大人ずかん、子供は所持モンスター（相棒を先頭）
  const wanderers = useMemo<MonsterOwned[]>(() => {
    if (isAdult) {
      return adultZukan
        .slice(0, 12)
        .map((id) => ({ monsterId: id, count: 1, xp: 0, level: 1, stage: 1 }))
    }
    if (!save) return []
    const owned = save.monsters.filter((m) => m.count > 0)
    const partner = owned.filter((m) => m.monsterId === save.partnerId)
    const rest = owned.filter((m) => m.monsterId !== save.partnerId)
    return [...partner, ...rest].slice(0, 12)
  }, [save, isAdult, adultZukan])

  if (!save || !currentProfile) return null

  // 図鑑進捗は通常モンスターだけで数える（DANGER限定は別枠・図鑑のDANGER欄で表示）
  const regularIds = new Set(MONSTERS.filter((m) => !m.isDanger).map((m) => m.id))
  const ownedCount = isAdult
    ? adultZukan.filter((id) => regularIds.has(id)).length
    : save.monsters.filter((m) => m.count > 0 && regularIds.has(m.monsterId)).length
  const fruitCount = Math.floor(save.treeCoins / COINS_PER_FRUIT)

  // かけらタマゴ（spec §8）：50かけら＋今週未使用のときだけ目立たせる
  const shardEggUsedThisWeek = save.shardEggLastUsedWeek === weekStr()
  const shardEggReady = save.shards >= SHARD_EGG_COST && !shardEggUsedThisWeek

  const navTap = (s: Screen) => {
    audio.playSe('tap')
    go(s)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col p-4">
      {/* ===== 上部バー ===== */}
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="card-kid flex items-center gap-2 px-4 py-2">
            <span className="text-3xl">{currentProfile.iconId || '🙂'}</span>
            <div className="leading-tight">
              <p className="text-lg font-extrabold">{currentProfile.name}</p>
              <p className="text-xs font-bold text-[var(--color-ink-soft)]">
                {currentProfile.isAdult ? '🎓 大人' : `${currentProfile.grade}ねんせい`}
              </p>
            </div>
          </div>
          <button
            className="rounded-full bg-[var(--color-surface)] px-3 py-2 text-sm font-extrabold text-[var(--color-ink-soft)] shadow-md active:scale-95"
            onClick={() => {
              audio.playSe('tap')
              clearCurrentProfile()
            }}
          >
            こうたい
          </button>
        </div>
        <SoundToggle />
      </header>

      {/* ===== ステータス（チャレンジ回数・おこづかい・かけら・ずかん） ===== */}
      <div className="mb-3 flex flex-wrap justify-center gap-2">
        <span className="card-kid px-4 py-2 text-base font-extrabold">
          🔥 きょうのチャレンジ{' '}
          <span className="text-[var(--color-secondary)]">
            {Math.min(save.dailyGachaCount, childSettings.maxDailyGacha)}/
            {childSettings.maxDailyGacha}
          </span>
          <span className="text-sm text-[var(--color-ink-soft)]"> かい</span>
        </span>
        <span className="card-kid px-4 py-2 text-base font-extrabold">
          💰 こんげつ{' '}
          <span className="text-[var(--color-accent-dark)]">{save.monthly.harvested}</span>
          <span className="text-sm text-[var(--color-ink-soft)]">
            {' '}
            / {childSettings.maxMonthlyCoins}
          </span>
        </span>
        <span className="card-kid px-4 py-2 text-base font-extrabold">
          ✨ かけら <span className="text-[var(--color-shard)]">{save.shards}</span>
        </span>
        <span className="card-kid px-4 py-2 text-base font-extrabold">
          📖 ずかん{' '}
          <span className="text-[var(--color-primary-dark)]">
            {ownedCount}/{regularIds.size}
          </span>
        </span>
      </div>

      {/* ===== にわ（木＋歩き回るモンスター） ===== */}
      <div className="relative mb-4 min-h-[40dvh] flex-1 overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-b from-sky-200 via-sky-100 to-green-200 shadow-xl">
        {/* タイトルロゴ「ガクモン」（追加機能1-A）：空にふわっと浮かべる */}
        <div className="anim-float pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2">
          <TitleLogo className="text-5xl sm:text-6xl" />
        </div>
        {/* 太陽 */}
        <div className="absolute top-4 left-5 h-12 w-12 rounded-full bg-[var(--color-accent)] opacity-90 shadow-[0_0_30px_10px_rgba(255,192,67,0.5)]" />
        {/* 地面 */}
        <div className="absolute bottom-0 left-0 h-1/3 w-full rounded-t-[50%] bg-gradient-to-b from-green-300 to-green-400" />

        {/* コインの木（タップでも木の画面へ） */}
        <button
          aria-label="コインのきへ"
          className="absolute right-3 bottom-2 flex flex-col items-center active:scale-95"
          onClick={() => navTap('tree')}
        >
          <img
            src={TREE_IMG}
            alt=""
            draggable={false}
            className="anim-float h-24 w-24 select-none object-contain drop-shadow-md sm:h-28 sm:w-28"
          />
          {fruitCount > 0 && (
            <span className="-mt-3 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-sm font-extrabold text-white shadow">
              🪙 ×{fruitCount}
            </span>
          )}
        </button>

        {/* 歩き回るモンスター */}
        {wanderers.map((m, i) => (
          <Wanderer
            key={m.monsterId}
            monsterId={m.monsterId}
            stage={m.stage}
            seed={i * 7919 + m.monsterId.length * 131}
            isPartner={m.monsterId === save.partnerId}
          />
        ))}

        {wanderers.length === 0 && (
          <p className="absolute inset-x-0 top-[40%] text-center text-lg font-extrabold text-[var(--color-ink-soft)]">
            クイズに せいかいして
            <br />
            モンスターを あつめよう！
          </p>
        )}
      </div>

      {/* ===== 入口ボタン ===== */}
      <nav className="space-y-3 pb-4">
        {currentProfile.isAdult ? (
          <button
            className="btn-kid w-full bg-[var(--color-primary-dark)] text-3xl"
            onClick={() => navTap('adult')}
          >
            🎓 おとなの クイズに ちょうせん！
          </button>
        ) : (
          <button
            className="btn-kid w-full bg-[var(--color-primary)] text-3xl"
            onClick={() => navTap('quiz')}
          >
            ✏️ クイズに ちょうせん！
          </button>
        )}
        {/* かけらタマゴ入口（spec §8）：ひけるときだけ虹色で目立たせる */}
        {shardEggReady ? (
          <motion.button
            className="btn-kid w-full text-2xl"
            style={{
              background: 'linear-gradient(90deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)',
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            onClick={() => navTap('shard-egg')}
          >
            ✨ かけらタマゴが ひけるよ！
          </motion.button>
        ) : (
          <button
            className="btn-kid w-full bg-[var(--color-bg-2)] text-lg text-[var(--color-ink-soft)]"
            disabled
          >
            ✨ かけらタマゴ{' '}
            {shardEggUsedThisWeek
              ? 'また らいしゅう！'
              : `あと ${SHARD_EGG_COST - save.shards} こ`}
          </button>
        )}
        <div className="flex gap-3">
          <button
            className="btn-kid flex-1 bg-[var(--color-secondary)]"
            onClick={() => navTap(isAdult ? 'adult-zukan' : 'zukan')}
          >
            📖 ずかん
          </button>
          <button
            className="btn-kid flex-1 bg-[var(--color-success)]"
            onClick={() => navTap('tree')}
          >
            🌳 コインのき
          </button>
        </div>
        {!currentProfile.isAdult && (
          <div className="flex justify-center">
            <button
              className="rounded-full bg-[var(--color-primary-dark)] px-5 py-2 text-base font-extrabold text-white shadow active:scale-95"
              onClick={() => navTap('adult')}
            >
              🎓 おとなの クイズ
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="rounded-full bg-[var(--color-surface)] px-5 py-2 text-base font-bold text-[var(--color-ink-soft)] shadow active:scale-95"
            onClick={() => navTap('parent')}
          >
            🔒 おやメニュー
          </button>
        </div>
      </nav>
    </div>
  )
}

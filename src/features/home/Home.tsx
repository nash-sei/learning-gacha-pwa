/*
 * ホーム「神殿ステージ」（ホーム画面リニューアル 2026-07・バランス版）
 * - 画面ぜんぶが古代遺跡の神殿（昼／夜）。その上に 小さな数字・モンスター・入口ボタンを重ねる（没入感）
 * - 神殿の中に、お気に入りモンスターが大きく1体立つ（旧：庭をモンスターが散歩）
 * - モンスターをタップ → お気に入り（最大3体）を順ぐりに切り替え／レア度で大きさが変わる
 * - 右上の ☀️／🌙 で 昼／夜の背景を手動で切り替え（localStorage に記憶・既定は夜）
 * - 上＝小さな進捗（チャレンジ/おこづかい/かけら/ずかん）＋小さなプロフィール
 * - 下＝クイズ（大）＋ ずかん / コインのき / ≡メニュー。
 *   ≡メニュー＝こうたい・おやメニュー（かけらタマゴの状態も）。※おとなのクイズは子供版には出さない（大人プロフィールのときだけ）
 */
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Screen } from '../../App'
import type { Rarity } from '../../types'
import { useGame } from '../../contexts/GameContext'
import { MONSTERS, getMonster } from '../../data/monsters'
import {
  COINS_PER_FRUIT,
  FESTIVAL_BANNER_IMG,
  FESTIVAL_FACE_COOL_IMG,
  FESTIVAL_FACE_CUTE_IMG,
  HOME_FAVORITES_MAX,
  HOME_MONSTER_SIZE,
  HOME_STAGE_MODE_KEY,
  RARITY_COLOR,
  RARITY_LABEL,
  SHARD_EGG_COST,
  TEMPLE_DAY_IMG,
  TEMPLE_NIGHT_IMG,
} from '../../lib/constants'
import { storage } from '../../lib/storage'
import { weekStr, isFestivalDay } from '../../lib/dateUtil'
import { audio } from '../../lib/audio'
import MonsterSprite from '../../components/MonsterSprite'
import SoundToggle from '../../components/SoundToggle'
import Dialog from '../../components/Dialog'

export interface HomeProps {
  go: (s: Screen) => void
}

/** 神殿に出す1体（モンスターID＋進化段階） */
interface StageEntry {
  id: string
  stage: number
}

export default function Home({ go }: HomeProps) {
  const { currentProfile, save, childSettings, clearCurrentProfile } = useGame()
  const isAdult = currentProfile?.isAdult === true

  // にわ→神殿の BGM（音源が無ければ無音・初回タップで解放）
  useEffect(() => {
    audio.playBgm('home')
  }, [])

  // 昼／夜の背景（手動切替・localStorage に記憶・既定は夜＝モンスターが映える）
  const [stageMode, setStageMode] = useState<'day' | 'night'>(() => {
    try {
      return localStorage.getItem(HOME_STAGE_MODE_KEY) === 'day' ? 'day' : 'night'
    } catch {
      return 'night'
    }
  })
  const chooseStageMode = (mode: 'day' | 'night') => {
    audio.playSe('tap')
    setStageMode(mode)
    try {
      localStorage.setItem(HOME_STAGE_MODE_KEY, mode)
    } catch {
      /* 保存できなくても表示は切り替わる */
    }
  }

  // ≡メニュー（こうたい・おやメニューをまとめる）
  const [menuOpen, setMenuOpen] = useState(false)

  // 大人プロフィールのずかん（lg2_adult・子供セーブとは独立）。ホーム表示用に読む
  const adultZukan = useMemo(() => (isAdult ? storage.getAdultData().zukan : []), [isAdult])

  // 神殿に飾るモンスター（最大3体）。
  // 子供＝相棒を先頭に「飾る」で選んだ子、まだ無ければ所持の先頭から自動。大人＝大人ずかんの先頭から。
  const stageList = useMemo<StageEntry[]>(() => {
    if (isAdult) {
      return adultZukan.slice(0, HOME_FAVORITES_MAX).map((id) => ({ id, stage: 1 }))
    }
    if (!save) return []
    const ownedMap = new Map(
      save.monsters.filter((m) => m.count > 0).map((m) => [m.monsterId, m] as const)
    )
    const list: StageEntry[] = []
    const pushId = (id: string | null | undefined) => {
      if (!id || list.length >= HOME_FAVORITES_MAX) return
      const owned = ownedMap.get(id)
      if (!owned || list.some((e) => e.id === id)) return
      list.push({ id, stage: owned.stage })
    }
    pushId(save.partnerId)
    for (const id of save.favoriteMonsterIds ?? []) pushId(id)
    if (list.length === 0) {
      for (const m of save.monsters) {
        if (m.count > 0) pushId(m.monsterId)
        if (list.length >= HOME_FAVORITES_MAX) break
      }
    }
    return list
  }, [save, isAdult, adultZukan])

  // 表示中のインデックス（タップで進む）。リストが縮んでも安全なように剰余を取る
  const [idx, setIdx] = useState(0)
  const cycleCount = stageList.length
  const safeIdx = cycleCount > 0 ? idx % cycleCount : 0
  const current = stageList[safeIdx]
  const nextMonster = () => {
    if (cycleCount <= 1) return
    audio.playSe('tap')
    setIdx((i) => (i + 1) % cycleCount)
  }

  if (!save || !currentProfile) return null

  // 図鑑進捗は通常モンスターだけで数える（DANGER限定は別枠）
  const regularIds = new Set(MONSTERS.filter((m) => !m.isDanger).map((m) => m.id))
  const ownedCount = isAdult
    ? adultZukan.filter((id) => regularIds.has(id)).length
    : save.monsters.filter((m) => m.count > 0 && regularIds.has(m.monsterId)).length
  const fruitCount = Math.floor(save.treeCoins / COINS_PER_FRUIT)

  // かけらタマゴ（spec §8）：30かけら＋今週未使用のときだけ目立たせる
  const shardEggUsedThisWeek = save.shardEggLastUsedWeek === weekStr()
  const shardEggReady = save.shards >= SHARD_EGG_COST && !shardEggUsedThisWeek

  const navTap = (s: Screen) => {
    audio.playSe('tap')
    go(s)
  }

  // 表示中モンスターの見た目情報
  const currentDef = current ? getMonster(current.id) : undefined
  const currentRarity: Rarity = currentDef?.rarity ?? 'N'
  const isPartnerCurrent = !isAdult && current != null && current.id === save.partnerId

  return (
    // ===== 画面ぜんぶが神殿（昼／夜の背景）。この上に全UIを重ねる =====
    <div
      className="relative min-h-dvh"
      style={{
        backgroundImage: `url(${stageMode === 'night' ? TEMPLE_NIGHT_IMG : TEMPLE_DAY_IMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 読みやすさ用の暗がり：夜だけ濃いめ。昼は明るい背景を活かすため、ほぼ無し（モヤつき防止） */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-b ${
          stageMode === 'night'
            ? 'from-black/30 via-black/0 to-black/45'
            : 'from-black/0 via-black/0 to-black/15'
        }`}
      />

      {/* ===== コンテンツ（神殿の上にのせる） ===== */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col p-3">
        {/* ===== 上部バー：小さなプロフィール ＋ 昼夜トグル ＋ 音 ===== */}
        <header className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white shadow backdrop-blur-sm">
            <span className="text-xl">{currentProfile.iconId || '🙂'}</span>
            <span className="leading-tight">
              <span className="text-sm font-extrabold">{currentProfile.name}</span>{' '}
              <span className="text-[10px] font-bold opacity-80">
                {currentProfile.isAdult ? '大人' : `${currentProfile.grade}ねん`}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-full bg-black/40 p-1 shadow backdrop-blur-sm">
              <button
                aria-label="ひるの しんでんにする"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition active:scale-90 ${
                  stageMode === 'day' ? 'bg-white/90 shadow' : 'opacity-60'
                }`}
                onClick={() => chooseStageMode('day')}
              >
                ☀️
              </button>
              <button
                aria-label="よるの しんでんにする"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition active:scale-90 ${
                  stageMode === 'night' ? 'bg-white/90 shadow' : 'opacity-60'
                }`}
                onClick={() => chooseStageMode('night')}
              >
                🌙
              </button>
            </div>
            <SoundToggle />
          </div>
        </header>

        {/* ===== 進み具合（小さく薄く） ===== */}
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <span className="rounded-full bg-black/42 px-3 py-1 text-xs font-extrabold text-white shadow backdrop-blur-sm">
            🔥{' '}
            <span className="text-[var(--color-accent)]">
              {Math.min(save.dailyGachaCount, childSettings.maxDailyGacha)}/{childSettings.maxDailyGacha}
            </span>
          </span>
          <span className="rounded-full bg-black/42 px-3 py-1 text-xs font-extrabold text-white shadow backdrop-blur-sm">
            💰 <span className="text-[var(--color-accent)]">{save.monthly.harvested}</span>
          </span>
          <span className="rounded-full bg-black/42 px-3 py-1 text-xs font-extrabold text-white shadow backdrop-blur-sm">
            ✨ <span className="text-[var(--color-accent)]">{save.shards}</span>
          </span>
          <span className="rounded-full bg-black/42 px-3 py-1 text-xs font-extrabold text-white shadow backdrop-blur-sm">
            📖{' '}
            <span className="text-[var(--color-accent)]">
              {ownedCount}/{regularIds.size}
            </span>
          </span>
        </div>

        {/* ===== デンジャー祭り（金・土・日）の開催中バナー：子供のときだけ ===== */}
        {!isAdult && isFestivalDay() && (
          <div className="relative mt-2 h-24 overflow-hidden rounded-2xl shadow-md sm:h-28">
            <img
              src={FESTIVAL_BANNER_IMG}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
            <img
              src={FESTIVAL_FACE_CUTE_IMG}
              alt=""
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute left-0 top-1/2 w-auto select-none object-contain drop-shadow-lg"
              style={{ height: '124%', transform: 'translate(-48%, -50%)' }}
            />
            <img
              src={FESTIVAL_FACE_COOL_IMG}
              alt=""
              aria-hidden
              draggable={false}
              className="pointer-events-none absolute right-0 top-1/2 w-auto select-none object-contain drop-shadow-lg"
              style={{ height: '124%', transform: 'translate(48%, -50%)' }}
            />
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0.5 text-center"
              style={{
                textShadow: '0 2px 5px rgba(0,0,0,0.65)',
                wordBreak: 'keep-all',
                paddingLeft: '26%',
                paddingRight: '26%',
              }}
            >
              <p className="text-[10px] font-extrabold leading-tight text-white sm:text-sm">
                ぜんもんクリアを めざせ！
              </p>
              <p className="text-[13px] font-black leading-tight text-white sm:text-2xl">
                デンジャーまつり かいさい！
              </p>
            </div>
          </div>
        )}

        {/* ===== 神殿の中央：台座に立つモンスター（下寄せ・タップで切替） ===== */}
        <div className="flex flex-1 flex-col items-center justify-end gap-2 py-2">
          {cycleCount > 0 && current ? (
            <>
              <button
                type="button"
                aria-label="つぎの モンスター"
                className="flex flex-col items-center"
                onClick={nextMonster}
              >
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <div
                    className="anim-float"
                    style={{
                      filter:
                        stageMode === 'night'
                          ? 'drop-shadow(0 0 18px rgba(180,220,255,0.55)) drop-shadow(0 12px 9px rgba(0,0,0,0.5))'
                          : 'drop-shadow(0 12px 9px rgba(0,0,0,0.35))',
                    }}
                  >
                    <MonsterSprite
                      monsterId={current.id}
                      stage={current.stage}
                      size={HOME_MONSTER_SIZE[currentRarity]}
                    />
                  </div>
                  {isPartnerCurrent && (
                    <span className="absolute -top-1 right-0 rounded-full bg-[var(--color-secondary)] px-2 py-0.5 text-sm font-extrabold text-white shadow">
                      ❤
                    </span>
                  )}
                </motion.div>
              </button>

              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-extrabold text-white shadow"
                  style={{ backgroundColor: RARITY_COLOR[currentRarity] }}
                >
                  {RARITY_LABEL[currentRarity]}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-0.5 text-sm font-extrabold text-[var(--color-ink)] shadow">
                  {currentDef?.name ?? current.id}
                </span>
              </div>
              {cycleCount > 1 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-2">
                    {stageList.map((e, i) => (
                      <span
                        key={e.id}
                        className={`h-2.5 w-2.5 rounded-full border-2 ${
                          i === safeIdx
                            ? 'border-[var(--color-accent-dark)] bg-[var(--color-accent)]'
                            : 'border-black/30 bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-0.5 text-xs font-extrabold text-[var(--color-ink-soft)]">
                    👆 タップで つぎのモンスター
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-lg font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              クイズに せいかいして
              <br />
              モンスターを あつめよう！
            </p>
          )}
        </div>

        {/* ===== 入口ボタン（クイズ大 ＋ ずかん・コインのき・≡メニュー） ===== */}
        <nav className="space-y-2.5 pt-1">
          {isAdult ? (
            <button
              className="btn-kid w-full break-keep bg-[var(--color-primary-dark)] text-2xl"
              onClick={() => navTap('adult')}
            >
              🎓 おとなの クイズに ちょうせん！
            </button>
          ) : (
            <button
              className="btn-kid w-full break-keep bg-[var(--color-primary)] text-2xl"
              onClick={() => navTap('quiz')}
            >
              ✏️ クイズに ちょうせん！
            </button>
          )}

          {/* かけらタマゴ：ひけるときだけ虹色で目立たせる（子供のみ・ふだんはメニューに状態を出す） */}
          {!isAdult && shardEggReady && (
            <motion.button
              className="btn-kid w-full break-keep text-xl"
              style={{
                background: 'linear-gradient(90deg, #ff5e5e, #ffc043, #4ade80, #4f9dff, #b06bff)',
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              onClick={() => navTap('shard-egg')}
            >
              ✨ かけらタマゴが ひけるよ！
            </motion.button>
          )}

          {/* 下段3つ：アイコンを上・文字を小さく下に（幅が狭いので文字が崩れない） */}
          <div className="flex gap-2.5">
            <button
              className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-btn)] bg-[var(--color-secondary)] px-1 py-2.5 font-extrabold text-white shadow-lg transition-transform active:translate-y-0.5 active:scale-[0.98]"
              onClick={() => navTap(isAdult ? 'adult-zukan' : 'zukan')}
            >
              <span className="text-2xl leading-none">📖</span>
              <span className="text-sm leading-tight">ずかん</span>
            </button>
            <button
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-btn)] bg-[var(--color-success)] px-1 py-2.5 font-extrabold text-white shadow-lg transition-transform active:translate-y-0.5 active:scale-[0.98]"
              onClick={() => navTap('tree')}
            >
              <span className="text-2xl leading-none">🌳</span>
              <span className="text-sm leading-tight">コインのき</span>
              {fruitCount > 0 && (
                <span className="absolute -top-2 -right-1 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-xs font-extrabold text-white shadow">
                  🪙×{fruitCount}
                </span>
              )}
            </button>
            <button
              className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-btn)] bg-[var(--color-bg-2)] px-1 py-2.5 font-extrabold text-[var(--color-ink-soft)] shadow-lg transition-transform active:translate-y-0.5 active:scale-[0.98]"
              onClick={() => {
                audio.playSe('tap')
                setMenuOpen(true)
              }}
            >
              <span className="text-2xl leading-none">≡</span>
              <span className="text-sm leading-tight">メニュー</span>
            </button>
          </div>
        </nav>
      </div>

      {/* ===== ≡メニュー（こうたい・おやメニュー・かけらタマゴの状態） ===== */}
      <Dialog
        open={menuOpen}
        title="メニュー"
        onClose={() => setMenuOpen(false)}
        actions={
          <button
            className="btn-kid bg-[var(--color-ink-faint)] text-xl"
            onClick={() => {
              audio.playSe('tap')
              setMenuOpen(false)
            }}
          >
            とじる
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          <button
            className="btn-kid w-full break-keep bg-[var(--color-surface)] text-lg text-[var(--color-ink)]"
            onClick={() => {
              audio.playSe('tap')
              setMenuOpen(false)
              clearCurrentProfile()
            }}
          >
            👥 こうたい（プロフィール）
          </button>
          <button
            className="btn-kid w-full break-keep bg-[var(--color-primary-dark)] text-lg"
            onClick={() => {
              setMenuOpen(false)
              navTap('parent')
            }}
          >
            🔒 おやメニュー
          </button>
          {!isAdult && !shardEggReady && (
            <div className="btn-kid w-full break-keep bg-[var(--color-bg-2)] text-base text-[var(--color-ink-soft)]">
              ✨ かけらタマゴ：
              {shardEggUsedThisWeek ? 'また らいしゅう！' : `あと ${SHARD_EGG_COST - save.shards} こ`}
            </div>
          )}

          {/* うえの数字（マーク）の説明：初見だと意味が分からないので、ここで案内する */}
          <div className="rounded-2xl bg-[var(--color-bg-2)] p-3 text-left text-[var(--color-ink)]">
            <p className="mb-2 text-center text-sm font-extrabold text-[var(--color-ink-soft)]">
              📋 うえの マークの いみ
            </p>
            <ul className="flex flex-col gap-1.5 text-sm font-bold leading-snug">
              <li>
                🔥 <b>きょうのチャレンジ</b>：きょう クイズした 回数 ／ 1日に できる 回数
              </li>
              <li>
                💰 <b>こんげつ</b>：今月 木の実を おとして おこづかい（コイン）に かえた ぶん
              </li>
              <li>
                ✨ <b>ホシのかけら</b>：ダブりで もらえる かけら（{SHARD_EGG_COST}こで タマゴが ひける）
              </li>
              <li>
                📖 <b>ずかん</b>：であった モンスターの 数 ／ ぜんぶの 数
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

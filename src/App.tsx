/*
 * アプリのルート（S1 が所有・ナビ契約の正本）
 * ゲート順（spec §4 / §10）:
 *   1) settings.passcodeChanged が false → <ForcePasscodeChange/>（他は出さない）
 *   2) currentProfileId が null → <ProfileSelect/>
 *   3) それ以外 → screen で分岐
 * 配線:
 *   - Quiz.onComplete(r) => pendingGacha=r + screen='gacha'
 *   - Gacha は pendingGacha の difficulty/retryUsed を受け、onDone => screen='home' + pendingGacha=null
 *   - shard-egg（かけらタマゴ・spec §8）は Home から直接入り、onDone => 'home'
 *   - zukan / tree / parent の onBack => 'home'
 * 音:
 *   - 初回タップで audio.unlock()（iOS 自動再生制限対応・spec §11）
 *   - settings.sound を audio.setEnabled に同期（リロード後も OFF が効く）
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GameProvider, useGame } from './contexts/GameContext'
import type { Difficulty, Rarity } from './types'
import { audio } from './lib/audio'
import ProfileSelect from './features/profile/ProfileSelect'
import ForcePasscodeChange from './features/profile/ForcePasscodeChange'
import Home from './features/home/Home'
import Zukan from './features/collection/Zukan'
import CoinTree from './features/tree/CoinTree'
import Quiz from './features/quiz/Quiz'
import Gacha from './features/gacha/Gacha'
import ShardEgg from './features/gacha/ShardEgg'
import ParentMenu from './features/settings/ParentMenu'
import Opening from './features/opening/Opening'
import DangerEvent from './features/danger/DangerEvent'
import AdultMode from './features/adult/AdultMode'
import AdultZukan from './features/adult/AdultZukan'
import { storage } from './lib/storage'
import { DANGER_RATE } from './lib/constants'

export type Screen =
  | 'home'
  | 'quiz'
  | 'gacha'
  | 'shard-egg'
  | 'zukan'
  | 'tree'
  | 'parent'
  | 'danger'
  | 'adult'
  | 'adult-zukan'

interface PendingGacha {
  difficulty: Difficulty
  retryUsed: boolean
}

function AppContent() {
  const { ready, settings, currentProfileId } = useGame()
  // オープニング演出（起動時に1回だけ。リロードで true に戻る＝アプリを開くたびに流れる）
  const [showOpening, setShowOpening] = useState(true)

  // 設定の音 ON/OFF を audio ラッパーへ同期（起動時・変更時）
  useEffect(() => {
    audio.setEnabled({ se: settings.sound.se, bgm: settings.sound.bgm })
  }, [settings.sound.se, settings.sound.bgm])

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="anim-float text-2xl font-extrabold text-[var(--color-ink-soft)]">
          よみこみちゅう…
        </p>
      </div>
    )
  }

  // オープニング（起動時に1回・追加機能1-B）。タップで既存フロー（パスコード/プロフィール/ホーム）へ
  if (showOpening) {
    return <Opening onDone={() => setShowOpening(false)} />
  }

  // ゲート1: パスコードが 0000 のまま → 変更するまで先へ進めない（spec §10）
  if (!settings.passcodeChanged) {
    return <ForcePasscodeChange />
  }

  // ゲート2: プロフィール未選択 → 「だれが あそぶ？」
  if (currentProfileId === null) {
    return <ProfileSelect />
  }

  // key でプロフィール切替時に screen / pendingGacha を自動リセット（前の子の画面状態を持ち越さない）
  return <SessionScreens key={currentProfileId} />
}

/** プロフィール選択後の画面切替（screen と pendingGacha はプロフィール単位でリセット） */
function SessionScreens() {
  const [screen, setScreen] = useState<Screen>('home')
  const [pendingGacha, setPendingGacha] = useState<PendingGacha | null>(null)
  // テスト用（npm run dev 限定）：演出を「見るだけ」表示するための指定
  const [debugRarity, setDebugRarity] = useState<Rarity | null>(null)
  const [debugDanger, setDebugDanger] = useState(false)

  // gacha なのに pendingGacha が無い（リロード等）→ ホーム表示にフォールバック
  const effectiveScreen: Screen = screen === 'gacha' && !pendingGacha ? 'home' : screen

  // テスト用ジャンプ（本番ビルドでは下のパネルごと消えるので呼ばれない）
  const openGachaDemo = (r: Rarity) => {
    setDebugRarity(r)
    setPendingGacha({ difficulty: 'normal', retryUsed: false })
    setScreen('gacha')
  }
  const openDangerDemo = () => {
    setDebugDanger(true)
    setScreen('danger')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={effectiveScreen}
          className="min-h-dvh"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {effectiveScreen === 'home' && <Home go={(s) => setScreen(s)} />}
          {effectiveScreen === 'quiz' && (
            <Quiz
              onComplete={(r: PendingGacha) => {
                setPendingGacha(r)
                setScreen('gacha')
              }}
              onQuit={() => setScreen('home')}
            />
          )}
          {effectiveScreen === 'gacha' && pendingGacha && (
            <Gacha
              difficulty={pendingGacha.difficulty}
              retryUsed={pendingGacha.retryUsed}
              debugRarity={debugRarity ?? undefined}
              onDone={() => {
                const wasDebug = debugRarity != null
                setPendingGacha(null)
                setDebugRarity(null)
                // ガチャのあと、低確率で DANGER 討伐イベントが発生（追加機能1-C）。テスト演出では出さない。
                setScreen(!wasDebug && Math.random() < DANGER_RATE ? 'danger' : 'home')
              }}
            />
          )}
          {effectiveScreen === 'danger' && (
            <DangerEvent
              debugReveal={debugDanger}
              onDone={() => {
                setDebugDanger(false)
                setScreen('home')
              }}
            />
          )}
          {effectiveScreen === 'adult' && <AdultMode onDone={() => setScreen('home')} />}
          {effectiveScreen === 'adult-zukan' && (
            <AdultZukan zukan={storage.getAdultData().zukan} onBack={() => setScreen('home')} />
          )}
          {effectiveScreen === 'shard-egg' && <ShardEgg onDone={() => setScreen('home')} />}
          {effectiveScreen === 'zukan' && <Zukan onBack={() => setScreen('home')} />}
          {effectiveScreen === 'tree' && <CoinTree onBack={() => setScreen('home')} />}
          {effectiveScreen === 'parent' && <ParentMenu onBack={() => setScreen('home')} />}
        </motion.div>
      </AnimatePresence>

      {/* === テスト用パネル（開発モード、または本番でも URL に ?test を付けた時だけ表示。通常の利用者には出ない） === */}
      {(import.meta.env.DEV || new URLSearchParams(window.location.search).has('test')) &&
        effectiveScreen === 'home' && (
        <div className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[var(--color-primary)] bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
          <span className="text-xs font-extrabold text-[var(--color-ink-soft)]">🧪 えんしゅつテスト</span>
          {(['N', 'R', 'SR', 'UR'] as Rarity[]).map((r) => (
            <button
              key={r}
              onClick={() => openGachaDemo(r)}
              className="rounded-lg bg-[var(--color-primary)] px-2.5 py-1 text-sm font-extrabold text-white active:scale-95"
            >
              {r}
            </button>
          ))}
          <button
            onClick={openDangerDemo}
            className="rounded-lg bg-[var(--color-danger)] px-2.5 py-1 text-sm font-extrabold text-white active:scale-95"
          >
            DANGER
          </button>
          <button
            onClick={() => setScreen('adult')}
            className="rounded-lg bg-[var(--color-ink-soft)] px-2.5 py-1 text-sm font-extrabold text-white active:scale-95"
          >
            大人
          </button>
        </div>
      )}
    </>
  )
}

export default function App() {
  return (
    <GameProvider>
      {/* 初回タップで音声を解放（unlock は何度呼んでも安全） */}
      <div onPointerDownCapture={() => audio.unlock()}>
        <AppContent />
      </div>
    </GameProvider>
  )
}

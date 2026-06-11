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
import type { Difficulty } from './types'
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

export type Screen = 'home' | 'quiz' | 'gacha' | 'shard-egg' | 'zukan' | 'tree' | 'parent'

interface PendingGacha {
  difficulty: Difficulty
  retryUsed: boolean
}

function AppContent() {
  const { ready, settings, currentProfileId } = useGame()

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

  // gacha なのに pendingGacha が無い（リロード等）→ ホーム表示にフォールバック
  const effectiveScreen: Screen = screen === 'gacha' && !pendingGacha ? 'home' : screen

  return (
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
            onDone={() => {
              setPendingGacha(null)
              setScreen('home')
            }}
          />
        )}
        {effectiveScreen === 'shard-egg' && <ShardEgg onDone={() => setScreen('home')} />}
        {effectiveScreen === 'zukan' && <Zukan onBack={() => setScreen('home')} />}
        {effectiveScreen === 'tree' && <CoinTree onBack={() => setScreen('home')} />}
        {effectiveScreen === 'parent' && <ParentMenu onBack={() => setScreen('home')} />}
      </motion.div>
    </AnimatePresence>
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

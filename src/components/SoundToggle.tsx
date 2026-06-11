/*
 * 音 ON/OFF トグル（子供画面用・spec §11）
 * - settings.sound.se / bgm のどちらかが ON なら「音あり」とみなし、タップで両方を一括 ON/OFF
 * - updateSettings で保存しつつ audio.setEnabled に即反映（OFF→ON は BGM が自動復帰）
 * - SE/BGM の個別設定は親メニュー側（S2）の担当
 * - 保存失敗してもメモリ上は反映されるため警告は出さない（音設定は失っても実害が小さい）
 */
import { Volume2, VolumeX } from 'lucide-react'
import { useGame } from '../contexts/GameContext'
import { audio } from '../lib/audio'

export default function SoundToggle() {
  const { settings, updateSettings } = useGame()
  const on = settings.sound.se || settings.sound.bgm

  const toggle = () => {
    const next = !on
    updateSettings((s) => ({ ...s, sound: { se: next, bgm: next } }))
    audio.setEnabled({ se: next, bgm: next })
    if (next) audio.playSe('tap')
  }

  return (
    <button
      aria-label={on ? 'おとを けす' : 'おとを だす'}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-ink-soft)] shadow-md transition-transform active:scale-90"
      onClick={toggle}
    >
      {on ? <Volume2 size={26} /> : <VolumeX size={26} />}
    </button>
  )
}

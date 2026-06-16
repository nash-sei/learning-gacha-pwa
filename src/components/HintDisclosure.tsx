/*
 * タップで開く1行ヒント（折り畳み・むずかしい/ふつう用）
 * - 既定は閉じ。タップで line（通常 explain[0]）の1行だけ表示（答えそのものは出さない）
 * - Quiz（solve ステップ）と DangerEvent（fight）で共用
 * - 見た目は既存のヒントカード（border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)]）に合わせる
 */
import { useState } from 'react'
import { audio } from '../lib/audio'
import Ruby from './Ruby'

export interface HintDisclosureProps {
  /** 表示する1行（通常 explain[0]）。空なら何も描かない */
  line: string
}

export default function HintDisclosure({ line }: HintDisclosureProps) {
  const [open, setOpen] = useState(false)
  if (line === '') return null
  return (
    <div className="rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)]">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-2.5 text-base font-extrabold text-[var(--color-ink-soft)] active:scale-[0.99]"
        aria-expanded={open}
        onClick={() => {
          audio.playSe('tap')
          setOpen((o) => !o)
        }}
      >
        <span>💡 ヒントを みる</span>
        <span className="text-[var(--color-ink-faint)]">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-3">
          <p className="text-base text-[var(--color-ink)]">
            <Ruby text={line} />
          </p>
        </div>
      )}
    </div>
  )
}

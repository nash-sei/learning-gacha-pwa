/*
 * 初回パスコード変更の強制画面（spec §10）
 * - settings.passcodeChanged が false の間、App はこの画面だけを表示する
 * - 親向けの文言（漢字あり）。新パスコード4桁を2回入力 → 一致で updateSettings
 *   （parentPasscode 更新 + passcodeChanged:true）→ App が自動で次のゲートへ
 * - 0000 は再設定不可
 * - 保存失敗（容量超過等）は握りつぶさず画面に表示（spec §9-5）
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../contexts/GameContext'
import { audio } from '../../lib/audio'

/** 数字以外を除去して4桁までに整える */
function sanitize(v: string): string {
  return v.replace(/\D/g, '').slice(0, 4)
}

export default function ForcePasscodeChange() {
  const { updateSettings } = useGame()
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canSubmit = pass1.length === 4 && pass2.length === 4

  const handleSubmit = () => {
    audio.playSe('tap')
    if (!/^\d{4}$/.test(pass1)) {
      setError('4桁の数字を入力してください')
      return
    }
    if (pass1 === '0000') {
      setError('0000 は使用できません。別の番号にしてください')
      return
    }
    if (pass1 !== pass2) {
      setError('2回の入力が一致しません')
      return
    }
    const res = updateSettings((s) => ({
      ...s,
      parentPasscode: pass1,
      passcodeChanged: true,
    }))
    if (!res.ok) {
      setError(
        `保存に失敗しました（端末の空き容量を確認してください）${res.error ? `: ${res.error}` : ''}`
      )
    }
    // 成功時は settings.passcodeChanged=true になり App が自動で次の画面へ進む
  }

  const inputClass =
    'w-full rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)] p-4 text-center text-3xl font-extrabold tracking-[0.5em] outline-none focus:border-[var(--color-primary-light)]'

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-6">
      <motion.div
        className="card-kid w-full space-y-5 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-center text-2xl font-extrabold text-[var(--color-primary-dark)]">
          🔒 保護者の方へ
        </h1>
        <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">
          はじめに、親メニュー用のパスコード（4桁の数字）を設定してください。
          初期値の 0000 のままでは使えません。設定が終わるまでアプリは始められません。
        </p>

        <label className="block">
          <span className="mb-1 block text-lg font-extrabold">新しいパスコード（4桁）</span>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={pass1}
            onChange={(e) => {
              setPass1(sanitize(e.target.value))
              setError(null)
            }}
            placeholder="____"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-lg font-extrabold">もう一度入力</span>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={pass2}
            onChange={(e) => {
              setPass2(sanitize(e.target.value))
              setError(null)
            }}
            placeholder="____"
            className={inputClass}
          />
        </label>

        {error != null && (
          <p className="text-center text-base font-extrabold text-[var(--color-danger)]">{error}</p>
        )}

        <button
          className="btn-kid w-full bg-[var(--color-primary)] text-xl"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          このパスコードに決める
        </button>

        <p className="text-sm text-[var(--color-ink-faint)]">
          ※ パスコードは忘れないようにメモしてください（後から親メニューで変更できます）
        </p>
      </motion.div>
    </div>
  )
}

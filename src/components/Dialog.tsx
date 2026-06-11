/*
 * ゲーム内ダイアログ（alert() 代替・spec §12）
 * - 子供向け：大きい角丸・はっきり配色・大きめ文字
 * - framer-motion でふわっと表示（AnimatePresence で閉じる時もアニメ）
 * - onClose があれば背景タップで閉じられる
 */
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface DialogProps {
  open: boolean
  title?: string
  children?: ReactNode
  /** ボタン列（呼び出し側が .btn-kid 等で用意） */
  actions?: ReactNode
  onClose?: () => void
}

export default function Dialog({ open, title, children, actions, onClose }: DialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* 背景（タップで閉じる） */}
          <div
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* 本体 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="card-kid relative w-full max-w-md border-4 border-[var(--color-bg-2)] p-6"
            initial={{ scale: 0.82, y: 28, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 14, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            {title != null && title !== '' && (
              <h2 className="mb-3 text-center text-2xl font-extrabold text-[var(--color-primary-dark)]">
                {title}
              </h2>
            )}
            {children != null && (
              <div className="text-lg leading-relaxed text-[var(--color-ink)]">{children}</div>
            )}
            {actions != null && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">{actions}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

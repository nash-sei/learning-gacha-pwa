/*
 * 大人モード（おとなのクイズ・テスト用）
 * - 通常クイズ / DANGER とは独立した別枠。子供用の出題やセーブデータには一切触らない。
 * - PACK_ADULT（一般教養・雑学・常識の合計200問）から毎回ランダムに10問。
 * - 4択・◯✕（answer.kind==='choice'）に対応。1問ごとに正誤＋解説を表示し、最後にスコア。
 * - ヒントは1ゲーム（10問）で最大3回まで。問題中に「のこり何回／何回目か」を表示。
 * - 全問正解で「200円おこづかい」画面（DANGERのモンスター無し版）を表示。
 * - 採点・選択肢シャッフルは既存の questionEngine を再利用。
 */
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Question } from '../../types'
import { shuffle, buildChoiceOptions, checkAnswer } from '../../lib/questionEngine'
import { audio } from '../../lib/audio'
import { PACK_ADULT } from '../../data/packs/pack-adult'

export interface AdultModeProps {
  onDone: () => void
}

/** 1回あたりの出題数 */
const QUESTION_COUNT = 10
/** 1ゲームで使えるヒントの上限 */
const MAX_HINTS = 3
/** 全問正解のごほうび金額（円） */
const REWARD_YEN = 200
/** 大人向けの落ち着いた背景（子供用の明るい庭と区別） */
const ADULT_BG = 'linear-gradient(to bottom, #24344d, #141d2e)'

function pickQuestions(): Question[] {
  return shuffle(PACK_ADULT).slice(0, Math.min(QUESTION_COUNT, PACK_ADULT.length))
}

export default function AdultMode({ onDone }: AdultModeProps) {
  const [questions, setQuestions] = useState<Question[]>(pickQuestions)
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState<{ displayIndex: number; correct: boolean } | null>(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz')
  // ヒント：使った合計回数（ゲーム単位）と、今の問題で見せたヒントが「何回目」か
  const [hintsUsed, setHintsUsed] = useState(0)
  const [revealedOrdinal, setRevealedOrdinal] = useState<number | null>(null)

  const q = questions[qIndex] ?? null
  // 選択肢の並びはこの問題の間だけ固定（再レンダーで並び替わらないよう q をキーに）
  const choiceUi = useMemo(() => (q ? buildChoiceOptions(q.answer) : null), [q])

  const perfect = questions.length > 0 && score === questions.length

  // 全問正解で結果に入ったら「やったね」の音
  useEffect(() => {
    if (phase === 'result' && perfect) audio.playSe('harvest')
  }, [phase, perfect])

  const restart = () => {
    audio.playSe('tap')
    setQuestions(pickQuestions())
    setQIndex(0)
    setAnswered(null)
    setHintsUsed(0)
    setRevealedOrdinal(null)
    setScore(0)
    setPhase('quiz')
  }

  const useHint = () => {
    if (answered || hintsUsed >= MAX_HINTS || revealedOrdinal != null) return
    audio.playSe('tap')
    setRevealedOrdinal(hintsUsed + 1)
    setHintsUsed((n) => n + 1)
  }

  const choose = (displayIndex: number) => {
    if (answered || !q || q.answer.kind !== 'choice' || !choiceUi) return
    const originalIndex = q.answer.options.indexOf(choiceUi.options[displayIndex])
    const correct = checkAnswer(q.answer, { index: originalIndex })
    audio.playSe(correct ? 'correct' : 'wrong')
    if (correct) setScore((s) => s + 1)
    setAnswered({ displayIndex, correct })
  }

  const next = () => {
    audio.playSe('tap')
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1)
      setAnswered(null)
      setRevealedOrdinal(null) // 次の問題ではヒント表示をリセット（使った合計は持ち越し）
    } else {
      setPhase('result')
    }
  }

  // ===== けっか =====
  if (phase === 'result') {
    const ratio = questions.length > 0 ? score / questions.length : 0
    const msg =
      ratio === 1
        ? 'まんてん！おみごと！'
        : ratio >= 0.7
          ? 'すばらしい！'
          : ratio >= 0.4
            ? 'いいせん いってます'
            : 'もう1回 ちょうせん！'
    return (
      <div
        className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6"
        style={{ background: ADULT_BG }}
      >
        <motion.div
          className="card-kid flex w-full max-w-sm flex-col items-center gap-4 p-8"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-5xl">{perfect ? '🎉' : '🎓'}</div>
          <h1 className="text-center text-2xl font-extrabold text-[var(--color-ink)]">
            けっか はっぴょう
          </h1>
          <p className="text-center">
            <span className="text-6xl font-black text-[var(--color-primary-dark)]">{score}</span>
            <span className="text-2xl font-extrabold text-[var(--color-ink-soft)]">
              {' '}
              / {questions.length}
            </span>
          </p>
          <p className="text-center text-lg font-bold text-[var(--color-ink-soft)]">{msg}</p>

          {/* 全問正解のごほうび（DANGERのモンスター無し・200円おこづかい） */}
          {perfect && (
            <motion.div
              className="w-full rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-2)] p-4 text-center"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
            >
              <p className="text-2xl font-extrabold text-[var(--color-accent-dark)]">
                💰 げんきん {REWARD_YEN}円 ゲット！
              </p>
              <p className="text-sm font-bold text-[var(--color-ink-soft)]">
                ぜんもん せいかい！ おうちのひとから うけとってね
              </p>
            </motion.div>
          )}

          <div className="flex w-full gap-3">
            <button className="btn-kid flex-1 bg-[var(--color-primary)]" onClick={restart}>
              もう1回
            </button>
            <button
              className="btn-kid flex-1 bg-[var(--color-secondary)]"
              onClick={() => {
                audio.playSe('tap')
                onDone()
              }}
            >
              ホーム
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // 念のためのフォールバック（問題が取れない）
  if (!q || !choiceUi) {
    return (
      <div className="flex min-h-dvh items-center justify-center" style={{ background: ADULT_BG }}>
        <button className="btn-kid bg-[var(--color-primary)]" onClick={onDone}>
          もどる
        </button>
      </div>
    )
  }

  // ===== しゅつだい =====
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col p-4" style={{ background: ADULT_BG }}>
      {/* ヘッダー */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-base font-extrabold text-white">
          🎓 大人のクイズ
        </span>
        <div className="flex items-center gap-3">
          <span className="text-base font-extrabold text-white">
            {questions.length}もんちゅう {qIndex + 1}もんめ
          </span>
          <button
            className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white active:scale-95"
            onClick={() => {
              audio.playSe('tap')
              onDone()
            }}
          >
            やめる
          </button>
        </div>
      </div>

      {/* 進捗バー＋ヒント残り回数（問題中つねに表示） */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all"
            style={{ width: `${(qIndex / questions.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold text-white">
          💡 ヒント のこり {MAX_HINTS - hintsUsed}/{MAX_HINTS}回
        </span>
      </div>

      <div className="card-kid flex flex-1 flex-col p-5">
        {/* ジャンルバッジ */}
        {q.pack && (
          <span className="mb-2 inline-block self-start rounded-full bg-[var(--color-bg-2)] px-3 py-1 text-xs font-extrabold text-[var(--color-ink-soft)]">
            {q.pack}
          </span>
        )}
        <p className="mb-5 text-xl font-bold leading-relaxed text-[var(--color-ink)]">{q.text}</p>

        {/* ヒント（1ゲーム最大3回・何回目かを表示） */}
        {q.hint && (
          <div className="mb-4">
            {revealedOrdinal != null ? (
              <div className="rounded-2xl border-2 border-dashed border-[var(--color-accent)] bg-[var(--color-bg-2)] p-3">
                <p className="mb-1 text-xs font-extrabold text-[var(--color-accent-dark)]">
                  💡 ヒント（{revealedOrdinal}回目 ／ のこり {MAX_HINTS - hintsUsed}回）
                </p>
                <p className="text-base font-bold text-[var(--color-ink-soft)]">{q.hint}</p>
              </div>
            ) : !answered && hintsUsed < MAX_HINTS ? (
              <button
                className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-extrabold text-white active:scale-95"
                onClick={useHint}
              >
                💡 ヒントを みる（のこり {MAX_HINTS - hintsUsed}回）
              </button>
            ) : !answered ? (
              <span className="inline-block rounded-full bg-[var(--color-bg-2)] px-4 py-2 text-sm font-bold text-[var(--color-ink-faint)]">
                💡 ヒントは つかいきりました（{MAX_HINTS}回）
              </span>
            ) : null}
          </div>
        )}

        {/* 選択肢 */}
        <div className="flex flex-col gap-3">
          {choiceUi.options.map((opt, i) => {
            const revealed = answered != null
            const isCorrect = i === choiceUi.correct
            const isPicked = answered?.displayIndex === i
            let cls =
              'flex w-full items-center rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold shadow-sm active:scale-[0.99] '
            if (!revealed) {
              cls += 'border-[var(--color-primary-light)] bg-white text-[var(--color-ink)]'
            } else if (isCorrect) {
              cls += 'border-[var(--color-success)] bg-[var(--color-success)] text-white'
            } else if (isPicked) {
              cls += 'border-[var(--color-danger)] bg-[var(--color-danger)] text-white'
            } else {
              cls += 'border-[var(--color-bg-2)] bg-white text-[var(--color-ink-faint)] opacity-60'
            }
            return (
              <button
                key={`${opt}-${i}`}
                className={cls}
                disabled={revealed}
                onClick={() => choose(i)}
              >
                <span className="mr-2 shrink-0">
                  {revealed && isCorrect ? '⭕' : revealed && isPicked ? '❌' : '・'}
                </span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>

        {/* 解説＋つぎへ */}
        {answered && (
          <motion.div className="mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 rounded-2xl bg-[var(--color-bg-2)] p-4">
              <p className="mb-1 text-lg font-extrabold">
                {answered.correct ? (
                  <span className="text-[var(--color-success)]">⭕ せいかい！</span>
                ) : (
                  <span className="text-[var(--color-danger)]">❌ ざんねん…</span>
                )}
              </p>
              {q.explain[0] && (
                <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">
                  {q.explain[0]}
                </p>
              )}
            </div>
            <button className="btn-kid w-full bg-[var(--color-accent)]" onClick={next}>
              {qIndex + 1 < questions.length ? 'つぎへ →' : 'けっかを みる'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/*
 * クイズ画面（spec §5・学習の核）
 * - 入口で難易度選択（かんたん3問/ふつう4問/むずかしい5問）→ 全問正解で onComplete（App がガチャへ）
 * - check 付き問題（文章題・読解）は「よむ→わかる→とく」2ステップ（spec §5-2・最重要）
 *   理解チェック正解＝ホシのかけら+1（updateSave で即保存）。不正解でも段階解説を見て「とく」へ進める（かけら無し）
 * - 解答不正解＝段階ヒント方式：間違えた回数ぶんだけ解説行を開放（1回目=ヒント1行のみ）。
 *   全行（=答え）が見えるのは間違え続けた最終段階だけ（spec §5-1 を実機FB 2026-06-13 で改訂）。
 *   リトライ時は選択肢・ならべかえを再シャッフル。1度でも使うと retryUsed=true（ガチャ側でレア率1段階降格）
 * - 正解は都度 questionClearCounts に保存（途中でやめても苦手記録は残る）
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Difficulty, Question, Subject } from '../../types'
import {
  DIFFICULTY_LABEL,
  QUESTION_COUNT,
  SHARD_FOR_UNDERSTANDING,
  SUBJECT_EMOJI,
  SUBJECT_LABEL,
  SUBJECT_NOTE,
} from '../../lib/constants'
import {
  buildAskedOptions,
  buildChoiceOptions,
  buildOrderTokens,
  checkAnswer,
  checkUnderstanding,
  selectQuestions,
} from '../../lib/questionEngine'
import type { ShuffledToken } from '../../lib/questionEngine'
import { audio } from '../../lib/audio'
import { parseRuby } from '../../lib/ruby'
import { useGame } from '../../contexts/GameContext'
import { BUILTIN_QUESTIONS } from '../../data/packs'
import Ruby from '../../components/Ruby'
import Dialog from '../../components/Dialog'
import MonsterSprite from '../../components/MonsterSprite'
import FigureView from '../../components/figures/FigureView'
import HintDisclosure from '../../components/HintDisclosure'
import JapanMap from '../../components/JapanMap'

export interface QuizProps {
  onComplete: (r: { difficulty: Difficulty; retryUsed: boolean }) => void
  onQuit: () => void
}

// ========== 問題内ステップ（よむ→わかる→とく） ==========

type Step =
  | { kind: 'read' }
  | { kind: 'check' }
  | { kind: 'check-reward' } // 理解チェック正解のごほうび表示
  | { kind: 'explain'; lineIndex: number; after: 'solve' | 'retry' }
  | { kind: 'solve' }
  | { kind: 'celebrate' } // 正解演出（自動で次へ）

/** 表示用にシャッフル済みの選択肢類（問題開始時・リトライ時に作り直す） */
interface SolveUi {
  asked: { options: string[]; answer: number } | null
  choice: { options: string[]; correct: number } | null
  order: ShuffledToken[] | null
}

// ========== number-tap 用：問題文を「タップできる数字」と地の文に分解 ==========

interface TapToken {
  key: number
  base: string
  ruby?: string
  /** 数字トークンならその数値（地の文なら null） */
  num: number | null
}

function buildTapTokens(text: string): TapToken[] {
  const out: TapToken[] = []
  let key = 0
  for (const seg of parseRuby(text)) {
    if (seg.ruby != null) {
      out.push({ key: key++, base: seg.base, ruby: seg.ruby, num: null })
      continue
    }
    for (const part of seg.base.split(/(\d+)/)) {
      if (part === '') continue
      out.push({
        key: key++,
        base: part,
        num: /^\d+$/.test(part) ? Number(part) : null,
      })
    }
  }
  return out
}

// ========== 小物コンポーネント ==========

const DIFF_BUTTON_BG: Record<Difficulty, string> = {
  easy: 'bg-[var(--color-success)]',
  normal: 'bg-[var(--color-primary)]',
  hard: 'bg-[var(--color-secondary)]',
}

/** 教科えらびボタンの色（教科ごと・2026-07 社会追加） */
const SUBJECT_BUTTON_BG: Record<Subject, string> = {
  math: 'bg-[var(--color-primary)]',
  japanese: 'bg-[var(--color-secondary)]',
  shakai: 'bg-[var(--color-success)]',
}

/** よむ→わかる→とく の現在地表示（check 付き問題のみ） */
function StepFlow({ current }: { current: 'よむ' | 'わかる' | 'とく' }) {
  const steps: Array<'よむ' | 'わかる' | 'とく'> = ['よむ', 'わかる', 'とく']
  return (
    <div className="mb-3 flex items-center justify-center gap-1">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-1">
          {i > 0 && <span className="text-[var(--color-ink-faint)]">→</span>}
          <span
            className={
              s === current
                ? 'rounded-full bg-[var(--color-accent)] px-3 py-1 text-base font-extrabold text-white shadow'
                : 'rounded-full bg-[var(--color-bg-2)] px-3 py-1 text-base font-bold text-[var(--color-ink-soft)]'
            }
          >
            {s}
          </span>
        </span>
      ))}
    </div>
  )
}

/** 段階解説の1行。active 行は文節（。、！？区切り）ごとにハイライトしながら順に出す（spec §5-2 区切り読み） */
function ExplainLine({ text, active }: { text: string; active: boolean }) {
  const segments = useMemo(() => text.match(/[^。、！？]+[。、！？]*/g) ?? [text], [text])
  if (!active) {
    return (
      <p className="text-lg text-[var(--color-ink-soft)]">
        <Ruby text={text} />
      </p>
    )
  }
  return (
    <p className="text-xl font-bold text-[var(--color-ink)]">
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          className="rounded-md"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: ['rgba(255,192,67,0.55)', 'rgba(255,192,67,0)'],
          }}
          transition={{ delay: 0.2 + i * 0.55, duration: 0.9 }}
        >
          <Ruby text={seg} />
        </motion.span>
      ))}
    </p>
  )
}

/** 大きい数字キーパッド（number 解答用） */
function NumberPad(props: {
  value: string
  unit?: string
  onInput: (v: string) => void
  onSubmit: () => void
}) {
  const { value, unit, onInput, onSubmit } = props
  const press = (d: string) => {
    audio.playSe('tap')
    if (value.length >= 4) return
    onInput(value + d)
  }
  const erase = () => {
    audio.playSe('tap')
    onInput(value.slice(0, -1))
  }
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="mb-3 flex items-end justify-center gap-1 rounded-2xl border-4 border-[var(--color-bg-2)] bg-white px-4 py-3">
        <span className="min-h-12 text-4xl font-extrabold tracking-widest text-[var(--color-primary-dark)]">
          {value === '' ? '？' : value}
        </span>
        {unit != null && unit !== '' && (
          <span className="pb-1 text-xl font-bold text-[var(--color-ink-soft)]">{unit}</span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className="rounded-2xl bg-[var(--color-surface)] py-3 text-3xl font-extrabold text-[var(--color-ink)] shadow-md active:translate-y-0.5 active:scale-95"
          >
            {k}
          </button>
        ))}
        <button
          onClick={erase}
          aria-label="けす"
          className="rounded-2xl bg-[var(--color-bg-2)] py-3 text-2xl font-extrabold text-[var(--color-ink-soft)] shadow-md active:translate-y-0.5 active:scale-95"
        >
          ←
        </button>
        <button
          onClick={() => press('0')}
          className="rounded-2xl bg-[var(--color-surface)] py-3 text-3xl font-extrabold text-[var(--color-ink)] shadow-md active:translate-y-0.5 active:scale-95"
        >
          0
        </button>
        <button
          onClick={onSubmit}
          disabled={value === ''}
          className="rounded-2xl bg-[var(--color-accent)] py-3 text-2xl font-extrabold text-white shadow-md active:translate-y-0.5 active:scale-95 disabled:opacity-40"
        >
          OK
        </button>
      </div>
    </div>
  )
}

// ========== 本体 ==========

export default function Quiz({ onComplete, onQuit }: QuizProps) {
  const { save, updateSave, currentProfile, customQuestions } = useGame()

  const [phase, setPhase] = useState<'subject' | 'select' | 'play' | 'complete'>('subject')
  const [subject, setSubject] = useState<Subject>('math')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [questions, setQuestions] = useState<Question[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [step, setStep] = useState<Step>({ kind: 'read' })
  const [ui, setUi] = useState<SolveUi>({ asked: null, choice: null, order: null })
  const [retryUsed, setRetryUsed] = useState(false)
  /** 段階ヒントの開放行数（間違えるたびに+1。最終行=答えは最後の手段・実機FB 2026-06-13） */
  const [hintLevel, setHintLevel] = useState(0)
  const [numberInput, setNumberInput] = useState('')
  /** ならべかえ：シャッフル済みトークン配列の index を、子供が並べた順に持つ */
  const [orderPicked, setOrderPicked] = useState<number[]>([])
  const [quitOpen, setQuitOpen] = useState(false)
  const [noQuestionsOpen, setNoQuestionsOpen] = useState(false)

  const grade = currentProfile?.grade ?? 2
  const partnerId = save?.partnerId ?? null

  const pool = useMemo(
    () => [...BUILTIN_QUESTIONS, ...customQuestions],
    [customQuestions]
  )

  const q: Question | null = phase === 'play' ? (questions[qIndex] ?? null) : null

  /** 段階解説の行（空なら最低1行を補う） */
  const explainLines = useMemo(() => {
    if (!q) return []
    return q.explain.length > 0 ? q.explain : ['もういちど ゆっくり かんがえて みよう！']
  }, [q])

  /** いま見せてよい解説行数（段階ヒント）。全行開放=答えまで見えている状態 */
  const explainVisible = Math.max(1, Math.min(hintLevel, explainLines.length))
  const explainFull = explainVisible >= explainLines.length

  const tapTokens = useMemo(
    () => (q && q.check?.kind === 'number-tap' ? buildTapTokens(q.text) : null),
    [q]
  )

  // ---- 問題の開始準備（選択肢シャッフル・入力リセット） ----
  const prepareQuestion = useCallback((question: Question) => {
    setUi({
      asked: question.check ? buildAskedOptions(question.check) : null,
      choice: buildChoiceOptions(question.answer),
      order: buildOrderTokens(question.answer),
    })
    setNumberInput('')
    setOrderPicked([])
    setHintLevel(0)
    setStep(question.check ? { kind: 'read' } : { kind: 'solve' })
  }, [])

  // ---- 開始 ----
  const start = (diff: Difficulty) => {
    audio.unlock()
    audio.playSe('tap')
    const count = QUESTION_COUNT[diff]
    // 選んだ教科の問題だけに絞る（社長の「1チャレンジ＝1教科」）
    const subjectPool = pool.filter((qq) => qq.subject === subject)
    const qs = selectQuestions({
      difficulty: diff,
      grade,
      pool: subjectPool,
      clearCounts: save?.questionClearCounts ?? {},
      count,
    })
    if (qs.length === 0) {
      setNoQuestionsOpen(true)
      return
    }
    setDifficulty(diff)
    setQuestions(qs)
    setQIndex(0)
    setRetryUsed(false)
    prepareQuestion(qs[0])
    setPhase('play')
    audio.playBgm('quiz')
  }

  // ---- 次の問題へ／完了 ----
  const goNext = useCallback(() => {
    const next = qIndex + 1
    if (next < questions.length) {
      setQIndex(next)
      prepareQuestion(questions[next])
    } else {
      setPhase('complete')
    }
  }, [qIndex, questions, prepareQuestion])

  // 正解演出は自動で次へ
  useEffect(() => {
    if (step.kind !== 'celebrate') return
    const t = window.setTimeout(goNext, 1600)
    return () => window.clearTimeout(t)
  }, [step, goNext])

  // ---- 理解チェック（わかる） ----
  const finishCheck = (correct: boolean) => {
    if (correct) {
      // 理解＝かけら+1（spec §5-2）。読むこと自体がトクになる
      updateSave((s) => ({ ...s, shards: s.shards + SHARD_FOR_UNDERSTANDING }))
      audio.playSe('correct')
      setStep({ kind: 'check-reward' })
    } else {
      // 不正解＝ヒント1行だけ見せて「とく」へ進める（答えまでは見せない・かけらは無し）
      audio.playSe('wrong')
      setHintLevel((h) => Math.max(h, 1))
      setStep({ kind: 'explain', lineIndex: 0, after: 'solve' })
    }
  }

  const handleCheckOption = (displayIndex: number) => {
    if (!q || !q.check || q.check.kind === 'number-tap') return
    const asked = ui.asked
    if (!asked) return
    // 表示はシャッフル済みなので、選んだ文言から元 index に写して判定する
    const originalIndex = q.check.options.indexOf(asked.options[displayIndex])
    finishCheck(checkUnderstanding(q.check, { index: originalIndex }))
  }

  const handleNumberTap = (value: number) => {
    if (!q || !q.check || q.check.kind !== 'number-tap') return
    finishCheck(checkUnderstanding(q.check, { number: value }))
  }

  // ---- 解答（とく） ----
  const finishSolve = (correct: boolean) => {
    if (!q) return
    if (correct) {
      const id = q.id
      updateSave((s) => ({
        ...s,
        questionClearCounts: {
          ...s.questionClearCounts,
          [id]: (s.questionClearCounts[id] ?? 0) + 1,
        },
      }))
      audio.playSe('correct')
      audio.playSe('partner-happy')
      setStep({ kind: 'celebrate' })
    } else {
      audio.playSe('wrong')
      // 間違えるたびにヒントを1行ずつ開放（最終行=答えに届くのは間違え続けた時だけ）
      setHintLevel((h) => Math.min(h + 1, explainLines.length))
      setStep({ kind: 'explain', lineIndex: 0, after: 'retry' })
    }
  }

  const submitNumber = () => {
    if (!q || numberInput === '') return
    finishSolve(checkAnswer(q.answer, { number: Number(numberInput) }))
  }

  const submitChoice = (displayIndex: number) => {
    if (!q || q.answer.kind !== 'choice') return
    const choiceUi = ui.choice
    if (!choiceUi) return
    const originalIndex = q.answer.options.indexOf(choiceUi.options[displayIndex])
    finishSolve(checkAnswer(q.answer, { index: originalIndex }))
  }

  const submitOrder = () => {
    if (!q) return
    const tokens = ui.order
    if (!tokens) return
    const order = orderPicked.map((i) => tokens[i].originalIndex)
    finishSolve(checkAnswer(q.answer, { order }))
  }

  // 地図タップ（社会・都道府県）：選んだ地域IDで判定
  const submitMap = (regionId: string) => {
    if (!q || q.answer.kind !== 'map') return
    finishSolve(checkAnswer(q.answer, { region: regionId }))
  }

  // ---- 段階解説の読み進め（spec §5-1：読了後のみリトライ可） ----
  const advanceExplain = () => {
    if (step.kind !== 'explain' || !q) return
    audio.playSe('tap')
    if (step.lineIndex < explainVisible - 1) {
      setStep({ kind: 'explain', lineIndex: step.lineIndex + 1, after: step.after })
      return
    }
    if (step.after === 'retry') {
      // リトライ使用＝このクイズ全体で retryUsed=true（ガチャでレア率1段階降格）
      setRetryUsed(true)
      // 選択肢・ならべかえは混ぜ直す（覚えゲー化対策・spec §5-1）
      const question = q
      setUi((u) => ({
        ...u,
        choice: buildChoiceOptions(question.answer),
        order: buildOrderTokens(question.answer),
      }))
      setNumberInput('')
      setOrderPicked([])
    }
    setStep({ kind: 'solve' })
  }

  // ---- やめる ----
  const confirmQuit = () => {
    audio.stopBgm()
    onQuit()
  }

  // ========== 描画 ==========

  // ---- 教科えらび（2026-07 社会追加・難易度の前に1画面） ----
  if (phase === 'subject') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-center text-3xl font-extrabold text-[var(--color-primary-dark)]">
          きょうは なにを
          <br />
          べんきょうする？
        </h1>
        <div className="flex w-full max-w-sm flex-col gap-4">
          {(['math', 'japanese', 'shakai'] as const).map((s) => (
            <button
              key={s}
              className={`btn-kid w-full ${SUBJECT_BUTTON_BG[s]}`}
              onClick={() => {
                audio.unlock()
                audio.playSe('tap')
                setSubject(s)
                setPhase('select')
              }}
            >
              <span className="mr-1">{SUBJECT_EMOJI[s]}</span>
              {SUBJECT_LABEL[s]}
              <span className="block text-sm font-bold opacity-90">{SUBJECT_NOTE[s]}</span>
            </button>
          ))}
        </div>
        <button
          className="rounded-full bg-[var(--color-bg-2)] px-6 py-3 text-lg font-bold text-[var(--color-ink-soft)] active:scale-95"
          onClick={() => {
            audio.playSe('tap')
            onQuit()
          }}
        >
          もどる
        </button>
      </div>
    )
  }

  // ---- 難易度選択 ----
  if (phase === 'select') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6">
        <div className="rounded-full bg-[var(--color-bg-2)] px-5 py-1.5 text-xl font-extrabold text-[var(--color-ink)]">
          {SUBJECT_EMOJI[subject]} {SUBJECT_LABEL[subject]}
        </div>
        <h1 className="text-center text-3xl font-extrabold text-[var(--color-primary-dark)]">
          どの タマゴに
          <br />
          ちょうせんする？
        </h1>
        <div className="flex w-full max-w-sm flex-col gap-4">
          {(['easy', 'normal', 'hard'] as const).map((d) => (
            <button
              key={d}
              className={`btn-kid w-full ${DIFF_BUTTON_BG[d]}`}
              onClick={() => start(d)}
            >
              {DIFFICULTY_LABEL[d]}
              <span className="text-lg font-bold opacity-90">（{QUESTION_COUNT[d]}もん）</span>
            </button>
          ))}
        </div>
        <p className="text-center text-base text-[var(--color-ink-soft)]">
          むずかしいほど レアな モンスターが でやすいよ！
        </p>
        <button
          className="rounded-full bg-[var(--color-bg-2)] px-6 py-3 text-lg font-bold text-[var(--color-ink-soft)] active:scale-95"
          onClick={() => {
            audio.playSe('tap')
            setPhase('subject')
          }}
        >
          もどる
        </button>
        <Dialog
          open={noQuestionsOpen}
          title="あれれ？"
          onClose={() => setNoQuestionsOpen(false)}
          actions={
            <button
              className="btn-kid bg-[var(--color-primary)]"
              onClick={() => {
                setNoQuestionsOpen(false)
                onQuit()
              }}
            >
              もどる
            </button>
          }
        >
          <p className="text-center">
            この むずかしさの もんだいが まだ ないみたい。
            <br />
            おうちのひとに きいてみてね。
          </p>
        </Dialog>
      </div>
    )
  }

  // ---- 全問正解 ----
  if (phase === 'complete') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="card-kid flex w-full max-w-sm flex-col items-center gap-4 p-8"
        >
          <div className="text-5xl">🎉</div>
          <h1 className="text-center text-3xl font-extrabold text-[var(--color-accent-dark)]">
            ぜんもん せいかい！
          </h1>
          {partnerId != null && (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <MonsterSprite monsterId={partnerId} size={110} />
            </motion.div>
          )}
          {retryUsed && (
            <p className="text-center text-sm text-[var(--color-ink-soft)]">
              「もういちど」を つかったから、タマゴは すこし おちつくよ
            </p>
          )}
          <button
            className="btn-kid w-full bg-[var(--color-secondary)]"
            onClick={() => {
              audio.playSe('tap')
              onComplete({ difficulty, retryUsed })
            }}
          >
            タマゴガチャへ！
          </button>
        </motion.div>
      </div>
    )
  }

  if (!q) return null

  const hasCheck = q.check != null

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col p-4">
      {/* ヘッダー：やめる・進捗・難易度 */}
      <div className="mb-3 flex items-center justify-between">
        <button
          className="rounded-full bg-[var(--color-bg-2)] px-4 py-2 text-base font-bold text-[var(--color-ink-soft)] active:scale-95"
          onClick={() => {
            audio.playSe('tap')
            setQuitOpen(true)
          }}
        >
          やめる
        </button>
        <div className="text-lg font-extrabold text-[var(--color-ink)]">
          {questions.length}もんちゅう {qIndex + 1}もんめ
        </div>
        <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-sm font-bold text-white">
          {DIFFICULTY_LABEL[difficulty]}
        </span>
      </div>

      {/* 進捗ドット */}
      <div className="mb-3 flex items-center justify-center gap-2">
        {questions.map((qq, i) => (
          <span
            key={qq.id}
            className={`h-3.5 w-3.5 rounded-full ${
              i < qIndex
                ? 'bg-[var(--color-success)]'
                : i === qIndex
                  ? 'bg-[var(--color-accent)]'
                  : 'bg-[var(--color-bg-2)]'
            }`}
          />
        ))}
      </div>

      <div className="card-kid relative flex-1 p-5">
        {hasCheck && (
          <StepFlow
            current={
              step.kind === 'read'
                ? 'よむ'
                : step.kind === 'check' ||
                    step.kind === 'check-reward' ||
                    (step.kind === 'explain' && step.after === 'solve')
                  ? 'わかる'
                  : 'とく'
            }
          />
        )}

        {/* ---- よむ ---- */}
        {step.kind === 'read' && (
          <div className="flex flex-col gap-4">
            {q.figure && <FigureView figure={q.figure} />}
            <p className="text-2xl">
              <Ruby text={q.text} />
            </p>
            <button
              className="btn-kid mx-auto bg-[var(--color-primary)]"
              onClick={() => {
                audio.playSe('tap')
                setStep({ kind: 'check' })
              }}
            >
              よめたら つぎへ
            </button>
          </div>
        )}

        {/* ---- わかる（理解チェック） ---- */}
        {step.kind === 'check' && q.check && (
          <div className="flex flex-col gap-4">
            <p className="text-center text-xl font-extrabold text-[var(--color-primary-dark)]">
              <Ruby text={q.check.prompt} />
            </p>

            {q.check.kind === 'number-tap' && tapTokens && (
              <div className="text-2xl leading-loose whitespace-pre-wrap">
                {tapTokens.map((t) => {
                  const n = t.num
                  if (n != null) {
                    return (
                      <button
                        key={t.key}
                        onClick={() => handleNumberTap(n)}
                        className="mx-0.5 inline-flex rounded-xl border-4 border-[var(--color-primary-light)] bg-white px-3 py-0.5 text-2xl font-extrabold text-[var(--color-primary-dark)] shadow-md active:scale-95"
                      >
                        {t.base}
                      </button>
                    )
                  }
                  if (t.ruby != null) {
                    return (
                      <ruby key={t.key}>
                        {t.base}
                        <rt>{t.ruby}</rt>
                      </ruby>
                    )
                  }
                  return <span key={t.key}>{t.base}</span>
                })}
              </div>
            )}

            {q.check.kind === 'scene-pick' && ui.asked && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {ui.asked.options.map((sceneId, i) => (
                  <button
                    key={`${sceneId}-${i}`}
                    onClick={() => handleCheckOption(i)}
                    className="rounded-2xl border-4 border-transparent bg-[var(--color-bg)] p-2 transition active:scale-95 active:border-[var(--color-accent)]"
                  >
                    <FigureView figure={{ type: 'scene', params: { sceneId } }} />
                  </button>
                ))}
              </div>
            )}

            {q.check.kind === 'asked-what' && ui.asked && (
              <div className="flex flex-col gap-3">
                {ui.asked.options.map((opt, i) => (
                  <button
                    key={`${opt}-${i}`}
                    onClick={() => handleCheckOption(i)}
                    className="btn-kid w-full bg-[var(--color-primary)] text-xl"
                  >
                    <Ruby text={opt} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---- 理解チェック正解：かけら+1 ---- */}
        {step.kind === 'check-reward' && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="flex flex-col items-center gap-4 py-6"
          >
            <div className="text-5xl">⭐</div>
            <p className="text-center text-2xl font-extrabold text-[var(--color-accent-dark)]">
              せいかい！
              <br />
              ホシのかけら +{SHARD_FOR_UNDERSTANDING}
            </p>
            <button
              className="btn-kid bg-[var(--color-secondary)]"
              onClick={() => {
                audio.playSe('tap')
                setStep({ kind: 'solve' })
              }}
            >
              とく に すすむ！
            </button>
          </motion.div>
        )}

        {/* ---- 段階解説（相棒が1行ずつ・区切り読みハイライト） ---- */}
        {step.kind === 'explain' && (
          <div className="flex flex-col gap-4">
            {q.figure && <FigureView figure={q.figure} />}
            <div className="flex items-start gap-3">
              {partnerId != null && (
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="shrink-0"
                >
                  <MonsterSprite monsterId={partnerId} size={72} />
                </motion.div>
              )}
              <div className="flex-1 rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)] p-4">
                <p className="mb-2 text-sm font-extrabold text-[var(--color-ink-soft)]">
                  {explainFull ? '📖 かいせつ' : '💡 ヒント'}
                </p>
                <div className="flex flex-col gap-3">
                  {explainLines.slice(0, step.lineIndex + 1).map((line, i) => (
                    <ExplainLine key={i} text={line} active={i === step.lineIndex} />
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-kid mx-auto bg-[var(--color-primary)]" onClick={advanceExplain}>
              {step.lineIndex < explainVisible - 1
                ? 'つぎへ'
                : step.after === 'retry'
                  ? 'もういちど とく！'
                  : 'とく に すすむ'}
            </button>
          </div>
        )}

        {/* ---- とく（解答） ---- */}
        {step.kind === 'solve' && (
          <div className="flex flex-col gap-4">
            {q.figure && <FigureView figure={q.figure} />}
            <p className="text-2xl">
              <Ruby text={q.text} />
            </p>

            {/* 折り畳み1行ヒント（むずかしい/ふつうのみ・答えそのものは出さない） */}
            {difficulty !== 'easy' && <HintDisclosure line={explainLines[0] ?? ''} />}

            {q.answer.kind === 'number' && (
              <NumberPad
                value={numberInput}
                unit={q.answer.unit}
                onInput={setNumberInput}
                onSubmit={submitNumber}
              />
            )}

            {q.answer.kind === 'choice' && ui.choice && (
              <div className="flex flex-col gap-3">
                {ui.choice.options.map((opt, i) => (
                  <button
                    key={`${opt}-${i}`}
                    onClick={() => submitChoice(i)}
                    className="btn-kid w-full bg-[var(--color-primary)] text-xl"
                  >
                    <Ruby text={opt} />
                  </button>
                ))}
              </div>
            )}

            {q.answer.kind === 'order' && ui.order && (
              <div className="flex flex-col gap-3">
                <p className="text-center text-base font-bold text-[var(--color-ink-soft)]">
                  ただしい じゅんばんに ならべよう（タップで もどせるよ）
                </p>
                {/* ならべた列 */}
                <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-4 border-dashed border-[var(--color-primary-light)] bg-[var(--color-bg)] p-3">
                  {orderPicked.length === 0 && (
                    <span className="text-base text-[var(--color-ink-faint)]">
                      ここに ならべてね
                    </span>
                  )}
                  {orderPicked.map((tokenIdx, pos) => (
                    <button
                      key={`picked-${tokenIdx}`}
                      onClick={() => {
                        audio.playSe('tap')
                        setOrderPicked((p) => p.filter((_, j) => j !== pos))
                      }}
                      className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xl font-extrabold text-white shadow active:scale-95"
                    >
                      <Ruby text={ui.order ? ui.order[tokenIdx].text : ''} />
                    </button>
                  ))}
                </div>
                {/* のこりのことば */}
                <div className="flex flex-wrap items-center gap-2">
                  {ui.order.map((t, i) =>
                    orderPicked.includes(i) ? null : (
                      <button
                        key={`pool-${i}`}
                        onClick={() => {
                          audio.playSe('tap')
                          setOrderPicked((p) => [...p, i])
                        }}
                        className="rounded-xl border-4 border-[var(--color-primary-light)] bg-white px-4 py-2 text-xl font-extrabold text-[var(--color-primary-dark)] shadow active:scale-95"
                      >
                        <Ruby text={t.text} />
                      </button>
                    )
                  )}
                </div>
                <button
                  className="btn-kid mx-auto bg-[var(--color-accent)]"
                  disabled={orderPicked.length !== (q.answer.correctTokenCount ?? ui.order.length)}
                  onClick={submitOrder}
                >
                  できた！
                </button>
              </div>
            )}

            {q.answer.kind === 'map' && (
              <div className="flex flex-col gap-3">
                <p className="text-center text-base font-bold text-[var(--color-ink-soft)]">
                  ちずを タップして こたえてね
                </p>
                <JapanMap onPick={submitMap} />
              </div>
            )}
          </div>
        )}

        {/* ---- 正解演出（相棒が喜ぶ・自動で次へ） ---- */}
        <AnimatePresence>
          {step.kind === 'celebrate' && (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] bg-white/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                className="text-6xl"
              >
                ⭕
              </motion.div>
              <p className="text-3xl font-extrabold text-[var(--color-success)]">せいかい！</p>
              {partnerId != null && (
                <motion.div
                  animate={{ y: [0, -16, 0], rotate: [0, -6, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                >
                  <MonsterSprite monsterId={partnerId} size={100} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 相棒（画面のすみで応援） */}
      {partnerId != null && step.kind !== 'explain' && step.kind !== 'celebrate' && (
        <div className="pointer-events-none mt-2 flex justify-end pr-2">
          <div className="anim-float">
            <MonsterSprite monsterId={partnerId} size={64} />
          </div>
        </div>
      )}

      {/* やめる確認（alert 禁止 → Dialog） */}
      <Dialog
        open={quitOpen}
        title="とちゅうで やめる？"
        onClose={() => setQuitOpen(false)}
        actions={
          <>
            <button
              className="btn-kid bg-[var(--color-bg-2)] text-[var(--color-ink-soft)]"
              onClick={() => {
                audio.playSe('tap')
                setQuitOpen(false)
              }}
            >
              つづける
            </button>
            <button className="btn-kid bg-[var(--color-danger)]" onClick={confirmQuit}>
              やめる
            </button>
          </>
        }
      >
        <p className="text-center">ここまでの せいかいは ちゃんと きろくされているよ</p>
      </Dialog>
    </div>
  )
}

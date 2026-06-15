/*
 * DANGER討伐イベント（追加機能1-C）
 * - 通常クイズ→ガチャの後、低確率（DANGER_RATE）で App から呼ばれる。
 * - 流れ：intro（キケンなモンスター接近・たたかう/にげる）→ fight（難問3問）→ success / fail
 * - 難問は PACK_DANGER から selectQuestions で3問。各問の下に explain を「例ヒント」として最初から常時表示。
 * - 1問でも間違えたら即 fail（やり直しなし）。全問正解で success。
 * - success：pickDangerMonster で DANGER 限定を1体、awardDanger で付与＋現金200円を別枠記録（commit-then-animate）。
 * - 既存の出題エンジン（selectQuestions / checkAnswer / buildChoiceOptions / buildOrderTokens）を再利用。
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MonsterDef, Question } from '../../types'
import { DANGER_QUESTION_COUNT, DANGER_YEN } from '../../lib/constants'
import {
  buildChoiceOptions,
  buildOrderTokens,
  checkAnswer,
  selectQuestions,
} from '../../lib/questionEngine'
import type { ShuffledToken } from '../../lib/questionEngine'
import { pickDangerMonster, awardDanger } from '../../lib/danger'
import { audio } from '../../lib/audio'
import { useGame } from '../../contexts/GameContext'
import { PACK_DANGER } from '../../data/packs/pack-danger'
import Ruby from '../../components/Ruby'
import Dialog from '../../components/Dialog'
import MonsterSprite from '../../components/MonsterSprite'
import FigureView from '../../components/figures/FigureView'

export interface DangerEventProps {
  onDone: () => void
}

type Phase = 'intro' | 'fight' | 'success' | 'fail'

interface Reward {
  monster: MonsterDef | null
  isNew: boolean
}

/** 危険な雰囲気の背景（赤黒のラジアルグラデ） */
const DANGER_BG =
  'radial-gradient(120% 80% at 50% 30%, #7a1d1d, #3a0d10 62%, #160406)'

/** 小さめ数字キーパッド（number 解答用） */
function DangerNumberPad(props: {
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
      <div className="mb-3 flex items-end justify-center gap-1 rounded-2xl border-4 border-white/20 bg-white/90 px-4 py-3">
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
            className="rounded-2xl bg-white/90 py-3 text-3xl font-extrabold text-[var(--color-ink)] shadow-md active:translate-y-0.5 active:scale-95"
          >
            {k}
          </button>
        ))}
        <button
          onClick={erase}
          aria-label="けす"
          className="rounded-2xl bg-white/30 py-3 text-2xl font-extrabold text-white shadow-md active:translate-y-0.5 active:scale-95"
        >
          ←
        </button>
        <button
          onClick={() => press('0')}
          className="rounded-2xl bg-white/90 py-3 text-3xl font-extrabold text-[var(--color-ink)] shadow-md active:translate-y-0.5 active:scale-95"
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

export default function DangerEvent({ onDone }: DangerEventProps) {
  const { save, updateSave, currentProfile } = useGame()
  const grade = currentProfile?.grade ?? 2

  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [qIndex, setQIndex] = useState(0)

  // 解答UI（問題ごとに作り直す）
  const [choiceUi, setChoiceUi] = useState<{ options: string[]; correct: number } | null>(null)
  const [orderUi, setOrderUi] = useState<ShuffledToken[] | null>(null)
  const [orderPicked, setOrderPicked] = useState<number[]>([])
  const [numberInput, setNumberInput] = useState('')

  const [reward, setReward] = useState<Reward | null>(null)
  const [saveWarn, setSaveWarn] = useState(false)

  const q: Question | null = phase === 'fight' ? (questions[qIndex] ?? null) : null

  // 問題の解答UIを準備
  const prep = (question: Question) => {
    setChoiceUi(buildChoiceOptions(question.answer))
    setOrderUi(buildOrderTokens(question.answer))
    setOrderPicked([])
    setNumberInput('')
  }

  // たたかう：難問3問を選ぶ
  const startFight = () => {
    audio.unlock()
    audio.playSe('drumroll')
    const qs = selectQuestions({
      difficulty: 'hard',
      grade,
      pool: PACK_DANGER,
      clearCounts: save?.questionClearCounts ?? {},
      count: DANGER_QUESTION_COUNT,
    })
    if (qs.length === 0) {
      // 問題が無ければ討伐は発生させない（念のため）
      onDone()
      return
    }
    setQuestions(qs)
    setQIndex(0)
    prep(qs[0])
    setPhase('fight')
  }

  const flee = () => {
    audio.playSe('tap')
    onDone()
  }

  // 討伐成功：報酬を確定（commit-then-animate）
  const succeed = () => {
    audio.playSe('reveal-ur')
    if (!save) {
      setReward({ monster: null, isNew: false })
      setPhase('success')
      return
    }
    const monster = pickDangerMonster(save)
    const { nextSave, isNew } = awardDanger(save, monster)
    const res = updateSave(() => nextSave)
    if (!res.ok) setSaveWarn(true)
    setReward({ monster, isNew })
    setPhase('success')
  }

  // 正誤を裁定（正解→次へ／不正解→即終了）
  const judge = (correct: boolean) => {
    if (!correct) {
      audio.playSe('wrong')
      setPhase('fail')
      return
    }
    audio.playSe('correct')
    const next = qIndex + 1
    if (next < questions.length) {
      setQIndex(next)
      prep(questions[next])
    } else {
      succeed()
    }
  }

  const submitNumber = () => {
    if (!q || numberInput === '') return
    judge(checkAnswer(q.answer, { number: Number(numberInput) }))
  }

  const submitChoice = (displayIndex: number) => {
    if (!q || q.answer.kind !== 'choice' || !choiceUi) return
    const originalIndex = q.answer.options.indexOf(choiceUi.options[displayIndex])
    judge(checkAnswer(q.answer, { index: originalIndex }))
  }

  const submitOrder = () => {
    if (!q || !orderUi) return
    const order = orderPicked.map((i) => orderUi[i].originalIndex)
    judge(checkAnswer(q.answer, { order }))
  }

  // ========== 描画 ==========

  // ---- intro：キケンなモンスター接近 ----
  if (phase === 'intro') {
    return (
      <div
        className="flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden p-6"
        style={{ background: DANGER_BG }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
        >
          <motion.p
            className="text-5xl font-extrabold tracking-widest text-[#ff5e5e] sm:text-6xl"
            style={{ textShadow: '0 0 18px rgba(255,60,60,0.8)' }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
          >
            ～DANGER～
          </motion.p>
          <p className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            キケンな モンスターが
            <br />
            ちかづいてきた！
          </p>
        </motion.div>

        <motion.div
          className="flex w-full max-w-sm flex-col gap-4"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className="btn-kid w-full bg-[var(--color-danger)] text-3xl"
            onClick={startFight}
          >
            ⚔️ たたかう
          </button>
          <button
            className="btn-kid w-full bg-white/20 text-2xl text-white"
            onClick={flee}
          >
            🏃 にげる
          </button>
        </motion.div>
        <p className="text-center text-sm font-bold text-white/70">
          たたかうと むずかしい もんだいが 3もん！ ぜんもん せいかいで とくべつな ごほうび。
          <br />
          1もんでも まちがえると おわり。ヒントを よく よもう。
        </p>
      </div>
    )
  }

  // ---- fight：難問3問（ヒント常時表示・1問ミスで即終了） ----
  if (phase === 'fight' && q) {
    return (
      <div
        className="mx-auto flex min-h-dvh max-w-xl flex-col p-4"
        style={{ background: DANGER_BG }}
      >
        {/* ヘッダー：DANGER バッジ＋進捗 */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-[var(--color-danger)] px-4 py-1.5 text-base font-extrabold tracking-wider text-white">
            ⚔️ DANGER
          </span>
          <span className="text-lg font-extrabold text-white">
            {questions.length}もんちゅう {qIndex + 1}もんめ
          </span>
        </div>

        {/* 進捗ドット */}
        <div className="mb-3 flex items-center justify-center gap-2">
          {questions.map((qq, i) => (
            <span
              key={qq.id}
              className={`h-3.5 w-3.5 rounded-full ${
                i < qIndex ? 'bg-[#ff8f6b]' : i === qIndex ? 'bg-[var(--color-accent)]' : 'bg-white/25'
              }`}
            />
          ))}
        </div>

        <div className="card-kid flex-1 p-5">
          {q.figure && <FigureView figure={q.figure} />}
          <p className="mb-3 text-2xl">
            <Ruby text={q.text} />
          </p>

          {/* 例ヒント（最初から常時表示・答えそのものではない） */}
          <div className="mb-4 rounded-2xl border-4 border-[var(--color-accent)] bg-[var(--color-bg)] p-3">
            <p className="mb-1 text-sm font-extrabold text-[var(--color-ink-soft)]">💡 ヒント（れい）</p>
            <div className="flex flex-col gap-1.5">
              {q.explain.map((line, i) => (
                <p key={i} className="text-base text-[var(--color-ink)]">
                  <Ruby text={line} />
                </p>
              ))}
            </div>
          </div>

          {/* 解答入力 */}
          {q.answer.kind === 'number' && (
            <DangerNumberPad
              value={numberInput}
              unit={q.answer.unit}
              onInput={setNumberInput}
              onSubmit={submitNumber}
            />
          )}

          {q.answer.kind === 'choice' && choiceUi && (
            <div className="flex flex-col gap-3">
              {choiceUi.options.map((opt, i) => (
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

          {q.answer.kind === 'order' && orderUi && (
            <div className="flex flex-col gap-3">
              <p className="text-center text-base font-bold text-[var(--color-ink-soft)]">
                ただしい じゅんばんに ならべよう（タップで もどせるよ）
              </p>
              <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-4 border-dashed border-[var(--color-primary-light)] bg-[var(--color-bg)] p-3">
                {orderPicked.length === 0 && (
                  <span className="text-base text-[var(--color-ink-faint)]">ここに ならべてね</span>
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
                    <Ruby text={orderUi[tokenIdx].text} />
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {orderUi.map((t, i) =>
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
                disabled={orderPicked.length !== orderUi.length}
                onClick={submitOrder}
              >
                できた！
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ---- success：討伐成功（モンスター＋現金200円） ----
  if (phase === 'success') {
    return (
      <div
        className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-5 p-6"
        style={{ background: DANGER_BG }}
      >
        <motion.div
          className="card-kid flex w-full max-w-sm flex-col items-center gap-3 p-7"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        >
          <div className="text-5xl">🎉</div>
          <h1 className="text-center text-3xl font-extrabold text-[var(--color-accent-dark)]">
            とうばつ せいこう！
          </h1>

          {reward?.monster && (
            <motion.div
              className="relative"
              initial={{ scale: 0.3, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            >
              <MonsterSprite monsterId={reward.monster.id} size={150} />
              {reward.isNew && (
                <motion.span
                  className="absolute -top-2 -right-6 rounded-full bg-[var(--color-danger)] px-3 py-1 text-lg font-extrabold text-white"
                  animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                >
                  NEW!
                </motion.span>
              )}
            </motion.div>
          )}
          {reward?.monster && (
            <p className="text-2xl font-extrabold text-[var(--color-ink)]">{reward.monster.name}</p>
          )}
          <p className="text-center text-sm font-bold text-[var(--color-ink-soft)]">
            DANGERでしか であえない とくべつな モンスター！
          </p>

          <div className="mt-1 w-full rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-2)] p-3 text-center">
            <p className="text-2xl font-extrabold text-[var(--color-accent-dark)]">
              💰 げんきん {DANGER_YEN}円 ゲット！
            </p>
            <p className="text-sm font-bold text-[var(--color-ink-soft)]">
              おうちのひとから うけとってね
            </p>
          </div>

          <button
            className="btn-kid mt-2 w-full bg-[var(--color-secondary)]"
            onClick={() => {
              audio.playSe('tap')
              onDone()
            }}
          >
            やったー！
          </button>
        </motion.div>

        <Dialog
          open={saveWarn}
          title="ほぞんエラー"
          onClose={() => setSaveWarn(false)}
          actions={
            <button className="btn-kid bg-[var(--color-primary)]" onClick={() => setSaveWarn(false)}>
              OK
            </button>
          }
        >
          <p className="text-center text-base">
            データの保存に失敗しました（容量不足の可能性）。
            <br />
            この結果は端末に保存されていない可能性があります。
          </p>
        </Dialog>
      </div>
    )
  }

  // ---- fail：1問ミスで終了 ----
  return (
    <div
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6"
      style={{ background: DANGER_BG }}
    >
      <motion.div
        className="card-kid flex w-full max-w-sm flex-col items-center gap-4 p-8"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="text-5xl">💨</div>
        <h1 className="text-center text-3xl font-extrabold text-[var(--color-ink)]">
          にげられた…
        </h1>
        <p className="text-center text-base text-[var(--color-ink-soft)]">
          おしい！ また こんど ちょうせんしよう。
          <br />
          ヒントを よんで じっくり かんがえれば だいじょうぶ。
        </p>
        <button
          className="btn-kid w-full bg-[var(--color-primary)]"
          onClick={() => {
            audio.playSe('tap')
            onDone()
          }}
        >
          もどる
        </button>
      </motion.div>
    </div>
  )
}

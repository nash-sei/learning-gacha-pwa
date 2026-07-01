/*
 * DANGER討伐イベント（追加機能1-C）
 * - 通常クイズ→ガチャの後、低確率（DANGER_RATE）で App から呼ばれる。
 * - 流れ：intro（キケンなモンスター接近・たたかう/にげる）→ fight（難問3問）→ success / fail
 * - 難問は PACK_DANGER から selectQuestions で3問。各問の下に explain を「例ヒント」として最初から常時表示。
 * - 1問でも間違えたら即 fail（やり直しなし）。全問正解で success。
 * - success：pickDangerMonster で DANGER 限定を1体、awardDanger で付与＋現金200円を別枠記録（commit-then-animate）。
 * - 既存の出題エンジン（selectQuestions / checkAnswer / buildChoiceOptions / buildOrderTokens）を再利用。
 */
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import type { MonsterDef, Question } from '../../types'
import { DANGER_QUESTION_COUNT, DANGER_YEN } from '../../lib/constants'
import {
  buildChoiceOptions,
  buildOrderTokens,
  checkAnswer,
  materializeQuestion,
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
import HintDisclosure from '../../components/HintDisclosure'

export interface DangerEventProps {
  onDone: () => void
  /** テスト用：たたかわずに獲得演出（足音→ドン→出現）だけ見せる（保存しない・npm run dev 限定） */
  debugReveal?: boolean
}

type Phase = 'intro' | 'fight' | 'stomp' | 'success' | 'fail'

interface Reward {
  monster: MonsterDef | null
  isNew: boolean
}

/** 危険な雰囲気の背景（赤黒のラジアルグラデ） */
const DANGER_BG =
  'radial-gradient(120% 80% at 50% 30%, #7a1d1d, #3a0d10 62%, #160406)'

/** レンダー中でも使える決定的な擬似乱数 0..1（Gacha.tsx と同方式・見た目のバラつき用途） */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * 大きな鬼の足（影シルエット・足首つき・太い指4本＋大きなかぎ爪）。
 * 獣の肉球ではなく、縦長で重たい鬼の足に見せる。
 */
function MonsterFoot() {
  return (
    <svg
      viewBox="0 0 150 190"
      aria-hidden="true"
      style={{ width: 'min(86vw, 440px)', height: 'auto', display: 'block' }}
    >
      <g fill="#070202">
        {/* 太い足首・すね（鬼の重たい脚） */}
        <rect x="54" y="120" width="48" height="70" rx="22" />
        {/* 重たい足の甲（横広・がっしり） */}
        <path d="M78,44 C110,44 124,66 124,98 C124,136 110,168 78,172 C44,168 28,136 28,98 C28,66 48,44 78,44 Z" />
        {/* 親指（大きい）＋指3本（鬼らしく不揃い） */}
        <ellipse cx="30" cy="60" rx="18" ry="25" />
        <ellipse cx="60" cy="40" rx="13" ry="20" />
        <ellipse cx="87" cy="40" rx="13" ry="20" />
        <ellipse cx="112" cy="58" rx="12" ry="18" />
        {/* 巨大なかぎ爪 */}
        <path d="M14,30 l22,32 -36,3 z" />
        <path d="M52,14 l17,30 -32,2 z" />
        <path d="M79,14 l17,30 -32,2 z" />
        <path d="M106,32 l16,28 -30,2 z" />
      </g>
    </svg>
  )
}

interface Puff {
  id: number
  x: number
  dx: number
  size: number
  rise: number
  delay: number
  color: string
}

/** 足が着地するたびにモクモク立ちあがる土煙（影を重ねた雲の塊・横に広がる） */
function DustPuffs({ puffs }: { puffs: Puff[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 overflow-hidden">
      {puffs.map((p) => {
        const u = p.size
        // box-shadow で小さな玉をいくつもつなげ、1枚で「もくもくの塊」に見せる
        const cloud = `${u * 0.5}px ${u * 0.12}px 0 -${u * 0.1}px ${p.color}, -${u * 0.52}px ${u * 0.16}px 0 -${u * 0.08}px ${p.color}, ${u * 0.2}px -${u * 0.24}px 0 -${u * 0.18}px ${p.color}, -${u * 0.28}px -${u * 0.2}px 0 -${u * 0.16}px ${p.color}, ${u * 0.86}px ${u * 0.2}px 0 -${u * 0.18}px ${p.color}`
        return (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: 0,
              width: u,
              height: u * 0.66,
              background: p.color,
              boxShadow: cloud,
              filter: 'blur(5px)',
            }}
            initial={{ x: 0, y: 50, scaleX: 0.3, scaleY: 0.25, opacity: 0 }}
            animate={{
              x: p.dx,
              y: -p.rise,
              scaleX: [0.3, 1.5, 2.4],
              scaleY: [0.25, 1.0, 1.35],
              opacity: [0, 0.92, 0],
            }}
            transition={{ delay: p.delay, duration: 1.7, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

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

export default function DangerEvent({ onDone, debugReveal }: DangerEventProps) {
  const { save, updateSave, currentProfile } = useGame()
  const grade = currentProfile?.grade ?? 2

  // テスト時は intro/fight を飛ばして、いきなり獲得演出（stomp）から
  const [phase, setPhase] = useState<Phase>(debugReveal ? 'stomp' : 'intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [qIndex, setQIndex] = useState(0)

  // 解答UI（問題ごとに作り直す）
  const [choiceUi, setChoiceUi] = useState<{ options: string[]; correct: number } | null>(null)
  const [orderUi, setOrderUi] = useState<ShuffledToken[] | null>(null)
  const [orderPicked, setOrderPicked] = useState<number[]>([])
  const [numberInput, setNumberInput] = useState('')

  // テスト経路（debugReveal）は、最初のレンダー時点で報酬モンスターを確定させておく
  // （effect で後から setState すると success に進んでもモンスターが間に合わない事故を防ぐ）。
  const [reward, setReward] = useState<Reward | null>(() =>
    debugReveal && save ? { monster: pickDangerMonster(save), isNew: true } : null
  )
  const [saveWarn, setSaveWarn] = useState(false)
  // success 画面で、先にモンスター→おくれて「お小遣い」を出すためのフラグ
  const [moneyShown, setMoneyShown] = useState(false)
  // 接近演出：まず動画（public/danger/danger-intro.mp4）を再生。読めない端末ではCSS足音演出にフォールバック。
  const [useVideoStomp, setUseVideoStomp] = useState(true)
  // DANGER専用曲を動画の再生開始に合わせて一度だけ鳴らすためのフラグ
  const bgmStartedRef = useRef(false)

  // DANGER演出のあいだはホームのBGMを止めて、専用曲と効果音をしっかり聞かせる。
  // 画面がホームに戻ると Home 側が自動でBGMを鳴らし直す。
  useEffect(() => {
    audio.stopBgm()
  }, [])

  // 土煙：3回の足踏み（着地）に合わせてモクモク。後の踏みつけほど大きく多く。茶/灰/黒影の3色。
  const dustPuffs = useMemo<Puff[]>(() => {
    const stompSec = [0.5, 1.5, 2.05]
    const dustColors = [
      'rgba(150,128,102,0.9)',
      'rgba(120,110,100,0.85)',
      'rgba(74,60,50,0.82)',
    ]
    const out: Puff[] = []
    let id = 0
    stompSec.forEach((base, s) => {
      const n = 9 + s * 5 // 最後の踏みつけほど土煙を増やす
      for (let i = 0; i < n; i++) {
        id += 1
        out.push({
          id,
          x: 2 + pseudoRandom(id * 1.3 + s) * 92,
          dx: (pseudoRandom(id * 7.3 + s) - 0.5) * 90, // 横に大きく広がる
          size: 100 + pseudoRandom(id * 2.1 + s) * (130 + s * 90),
          rise: 70 + pseudoRandom(id * 3.7 + s) * (110 + s * 60),
          delay: base + pseudoRandom(id * 5.1) * 0.22,
          color: dustColors[id % dustColors.length],
        })
      }
    })
    return out
  }, [])

  const q: Question | null = phase === 'fight' ? (questions[qIndex] ?? null) : null

  // DANGER 出現音：intro が表示された時に一度だけ鳴らす（怖すぎない緊張音）
  useEffect(() => {
    if (phase === 'intro') {
      audio.unlock()
      audio.playSe('danger')
    }
  }, [phase])

  // stomp：DANGERモンスター接近の演出。
  // - 動画版：danger-intro.mp4 を全画面再生。音は専用曲（danger-bgm）を動画の onPlay に合わせて鳴らす。
  //   success へは動画の onEnded で進む（下のタイマーは終了イベントが来ない端末用の保険）。
  // - CSS版（フォールバック）：従来の「鬼の足が3歩近づく→ドン」演出（合成音・2.95秒で success へ）。
  useEffect(() => {
    if (phase !== 'stomp') return
    audio.unlock()
    bgmStartedRef.current = false
    const timers: number[] = []
    if (useVideoStomp) {
      // 保険：動画が再生されない/終了イベントが来ない端末でも先へ進む（動画は約6.1秒）
      timers.push(
        window.setTimeout(() => {
          audio.playSe('reveal-ur')
          setPhase('success')
        }, 7600)
      )
    } else {
      audio.playSe('danger') // 奥から近づく地響き（接近音）
      timers.push(window.setTimeout(() => audio.playSe('crack'), 500)) // 1歩目
      timers.push(window.setTimeout(() => audio.playSe('crack'), 1500)) // 2歩目
      timers.push(window.setTimeout(() => audio.playSe('danger'), 2050)) // ドン（巨大着地）
      timers.push(window.setTimeout(() => audio.playSe('crack'), 2080)) // 着地の打撃音を重ねる
      timers.push(
        window.setTimeout(() => {
          audio.playSe('reveal-ur')
          setPhase('success')
        }, 2950)
      )
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [phase, useVideoStomp])

  // success：まずモンスターが登場 → 少しおくれて「お小遣い」の場面を一緒に出す
  // （moneyShown は初期 false。タイマー内 setState なので同期的なレンダー連鎖は起きない）
  useEffect(() => {
    if (phase !== 'success') return
    const t = window.setTimeout(() => {
      audio.playSe('harvest')
      setMoneyShown(true)
    }, 1400)
    return () => window.clearTimeout(t)
  }, [phase])

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
    }).map((question) => materializeQuestion(question))
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

  // 討伐成功：報酬を確定（commit-then-animate）。確定後に足音演出（stomp）→モンスター出現。
  const succeed = () => {
    if (!save) {
      audio.playSe('reveal-ur')
      setReward({ monster: null, isNew: false })
      setPhase('success')
      return
    }
    const monster = pickDangerMonster(save)
    const { nextSave, isNew } = awardDanger(save, monster)
    const res = updateSave(() => nextSave)
    if (!res.ok) setSaveWarn(true)
    setReward({ monster, isNew })
    setPhase('stomp') // 接近音は stomp の effect 側で鳴らす
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

          {/* ヒント（タップで開く1行・答えそのものではない） */}
          <div className="mb-4">
            <HintDisclosure line={q.explain[0] ?? ''} />
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

  // ---- stomp：DANGERモンスター接近（動画／無い端末ではCSSの鬼の足にフォールバック） ----
  if (phase === 'stomp') {
    if (useVideoStomp) {
      return (
        <div
          className="relative mx-auto flex min-h-dvh max-w-xl items-center justify-center overflow-hidden"
          style={{ background: '#000' }}
        >
          <video
            src={`${import.meta.env.BASE_URL}danger/danger-intro.mp4`}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            onPlay={() => {
              // 動画はミュート再生。動画の再生開始に合わせて専用曲を1回だけ鳴らす（オフラインでも端末に保存済み）。
              if (!bgmStartedRef.current) {
                bgmStartedRef.current = true
                audio.playSe('danger-bgm')
              }
            }}
            onEnded={() => {
              audio.playSe('reveal-ur')
              setPhase('success')
            }}
            onError={() => setUseVideoStomp(false)}
          />
        </div>
      )
    }
    return (
      <div
        className="relative mx-auto flex min-h-dvh max-w-xl items-center justify-center overflow-hidden p-4"
        style={{ background: DANGER_BG }}
      >
        {/* ドクドク脈打つ赤い背景 */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(190,20,20,0.5), transparent 60%)',
          }}
          animate={{ opacity: [0.3, 0.78, 0.3] }}
          transition={{ repeat: Infinity, duration: 0.55 }}
        />

        {/* 地響き：着地ごとに揺れが強くなる（最後の踏みつけが最大） */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, -7, 7, 0, -12, 12, 0, -28, 24, 0],
            y: [0, 4, 0, 0, 7, 0, 0, 16, 7, 0],
          }}
          transition={{
            duration: 2.4,
            times: [0, 0.2, 0.24, 0.34, 0.62, 0.66, 0.74, 0.9, 0.94, 1],
            ease: 'easeOut',
          }}
        >
          {/* 奥から前へ、巨大になって歩いてくる鬼の足の影 */}
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: [0.4, 0.52, 0.72, 0.8, 1.2, 1.35, 2.5],
                opacity: [0, 1, 1, 1, 1, 1, 1],
                y: [-16, 0, 18, 0, 18, 0, 34],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.1, 0.22, 0.38, 0.55, 0.72, 0.95],
                ease: 'easeInOut',
              }}
              style={{ filter: 'drop-shadow(0 0 40px rgba(255,45,45,0.75))' }}
            >
              <MonsterFoot />
            </motion.div>
          </div>

          {/* 土煙 */}
          <DustPuffs puffs={dustPuffs} />

          {/* 地を這う土煙の帯（最後の踏みつけで横に広がる） */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 origin-bottom"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(120,100,80,0.9), transparent 72%)',
              filter: 'blur(8px)',
            }}
            initial={{ scaleX: 0.2, opacity: 0 }}
            animate={{ scaleX: [0.2, 0.2, 1.5, 1.8], opacity: [0, 0, 0.95, 0] }}
            transition={{ duration: 2.4, times: [0, 0.78, 0.9, 1], ease: 'easeOut' }}
          />

          {/* 集中線（着地の瞬間に内側へ集まる） */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'repeating-conic-gradient(rgba(255,255,255,0) 0deg, rgba(255,255,255,0.55) 1.6deg, rgba(255,255,255,0) 5deg)',
              maskImage: 'radial-gradient(circle, transparent 18%, #000 56%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 18%, #000 56%)',
            }}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: [0, 0, 0.8, 0], scale: [1.25, 1.25, 1, 1] }}
            transition={{ duration: 2.4, times: [0, 0.8, 0.86, 0.96], ease: 'easeOut' }}
          />

          {/* 白い閃光（着地のインパクト） */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0, 0] }}
            transition={{ duration: 2.4, times: [0, 0.81, 0.85, 0.92, 1], ease: 'easeOut' }}
          />

          {/* 赤い衝撃光 */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 46%, rgba(255,45,45,0.7), transparent 60%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9, 0] }}
            transition={{ duration: 2.4, times: [0, 0.8, 0.88, 1], ease: 'easeOut' }}
          />

          {/* 白い衝撃の輪 */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="rounded-full border-[6px] border-white/80"
              style={{ width: 90, height: 90 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0, 4, 6.5], opacity: [0, 0, 0.9, 0] }}
              transition={{ duration: 2.4, times: [0, 0.8, 0.88, 0.97], ease: 'easeOut' }}
            />
          </div>

          {/* ドン！！（特大・白＋赤の二重・スラム着地） */}
          <div className="absolute inset-x-0 top-[20%] z-10 flex justify-center">
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.9, 0.88, 1.12, 1],
                opacity: [0, 1, 1, 1, 1],
                rotate: [-9, 5, -2, 1, 0],
              }}
              transition={{ delay: 1.95, duration: 0.7, ease: 'backOut' }}
            >
              {/* 赤い影ドン（うしろ・ずらす） */}
              <span
                className="absolute left-0 top-0 font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'min(46vw, 15rem)',
                  color: '#c8120f',
                  transform: 'translate(10px, 12px)',
                  WebkitTextStroke: '2px #2a0000',
                }}
                aria-hidden="true"
              >
                ドン！！
              </span>
              {/* 白いドン（まえ） */}
              <span
                className="relative font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'min(46vw, 15rem)',
                  color: '#fff',
                  WebkitTextStroke: '6px #1a0406',
                  textShadow: '0 0 55px rgba(255,40,40,0.95), 0 0 14px #fff',
                }}
              >
                ドン！！
              </span>
            </motion.div>
          </div>
        </motion.div>
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
          {/* 万一モンスター情報が無くても画面が空にならないようにする */}
          {!reward?.monster && <div className="text-6xl">🎁</div>}
          <p className="text-center text-sm font-bold text-[var(--color-ink-soft)]">
            DANGERでしか であえない とくべつな モンスター！
          </p>

          {/* お小遣いは、モンスター登場のあとから出す（一緒の画面に表示） */}
          {moneyShown && (
            <motion.div
              className="flex w-full flex-col items-center gap-3"
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <div className="w-full rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-2)] p-3 text-center">
                <p className="text-2xl font-extrabold text-[var(--color-accent-dark)]">
                  💰 げんきん {DANGER_YEN}円 ゲット！
                </p>
                <p className="text-sm font-bold text-[var(--color-ink-soft)]">
                  おうちのひとから うけとってね
                </p>
              </div>

              <button
                className="btn-kid w-full bg-[var(--color-secondary)]"
                onClick={() => {
                  audio.playSe('tap')
                  onDone()
                }}
              >
                やったー！
              </button>
            </motion.div>
          )}
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

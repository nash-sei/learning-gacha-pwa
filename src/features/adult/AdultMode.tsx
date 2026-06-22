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
import type { AdultData, Question, Rarity } from '../../types'
import { shuffle, buildChoiceOptions, checkAnswer } from '../../lib/questionEngine'
import { audio } from '../../lib/audio'
import { storage } from '../../lib/storage'
import { rollAdultMonster } from '../../lib/adultRoulette'
import AdultRoulette, { type RouletteSegment } from './AdultRoulette'
import AdultZukan from './AdultZukan'
import { PACK_ADULT } from '../../data/packs/pack-adult'
import { PACK_ADULT2 } from '../../data/packs/pack-adult2'

/** 大人モードの出題プール（既存200問＋追加240問＝計440問） */
const ADULT_POOL: Question[] = [...PACK_ADULT, ...PACK_ADULT2]
/** 現在プールに存在する問題ID（既出メモの掃除に使う） */
const POOL_IDS = new Set(ADULT_POOL.map((q) => q.id))

export interface AdultModeProps {
  onDone: () => void
}

/** 1回あたりの出題数 */
const QUESTION_COUNT = 10
/** 1ゲームで使えるヒントの上限 */
const MAX_HINTS = 3
/** 大人向けの落ち着いた背景（子供用の明るい庭と区別） */
const ADULT_BG = 'linear-gradient(to bottom, #24344d, #141d2e)'

/** 初級ルーレットの枠（モンスター4＋はずれ4・各1/8）。当たりの中身は AdultMode が処理する */
const BEGINNER_SEGMENTS: RouletteSegment[] = [
  { label: 'モンスター', weight: 1, color: '#34d399', kind: 'monster' },
  { label: 'はずれ', weight: 1, color: '#64748b', kind: 'miss' },
  { label: 'モンスター', weight: 1, color: '#60a5fa', kind: 'monster' },
  { label: 'はずれ', weight: 1, color: '#475569', kind: 'miss' },
  { label: 'モンスター', weight: 1, color: '#a78bfa', kind: 'monster' },
  { label: 'はずれ', weight: 1, color: '#64748b', kind: 'miss' },
  { label: 'モンスター', weight: 1, color: '#f472b6', kind: 'monster' },
  { label: 'はずれ', weight: 1, color: '#475569', kind: 'miss' },
]

/**
 * 上級ルーレットの枠（10問 全問正解＝満点1回ごと）。
 * 配分：200円77%・500円15%・1000円5%・はずれ3%（roulette-demo.html の決定どおり）。
 * 1000円・500円は向かい合わせの2か所に分散。
 */
const ADVANCED_SEGMENTS: RouletteSegment[] = [
  { label: '200円', weight: 19.25, color: '#34d399', kind: 'yen', yen: 200 },
  { label: '1000円', weight: 2.5, color: '#fbbf24', kind: 'yen', yen: 1000 },
  { label: '500円', weight: 7.5, color: '#60a5fa', kind: 'yen', yen: 500 },
  { label: '200円', weight: 19.25, color: '#34d399', kind: 'yen', yen: 200 },
  { label: 'はずれ', weight: 3, color: '#64748b', kind: 'miss' },
  { label: '200円', weight: 19.25, color: '#34d399', kind: 'yen', yen: 200 },
  { label: '1000円', weight: 2.5, color: '#fbbf24', kind: 'yen', yen: 1000 },
  { label: '500円', weight: 7.5, color: '#60a5fa', kind: 'yen', yen: 500 },
  { label: '200円', weight: 19.25, color: '#34d399', kind: 'yen', yen: 200 },
]

/**
 * プレミアムルーレットの枠（満点を3回連続＝その回かぎり・回したら連続カウントは0に戻る）。
 * 配分：1000円72%・2000円25%・5000円3%・はずれ無し（roulette-demo.html の決定どおり）。
 * 5000円・2000円は向かい合わせの2か所に分散。
 */
const PREMIUM_SEGMENTS: RouletteSegment[] = [
  { label: '1000円', weight: 36, color: '#fbbf24', kind: 'yen', yen: 1000 },
  { label: '5000円', weight: 1.5, color: '#ef4444', kind: 'yen', yen: 5000 },
  { label: '2000円', weight: 12.5, color: '#fb923c', kind: 'yen', yen: 2000 },
  { label: '1000円', weight: 36, color: '#fbbf24', kind: 'yen', yen: 1000 },
  { label: '5000円', weight: 1.5, color: '#ef4444', kind: 'yen', yen: 5000 },
  { label: '2000円', weight: 12.5, color: '#fb923c', kind: 'yen', yen: 2000 },
]

/** どのルーレットを回すか（7〜9問＝初級／満点1回＝上級／満点3連続＝プレミアム） */
type RouletteLevel = 'beginner' | 'advanced' | 'premium'

/** ルーレットの結果（モンスター当選／お金当選／はずれ）。result前は null */
type RouletteOutcome =
  | { kind: 'monster'; monsterId: string; name: string; rarity: Rarity; isNew: boolean }
  | { kind: 'yen'; yen: number }
  | { kind: 'miss' }
  | null

const RARITY_BADGE_COLOR: Record<Rarity, string> = {
  N: '#64748b',
  R: '#3b82f6',
  SR: '#a855f7',
  UR: 'linear-gradient(90deg,#f59e0b,#ef4444,#a855f7)',
}
const RARITY_TEXT: Record<Rarity, string> = {
  N: 'ノーマル',
  R: 'レア',
  SR: 'スーパーレア',
  UR: 'ウルトラレア',
}

const ADULT_RESULT_MESSAGES = [
  'ドンマイ！ここからスタート！つぎはいけるよ！', // 0
  'ナイスチャレンジ！まずは1もんせいかい！', // 1
  'いいぞ！すこしずつ前進してる！', // 2
  'その調子！コツコツいこう！', // 3
  'あと一歩！どんどん良くなってる！', // 4
  'いい感じ！はんぶんクリア！ここから巻き返そう！', // 5
  'すごい！はんぶん以上せいかい！のってきた！', // 6
  'いいぞいいぞ！あと少しで満点だ！', // 7
  'お見事！ほぼ完璧！その調子！', // 8
  'おしい！あと1問で満点！もう天才クラス！', // 9
  'よくできました！天才！パーフェクト！', // 10
]

/** 既出問題ID（localStorageに保存）。全問題を出し切るまで同じ問題を繰り返さない。 */
const SEEN_KEY = 'gakumon-adult-seen-v1'
function loadSeen(): Set<string> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]')
    const ids = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : []
    // いまプールにある問題IDだけ残す（削除済みIDや壊れた値を掃除する）
    return new Set(ids.filter((id) => POOL_IDS.has(id)))
  } catch {
    return new Set<string>()
  }
}
function saveSeen(seen: Set<string>): void {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]))
  } catch {
    /* localStorageが使えない環境では記憶しない */
  }
}

/** 同じジャンル(pack)が連続しないように並べ替える（出題傾向を読まれにくくする）。 */
function spreadByGenre(items: Question[]): Question[] {
  const groups = new Map<string, Question[]>()
  for (const q of items) {
    const key = q.pack ?? q.subject
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(q)
  }
  const result: Question[] = []
  let prev: string | null = null
  while (result.length < items.length) {
    // 直前と違うジャンルのうち、残数が最も多いグループから1問出す
    let best: [string, Question[]] | null = null
    for (const entry of groups) {
      if (entry[1].length === 0 || entry[0] === prev) continue
      if (!best || entry[1].length > best[1].length) best = entry
    }
    // 直前と違うジャンルが残っていなければ、残っているものから出す
    if (!best) {
      for (const entry of groups) {
        if (entry[1].length > 0) {
          best = entry
          break
        }
      }
    }
    if (!best) break
    result.push(best[1].shift()!)
    prev = best[0]
  }
  return result
}

function pickQuestions(): Question[] {
  let seen = loadSeen()
  // まだ出していない問題だけを対象にシャッフル
  const available = shuffle(ADULT_POOL.filter((q) => !seen.has(q.id)))
  let picked = available.slice(0, QUESTION_COUNT)
  if (picked.length < QUESTION_COUNT) {
    // 全問題を出し切った → 周回をリセット。直前に出した分は避けて補充する
    const usedIds = new Set(picked.map((q) => q.id))
    const refill = shuffle(ADULT_POOL.filter((q) => !usedIds.has(q.id))).slice(
      0,
      QUESTION_COUNT - picked.length
    )
    picked = [...picked, ...refill]
    seen = new Set(picked.map((q) => q.id))
  } else {
    picked.forEach((q) => seen.add(q.id))
  }
  saveSeen(seen)
  return spreadByGenre(picked)
}

export default function AdultMode({ onDone }: AdultModeProps) {
  const [questions, setQuestions] = useState<Question[]>(pickQuestions)
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState<{ displayIndex: number; correct: boolean } | null>(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'quiz' | 'roulette' | 'result' | 'zukan'>('quiz')
  // ヒント：使った合計回数（ゲーム単位）と、今の問題で見せたヒントが「何回目」か
  const [hintsUsed, setHintsUsed] = useState(0)
  const [revealedOrdinal, setRevealedOrdinal] = useState<number | null>(null)
  // 大人専用データ（ずかん等・子供のセーブとは独立・lg2_adult）
  const [adultData, setAdultData] = useState<AdultData>(() => storage.getAdultData())
  // ルーレットの結果（result画面で表示）
  const [outcome, setOutcome] = useState<RouletteOutcome>(null)
  // どのルーレットを回すか（初級／上級／プレミアム）
  const [rouletteLevel, setRouletteLevel] = useState<RouletteLevel>('beginner')

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
    setOutcome(null)
    setRouletteLevel('beginner')
    setPhase('quiz')
  }

  /**
   * ルーレットが止まったとき：当たり枠に応じて保存する。
   * - モンスター枠 → 大人ずかんに追加（初級）
   * - お金枠 → ごほうび合計に加算（上級・プレミアム）
   * - はずれ → 記録だけ
   * プレミアムを回したら、連続満点カウント(perfectStreak)は0に戻す（その回かぎりの特別ルーレット）。
   */
  const handleRouletteFinish = (seg: RouletteSegment) => {
    const nextStreak = rouletteLevel === 'premium' ? 0 : adultData.perfectStreak
    if (seg.kind === 'monster') {
      const res = rollAdultMonster(adultData.zukan)
      const nextZukan = res.isNew ? [...adultData.zukan, res.monster.id] : adultData.zukan
      const nextData = { ...adultData, zukan: nextZukan, perfectStreak: nextStreak }
      setAdultData(nextData)
      storage.saveAdultData(nextData)
      setOutcome({
        kind: 'monster',
        monsterId: res.monster.id,
        name: res.monster.name,
        rarity: res.rarity,
        isNew: res.isNew,
      })
    } else if (seg.kind === 'yen') {
      const yen = seg.yen ?? 0
      const nextData = {
        ...adultData,
        rewardTotal: adultData.rewardTotal + yen,
        perfectStreak: nextStreak,
      }
      setAdultData(nextData)
      storage.saveAdultData(nextData)
      setOutcome({ kind: 'yen', yen })
    } else {
      if (nextStreak !== adultData.perfectStreak) {
        const nextData = { ...adultData, perfectStreak: nextStreak }
        setAdultData(nextData)
        storage.saveAdultData(nextData)
      }
      setOutcome({ kind: 'miss' })
    }
    setPhase('result')
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
      return
    }
    // 最終問題のあと：スコアでルーレットを出し分ける
    if (score === questions.length) {
      // 満点。連続満点が3に達したらプレミアム、それ以外は上級。
      const streakIfPerfect = adultData.perfectStreak + 1
      if (streakIfPerfect >= 3) {
        // プレミアム（回したら handleRouletteFinish で perfectStreak を0に戻す）
        setRouletteLevel('premium')
      } else {
        // 上級。連続満点カウントを1つ進めて保存
        const nextData = { ...adultData, perfectStreak: streakIfPerfect }
        setAdultData(nextData)
        storage.saveAdultData(nextData)
        setRouletteLevel('advanced')
      }
      setPhase('roulette')
    } else if (score >= 7) {
      // 7〜9問正解 → 初級ルーレット。満点を逃したので連続満点カウントは0に戻す
      if (adultData.perfectStreak !== 0) {
        const nextData = { ...adultData, perfectStreak: 0 }
        setAdultData(nextData)
        storage.saveAdultData(nextData)
      }
      setRouletteLevel('beginner')
      setPhase('roulette')
    } else {
      // 6問以下 → 結果のみ。満点を逃したので連続満点カウントは0に戻す
      if (adultData.perfectStreak !== 0) {
        const nextData = { ...adultData, perfectStreak: 0 }
        setAdultData(nextData)
        storage.saveAdultData(nextData)
      }
      setPhase('result')
    }
  }

  // ===== ルーレット（初級＝7〜9問／上級＝満点1回／プレミアム＝満点3連続） =====
  if (phase === 'roulette') {
    const wheel =
      rouletteLevel === 'premium'
        ? {
            title: '👑 プレミアムルーレット',
            cond: 'ぜんもん せいかい 3回れんぞく！ おめでとう！',
            segments: PREMIUM_SEGMENTS,
          }
        : rouletteLevel === 'advanced'
          ? {
              title: '🏆 上級ルーレット',
              cond: `${score} / ${questions.length} ぜんもん せいかい！`,
              segments: ADVANCED_SEGMENTS,
            }
          : {
              title: '🎡 初級ルーレット',
              cond: `${score} / ${questions.length} せいかい！`,
              segments: BEGINNER_SEGMENTS,
            }
    return (
      <AdultRoulette
        title={wheel.title}
        cond={wheel.cond}
        segments={wheel.segments}
        onFinish={handleRouletteFinish}
      />
    )
  }

  // ===== 大人ずかん =====
  if (phase === 'zukan') {
    return <AdultZukan zukan={adultData.zukan} onBack={() => setPhase('result')} />
  }

  // ===== けっか =====
  if (phase === 'result') {
    const msg =
      ADULT_RESULT_MESSAGES[score] ?? ADULT_RESULT_MESSAGES[ADULT_RESULT_MESSAGES.length - 1]
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

          {/* 初級ルーレットの結果（モンスター当選） */}
          {outcome?.kind === 'monster' && (
            <motion.div
              className="w-full rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-2)] p-4 text-center"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
            >
              <img
                src={`/monsters/${outcome.monsterId}.webp`}
                alt={outcome.name}
                className="mx-auto h-24 w-24 object-contain"
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden'
                }}
              />
              <p className="mt-1 text-xl font-extrabold text-[var(--color-ink)]">
                🎁 {outcome.name} を ゲット！
              </p>
              <span
                className="mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-extrabold text-white"
                style={{ background: RARITY_BADGE_COLOR[outcome.rarity] }}
              >
                {RARITY_TEXT[outcome.rarity]}
              </span>
              <p className="mt-1 text-sm font-bold text-[var(--color-ink-soft)]">
                {outcome.isNew
                  ? '大人ずかんに とうろく！'
                  : 'すでに もっている モンスター（ずかんはそのまま）'}
              </p>
            </motion.div>
          )}

          {/* 初級ルーレットの結果（はずれ） */}
          {outcome?.kind === 'miss' && (
            <motion.div
              className="w-full rounded-2xl border-2 border-[var(--color-bg-2)] bg-[var(--color-bg-2)] p-4 text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xl font-extrabold text-[var(--color-ink-soft)]">ざんねん… はずれ 😢</p>
              <p className="text-sm font-bold text-[var(--color-ink-faint)]">つぎは モンスターが でるかも！</p>
            </motion.div>
          )}

          {/* ルーレットの結果（お金 当選・上級／プレミアム） */}
          {outcome?.kind === 'yen' && (
            <motion.div
              className="w-full rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-2)] p-4 text-center"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
            >
              <p className="text-3xl font-extrabold text-[var(--color-accent-dark)]">
                💰 {outcome.yen}円 ゲット！
              </p>
              <p className="text-sm font-bold text-[var(--color-ink-soft)]">
                ぜんもん せいかい！ おうちのひとから うけとってね
              </p>
              <p className="mt-1 text-xs font-bold text-[var(--color-ink-faint)]">
                これまでの おこづかい合計：{adultData.rewardTotal}円
              </p>
            </motion.div>
          )}

          <button
            className="btn-kid w-full bg-[var(--color-accent)]"
            onClick={() => {
              audio.playSe('tap')
              setPhase('zukan')
            }}
          >
            📖 大人ずかんを みる（{adultData.zukan.length}）
          </button>
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
              {qIndex + 1 < questions.length
                ? 'つぎへ →'
                : score >= 7
                  ? '🎡 ルーレットへ！'
                  : 'けっかを みる'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

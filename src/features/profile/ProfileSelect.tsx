/*
 * プロフィール選択「だれが あそぶ？」（spec §4-1 / §9-1 / §9-2）
 * - プロフィールのアイコン一覧 → タップで selectProfile（App がホームへ）
 * - 「あたらしく つくる」: 名前・学年(2/3)・アイコン（絵文字プリセット・外部画像なし）
 * - 移行ウィザード: hasV1Data のとき「まえの データは だれの？」を出し、
 *   createProfile({ migrateV1: true }) で引き継ぐ（GameContext が settings/customQuestions も読み直す）。
 *   引き継ぎ後は移行レポートを子供にも分かる言葉で Dialog 表示。
 * - 最大2人想定だが、3人以上でもグリッドが折り返すだけで壊れない（spec §9-1）
 * - アイコンは「絵文字そのものを iconId に保存」する方式（描画は iconId をそのまま表示。
 *   将来 SVG アセット化する場合は iconId → 画像のマップに差し替える）
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Grade, Profile } from '../../types'
import { useGame } from '../../contexts/GameContext'
import { detectV1Data } from '../../lib/migration'
import { storage } from '../../lib/storage'
import { audio } from '../../lib/audio'
import Dialog from '../../components/Dialog'

/** アイコンのプリセット（絵文字＝iconId としてそのまま保存・外部画像禁止） */
const ICON_PRESETS = ['🦊', '🐰', '🐱', '🐶', '🐼', '🐧', '🦖', '⭐'] as const

/** iconId（絵文字）を表示用に整える（空なら既定の顔） */
function profileIcon(iconId: string): string {
  return iconId !== '' ? iconId : '🙂'
}

interface MigrationView {
  ok: boolean
  childName: string
  coins: number
  treeCoins: number
  harvested: number
  clearCounts: number
  customQuestions: number
}

export default function ProfileSelect() {
  const { profiles, hasV1Data, selectProfile, createProfile, lastSaveError } = useGame()

  const [view, setView] = useState<'list' | 'create'>(profiles.length === 0 ? 'create' : 'list')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState<Grade>(2)
  const [isAdult, setIsAdult] = useState(false)
  const [iconId, setIconId] = useState<string>(ICON_PRESETS[0])
  const [migrateChoice, setMigrateChoice] = useState<boolean>(profiles.length === 0)
  const [formError, setFormError] = useState<string | null>(null)
  /** 移行レポート（Dialog を閉じたら selectProfile で入場） */
  const [report, setReport] = useState<{ data: MigrationView; profileId: string } | null>(null)

  const handlePick = (p: Profile) => {
    audio.playSe('tap')
    selectProfile(p.id)
  }

  const handleCreate = () => {
    const trimmed = name.trim()
    if (trimmed === '') {
      setFormError('なまえを いれてね')
      return
    }
    if (trimmed.length > 10) {
      setFormError('なまえは 10もじまでだよ')
      return
    }
    setFormError(null)
    audio.playSe('tap')

    const wantMigrate = hasV1Data && migrateChoice
    const profile = createProfile({
      name: trimmed,
      grade,
      iconId,
      isAdult,
      migrateV1: wantMigrate,
    })

    if (wantMigrate) {
      // 移行結果を読み出してレポート化（成功なら旧キーは lg1_backup_* に改名済み＝detectV1Data()=false）
      const ok = !detectV1Data()
      const save = storage.getSave(profile.id)
      const data: MigrationView = {
        ok,
        childName: trimmed,
        coins: save?.coins ?? 0,
        treeCoins: save?.treeCoins ?? 0,
        harvested: save?.monthly.harvested ?? 0,
        clearCounts: save ? Object.keys(save.questionClearCounts).length : 0,
        customQuestions: storage.getCustomQuestions().length,
      }
      setReport({ data, profileId: profile.id })
      return
    }

    selectProfile(profile.id)
  }

  const closeReport = () => {
    if (!report) return
    const pid = report.profileId
    setReport(null)
    selectProfile(pid)
  }

  // ---------- 移行レポート Dialog ----------
  const reportDialog = (
    <Dialog
      open={report !== null}
      title={report?.data.ok ? 'ひきつぎ かんりょう！' : 'ひきつぎが できなかったかも'}
      actions={
        <button className="btn-kid bg-[var(--color-primary)]" onClick={closeReport}>
          はじめる！
        </button>
      }
    >
      {report && report.data.ok && (
        <div className="space-y-2 text-center">
          <p className="font-bold">
            {report.data.childName}の まえの データが もどってきたよ！
          </p>
          <ul className="mx-auto inline-block space-y-1 text-left">
            <li>🪙 コイン：{report.data.coins} まい</li>
            <li>🌳 きの うえの コイン：{report.data.treeCoins} まい</li>
            <li>💰 こんげつの おこづかい：{report.data.harvested}</li>
            <li>✏️ がんばった もんだいの きろく：{report.data.clearCounts} もん</li>
            <li>📦 ついかの もんだい：{report.data.customQuestions} もん</li>
          </ul>
        </div>
      )}
      {report && !report.data.ok && (
        <p className="text-center">
          まえの データの ひきつぎが うまく いかなかったかも。
          まえの データは きえていないよ。おうちのひとに みせてね。
          {lastSaveError != null && (
            <span className="mt-2 block text-sm text-[var(--color-ink-soft)]">({lastSaveError})</span>
          )}
        </p>
      )}
    </Dialog>
  )

  // ---------- 一覧 ----------
  if (view === 'list') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-8 p-6">
        <motion.h1
          className="text-4xl font-extrabold text-[var(--color-primary-dark)]"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          だれが あそぶ？
        </motion.h1>

        <div className="flex flex-wrap items-stretch justify-center gap-6">
          {profiles.map((p, i) => (
            <motion.button
              key={p.id}
              className="card-kid flex w-40 flex-col items-center gap-2 border-4 border-transparent p-6 transition-colors active:border-[var(--color-primary-light)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePick(p)}
            >
              <span className="text-6xl">{profileIcon(p.iconId)}</span>
              <span className="text-2xl font-extrabold text-[var(--color-ink)]">{p.name}</span>
              <span className="text-sm font-bold text-[var(--color-ink-soft)]">
                {p.isAdult ? '🎓 大人' : `${p.grade}ねんせい`}
              </span>
            </motion.button>
          ))}
        </div>

        {hasV1Data && (
          <p className="card-kid max-w-md p-4 text-center text-base font-bold text-[var(--color-ink-soft)]">
            🔎 まえの データが みつかったよ！
            <br />
            「あたらしく つくる」で ひきつげるよ
          </p>
        )}

        <button
          className="btn-kid bg-[var(--color-secondary)]"
          onClick={() => {
            audio.playSe('tap')
            setMigrateChoice(hasV1Data && profiles.length === 0)
            setView('create')
          }}
        >
          ＋ あたらしく つくる
        </button>
        {reportDialog}
      </div>
    )
  }

  // ---------- 新規作成（＋移行ウィザード） ----------
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)]">
        あたらしい おともだち
      </h1>

      <div className="card-kid w-full space-y-6 p-6">
        {/* なまえ */}
        <label className="block">
          <span className="mb-2 block text-xl font-extrabold">なまえ</span>
          <input
            type="text"
            value={name}
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
            placeholder="なまえを いれてね"
            className="w-full rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-bg)] p-4 text-center text-2xl font-extrabold outline-none focus:border-[var(--color-primary-light)]"
          />
        </label>

        {/* がくねん／大人 */}
        <div>
          <span className="mb-2 block text-xl font-extrabold">なんねんせい？</span>
          <div className="grid grid-cols-2 gap-3">
            {([2, 3, 4] as Grade[]).map((g) => (
              <button
                key={g}
                className={`btn-kid ${
                  !isAdult && grade === g
                    ? 'bg-[var(--color-primary)]'
                    : 'bg-[var(--color-ink-faint)] opacity-80'
                }`}
                onClick={() => {
                  audio.playSe('tap')
                  setGrade(g)
                  setIsAdult(false)
                }}
              >
                {g}ねんせい
              </button>
            ))}
            <button
              className={`btn-kid ${
                isAdult ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-ink-faint)] opacity-80'
              }`}
              onClick={() => {
                audio.playSe('tap')
                setIsAdult(true)
              }}
            >
              🎓 大人
            </button>
          </div>
          {isAdult && (
            <p className="mt-2 text-sm font-bold text-[var(--color-ink-soft)]">
              🎓 大人モードでは「おとなのクイズ」（一般教養・雑学・常識）で あそびます
            </p>
          )}
        </div>

        {/* アイコン */}
        <div>
          <span className="mb-2 block text-xl font-extrabold">すきな アイコン</span>
          <div className="grid grid-cols-4 gap-3">
            {ICON_PRESETS.map((emoji) => (
              <button
                key={emoji}
                aria-label={`アイコン ${emoji}`}
                className={`rounded-2xl border-4 p-3 text-4xl transition-transform active:scale-95 ${
                  iconId === emoji
                    ? 'border-[var(--color-primary)] bg-[var(--color-bg-2)]'
                    : 'border-transparent bg-[var(--color-bg)]'
                }`}
                onClick={() => {
                  audio.playSe('tap')
                  setIconId(emoji)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 移行ウィザード（spec §9-2・hasV1Data のときだけ。移行が済むと自動で消える） */}
        {hasV1Data && (
          <div className="rounded-2xl bg-[var(--color-bg-2)] p-4">
            <p className="mb-3 text-xl font-extrabold">まえの データは だれの？</p>
            <p className="mb-3 text-base text-[var(--color-ink-soft)]">
              まえの アプリの コインや おこづかいが のこっているよ。この子の データに ひきつぐ？
            </p>
            <div className="flex gap-3">
              <button
                className={`btn-kid flex-1 text-xl ${
                  migrateChoice ? 'bg-[var(--color-success)]' : 'bg-[var(--color-ink-faint)] opacity-80'
                }`}
                onClick={() => {
                  audio.playSe('tap')
                  setMigrateChoice(true)
                }}
              >
                この子に ひきつぐ
              </button>
              <button
                className={`btn-kid flex-1 text-xl ${
                  !migrateChoice ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-ink-faint)] opacity-80'
                }`}
                onClick={() => {
                  audio.playSe('tap')
                  setMigrateChoice(false)
                }}
              >
                ひきつがない
              </button>
            </div>
          </div>
        )}

        {formError != null && (
          <p className="text-center text-lg font-extrabold text-[var(--color-danger)]">{formError}</p>
        )}

        <div className="flex gap-3">
          {profiles.length > 0 && (
            <button
              className="btn-kid flex-1 bg-[var(--color-ink-faint)]"
              onClick={() => {
                audio.playSe('tap')
                setFormError(null)
                setView('list')
              }}
            >
              もどる
            </button>
          )}
          <button className="btn-kid flex-1 bg-[var(--color-primary)]" onClick={handleCreate}>
            つくる！
          </button>
        </div>
      </div>
      {reportDialog}
    </div>
  )
}

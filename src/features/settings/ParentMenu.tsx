/*
 * 親メニュー（spec §10・パスコード式）
 * - 入口は settings.parentPasscode の入力ゲート（0000→変更強制は ForcePasscodeChange 画面が担う）
 * - 子別設定（1日ガチャ上限/月の目標コイン/報酬コイン）／学年は表示のみ（プロフィール編集は将来対応）
 * - コイン手動補正：currentProfile（今遊んでいる子）のみ対象。複数子の一括補正は将来対応
 * - 問題のCSV追加（papaparse → v2 Question 変換 → lg2_custom_questions）
 * - カスタムシール登録：最大512pxにcanvas縮小 → WebP（非対応ならJPEG）base64 →
 *   概算容量チェック＋試し書き検証してから保存（spec §9-5）
 * - データリセット：lg2_* のみ（localStorage.clear() は絶対に使わない・spec §9-2）
 * - 月別収穫履歴：現状 SaveData は当月スタンプのみ保持 → 今月分を表示し過去月は1.1で対応予定
 * - 音設定：SE/BGM 個別 ON/OFF（settings.sound + audio.setEnabled）
 * - 親向け画面なので文言は大人向け・装飾は控えめ
 */
import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import Papa from 'papaparse'
import type {
  Answer,
  ChildSettings,
  CustomSeal,
  Difficulty,
  Grade,
  Question,
  Rarity,
  Subject,
} from '../../types'
import { DANGER_YEN, DEFAULT_CHILD_SETTINGS, DIFFICULTY_LABEL } from '../../lib/constants'
import { getMonster } from '../../data/monsters'
import { storage } from '../../lib/storage'
import { audio } from '../../lib/audio'
import { useGame } from '../../contexts/GameContext'
import Dialog from '../../components/Dialog'

export interface ParentMenuProps {
  onBack: () => void
}

// ========== 子別設定フォーム（入力中は文字列で持ち、保存時に検証する） ==========

interface ChildForm {
  maxDailyGacha: string
  maxMonthlyCoins: string
  easy: string
  normal: string
  hard: string
}

function formFromSettings(cs: ChildSettings): ChildForm {
  return {
    maxDailyGacha: String(cs.maxDailyGacha),
    maxMonthlyCoins: String(cs.maxMonthlyCoins),
    easy: String(cs.coinRewards.easy),
    normal: String(cs.coinRewards.normal),
    hard: String(cs.coinRewards.hard),
  }
}

function parseIntIn(raw: string, label: string, min: number, max: number): number | string {
  const n = Number(raw)
  if (raw.trim() === '' || !Number.isInteger(n) || n < min || n > max) {
    return `「${label}」は ${min}〜${max} の整数で入力してください`
  }
  return n
}

/** 検証OKなら ChildSettings、NGならエラーメッセージ文字列を返す */
function parseChildForm(f: ChildForm): ChildSettings | string {
  const maxDailyGacha = parseIntIn(f.maxDailyGacha, '1日ガチャ上限', 0, 20)
  if (typeof maxDailyGacha === 'string') return maxDailyGacha
  const maxMonthlyCoins = parseIntIn(f.maxMonthlyCoins, '月の目標コイン', 0, 100000)
  if (typeof maxMonthlyCoins === 'string') return maxMonthlyCoins
  const easy = parseIntIn(f.easy, 'かんたん報酬', 0, 1000)
  if (typeof easy === 'string') return easy
  const normal = parseIntIn(f.normal, 'ふつう報酬', 0, 1000)
  if (typeof normal === 'string') return normal
  const hard = parseIntIn(f.hard, 'むずかしい報酬', 0, 1000)
  if (typeof hard === 'string') return hard
  return { maxDailyGacha, maxMonthlyCoins, coinRewards: { easy, normal, hard } }
}

// ========== CSV → v2 Question 変換 ==========
// フォーマット（ヘッダー必須）: text,answer,choices,difficulty,grade,subject,unit,explain
// - choices は | 区切り（2個以上で選択問題。answer は choices 内の正解文字列）
// - choices なし → answer は数値（数値入力問題）。unit は任意（こ・えん 等）
// - difficulty: easy/normal/hard（省略時 normal）、grade: 2/3（省略時 2）
// - subject: math/japanese（省略時 math）、explain は | 区切りで段階解説（省略可）

interface RowResult {
  q?: Question
  error?: string
}

function rowToQuestion(row: Record<string, string>, rowIndex: number, idBase: string): RowResult {
  const lineNo = rowIndex + 2 // 1行目はヘッダー
  const text = (row.text ?? '').trim()
  if (text === '') return { error: `${lineNo}行目: text が空です` }
  const answerRaw = (row.answer ?? '').trim()
  if (answerRaw === '') return { error: `${lineNo}行目: answer が空です` }

  const diffRaw = (row.difficulty ?? '').trim()
  const difficulty: Difficulty = diffRaw === 'easy' || diffRaw === 'hard' ? diffRaw : 'normal'
  const grade: Grade = (row.grade ?? '').trim() === '3' ? 3 : 2
  const subject: Subject = (row.subject ?? '').trim() === 'japanese' ? 'japanese' : 'math'

  const choices = (row.choices ?? '')
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s !== '')

  let answer: Answer
  if (choices.length >= 2) {
    const correct = choices.indexOf(answerRaw)
    if (correct < 0) return { error: `${lineNo}行目: answer が choices の中にありません` }
    answer = { kind: 'choice', options: choices, correct }
  } else {
    const value = Number(answerRaw)
    if (!Number.isFinite(value)) {
      return { error: `${lineNo}行目: choices なしの場合 answer は数値にしてください` }
    }
    const unit = (row.unit ?? '').trim()
    answer = unit !== '' ? { kind: 'number', value, unit } : { kind: 'number', value }
  }

  const explain = (row.explain ?? '')
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s !== '')

  return {
    q: {
      id: `custom-${idBase}-${rowIndex}`,
      subject,
      type: subject === 'japanese' ? 'vocab' : 'calc',
      grade,
      difficulty,
      text,
      answer,
      explain: explain.length > 0 ? explain : [`こたえは ${answerRaw} だよ`],
      pack: 'custom',
    },
  }
}

// ========== 画像の自動縮小（spec §9-5：最大512px・WebP/JPEG base64） ==========

async function resizeImageFile(file: File, maxSize: number): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error('画像を読み込めませんでした'))
      el.src = url
    })
    const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.max(1, Math.round(img.naturalWidth * scale))
    const h = Math.max(1, Math.round(img.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas が利用できません')
    ctx.drawImage(img, 0, 0, w, h)
    const webp = canvas.toDataURL('image/webp', 0.85)
    if (webp.startsWith('data:image/webp')) return webp
    // WebP 非対応ブラウザは JPEG（透過不可のため白背景を敷く）
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    return canvas.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** localStorage の概算上限（5MB が一般的 → 安全側に 4.8MB で警告） */
const STORAGE_SOFT_LIMIT_BYTES = 4_800_000
/** 試し書き用キー（lg2_ 接頭辞＝万一残っても resetAllV2 で掃除される） */
const PROBE_KEY = 'lg2_probe_seal'

// ========== 小物 ==========

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-md">
      <h2 className="mb-3 text-lg font-bold text-[var(--color-primary-dark)]">{title}</h2>
      {children}
    </section>
  )
}

function NumField(props: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-base text-[var(--color-ink)]">{props.label}</span>
      <input
        type="number"
        inputMode="numeric"
        className="w-28 rounded-lg border border-[var(--color-ink-faint)] bg-white px-3 py-2 text-right text-base"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  )
}

// ========== 本体 ==========

export default function ParentMenu({ onBack }: ParentMenuProps) {
  const {
    profiles,
    currentProfileId,
    currentProfile,
    settings,
    save,
    childSettings,
    updateSave,
    updateSettings,
    customQuestions,
    refreshCustomQuestions,
    selectProfile,
  } = useGame()

  // ---- 入室ゲート ----
  const [unlocked, setUnlocked] = useState(false)
  const [passInput, setPassInput] = useState('')

  // ---- 通知・確認ダイアログ ----
  const [notice, setNotice] = useState<{ title: string; body: string } | null>(null)
  const [confirm, setConfirm] = useState<{ message: string; onYes: () => void } | null>(null)

  // ---- 子別設定 ----
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null)
  const [childForm, setChildForm] = useState<ChildForm>(() =>
    formFromSettings(DEFAULT_CHILD_SETTINGS)
  )

  // ---- コイン補正 ----
  const [coinAdjust, setCoinAdjust] = useState('')

  // ---- シール登録 ----
  const [sealName, setSealName] = useState('')
  const [sealRarity, setSealRarity] = useState<Rarity>('N')
  const [sealBusy, setSealBusy] = useState(false)

  const tryUnlock = () => {
    if (passInput === settings.parentPasscode) {
      setUnlocked(true)
      setPassInput('')
    } else {
      setNotice({ title: 'パスコードが違います', body: 'もう一度入力してください。' })
      setPassInput('')
    }
  }

  const selectChild = (pid: string) => {
    setSelectedChildId(pid)
    setChildForm(formFromSettings(settings.perChild[pid] ?? DEFAULT_CHILD_SETTINGS))
  }

  const saveChildSettings = () => {
    if (!selectedChildId) return
    const parsed = parseChildForm(childForm)
    if (typeof parsed === 'string') {
      setNotice({ title: '入力エラー', body: parsed })
      return
    }
    const pid = selectedChildId
    const r = updateSettings((s) => ({ ...s, perChild: { ...s.perChild, [pid]: parsed } }))
    setNotice(
      r.ok
        ? { title: '保存しました', body: '子別設定を更新しました。' }
        : {
            title: '保存エラー',
            body: `保存に失敗しました（容量不足の可能性）: ${r.error ?? ''}`,
          }
    )
  }

  // ---- コイン手動補正（currentProfile のみ） ----
  const applyCoinAdjust = (target: 'harvested' | 'coins') => {
    const n = Number(coinAdjust)
    if (coinAdjust.trim() === '' || !Number.isInteger(n) || n === 0) {
      setNotice({ title: '入力エラー', body: '補正量は 0 以外の整数で入力してください（マイナス可）。' })
      return
    }
    if (!save || !currentProfile) {
      setNotice({
        title: '補正できません',
        body: 'プロフィールが選択されていません。補正したい子で遊んでいる状態で開いてください。',
      })
      return
    }
    const r = updateSave((s) =>
      target === 'harvested'
        ? { ...s, monthly: { ...s.monthly, harvested: Math.max(0, s.monthly.harvested + n) } }
        : { ...s, coins: Math.max(0, s.coins + n) }
    )
    if (r.ok) {
      setCoinAdjust('')
      setNotice({
        title: '補正しました',
        body:
          target === 'harvested'
            ? `${currentProfile.name} の今月のおこづかい実績を ${n > 0 ? '+' : ''}${n} しました。`
            : `${currentProfile.name} のコイン残高を ${n > 0 ? '+' : ''}${n} しました。`,
      })
    } else {
      setNotice({ title: '保存エラー', body: `保存に失敗しました: ${r.error ?? ''}` })
    }
  }

  // ---- CSV 追加 ----
  const handleCsvFile = (file: File) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const added: Question[] = []
        const errors: string[] = []
        const idBase = Date.now().toString(36)
        res.data.forEach((row, i) => {
          const out = rowToQuestion(row, i, idBase)
          if (out.error != null) errors.push(out.error)
          else if (out.q) added.push(out.q)
        })
        if (added.length === 0) {
          setNotice({
            title: 'CSV追加',
            body: `追加できる問題がありませんでした。${errors.slice(0, 3).join(' / ')}`,
          })
          return
        }
        const r = storage.saveCustomQuestions([...storage.getCustomQuestions(), ...added])
        if (!r.ok) {
          setNotice({
            title: '保存エラー',
            body: `保存に失敗しました（容量不足の可能性）: ${r.error ?? ''}`,
          })
          return
        }
        refreshCustomQuestions()
        const errNote =
          errors.length > 0 ? `（スキップ ${errors.length}行・例: ${errors[0]}）` : ''
        setNotice({ title: 'CSV追加', body: `${added.length}問を追加しました${errNote}` })
      },
      error: (err) => setNotice({ title: 'CSVエラー', body: err.message }),
    })
  }

  // ---- カスタムシール登録（自動縮小＋容量チェック・spec §9-5） ----
  const handleSealFile = async (file: File) => {
    if (sealName.trim() === '') {
      setNotice({ title: '入力エラー', body: '先にシール名を入力してください。' })
      return
    }
    setSealBusy(true)
    try {
      const dataUrl = await resizeImageFile(file, 512)

      // 概算容量チェック（UTF-16 2バイト換算）
      const estimated = storage.estimateUsageBytes() + dataUrl.length * 2
      if (estimated > STORAGE_SOFT_LIMIT_BYTES) {
        setNotice({
          title: '容量不足',
          body: '保存容量が足りません。不要なカスタムシールや問題を削除してから登録してください。',
        })
        return
      }
      // 実際に書けるか試し書きで検証
      const probe = storage.tryWrite(PROBE_KEY, dataUrl)
      storage.rawRemove(PROBE_KEY)
      if (!probe.ok) {
        setNotice({
          title: '容量不足',
          body: `保存テストに失敗しました。登録を中止します: ${probe.error ?? ''}`,
        })
        return
      }

      const seal: CustomSeal = {
        id: `seal-${Date.now().toString(36)}`,
        name: sealName.trim(),
        rarity: sealRarity,
        imageData: dataUrl,
      }
      const r = updateSettings((s) => ({ ...s, customSeals: [...s.customSeals, seal] }))
      if (r.ok) {
        setSealName('')
        setNotice({ title: 'シール登録', body: `「${seal.name}」を登録しました。` })
      } else {
        setNotice({ title: '保存エラー', body: `保存に失敗しました: ${r.error ?? ''}` })
      }
    } catch (e) {
      setNotice({ title: '画像エラー', body: e instanceof Error ? e.message : String(e) })
    } finally {
      setSealBusy(false)
    }
  }

  const removeSeal = (sealId: string, name: string) => {
    setConfirm({
      message: `カスタムシール「${name}」を削除します。よろしいですか？`,
      onYes: () => {
        const r = updateSettings((s) => ({
          ...s,
          customSeals: s.customSeals.filter((cs) => cs.id !== sealId),
        }))
        setNotice(
          r.ok
            ? { title: '削除しました', body: `「${name}」を削除しました。` }
            : { title: '保存エラー', body: `削除の保存に失敗しました: ${r.error ?? ''}` }
        )
      },
    })
  }

  // ---- データリセット（lg2 のみ・spec §9-2） ----
  const resetChild = (pid: string, name: string) => {
    setConfirm({
      message: `「${name}」のセーブデータ（モンスター・コイン・かけら・苦手記録）をリセットします。プロフィール自体は残ります。よろしいですか？`,
      onYes: () => {
        storage.resetProfileSave(pid)
        // いま遊んでいる子なら初期状態を読み直す（メモリ上の旧データが書き戻されるのを防ぐ）
        if (pid === currentProfileId) selectProfile(pid)
        setNotice({ title: 'リセット完了', body: `「${name}」のデータをリセットしました。` })
      },
    })
  }

  const resetAll = () => {
    setConfirm({
      message:
        '全データ（プロフィール・セーブ・設定・カスタム問題＝lg2系のみ）をリセットします。v1のバックアップ（lg1_backup_*）は残ります。本当によろしいですか？',
      onYes: () => {
        storage.resetAllV2() // localStorage.clear() は使わない（spec §9-2）
        window.location.reload()
      },
    })
  }

  // ---- データお引っこし（バックアップ／復元） ----
  const exportData = async () => {
    try {
      const payload = { type: 'gakumon-backup', version: 2, data: storage.exportAllRaw() }
      const json = JSON.stringify(payload)
      const d = new Date()
      const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
        d.getDate()
      ).padStart(2, '0')}`
      const filename = `gakumon-backup-${stamp}.json`

      // iPhone（ホーム画面アプリ）でも確実に取り出せるよう、まず「共有」を試す。
      // 共有シートから「ファイルに保存」等を選べる（ダウンロードが効かないiOSアプリ対策）。
      const file = new File([json], filename, { type: 'application/json' })
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean }
      if (typeof nav.canShare === 'function' && nav.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'ガクモン バックアップ' })
          setNotice({
            title: '書き出しました',
            body: '共有メニューから「ファイルに保存」などを選ぶと、新しい方のアプリの「読み込む」で復元できます。',
          })
        } catch (err) {
          // 共有をキャンセルしたとき(AbortError)は何も出さない
          if ((err as Error)?.name !== 'AbortError') {
            setNotice({
              title: 'エラー',
              body: '共有に失敗しました: ' + ((err as Error)?.message ?? ''),
            })
          }
        }
        return
      }

      // PC・Android：ファイルとしてダウンロード
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice({
        title: '書き出しました',
        body: 'バックアップファイルを保存しました。新しい方のアプリで「データを読み込む」を押し、このファイルを選ぶとデータが戻ります。',
      })
    } catch (e) {
      setNotice({
        title: 'エラー',
        body: '書き出しに失敗しました: ' + (e instanceof Error ? e.message : String(e)),
      })
    }
  }

  const onPickImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // 同じファイルを選び直せるようにリセット
    if (!file) return
    file
      .text()
      .then((text) => {
        let parsed: unknown
        try {
          parsed = JSON.parse(text)
        } catch {
          setNotice({ title: '読み込めません', body: 'このファイルはバックアップ形式ではありません。' })
          return
        }
        const obj = parsed as { type?: string; data?: Record<string, string> }
        if (!obj || obj.type !== 'gakumon-backup' || !obj.data) {
          setNotice({
            title: '読み込めません',
            body: 'ガクモンのバックアップファイルではないようです。',
          })
          return
        }
        const data = obj.data
        setConfirm({
          message:
            'いまのこの端末のデータ（モンスター・コイン・設定など）を、選んだバックアップで丸ごと上書きします。よろしいですか？',
          onYes: () => {
            const r = storage.importAllRaw(data)
            if (r.ok) window.location.reload() // 確実に反映するため再読み込み
            else
              setNotice({
                title: '保存エラー',
                body: '読み込みの保存に失敗しました: ' + (r.error ?? ''),
              })
          },
        })
      })
      .catch((err) => {
        setNotice({
          title: 'エラー',
          body: 'ファイルの読み取りに失敗しました: ' + (err instanceof Error ? err.message : String(err)),
        })
      })
  }

  // ---- 音設定 ----
  const toggleSound = (key: 'se' | 'bgm', value: boolean) => {
    updateSettings((s) => ({ ...s, sound: { ...s.sound, [key]: value } }))
    if (key === 'se') audio.setEnabled({ se: value })
    else audio.setEnabled({ bgm: value })
  }

  // ========== 描画 ==========

  // ---- 入室ゲート ----
  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 p-6">
        <h1 className="text-2xl font-bold text-[var(--color-primary-dark)]">おやメニュー</h1>
        <p className="text-base text-[var(--color-ink-soft)]">パスコードを入力してください</p>
        <form
          className="flex w-full max-w-xs flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            tryUnlock()
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={8}
            className="rounded-xl border-2 border-[var(--color-ink-faint)] bg-white px-4 py-3 text-center text-2xl tracking-[0.5em]"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />
          <button type="submit" className="btn-kid bg-[var(--color-primary)] text-xl">
            ひらく
          </button>
        </form>
        <button
          className="rounded-full bg-[var(--color-bg-2)] px-6 py-3 text-base font-bold text-[var(--color-ink-soft)]"
          onClick={onBack}
        >
          もどる
        </button>
        <Dialog
          open={notice != null}
          title={notice?.title}
          onClose={() => setNotice(null)}
          actions={
            <button className="btn-kid bg-[var(--color-primary)]" onClick={() => setNotice(null)}>
              OK
            </button>
          }
        >
          <p className="text-center">{notice?.body}</p>
        </Dialog>
      </div>
    )
  }

  const selectedChildGrade = profiles.find((p) => p.id === selectedChildId)?.grade ?? null

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-4 p-4 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-primary-dark)]">おやメニュー</h1>
        <button
          className="rounded-full bg-[var(--color-bg-2)] px-5 py-2 text-base font-bold text-[var(--color-ink-soft)]"
          onClick={onBack}
        >
          もどる
        </button>
      </div>

      {/* ---- 子別設定 ---- */}
      <Section title="子別設定">
        {profiles.length === 0 ? (
          <p className="text-base text-[var(--color-ink-soft)]">プロフィールがまだありません。</p>
        ) : (
          <>
            <div className="mb-3 flex flex-wrap gap-2">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectChild(p.id)}
                  className={`rounded-full px-5 py-2 text-base font-bold ${
                    p.id === selectedChildId
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-2)] text-[var(--color-ink-soft)]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            {selectedChildId == null ? (
              <p className="text-base text-[var(--color-ink-soft)]">
                設定する子を選んでください。
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                <NumField
                  label="1日のガチャ上限（回）"
                  value={childForm.maxDailyGacha}
                  onChange={(v) => setChildForm((f) => ({ ...f, maxDailyGacha: v }))}
                />
                <NumField
                  label="月の目標コイン（=月上限）"
                  value={childForm.maxMonthlyCoins}
                  onChange={(v) => setChildForm((f) => ({ ...f, maxMonthlyCoins: v }))}
                />
                <NumField
                  label={`報酬コイン：${DIFFICULTY_LABEL.easy}`}
                  value={childForm.easy}
                  onChange={(v) => setChildForm((f) => ({ ...f, easy: v }))}
                />
                <NumField
                  label={`報酬コイン：${DIFFICULTY_LABEL.normal}`}
                  value={childForm.normal}
                  onChange={(v) => setChildForm((f) => ({ ...f, normal: v }))}
                />
                <NumField
                  label={`報酬コイン：${DIFFICULTY_LABEL.hard}`}
                  value={childForm.hard}
                  onChange={(v) => setChildForm((f) => ({ ...f, hard: v }))}
                />
                {/* 学年は profile 側のデータ。useGame にプロフィール更新手段がないため表示のみ
                    （学年変更＝プロフィール編集機能は将来対応） */}
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-base text-[var(--color-ink)]">学年</span>
                  <span className="text-base text-[var(--color-ink-soft)]">
                    小{selectedChildGrade}（変更は将来対応）
                  </span>
                </div>
                <button
                  className="mt-2 self-end rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-base font-bold text-white"
                  onClick={saveChildSettings}
                >
                  この子の設定を保存
                </button>
              </div>
            )}
          </>
        )}
      </Section>

      {/* ---- コイン手動補正 ---- */}
      <Section title="コイン手動補正">
        {save && currentProfile ? (
          <div className="flex flex-col gap-2">
            <p className="text-base text-[var(--color-ink)]">
              対象: <b>{currentProfile.name}</b>（いま遊んでいる子）
              ／コイン残高: {save.coins} ／今月のおこづかい実績: {save.monthly.harvested}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                placeholder="±補正量"
                className="w-32 rounded-lg border border-[var(--color-ink-faint)] bg-white px-3 py-2 text-right text-base"
                value={coinAdjust}
                onChange={(e) => setCoinAdjust(e.target.value)}
              />
              <button
                className="rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-base font-bold text-white"
                onClick={() => applyCoinAdjust('harvested')}
              >
                今月の実績に加算
              </button>
              <button
                className="rounded-xl bg-[var(--color-primary-light)] px-4 py-2.5 text-base font-bold text-white"
                onClick={() => applyCoinAdjust('coins')}
              >
                コイン残高に加算
              </button>
            </div>
            <p className="text-sm text-[var(--color-ink-faint)]">
              他の子を補正する場合は、その子のプロフィールで遊んでいる状態で開いてください（複数子の一括補正は将来対応）。
            </p>
          </div>
        ) : (
          <p className="text-base text-[var(--color-ink-soft)]">
            プロフィール未選択のため補正できません。
          </p>
        )}
      </Section>

      {/* ---- 現金ごほうび（DANGER討伐・追加機能1-C） ---- */}
      <Section title="げんきんごほうび（DANGER討伐）">
        {save && currentProfile ? (
          <div className="flex flex-col gap-2">
            <p className="text-base text-[var(--color-ink)]">
              対象: <b>{currentProfile.name}</b>（いま遊んでいる子）
            </p>
            <p className="text-base font-extrabold text-[var(--color-ink)]">
              まだ渡していない:{' '}
              <span className="text-[var(--color-secondary-dark)]">
                {save.dangerYenAwarded.filter((a) => !a.received).length}件 ＝ ￥
                {save.dangerYenAwarded.filter((a) => !a.received).length * DANGER_YEN}
              </span>
              <span className="ml-2 text-sm font-bold text-[var(--color-ink-soft)]">
                （累計 {save.dangerYenAwarded.length}件 ／ ￥{save.dangerYenAwarded.length * DANGER_YEN}）
              </span>
            </p>
            {save.dangerYenAwarded.length === 0 ? (
              <p className="text-sm text-[var(--color-ink-soft)]">
                まだ DANGER討伐の ごほうびは ありません。
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {[...save.dangerYenAwarded].reverse().map((a) => {
                  const m = a.monsterId ? getMonster(a.monsterId) : undefined
                  return (
                    <div
                      key={a.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-[var(--color-bg)] p-2 text-sm"
                    >
                      <span className="text-[var(--color-ink-soft)]">
                        {new Date(a.awardedAt).toLocaleDateString('ja-JP')}
                      </span>
                      <span className="font-extrabold text-[var(--color-ink)]">￥{DANGER_YEN}</span>
                      <span className="flex-1 truncate text-right text-[var(--color-ink-soft)]">
                        {m ? m.name : ''}
                      </span>
                      <button
                        className={`rounded-lg px-3 py-1.5 text-sm font-bold text-white ${
                          a.received ? 'bg-[var(--color-success)]' : 'bg-[var(--color-secondary)]'
                        }`}
                        onClick={() =>
                          updateSave((s) => ({
                            ...s,
                            dangerYenAwarded: s.dangerYenAwarded.map((x) =>
                              x.id === a.id ? { ...x, received: !x.received } : x
                            ),
                          }))
                        }
                      >
                        {a.received ? '済み' : '未受取'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
            <p className="text-sm text-[var(--color-ink-faint)]">
              「未受取」を押すと「済み」に切り替わります（実際に現金を渡したら押してください）。
            </p>
          </div>
        ) : (
          <p className="text-base text-[var(--color-ink-soft)]">
            プロフィール未選択のため表示できません。
          </p>
        )}
      </Section>

      {/* ---- 問題のCSV追加 ---- */}
      <Section title="問題のCSV追加">
        <p className="mb-2 text-sm text-[var(--color-ink-soft)]">
          ヘッダー付きCSV: <code>text,answer,choices,difficulty,grade,subject,unit,explain</code>
          <br />
          choices は「|」区切り（2個以上で選択問題・answer は正解の文字列）。choices
          なしなら answer は数値。difficulty=easy/normal/hard、grade=2/3、subject=math/japanese。
          explain は「|」区切りの段階解説（省略可）。
        </p>
        <pre className="mb-3 overflow-x-auto rounded-lg bg-[var(--color-bg)] p-3 text-xs text-[var(--color-ink-soft)]">
          {'text,answer,choices,difficulty,grade,subject,unit,explain\n' +
            '5+3は いくつ？,8,,easy,2,math,,5に 3を たすよ|5+3=8 だね！\n' +
            '「あるく」の はんたいは？,とまる,とまる|はしる|とぶ,normal,2,japanese,,'}
        </pre>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".csv,text/csv"
            className="text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleCsvFile(file)
              e.target.value = ''
            }}
          />
          <span className="text-sm text-[var(--color-ink-faint)]">
            現在のカスタム問題: {customQuestions.length}問
          </span>
        </div>
      </Section>

      {/* ---- カスタムシール登録 ---- */}
      <Section title="カスタムシール登録">
        <p className="mb-2 text-sm text-[var(--color-ink-soft)]">
          画像は自動で最大512pxに縮小し、WebP（非対応環境はJPEG）で保存します。保存前に容量を確認し、足りない場合は中止します。
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="シール名"
            className="w-40 rounded-lg border border-[var(--color-ink-faint)] bg-white px-3 py-2 text-base"
            value={sealName}
            onChange={(e) => setSealName(e.target.value)}
          />
          <select
            className="rounded-lg border border-[var(--color-ink-faint)] bg-white px-3 py-2 text-base"
            value={sealRarity}
            onChange={(e) => setSealRarity(e.target.value as Rarity)}
          >
            {(['N', 'R', 'SR', 'UR'] as const).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            disabled={sealBusy}
            className="text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleSealFile(file)
              e.target.value = ''
            }}
          />
          {sealBusy && <span className="text-sm text-[var(--color-ink-faint)]">処理中…</span>}
        </div>
        {settings.customSeals.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {settings.customSeals.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <img
                  src={s.imageData}
                  alt={s.name}
                  className="h-16 w-16 rounded-lg object-contain shadow"
                />
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {s.name}（{s.rarity}）
                </span>
                <button
                  className="text-xs font-bold text-[var(--color-danger)]"
                  onClick={() => removeSeal(s.id, s.name)}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ---- 月別収穫履歴 ---- */}
      <Section title="月別収穫履歴（おこづかい清算用）">
        {save && currentProfile ? (
          <div className="text-base text-[var(--color-ink)]">
            <p>
              <b>{currentProfile.name}</b> ／対象月: {save.monthly.month}
            </p>
            <p>
              今月の収穫（おこづかい実績）: <b>{save.monthly.harvested}</b> ／月上限:{' '}
              {childSettings.maxMonthlyCoins}
              ／今月の獲得コイン: {save.monthly.coins}
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
              ※現在は当月分のみ保持しています。過去月の履歴は 1.1 で対応予定です。
            </p>
          </div>
        ) : (
          <p className="text-base text-[var(--color-ink-soft)]">プロフィール未選択です。</p>
        )}
      </Section>

      {/* ---- 音設定 ---- */}
      <Section title="音設定">
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-between py-1">
            <span className="text-base">効果音（SE）</span>
            <input
              type="checkbox"
              className="h-6 w-6"
              checked={settings.sound.se}
              onChange={(e) => toggleSound('se', e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between py-1">
            <span className="text-base">BGM</span>
            <input
              type="checkbox"
              className="h-6 w-6"
              checked={settings.sound.bgm}
              onChange={(e) => toggleSound('bgm', e.target.checked)}
            />
          </label>
        </div>
      </Section>

      {/* ---- データお引っこし（バックアップ／復元） ---- */}
      <Section title="データお引っこし（バックアップ／復元）">
        <p className="mb-3 text-sm text-[var(--color-ink-soft)]">
          機種変更やアプリの入れ直しでデータを引き継ぐときに使います。古い方で「書き出す」→
          出てきたファイルを新しい方で「読み込む」と、モンスターや進み具合が丸ごと移ります。
          ふだんのバックアップ（保険）にも使えます。
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="self-start rounded-xl bg-[var(--color-primary)] px-4 py-2 text-base font-bold text-white"
            onClick={() => void exportData()}
          >
            データを書き出す（バックアップ）
          </button>
          <label className="self-start cursor-pointer rounded-xl border-2 border-[var(--color-primary)] px-4 py-2 text-base font-bold text-[var(--color-primary-dark)]">
            データを読み込む（復元）
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={onPickImportFile}
            />
          </label>
        </div>
      </Section>

      {/* ---- データリセット ---- */}
      <Section title="データリセット（lg2のみ）">
        <div className="flex flex-col gap-2">
          {profiles.map((p) => (
            <button
              key={p.id}
              className="self-start rounded-xl border-2 border-[var(--color-danger)] px-4 py-2 text-base font-bold text-[var(--color-danger)]"
              onClick={() => resetChild(p.id, p.name)}
            >
              「{p.name}」のデータをリセット
            </button>
          ))}
          <button
            className="self-start rounded-xl bg-[var(--color-danger)] px-4 py-2 text-base font-bold text-white"
            onClick={resetAll}
          >
            全データをリセット（v1バックアップは残す）
          </button>
        </div>
      </Section>

      {/* ---- 通知ダイアログ ---- */}
      <Dialog
        open={notice != null}
        title={notice?.title}
        onClose={() => setNotice(null)}
        actions={
          <button className="btn-kid bg-[var(--color-primary)]" onClick={() => setNotice(null)}>
            OK
          </button>
        }
      >
        <p className="text-center text-base">{notice?.body}</p>
      </Dialog>

      {/* ---- 確認ダイアログ ---- */}
      <Dialog
        open={confirm != null}
        title="確認"
        onClose={() => setConfirm(null)}
        actions={
          <>
            <button
              className="btn-kid bg-[var(--color-bg-2)] text-[var(--color-ink-soft)]"
              onClick={() => setConfirm(null)}
            >
              キャンセル
            </button>
            <button
              className="btn-kid bg-[var(--color-danger)]"
              onClick={() => {
                const c = confirm
                setConfirm(null)
                c?.onYes()
              }}
            >
              実行する
            </button>
          </>
        }
      >
        <p className="text-base">{confirm?.message}</p>
      </Dialog>
    </div>
  )
}

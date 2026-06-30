/*
 * モンスターずかん（spec §5 / §7）
 * - 全24体をレア度順（=MONSTERS の収録順 N→R→SR→UR・番号順）でグリッド表示
 * - 未獲得は MonsterSprite silhouette＋「？？？」／獲得済みは絵＋なまえ＋レア度＋（詳細で）blurb
 * - 「あと○ひきで コンプ！」表示。全24所持で称号「モンスターマスター」Dialog
 *   （称号の獲得済みフラグは save.unlockedSeals に TITLE_ID を入れて永続化＝スキーマ追加なしで再表示を防ぐ）
 * - 相棒設定：獲得済みをタップ →「この子を あいぼうにする」→ save.partnerId 更新
 * - updateSave 失敗時は「ほぞんに しっぱいしたかも」Dialog（spec §9-5）
 */
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { MonsterDef } from '../../types'
import { useGame } from '../../contexts/GameContext'
import { MONSTERS } from '../../data/monsters'
import { HOME_FAVORITES_MAX, RARITY_COLOR, RARITY_LABEL } from '../../lib/constants'
import { audio } from '../../lib/audio'
import MonsterSprite from '../../components/MonsterSprite'
import Dialog from '../../components/Dialog'

export interface ZukanProps {
  onBack: () => void
}

/** 図鑑コンプ称号の獲得済みマーカー（unlockedSeals に保存・シールIDと衝突しない接頭辞） */
const TITLE_ID = 'title:zukan-complete'
const TITLE_NAME = 'モンスターマスター'

export default function Zukan({ onBack }: ZukanProps) {
  const { save, updateSave } = useGame()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  /** 称号 Dialog をこの訪問で閉じたか（保存失敗でも連続再表示しない） */
  const [titleDismissed, setTitleDismissed] = useState(false)
  const [saveWarn, setSaveWarn] = useState(false)

  const ownedCounts = useMemo(() => {
    const map = new Map<string, { count: number; stage: number }>()
    for (const m of save?.monsters ?? []) {
      if (m.count > 0) map.set(m.monsterId, { count: m.count, stage: m.stage })
    }
    return map
  }, [save])

  // 通常モンスター（図鑑の完成度はこちらだけで数える）と DANGER 限定（別枠）に分ける
  const regular = useMemo(() => MONSTERS.filter((m) => !m.isDanger), [])
  const dangerList = useMemo(() => MONSTERS.filter((m) => m.isDanger), [])

  const ownedTotal = regular.filter((m) => ownedCounts.has(m.id)).length
  const remaining = regular.length - ownedTotal
  const complete = remaining === 0
  const titleEarned = save?.unlockedSeals.includes(TITLE_ID) ?? false

  // コンプ達成かつ称号未記録 → 称号 Dialog（派生値・閉じたら save に記録して以後出ない）
  const showTitle = complete && !titleEarned && !titleDismissed

  const closeTitleDialog = () => {
    setTitleDismissed(true)
    const res = updateSave((s) =>
      s.unlockedSeals.includes(TITLE_ID)
        ? s
        : { ...s, unlockedSeals: [...s.unlockedSeals, TITLE_ID] }
    )
    if (!res.ok) setSaveWarn(true)
  }

  const setPartner = (id: string) => {
    const res = updateSave((s) => ({ ...s, partnerId: id }))
    audio.playSe('partner-happy')
    setSelectedId(null)
    if (!res.ok) setSaveWarn(true)
  }

  // ホームの神殿に飾るお気に入り。相棒は自動で1枠を使うので、自由に飾れる残り枠は最大 HOME_FAVORITES_MAX-（相棒の有無）
  const favoriteIds = save?.favoriteMonsterIds ?? []
  const isFavorite = (id: string) => favoriteIds.includes(id)
  const freeFavoriteCount = favoriteIds.filter((id) => id !== save?.partnerId).length
  const maxFreeFavorites = HOME_FAVORITES_MAX - (save?.partnerId ? 1 : 0)
  const favoritesFull = freeFavoriteCount >= maxFreeFavorites

  const toggleFavorite = (id: string) => {
    const res = updateSave((s) => {
      const cur = s.favoriteMonsterIds ?? []
      if (cur.includes(id)) {
        return { ...s, favoriteMonsterIds: cur.filter((x) => x !== id) }
      }
      // 上限（相棒ぶんを除いた自由枠）に達していたら追加しない
      const free = cur.filter((x) => x !== s.partnerId).length
      const max = HOME_FAVORITES_MAX - (s.partnerId ? 1 : 0)
      if (free >= max) return s
      return { ...s, favoriteMonsterIds: [...cur, id] }
    })
    audio.playSe('tap')
    if (!res.ok) setSaveWarn(true)
  }

  const selected: MonsterDef | undefined = selectedId
    ? MONSTERS.find((m) => m.id === selectedId)
    : undefined
  const selectedOwned = selectedId ? ownedCounts.get(selectedId) : undefined
  const isPartner = (id: string) => save?.partnerId === id

  // 1体ぶんのカード（通常／DANGER 共通。danger=true でレア度ラベルを「DANGER」赤バッジに）
  const renderCard = (def: MonsterDef, i: number, danger = false) => {
    const owned = ownedCounts.get(def.id)
    return (
      <motion.button
        key={def.id}
        className="card-kid relative flex flex-col items-center gap-1 p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(i * 0.02, 0.4) }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          audio.playSe('tap')
          setSelectedId(def.id)
        }}
      >
        {owned && isPartner(def.id) && (
          <span className="absolute top-1 left-1 rounded-full bg-[var(--color-secondary)] px-1.5 py-0.5 text-xs font-extrabold text-white">
            ❤ あいぼう
          </span>
        )}
        {owned && isFavorite(def.id) && !isPartner(def.id) && (
          <span className="absolute top-1 left-1 rounded-full bg-[var(--color-success)] px-1.5 py-0.5 text-xs font-extrabold text-white">
            🏛 かざってる
          </span>
        )}
        {owned && owned.count > 1 && (
          <span className="absolute top-1 right-1 rounded-full bg-[var(--color-bg-2)] px-1.5 py-0.5 text-xs font-extrabold text-[var(--color-ink-soft)]">
            ×{owned.count}
          </span>
        )}
        <MonsterSprite monsterId={def.id} stage={owned?.stage ?? 1} size={72} silhouette={!owned} />
        <span className="text-sm font-extrabold">{owned ? def.name : '？？？'}</span>
        {danger ? (
          <span className="rounded-full bg-[var(--color-danger)] px-2 py-0.5 text-xs font-extrabold text-white">
            DANGER
          </span>
        ) : (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-extrabold text-white"
            style={{ backgroundColor: RARITY_COLOR[def.rarity] }}
          >
            {RARITY_LABEL[def.rarity]}
          </span>
        )}
      </motion.button>
    )
  }

  if (!save) return null

  return (
    <div className="mx-auto min-h-dvh max-w-3xl p-4">
      {/* ===== ヘッダー ===== */}
      <header className="mb-4 flex items-center justify-between gap-3">
        <button
          aria-label="もどる"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface)] text-2xl shadow-md active:scale-90"
          onClick={() => {
            audio.playSe('tap')
            onBack()
          }}
        >
          ←
        </button>
        <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)]">ずかん</h1>
        <span className="card-kid px-3 py-2 text-base font-extrabold">
          {ownedTotal}/{regular.length}
        </span>
      </header>

      {/* ===== 進捗／称号 ===== */}
      <p className="mb-4 text-center text-xl font-extrabold">
        {complete ? (
          <span className="text-[var(--color-accent-dark)]">
            🏆 しょうごう「{TITLE_NAME}」かくとく！ コンプリート！
          </span>
        ) : (
          <>
            あと <span className="text-3xl text-[var(--color-secondary-dark)]">{remaining}</span>{' '}
            ひきで コンプ！
          </>
        )}
      </p>

      {/* お気に入りモンスターをホームの神殿に飾る案内（ホーム画面リニューアル2026-07） */}
      <p className="mb-4 -mt-2 text-center text-sm font-bold text-[var(--color-ink-soft)]">
        モンスターを タップ →「🏛 ホームに かざる」で しんでんに だせるよ（{HOME_FAVORITES_MAX}びきまで）
      </p>

      {/* ===== グリッド（通常モンスター・レア度順） ===== */}
      <div className="grid grid-cols-3 gap-3 pb-6 sm:grid-cols-4">
        {regular.map((def, i) => renderCard(def, i))}
      </div>

      {/* ===== DANGER 別枠（討伐限定・通常の完成度には含めない） ===== */}
      {dangerList.length > 0 && (
        <>
          <h2 className="mt-2 mb-1 text-center text-xl font-extrabold text-[var(--color-danger)]">
            ⚔️ DANGER モンスター
          </h2>
          <p className="mb-3 text-center text-sm font-bold text-[var(--color-ink-soft)]">
            DANGER討伐でしか であえない とくべつな なかま
          </p>
          <div className="grid grid-cols-3 gap-3 pb-6 sm:grid-cols-4">
            {dangerList.map((def, i) => renderCard(def, i, true))}
          </div>
        </>
      )}

      {/* ===== 詳細 Dialog ===== */}
      <Dialog
        open={selected !== undefined}
        title={selected && selectedOwned ? selected.name : '？？？'}
        onClose={() => setSelectedId(null)}
        actions={
          selected && (
            <>
              {selectedOwned && !isPartner(selected.id) && (
                <button
                  className="btn-kid bg-[var(--color-secondary)] text-xl"
                  onClick={() => setPartner(selected.id)}
                >
                  ❤ この子を あいぼうにする
                </button>
              )}
              {selectedOwned &&
                (isPartner(selected.id) ? (
                  <p className="text-center text-sm font-bold text-[var(--color-secondary-dark)]">
                    ❤ あいぼうは ホームの しんでんに いつも いるよ
                  </p>
                ) : isFavorite(selected.id) ? (
                  <button
                    className="btn-kid bg-[var(--color-ink-faint)] text-xl"
                    onClick={() => toggleFavorite(selected.id)}
                  >
                    🏛 ホームから はずす
                  </button>
                ) : favoritesFull ? (
                  <p className="text-center text-sm font-bold text-[var(--color-ink-soft)]">
                    🏛 ホームに かざれるのは {HOME_FAVORITES_MAX}びきまで
                    <br />
                    （どれか はずしてね）
                  </p>
                ) : (
                  <button
                    className="btn-kid bg-[var(--color-success)] text-xl"
                    onClick={() => toggleFavorite(selected.id)}
                  >
                    🏛 ホームに かざる
                  </button>
                ))}
              <button
                className="btn-kid bg-[var(--color-ink-faint)] text-xl"
                onClick={() => {
                  audio.playSe('tap')
                  setSelectedId(null)
                }}
              >
                とじる
              </button>
            </>
          )
        }
      >
        {selected && (
          <div className="flex flex-col items-center gap-3 text-center">
            <MonsterSprite
              monsterId={selected.id}
              stage={selectedOwned?.stage ?? 1}
              size={140}
              silhouette={!selectedOwned}
            />
            {selected.isDanger ? (
              <span className="rounded-full bg-[var(--color-danger)] px-3 py-1 text-sm font-extrabold text-white">
                DANGER
              </span>
            ) : (
              <span
                className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
                style={{ backgroundColor: RARITY_COLOR[selected.rarity] }}
              >
                {RARITY_LABEL[selected.rarity]}
              </span>
            )}
            {selectedOwned ? (
              <>
                <p>{selected.blurb}</p>
                <p className="text-sm font-bold text-[var(--color-ink-soft)]">
                  もっているかず：{selectedOwned.count}
                </p>
                {isPartner(selected.id) && (
                  <p className="font-extrabold text-[var(--color-secondary-dark)]">
                    ❤ いまの あいぼうだよ！
                  </p>
                )}
              </>
            ) : (
              <p>まだ であっていない モンスターだよ。クイズを がんばって さがそう！</p>
            )}
          </div>
        )}
      </Dialog>

      {/* ===== コンプ称号 Dialog ===== */}
      <Dialog
        open={showTitle}
        title="🏆 コンプリート！"
        actions={
          <button className="btn-kid bg-[var(--color-accent)] text-xl" onClick={closeTitleDialog}>
            やったー！
          </button>
        }
      >
        <p className="text-center">
          {regular.length}ひき ぜんぶ あつめたよ！
          <br />
          しょうごう「<span className="font-extrabold text-[var(--color-accent-dark)]">{TITLE_NAME}</span>
          」を かくとく！
        </p>
      </Dialog>

      {/* ===== 保存失敗の警告 ===== */}
      <Dialog
        open={saveWarn}
        title="ほぞんに しっぱいしたかも"
        onClose={() => setSaveWarn(false)}
        actions={
          <button
            className="btn-kid bg-[var(--color-primary)] text-xl"
            onClick={() => setSaveWarn(false)}
          >
            わかった
          </button>
        }
      >
        <p className="text-center">
          データが ほぞんできなかった かもしれないよ。
          <br />
          おうちのひとに みせてね。
        </p>
      </Dialog>
    </div>
  )
}

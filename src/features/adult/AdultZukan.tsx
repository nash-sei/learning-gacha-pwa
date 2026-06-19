/*
 * 大人専用ずかん（初級ルーレットで当てたモンスターの一覧）
 * - 子供図鑑（Zukan.tsx）と同じ見せ方：グリッド → タップで詳細（レア度＋説明）。
 *   ただし説明は大人向け（adultBlurbs）。表示元は大人専用データ（zukan: monsterId[]）。
 * - DANGER限定モンスターは大人ルーレットに出ないので一覧から除外。子供のデータには触らない。
 */
import { useState } from 'react'
import type { MonsterDef } from '../../types'
import { MONSTERS } from '../../data/monsters'
import { RARITY_COLOR, RARITY_LABEL } from '../../lib/constants'
import { ADULT_BLURBS } from '../../data/adultBlurbs'
import { audio } from '../../lib/audio'
import MonsterSprite from '../../components/MonsterSprite'
import Dialog from '../../components/Dialog'

interface Props {
  zukan: string[]
  onBack: () => void
}

const ADULT_BG = 'linear-gradient(to bottom, #24344d, #141d2e)'

export default function AdultZukan({ zukan, onBack }: Props) {
  const owned = new Set(zukan)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 子供図鑑と同じ並び（収録順）。DANGERは大人ルーレットに出ないので除外
  const list = MONSTERS.filter((m) => !m.isDanger)
  const ownedCount = list.filter((m) => owned.has(m.id)).length

  const selected: MonsterDef | undefined = selectedId
    ? MONSTERS.find((m) => m.id === selectedId)
    : undefined
  const selectedOwned = selectedId ? owned.has(selectedId) : false

  return (
    <div className="mx-auto min-h-dvh max-w-3xl p-4" style={{ background: ADULT_BG }}>
      {/* ヘッダー */}
      <header className="mb-4 flex items-center justify-between gap-3">
        <button
          aria-label="もどる"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white shadow-md active:scale-90"
          onClick={() => {
            audio.playSe('tap')
            onBack()
          }}
        >
          ←
        </button>
        <h1 className="text-2xl font-extrabold text-white">📖 大人ずかん</h1>
        <span className="rounded-full bg-white/15 px-3 py-2 text-base font-extrabold text-white">
          {ownedCount}/{list.length}
        </span>
      </header>

      {/* グリッド */}
      <div className="grid grid-cols-3 gap-3 pb-8 sm:grid-cols-4">
        {list.map((def) => {
          const has = owned.has(def.id)
          return (
            <button
              key={def.id}
              className="flex flex-col items-center gap-1 rounded-2xl border-2 border-white/15 bg-white/10 p-3 active:scale-95"
              onClick={() => {
                audio.playSe('tap')
                setSelectedId(def.id)
              }}
            >
              <MonsterSprite monsterId={def.id} stage={1} size={64} silhouette={!has} />
              <span className="text-center text-sm font-extrabold text-white">
                {has ? def.name : '？？？'}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-extrabold text-white"
                style={{ backgroundColor: RARITY_COLOR[def.rarity] }}
              >
                {RARITY_LABEL[def.rarity]}
              </span>
            </button>
          )
        })}
      </div>

      {/* 詳細 Dialog（子供図鑑と同じ作り・説明は大人向け） */}
      <Dialog
        open={selected !== undefined}
        title={selected && selectedOwned ? selected.name : '？？？'}
        onClose={() => setSelectedId(null)}
        actions={
          <button
            className="btn-kid bg-[var(--color-ink-faint)] text-xl"
            onClick={() => {
              audio.playSe('tap')
              setSelectedId(null)
            }}
          >
            とじる
          </button>
        }
      >
        {selected && (
          <div className="flex flex-col items-center gap-3 text-center">
            <MonsterSprite
              monsterId={selected.id}
              stage={1}
              size={140}
              silhouette={!selectedOwned}
            />
            <span
              className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
              style={{ backgroundColor: RARITY_COLOR[selected.rarity] }}
            >
              {RARITY_LABEL[selected.rarity]}
            </span>
            {selectedOwned ? (
              <p className="leading-relaxed">{ADULT_BLURBS[selected.id] ?? selected.blurb}</p>
            ) : (
              <p className="leading-relaxed text-[var(--color-ink-soft)]">
                まだ手に入れていないモンスターです。大人クイズで7〜9問正解し、初級ルーレットで探してみましょう。
              </p>
            )}
          </div>
        )}
      </Dialog>
    </div>
  )
}

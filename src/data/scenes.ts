/*
 * 共通場面ライブラリ（spec §5-2 / §5-4）
 * - scene-pick（理解チェック）と figure: { type: 'scene' } の両方から ID 参照される
 * - ID は問題データ側と固定合意（変更禁止）
 * - 絵は「場面をつかむ」ための抽象度で、答えを直接教えない（spec §5-2）
 * - 画像は public/scenes/<id>.svg（現状プレースホルダ。本番は Codex Image2 → 512px WebP に差し替え）
 */
import type { SceneDef } from '../types'

export const SCENES: SceneDef[] = [
  {
    id: 'scene-shopping',
    label: 'かいもの',
    tags: ['かいもの', 'おみせ', 'おかね'],
  },
  {
    id: 'scene-park',
    label: 'こうえん',
    tags: ['こうえん', 'あそび', 'そと'],
  },
  {
    id: 'scene-classroom',
    label: 'きょうしつ',
    tags: ['きょうしつ', 'がっこう', 'べんきょう'],
  },
  {
    id: 'scene-animals',
    label: 'どうぶつ',
    tags: ['どうぶつ', 'いきもの'],
  },
  {
    id: 'scene-food',
    label: 'たべもの',
    tags: ['たべもの', 'ごはん'],
  },
  {
    id: 'scene-garden',
    label: 'にわ・はたけ',
    tags: ['にわ', 'はたけ', 'しょくぶつ', 'やさい'],
  },
  {
    id: 'scene-bus',
    label: 'バス',
    tags: ['バス', 'のりもの'],
  },
  {
    id: 'scene-snack',
    label: 'おやつ',
    tags: ['おやつ', 'たべもの'],
  },
  {
    id: 'scene-toys',
    label: 'おもちゃ',
    tags: ['おもちゃ', 'あそび'],
  },
  {
    id: 'scene-rain',
    label: 'あめ',
    tags: ['あめ', 'てんき'],
  },
]

/** id から場面定義を引く（見つからなければ undefined） */
export function getScene(id: string): SceneDef | undefined {
  return SCENES.find((s) => s.id === id)
}

/** 場面絵の URL を返す（public/scenes/ 同梱・外部URL禁止＝spec §1-3） */
export function sceneAsset(id: string): string {
  return `/scenes/${id}.svg`
}

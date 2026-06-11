/*
 * モンスター図鑑マスター（spec §7・固定24体）
 * - レア度内訳: N=10 / R=8 / SR=5 / UR=1
 * - 全て完全オリジナル（自然・属性モチーフの造語名。実在キャラへの類似禁止＝spec §1-8）
 * - 画像は public/monsters/<id>.webp（Codex Image2 で生成 → 512px 透過 WebP・1体80KB以下。2026-06-12 本番差し替え済み）
 * - stages: SR/UR は 2（進化＝同一IDのまま stage が上がる方式・spec §7。1.0 では画像1枚で運用）
 */
import type { MonsterDef } from '../types'

export const MONSTERS: MonsterDef[] = [
  // ===== N（10体）=====
  {
    id: 'm01',
    name: 'ハッパル',
    rarity: 'N',
    blurb: 'はっぱのぼうしが じまんの もりのこ。',
    stages: 1,
  },
  {
    id: 'm02',
    name: 'シズクル',
    rarity: 'N',
    blurb: 'あさつゆから うまれた ちいさな しずく。',
    stages: 1,
  },
  {
    id: 'm03',
    name: 'モクモッコ',
    rarity: 'N',
    blurb: 'ふわふわの くもみたいな からだで おひるねが だいすき。',
    stages: 1,
  },
  {
    id: 'm04',
    name: 'イシコロン',
    rarity: 'N',
    blurb: 'ころころ ころがる げんきな いしのこ。',
    stages: 1,
  },
  {
    id: 'm05',
    name: 'タンポポン',
    rarity: 'N',
    blurb: 'かぜに のせて たねを とばすのが とくい。',
    stages: 1,
  },
  {
    id: 'm06',
    name: 'カゼリン',
    rarity: 'N',
    blurb: 'そよかぜと いっしょに おさんぽ している。',
    stages: 1,
  },
  {
    id: 'm07',
    name: 'ドングリン',
    rarity: 'N',
    blurb: 'どんぐりを あつめて かくすのが しゅみ。',
    stages: 1,
  },
  {
    id: 'm08',
    name: 'コケマル',
    rarity: 'N',
    blurb: 'しめった いわばで のんびり くらしている。',
    stages: 1,
  },
  {
    id: 'm09',
    name: 'ユキピヨ',
    rarity: 'N',
    blurb: 'ゆきのひに あらわれる さむがりやの こ。',
    stages: 1,
  },
  {
    id: 'm10',
    name: 'ツチコロ',
    rarity: 'N',
    blurb: 'つちのなかで もぞもぞ トンネルを ほる。',
    stages: 1,
  },
  // ===== R（8体）=====
  {
    id: 'm11',
    name: 'アクアルン',
    rarity: 'R',
    blurb: 'およぎが とくいで みずたまりが だいすき。',
    stages: 1,
  },
  {
    id: 'm12',
    name: 'ホノコロ',
    rarity: 'R',
    blurb: 'ぽかぽかの ほのおで みんなを あたためる。',
    stages: 1,
  },
  {
    id: 'm13',
    name: 'ハナリン',
    rarity: 'R',
    blurb: 'はなびらの ドレスで くるくる おどる。',
    stages: 1,
  },
  {
    id: 'm14',
    name: 'ゴロリン',
    rarity: 'R',
    blurb: 'かみなりの ちからで びりびり ひかる。',
    stages: 1,
  },
  {
    id: 'm15',
    name: 'コオリン',
    rarity: 'R',
    blurb: 'つめたい こおりの からだが きらきら ひかる。',
    stages: 1,
  },
  {
    id: 'm16',
    name: 'スナボウ',
    rarity: 'R',
    blurb: 'さばくの すなやまで かくれんぼ している。',
    stages: 1,
  },
  {
    id: 'm17',
    name: 'キノポン',
    rarity: 'R',
    blurb: 'あめあがりの もりに ぴょこんと はえてくる。',
    stages: 1,
  },
  {
    id: 'm18',
    name: 'ホタルン',
    rarity: 'R',
    blurb: 'よるに なると おしりが ぽうっと ひかる。',
    stages: 1,
  },
  // ===== SR（5体・進化2段階）=====
  {
    id: 'm19',
    name: 'ツキミミン',
    rarity: 'SR',
    blurb: 'つきのひかりを あびて しずかに うたう。',
    stages: 2,
  },
  {
    id: 'm20',
    name: 'ヒダマリン',
    rarity: 'SR',
    blurb: 'ひだまりの ぬくもりを からだに ためている。',
    stages: 2,
  },
  {
    id: 'm21',
    name: 'ホシノコ',
    rarity: 'SR',
    blurb: 'ながれぼしから うまれた ほしのこども。',
    stages: 2,
  },
  {
    id: 'm22',
    name: 'オーロラン',
    rarity: 'SR',
    blurb: 'よぞらに ひかりの カーテンを かける。',
    stages: 2,
  },
  {
    id: 'm23',
    name: 'ソラリュン',
    rarity: 'SR',
    blurb: 'おおぞらを じゆうに とびまわる そらのこ。',
    stages: 2,
  },
  // ===== UR（1体・進化2段階）=====
  {
    id: 'm24',
    name: 'ニジマール',
    rarity: 'UR',
    blurb: 'あめあがりの にじに すむ でんせつの モンスター。',
    stages: 2,
  },
]

/** id からモンスター定義を引く（見つからなければ undefined） */
export function getMonster(id: string): MonsterDef | undefined {
  return MONSTERS.find((m) => m.id === id)
}

/**
 * モンスター画像の URL を返す（public/monsters/ 同梱・外部URL禁止＝spec §1-3）。
 * @param _stage 将来用（進化で見た目が変わる第2弾以降。1.0 では未使用）
 */
export function monsterSprite(monsterId: string, _stage?: number): string {
  return `/monsters/${monsterId}.webp`
}

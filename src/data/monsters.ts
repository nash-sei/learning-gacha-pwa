/*
 * モンスター図鑑マスター（spec §7 を 2026-06-13 社長提案で全51体に拡張）
 * - レア度内訳: N=20 / R=16 / SR=11 / UR=4
 *   - 第1弾 m01-m24（N10/R8/SR5/UR1）＝既存
 *   - 第2弾 m25-m51（N10/R8/SR6/UR3）＝社長提案『思いついたモンスターの提案.md』準拠（2026-06-13）
 * - 全て完全オリジナル（自然・属性モチーフの造語名。実在キャラへの類似禁止＝spec §1-8）
 * - 画像は public/monsters/<id>.webp（Codex Image2 で生成 → 512px 透過 WebP・1体80KB以下）
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

  // ========== 第2弾 m25-m51（社長提案・2026-06-13）==========
  // ===== N（10体・虫/フルーツ/現象/植物/魚 各2）=====
  {
    id: 'm25',
    name: 'チョウリン',
    rarity: 'N',
    blurb: 'はなから はなへ ひらひら とぶ ちょうちょの こ。',
    stages: 1,
  },
  {
    id: 'm26',
    name: 'カブトン',
    rarity: 'N',
    blurb: 'りっぱな つのが じまんの かぶとむしの こ。',
    stages: 1,
  },
  {
    id: 'm27',
    name: 'ドラゴルン',
    rarity: 'N',
    blurb: 'ドラゴンフルーツから うまれた ちいさな りゅうの こ。',
    stages: 1,
  },
  {
    id: 'm28',
    name: 'クワガース',
    rarity: 'N',
    blurb: 'りっぱな おおあごが じまんの クワガタの こ。カブトンの ライバル。',
    stages: 1,
  },
  {
    id: 'm29',
    name: 'アワワン',
    rarity: 'N',
    blurb: 'いきを ふくと シャボンだまが ぷかぷか とびだす。',
    stages: 1,
  },
  {
    id: 'm30',
    name: 'ユゲポン',
    rarity: 'N',
    blurb: 'おふろや ラーメンから ふわっと うまれる ゆげの こ。',
    stages: 1,
  },
  {
    id: 'm31',
    name: 'ヨツバン',
    rarity: 'N',
    blurb: 'よつばの クローバーを みつけると あらわれる しあわせの こ。',
    stages: 1,
  },
  {
    id: 'm32',
    name: 'サボリン',
    rarity: 'N',
    blurb: 'さばくで のんびり みずを ためている サボテンの こ。',
    stages: 1,
  },
  {
    id: 'm33',
    name: 'キンギョン',
    rarity: 'N',
    blurb: 'あかい ひれを ひらひら およがせる きんぎょの こ。',
    stages: 1,
  },
  {
    id: 'm34',
    name: 'プクフグ',
    rarity: 'N',
    blurb: 'びっくりすると まんまるに ふくらむ ふぐの こ。',
    stages: 1,
  },
  // ===== R（8体・社長提案）=====
  {
    id: 'm35',
    name: 'ツララン',
    rarity: 'R',
    blurb: 'のきさきに ぶらさがる つめたい つららの こ。',
    stages: 1,
  },
  {
    id: 'm36',
    name: 'ヒューイ',
    rarity: 'R',
    blurb: 'そよかぜに のって どこへでも とんでいく かぜの ようせい。',
    stages: 1,
  },
  {
    id: 'm37',
    name: 'パンタラン',
    rarity: 'R',
    blurb: 'なかから ひかる かぼちゃの ランタンおばけ。',
    stages: 1,
  },
  {
    id: 'm38',
    name: 'オパールン',
    rarity: 'R',
    blurb: 'かいがらの なかに にじいろの しんじゅを だいじに もつ。',
    stages: 1,
  },
  {
    id: 'm39',
    name: 'シャードン',
    rarity: 'R',
    blurb: 'かべや ゆかの かげに そっと ひそむ おばけ。',
    stages: 1,
  },
  {
    id: 'm40',
    name: 'ドキバコン',
    rarity: 'R',
    blurb: 'ふたを あけると ピエロが とびだす びっくりばこ。',
    stages: 1,
  },
  {
    id: 'm41',
    name: 'キーダス',
    rarity: 'R',
    blurb: 'どんな とびらも あける ふしぎな かぎの せいれい。',
    stages: 1,
  },
  {
    id: 'm42',
    name: 'カメダイル',
    rarity: 'R',
    blurb: 'せなかに おおきな きが そだった ながいきの おおがめ。',
    stages: 1,
  },
  // ===== SR（6体・社長提案・進化2段階）=====
  {
    id: 'm43',
    name: 'クリスタラン',
    rarity: 'SR',
    blurb: 'すいしょうの からだが きらきら ひかる さそりの モンスター。',
    stages: 2,
  },
  {
    id: 'm44',
    name: 'ミカヅキン',
    rarity: 'SR',
    blurb: 'みかづきの かたちに かがやく よぞらの ほし。',
    stages: 2,
  },
  {
    id: 'm45',
    name: 'ナイトメア',
    rarity: 'SR',
    blurb: 'ねむると こわい ゆめを みせてくる いたずらおばけ。',
    stages: 2,
  },
  {
    id: 'm46',
    name: 'ホロホロキング',
    rarity: 'SR',
    blurb: 'おうかんを かたむけて かぶる がいこつの おうさま。',
    stages: 2,
  },
  {
    id: 'm47',
    name: 'シュースター',
    rarity: 'SR',
    blurb: 'あおい ほのおを まとい すいせいのように とぶ ドラゴン。',
    stages: 2,
  },
  {
    id: 'm48',
    name: 'サイガストン',
    rarity: 'SR',
    blurb: 'おおきな くちで なんでも のみこむ きずだらけの きょだいザメ。',
    stages: 2,
  },
  // ===== UR（3体・社長提案・進化2段階）=====
  {
    id: 'm49',
    name: 'ガリバーン',
    rarity: 'UR',
    blurb: 'むかしから いきつづける でんせつの こりゅう、ドラゴンの おう。',
    stages: 2,
  },
  {
    id: 'm50',
    name: 'イルヘルミナ',
    rarity: 'UR',
    blurb: 'もりを まもる うつくしい ようせいの じょおう。',
    stages: 2,
  },
  {
    id: 'm51',
    name: 'エンバイアー',
    rarity: 'UR',
    blurb: 'そらに かがやく たいようの かみさま。',
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

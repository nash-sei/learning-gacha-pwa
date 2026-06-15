/*
 * DANGER討伐イベント専用の難問プール（追加機能1-C）
 * - 通常クイズとは別の「難問」セット。ここからランダムに3問出題する。
 * - difficulty は全て 'hard'（DANGERは難問固定）。小2・小3／算数＋国語ミックス。
 * - explain は「例ヒント」＝答えそのものではなく、別の例で解き方を示すサポート（spec 追加機能1-C）。
 *
 * 🚧 Phase 1（仮）＝6問。Phase 2で「全国テスト参考の20問」に拡充する。
 */
import type { Question } from '../../types'

export const PACK_DANGER: Question[] = [
  {
    id: 'dg-0001',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'hard',
    text: '1はこに 12こ 入りの チョコが 5はこ あります。そのうち 18こ たべました。のこりは なんこ？',
    answer: { kind: 'number', value: 42, unit: 'こ' },
    explain: [
      'まず ぜんぶの かずを かんがえよう。たとえば 1はこ10こが3はこなら 10×3=30こ。',
      'ぜんぶの かずが わかったら、たべた かずを ひくよ。',
      'こたえは じぶんで けいさんしてみよう！',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0002',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'hard',
    text: 'バスに 28人 のっています。つぎの ていりゅうじょで 9人 おりて、15人 のってきました。いま なんにん？',
    answer: { kind: 'number', value: 34, unit: 'にん' },
    explain: [
      'じゅんばんに かんがえよう。たとえば 20人いて 5人おりたら 20-5=15人。',
      'おりた あとで、のってきた 人を たすよ。',
      'ひとつずつ せいりすれば できる！',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0003',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: '1m は 100cm です。3m50cm は なんcm？',
    answer: { kind: 'choice', options: ['350cm', '305cm', '3500cm'], correct: 0 },
    explain: [
      '1m=100cm だよ。たとえば 2m なら 100×2=200cm。',
      'のこりの cm を そのまま たすよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0004',
    subject: 'japanese',
    type: 'order',
    grade: 2,
    difficulty: 'hard',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう。',
    answer: { kind: 'order', tokens: ['きのう', 'こうえんで', 'ともだちと', 'あそびました'] },
    explain: [
      '「いつ」→「どこで」→「だれと」→「どうした」の じゅんが きほん。',
      'たとえば 「あさ／いえで／ほんを／よみました」の かたち。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0005',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'hard',
    text: '「あたまを かかえる」は どんな いみ？',
    answer: {
      kind: 'choice',
      options: ['こまって なやむ', 'うれしくて はしゃぐ', 'ねむくて あくびする'],
      correct: 0,
    },
    explain: [
      'こまった ときの ようすを あらわす ことばだよ。',
      'たとえば むずかしい もんだいが とけなくて こまった ようす。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0006',
    subject: 'math',
    type: 'money',
    grade: 3,
    difficulty: 'hard',
    text: '300円 もって、1こ 80円の グミを 3こ かいました。おつりは なんえん？',
    answer: { kind: 'number', value: 60, unit: 'えん' },
    explain: [
      'まず ぜんぶの ねだんを かんがえよう。たとえば 50円が2こなら 50×2=100円。',
      'もっていた おかねから、はらった ぶんを ひくよ。',
    ],
    pack: 'danger',
  },
]

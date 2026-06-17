/*
 * DANGER討伐イベント専用の難問プール（追加機能1-C / Phase 2 本番＝20問）。
 * - 通常クイズとは別の「難問」セット。ここから selectQuestions で grade に合う hard を3問出題する。
 * - difficulty は全て 'hard'（DANGERは難問固定）。小2×10（算数6・国語4）／小3×10（算数6・国語4）。
 *
 * 🚨 DANGER 固有のヒント規約（最重要・前回検証の申し送り）：
 *   DANGER画面は explain[0] の1行だけを折り畳みヒントとして常時表示し、1問でも間違えたら即終了する。
 *   → explain[0] は「答えそのもの」を書かない。別の数・別の例で“解き方”だけを示すこと。
 *   explain[1] 以降も DANGER では表示されないが、答えの数値は書かない方針で統一する（自分で解いて倒す体験）。
 * - check（理解チェック）は DANGER画面では描画されないため付けない。
 * - 数字入力は 1〜9999 の正の整数のみ（マイナス・小数・0先頭なし）。
 * - 漢字の読み／どの漢字を問う設問は、答えになる漢字にルビを付けない（読ませるため）。type は 'vocab'。
 */
import type { Question } from '../../types'

export const PACK_DANGER: Question[] = [
  // ============================================================
  // 小2 むずかしい：算数 6問
  // ============================================================
  {
    id: 'dg-0001',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'hard',
    text: '67 + 58 は いくつ？',
    answer: { kind: 'number', value: 125 },
    explain: [
      'くらいごとに たそう。たとえば 25+38なら 5+8=13、20+30=50で あわせて63。一のくらいの くり上がりに きをつけて。',
      '一のくらいから たして、十のくらいに 1 くり上げるよ。じぶんで けいさんしてみよう！',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0002',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'hard',
    text: 'おりがみが 32まい ありました。15まい つかって、そのあと 9まい もらいました。いま なんまい？',
    answer: { kind: 'number', value: 26, unit: 'まい' },
    explain: [
      'じゅんに かんがえよう。たとえば 20まいから 5まい つかうと 15まい、そこに 4まい もらうと 19まい。',
      'まず つかった ぶんを ひいて、つぎに もらった ぶんを たすよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0003',
    subject: 'math',
    type: 'money',
    grade: 2,
    difficulty: 'hard',
    text: '100円玉が 1つ、10円玉が 6つ、5円玉が 2つ あります。ぜんぶで なん円？',
    answer: { kind: 'number', value: 170, unit: 'えん' },
    explain: [
      'おなじ こうかごとに まとめて かぞえよう。たとえば 10円玉が 4つなら 40円、5円玉が 3つなら 15円。',
      '100円・10円のぶん・5円のぶんを さいごに ぜんぶ たすよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0004',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'hard',
    text: '□ - 8 = 17 の □に 入る かずは いくつ？',
    answer: { kind: 'number', value: 25 },
    explain: [
      'ひきざんの ぎゃくは たしざん。たとえば □-2=5 なら 5+2=7 で □は7。',
      'こたえの 17に、ひいた 8を たすと □が わかるよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0005',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'hard',
    text: '1はこに 8こ 入った クッキーが 4はこ あります。そこから 5こ たべました。のこりは なんこ？',
    answer: { kind: 'number', value: 27, unit: 'こ' },
    explain: [
      'まず かけざんで ぜんぶの かずを だして、たべた ぶんを ひくよ。たとえば 1はこ5こが2はこで 5×2=10こ、1こ たべたら 9こ。',
      'はこの かず ぜんぶを だしてから、たべた かずを ひくと のこりだよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0006',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'hard',
    text: '赤い 花が 6本、白い 花は 赤い 花の 3ばい あります。花は あわせて なん本？',
    answer: { kind: 'number', value: 24, unit: '本' },
    explain: [
      '「○ばい」は かけざんだよ。たとえば 4本の 2ばいは 4×2=8本。',
      '白い 花の かずを だしてから、赤い 花と あわせて たすよ。',
    ],
    pack: 'danger',
  },

  // ============================================================
  // 小2 むずかしい：国語 4問
  // ============================================================
  {
    id: 'dg-0007',
    subject: 'japanese',
    type: 'order',
    grade: 2,
    difficulty: 'hard',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう。',
    answer: { kind: 'order', tokens: ['てを', 'あらって', 'ごはんを', 'たべた'] },
    explain: [
      'さきに する ことを「〜て」で つないで、さいごに「どうした」で おわるよ。',
      'たとえば 「かおを あらって はを みがいた」の かたち。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0008',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'hard',
    text: '「手を かす」は どんな いみ？',
    answer: {
      kind: 'choice',
      options: ['人を てつだう', '手を あらう', '手を たかく あげる'],
      correct: 0,
    },
    explain: [
      'これは「かんようく」という とくべつな いいかた。こまっている 人に 手を さしのべる ようすを おもいうかべよう。',
      'てを じっさいに あらう いみでは ないよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0009',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'hard',
    text: '「日」と「月」を あわせて できる かんじは どれ？',
    answer: { kind: 'choice', options: ['明', '晴', '星'], correct: 0 },
    explain: [
      'ひ と つき、ふたつの あかりが かさなって あかるく なる ようすから できた かんじだよ。',
      '「晴」は 日と青、「星」は 日と生から できているよ。かたちを よく みくらべよう。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0010',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'hard',
    text: '「新しい」は なんと よむ？',
    answer: { kind: 'choice', options: ['あたらしい', 'すずしい', 'うつくしい'], correct: 0 },
    explain: [
      'ふるい の はんたいで、できたばかりの ようすを あらわす ことばだよ。',
      'おくりがな「しい」まで いれて よもう。すずしい や うつくしい とは ちがうよ。',
    ],
    pack: 'danger',
  },

  // ============================================================
  // 小3 むずかしい：算数 6問
  // ============================================================
  {
    id: 'dg-0011',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: '276 + 158 は いくつ？',
    answer: { kind: 'number', value: 434 },
    explain: [
      'くらいごとに たして、くり上がりを わすれずに。たとえば 145+167なら 一のくらい12・十のくらい110・百のくらい300で 312。',
      '一のくらいから じゅんに たして、くり上がりを 上の くらいに おくるよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0012',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: '1m は 100cm です。2m8cm は なんcm？',
    answer: { kind: 'choice', options: ['208cm', '280cm', '2008cm'], correct: 0 },
    explain: [
      '1m=100cm だよ。たとえば 3m5cm なら 300cm と 5cm で 305cm。',
      'm の ぶんを cm に なおして、のこりの cm を たすよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0013',
    subject: 'math',
    type: 'money',
    grade: 3,
    difficulty: 'hard',
    text: '1本 45円の えんぴつを 6本 かって、500円 はらいました。おつりは なん円？',
    answer: { kind: 'number', value: 230, unit: 'えん' },
    explain: [
      'まず かけざんで ぜんぶの ねだんを だして、はらった おかねから ひくよ。たとえば 1本30円を 4本なら 30×4=120円。',
      'えんぴつ ぜんぶの ねだんを だしてから、500円から ひくと おつりだよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0014',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'hard',
    text: 'あめが 50こ あります。8人に 6こずつ くばると、なんこ のこる？',
    answer: { kind: 'number', value: 2, unit: 'こ' },
    explain: [
      'まず くばる ぜんぶの かずを かけざんで だして、もとの かずから ひくよ。たとえば 3こずつ 4人なら 3×4=12こ くばる。',
      'くばった かずを もとめてから、はじめの 50こから ひくと のこりだよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0015',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: '□ ÷ 7 = 8 の □に 入る かずは いくつ？',
    answer: { kind: 'number', value: 56 },
    explain: [
      'わりざんの ぎゃくは かけざん。たとえば □÷4=2 なら 2×4=8 で □は8。',
      'こたえの 8に、わった かずの 7を かけると □が わかるよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0016',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: 'こたえが 9に なる わりざんは どれ？',
    answer: { kind: 'choice', options: ['72 ÷ 8', '72 ÷ 9', '54 ÷ 9'], correct: 0 },
    explain: [
      'それぞれ けいさんして、こたえが 9に なる しきを さがそう。わりざんは 九九を ぎゃくに つかうよ。',
      '8の だんや 9の だんを おもいだして たしかめよう。',
    ],
    pack: 'danger',
  },

  // ============================================================
  // 小3 むずかしい：国語 4問
  // ============================================================
  {
    id: 'dg-0017',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'hard',
    text: '「水に ながす」は どんな いみ？',
    answer: {
      kind: 'choice',
      options: ['すぎた ことを わすれて ゆるす', '水を こぼす', 'およぎが とくいだ'],
      correct: 0,
    },
    explain: [
      'これは「かんようく」。かわの 水が ながれて きえていく ようすから かんがえよう。',
      'ほんとうに 水を こぼす いみでは ないよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0018',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'hard',
    text: '「庭」は なんと よむ？',
    answer: { kind: 'choice', options: ['にわ', 'いえ', 'もん'], correct: 0 },
    explain: [
      'いえの まわりで、花や 木を そだてる ところを あらわす かんじだよ。',
      'いえ そのもの でも、いりぐちの もん でもないよ。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0019',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'hard',
    text: '「投げる」は どんな いみ？',
    answer: {
      kind: 'choice',
      options: ['ものを とおくへ ほうる', 'ものを ひろう', 'ものを かう'],
      correct: 0,
    },
    explain: [
      '「投げる」は「なげる」と よむよ。やきゅうで ボールを どうする ことか おもいだそう。',
      'ひろう とも かう とも ちがう うごきだね。',
    ],
    pack: 'danger',
  },
  {
    id: 'dg-0020',
    subject: 'japanese',
    type: 'order',
    grade: 3,
    difficulty: 'hard',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう。',
    answer: {
      kind: 'order',
      tokens: ['しゅくだいを', 'おえて', 'テレビを', 'みた'],
    },
    explain: [
      'さきに した ことを「〜て」で つないで、さいごに「どうした」で おわるよ。',
      'たとえば 「ほんを よんで かんそうを かいた」の かたち。',
    ],
    pack: 'danger',
  },
]

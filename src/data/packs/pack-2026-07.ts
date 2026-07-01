/*
 * pack-2026-07：v2 第2弾パック 50 問（算数 30・国語 20）。spec §5 / §9-4 準拠。
 * - 算数の内訳：calc 8 / word 10 / money 4 / clock 3 / shape 5
 * - 国語の内訳：story 10 / vocab 5 / order 5（全てオリジナル文）
 * - word / story には必ず check（理解チェック）を付ける。
 *   3形式ローテーション：asked-what 7 / number-tap 6 / scene-pick 7
 *   - asked-what：正解タイプ（のこり/ちがい/ぜんぶ/ばしょ/もの…）と正解 index を分散
 *   - number-tap：ダミー数字（日付・時刻）を含む問題文を 4 問混ぜる（m27-0010/0013/0016/0033）
 *   - scene-pick：options は共通場面ライブラリの sceneId（10 種から 3 択を構成）
 * - figure は 1.0 対象の tape / money / clock / shape / scene のみ使用。
 * - ふりがなはルビ記法 {漢字|かんじ}。小2問題は小2配当漢字まで。
 * - 既存 pack-2026-06 / legacy との題材・数字の重複なし（全問照合済み）。
 */
import type { Question } from '../../types'

export const PACK_2026_07: Question[] = [
  // ============================================================
  // 算数：calc（けいさん・筆算・くり上がり・九九・わり算）8問
  // ============================================================
  {
    id: 'm27-0001',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'easy',
    text: '46 + 27 は いくつかな？',
    answer: { kind: 'number', value: 73 },
    explain: [
      '一のくらいから じゅんばんに けいさんしよう。くり上がりに ちゅうい！',
      '一のくらいは 6 + 7 = 13。1 くり上がるよ',
      '十のくらいは 40 + 20 = 60。くり上がりの 10を たして 70',
      '70と 3で 73！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0002',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'easy',
    text: '81 - 36 は いくつかな？',
    answer: { kind: 'number', value: 45 },
    explain: [
      '1から 6は ひけないね。十のくらいから 10を かりてこよう',
      '11 - 6 = 5',
      'のこった 70から 30を ひいて 40。40と 5で 45！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0003',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'normal',
    text: '{九九|くく}の 9×4 は いくつかな？',
    answer: { kind: 'number', value: 36 },
    explain: [
      '9が 4こぶん という いみだよ',
      'わすれたら 4×9に ひっくりかえしても こたえは おなじ！',
      'くし 36！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0004',
    subject: 'math',
    type: 'calc',
    grade: 2,
    difficulty: 'hard',
    text: '75 + 49 は いくつかな？',
    answer: { kind: 'number', value: 124 },
    explain: [
      '一のくらい → 十のくらいの じゅんに けいさんしよう。くり上がりに ちゅうい！',
      '一のくらいは 5 + 9 = 14。1 くり上がるよ',
      '70 + 40 = 110。くり上がりの 10を たして 120',
      '120と 4で 124。百のくらいまで いったね！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0005',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'easy',
    text: '42 ÷ 6 は いくつかな？',
    answer: { kind: 'number', value: 7 },
    explain: [
      '42を 6つに おなじ かずずつ わけるよ',
      '{九九|くく}の 6のだんで かんがえよう。6×7 = 42',
      'だから こたえは 7！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0006',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'normal',
    text: '436 + 387 は いくつかな？',
    answer: { kind: 'number', value: 823 },
    explain: [
      '一のくらい → 十のくらい → 百のくらいの じゅんばんに。くり上がりを わすれずに！',
      '一のくらい：6 + 7 = 13。1 くり上がり',
      '十のくらい：3 + 8 + 1 = 12。また くり上がり',
      '百のくらい：4 + 3 + 1 = 8。こたえは 823！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0007',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'normal',
    text: '34 × 6 は いくつかな？',
    answer: { kind: 'number', value: 204 },
    explain: [
      '34を 30と 4に わけて かんがえよう',
      '30×6 = 180、4×6 = 24',
      '180 + 24 = 204！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0008',
    subject: 'math',
    type: 'calc',
    grade: 3,
    difficulty: 'hard',
    text: '52 ÷ 7 の こたえは どれ？',
    answer: {
      kind: 'choice',
      options: ['6あまり10', '7あまり3', '7あまり4'],
      correct: 1,
    },
    explain: [
      '7のだんの {九九|くく}で、52を こえない いちばん おおきな こたえを さがそう',
      '7×7 = 49。52まで あと 3 のこるね。だから 7あまり3！',
      '「あまり」は わるかず（7）より かならず ちいさく なるよ。「6あまり10」は まだ わけられるから ×',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 算数：word（ぶんしょうだい・全問 check つき）10問
  // check ローテ：AW→NT→SP→AW→NT→SP→AW→NT→SP→NT
  // ============================================================
  {
    id: 'm27-0009',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'easy',
    text: 'おりがみが 14まい あります。つるを おるのに 6まい つかいました。のこりは なんまい？',
    figure: {
      type: 'tape',
      params: {
        total: 14,
        parts: [
          { label: 'つかった', value: 6 },
          { label: 'のこり', value: 0 },
        ],
        unknown: 'part',
      },
    },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['ぜんぶの かず', 'のこりの かず', 'ちがいの かず'],
      answer: 1,
    },
    answer: { kind: 'number', value: 8, unit: 'まい' },
    explain: [
      '「のこりは？」← のこりを きいているよ',
      'ぜんぶで 14まい、つかったのは 6まい。テープずで みてみよう',
      '14 - 6 = 8。のこりは 8まい！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0010',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'easy',
    text: 'きょうは 10がつ 4にち。みかちゃんは どんぐりを 9こ ひろいました。いもうとは 7こ ひろいました。あわせて なんこ？',
    figure: {
      type: 'tape',
      params: {
        parts: [
          { label: 'みかちゃん', value: 9 },
          { label: 'いもうと', value: 7 },
        ],
        unknown: 'total',
      },
    },
    check: {
      kind: 'number-tap',
      prompt: 'いもうとが ひろった かずは どれ？',
      answerNumber: 7,
    },
    answer: { kind: 'number', value: 16, unit: 'こ' },
    explain: [
      '「10がつ 4にち」は ひづけ。けいさんには つかわないよ',
      'みかちゃんの 9こと いもうとの 7こを あわせるよ',
      '9 + 7 = 16。あわせて 16こ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0011',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'normal',
    text: 'おもちゃばこに ミニカーが 15だい あります。ともだちに 6だい かしました。のこりは なんだい？',
    figure: {
      type: 'tape',
      params: {
        total: 15,
        parts: [
          { label: 'かした', value: 6 },
          { label: 'のこり', value: 0 },
        ],
        unknown: 'part',
      },
    },
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-food', 'scene-toys', 'scene-rain'],
      answer: 1,
    },
    answer: { kind: 'number', value: 9, unit: 'だい' },
    explain: [
      'おもちゃの おはなし。「かした」から、へるんだね',
      '15 - 6 = 9',
      'のこりは 9だい！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0012',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'normal',
    text: 'けんたくんは なわとびを 35かい とびました。あやちゃんは 28かい とびました。けんたくんは あやちゃんより なんかい おおく とんだ？',
    figure: {
      type: 'tape',
      params: {
        mode: 'compare',
        parts: [
          { label: 'けんたくん', value: 35 },
          { label: 'あやちゃん', value: 28 },
        ],
      },
    },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['あわせた かず', 'のこりの かず', 'ちがいの かず'],
      answer: 2,
    },
    answer: { kind: 'number', value: 7, unit: 'かい' },
    explain: [
      '「なんかい おおく とんだ？」← ふたつの かずの ちがいだね',
      'ちがいは ひきざんで もとめるよ',
      '35 - 28 = 7。けんたくんが 7かい おおい！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0013',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'easy',
    text: 'あさ 8じに がっこうに つきました。きょうしつの ほんだなには ほんが 25さつ あります。あたらしい ほんが 6さつ ふえました。ぜんぶで なんさつ？',
    figure: {
      type: 'tape',
      params: {
        parts: [
          { label: 'はじめ', value: 25 },
          { label: 'ふえた', value: 6 },
        ],
        unknown: 'total',
      },
    },
    check: {
      kind: 'number-tap',
      prompt: 'ふえた ほんの かずは どれ？',
      answerNumber: 6,
    },
    answer: { kind: 'number', value: 31, unit: 'さつ' },
    explain: [
      '「あさ 8じ」は じこく。けいさんには つかわないよ',
      'はじめの 25さつに、ふえた 6さつを たすよ',
      '25 + 6 = 31。ぜんぶで 31さつ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0014',
    subject: 'math',
    type: 'word',
    grade: 2,
    difficulty: 'hard',
    text: 'ずこうの じかんに つかう いろがみが 30まい あります。きのう 8まい、きょう 6まい つかいました。のこりは なんまい？',
    figure: {
      type: 'tape',
      params: {
        total: 30,
        parts: [
          { label: 'きのう', value: 8 },
          { label: 'きょう', value: 6 },
          { label: 'のこり', value: 0 },
        ],
        unknown: 'part',
      },
    },
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-classroom', 'scene-bus', 'scene-animals'],
      answer: 0,
    },
    answer: { kind: 'number', value: 16, unit: 'まい' },
    explain: [
      'つかったのは きのうと きょうの 2かい。まず あわせよう',
      '8 + 6 = 14まい つかったね',
      '30 - 14 = 16。のこりは 16まい！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0015',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'normal',
    text: 'おかしの はこが 6はこ あります。1はこに チョコが 8こずつ はいっています。チョコは ぜんぶで なんこ？',
    figure: {
      type: 'tape',
      params: {
        parts: [
          { label: 'はこ', value: 8 },
          { label: 'はこ', value: 8 },
          { label: 'はこ', value: 8 },
          { label: 'はこ', value: 8 },
          { label: 'はこ', value: 8 },
          { label: 'はこ', value: 8 },
        ],
        unknown: 'total',
      },
    },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['ぜんぶの かず', 'ひとつ分の かず', 'ちがいの かず'],
      answer: 0,
    },
    answer: { kind: 'number', value: 48, unit: 'こ' },
    explain: [
      '「ぜんぶで なんこ？」← ぜんぶの かずを きいているよ',
      'おなじ かずが 6はこぶんだから かけざんだね',
      '8×6 = 48。ぜんぶで 48こ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0016',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'hard',
    text: 'きょうは 11がつ 18にち。さつまいもほりで おいもが 36こ とれました。4にんで おなじ かずずつ わけると、ひとりぶんは なんこ？',
    figure: {
      type: 'tape',
      params: {
        total: 36,
        parts: [
          { label: 'ひとりぶん', value: 0 },
          { label: 'ひとりぶん', value: 0 },
          { label: 'ひとりぶん', value: 0 },
          { label: 'ひとりぶん', value: 0 },
        ],
        unknown: 'part',
      },
    },
    check: {
      kind: 'number-tap',
      prompt: 'とれた おいもの かずは どれ？',
      answerNumber: 36,
    },
    answer: { kind: 'number', value: 9, unit: 'こ' },
    explain: [
      '「11がつ 18にち」は ひづけ。けいさんには つかわないよ',
      'おなじ かずずつ わけるから わりざん。36 ÷ 4 だね',
      '9×4 = 36 だから、ひとりぶんは 9こ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0017',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'hard',
    text: 'パンやさんで 1こ 90えんの ドーナツを 3こ かいました。300えん はらうと、おつりは なんえん？',
    figure: {
      type: 'tape',
      params: {
        total: 300,
        parts: [
          { label: 'ドーナツ', value: 90 },
          { label: 'ドーナツ', value: 90 },
          { label: 'ドーナツ', value: 90 },
          { label: 'おつり', value: 0 },
        ],
        unknown: 'part',
      },
    },
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-garden', 'scene-shopping', 'scene-bus'],
      answer: 1,
    },
    answer: { kind: 'number', value: 30, unit: 'えん' },
    explain: [
      'まず ドーナツ 3こぶんの おだいを けいさんしよう。おつりは そのあとだよ',
      'ドーナツだいは 90×3 = 270えん',
      'おつりは 300 - 270 = 30えん。2だんかいで とけたね！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0018',
    subject: 'math',
    type: 'word',
    grade: 3,
    difficulty: 'hard',
    text: 'バスに 23にん のっています。バスていで 7にん おりて、4にん のってきました。いま なんにん のっている？',
    figure: { type: 'scene', params: { sceneId: 'scene-bus' } },
    check: {
      kind: 'number-tap',
      prompt: 'はじめに のっていた かずは どれ？',
      answerNumber: 23,
    },
    answer: { kind: 'number', value: 20, unit: 'にん' },
    explain: [
      'おりると へる、のると ふえるよ。じゅんばんに けいさんしよう',
      '23 - 7 = 16にん',
      '16 + 4 = 20。いま のっているのは 20にん！',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 算数：money（おかね）4問
  // ============================================================
  {
    id: 'm27-0019',
    subject: 'math',
    type: 'money',
    grade: 2,
    difficulty: 'easy',
    text: '10えんだまが 2まいと、5えんだまが 2まい あります。ぜんぶで なんえん？',
    figure: {
      type: 'money',
      params: {
        coins: [
          { yen: 10, count: 2 },
          { yen: 5, count: 2 },
        ],
      },
    },
    answer: { kind: 'number', value: 30, unit: 'えん' },
    explain: [
      '10えんの ぶんと 5えんの ぶんを わけて かぞえよう',
      '10えんが 2まいで 20えん。5えんが 2まいで 10えん',
      '20 + 10 = 30えん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0020',
    subject: 'math',
    type: 'money',
    grade: 2,
    difficulty: 'normal',
    text: '100えんだまが 1まいと、10えんだまが 6まい あります。ぜんぶで なんえん？',
    figure: {
      type: 'money',
      params: {
        coins: [
          { yen: 100, count: 1 },
          { yen: 10, count: 6 },
        ],
      },
    },
    answer: { kind: 'number', value: 160, unit: 'えん' },
    explain: [
      '100えんの ぶんと 10えんの ぶんを わけて かんがえよう',
      '10えんが 6まいで 60えん',
      '100 + 60 = 160。ぜんぶで 160えん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0021',
    subject: 'math',
    type: 'money',
    grade: 3,
    difficulty: 'normal',
    text: '500えんだまが 1まい、100えんだまが 3まい、10えんだまが 5まい あります。ぜんぶで なんえん？',
    figure: {
      type: 'money',
      params: {
        coins: [
          { yen: 500, count: 1 },
          { yen: 100, count: 3 },
          { yen: 10, count: 5 },
        ],
      },
    },
    answer: { kind: 'number', value: 850, unit: 'えん' },
    explain: [
      'おなじ こうかごとに まとめてから、さいごに ぜんぶ たそう',
      '100えんが 3まいで 300えん、10えんが 5まいで 50えん',
      '500 + 300 + 50 = 850えん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0022',
    subject: 'math',
    type: 'money',
    grade: 3,
    difficulty: 'hard',
    text: '500えんだまが 1まい あります。160えんの ジュースと 230えんの パンを かうと、のこりは なんえん？',
    figure: {
      type: 'money',
      params: {
        coins: [{ yen: 500, count: 1 }],
      },
    },
    answer: { kind: 'number', value: 110, unit: 'えん' },
    explain: [
      'まず ジュースと パンの ごうけいを けいさんしよう。のこりは そのあとだよ',
      'ごうけいは 160 + 230 = 390えん',
      '500 - 390 = 110。のこりは 110えん！',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 算数：clock（とけい）3問
  // ============================================================
  {
    id: 'm27-0023',
    subject: 'math',
    type: 'clock',
    grade: 2,
    difficulty: 'easy',
    text: 'とけいは なんじを さしているかな？',
    figure: { type: 'clock', params: { hour: 8, minute: 0 } },
    answer: { kind: 'choice', options: ['4じ', '12じ', '8じ'], correct: 2 },
    explain: [
      '「なんじ」は みじかい はりが おしえて くれるよ',
      'みじかい はりは 8、ながい はりは 12。ながい はりが 12のときは「ちょうど」だよ',
      'だから 8じ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0024',
    subject: 'math',
    type: 'clock',
    grade: 2,
    difficulty: 'normal',
    text: 'とけいは なんじはんを さしているかな？',
    figure: { type: 'clock', params: { hour: 11, minute: 30 } },
    answer: {
      kind: 'choice',
      options: ['11じはん', '12じはん', '10じはん'],
      correct: 0,
    },
    explain: [
      'ながい はりが 6を さすと「はん」（30ぷん）だよ',
      'みじかい はりは 11と 12の あいだ。まだ 12に なっていないね',
      'だから 11じはん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0025',
    subject: 'math',
    type: 'clock',
    grade: 3,
    difficulty: 'hard',
    text: 'いま 1じ40ぷんです。サッカーの れんしゅうは 2じ10ぷんに はじまります。あと なんぷんで はじまる？',
    figure: { type: 'clock', params: { hour: 1, minute: 40 } },
    answer: {
      kind: 'choice',
      options: ['70ぷん', '20ぷん', '30ぷん'],
      correct: 2,
    },
    explain: [
      '「2じに なるまで」と「2じから あと」の ふたつに わけて かんがえよう',
      '1じ40ぷんから 2じまでは 20ぷん。2じから 2じ10ぷんまでは 10ぷん',
      '20 + 10 = 30。あと 30ぷんで はじまるよ！',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 算数：shape（ずけい）5問
  // ============================================================
  {
    id: 'm27-0026',
    subject: 'math',
    type: 'shape',
    grade: 2,
    difficulty: 'easy',
    text: 'この かたちの なまえは どれ？',
    figure: { type: 'shape', params: { kind: 'square' } },
    answer: {
      kind: 'choice',
      options: ['ちょうほうけい', 'えん', 'せいほうけい'],
      correct: 2,
    },
    explain: [
      'へんの ながさを くらべて みよう。たてと よこは おなじかな？ちがうかな？',
      'かどが ぜんぶ ちょっかくで、へんの ながさが みんな おなじだね。だから せいほうけい！',
      'たてと よこが ちがう ながさなら ちょうほうけいだよ',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0027',
    subject: 'math',
    type: 'shape',
    grade: 2,
    difficulty: 'easy',
    text: 'さいころのような はこの かたちには、たいらな めんが いくつ ある？',
    figure: { type: 'scene', params: { sceneId: 'scene-toys' } },
    answer: { kind: 'number', value: 6, unit: 'つ' },
    explain: [
      'さいころの かたちを「はこの かたち」と いうよ',
      'うえと した、まえと うしろ、みぎと ひだりで…',
      'めんは ぜんぶで 6つ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0028',
    subject: 'math',
    type: 'shape',
    grade: 3,
    difficulty: 'normal',
    text: 'へんの ながさが 7cmの せいほうけいが あります。まわりの ながさは なんcm？',
    figure: {
      type: 'shape',
      params: { kind: 'square', sides: [7], labels: ['7cm'] },
    },
    answer: { kind: 'number', value: 28, unit: 'cm' },
    explain: [
      'せいほうけいは 4つの へんが みんな おなじ ながさだよ',
      '7cmの へんが 4ほんぶん。7 + 7 + 7 + 7 だね',
      'こたえは 28cm！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0029',
    subject: 'math',
    type: 'shape',
    grade: 3,
    difficulty: 'normal',
    text: 'へんの ながさが 4cm、6cm、6cmの さんかくけいが あります。この かたちの なまえは どれ？',
    figure: {
      type: 'shape',
      params: { kind: 'triangle', sides: [4, 6, 6], labels: ['4cm', '6cm', '6cm'] },
    },
    answer: {
      kind: 'choice',
      options: ['にとうへんさんかくけい', 'せいさんかくけい', 'ちょっかくさんかくけい'],
      correct: 0,
    },
    explain: [
      '3つの へんの ながさを よーく くらべて みよう。きづく ことは あるかな？',
      '6cmの へんが 2ほん あるね。2つの へんが おなじ ながさの さんかくけいを にとうへんさんかくけいと いうよ',
      '3つ ぜんぶ おなじなら せいさんかくけいだね',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0030',
    subject: 'math',
    type: 'shape',
    grade: 3,
    difficulty: 'hard',
    text: 'まわりの ながさが 24cmの せいほうけいが あります。1ぺんの ながさは なんcm？',
    figure: { type: 'shape', params: { kind: 'square' } },
    answer: { kind: 'number', value: 6, unit: 'cm' },
    explain: [
      'せいほうけいの 4つの へんは みんな おなじ ながさだよ',
      'まわりの ながさ 24cmを 4つに わけよう。24 ÷ 4 だね',
      '1ぺんは 6cm！',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 国語：story（みじかいおはなし読解・全問 check つき）10問
  // check ローテ：SP→AW→NT→SP→AW→SP→NT→AW→SP→AW
  // ============================================================
  {
    id: 'm27-0031',
    subject: 'japanese',
    type: 'story',
    grade: 2,
    difficulty: 'easy',
    text: 'うさぎの ミミは、はたけで にんじんを 3ぼん ぬきました。おかあさんと いっしょに サラダに して たべました。\nミミが ぬいた やさいは なに？',
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-garden', 'scene-bus', 'scene-toys'],
      answer: 0,
    },
    answer: { kind: 'choice', options: ['にんじん', 'じゃがいも', 'たまねぎ'], correct: 0 },
    explain: [
      '「ぬいた やさいは？」← やさいの なまえを きいているよ',
      '「にんじんを 3ぼん ぬきました」と かいてあるね',
      'こたえは にんじん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0032',
    subject: 'japanese',
    type: 'story',
    grade: 2,
    difficulty: 'easy',
    text: 'たろうくんは おひるに サンドイッチを たべました。たまごの サンドイッチが いちばん すきです。\nたろうくんが たべたのは なに？',
    figure: { type: 'scene', params: { sceneId: 'scene-food' } },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['たべた もの', 'たべた ばしょ', 'たべた じかん'],
      answer: 0,
    },
    answer: { kind: 'choice', options: ['おにぎり', 'サンドイッチ', 'うどん'], correct: 1 },
    explain: [
      '「たべたのは なに？」← たべた ものを きいているよ',
      '「サンドイッチを たべました」と かいてあるね',
      'こたえは サンドイッチ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0033',
    subject: 'japanese',
    type: 'story',
    grade: 2,
    difficulty: 'normal',
    text: 'みおちゃんは あさ 7じに おきました。あさごはんの あと、いもうとと カードあそびを しました。みおちゃんの カードは 5まい、いもうとの カードは 8まいです。\nカードが おおいのは どっち？',
    check: {
      kind: 'number-tap',
      prompt: 'いもうとの カードの かずは どれ？',
      answerNumber: 8,
    },
    answer: {
      kind: 'choice',
      options: ['みおちゃん', 'いもうと', 'おなじ かず'],
      correct: 1,
    },
    explain: [
      '「7じ」は おきた じかん。くらべっこには つかわないよ',
      'みおちゃんは 5まい、いもうとは 8まい',
      '8の ほうが おおきいから、いもうとの ほうが おおい！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0034',
    subject: 'japanese',
    type: 'story',
    grade: 2,
    difficulty: 'easy',
    text: 'ゆうきくんは おもちゃばこから ロボットを だして あそびました。かたづけの じかんに、ロボットを はこに もどしました。\nゆうきくんは なにで あそんだ？',
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-snack', 'scene-park', 'scene-toys'],
      answer: 2,
    },
    answer: { kind: 'choice', options: ['ロボット', 'つみき', 'ぬいぐるみ'], correct: 0 },
    explain: [
      '「なにで あそんだ？」← あそんだ ものを きいているよ',
      '「ロボットを だして あそびました」と かいてあるね',
      'こたえは ロボット！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0035',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'hard',
    text: 'はるとくんは {図書館|としょかん}で むしの {本|ほん}を かりました。いえに かえって、おねえちゃんと いっしょに よみました。カブトムシの ページが いちばん おもしろかったです。\nはるとくんは どこで ほんを かりた？',
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['ほんの なまえ', 'ほんを かりた ばしょ', 'いっしょに よんだ ひと'],
      answer: 1,
    },
    answer: { kind: 'choice', options: ['がっこう', 'としょかん', 'ほんや'], correct: 1 },
    explain: [
      '「どこで かりた？」← ばしょを きいているよ',
      '「としょかんで むしの ほんを かりました」と かいてあるね',
      'こたえは としょかん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0036',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'easy',
    text: 'あめが やんで、{空|そら}に にじが でました。さきちゃんは おかあさんを よんで、ふたりで にじを みました。\nそらに でたのは なに？',
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-rain', 'scene-shopping', 'scene-classroom'],
      answer: 0,
    },
    answer: { kind: 'choice', options: ['ほし', 'つき', 'にじ'], correct: 2 },
    explain: [
      '「そらに でたのは？」← そらに でた ものを きいているよ',
      '「そらに にじが でました」と かいてあるね',
      'こたえは にじ！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0037',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'hard',
    text: 'スーパーで りんごが ひとふくろ 350えんで うられています。ななさんは 500えんを はらって、りんごを ひとふくろ かいました。\nおつりは なんえん？',
    figure: { type: 'scene', params: { sceneId: 'scene-shopping' } },
    check: {
      kind: 'number-tap',
      prompt: 'りんごの ねだんは どれ？',
      answerNumber: 350,
    },
    answer: { kind: 'number', value: 150, unit: 'えん' },
    explain: [
      'りんごの ねだんは 350えん。はらったのは 500えんだね',
      'おつりは「はらったお金 − ねだん」だよ',
      '500 - 350 = 150。おつりは 150えん！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0038',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'normal',
    text: 'かなさんの クラスでは、メダカを そだてています。すいそうの {水|みず}を とりかえるのは、かなさんの かかりの しごとです。きょうも きれいな みずに かえると、メダカが げんきに およぎました。\nかなさんの かかりの しごとは なに？',
    figure: { type: 'scene', params: { sceneId: 'scene-classroom' } },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['そだてている いきもの', 'みずの つめたさ', 'かかりの しごと'],
      answer: 2,
    },
    answer: {
      kind: 'choice',
      options: ['みずを とりかえる こと', 'えさを あげる こと', 'すいそうを あらう こと'],
      correct: 0,
    },
    explain: [
      '「かかりの しごとは？」← しごとの なかみを きいているよ',
      '「みずを とりかえるのは、かなさんの かかりの しごとです」と かいてあるね',
      'こたえは「みずを とりかえる こと」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0039',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'hard',
    text: 'ひかるくんは バスで おばあちゃんの いえに いきました。せきが ひとつ あいていましたが、つえを もった おじいさんが のってきたので、「どうぞ」と せきを ゆずりました。おじいさんは にっこり わらって「ありがとう」と いいました。\nひかるくんは おじいさんに なにを した？',
    check: {
      kind: 'scene-pick',
      prompt: 'どんな おはなしかな？ただしい えを えらぼう',
      options: ['scene-park', 'scene-animals', 'scene-bus'],
      answer: 2,
    },
    answer: {
      kind: 'choice',
      options: ['せきを ゆずった', 'きっぷを あげた', 'かばんを もった'],
      correct: 0,
    },
    explain: [
      '「なにを した？」← おじいさんに した ことを きいているよ',
      '「どうぞ」と せきを ゆずりました、と かいてあるね',
      'こたえは「せきを ゆずった」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0040',
    subject: 'japanese',
    type: 'story',
    grade: 3,
    difficulty: 'hard',
    text: 'にちようび、そうたくんは おとうさんと ホットケーキを つくりました。たまごを わって、こなと ぎゅうにゅうを まぜて やきます。さいごに はちみつを かけて、かぞくで たべました。\nそうたくんが さいごに かけたのは なに？',
    figure: { type: 'scene', params: { sceneId: 'scene-food' } },
    check: {
      kind: 'asked-what',
      prompt: 'きかれているのは どれ？',
      options: ['つくった もの', 'さいごに かけた もの', 'たべた ばしょ'],
      answer: 1,
    },
    answer: { kind: 'choice', options: ['バター', 'はちみつ', 'ジャム'], correct: 1 },
    explain: [
      '「さいごに かけたのは？」← さいごの ものを きいているよ',
      '「さいごに はちみつを かけて」と かいてあるね',
      'こたえは はちみつ！',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 国語：vocab（ことばのいみ）5問
  // ============================================================
  {
    id: 'm27-0041',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'easy',
    text: '「しずか」と はんたいの いみの ことばは どれ？',
    answer: {
      kind: 'choice',
      options: ['くらい', 'うるさい', 'つめたい'],
      correct: 1,
    },
    explain: [
      '「しずか」は おとが しない ようす',
      'はんたいは おとが おおきくて さわがしい こと',
      'だから「うるさい」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0042',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'easy',
    text: '「わくわく」は どんな きもちを あらわす ことば？',
    answer: {
      kind: 'choice',
      options: [
        'こわくて ぶるぶる ふるえる きもち',
        'ねむくて たまらない きもち',
        'たのしみで むねが おどる きもち',
      ],
      correct: 2,
    },
    explain: [
      '「あした えんそくだと おもうと わくわくする」のように つかうよ',
      'たのしみで むねが おどる きもちの ことばだね',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0043',
    subject: 'japanese',
    type: 'vocab',
    grade: 2,
    difficulty: 'normal',
    text: '「きょうは あつい ひだね」の「あつい」と はんたいの いみの ことばは どれ？',
    answer: {
      kind: 'choice',
      options: ['つめたい', 'さむい', 'あかるい'],
      correct: 1,
    },
    explain: [
      'この「あつい」は、なにが あついのかな？おちゃ？それとも おてんき？',
      '「つめたい」は こおりや みずなど、ものに さわった ときの ことば',
      'てんきや きおんには「あつい ⇔ さむい」。こたえは「さむい」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0044',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'normal',
    text: '「{安心|あんしん}」の いみは どれ？',
    answer: {
      kind: 'choice',
      options: [
        'やすい ねだんの こと',
        'あたらしい こころの こと',
        'こころが おちついて ほっと すること',
      ],
      correct: 2,
    },
    explain: [
      '「テストが おわって あんしんした」のように つかうよ',
      'しんぱいが なくなって、こころが おちつく ことだね',
      '「やすい ねだん」の ことでは ないよ',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0045',
    subject: 'japanese',
    type: 'vocab',
    grade: 3,
    difficulty: 'hard',
    text: '「{猫|ねこ}の {手|て}も かりたい」は どんな いみ？',
    answer: {
      kind: 'choice',
      options: [
        'とても いそがしくて、だれでも いいから てつだって ほしい',
        'ねこと いっしょに あそびたい',
        'ねこの てが ちいさくて かわいい',
      ],
      correct: 0,
    },
    explain: [
      'これは「かんようく」という とくべつな いいかただよ',
      'ねこの てでも いいから かりたいくらい いそがしい、という ようすから',
      '「とても いそがしい」という いみに なったんだ',
    ],
    pack: '2026-07',
  },

  // ============================================================
  // 国語：order（ぶんのならべかえ）5問
  // ============================================================
  {
    id: 'm27-0046',
    subject: 'japanese',
    type: 'order',
    grade: 2,
    difficulty: 'easy',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう',
    answer: { kind: 'order', tokens: ['はを', 'みがいてから', 'ねます'] },
    explain: [
      '「〜してから」は さきに する ことに つくよ',
      'さきに はを みがいて、それから ねるんだね',
      '「はを みがいてから ねます。」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0047',
    subject: 'japanese',
    type: 'order',
    grade: 2,
    difficulty: 'normal',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう',
    answer: { kind: 'order', tokens: ['ゆきが', 'とけて', 'みずに', 'なりました'] },
    explain: [
      '「なにが」→「どう なった」の じゅんばんに ならべよう',
      'さきに ゆきが とけて、とけると みずに なるんだね',
      '「ゆきが とけて みずに なりました。」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0048',
    subject: 'japanese',
    type: 'order',
    grade: 3,
    difficulty: 'normal',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう',
    answer: { kind: 'order', tokens: ['おとうとは', 'ころんで', 'ひざを', 'すりむきました'] },
    explain: [
      '「だれは」が ぶんの さいしょに くるよ',
      'ころんだから、ひざを すりむいたんだね',
      '「おとうとは ころんで ひざを すりむきました。」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0049',
    subject: 'japanese',
    type: 'order',
    grade: 3,
    difficulty: 'normal',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう',
    answer: { kind: 'order', tokens: ['かぜが', 'つよいので', 'まどを', 'しめました'] },
    explain: [
      '「〜ので」は わけ（りゆう）を あらわすよ',
      'わけが さき、した ことが あとだね',
      '「かぜが つよいので まどを しめました。」！',
    ],
    pack: '2026-07',
  },
  {
    id: 'm27-0050',
    subject: 'japanese',
    type: 'order',
    grade: 3,
    difficulty: 'hard',
    text: 'ことばを ならべかえて、ただしい ぶんを つくろう',
    answer: {
      kind: 'order',
      // 「を格/に格」が両方あると別の自然な語順が成立するため、理由(〜ので)→した順の一意な文にする
      tokens: ['おなかが', 'すいたので', 'パンを', 'やいて', 'たべました'],
    },
    explain: [
      '「〜ので」（りゆう）は、ぶんの どこに おくと いいかな？',
      'りゆうが さき。そのあとは した ことを おこった じゅんばんに ならべよう',
      '「おなかが すいたので パンを やいて たべました。」！',
    ],
    pack: '2026-07',
  },
]

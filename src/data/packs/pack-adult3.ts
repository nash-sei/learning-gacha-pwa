/*
 * 大人向けクイズ 追加パック3（家計のお金＋四字熟語ならべ替え＋紛らわしい四字熟語＋虫食い漢字／計40問）
 * ★手書きパック：作問＝Codex（家計16）＋Opus分身（言葉24）／答えのチェック＝メインAI。
 *   pack-adult / pack-adult2 のような自動生成ファイルではない（この40問は人手で検品済み）。
 * - AdultMode から PACK_ADULT / PACK_ADULT2 と合わせて出題プールにする。
 * - subject/grade/type/difficulty は採点に使わない付帯値。pack にジャンル名。hint に一言ヒント。
 * - 答え方は number(数字入力) / choice(4択) / order(8札→正解4札の並べ替え) の3種。
 * - order は「4文字すべて違う漢字」の四字熟語のみ。tokens[0..3]＝正解を読む順・tokens[4..7]＝ダミー・correctTokenCount:4。
 */
import type { Question } from '../../types'

export const PACK_ADULT3: Question[] = [
  // ───────── 家計のお金：数字入力（8問）─────────
  {
    id: 'kakei-n01', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '税ぬき1,200円の商品に、消費税10%がかかります。しはらう金額は何円？',
    answer: { kind: 'number', value: 1320, unit: '円' },
    explain: ['消費税10%は 1,200×0.1=120円。', '1,200＋120＝1,320円。'],
    hint: '1,200円の10%をたす', pack: '家計のお金',
  },
  {
    id: 'kakei-n02', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '税ぬき500円の食品に、軽減税率8%がかかります。しはらう金額は何円？',
    answer: { kind: 'number', value: 540, unit: '円' },
    explain: ['消費税8%は 500×0.08=40円。', '500＋40＝540円。'],
    hint: '500円の8%をたす', pack: '家計のお金',
  },
  {
    id: 'kakei-n03', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '2,500円の服が20%引きになっています。ねびき後の金額は何円？',
    answer: { kind: 'number', value: 2000, unit: '円' },
    explain: ['20%引きは、もとの80%の金額になるということ。', '2,500×0.8＝2,000円。'],
    hint: '20%引きは80%を払う', pack: '家計のお金',
  },
  {
    id: 'kakei-n04', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '1,980円の商品が半額です。半額後の金額は何円？',
    answer: { kind: 'number', value: 990, unit: '円' },
    explain: ['半額は2でわること。', '1,980÷2＝990円。'],
    hint: '2でわる', pack: '家計のお金',
  },
  {
    id: 'kakei-n05', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '3,000円の買い物で5%のポイントがつきます。何円分のポイントがつく？',
    answer: { kind: 'number', value: 150, unit: '円' },
    explain: ['5%は0.05なので、3,000×0.05を計算する。', '3,000×0.05＝150円分。'],
    hint: '3,000円の5%', pack: '家計のお金',
  },
  {
    id: 'kakei-n06', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '毎月4,000円ずつ、6か月ためます。合計で何円たまる？',
    answer: { kind: 'number', value: 24000, unit: '円' },
    explain: ['毎月の金額に月数をかける。', '4,000×6＝24,000円。'],
    hint: '毎月の金額×月数', pack: '家計のお金',
  },
  {
    id: 'kakei-n07', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '月額2,980円のサービスを12か月使います。1年で何円かかる？',
    answer: { kind: 'number', value: 35760, unit: '円' },
    explain: ['1年は12か月なので、月額に12をかける。', '2,980×12＝35,760円。'],
    hint: '月額×12', pack: '家計のお金',
  },
  {
    id: 'kakei-n08', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '税ぬき4,000円の商品が15%引きになり、その後に消費税10%がかかります。しはらう金額は何円？',
    answer: { kind: 'number', value: 3740, unit: '円' },
    explain: ['15%引き後は 4,000×0.85＝3,400円。', '消費税10%をたすと 3,400＋340＝3,740円。'],
    hint: '先に15%引き、そのあと税をたす', pack: '家計のお金',
  },

  // ───────── 家計のお金：4択（8問）─────────
  {
    id: 'kakei-c01', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '1ドル＝100円から1ドル＝150円になりました。これは円高・円安のどちら？',
    answer: { kind: 'choice', options: ['円安', '円高', '消費税', '分散投資'], correct: 0 },
    explain: ['1ドルを買うのに必要な円が100円から150円に増えている。', '円の価値が下がったと見られるので円安。'],
    hint: '同じ1ドルに、より多くの円が必要', pack: '家計のお金',
  },
  {
    id: 'kakei-c02', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '円安のとき、外国から買う輸入品のねだんはどうなりやすい？',
    answer: { kind: 'choice', options: ['高くなりやすい', '安くなりやすい', 'かならず半額になる', '税金がなくなる'], correct: 0 },
    explain: ['円安は円の価値が下がること。', '同じ外国の商品でも、円で見ると高くなりやすい。'],
    hint: '円の価値が下がると外国のものは？', pack: '家計のお金',
  },
  {
    id: 'kakei-c03', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '円高のとき、海外旅行の費用は円で見るとどうなりやすい？',
    answer: { kind: 'choice', options: ['安くなりやすい', '高くなりやすい', 'かならず無料になる', '消費税が20%になる'], correct: 0 },
    explain: ['円高は円の価値が上がること。', '外国のお金に交換するとき、円の力が強くなるので費用は安くなりやすい。'],
    hint: '円の価値が上がると海外では？', pack: '家計のお金',
  },
  {
    id: 'kakei-c04', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '一般に、ある国の金利が上がると、その国の通貨はどうなりやすい？',
    answer: { kind: 'choice', options: ['買われやすい', '売られやすい', '必ず価値がゼロになる', '消費税になる'], correct: 0 },
    explain: ['金利が高い通貨は、利息を期待して持ちたい人が増えやすい。', 'そのため、一般にその国の通貨は買われやすい。'],
    hint: '利息を期待する人が増える', pack: '家計のお金',
  },
  {
    id: 'kakei-c05', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '日本の消費税で、ふつうの商品にかかる標準税率はどれ？',
    answer: { kind: 'choice', options: ['10%', '8%', '5%', '0%'], correct: 0 },
    explain: ['日本の消費税の標準税率は10%。', '一部の食品などには軽減税率8%が使われる。'],
    hint: '標準税率を選ぶ', pack: '家計のお金',
  },
  {
    id: 'kakei-c06', subject: 'math', type: 'money', grade: 4, difficulty: 'easy',
    text: '日本の消費税で、一部の食品などに使われる軽減税率はどれ？',
    answer: { kind: 'choice', options: ['8%', '10%', '15%', '50%'], correct: 0 },
    explain: ['軽減税率は、標準税率より低い8%。', '対象になるものは一部の食品など。'],
    hint: '標準税率より低い', pack: '家計のお金',
  },
  {
    id: 'kakei-c07', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '分散投資の説明として、いちばん合っているものはどれ？',
    answer: { kind: 'choice', options: ['投資先をいくつかに分けること', '全財産を1つにだけ入れること', '必ずもうかる方法', '税金を払わない方法'], correct: 0 },
    explain: ['分散投資は、投資先を複数に分ける考え方。', '1つの投資先が悪くなったときの影響を小さくしやすい。'],
    hint: '1つに集中しない', pack: '家計のお金',
  },
  {
    id: 'kakei-c08', subject: 'math', type: 'money', grade: 4, difficulty: 'normal',
    text: '複利の説明として、いちばん合っているものはどれ？',
    answer: { kind: 'choice', options: ['利息にもさらに利息がつくこと', '毎回必ず損をすること', '元本がすぐゼロになること', 'ねびきの別名'], correct: 0 },
    explain: ['複利では、ついた利息を元本に加えて運用する。', 'そのため、利息にもさらに利息がつく。'],
    hint: '利息が次の計算にも入る', pack: '家計のお金',
  },

  // ───────── 四字熟語 ならべ替え（order・8札→正解4札・8問）─────────
  {
    id: 'yoji-ord-01', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：昔のことを学んで、新しい知識や考えを得ること）。',
    answer: { kind: 'order', tokens: ['温', '故', '知', '新', '古', '識', '習', '更'], correctTokenCount: 4 },
    explain: ['「温故知新（おんこちしん）」。', '昔のことをよく調べて、そこから新しい発見や考えを得ること。'],
    hint: 'おん・こ・ち・しん', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-02', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：自然の美しい景色）。',
    answer: { kind: 'order', tokens: ['花', '鳥', '風', '月', '草', '虫', '雪', '星'], correctTokenCount: 4 },
    explain: ['「花鳥風月（かちょうふうげつ）」。', '花・鳥・風・月など、自然の美しいながめのこと。'],
    hint: 'か・ちょう・ふう・げつ', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-03', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：強い者が弱い者を負かして栄えること）。',
    answer: { kind: 'order', tokens: ['弱', '肉', '強', '食', '骨', '飲', '勝', '体'], correctTokenCount: 4 },
    explain: ['「弱肉強食（じゃくにくきょうしょく）」。', '強い者が弱い者を打ち負かして生き残っていくこと。'],
    hint: 'じゃく・にく・きょう・しょく', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-04', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：よろこび・いかり・かなしみ・たのしみなど、人のさまざまな感情）。',
    answer: { kind: 'order', tokens: ['喜', '怒', '哀', '楽', '悲', '笑', '泣', '情'], correctTokenCount: 4 },
    explain: ['「喜怒哀楽（きどあいらく）」。', 'よろこび・いかり・かなしみ・たのしみ。人のいろいろな気持ちのこと。'],
    hint: 'き・ど・あい・らく', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-05', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：一つのことをして、二つの得をすること）。',
    answer: { kind: 'order', tokens: ['一', '石', '二', '鳥', '三', '岩', '羽', '矢'], correctTokenCount: 4 },
    explain: ['「一石二鳥（いっせきにちょう）」。', '一つの行いで、同時に二つの利益を得ること。'],
    hint: 'いっ・せき・に・ちょう', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-06', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：準備がすみずみまで行き届いていること）。',
    answer: { kind: 'order', tokens: ['用', '意', '周', '到', '準', '備', '達', '着'], correctTokenCount: 4 },
    explain: ['「用意周到（よういしゅうとう）」。', '用意が細かいところまで行き届いていて、手落ちがないこと。'],
    hint: 'よう・い・しゅう・とう', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-07', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：公平で正しく、隠し事がないこと）。',
    answer: { kind: 'order', tokens: ['公', '明', '正', '大', '光', '晴', '直', '王'], correctTokenCount: 4 },
    explain: ['「公明正大（こうめいせいだい）」。', '私心がなく公平で、堂々として隠し事がないこと。'],
    hint: 'こう・めい・せい・だい', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-08', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '4つの漢字をならべて四字熟語を作ろう（意味：小さなことを大げさに言うこと）。',
    answer: { kind: 'order', tokens: ['針', '小', '棒', '大', '糸', '細', '杖', '巨'], correctTokenCount: 4 },
    explain: ['「針小棒大（しんしょうぼうだい）」。', '針ほどの小さなことを、棒ほど大きく言うこと。おおげさ。'],
    hint: 'しん・しょう・ぼう・だい', pack: '四字熟語ならべ',
  },

  // ───────── 紛らわしい四字熟語（4択・8問）─────────
  {
    id: 'yoji-mag-01', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「ききいっぱつ」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['危機一発', '危機一髪', '危険一髪', '危機一撃'], correct: 1 },
    explain: ['正しくは「危機一髪」。', '「髪（かみの毛）」ひと筋ほどの、ごくわずかな差で危ないところ、という意味。「一発」ではない。'],
    hint: '「一発」ではなく、かみの毛の「髪」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-02', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「たんとうちょくにゅう」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['短刀直入', '単刀直進', '単刀直入', '単刀直立'], correct: 2 },
    explain: ['正しくは「単刀直入」。', '一本（単）の刀で切り込むように、前置きなくいきなり本題に入ること。「短刀」ではない。'],
    hint: '「短い」ではなく、ひとつの意味の「単」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-03', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「ごりむちゅう」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['五里霧中', '五里夢中', '五里無中', '五理霧中'], correct: 0 },
    explain: ['正しくは「五里霧中」。', '深い霧（きり）の中にいるように、どうすればよいか見当がつかないこと。「夢中」ではない。'],
    hint: '「夢」ではなく、きりの「霧」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-04', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「しんきいってん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['心気一転', '心機一転', '新規一転', '心機一点'], correct: 1 },
    explain: ['正しくは「心機一転」。', 'あることをきっかけに、気持ちをすっかり入れかえること。「心機（心の働き）」を使う。'],
    hint: '「気」でも「規」でもなく「機」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-05', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「いくどうおん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['異句同音', '異口同韻', '異口同音', '意口同音'], correct: 2 },
    explain: ['正しくは「異口同音」。', '多くの人が口をそろえて同じことを言うこと。「口（くち）」を使う。'],
    hint: '「句」ではなく、くちの「口」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-06', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「たいきばんせい」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['大器晩成', '大器晩生', '大機晩成', '大器晩星'], correct: 0 },
    explain: ['正しくは「大器晩成」。', '大きな器が仕上がるのに時間がかかるように、大人物は遅れて力を発揮すること。「成（なる）」を使う。'],
    hint: '「生まれる」ではなく、でき上がる「成」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-07', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「りんきおうへん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['臨気応変', '臨機応変', '臨機応返', '臨機横変'], correct: 1 },
    explain: ['正しくは「臨機応変」。', 'その場の変化に応じて、やり方をうまく変えること。「機」と「変」を使う。'],
    hint: '「気」ではなく「機」、最後は「変」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-08', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「がでんいんすい」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['我田引推', '我伝引水', '我田引水', '我田飲水'], correct: 2 },
    explain: ['正しくは「我田引水」。', '自分の田にだけ水を引くように、自分に都合のよいように言ったり行ったりすること。'],
    hint: '「田」に「水」を引く', pack: '四字熟語えらび',
  },

  // ───────── 虫食い漢字（文字版・4択・8問）─────────
  {
    id: 'kanji-mus-01', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「学□（がっこう）」の □ に入る漢字は？（意味：勉強をしに行くところ）',
    answer: { kind: 'choice', options: ['交', '校', '効', '較'], correct: 1 },
    explain: ['「学校（がっこう）」。', '子どもや学生が勉強をするところ。'],
    hint: '木へんの「こう」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-02', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「□院（びょういん）」の □ に入る漢字は？（意味：具合が悪いときに治しに行くところ）',
    answer: { kind: 'choice', options: ['病', '痛', '疲', '疫'], correct: 0 },
    explain: ['「病院（びょういん）」。', 'けがや病気を診てもらうところ。'],
    hint: 'やまいだれ（疒）で、いちばん基本の字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-03', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「電□（でんわ）」の □ に入る漢字は？（意味：はなれた人と声で話す道具）',
    answer: { kind: 'choice', options: ['語', '談', '話', '詰'], correct: 2 },
    explain: ['「電話（でんわ）」。', 'はなれた相手と声でやりとりする道具。'],
    hint: 'ごんべん（言）に「舌」、「話す」の字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-04', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「銀□（ぎんこう）」の □ に入る漢字は？（意味：お金を預けたり借りたりするところ）',
    answer: { kind: 'choice', options: ['街', '行', '術', '衛'], correct: 1 },
    explain: ['「銀行（ぎんこう）」。', 'お金を預けたり、貸し借りをするところ。'],
    hint: '「行く」の「行」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-05', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「新□（しんぶん）」の □ に入る漢字は？（意味：毎日のできごとを知らせる紙面）',
    answer: { kind: 'choice', options: ['間', '開', '聞', '閉'], correct: 2 },
    explain: ['「新聞（しんぶん）」。', '世の中のできごとを知らせる紙。'],
    hint: 'もんがまえ（門）の中に「耳」、「聞く」の字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-06', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「昼□（ちゅうしょく）」の □ に入る漢字は？（意味：お昼に食べる食事）',
    answer: { kind: 'choice', options: ['飲', '食', '館', '飼'], correct: 1 },
    explain: ['「昼食（ちゅうしょく）」。', 'お昼にとる食事のこと。'],
    hint: '「食べる」の「食」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-07', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「温□（おんど）」の □ に入る漢字は？（意味：あつさ・つめたさの度合い）',
    answer: { kind: 'choice', options: ['度', '席', '座', '庁'], correct: 0 },
    explain: ['「温度（おんど）」。', 'あたたかさ・つめたさの度合いのこと。'],
    hint: '「程度」「〇〇度」の「度」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-08', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'normal',
    text: '「説□（せつめい）」の □ に入る漢字は？（意味：わかりやすく話して伝えること）',
    answer: { kind: 'choice', options: ['朋', '明', '昭', '盟'], correct: 1 },
    explain: ['「説明（せつめい）」。', 'よくわかるように話して伝えること。'],
    hint: '日と月で「明るい」、その「明」', pack: '虫食い漢字',
  },
]

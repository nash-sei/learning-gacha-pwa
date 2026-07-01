/*
 * 大人向けクイズ 追加パック3（マニア級・家計のお金＋四字熟語ならべ替え＋紛らわしい四字熟語＋虫食い漢字／計40問）
 * ★手書きパック：作問＝Codex（家計16）＋Opus分身（言葉24）／答えのチェック＝メインAI（全40問検品済み）。
 *   pack-adult / pack-adult2 のような自動生成ファイルではない。難易度＝マニア級（中学生では解けない・難読/専門レベル）。
 * - AdultMode から PACK_ADULT / PACK_ADULT2 と合わせて出題プールにする。
 * - subject/grade/type/difficulty は採点に使わない付帯値。pack にジャンル名。hint に一言ヒント。
 * - 答え方は number(数字入力) / choice(4択) / order(8札→正解4札の並べ替え) の3種。
 * - order は「4文字すべて違う漢字」の四字熟語のみ。tokens[0..3]＝正解を読む順・tokens[4..7]＝ダミー・correctTokenCount:4。
 */
import type { Question } from '../../types'

export const PACK_ADULT3: Question[] = [
  // ───────── 家計のお金：数字入力（8問・マニア級）─────────
  {
    id: 'kakei-n01', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '元金500,000円を年利10%の複利で2年間運用します。税金や手数料を考えないとき、2年後の元利合計は何円？',
    answer: { kind: 'number', value: 605000, unit: '円' },
    explain: ['複利なので 500,000×1.10×1.10 を計算する。', '500,000×1.21＝605,000円。'],
    hint: '2年分なので1.10を2回かける', pack: '家計のお金',
  },
  {
    id: 'kakei-n02', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '72の法則を使うと、年利6%で資産が約2倍になるまで何年かかる？',
    answer: { kind: 'number', value: 12, unit: '年' },
    explain: ['72の法則では、2倍になる年数は 72÷年利% で近似する。', '72÷6＝12年。'],
    hint: '72を利率でわる', pack: '家計のお金',
  },
  {
    id: 'kakei-n03', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '名目金利が年3%、物価上昇率が年2%のとき、近似式「実質金利≒名目金利−物価上昇率」で実質金利は約何%？',
    answer: { kind: 'number', value: 1, unit: '%' },
    explain: ['実質金利は、名目金利から物価上昇率を引いて近似できる。', '3%−2%＝1%。'],
    hint: '名目金利から物価上昇率を引く', pack: '家計のお金',
  },
  {
    id: 'kakei-n04', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '1,000,000円を年利5%で3年間運用します。複利の元利合計は、単利（元利合計1,150,000円）より何円多い？',
    answer: { kind: 'number', value: 7625, unit: '円' },
    explain: ['複利の元利合計は 1,000,000×1.05×1.05×1.05＝1,157,625円。', '単利の1,150,000円との差は 7,625円。'],
    hint: '複利の3年後を出して単利と比べる', pack: '家計のお金',
  },
  {
    id: 'kakei-n05', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '1年後に1,050,000円受け取れるお金を、年5%で現在価値に割り引きます。現在価値は何円？',
    answer: { kind: 'number', value: 1000000, unit: '円' },
    explain: ['現在価値は、将来受け取る金額を 1＋割引率 で割る。', '1,050,000÷1.05＝1,000,000円。'],
    hint: '1.05で割り戻す', pack: '家計のお金',
  },
  {
    id: 'kakei-n06', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '120,000円を借り、毎月元金を10,000円ずつ返します。利息は毎月の返済前残高に月利1%でかかるとき、12か月の利息合計は何円？',
    answer: { kind: 'number', value: 7800, unit: '円' },
    explain: ['返済前残高は 120,000円、110,000円、…、10,000円。合計は780,000円。', '780,000×1%＝7,800円。'],
    hint: '毎月の返済前残高を全部足す', pack: '家計のお金',
  },
  {
    id: 'kakei-n07', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '物価が毎年5%ずつ上がると、2年後の物価水準は現在の1.1025倍です。2年後の1,102,500円は、現在の価値で約何円？',
    answer: { kind: 'number', value: 1000000, unit: '円' },
    explain: ['現在の価値に直すには、2年後の金額を物価水準の倍率で割る。', '1,102,500÷1.1025＝1,000,000円。'],
    hint: '物価上昇分で割り戻す', pack: '家計のお金',
  },
  {
    id: 'kakei-n08', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '税ぬきで、標準税率10%対象の商品が36,000円、軽減税率8%対象の商品が20,000円あります。5,000円のクーポンを標準税率対象の商品に税計算前に使うと、支払総額は何円？',
    answer: { kind: 'number', value: 55700, unit: '円' },
    explain: ['標準税率対象は 36,000−5,000＝31,000円で、税込31,000×1.10＝34,100円。', '軽減税率対象は 20,000×1.08＝21,600円。合計55,700円。'],
    hint: 'クーポンを引いてから税率をかける', pack: '家計のお金',
  },

  // ───────── 家計のお金：4択（8問・マニア級）─────────
  {
    id: 'kakei-c01', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '名目金利と実質金利の関係として、いちばん正しいものはどれ？',
    answer: { kind: 'choice', options: ['実質金利は、近似的に名目金利から物価上昇率を引いたもの', '名目金利は、必ず実質金利より低い', '実質金利は、物価上昇率に関係しない', '名目金利がプラスなら、実質金利も必ずプラス'], correct: 0 },
    explain: ['実質金利は、お金の購買力で見た金利。', '近似的には「名目金利−物価上昇率」で考える。'],
    hint: '物価上昇を差し引いて考える', pack: '家計のお金',
  },
  {
    id: 'kakei-c02', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: 'NISAの基本的な特徴として、いちばん正しいものはどれ？',
    answer: { kind: 'choice', options: ['一定の非課税投資枠内で、運用益が非課税になる制度', '掛金が全額所得控除になる年金制度', '預金の元本が国に保証される制度', '住宅ローンの返済額が必ず減る制度'], correct: 0 },
    explain: ['NISAは、対象となる投資から得た配当や売却益などの運用益が非課税になる制度。', '掛金の所得控除はiDeCoの特徴。'],
    hint: '運用益への税金に注目', pack: '家計のお金',
  },
  {
    id: 'kakei-c03', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: 'iDeCoの掛金について、基本的な税制上の特徴として正しいものはどれ？',
    answer: { kind: 'choice', options: ['掛金は全額が所得控除の対象になる', '掛金には必ず消費税がかかる', '掛金はNISAの非課税投資枠を使う', '掛金を払うと所得税率が必ず0%になる'], correct: 0 },
    explain: ['iDeCoの掛金は、全額が所得控除の対象になる。', 'ただし、加入条件や掛金上限などの制度上の制限はある。'],
    hint: '所得から差し引けるかを見る', pack: '家計のお金',
  },
  {
    id: 'kakei-c04', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '累進課税の説明として、いちばん正しいものはどれ？',
    answer: { kind: 'choice', options: ['課税所得が高い部分ほど高い税率がかかる仕組み', '全員に同じ税額をかける仕組み', '税金が毎年必ず下がる仕組み', '消費税率だけを8%にする仕組み'], correct: 0 },
    explain: ['累進課税では、所得全体に同じ税率をかけるのではなく、所得の段階ごとに税率が分かれる。', '高い所得部分ほど高い税率が適用される。'],
    hint: '所得の段階ごとに税率が変わる', pack: '家計のお金',
  },
  {
    id: 'kakei-c05', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '源泉徴収の説明として、いちばん正しいものはどれ？',
    answer: { kind: 'choice', options: ['給与などを払う側が、税金をあらかじめ差し引いて納める仕組み', '本人が買い物のたびに所得税を払う仕組み', '投資の損失を必ず国が補てんする仕組み', '消費税をすべて免除する仕組み'], correct: 0 },
    explain: ['源泉徴収では、給与などの支払者が税金を差し引く。', '差し引かれた税金は、支払者を通じて納められる。'],
    hint: '給与から先に引かれる税金', pack: '家計のお金',
  },
  {
    id: 'kakei-c06', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: 'インフレが続くとき、同じ額面の現金について一般に正しい説明はどれ？',
    answer: { kind: 'choice', options: ['実質的な価値は目減りしやすい', '買える物の量は必ず増える', '額面が同じなら購買力も必ず同じ', '現金だけは物価上昇の影響を受けない'], correct: 0 },
    explain: ['インフレは物価が上がること。', '同じ金額で買える物が減るため、現金の実質的な価値は目減りしやすい。'],
    hint: '同じ金額で買える量を考える', pack: '家計のお金',
  },
  {
    id: 'kakei-c07', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '一般に、市場金利が上がると、すでに発行された固定利付債券の価格はどうなりやすい？',
    answer: { kind: 'choice', options: ['下がりやすい', '上がりやすい', '必ず額面の2倍になる', '金利とは無関係に必ず同じ'], correct: 0 },
    explain: ['既存の固定利付債券は、あとから出る高い金利の商品と比べて魅力が下がる。', 'そのため、一般に価格は下がりやすい。'],
    hint: '新しい高金利商品と比べる', pack: '家計のお金',
  },
  {
    id: 'kakei-c08', subject: 'math', type: 'money', grade: 4, difficulty: 'hard',
    text: '分散投資の説明として、いちばん正しいものはどれ？',
    answer: { kind: 'choice', options: ['投資先を分けることで、特定の投資先に集中するリスクを抑えやすい', '分散すれば元本割れは絶対に起きない', '分散投資は必ず短期間で利益が出る方法', '分散投資とは、税金をすべてなくす方法'], correct: 0 },
    explain: ['分散投資は、資産や地域などを分けて投資する考え方。', '集中リスクを抑えやすいが、損失リスクを完全になくすものではない。'],
    hint: 'リスクをゼロにする話ではない', pack: '家計のお金',
  },

  // ───────── 四字熟語 ならべ替え（order・8札→正解4札・8問・マニア級）─────────
  {
    id: 'yoji-ord-01', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：学問の真理をまげて世間や権力に迎合すること',
    answer: { kind: 'order', tokens: ['曲', '学', '阿', '世', '迎', '合', '権', '勢'], correctTokenCount: 4 },
    explain: ['曲学阿世（きょくがくあせい）', '学問の真理をまげて、世間や時流に迎合すること。'],
    hint: 'きょくがくあせい', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-02', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：表面は従うふりをして内心では反抗すること',
    answer: { kind: 'order', tokens: ['面', '従', '腹', '背', '陽', '奉', '陰', '違'], correctTokenCount: 4 },
    explain: ['面従腹背（めんじゅうふくはい）', 'うわべは服従を装い、心中では反抗していること。'],
    hint: 'めんじゅうふくはい', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-03', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：疑う心があると何でもないことまで恐ろしく感じること',
    answer: { kind: 'order', tokens: ['疑', '心', '暗', '鬼', '幽', '霊', '妄', '想'], correctTokenCount: 4 },
    explain: ['疑心暗鬼（ぎしんあんき）', '疑う心があると、なんでもないことまで恐ろしく感じられること。'],
    hint: 'ぎしんあんき', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-04', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：内部の心配事と外部からの心配事が同時にあること',
    answer: { kind: 'order', tokens: ['内', '憂', '外', '患', '心', '配', '苦', '難'], correctTokenCount: 4 },
    explain: ['内憂外患（ないゆうがいかん）', '内部の悩みと外部からの圧力、両方の心配事があること。'],
    hint: 'ないゆうがいかん', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-05', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：深く考え、遠い先まで見通して計画すること',
    answer: { kind: 'order', tokens: ['深', '謀', '遠', '慮', '熟', '考', '計', '略'], correctTokenCount: 4 },
    explain: ['深謀遠慮（しんぼうえんりょ）', '深くはかりごとをめぐらし、遠い先まで考えること。'],
    hint: 'しんぼうえんりょ', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-06', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：仲の悪い者同士が同じ場所や境遇に居合わせること',
    answer: { kind: 'order', tokens: ['呉', '越', '同', '舟', '対', '立', '反', '目'], correctTokenCount: 4 },
    explain: ['呉越同舟（ごえつどうしゅう）', '敵対する者同士が同じ場所・境遇に居合わせること。'],
    hint: 'ごえつどうしゅう', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-07', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：人を巧みにあざむくためのはかりごと・策略',
    answer: { kind: 'order', tokens: ['権', '謀', '術', '数', '策', '略', '陰', '計'], correctTokenCount: 4 },
    explain: ['権謀術数（けんぼうじゅっすう）', '人をあざむくためのたくらみ・はかりごと。'],
    hint: 'けんぼうじゅっすう', pack: '四字熟語ならべ',
  },
  {
    id: 'yoji-ord-08', subject: 'japanese', type: 'order', grade: 4, difficulty: 'hard',
    text: '次の意味の四字熟語を、8枚の札から4枚選んで正しい順にならべよう。／意味：邪念がなく澄み切った静かな心の状態',
    answer: { kind: 'order', tokens: ['明', '鏡', '止', '水', '平', '静', '無', '念'], correctTokenCount: 4 },
    explain: ['明鏡止水（めいきょうしすい）', 'くもりのない鏡と静かな水面のように、澄み切った心。'],
    hint: 'めいきょうしすい', pack: '四字熟語ならべ',
  },

  // ───────── 紛らわしい四字熟語（4択・8問・マニア級）─────────
  {
    id: 'yoji-mag-01', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「がりょうてんせい」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['画竜点晴', '画竜点睛', '画竜点精', '画竜点清'], correct: 1 },
    explain: ['正しくは「画竜点睛」。', '「睛」は目へんで「ひとみ」の意。「晴・精・清」ではない。', '意味：最後の大事な仕上げ。'],
    hint: '「睛」は目へん（ひとみ）', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-02', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「ぼうじゃくぶじん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['傍弱無人', '傍若無仁', '傍若無人', '望若無人'], correct: 2 },
    explain: ['正しくは「傍若無人」。', '「若」は「〜のごとし」の意。「弱」ではない。', '意味：まわりを気にせず勝手にふるまうこと。'],
    hint: '「若」＝〜のごとし', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-03', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「たいぎめいぶん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['大義名分', '大義名文', '大儀名分', '大義明分'], correct: 0 },
    explain: ['正しくは「大義名分」。', '「名分」は立場に応じた道理のこと。「名文」ではない。', '意味：行動のよりどころとなる道理。'],
    hint: '「名分」＝守るべき道理', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-04', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「かんこつだったい」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['喚骨奪胎', '換骨奪台', '換骨奪胎', '換骨奪体'], correct: 2 },
    explain: ['正しくは「換骨奪胎」。', '「胎」は骨・胎（もとになるもの）を取り替える意。「台・体」ではない。', '意味：先人の作を土台に独自の作を作ること。'],
    hint: '「胎」はにくづき', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-05', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「てんいむほう」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['天衣無峰', '天位無縫', '天衣無法', '天衣無縫'], correct: 3 },
    explain: ['正しくは「天衣無縫」。', '「縫」は縫い目の意。「峰・法」ではない。', '意味：技巧のあとがなく自然で完全なこと。'],
    hint: '「縫」＝ぬいめ（糸へん）', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-06', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「じゅうおうむじん」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['縦横無人', '縦横無尽', '縦横無刃', '従横無尽'], correct: 1 },
    explain: ['正しくは「縦横無尽」。', '「尽」は尽きること。「人・刃」ではない。', '意味：思いのままに自由自在にふるまうこと。'],
    hint: '「無尽」＝尽きない', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-07', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「いみしんちょう」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['意味伸長', '異味深長', '意味深長', '意味深張'], correct: 2 },
    explain: ['正しくは「意味深長」。', '「深長」は奥深いこと。「伸長・深張」ではない。', '意味：表面の意味の奥に深い含みがあること。'],
    hint: '「深く長い（深長）」', pack: '四字熟語えらび',
  },
  {
    id: 'yoji-mag-08', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '「しっぷうじんらい」の正しい書き方はどれ？',
    answer: { kind: 'choice', options: ['疾風迅頼', '疾風迅雷', '疾風尽雷', '疾風迅来'], correct: 1 },
    explain: ['正しくは「疾風迅雷」。', '「迅雷」は激しい雷の意。「頼・来」や「尽」ではない。', '意味：行動が非常にすばやく激しいこと。'],
    hint: '「迅雷」＝はやい雷', pack: '四字熟語えらび',
  },

  // ───────── 虫食い漢字（4択・8問・マニア級／難読・同音）─────────
  {
    id: 'kanji-mus-01', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　完□（かんぺき）',
    answer: { kind: 'choice', options: ['壁', '碧', '璧', '癖'], correct: 2 },
    explain: ['完璧（かんぺき）＝欠点がなく完全なこと。', '「璧」は平たい宝玉の意。「壁（かべ）」ではない。'],
    hint: '「たま（宝玉）」を表す字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-02', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　破□（はたん）',
    answer: { kind: 'choice', options: ['綜', '綻', '縦', '綬'], correct: 1 },
    explain: ['破綻（はたん）＝物事が成り立たなくなること。', '「綻」は「ほころびる」。'],
    hint: '糸へんで「ほころびる」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-03', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　隠□（いんぺい）',
    answer: { kind: 'choice', options: ['弊', '蔽', '幣', '塀'], correct: 1 },
    explain: ['隠蔽（いんぺい）＝おおい隠すこと。', '「蔽」は「おおう」。「弊・幣」ではない。'],
    hint: '「おおう（へい）」を表す字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-04', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　更□（こうてつ）',
    answer: { kind: 'choice', options: ['鉄', '徹', '迭', '撤'], correct: 2 },
    explain: ['更迭（こうてつ）＝役職の人を入れ替えること。', '「迭」は「かわるがわる」。「鉄・徹・撤」ではない。'],
    hint: 'しんにょうで「かわるがわる」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-05', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　□免（ひめん）',
    answer: { kind: 'choice', options: ['疲', '被', '罷', '秘'], correct: 2 },
    explain: ['罷免（ひめん）＝職務を辞めさせること。', '「罷」は「やめる」。'],
    hint: '「やめる（ひ）」を表す字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-06', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　□迫（ひっぱく）',
    answer: { kind: 'choice', options: ['必', '逼', '匹', '泌'], correct: 1 },
    explain: ['逼迫（ひっぱく）＝行き詰まって余裕がなくなること。', '「逼」は「せまる」。'],
    hint: 'しんにょうで「せまる（ひつ）」', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-07', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　相□（そうさい）※読みに注意',
    answer: { kind: 'choice', options: ['際', '裁', '殺', '載'], correct: 2 },
    explain: ['相殺（そうさい）＝差し引きして帳消しにすること。', '「殺」をここでは「さい」と読む（そうさつではない）。'],
    hint: 'ここでは「さい」と読む字', pack: '虫食い漢字',
  },
  {
    id: 'kanji-mus-08', subject: 'japanese', type: 'vocab', grade: 4, difficulty: 'hard',
    text: '□に入る漢字はどれ？　□度（そんたく）',
    answer: { kind: 'choice', options: ['存', '忖', '尊', '損'], correct: 1 },
    explain: ['忖度（そんたく）＝他人の心中を推しはかること。', '「忖」は「はかる」。「存・尊・損」ではない。'],
    hint: 'りっしんべんで「はかる」', pack: '虫食い漢字',
  },
]

/*
 * 大人向けクイズ 追加パック（4AI作成・合計240問）
 * 自動生成ファイル（build_pack_adult2.mjs が外部AIのJSONから生成）。手書き編集しない。
 * - AdultMode から PACK_ADULT と合わせて出題プールにする。
 * - subject/grade/type は採点に使わない付帯値。pack にジャンル名。hint に一言ヒント。
 */
import type { Question } from '../../types'

export const PACK_ADULT2: Question[] = [
  {
    "id": "hg-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "現在の教科書で鎌倉幕府の成立年として広く採用されているのは何年ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "1185年",
        "1192年",
        "1180年",
        "1203年"
      ],
      "correct": 0
    },
    "explain": [
      "現在は守護・地頭を全国に置いた1185年を成立とする説が主流です。1192年は源頼朝が征夷大将軍に任じられた年で、「いい国つくろう」の語呂合わせは現在主流ではありません。"
    ],
    "hint": "将軍になった年ではなく、守護・地頭を置いて実質的な支配を始めた年です。",
    "pack": "歴史"
  },
  {
    "id": "hg-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "江戸時代にキリスト教を禁止するために、キリストやマリアの絵を踏ませた『行為』を歴史用語で何と呼びますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "踏み絵",
        "絵踏",
        "免罪符",
        "キリシタン札"
      ],
      "correct": 1
    },
    "explain": [
      "行為そのものを「絵踏（えぶみ）」、踏ませるために使われた絵や板のことを「踏み絵」と呼びます。歴史用語としては絵踏が正確です。"
    ],
    "hint": "行為の名前を聞いています。",
    "pack": "歴史"
  },
  {
    "id": "hg-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "古代エジプトで、王の墓として建造されたと言われる巨大なピラミッド。その中でも最大のものは誰のピラミッドですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "クフ王",
        "カフラー王",
        "メンカウラー王",
        "ツタンカーメン"
      ],
      "correct": 0
    },
    "explain": [
      "ギザにある三大ピラミッドのうち、最大のものがクフ王のピラミッドです。ツタンカーメンの墓は王家の谷にあります。"
    ],
    "hint": "ギザの三大ピラミッドのうち、最も大きいものを建造した王です。",
    "pack": "歴史"
  },
  {
    "id": "hg-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "日本に初めてキリスト教を伝えたとされる、イエズス会の宣教師は誰ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ペリー",
        "ザビエル",
        "フロイス",
        "ヴァリニャーノ"
      ],
      "correct": 1
    },
    "explain": [
      "1549年に鹿児島に上陸し、キリスト教を伝えたのはフランシスコ・ザビエルです。"
    ],
    "hint": "1549年（以後よく広まる）に鹿児島に上陸した人物です。",
    "pack": "歴史"
  },
  {
    "id": "hg-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "江戸時代の身分制度「士農工商」について、現在の歴史研究で正しいとされている説明はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "身分の上下関係を表すものではなかった",
        "武士の次に農民が偉かった",
        "職業の変更は絶対に不可能だった",
        "天皇を頂点とした絶対的な階級だった"
      ],
      "correct": 0
    },
    "explain": [
      "かつては「武士が一番偉く、商人が一番下」と教えられましたが、現在は「士農工商」は単なる職業の分類であり、農工商の間に上下関係はなかったとされています。"
    ],
    "hint": "昔の教科書に書かれていた「ピラミッド型の身分制度」は現在否定されています。",
    "pack": "歴史"
  },
  {
    "id": "hg-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1789年に始まり、絶対王政を打ち倒したフランス革命。この時、処刑された国王は誰ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ルイ14世",
        "ルイ15世",
        "ルイ16世",
        "ナポレオン"
      ],
      "correct": 2
    },
    "explain": [
      "フランス革命でマリー・アントワネットと共にギロチンで処刑されたのはルイ16世です。ルイ14世は「太陽王」と呼ばれた人物です。"
    ],
    "hint": "マリー・アントワネットの夫だった国王です。",
    "pack": "歴史"
  },
  {
    "id": "hg-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本の初代内閣総理大臣は誰ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "大久保利通",
        "伊藤博文",
        "板垣退助",
        "西郷隆盛"
      ],
      "correct": 1
    },
    "explain": [
      "1885年に内閣制度が創設され、初代内閣総理大臣に就任したのは伊藤博文です。"
    ],
    "hint": "旧千円札の肖像画にもなった人物です。",
    "pack": "歴史"
  },
  {
    "id": "hg-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "江戸時代の「鎖国」において、幕府が海外との窓口として開いていた「四つの口」に含まれないのはどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "長崎",
        "対馬",
        "松前",
        "横浜"
      ],
      "correct": 3
    },
    "explain": [
      "長崎（オランダ・清）、対馬（朝鮮）、松前（アイヌ）、薩摩（琉球）の4つが窓口でした。横浜が開港したのは幕末のペリー来航後です。"
    ],
    "hint": "ペリー来航後に開港した港が一つ混ざっています。",
    "pack": "歴史"
  },
  {
    "id": "hg-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "中世ヨーロッパで流行し、人口の3分の1を死に至らしめたと言われる感染症は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "コレラ",
        "ペスト",
        "天然痘",
        "スペイン風邪"
      ],
      "correct": 1
    },
    "explain": [
      "14世紀のヨーロッパで大流行した「黒死病」とも呼ばれる病気はペストです。"
    ],
    "hint": "「黒死病」とも呼ばれました。",
    "pack": "歴史"
  },
  {
    "id": "hg-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "1582年、明智光秀が主君である織田信長を討った事件を何と呼びますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "関ヶ原の戦い",
        "本能寺の変",
        "大坂の陣",
        "島原の乱"
      ],
      "correct": 1
    },
    "explain": [
      "京都の本能寺に滞在していた織田信長を明智光秀が急襲した事件が本能寺の変です。"
    ],
    "hint": "「敵は〇〇にあり！」と言ったとされます。",
    "pack": "歴史"
  },
  {
    "id": "hg-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "1853年、ペリー率いる黒船の艦隊が日本で最初にやってきた場所はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "横浜",
        "浦賀",
        "下田",
        "函館"
      ],
      "correct": 1
    },
    "explain": [
      "ペリーが最初に来航したのは神奈川県の浦賀です。下田や函館は、その後に結ばれた日米和親条約で開港した場所です。"
    ],
    "hint": "開港した場所ではなく、最初に姿を現した場所です。",
    "pack": "歴史"
  },
  {
    "id": "hg-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "奈良時代、新しく開墾した土地の永久私有を認めた法律は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "班田収授法",
        "墾田永年私財法",
        "御成敗式目",
        "太閤検地"
      ],
      "correct": 1
    },
    "explain": [
      "743年に制定された墾田永年私財法により、土地の私有が認められ、のちの荘園へと発展しました。"
    ],
    "hint": "「墾田（新しく開墾した田）」を「永年（永久に）」「私財」とする法律です。",
    "pack": "歴史"
  },
  {
    "id": "hg-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ルネサンス期に『モナ・リザ』や『最後の晩餐』を描いた人物は誰ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ミケランジェロ",
        "レオナルド・ダ・ヴィンチ",
        "ラファエロ",
        "ゴッホ"
      ],
      "correct": 1
    },
    "explain": [
      "『モナ・リザ』『最後の晩餐』を描いたのは、「万能の天才」と呼ばれたレオナルド・ダ・ヴィンチです。"
    ],
    "hint": "「万能の天才」と呼ばれたイタリアの芸術家です。",
    "pack": "歴史"
  },
  {
    "id": "hg-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "第一次世界大戦の直接的なきっかけとなった「サラエボ事件」で暗殺されたのは、どこの国の皇太子夫妻ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ドイツ帝国",
        "ロシア帝国",
        "オーストリア・ハンガリー帝国",
        "イギリス"
      ],
      "correct": 2
    },
    "explain": [
      "暗殺されたのはオーストリアの皇太子夫妻です。同盟国のドイツが支援したことで大戦へと発展しました。"
    ],
    "hint": "セルビアの青年に暗殺されたのは、ドイツの同盟国の皇太子です。",
    "pack": "歴史"
  },
  {
    "id": "hg-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "平安時代、藤原氏が天皇の幼少期には摂政、成人後は関白として政治の実権を握った政治体制を何と言いますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "院政",
        "摂関政治",
        "武家政治",
        "専制政治"
      ],
      "correct": 1
    },
    "explain": [
      "摂政と関白の頭文字をとって「摂関政治」と呼びます。藤原道長・頼通の時代に全盛期を迎えました。"
    ],
    "hint": "役職名である「摂政」と「関白」を合わせた言葉です。",
    "pack": "歴史"
  },
  {
    "id": "hg-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "16世紀、「太陽の沈まない国」と呼ばれ、世界中に植民地を持っていた帝国はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "イギリス",
        "フランス",
        "スペイン",
        "オランダ"
      ],
      "correct": 2
    },
    "explain": [
      "16世紀に新大陸やアジアに広大な領土を持ったスペインが最初にそう呼ばれました（後に19世紀の大英帝国もそう呼ばれました）。"
    ],
    "hint": "無敵艦隊を持ち、中南米を支配していた国です。",
    "pack": "歴史"
  },
  {
    "id": "hg-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "アメリカ合衆国が独立宣言を発表した時、独立時の州の数はいくつでしたか。",
    "answer": {
      "kind": "choice",
      "options": [
        "13",
        "50",
        "30",
        "15"
      ],
      "correct": 0
    },
    "explain": [
      "現在の星条旗の星の数は50ですが、独立当初の州の数は13でした。国旗の赤と白のストライプ（13本）がそれを表しています。"
    ],
    "hint": "現在の星の数ではなく、赤と白のストライプの数と同じです。",
    "pack": "歴史"
  },
  {
    "id": "hg-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "明治時代、政府の税収を安定させるために、土地の価格を定めて現金で税を納めさせた政策は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "地租改正",
        "版籍奉還",
        "廃藩置県",
        "徴兵令"
      ],
      "correct": 0
    },
    "explain": [
      "1873年に始まった地租改正により、地価の3%（後に2.5%）を現金で納めることになりました。"
    ],
    "hint": "土地（地）の税（租）を改める制度です。",
    "pack": "歴史"
  },
  {
    "id": "hg-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1867年、徳川慶喜が政権を朝廷に返上した「大政奉還」が行われた場所はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "江戸城",
        "京都御所",
        "二条城",
        "大坂城"
      ],
      "correct": 2
    },
    "explain": [
      "大政奉還は、京都にある二条城の二の丸御殿で行われました。"
    ],
    "hint": "京都にある、徳川家康が築いた城です。",
    "pack": "歴史"
  },
  {
    "id": "hg-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1945年、ポツダム宣言を受諾して降伏した日本ですが、宣言を発表した国に含まれないのはどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "アメリカ",
        "イギリス",
        "ソ連",
        "中華民国"
      ],
      "correct": 2
    },
    "explain": [
      "ポツダム宣言を発表したのは米・英・中の3カ国です。ソ連は発表時には参加しておらず、後に日本に宣戦布告した際に関与しました。"
    ],
    "hint": "当時、日本と中立条約を結んでいた国は発表時に参加していません。",
    "pack": "歴史"
  },
  {
    "id": "hg-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "中国の三国時代、魏・呉・蜀の三国が鼎立しました。このうち、劉備が建国したのはどの国ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "魏",
        "呉",
        "蜀",
        "晋"
      ],
      "correct": 2
    },
    "explain": [
      "劉備が建国したのが蜀（蜀漢）です。曹操の息子である曹丕が魏を、孫権が呉を建国しました。"
    ],
    "hint": "諸葛亮（孔明）が仕えていた国です。",
    "pack": "歴史"
  },
  {
    "id": "hg-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "日本の歴史上、女性の天皇はこれまでに何人（何代）存在しましたか。",
    "answer": {
      "kind": "choice",
      "options": [
        "2人（2代）",
        "8人（10代）",
        "5人（6代）",
        "12人（15代）"
      ],
      "correct": 1
    },
    "explain": [
      "推古天皇をはじめ、歴史上8人の女性が計10代（2人は重祚）にわたって天皇に即位しています。"
    ],
    "hint": "推古、皇極（斉明）、持統、元明、元正、孝謙（称徳）、明正、後桜町の各天皇です。",
    "pack": "歴史"
  },
  {
    "id": "hg-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1648年に結ばれ、「主権国家体制」の出発点となったとされる三十年戦争の講和条約は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ウェストファリア条約",
        "ヴェルサイユ条約",
        "ウィーン条約",
        "ユトレヒト条約"
      ],
      "correct": 0
    },
    "explain": [
      "三十年戦争の講和条約はウェストファリア条約です。ヴェルサイユは第一次世界大戦、ウィーンはナポレオン戦争後の条約です。"
    ],
    "hint": "最初の近代的な国際条約と呼ばれます。",
    "pack": "歴史"
  },
  {
    "id": "hg-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "室町時代、足利義満が明との間で行った貿易を何と呼びますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "朱印船貿易",
        "勘合貿易",
        "南蛮貿易",
        "日宋貿易"
      ],
      "correct": 1
    },
    "explain": [
      "海賊（倭寇）と正式な貿易船を区別するため、「勘合（かんごう）」と呼ばれる札を用いた勘合貿易を行いました。"
    ],
    "hint": "海賊と区別するための「札」の名前がついています。",
    "pack": "歴史"
  },
  {
    "id": "hg-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "古代メソポタミアで制定された、「目には目を、歯には歯を」の復讐法で知られる法典は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ユスティニアヌス法典",
        "ハンムラビ法典",
        "ナポレオン法典",
        "十二表法"
      ],
      "correct": 1
    },
    "explain": [
      "紀元前18世紀頃にバビロン第1王朝の王が制定したハンムラビ法典です。"
    ],
    "hint": "制定した王様の名前がついています。",
    "pack": "歴史"
  },
  {
    "id": "hg-026",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "幕末の「尊王攘夷」運動。「尊王」は天皇を尊ぶことですが、「攘夷」の本来の意味は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "外国を打ち払うこと",
        "外国の文化を取り入れること",
        "幕府を倒すこと",
        "平和を維持すること"
      ],
      "correct": 0
    },
    "explain": [
      "「攘」は払いのける、「夷」は野蛮人（転じて外国人）を意味し、外敵を武力で打ち払うことを指します。幕府を倒すのは「倒幕」です。"
    ],
    "hint": "「攘」という漢字には「はらう、退ける」という意味があります。",
    "pack": "歴史"
  },
  {
    "id": "hg-027",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "イスラム教の創始者ムハンマドが、神の啓示を受けたとされる聖典の名前は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "旧約聖書",
        "コーラン",
        "タルムード",
        "ヴェーダ"
      ],
      "correct": 1
    },
    "explain": [
      "イスラム教の聖典はコーラン（クルアーン）です。アラビア語で「読誦されるもの」を意味します。"
    ],
    "hint": "アラビア語で書かれています。",
    "pack": "歴史"
  },
  {
    "id": "hg-028",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1894年に起きた甲午農民戦争（東学党の乱）をきっかけに勃発した戦争は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "日露戦争",
        "日中戦争",
        "日清戦争",
        "太平洋戦争"
      ],
      "correct": 2
    },
    "explain": [
      "朝鮮半島で起きた甲午農民戦争の鎮圧をめぐって日清両軍が衝突し、日清戦争へと発展しました。"
    ],
    "hint": "朝鮮半島の支配権をめぐって清（中国）と戦いました。",
    "pack": "歴史"
  },
  {
    "id": "hg-029",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "アメリカのリンカーン大統領が発した有名な言葉「人民の、人民による、人民のための政治」。これが行われた場所はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ワシントンD.C.",
        "ニューヨーク",
        "ゲティスバーグ",
        "フィラデルフィア"
      ],
      "correct": 2
    },
    "explain": [
      "南北戦争の激戦地であったゲティスバーグ国立戦没者墓地の奉献式で行われた演説です。"
    ],
    "hint": "「〇〇〇〇〇演説」と呼ばれます。",
    "pack": "歴史"
  },
  {
    "id": "hg-030",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "日本の旧石器時代の実在を証明した、群馬県にある遺跡の名前は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "三内丸山遺跡",
        "吉野ヶ里遺跡",
        "登呂遺跡",
        "岩宿遺跡"
      ],
      "correct": 3
    },
    "explain": [
      "1946年に相沢忠洋によって発見された岩宿遺跡から打製石器が出土し、日本にも旧石器時代があったことが証明されました。"
    ],
    "hint": "関東ローム層から石器が発見されました。",
    "pack": "歴史"
  },
  {
    "id": "hg-031",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "日本の地形図で使われる地図記号『文』が表すものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "小・中学校",
        "病院",
        "郵便局",
        "交番"
      ],
      "correct": 0
    },
    "explain": [
      "『文』は文字を学ぶ場所を表し、小・中学校の地図記号です。高校は『文』を丸で囲みます。"
    ],
    "hint": "文字を学ぶ場所です。",
    "pack": "地理"
  },
  {
    "id": "hg-032",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "日本で一番面積が広い都道府県は北海道ですが、二番目に広いのはどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "長野県",
        "新潟県",
        "岩手県",
        "福島県"
      ],
      "correct": 2
    },
    "explain": [
      "日本の都道府県の面積は、1位北海道、2位岩手県、3位福島県、4位長野県です。"
    ],
    "hint": "東北地方にある県です。",
    "pack": "地理"
  },
  {
    "id": "hg-033",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "世界で一番高い山はエベレストですが、どの山脈にありますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "アンデス山脈",
        "アルプス山脈",
        "ロッキー山脈",
        "ヒマラヤ山脈"
      ],
      "correct": 3
    },
    "explain": [
      "エベレスト（標高約8849m）は、アジアのヒマラヤ山脈にあります。"
    ],
    "hint": "アジア大陸にある山脈です。",
    "pack": "地理"
  },
  {
    "id": "hg-034",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "アメリカ合衆国の首都はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ニューヨーク",
        "ワシントンD.C.",
        "ロサンゼルス",
        "シカゴ"
      ],
      "correct": 1
    },
    "explain": [
      "アメリカの首都はワシントンD.C.です。ニューヨークは最大の経済都市ですが首都ではありません。"
    ],
    "hint": "ホワイトハウスがある都市です。",
    "pack": "地理"
  },
  {
    "id": "hg-035",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "オーストラリアの首都はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "シドニー",
        "メルボルン",
        "キャンベラ",
        "パース"
      ],
      "correct": 2
    },
    "explain": [
      "シドニーやメルボルンが有名ですが、首都を決める際に両都市が争った結果、中間に位置するキャンベラが首都として建設されました。"
    ],
    "hint": "シドニーでもメルボルンでもありません。",
    "pack": "地理"
  },
  {
    "id": "hg-036",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "日本の地形図で、丸の中に「〒」が描かれた記号は何を表しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "郵便局",
        "電波塔",
        "税務署",
        "気象台"
      ],
      "correct": 0
    },
    "explain": [
      "地形図で「〒」の記号が表すのは郵便局です。かつての逓信省（ていしんしょう）の「テ」に由来します。"
    ],
    "hint": "手紙や荷物を出す場所です。",
    "pack": "地理"
  },
  {
    "id": "hg-037",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本の地形図で、バツ印（Ｘ）の形をした地図記号は何を表していますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "交番",
        "病院",
        "消防署",
        "市役所"
      ],
      "correct": 0
    },
    "explain": [
      "X字の記号は交番を表します（警察署は丸で囲んだXで区別します）。警棒を交差させた形に由来すると言われています。"
    ],
    "hint": "警察官がいる場所です。",
    "pack": "地理"
  },
  {
    "id": "hg-038",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本の地形図で、アルファベットの「Y」の字に似た形（さすまたの形）の記号は何を表しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "神社",
        "消防署",
        "税務署",
        "裁判所"
      ],
      "correct": 1
    },
    "explain": [
      "消防署を表します。江戸時代の火消しが使っていた道具「さすまた」の形に由来します。"
    ],
    "hint": "火を消す道具の形が由来です。",
    "pack": "地理"
  },
  {
    "id": "hg-039",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "赤道が通っていない国はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ブラジル",
        "ケニア",
        "オーストラリア",
        "インドネシア"
      ],
      "correct": 2
    },
    "explain": [
      "オーストラリアは南半球にあり、赤道よりかなり南に位置しています。"
    ],
    "hint": "南半球のみに位置する大陸国です。",
    "pack": "地理"
  },
  {
    "id": "hg-040",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "カナダの首都はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "トロント",
        "バンクーバー",
        "オタワ",
        "モントリオール"
      ],
      "correct": 2
    },
    "explain": [
      "カナダの首都はオタワです。トロントやバンクーバーは人口の多い有名都市ですが首都ではありません。"
    ],
    "hint": "最も人口が多い都市ではありません。",
    "pack": "地理"
  },
  {
    "id": "hg-041",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "世界で一番流域面積が広い川はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ナイル川",
        "アマゾン川",
        "ミシシッピ川",
        "長江"
      ],
      "correct": 1
    },
    "explain": [
      "長さが世界一なのはナイル川ですが、流域面積（水が集まる範囲）が圧倒的に世界一なのは南米のアマゾン川です。"
    ],
    "hint": "南アメリカ大陸を流れる川です。",
    "pack": "地理"
  },
  {
    "id": "hg-042",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本で一番短い川（二級河川）として知られる「ぶつぶつ川」がある都道府県はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "和歌山県",
        "静岡県",
        "高知県",
        "沖縄県"
      ],
      "correct": 0
    },
    "explain": [
      "和歌山県那智勝浦町にある「ぶつぶつ川」は、全長わずか13.5メートルの日本最短の川です。"
    ],
    "hint": "本州の紀伊半島にある県です。",
    "pack": "地理"
  },
  {
    "id": "hg-043",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本の最南端の島はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "波照間島",
        "与那国島",
        "沖ノ鳥島",
        "南鳥島"
      ],
      "correct": 2
    },
    "explain": [
      "日本の領土の最南端は東京都に属する無人島「沖ノ鳥島」です。波照間島は「人が住んでいる最南端」の島です。"
    ],
    "hint": "満潮時には沈みそうになるため、コンクリートで護岸されている島です。",
    "pack": "地理"
  },
  {
    "id": "hg-044",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "地中海と紅海を結び、ヨーロッパとアジアの航路を大幅に短縮したエジプトの運河は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "パナマ運河",
        "スエズ運河",
        "キール運河",
        "コリントス運河"
      ],
      "correct": 1
    },
    "explain": [
      "エジプトにあるのはスエズ運河です。パナマ運河は太平洋と大西洋を結びます。"
    ],
    "hint": "エジプトにある運河です。",
    "pack": "地理"
  },
  {
    "id": "hg-045",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ヨーロッパで最も長い川であるヴォルガ川は、どの国を流れていますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ドイツ",
        "フランス",
        "ロシア",
        "ウクライナ"
      ],
      "correct": 2
    },
    "explain": [
      "ヴォルガ川はロシア西部を流れ、カスピ海に注ぐヨーロッパ最長の川です。"
    ],
    "hint": "カスピ海に注ぐ、世界最大の面積を持つ国の川です。",
    "pack": "地理"
  },
  {
    "id": "hg-046",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ブラジルの首都はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "サンパウロ",
        "リオデジャネイロ",
        "ブラジリア",
        "ブエノスアイレス"
      ],
      "correct": 2
    },
    "explain": [
      "ブラジルの首都は内陸部のブラジリアです。かつてはリオデジャネイロが首都でしたが、内陸開発のために移転しました。"
    ],
    "hint": "国の名前とよく似た名前の計画都市です。",
    "pack": "地理"
  },
  {
    "id": "hg-047",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "国際連合（国連）の本部がある都市はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ジュネーブ",
        "ニューヨーク",
        "ワシントンD.C.",
        "パリ"
      ],
      "correct": 1
    },
    "explain": [
      "国際連合の本部はアメリカのニューヨークにあります。スイスのジュネーブにあるのは国連の欧州本部などです。"
    ],
    "hint": "アメリカ最大の経済都市です。",
    "pack": "地理"
  },
  {
    "id": "hg-048",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日本の気候区分で、一年を通して降水量が少なく、夏と冬の気温差が大きいのはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "太平洋側気候",
        "日本海側気候",
        "瀬戸内海式気候",
        "内陸性気候"
      ],
      "correct": 3
    },
    "explain": [
      "海から離れているため湿った風が届きにくく降水量が少ない、そして寒暖差が激しいのが内陸性気候（中央高地など）の特徴です。"
    ],
    "hint": "海から離れた長野県などの気候です。",
    "pack": "地理"
  },
  {
    "id": "hg-049",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "日本の地形図で、半円の上に3本の縦の波線（湯気）が描かれた記号は何を表しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "工場",
        "発電所",
        "温泉",
        "噴火口"
      ],
      "correct": 2
    },
    "explain": [
      "温泉の記号です。浴槽から湯気が立ち上る様子を図案化したものです。"
    ],
    "hint": "温かいお湯が湧き出ている場所です。",
    "pack": "地理"
  },
  {
    "id": "hg-050",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "日本の地形図で、太陽のようなギザギザの歯車の形をした記号は何を表しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "発電所",
        "工場",
        "気象台",
        "灯台"
      ],
      "correct": 1
    },
    "explain": [
      "機械の歯車を図案化したもので、工場を表す地図記号です。"
    ],
    "hint": "機械を動かして物を作る場所です。",
    "pack": "地理"
  },
  {
    "id": "hg-051",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "アフリカ大陸で最も高い山（標高5,895m）は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "モンブラン",
        "マッキンリー",
        "キリマンジャロ",
        "アコンカグア"
      ],
      "correct": 2
    },
    "explain": [
      "キリマンジャロはタンザニアにあるアフリカ大陸最高峰です。モンブランはヨーロッパ、アコンカグアは南米の最高峰です。"
    ],
    "hint": "赤道付近にありますが、山頂には雪があります。",
    "pack": "地理"
  },
  {
    "id": "hg-052",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "スイスの首都はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ジュネーブ",
        "チューリッヒ",
        "ベルン",
        "バーゼル"
      ],
      "correct": 2
    },
    "explain": [
      "国際機関が多いジュネーブや、最大の経済都市であるチューリッヒと間違えられやすいですが、スイスの首都はベルンです。"
    ],
    "hint": "クマ（熊）が市の紋章になっている都市です。",
    "pack": "地理"
  },
  {
    "id": "hg-053",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "世界で最も面積が小さい国はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "モナコ",
        "ナウル",
        "ツバル",
        "バチカン市国"
      ],
      "correct": 3
    },
    "explain": [
      "イタリアのローマ市内にあるバチカン市国が世界最小の国家です。"
    ],
    "hint": "ローマ教皇の居住地です。",
    "pack": "地理"
  },
  {
    "id": "hg-054",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "南アメリカ大陸にある国で、公用語がスペイン語ではなくポルトガル語なのはどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "アルゼンチン",
        "コロンビア",
        "ブラジル",
        "チリ"
      ],
      "correct": 2
    },
    "explain": [
      "15世紀の条約によりポルトガルの植民地となったため、ブラジルのみ南米でポルトガル語が公用語となっています。"
    ],
    "hint": "南米最大の面積を持つ国です。",
    "pack": "地理"
  },
  {
    "id": "hg-055",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "地球上の緯度0度の線を「赤道」と呼びますが、経度0度の線を何と呼びますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "日付変更線",
        "本初子午線",
        "回帰線",
        "白夜線"
      ],
      "correct": 1
    },
    "explain": [
      "イギリスの旧グリニッジ天文台を通る経度0度の線を本初子午線（ほんしょしごせん）と呼びます。"
    ],
    "hint": "イギリスの旧グリニッジ天文台を通る線です。",
    "pack": "地理"
  },
  {
    "id": "hg-056",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "南アメリカの国エクアドルの国名の由来となった言葉の意味は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "黄金郷",
        "銀の川",
        "赤道",
        "南の海"
      ],
      "correct": 2
    },
    "explain": [
      "エクアドル（Ecuador）はスペイン語で「赤道」を意味します。その名の通り赤道直下に位置しています。"
    ],
    "hint": "緯度0度の線のことです。",
    "pack": "地理"
  },
  {
    "id": "hg-057",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "ヨーロッパとアジアの境界にあるとされる、トルコ最大の都市はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "アンカラ",
        "イスタンブール",
        "ドバイ",
        "テヘラン"
      ],
      "correct": 1
    },
    "explain": [
      "ボスポラス海峡を挟んでヨーロッパ側とアジア側にまたがる都市がイスタンブールです。なお、トルコの首都はアンカラです。"
    ],
    "hint": "かつてはコンスタンティノープルと呼ばれていました。",
    "pack": "地理"
  },
  {
    "id": "hg-058",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "北ヨーロッパのスカンディナビア半島などで見られる、氷河の浸食によってできた複雑な入り江を何と呼びますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "リアス海岸",
        "フィヨルド",
        "カルデラ",
        "カルスト地形"
      ],
      "correct": 1
    },
    "explain": [
      "氷河の浸食によるU字谷に海水が入り込んでできた地形をフィヨルドと呼びます。リアス海岸は川の浸食（V字谷）によるものです。"
    ],
    "hint": "ノルウェーの海岸線に多く見られます。",
    "pack": "地理"
  },
  {
    "id": "hg-059",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "世界で最も多くの国と国境を接している国は中国ですが、もう一つ同じ数の国（14カ国）と接している国はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "アメリカ",
        "ロシア",
        "ブラジル",
        "インド"
      ],
      "correct": 1
    },
    "explain": [
      "中国とロシアはそれぞれ14の国と陸上で国境を接しており、世界最多です。"
    ],
    "hint": "世界最大の面積を持つ国です。",
    "pack": "地理"
  },
  {
    "id": "hg-060",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "カルデラ湖である摩周湖や屈斜路湖、阿寒湖などを擁する、北海道東部に広がる国立公園は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "大雪山国立公園",
        "阿寒摩周国立公園",
        "支笏洞爺国立公園",
        "釧路湿原国立公園"
      ],
      "correct": 1
    },
    "explain": [
      "阿寒湖、摩周湖、屈斜路湖などを含むエリアは阿寒摩周国立公園に指定されています。"
    ],
    "hint": "マリモで有名な阿寒湖も含まれます。",
    "pack": "地理"
  },
  {
    "id": "zat-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "衣類の洗濯表示で、三角形の中に×印が入ったマークは何を意味しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "漂白してはいけない",
        "アイロンがけをしてはいけない",
        "タンブル乾燥をしてはいけない",
        "ドライクリーニングをしてはいけない"
      ],
      "correct": 0
    },
    "explain": [
      "三角形は漂白を表す記号で、×が付くと漂白処理が禁止されます。アイロンはアイロンの形、乾燥は四角、タンブルは四角に円、ドライクリーニングは丸の記号です。"
    ],
    "hint": "三角形＝漂白に関するマークです。",
    "pack": "雑学"
  },
  {
    "id": "zat-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "衣類の洗濯表示で、洗濯桶の中に手が描かれたマークは何を意味しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "手洗いのみ",
        "洗濯機使用禁止",
        "弱い洗濯",
        "漂白禁止"
      ],
      "correct": 0
    },
    "explain": [
      "桶に手が入ったマークは『手洗いのみ』または『手洗い推奨』を意味します。洗濯機を使わず手で洗うことを示しています。"
    ],
    "hint": "手が描かれているので手作業に関する意味です。",
    "pack": "雑学"
  },
  {
    "id": "zat-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "衣類の洗濯表示で、四角の中に円があり、その円に斜線や×が付いているマークは何を意味しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "タンブル乾燥をしてはいけない",
        "自然乾燥のみ",
        "アイロンがけ禁止",
        "洗濯禁止"
      ],
      "correct": 0
    },
    "explain": [
      "四角は乾燥を表し、中の円はタンブル乾燥（乾燥機）を意味します。×や斜線がある場合はタンブル乾燥が禁止されています。"
    ],
    "hint": "四角＝乾燥、円＝回転する乾燥機です。",
    "pack": "雑学"
  },
  {
    "id": "zat-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "リサイクル可能なプラスチック製品に付いている、矢印が3つ輪になったマークの中に数字が入っている場合、その数字は何を表していますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "プラスチックの種類（樹脂識別番号）",
        "リサイクル回数",
        "製造年",
        "安全基準の等級"
      ],
      "correct": 0
    },
    "explain": [
      "このマークは『樹脂識別コード（SPIコード）』と呼ばれ、中の数字（1〜7）はプラスチックの樹脂の種類を示しています。例えば1はPET（ペットボトル）、2はHDPEなどです。"
    ],
    "hint": "数字でプラスチックの材質を識別するためのものです。",
    "pack": "雑学"
  },
  {
    "id": "zat-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "荷物や危険物に付いている『中央から3方向に弧が伸びている黄色いマーク』は何の危険を警告するものですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "放射能・放射性物質",
        "生物学的危険（バイオハザード）",
        "可燃性物質",
        "毒物・劇物"
      ],
      "correct": 0
    },
    "explain": [
      "3枚の扇や弧が中央から放射状に出ているマークは、国際的に『放射能』または『放射性物質』の危険を表すトレフォイル（三つ葉）マークです。黄色地に黒や紫で描かれます。"
    ],
    "hint": "原子力やX線に関連する危険マークです。",
    "pack": "雑学"
  },
  {
    "id": "zat-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "医療廃棄物や実験室で使われる『中央の円を囲んで3つの輪のような形が並んだマーク』は何の危険を表しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "生物学的危険（バイオハザード）",
        "放射能",
        "化学物質漏洩",
        "感染症指定"
      ],
      "correct": 0
    },
    "explain": [
      "中央の円を3つの三日月（輪）状の形が囲む『バイオハザード』シンボルで、感染性のある生物材料や病原体による危険を警告します。"
    ],
    "hint": "生物や細菌、ウイルスに関連する危険を示すマークです。",
    "pack": "雑学"
  },
  {
    "id": "zat-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "コウモリは空を飛べますが、生物の分類では何の仲間ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "哺乳類",
        "鳥類",
        "爬虫類",
        "昆虫類"
      ],
      "correct": 0
    },
    "explain": [
      "コウモリは哺乳類です。子に乳を与えて育て、毛が生えています。『空を飛ぶから鳥類』という思い込みがひっかけの定番です。鳥類は羽毛があり卵を産みます。"
    ],
    "hint": "乳で子を育てるかどうかで分類が変わります。",
    "pack": "雑学"
  },
  {
    "id": "zat-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "金魚の記憶力はどのくらい持続すると言われていますか（俗説ではなく実際の研究に基づく）。",
    "answer": {
      "kind": "choice",
      "options": [
        "数ヶ月以上",
        "3秒",
        "10秒",
        "数日"
      ],
      "correct": 0
    },
    "explain": [
      "金魚の『3秒しか記憶がない』は俗説です。研究では数ヶ月以上前の出来事や学習を覚えていることが確認されています。ひっかけは有名な誤った俗説を誘惑的に入れています。"
    ],
    "hint": "水槽の中で学習実験をした結果に基づきます。",
    "pack": "雑学"
  },
  {
    "id": "zat-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "バナナは植物学上、どの分類に属しますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "果実（ベリー）",
        "野菜",
        "種子",
        "根菜"
      ],
      "correct": 0
    },
    "explain": [
      "バナナはベリー類の果実です。種子がなく果肉が発達したものがベリーで、バナナはその典型例です。木ではなく草本植物の実です。"
    ],
    "hint": "種の有無と果肉のでき方で分類します。",
    "pack": "雑学"
  },
  {
    "id": "zat-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ハチミツはなぜ腐りにくいのですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "水分が少なく糖分が高いから",
        "天然の防腐剤が入っているから",
        "低温で固まる性質があるから",
        "pHが中性だから"
      ],
      "correct": 0
    },
    "explain": [
      "ハチミツは水分含有量が約17%と低く、糖分が非常に高いため、微生物が繁殖しにくい環境になっています。数千年経っても食べられる例があります。"
    ],
    "hint": "水分と糖分のバランスが鍵です。",
    "pack": "雑学"
  },
  {
    "id": "zat-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ダチョウが『危険を感じると頭を砂に埋める』と誤解されているのは、なぜですか？",
    "answer": {
      "kind": "choice",
      "options": [
        "地面に耳を付けて振動を感じている姿が誤解されたから",
        "本当に頭を埋めて眠るから",
        "砂を食べる習性があるから",
        "卵を砂の中に隠すため"
      ],
      "correct": 0
    },
    "explain": [
      "ダチョウが頭を砂に埋めるというのは俗説です。実際は時速60km以上で走って逃げます。頭を埋めているように見えるのは、地面に耳や頭を近づけて振動や音を確かめている姿勢が誤解されたものです。"
    ],
    "hint": "実際は走って逃げます。地面に近づくのは別の理由です。",
    "pack": "雑学"
  },
  {
    "id": "zat-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "雷が落ちやすい場所として有名なのはどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "高い木や建物、開けた場所",
        "海の中",
        "地下の洞窟",
        "森の茂みの中"
      ],
      "correct": 0
    },
    "explain": [
      "雷は高いものや尖ったもの、開けた場所に落ちやすいです。木の下は危険で、車の中や建物の中が安全です。雷は最短経路で地面に放電します。"
    ],
    "hint": "電気は高いところや抵抗の少ないところを通ります。",
    "pack": "雑学"
  },
  {
    "id": "zat-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "人間の脳は全体の何パーセントしか使っていないと言われる俗説がありますが、実際は？",
    "answer": {
      "kind": "choice",
      "options": [
        "ほぼ100%使っている",
        "10%程度",
        "30%程度",
        "50%程度"
      ],
      "correct": 0
    },
    "explain": [
      "『脳の10%しか使っていない』は俗説です。実際は安静時でも多くの領域が活動しており、特定のタスクで特定の部分が活発になるものの、全体としてほぼ全域を使っています。ひっかけは有名な誤解です。"
    ],
    "hint": "脳のエネルギー消費とfMRI研究の結果を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "蚊が人を刺すのはオスとメスのどちらですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "メスのみ",
        "オスのみ",
        "両方",
        "季節による"
      ],
      "correct": 0
    },
    "explain": [
      "蚊が血を吸うのはメスのみです。メスは産卵に必要なタンパク質を血液から得ます。オスは花の蜜などを吸います。"
    ],
    "hint": "産卵に必要な栄養を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "クモの糸は鋼鉄と比べてどのくらいの強さがありますか（同じ太さの場合）。",
    "answer": {
      "kind": "choice",
      "options": [
        "鋼鉄より強い",
        "鋼鉄と同じくらい",
        "鋼鉄より弱い",
        "木綿と同じくらい"
      ],
      "correct": 0
    },
    "explain": [
      "クモの糸（特にドラグラインシルク）は同じ太さの鋼鉄より強いと言われています。伸縮性もあり、衝撃を吸収する性質があります。人工合成の研究も進んでいます。"
    ],
    "hint": "クモが糸で獲物を捕らえる仕組みを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『ひげや髪を剃る（または切る）と濃く太くなる』という話がありますが、実際の理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "切った毛先が角ばって太く見える錯覚",
        "本当に太くなる",
        "毛根が活性化する",
        "血行が良くなるから"
      ],
      "correct": 0
    },
    "explain": [
      "剃ったり切ったりした毛先は断面が角ばり、光の反射が変わって太く濃く見える錯覚です。実際の毛の太さや本数は変わりません。"
    ],
    "hint": "毛の断面と光の反射を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "宇宙空間で音が聞こえない主な理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "音を伝える空気などの媒質がないから",
        "温度が低すぎるから",
        "重力がないから",
        "光が強すぎるから"
      ],
      "correct": 0
    },
    "explain": [
      "音は空気や水などの媒質の振動で伝わります。宇宙空間は真空に近く媒質がほとんどないため、音が伝わりません。映画の爆発音などは演出です。"
    ],
    "hint": "音の伝わり方の物理法則を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "月の表面に足跡が長年残り続ける理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "風や雨などの侵食がないから",
        "重力が弱いから",
        "温度変化が激しいから",
        "土が特殊な性質だから"
      ],
      "correct": 0
    },
    "explain": [
      "月には大気や水、風がないため、侵食がほとんど起きません。アポロの宇宙飛行士の足跡は数十年経っても残っています。将来的に隕石の衝突で消える可能性はあります。"
    ],
    "hint": "地球と月の環境の違いを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ナポレオン・ボナパルトの実際の身長は、約何cmだったと言われていますか？",
    "answer": {
      "kind": "choice",
      "options": [
        "約169cm",
        "約150cm",
        "約158cm",
        "約185cm"
      ],
      "correct": 0
    },
    "explain": [
      "ナポレオンの身長は約169cmで、当時のフランス人男性の平均（約165cm前後）よりやや高めでした。『低身長』のイメージは、英国の風刺画や、フランスインチと英国インチの単位の違いによる誤解が広まったものです。"
    ],
    "hint": "当時のフランス人男性の平均は約165cmでした。",
    "pack": "雑学"
  },
  {
    "id": "zat-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "電子レンジで温めた食品が端だけ熱くなって中心が冷たいままになりやすい理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "マイクロ波が表面で多く吸収され、中心まで届きにくいから",
        "熱が外に逃げやすいから",
        "食品の水分が偏っているから",
        "ターンテーブルが遅いから"
      ],
      "correct": 0
    },
    "explain": [
      "マイクロ波は食品の表面や水分が多い部分で強く吸収され、中心まで均等に届きにくい性質があります。加熱ムラを防ぐために途中でかき混ぜるか、加熱時間を調整する必要があります。"
    ],
    "hint": "マイクロ波の性質と食品の厚みを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "人間の体の中で、一生を通じて最も成長を続ける部分はどこですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "耳の軟骨と鼻の軟骨",
        "髪の毛",
        "爪",
        "骨全体"
      ],
      "correct": 0
    },
    "explain": [
      "年を取ると耳や鼻が大きく見えやすいのは、軟骨が少しずつ変化・成長することに加え、皮膚のたるみや重力の影響も重なるためと言われます。髪や爪は伸びますが、成長というより新陳代謝です。"
    ],
    "hint": "加齢とともに目立つ体の変化を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『1日に必要な水の量は2リットル』という説がありますが、実際の科学的根拠は？",
    "answer": {
      "kind": "choice",
      "options": [
        "個人差が大きく、一律の数字に根拠はない",
        "厳密に2リットル必要",
        "食事からの水分も含めて2リットル",
        "運動しない人は1リットルで十分"
      ],
      "correct": 0
    },
    "explain": [
      "『1日2リットル』は明確な科学的根拠に基づく一律の数字ではありません。必要な水分量は体重、気候、活動量、食事内容によって大きく異なります。尿の色や喉の渇きで判断するのが適切です。"
    ],
    "hint": "『8杯の水』神話の由来を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "カエルの尿はなぜ毒にならないのですか（一部の種を除く）。",
    "answer": {
      "kind": "choice",
      "options": [
        "尿素を分解してアンモニアにしないから",
        "体が小さいから",
        "水の中で生活するから",
        "毒を中和する成分があるから"
      ],
      "correct": 0
    },
    "explain": [
      "多くのカエルは尿をアンモニアではなく尿素の形で排出します。尿素は毒性が低く、水に溶けやすいため、毒として問題になりません。一部の毒ガエルは皮膚から毒を出しますが、尿とは別です。"
    ],
    "hint": "窒素老廃物の処理方法の違いを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "サッカーの試合で、ボールがゴールラインを完全に超えたと判定されるのはどの瞬間ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ボールの全体がラインを越えた瞬間",
        "ボールの半分がラインを越えた瞬間",
        "ボールがゴールネットに触れた瞬間",
        "選手がボールを蹴った瞬間"
      ],
      "correct": 0
    },
    "explain": [
      "サッカーではボールの『全体』がゴールラインを完全に越えた瞬間にゴールと判定されます。VAR（ビデオ・アシスタント・レフェリー）でもこの基準で確認されます。"
    ],
    "hint": "ルールの正確な文言を思い出します。",
    "pack": "雑学"
  },
  {
    "id": "zat-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『エビは老化すると腰が曲がる』という話がありますが、実際はどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "老化ではなく死ぬ直前の症状",
        "本当に老化で腰が曲がる",
        "エビは老化しない",
        "腰が曲がるのは別の病気"
      ],
      "correct": 0
    },
    "explain": [
      "エビが腰を曲げるのは老化ではなく、死ぬ直前や弱った時の症状です。健康なエビはまっすぐです。『老化で腰が曲がる』は誤ったイメージです。"
    ],
    "hint": "エビの生死と姿勢の関係を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-026",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『OK』の語源として有力な説の一つは何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "『All Correct』の頭文字を崩したもの",
        "『Okay』の音の響きから",
        "アメリカ先住民の言葉",
        "フランス語の『au quai』"
      ],
      "correct": 0
    },
    "explain": [
      "『OK』の語源には諸説ありますが、有力なのは19世紀アメリカで『All Correct』を『Oll Korrect』と書いた頭文字説です。他にも『Old Kinderhook』など諸説あります。"
    ],
    "hint": "19世紀のアメリカの流行語の由来です。",
    "pack": "雑学"
  },
  {
    "id": "zat-027",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "地球の自転が止まると、赤道付近の人間はどのくらいの速度で飛ばされることになりますか（概算）。",
    "answer": {
      "kind": "choice",
      "options": [
        "時速約1700km以上",
        "時速約100km",
        "時速約500km",
        "ほとんど動かない"
      ],
      "correct": 0
    },
    "explain": [
      "赤道での地球自転速度は約1670km/hです。自転が急に止まると、慣性でその速度のまま飛ばされます。建物や地面も同じ速度なので相対的には複雑ですが、破壊的な影響です。"
    ],
    "hint": "赤道周長と24時間の計算を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-028",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "ライオンが群れで協力して狩りをするときの成功率は、約どれくらいと言われていますか？",
    "answer": {
      "kind": "choice",
      "options": [
        "約30%",
        "約5%",
        "約60%",
        "約90%"
      ],
      "correct": 0
    },
    "explain": [
      "ライオンが群れで協力して狩る場合の成功率は約25〜30%とされ、意外と低めです。アフリカンワイルドドッグ（リカオン）など、もっと成功率の高い肉食動物もいます。"
    ],
    "hint": "成功するのは数回に1回ほど。半分にも届きません。",
    "pack": "雑学"
  },
  {
    "id": "zat-029",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "マグロの血が赤くなく、茶色や黒っぽく見えることがある理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "血の色素が酸素と結びつきにくい性質があるから",
        "血が少ないから",
        "光の当たり方による錯覚",
        "マグロ特有の病気"
      ],
      "correct": 0
    },
    "explain": [
      "マグロなどの回遊魚は、筋肉のミオグロビン含有量が多く、血の色が濃く見えたり、酸素の結合状態で色が変わったりします。新鮮な時は透明に近い赤ですが、時間が経つと変色します。"
    ],
    "hint": "魚の筋肉と酸素運搬の仕組みを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-030",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "『パイナップルは果物ではなく、複数の花が集まったもの』という説明は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。集合果である",
        "誤り。普通の果物である",
        "正しいが野菜である",
        "誤り。種子植物ではない"
      ],
      "correct": 0
    },
    "explain": [
      "パイナップルは『集合果』または『複合果』と呼ばれるもので、多数の小さな果実が集まって1つの実になったものです。1つの花の部分が実になる普通の果物とは異なります。"
    ],
    "hint": "パイナップルの表面の『目』が何を表すか考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-031",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『犬の鼻が濡れているのは健康の証拠』という説がありますが、実際はどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "健康とは直接関係ない",
        "健康な犬は必ず濡れている",
        "病気の犬だけが濡れている",
        "年齢によって異なる"
      ],
      "correct": 0
    },
    "explain": [
      "犬の鼻が濡れているのは、健康の絶対的な証拠ではありません。健康な犬でも乾いていることはあり、逆に病気の犬でも濡れていることがあります。湿度は環境や個体差によります。"
    ],
    "hint": "犬の鼻の機能と健康診断の関係を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-032",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『yawn（あくび）をするのは脳を冷やすため』という説がありますが、主な理由として有力なのは？",
    "answer": {
      "kind": "choice",
      "options": [
        "脳の温度を下げるためという説が有力",
        "単なる疲労のサイン",
        "酸素をたくさん取り込むため",
        "あくびは意味のない反射"
      ],
      "correct": 0
    },
    "explain": [
      "あくびの機能には諸説ありますが、『脳の温度を下げる』という説が近年有力視されています。あくびで大量の空気を取り込み、血流を増やして脳を冷却する効果があると考えられています。"
    ],
    "hint": "あくびの生理学的研究の結果です。",
    "pack": "雑学"
  },
  {
    "id": "zat-033",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『光の速さは一定』ですが、実際に光が一番速く進むのはどの媒質ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "真空",
        "空気",
        "水",
        "ガラス"
      ],
      "correct": 0
    },
    "explain": [
      "光の速さは真空中で最も速く（約30万km/s）、物質中では遅くなります。空気中はわずかに遅く、水やガラスではさらに遅くなります（屈折の原因）。"
    ],
    "hint": "光の屈折と媒質の関係を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-034",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『北極と南極では、どちらのほうが寒いですか』という質問で、よくある誤解を突く正しい答えは？",
    "answer": {
      "kind": "choice",
      "options": [
        "南極のほうが寒い",
        "北極のほうが寒い",
        "同じくらい寒い",
        "季節による"
      ],
      "correct": 0
    },
    "explain": [
      "南極のほうが平均気温が低く、地球上で最も寒い場所です。南極は大陸で標高が高く、氷床が厚いため冷え込みます。北極は海氷の上なので相対的に暖かいです。"
    ],
    "hint": "大陸と海氷の違い、標高を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-035",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『味噌汁の味噌は、最初から入れて煮込むと味が染みておいしい』という考えは正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "誤り。火を止めてから入れるのが基本",
        "正しい。長く煮込むほどおいしい",
        "正しいが塩分が濃くなる",
        "誤り。最初に入れると色が悪くなる"
      ],
      "correct": 0
    },
    "explain": [
      "味噌は火を止めてから入れるのが基本です。長く煮込むと味噌の風味が飛んだり、成分が変化したりして風味が損なわれます。溶かして入れるのがおすすめです。"
    ],
    "hint": "味噌の成分と加熱の影響を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-036",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "『人間の体温は1日の中で朝が一番低く、夕方が一番高い』という事実は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。体内時計の影響",
        "誤り。常に一定",
        "正しいが個人差が大きい",
        "誤り。夜が一番低い"
      ],
      "correct": 0
    },
    "explain": [
      "人間の体温は体内時計（サーカディアンリズム）の影響で、明け方に最も低く、夕方〜夜にかけて高くなります。個人差はありますが、傾向は共通しています。"
    ],
    "hint": "体内時計とホルモンのリズムを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-037",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『ゾウはネズミを怖がる』という話がありますが、実際の研究ではどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ネズミを特に怖がる証拠はない",
        "本当に怖がる",
        "ネズミの声に反応する",
        "群れでネズミを追い払う"
      ],
      "correct": 0
    },
    "explain": [
      "ゾウがネズミを怖がるという話は、ほとんど根拠のない俗説です。実際の観察や研究では、ゾウがネズミを特別に怖がる行動は確認されていません。サーカスなどの演出が広めたイメージです。"
    ],
    "hint": "動物の行動研究の結果を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-038",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『プラスチックごみを燃やすとダイオキシンが出る』という話は、すべてのプラスチックに当てはまりますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "誤り。塩素を含むプラスチックが主な原因",
        "正しい。すべてのプラスチックで出る",
        "正しいが現代の焼却炉では無害",
        "誤り。プラスチックは燃やせない"
      ],
      "correct": 0
    },
    "explain": [
      "ダイオキシンは主に塩素を含むプラスチック（PVCなど）を不完全燃焼させた場合に発生しやすいです。すべてのプラスチックが同じようにダイオキシンを出すわけではありません。適切な焼却施設では抑制されます。"
    ],
    "hint": "ダイオキシンの発生条件を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-039",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『人間の髪の毛は死んだ細胞でできている』という説明は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。毛根で作られた角質化した細胞",
        "誤り。生きている細胞が集まっている",
        "正しいが根元だけ生きている",
        "誤り。タンパク質の繊維ではない"
      ],
      "correct": 0
    },
    "explain": [
      "髪の毛の大部分（毛幹）は、毛根で作られた角質化した死んだ細胞が積み重なったものです。生きているのは毛根の部分だけです。爪も同様の構造です。"
    ],
    "hint": "毛の成長過程と細胞の状態を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-040",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『左利きの人は右利きの人より寿命が短い』という研究結果が昔ありましたが、現在の見解は？",
    "answer": {
      "kind": "choice",
      "options": [
        "その後の研究で否定された",
        "今も有効なデータ",
        "左利きだけに限った話",
        "右利きも同様の傾向"
      ],
      "correct": 0
    },
    "explain": [
      "1990年代に『左利きは寿命が短い』という論文が話題になりましたが、その後の大規模研究や再分析で方法論の問題が指摘され、広く否定されています。現在では左利きと寿命の因果関係は認められていません。"
    ],
    "hint": "古い研究の再現性とサンプルサイズを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-041",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『納豆の糸を引く成分』の主な正体は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ポリ-γ-グルタミン酸というタンパク質",
        "でんぷん",
        "脂肪",
        "ビタミン"
      ],
      "correct": 0
    },
    "explain": [
      "納豆の糸を引く成分は、納豆菌が作り出す『ポリ-γ-グルタミン酸』という高分子化合物です。粘り気と糸を引く性質の主役で、健康効果も研究されています。"
    ],
    "hint": "納豆菌の代謝産物です。",
    "pack": "雑学"
  },
  {
    "id": "zat-042",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "『スイカの種を食べるとお腹にスイカが生える』という話は本当ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "本当ではない。消化されてしまう",
        "本当。種が発芽する",
        "本当だが稀なケース",
        "本当ではないが栄養になる"
      ],
      "correct": 0
    },
    "explain": [
      "スイカの種を食べてもお腹で発芽することはありません。種は消化液で分解・吸収されるか、そのまま排出されます。昔の子供向けの脅し話です。"
    ],
    "hint": "人間の消化器官の環境を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-043",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『猫は甘いものがわからない』という話がありますが、実際の理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "甘味受容体遺伝子が機能していないから",
        "甘いものが嫌いだから",
        "嗅覚が甘さを邪魔するから",
        "学習していないから"
      ],
      "correct": 0
    },
    "explain": [
      "猫は甘味を感じる受容体をコードする遺伝子に変異があり、機能していません。そのため甘味を感知できません。肉食動物としての進化の結果です。"
    ],
    "hint": "猫の味覚受容体の遺伝子研究です。",
    "pack": "雑学"
  },
  {
    "id": "zat-044",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ボウリングで『ストライク』を取ったフレームの得点計算のルールとして、正しいのはどれですか？",
    "answer": {
      "kind": "choice",
      "options": [
        "ストライクの10点＋次の2投の合計",
        "ストライクの10点のみ",
        "ストライクの10点＋次の1投のみ",
        "そのフレームの得点は0"
      ],
      "correct": 0
    },
    "explain": [
      "ストライクを取ったフレームの得点は、10点＋次の2投のピンの合計になります。（スペアの場合は10点＋次の1投の合計です。）これがボウリングの得点計算の基本です。"
    ],
    "hint": "10点に、その後の『ボーナスの投球』の得点が加わります。",
    "pack": "雑学"
  },
  {
    "id": "zat-045",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『人間の目で感知できる光の波長範囲』はおおよそどのくらいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "約380nm〜780nm（可視光線）",
        "約100nm〜1000nm",
        "約1mm〜1m（マイクロ波）",
        "約10nm〜100nm（紫外線）"
      ],
      "correct": 0
    },
    "explain": [
      "人間の目が感知できる可視光線の波長は約380ナノメートル（紫）から780ナノメートル（赤）程度です。この範囲外は紫外線や赤外線として目には見えません。"
    ],
    "hint": "虹の色と光のスペクトルを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-046",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『水は100℃で沸騰する』という知識は正しいですが、条件が変わるとどうなりますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "気圧が低いと沸点が下がる",
        "気圧が高いと沸点が下がる",
        "水の量が多いと沸点が上がる",
        "容器の材質で沸点が変わる"
      ],
      "correct": 0
    },
    "explain": [
      "水の沸点は気圧に依存します。標高が高い場所（気圧が低い）では100℃より低い温度で沸騰します。圧力鍋は逆で高い圧力で沸点を上げて調理します。"
    ],
    "hint": "富士山の頂上でお湯が沸騰する温度を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-047",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『人間の体は大人になるにつれて骨の数が減る』という事実は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。いくつかの骨が癒合するから",
        "誤り。骨の数は一生変わらない",
        "正しい。不要な骨が吸収されるから",
        "誤り。むしろ増える"
      ],
      "correct": 0
    },
    "explain": [
      "赤ちゃんの骨の数は約270個ですが、大人になると約206個に減ります。これは成長過程でいくつかの骨が癒合（くっついて1つになる）するためです。"
    ],
    "hint": "赤ちゃんの頭の骨や骨盤の変化を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-048",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "『クジラは魚ではなく哺乳類』という分類は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。肺呼吸をし子に乳を与える",
        "誤り。魚の仲間である",
        "正しいが一部の種は例外",
        "誤り。両生類に近い"
      ],
      "correct": 0
    },
    "explain": [
      "クジラは哺乳類です。肺で呼吸をし、子に乳を与えて育て、恒温動物です。魚類とは全く異なる進化の系統です。イルカも同様です。"
    ],
    "hint": "呼吸方法と子育ての方法で分類します。",
    "pack": "雑学"
  },
  {
    "id": "zat-049",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『トイレの便座は意外と清潔』という話がありますが、実際の細菌数で比較するとどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "スマホやキーボードのほうが汚いことが多い",
        "トイレの便座が一番汚い",
        "トイレの床が一番汚い",
        "すべて同じくらい汚い"
      ],
      "correct": 0
    },
    "explain": [
      "研究によると、トイレの便座は意外と清潔で、スマホの画面やキーボード、パソコンのマウスの方が細菌数が多いことがあります。便座は定期的に清掃されるためです。"
    ],
    "hint": "日常の接触頻度の高いものと比較します。",
    "pack": "雑学"
  },
  {
    "id": "zat-050",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『人間の指紋は一生変わらない』という事実は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。生涯を通じてほぼ変わらない",
        "誤り。加齢で変化する",
        "正しいが怪我をすると変わる",
        "誤り。成長とともに大きくなる"
      ],
      "correct": 0
    },
    "explain": [
      "指紋の隆線パターンは胎児期に形成され、生涯を通じてほぼ変わりません。怪我で深い傷を負わない限り、基本パターンは維持されます。同一人物の証明に使われる理由です。"
    ],
    "hint": "指紋の形成時期と安定性を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-051",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『光速に近い速度で移動すると時間が遅く進む』という相対性理論の効果を、日常で最も感じやすい例はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "GPS衛星の時刻補正",
        "飛行機の搭乗で時差ボケが起きる",
        "エレベーターで上る時の体重変化",
        "トンネルに入った時の音の変化"
      ],
      "correct": 0
    },
    "explain": [
      "GPS衛星は高速で地球を周回しているため、特殊相対性理論により時計がわずかに遅れます。また重力の影響（一般相対性理論）もあり、地上の時計との誤差を補正しないと位置情報に大きな誤差が出ます。"
    ],
    "hint": "人工衛星と地上の時計の同期の問題です。",
    "pack": "雑学"
  },
  {
    "id": "zat-052",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『人間の髪の毛や爪は死後も伸び続ける』という話がありますが、実際はどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "皮膚が収縮して相対的に長く見えるだけ",
        "本当に伸び続ける",
        "死後数時間だけ伸びる",
        "水分が抜けて縮む"
      ],
      "correct": 0
    },
    "explain": [
      "死後に髪や爪が伸びるという話は誤りです。実際は皮膚や体液が失われて収縮し、相対的に髪や爪が長く見える錯覚です。細胞活動が止まっているので、本当に伸びることはありません。"
    ],
    "hint": "死後の体の変化と視覚の錯覚を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-053",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『レモンはビタミンCが豊富』ですが、同じ重さで比較したときにビタミンC含有量が多い果物はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "キウイフルーツやパプリカ（赤・黄）",
        "りんご",
        "バナナ",
        "ぶどう"
      ],
      "correct": 0
    },
    "explain": [
      "同じ重さで比べると、キウイや赤・黄パプリカの方がレモンよりビタミンC含有量が多いです。レモンは酸味が強いイメージから『ビタミンCの王様』と思われがちですが、実際は他の果物・野菜に負けます。"
    ],
    "hint": "100gあたりのビタミンC含有量を比較します。",
    "pack": "雑学"
  },
  {
    "id": "zat-054",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "東向きに飛ぶ飛行機が、西向きより速く到着しやすいのは主に何の影響ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "上空を西から東へ吹く偏西風（ジェット気流）",
        "地球の自転による追い風",
        "東向きは重力が弱まるから",
        "燃料を多く積めるから"
      ],
      "correct": 0
    },
    "explain": [
      "主な理由は上空を西から東へ吹く強い偏西風（ジェット気流）です。飛行機も周りの空気も地球と一緒に回っているため『自転が直接の追い風になる』というのは誤解で、これがひっかけです。"
    ],
    "hint": "上空をいつも西から東へ吹いている強い風があります。",
    "pack": "雑学"
  },
  {
    "id": "zat-055",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『人間の体は1日に約1gの皮膚の垢を落としている』という話がありますが、実際の主な成分は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "死んだ皮膚細胞（角質）",
        "汗と皮脂の混合",
        "埃と汚れ",
        "細菌の死骸"
      ],
      "correct": 0
    },
    "explain": [
      "1日の『垢』の大半は、皮膚の表面から自然に剥がれ落ちる死んだ角質細胞です。約28日周期で皮膚は生まれ変わり、古い細胞が垢として落ちます。『1g』という数字は概算です。"
    ],
    "hint": "皮膚のターンオーバー周期を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-056",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『マウスの平均寿命は約2年』ですが、実験室で飼育されたマウスと野生のマウスで寿命が大きく異なる主な理由は何ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "捕食者や環境ストレスが少ないから",
        "餌の質が違うから",
        "運動量が違うから",
        "遺伝子が違うから"
      ],
      "correct": 0
    },
    "explain": [
      "実験室のマウスは捕食者や厳しい環境、感染症から守られ、安定した餌と温度で飼育されるため、野生のマウスより寿命が長くなる傾向があります。野生では数ヶ月で死ぬ個体も多いです。"
    ],
    "hint": "生存環境の過酷さと保護の違いを考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-057",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『人間の耳は、音の方向を特定するために左右の耳で聞こえる音のタイミングと大きさの差を利用している』という説明は正しいですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正しい。音源定位の基本原理",
        "誤り。片耳だけで十分",
        "正しいが視覚の補助が必要",
        "誤り。耳たぶの形だけが重要"
      ],
      "correct": 0
    },
    "explain": [
      "人間は両耳間の音の到達時間差（ITD）と強度差（ILD）を利用して音の方向を特定しています。耳たぶの形も周波数特性に影響を与え、立体的な定位を助けています。"
    ],
    "hint": "ステレオ音響や3Dオーディオの原理です。",
    "pack": "雑学"
  },
  {
    "id": "zat-058",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『人間の体温が37℃なのは、細菌が繁殖しにくい温度だから』という説がありますが、実際の主な理由は？",
    "answer": {
      "kind": "choice",
      "options": [
        "哺乳類の進化の過程で最適化された結果",
        "細菌対策が主目的",
        "脳の活動に最適な温度",
        "偶然の産物"
      ],
      "correct": 0
    },
    "explain": [
      "37℃前後という体温は、哺乳類の進化の過程で代謝や酵素活性に最適な温度として選択されてきた結果です。細菌対策の側面もありますが、主な理由は『細菌が繁殖しにくいから』という単純なものではありません。"
    ],
    "hint": "恒温動物の進化と代謝効率を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-059",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "『飛行機が飛ぶ原理』の主な説明として正しいのはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "翼の上下で空気の流れる速さが違い、圧力差が生まれるから",
        "翼が空気を下に押す反作用だけ",
        "エンジンの推力だけで浮く",
        "翼の形が空気を吸い上げるから"
      ],
      "correct": 0
    },
    "explain": [
      "飛行機が飛ぶ主な原理は、ベルヌーイの定理による翼の上下の空気速度差と圧力差（揚力）です。翼が空気を下に押す作用・反作用も重要で、両方が働いています。単純な一つの説明では不十分です。"
    ],
    "hint": "流体力学とニュートンの第3法則の両方を考えます。",
    "pack": "雑学"
  },
  {
    "id": "zat-060",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "『人間の体は加齢とともに筋肉が減り、脂肪が増える』という話がありますが、筋肉量減少の主な原因として正しいのは？",
    "answer": {
      "kind": "choice",
      "options": [
        "運動不足とタンパク質摂取不足が主因",
        "加齢だけで自然に減る",
        "ホルモンの変化だけが原因",
        "脂肪が増えるから筋肉が減る"
      ],
      "correct": 0
    },
    "explain": [
      "加齢による筋肉量減少（サルコペニア）の主な原因は、運動不足とタンパク質の摂取不足です。加齢自体も影響しますが、適切な筋力トレーニングと栄養でかなり防げます。『年だから仕方ない』は誤りです。"
    ],
    "hint": "高齢者の筋力維持の研究結果を考えます。",
    "pack": "雑学"
  },
  {
    "id": "kj-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「代替」の本来の読みとして正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "だいたい",
        "だいがえ",
        "だいかえ",
        "たいたい"
      ],
      "correct": 0
    },
    "explain": [
      "「代替」の本来の読みは「だいたい」。「だいがえ」は『代替案』などで広まった慣用読みで、本来は誤りとされる。"
    ],
    "hint": "「替」の音読みは「タイ」。同じ音の熟語『交替（こうたい）』を思い出す。",
    "pack": "漢字"
  },
  {
    "id": "kj-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「相殺」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "そうさつ",
        "そうさい",
        "あいさつ",
        "そうせつ"
      ],
      "correct": 1
    },
    "explain": [
      "差し引きしてゼロにすることを「相殺（そうさい）」という。「殺」をここでは「サイ」と読む。"
    ],
    "hint": "「殺」には「サイ」という読みもある（減殺＝げんさい）。",
    "pack": "漢字"
  },
  {
    "id": "kj-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「貼付」の本来の読みとして正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "てんぷ",
        "ちょうづけ",
        "ちょうふ",
        "はりつけ"
      ],
      "correct": 2
    },
    "explain": [
      "「貼付」の本来の読みは「ちょうふ」。「てんぷ」は『添付』との混同から広まった慣用読み。"
    ],
    "hint": "「貼」の音読みは「チョウ」。",
    "pack": "漢字"
  },
  {
    "id": "kj-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "図表などの見方を示す「凡例」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ぼんれい",
        "ぼんれつ",
        "はんれつ",
        "はんれい"
      ],
      "correct": 3
    },
    "explain": [
      "「凡例」は「はんれい」。「ぼん」と読みがちだが、ここでの「凡」は「ハン」と読む。"
    ],
    "hint": "「平凡」の凡ではなく「ハン」と読む。",
    "pack": "漢字"
  },
  {
    "id": "kj-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "金銭の出し入れを表す「出納」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "しゅつのう",
        "すいとう",
        "しゅとう",
        "でのう"
      ],
      "correct": 1
    },
    "explain": [
      "「出納」は「すいとう」。「出」を「すい」、「納」を「とう」と読む特殊な読み方。"
    ],
    "hint": "「出納係」という言葉で覚える。",
    "pack": "漢字"
  },
  {
    "id": "kj-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "一つ一つ順を追って、の意味の「逐一」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ちくいち",
        "ついいち",
        "ちくいつ",
        "じくいち"
      ],
      "correct": 0
    },
    "explain": [
      "「逐一」は「ちくいち」。「逐」は「チク」と読む（逐次＝ちくじ）。"
    ],
    "hint": "「逐次（ちくじ）」と同じ「逐」。",
    "pack": "漢字"
  },
  {
    "id": "kj-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "魚をとる網「投網」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "とうあみ",
        "とうもう",
        "とあみ",
        "なげあみ"
      ],
      "correct": 2
    },
    "explain": [
      "「投網」は「とあみ」。「投」を「とう」と伸ばさず「と」と読む。"
    ],
    "hint": "「投げる網」だが読みは伸ばさない。",
    "pack": "漢字"
  },
  {
    "id": "kj-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「早急」の本来の読みとして正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "そうきゅう",
        "さっきゅう",
        "そうきょう",
        "はやきゅう"
      ],
      "correct": 1
    },
    "explain": [
      "「早急」の本来の読みは「さっきゅう」。「そうきゅう」は慣用読みで、本来は誤りとされる。"
    ],
    "hint": "「早速（さっそく）」と同じく「早」を「さっ」と読む。",
    "pack": "漢字"
  },
  {
    "id": "kj-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「この製品の品質を○○する」の○○に入る正しい『ほしょう』はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "保障",
        "補償",
        "保賞",
        "保証"
      ],
      "correct": 3
    },
    "explain": [
      "品質などを請け合うのは「保証」。「保障」は地位や安全を守ること、「補償」は損害を埋め合わせること。"
    ],
    "hint": "「品質を請け合う」意味の『ほしょう』。",
    "pack": "漢字"
  },
  {
    "id": "kj-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「左右が○○な図形」の○○に入る、『つり合っていること』を意味する正しい『たいしょう』はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "対称",
        "対象",
        "対照",
        "対症"
      ],
      "correct": 0
    },
    "explain": [
      "左右がつり合うのは「対称」。「対象」は相手・目標、「対照」は照らし合わせること。"
    ],
    "hint": "シンメトリー＝左右が同じ形。",
    "pack": "漢字"
  },
  {
    "id": "kj-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "遠慮、という意味の「忌憚」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "いたん",
        "きだん",
        "きたん",
        "きはばかり"
      ],
      "correct": 2
    },
    "explain": [
      "「忌憚」は「きたん」。『忌憚のない意見』＝遠慮のない意見。"
    ],
    "hint": "『○○のない意見』というフレーズで使われる。",
    "pack": "漢字"
  },
  {
    "id": "kj-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "顔つき・表情を表す「相好」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "あいこう",
        "そうごう",
        "そうこう",
        "そうこ"
      ],
      "correct": 1
    },
    "explain": [
      "「相好」は「そうごう」。『相好を崩す』＝うれしくて笑顔になる、の意味。「あいこう」は誤り。"
    ],
    "hint": "「崩す」とセットで笑顔になる意味の語。",
    "pack": "漢字"
  },
  {
    "id": "kj-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "後の証拠となる約束の言葉、の意味の「言質」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "げんち",
        "げんしつ",
        "ことじち",
        "げんしち"
      ],
      "correct": 0
    },
    "explain": [
      "「言質」は「げんち」。「質」を「ち」と読む。「げんしつ」は誤読。"
    ],
    "hint": "「人質（ひとじち）」の質と同じく特殊な読み。",
    "pack": "漢字"
  },
  {
    "id": "kj-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "物事が成り立たなくなること、の意味の「破綻」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "はじょう",
        "はてい",
        "はせん",
        "はたん"
      ],
      "correct": 3
    },
    "explain": [
      "「破綻」は「はたん」。「綻」は『ほころびる』で「タン」と読む。"
    ],
    "hint": "「ほころびる」の漢字。経営が成り立たなくなること。",
    "pack": "漢字"
  },
  {
    "id": "kj-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "物事が進みはかどること、の意味の「進捗」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "しんぽ",
        "しんちょく",
        "しんしょう",
        "しんせき"
      ],
      "correct": 1
    },
    "explain": [
      "「進捗」は「しんちょく」。「捗」は『はかどる』。"
    ],
    "hint": "仕事が「はかどる」具合。『○○状況』でよく使う。",
    "pack": "漢字"
  },
  {
    "id": "kj-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "もろくて弱いこと、の意味の「脆弱」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "きじゃく",
        "きけじゃく",
        "ぜいじゃく",
        "ぜいよわ"
      ],
      "correct": 2
    },
    "explain": [
      "「脆弱」は「ぜいじゃく」。「脆」は『もろい』で「ゼイ」。「きじゃく」は誤読。"
    ],
    "hint": "「もろい」の漢字。セキュリティの『○○性』でも使う。",
    "pack": "漢字"
  },
  {
    "id": "kj-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "ひそかに計画をめぐらすこと、の意味の「画策」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "かくさく",
        "がさく",
        "がくさく",
        "えさく"
      ],
      "correct": 0
    },
    "explain": [
      "「画策」は「かくさく」。「画」を「カク」と読む（計画＝けいかく）。「がさく」は誤読。"
    ],
    "hint": "「計画」の画と同じ「カク」。",
    "pack": "漢字"
  },
  {
    "id": "kj-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「すでに成立している事実」を表す『きせい』として正しいのはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "既製",
        "規制",
        "規正",
        "既成"
      ],
      "correct": 3
    },
    "explain": [
      "すでに成立している事実は「既成（事実）」。「既製」は製品が作り置きされていること（既製品）。"
    ],
    "hint": "「成立」の『成』を使うほう。",
    "pack": "漢字"
  },
  {
    "id": "kj-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "だんだんと、の意味の「漸次」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ざんじ",
        "ぜんじ",
        "しんじ",
        "ぜんし"
      ],
      "correct": 1
    },
    "explain": [
      "「漸次」は「ぜんじ」。『暫時（ざんじ＝しばらくの間）』と混同しやすいので注意。"
    ],
    "hint": "「漸（ようや）く」の漢字。少しずつ、の意味。",
    "pack": "漢字"
  },
  {
    "id": "kj-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "事実でないことを作り上げること、の意味の「捏造」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ねつぞう",
        "でつぞう",
        "ねつくり",
        "けつぞう"
      ],
      "correct": 0
    },
    "explain": [
      "「捏造」は「ねつぞう」。「捏」は『こねる』で「ねつ」と読む。"
    ],
    "hint": "事実を『こねて』作り上げる。『○○記事』など。",
    "pack": "漢字"
  },
  {
    "id": "kj-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「画竜点睛を欠く」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "全体の構想が大きすぎる",
        "細部にこだわりすぎている",
        "実力がともなわない見かけ倒し",
        "最後の肝心な仕上げが抜けている"
      ],
      "correct": 3
    },
    "explain": [
      "「画竜点睛」は竜の絵に最後に瞳を入れて完成させる故事から、物事を仕上げる最も大切な部分。「欠く」で肝心の仕上げが足りない意味になる。"
    ],
    "hint": "竜の絵に最後に描き入れる『瞳』の話。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「方針が立たず迷うこと」を表す四字熟語の正しい表記はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "五里夢中",
        "五里無中",
        "五里霧中",
        "五理霧中"
      ],
      "correct": 2
    },
    "explain": [
      "正しくは「五里霧中」。深い霧の中で方向を見失う様子から。「夢中」と書くのは誤り。"
    ],
    "hint": "一面の『きり（霧）』の中で迷うイメージ。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「前置きなしにいきなり本題に入ること」を表す四字熟語の正しい表記はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "短刀直入",
        "単刀直人",
        "単刀直入",
        "短刀直人"
      ],
      "correct": 2
    },
    "explain": [
      "正しくは「単刀直入」。一本の刀で敵陣に切り込む様子から。「短刀」と書くのは誤り。"
    ],
    "hint": "一本の刀（単）で直接切り込むイメージ。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「ほんのわずかの差で危険が迫る状態」を表す四字熟語の正しい表記はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "危機一発",
        "危機一髪",
        "危機一鉢",
        "機危一髪"
      ],
      "correct": 1
    },
    "explain": [
      "正しくは「危機一髪」。髪の毛一本ほどのわずかな差の意味。「一発」と書くのは誤り。"
    ],
    "hint": "髪の毛一本ほどの差。『発』ではない。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「我田引水」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "自分の都合のいいように物事を進めること",
        "田畑を耕して生活すること",
        "他人の意見を取り入れること",
        "水のように淡白な性格"
      ],
      "correct": 0
    },
    "explain": [
      "自分の田にだけ水を引く意から、自分に都合よく物事を取り計らうこと。"
    ],
    "hint": "自分の『田』にだけ『水』を引く。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-026",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「四面楚歌」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "四方から助けが来ること",
        "歌が四方から聞こえること",
        "周囲がすべて敵で孤立すること",
        "戦いに勝って喜ぶこと"
      ],
      "correct": 2
    },
    "explain": [
      "周りを敵に囲まれ味方がいない状態。項羽が四方から楚の歌を聞いた故事から。"
    ],
    "hint": "周りが全部○○の状態。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-027",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「呉越同舟」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "二人で協力して大事を成すこと",
        "船で旅をすること",
        "古い友人と再会すること",
        "仲の悪い者同士が同じ場に居合わせること"
      ],
      "correct": 3
    },
    "explain": [
      "仲の悪い呉と越の人が同じ舟に乗り合わせる故事から、敵対する者同士が同じ場に居合わせること（転じて、いざという時には協力し合うことも）。単に『協力して大事を成す』では“仲が悪い”という核が抜けるため誤り。"
    ],
    "hint": "仲の悪い『呉』と『越』が同じ『舟』に。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-028",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「温故知新」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "昔のことは忘れるべきだということ",
        "古いことを学んで新しい知識を得ること",
        "新しいものだけを追い求めること",
        "温かい心で人に接すること"
      ],
      "correct": 1
    },
    "explain": [
      "過去の事柄を研究して、そこから新たな知識・見解を得ること。論語が出典。"
    ],
    "hint": "『故（ふる）きを温（たず）ねて新しきを知る』。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-029",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「五十歩百歩」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "努力は必ず報われること",
        "数が多ければよいということ",
        "遠回りが結局は近道になること",
        "少しの違いはあっても本質的に同じこと"
      ],
      "correct": 3
    },
    "explain": [
      "戦場で五十歩逃げた者が百歩逃げた者を笑う故事から、多少の差はあっても大差ないこと。"
    ],
    "hint": "50歩逃げても100歩逃げても、逃げたことは同じ。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-030",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「臥薪嘗胆」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ぜいたくな暮らしを送ること",
        "目的のため長く苦労に耐え忍ぶこと",
        "古い習慣を守り続けること",
        "短期間で大成功すること"
      ],
      "correct": 1
    },
    "explain": [
      "薪の上に寝、苦い胆をなめて屈辱を忘れまいとした故事から、目的達成のため苦労を耐え忍ぶこと。"
    ],
    "hint": "薪（たきぎ）の上に寝て、苦い胆（きも）をなめる。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-031",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「破天荒」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "今まで誰もできなかったことを初めて成し遂げること",
        "豪快で大胆な振る舞いをすること",
        "型破りで無茶なこと",
        "大失敗して台無しにすること"
      ],
      "correct": 0
    },
    "explain": [
      "本来は『前人未到のことを初めて成し遂げる』意味。「豪快・無茶」の意味で使うのは広まった誤用。"
    ],
    "hint": "誰も切り開いていなかった荒れ地（天荒）を破る＝前人未到。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-032",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「自画自賛」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "自分の絵を人に見せること",
        "他人の作品をほめること",
        "自分で自分のことをほめること",
        "謙遜して自分を低く見せること"
      ],
      "correct": 2
    },
    "explain": [
      "自分の描いた絵に自分で賛（ほめる言葉）を書く意から、自分で自分をほめること。"
    ],
    "hint": "自分の『画』に自分で『賛（ほめ言葉）』。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-033",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「言語道断」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "言葉が達者で説得力があること",
        "もってのほかで、言葉では言い表せないほどひどいこと",
        "話の道筋が通っていること",
        "無口で何も語らないこと"
      ],
      "correct": 1
    },
    "explain": [
      "本来は仏教語で言葉で説明できないほど奥深いこと。転じて、あまりにひどくて言葉も出ないこと。『言語が達者』の意味と取り違えやすいが誤り。"
    ],
    "hint": "『道断』＝言葉の道が断たれる。ほめ言葉ではない。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-034",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「朝令暮改」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "朝早くから夜遅くまで働くこと",
        "規則を厳格に守ること",
        "朝と夜で態度を変えること",
        "命令や方針がころころ変わって一定しないこと"
      ],
      "correct": 3
    },
    "explain": [
      "朝に出した命令を夕方には改める意から、方針がたびたび変わって定まらないこと。『朝から晩まで働く』と誤解されやすいが誤り。"
    ],
    "hint": "『朝』出した『令』を『暮（夕方）』に『改』める。働く時間の話ではない。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-035",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「多くの人が口をそろえて同じことを言うこと」を表す四字熟語の正しい表記はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "異口同音",
        "異句同音",
        "異口同韻",
        "異句同韻"
      ],
      "correct": 0
    },
    "explain": [
      "正しくは「異口同音」。異なる口から同じ音（言葉）が出る意。「異句」と書くのは誤り。"
    ],
    "hint": "異なる『口（くち）』から同じ『音』。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-036",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「悪戦苦闘」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "戦いを避けて逃げること",
        "非常に苦しい状況で懸命に努力すること",
        "戦って大勝すること",
        "苦しまずに楽に勝つこと"
      ],
      "correct": 1
    },
    "explain": [
      "死に物狂いで戦い、苦しみながら努力すること。困難な状況での奮闘を表す。"
    ],
    "hint": "『苦しい戦い』『苦しい闘い』そのまま。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-037",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「順風満帆」の正しい読みはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "じゅんぷうまんぽ",
        "じゅんぷうまんぱ",
        "じゅんぷうまんぱん",
        "じゅんかぜまんぱん"
      ],
      "correct": 2
    },
    "explain": [
      "「順風満帆」は「じゅんぷうまんぱん」。帆いっぱいに追い風を受けて快調に進む意。「まんぽ」は誤読。"
    ],
    "hint": "『帆』を『パン』と読む。物事が順調に進むこと。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-038",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「面従腹背」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "正面から堂々と反対すること",
        "上司に心から忠実なこと",
        "表面では従うふりをして内心では反抗していること",
        "人前では緊張すること"
      ],
      "correct": 2
    },
    "explain": [
      "面（おもて）では従い腹（内心）では背く意。うわべだけ服従し、内心は反抗していること。"
    ],
    "hint": "『面（表）』は従い『腹（内心）』は背く。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-039",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「捲土重来」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "一度敗れた者が勢いを盛り返して再び挑むこと",
        "土地を捨てて遠くへ逃げること",
        "二度と立ち上がれないほどの敗北",
        "土を耕して農業を始めること"
      ],
      "correct": 0
    },
    "explain": [
      "巻き上げた土ぼこりとともに再び攻め寄せる意から、一度敗れた者が勢いを盛り返して再起すること。"
    ],
    "hint": "土ぼこり（土）を巻き上げて、重ねて（再び）来る。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-040",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「興味があとからあとから湧いて尽きないさま」を表す四字熟語の正しい表記はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "興味深々",
        "興味津々",
        "興味深深",
        "興味津深"
      ],
      "correct": 1
    },
    "explain": [
      "正しくは「興味津々（しんしん）」。「津」は水が湧き出るさまで、興味が尽きず湧いてくる意。「深々」と書くのは誤り。"
    ],
    "hint": "『津（つ）』は水が湧き出る意。『深い』ではない。",
    "pack": "四字熟語"
  },
  {
    "id": "kj-041",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「彼にこの仕事は役不足だ」という文の、「役不足」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "その人の力量に対して役目が軽すぎること",
        "その人の力量が役目に対して足りないこと",
        "役者が足りないこと",
        "準備不足で力を出せないこと"
      ],
      "correct": 0
    },
    "explain": [
      "「役不足」は本来『与えられた役目がその人の実力に比べて軽すぎる』意味。実力不足（力不足）の意味で使うのは誤用。"
    ],
    "hint": "『役』が『不足』＝役目のほうが足りない（軽い）。人ではなく役が物足りない。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-042",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「気が置けない友人」の「気が置けない」の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "油断ができず気を許せない",
        "遠慮がいらず気楽に付き合える",
        "気が短くて怒りっぽい",
        "気配りができない"
      ],
      "correct": 1
    },
    "explain": [
      "「気が置けない」は『気を遣わず打ち解けられる』良い意味。「気を許せない・油断できない」と逆に捉えるのは誤用。"
    ],
    "hint": "『気を置く』＝気を遣う。それが『ない』＝気を遣わなくてよい。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-043",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「住めば都」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "都会こそ住むのに最適だということ",
        "立派な家に住むべきだということ",
        "引っ越しは慎重にすべきだということ",
        "どんな所でも住み慣れれば居心地よく思える"
      ],
      "correct": 3
    },
    "explain": [
      "どんな場所でも住み慣れれば、そこが良いと思えてくるということ。"
    ],
    "hint": "慣れれば、どこでも『都』のように感じる。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-044",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「他山の石」の本来の使い方として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "他人の優れた手本を見習う",
        "自分には関係のない他人の問題",
        "他人の良くない言動も自分を磨く参考にする",
        "立派な人の意見に従う"
      ],
      "correct": 2
    },
    "explain": [
      "よその山の粗悪な石でも自分の玉を磨くのに役立つ意から、他人の誤りや欠点も自分の修養の参考になること。良い手本の意味で使うのは誤り。"
    ],
    "hint": "『石』は粗悪なもの。良い手本ではない点に注意。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-045",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「枯れ木も山の賑わい」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "多くの人が集まってにぎやかなこと",
        "つまらないものでもないよりはましだということ",
        "経験豊富な年長者がいると心強いこと",
        "自然は大切にすべきだということ"
      ],
      "correct": 1
    },
    "explain": [
      "枯れ木でも山の趣を添える意から、つまらないものでも無いよりはあったほうがよいこと。自分側の謙遜に使う言葉で、他人に対して使うと失礼になる。"
    ],
    "hint": "『枯れ木』＝つまらないもの。それでも『ないよりまし』。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-046",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「弘法にも筆の誤り」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "字の練習は道具選びが大切だということ",
        "失敗は成功のもとだということ",
        "どんな名人でも時には失敗することがある",
        "努力すれば名人になれるということ"
      ],
      "correct": 2
    },
    "explain": [
      "書の名人・弘法大師でも書き損じることがある意から、その道の名人でも失敗はあるということ。"
    ],
    "hint": "弘法（書の名人）でも『筆の誤り』をする。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-047",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「李下に冠を正さず」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "礼儀を重んじるべきだということ",
        "疑われるような行いは避けるべきだということ",
        "高い地位を望んではいけないということ",
        "果実は勝手に取ってはいけないということ"
      ],
      "correct": 1
    },
    "explain": [
      "スモモの木の下で冠を直そうと手を上げると実を盗むと疑われる意から、疑われやすい行動は慎むべきこと。"
    ],
    "hint": "スモモ（李）の木の下で手を上げると、盗んだと疑われる。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-048",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「敷居が高い」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "高級すぎて入りにくい",
        "格式が高くて気後れする",
        "建物の段差が大きくて入りにくい",
        "不義理や面目ないことがあって訪ねにくい"
      ],
      "correct": 3
    },
    "explain": [
      "本来は『不義理や失敗をして、その人の家へ行きにくい』意味。「高級・格式が高くて入りにくい」の意味で使うのは近年広まった誤用。"
    ],
    "hint": "相手に『不義理』をしたから行きづらい、が本来。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-049",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「噴飯もの」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "腹立たしくて許せないこと",
        "ばからしくてあきれること",
        "おかしくてたまらないこと",
        "ご飯を吹き出すほど驚くこと"
      ],
      "correct": 2
    },
    "explain": [
      "思わず口中の飯を噴き出すほどおかしいこと。「腹立たしい」の意味で使うのは誤用。"
    ],
    "hint": "『噴飯』＝飯を噴き出す。怒りではなく○○しさ。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-050",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「立つ鳥跡を濁さず」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "鳥のように自由に生きるべきだということ",
        "騒がしくしてはいけないということ",
        "早起きは得だということ",
        "去る者は後始末をきれいにすべきだということ"
      ],
      "correct": 3
    },
    "explain": [
      "飛び立つ水鳥が水を濁さないように、立ち去る者はあとが見苦しくないようにすべきだということ。"
    ],
    "hint": "飛び立つ『鳥』が水を『濁さない』。後始末の話。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-051",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「能ある鷹は爪を隠す」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "鷹のように鋭い目を持つべきだということ",
        "実力のある者はむやみに力をひけらかさない",
        "実力者ほど自慢したがるものだ",
        "道具は大切にしまうべきだ"
      ],
      "correct": 1
    },
    "explain": [
      "能力のある鷹は獲物を捕る爪を普段隠している意から、実力のある人ほど力を表に出さないこと。"
    ],
    "hint": "できる『鷹』ほど『爪』を見せない。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-052",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「青菜に塩」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "料理の味付けが大事だということ",
        "倹約して暮らすこと",
        "元気をなくしてしおれること",
        "新鮮さが命だということ"
      ],
      "correct": 2
    },
    "explain": [
      "青菜に塩をふるとしおれる様子から、元気をなくしてしょげること。"
    ],
    "hint": "青菜に塩をかけると『しおれる』。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-053",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「藪から棒」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "突然で前触れのないこと",
        "見通しが悪いこと",
        "危険が潜んでいること",
        "回り道をすること"
      ],
      "correct": 0
    },
    "explain": [
      "藪の中から突然棒が突き出される意から、物事が唐突で出し抜けなこと。"
    ],
    "hint": "藪から急に『棒』が出てくる＝突然。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-054",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「指揮をとる」という意味で本来正しい言い方はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "采配を振るう",
        "采配を振る",
        "采配を振り回す",
        "采配を打つ"
      ],
      "correct": 1
    },
    "explain": [
      "本来は「采配を振る」が正しい。「采配を振るう」も近年は広く使われ辞書にも載るが、伝統的には「振る」とされる。"
    ],
    "hint": "『振るう』ではなく短く『振る』。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-055",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「すきをつかれて失敗させられる」という意味で本来正しい言い方はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "足元をすくわれる",
        "足下をすくわれる",
        "足をすくわれる",
        "足首をすくわれる"
      ],
      "correct": 2
    },
    "explain": [
      "本来は「足をすくわれる」が正しい。すくわれるのは『足』そのもので、『足元（地面に近い辺り）』ではない。「足元をすくわれる」は誤用が広まったもの。"
    ],
    "hint": "すくうのは『足』そのもの。『足元』ではない。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-056",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「議論が煮詰まる」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "議論が行き詰まって結論が出せない",
        "議論が十分に出尽くして結論が出る段階に近づく",
        "議論が白熱して対立する",
        "議論が中断する"
      ],
      "correct": 1
    },
    "explain": [
      "本来「煮詰まる」は議論が出尽くして結論が出る段階に近づくこと。「行き詰まる」の意味で使うのは誤用。"
    ],
    "hint": "鍋を煮詰めると煮汁が『仕上がる』。行き詰まりではない。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-057",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「ちりも積もれば山となる」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "山では塵が積もりやすいということ",
        "努力は無駄になりやすいということ",
        "小さな失敗が大事故につながること",
        "わずかなものでも積み重なれば大きくなること"
      ],
      "correct": 3
    },
    "explain": [
      "ごくわずかなものでも、積もり重なれば大きなものになるということ。"
    ],
    "hint": "小さな『塵（ちり）』も積もれば『山』に。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-058",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「急がば回れ」の意味として最も近いものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "急ぐときほど安全確実な方法をとるほうが結局早い",
        "急用のときは近道をすべきだ",
        "焦ると失敗するから休むべきだ",
        "回り道は時間の無駄だ"
      ],
      "correct": 0
    },
    "explain": [
      "急ぐときこそ危険な近道より安全な本道を回ったほうが、結局は早く着くということ。"
    ],
    "hint": "『急ぐなら、あえて回れ』。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-059",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「うがった見方をする」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "ひねくれた疑い深い見方をする",
        "表面的で浅い見方をする",
        "悪意を持って解釈する",
        "物事の本質を的確にとらえた見方をする"
      ],
      "correct": 3
    },
    "explain": [
      "「穿（うが）つ」は穴をあける＝本質を突く意で、本来は物事の真相を的確にとらえること。「疑ってかかる」の意味で使うのは誤用。"
    ],
    "hint": "『穿つ』＝穴をあけて本質を突く。悪い意味ではない。",
    "pack": "ことわざ"
  },
  {
    "id": "kj-060",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "「失笑する」の本来の意味として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "あきれて笑う気も失せること",
        "こらえきれずに思わず笑ってしまうこと",
        "笑いをこらえること",
        "見下して冷笑すること"
      ],
      "correct": 1
    },
    "explain": [
      "「失笑」は本来『おかしさをこらえきれず吹き出してしまう』こと。「笑いも出ないほどあきれる」の意味で使うのは誤用。"
    ],
    "hint": "『笑いを失う』ではなく『思わず笑いが出る』。",
    "pack": "ことわざ"
  },
  {
    "id": "jhist-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "縄文時代の人々が食べた貝やけものの骨などのごみが積み重なってできた遺跡を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["貝塚", "古墳", "環濠集落", "竪穴式住居"], "correct": 0 },
    "explain": ["縄文時代の集落跡に見られるごみ捨て場が貝塚です。東京の大森貝塚はエドワード・モースが1877年に発見し、日本の考古学の出発点となりました。"],
    "hint": "貝がらや骨が積み重なってできた遺跡です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "縄文時代に作られた、目が大きく土で作られた人形を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["埴輪", "土偶", "銅鐸", "勾玉"], "correct": 1 },
    "explain": ["縄文時代に作られた土製の人形が土偶です。埴輪は古墳時代のもの、銅鐸は弥生時代の青銅製祭器です。"],
    "hint": "土（つち）で作った人形という意味の言葉です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "弥生時代に中国・朝鮮半島から伝わり、日本の食文化の基盤となった農業は何ですか。",
    "answer": { "kind": "choice", "options": ["麦作", "稲作（水田稲作）", "畑作", "牧畜"], "correct": 1 },
    "explain": ["弥生時代（紀元前3世紀頃）に朝鮮半島経由で水田稲作が伝わり、食料の安定確保とともに貧富の差や争いも生まれました。"],
    "hint": "日本人の主食の原点となった農業です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "古墳時代、古墳の周囲や頂上に並べられた素焼きの焼き物を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["土偶", "銅鐸", "埴輪", "土器"], "correct": 2 },
    "explain": ["埴輪は古墳の周りに立て並べられた素焼きの焼き物です。人物・動物・家などの形があり、被葬者の生前の様子を表すと考えられています。"],
    "hint": "古墳の周りに並べられた素焼きの造形物です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "飛鳥時代、聖徳太子が定めた、役人の心得を示したとされる十七条の何ですか。",
    "answer": { "kind": "choice", "options": ["十七条の律", "十七条の憲法", "十七条の令", "十七条の格"], "correct": 1 },
    "explain": ["604年に聖徳太子が制定したとされる「十七条の憲法」は、仏教や儒教の精神にもとづいて役人の心得を示したものです。"],
    "hint": "「和をもって貴しとなす」の第一条が有名です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "奈良時代に建立され、世界最大級の木造建築として知られる建物はどれですか。",
    "answer": { "kind": "choice", "options": ["法隆寺金堂", "東大寺大仏殿", "薬師寺西塔", "興福寺中金堂"], "correct": 1 },
    "explain": ["東大寺大仏殿は現存する世界最大級の木造建築物です。中には聖武天皇が建立させた奈良の大仏（盧舎那仏）が安置されています。"],
    "hint": "奈良の大仏が安置されている建物です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "遣唐使として唐に渡り、玄宗皇帝に仕えて日本に帰ることができなかった奈良時代の人物は誰ですか。",
    "answer": { "kind": "choice", "options": ["阿倍仲麻呂", "空海", "最澄", "吉備真備"], "correct": 0 },
    "explain": ["阿倍仲麻呂は717年に遣唐使として渡唐し、玄宗皇帝に重用されました。帰国を試みましたが遭難し、中国で没しました。「天の原ふりさけ見れば…」の和歌でも有名です。"],
    "hint": "「天の原ふりさけ見れば…」の和歌を詠んだ人物です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "平安時代に書かれた、紫式部による世界最古級の長編小説といわれる作品は何ですか。",
    "answer": { "kind": "choice", "options": ["枕草子", "源氏物語", "竹取物語", "伊勢物語"], "correct": 1 },
    "explain": ["紫式部が書いた「源氏物語」は光源氏を主人公とした長編物語で、世界最古の長編小説の一つとされています。「枕草子」は清少納言の随筆です。"],
    "hint": "光源氏が主人公の物語です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "遣唐使の廃止を建議し、その後の「国風文化」の発展につながったとされる平安時代の貴族は誰ですか。",
    "answer": { "kind": "choice", "options": ["藤原道長", "菅原道真", "紀貫之", "在原業平"], "correct": 1 },
    "explain": ["菅原道真は894年に遣唐使の廃止を建議し、受け入れられました。その後、左遷されて太宰府で没し、学問の神様として天満宮に祀られています。"],
    "hint": "学問の神様として天満宮に祀られた人物です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "鎌倉時代、武士が守るべき規範をまとめた最初の武家法「御成敗式目」を制定した人物は誰ですか。",
    "answer": { "kind": "choice", "options": ["源頼朝", "北条泰時", "足利尊氏", "北条時頼"], "correct": 1 },
    "explain": ["1232年に鎌倉幕府の執権・北条泰時が御成敗式目（貞永式目）を定めました。武士社会の慣習をまとめた最初の武家法です。"],
    "hint": "この時代の幕府の執権が制定しました。",
    "pack": "歴史"
  },
  {
    "id": "jhist-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "室町時代に起きた「応仁の乱」は、何年間続きましたか。",
    "answer": { "kind": "choice", "options": ["3年", "5年", "11年", "20年"], "correct": 2 },
    "explain": ["応仁の乱は1467年から1477年まで約11年間続きました。主に京都を舞台とし、この乱をきっかけに戦国時代へと突入していきます。"],
    "hint": "1467年から始まり、戦国時代の幕開けとなりました。",
    "pack": "歴史"
  },
  {
    "id": "jhist-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "織田信長が「楽市楽座」を実施した主な目的は何ですか。",
    "answer": { "kind": "choice", "options": ["キリスト教を広めるため", "座（商人の組合）の独占を廃止して自由な商業を促進するため", "農民から税を取りやすくするため", "武士の特権を強化するため"], "correct": 1 },
    "explain": ["楽市楽座は商工業者の同業組合「座」の独占権を廃止し、誰でも自由に商売できるようにした政策です。信長は経済の活性化で強大な財力を得ました。"],
    "hint": "商人の既得権（座）を壊し、自由な取引を認めた政策です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "織田信長が1575年の長篠の戦いで武田軍に対して有効に活用した武器は何ですか。",
    "answer": { "kind": "choice", "options": ["大砲", "鉄砲（火縄銃）", "弓矢", "槍"], "correct": 1 },
    "explain": ["長篠の戦いで信長は鉄砲を大量に使い、馬防柵とともに活用することで武田軍を破りました。鉄砲の三段撃ちは有名ですが、詳細には諸説あります。"],
    "hint": "種子島に伝来した新兵器です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "豊臣秀吉が農民や寺社から武器を取り上げ、農民の武装解除を進めた政策を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["検地", "刀狩", "楽市楽座", "一国一城令"], "correct": 1 },
    "explain": ["1588年に豊臣秀吉が行った刀狩により、農民は武器を持てなくなりました。これにより武士と農民の身分がはっきりと区別されました（兵農分離）。"],
    "hint": "農民から「刀」を「狩り」取る政策です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "江戸幕府を開いた徳川家康が、征夷大将軍に任じられた年はいつですか。",
    "answer": { "kind": "choice", "options": ["1600年", "1603年", "1615年", "1598年"], "correct": 1 },
    "explain": ["徳川家康は1600年の関ヶ原の戦いで勝利し、1603年に征夷大将軍に任じられて江戸幕府を開きました。「1603年、家康将軍」と覚えられます。"],
    "hint": "関ヶ原の戦いの3年後です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "江戸時代、松尾芭蕉が東北・北陸を旅して書いた紀行文の俳諧作品は何ですか。",
    "answer": { "kind": "choice", "options": ["東海道中膝栗毛", "奥の細道", "土佐日記", "枕草子"], "correct": 1 },
    "explain": ["松尾芭蕉が1689年に弟子の曾良と東北・北陸を旅した記録が「奥の細道」です。「夏草や兵どもが夢の跡」など多くの名句が含まれています。"],
    "hint": "松尾芭蕉が東北・北陸を旅した記録です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "幕末に結ばれた「日米修好通商条約」に含まれた不平等な内容として正しいのはどれですか。",
    "answer": { "kind": "choice", "options": ["日本が関税を自由に決めることができた", "アメリカ人が日本で罪を犯しても日本の法律で裁けなかった（領事裁判権）", "日本はアメリカに軍事支援を義務付けられた", "アメリカへの移住が禁止された"], "correct": 1 },
    "explain": ["日米修好通商条約には「領事裁判権（治外法権）を認める」「関税自主権がない」という不平等な条項が含まれていました。この撤廃は明治政府の外交課題でした。"],
    "hint": "外国人が日本で犯罪を起こしても日本の裁判所で裁けない条項です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "明治維新で行われた「廃藩置県」とはどのような改革ですか。",
    "answer": { "kind": "choice", "options": ["藩の武士を全員廃止した", "藩を廃止して全国を府・県に統一し、中央集権国家を作った", "藩の代わりに村を設置した", "藩の領地を農民に分け与えた"], "correct": 1 },
    "explain": ["1871年に行われた廃藩置県により、江戸時代の藩が廃止され、全国に府・県が置かれました。中央から知事が派遣されることで、天皇を中心とした中央集権体制が確立されました。"],
    "hint": "藩を廃止（廃藩）して県を置く（置県）改革です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "明治時代に「殖産興業」のもと、政府主導で建設された官営工場として代表的なものはどれですか。",
    "answer": { "kind": "choice", "options": ["八幡製鉄所", "富岡製糸場", "横須賀造船所", "大阪紡績会社"], "correct": 1 },
    "explain": ["1872年に群馬県に開業した富岡製糸場は、フランスの技術を取り入れた官営の近代的な製糸工場です。2014年に「富岡製糸場と絹産業遺産群」として世界遺産に登録されました。"],
    "hint": "群馬県に建てられた官営の製糸工場で、世界遺産にも登録されています。",
    "pack": "歴史"
  },
  {
    "id": "jhist-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "明治時代初期の1872年に発布された「学制」の目的は何ですか。",
    "answer": { "kind": "choice", "options": ["武士の子どもだけに教育を受けさせるため", "国民全体に教育を広めて近代国家を担う人材を育てるため", "外国語教育を禁止するため", "宗教教育を広めるため"], "correct": 1 },
    "explain": ["1872年に発布された学制により、日本で初めて全国的な近代学校制度が整いました。身分・男女を問わず教育を受けることが目指されました。"],
    "hint": "国民みんなに学校教育を広げる制度です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "大正デモクラシーを思想面で支えた、吉野作造が唱えた考え方は何ですか。",
    "answer": { "kind": "choice", "options": ["天賦人権論", "民本主義", "社会主義", "自由民権論"], "correct": 1 },
    "explain": ["吉野作造は「民本主義」を唱え、民衆の意向を政治に反映することを主張しました。大正デモクラシーの理論的な支柱となりました。"],
    "hint": "「民」を「本」とする主義という名前です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "1923年9月1日に発生し、東京・神奈川を中心に甚大な被害をもたらした大地震を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["濃尾地震", "関東大震災", "阪神・淡路大震災", "昭和三陸地震"], "correct": 1 },
    "explain": ["関東大震災はマグニチュード7.9前後の大地震で、死者・行方不明者は約10万5000人にのぼりました。地震後の火災による被害が特に大きかったことで知られています。"],
    "hint": "9月1日は現在「防災の日」とされています。",
    "pack": "歴史"
  },
  {
    "id": "jhist-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "昭和時代、1931年に関東軍が南満州鉄道を自ら爆破して軍事行動の口実とした事件を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["二・二六事件", "満州事変（柳条湖事件）", "五・一五事件", "盧溝橋事件"], "correct": 1 },
    "explain": ["1931年9月、関東軍が柳条湖で南満州鉄道を自ら爆破し、これを口実に軍事行動を起こしました。これが満州事変の発端となり、満州国建設につながりました。"],
    "hint": "「柳条湖事件」とも呼ばれます。",
    "pack": "歴史"
  },
  {
    "id": "jhist-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1964年に日本で開催された、アジア初のオリンピックが開かれた都市はどこですか。",
    "answer": { "kind": "choice", "options": ["大阪", "東京", "京都", "神戸"], "correct": 1 },
    "explain": ["1964年に東京オリンピックが開催されました。これはアジアで初めてのオリンピックであり、東海道新幹線の開業など、高度経済成長期のシンボルとなりました。"],
    "hint": "東海道新幹線もこの年に開業しました。",
    "pack": "歴史"
  },
  {
    "id": "jhist-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "縄文時代の特徴として正しいものはどれですか。",
    "answer": { "kind": "choice", "options": ["稲作農業が盛んで集落が形成された", "狩猟・採集・漁労を中心とし、縄目の文様をつけた土器を使った", "青銅器と鉄器が同時に伝わった", "ピラミッドのような巨大な墳墓を建設した"], "correct": 1 },
    "explain": ["縄文時代（約1万数千年前〜紀元前3世紀頃）は狩猟・採集・漁労が生業で、表面に縄目の文様をつけた縄文土器を使いました。稲作が本格的に始まるのは弥生時代です。"],
    "hint": "この時代の土器の特徴が時代の名前になっています。",
    "pack": "歴史"
  },
  {
    "id": "jhist-026",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "遣唐使は何時代に廃止されましたか。",
    "answer": { "kind": "choice", "options": ["奈良時代", "平安時代", "鎌倉時代", "室町時代"], "correct": 1 },
    "explain": ["遣唐使は630年に始まり、894年に菅原道真の建議によって廃止されました。廃止後、日本独自の国風文化が花開きました。"],
    "hint": "「白紙（894）に戻す遣唐使」と語呂合わせで覚えられます。",
    "pack": "歴史"
  },
  {
    "id": "jhist-027",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "織田信長・豊臣秀吉の時代を「安土桃山時代」と呼びますが、「桃山」の名はどこに由来しますか。",
    "answer": { "kind": "choice", "options": ["豊臣秀吉の出身地の地名", "豊臣秀吉が建てた伏見城の跡地（伏見桃山）", "徳川家康の居城のある場所", "信長が好んだ桃の花から"], "correct": 1 },
    "explain": ["豊臣秀吉が築いた伏見城は、廃城後その跡地に桃が植えられ「桃山」と呼ばれたことから、この時代を安土桃山時代と呼ぶようになりました。"],
    "hint": "伏見城の跡地に植えられた果物が由来です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-028",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1872年に新橋〜横浜間で開業した日本初の鉄道。この鉄道建設を指揮したお雇い外国人技師は誰ですか。",
    "answer": { "kind": "choice", "options": ["クラーク", "モース", "エドモンド・モレル", "コンドル"], "correct": 2 },
    "explain": ["イギリス人技師エドモンド・モレルは新橋〜横浜間の鉄道建設を指揮しました。クラーク博士は札幌農学校、モースは大森貝塚、コンドルは鹿鳴館などで知られます。"],
    "hint": "日本初の鉄道建設を指揮したイギリス人技師です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-029",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1336年から1392年まで、二つの朝廷が並び立って対立した時代を何と呼びますか。",
    "answer": { "kind": "choice", "options": ["応仁の乱", "南北朝時代", "戦国時代", "保元の乱"], "correct": 1 },
    "explain": ["南北朝時代は、足利尊氏が擁立した北朝と、後醍醐天皇が吉野に開いた南朝が並立した時代です。3代将軍・足利義満により南北朝が統一されました。"],
    "hint": "天皇家が二つに分かれて対立した時代です。",
    "pack": "歴史"
  },
  {
    "id": "jhist-030",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "1956年、日ソ共同宣言で国交を回復した日本が、同年加盟を果たした国際機関はどれですか。",
    "answer": { "kind": "choice", "options": ["NATO", "国際連合（国連）", "ASEAN", "OPEC"], "correct": 1 },
    "explain": ["1956年に日ソ共同宣言でソ連との国交を回復し、同年12月に日本は国際連合への加盟が認められました。これにより日本は国際社会への復帰を果たしました。"],
    "hint": "第二次世界大戦後に設立された、世界平和を目的とする最大の国際機関です。",
    "pack": "歴史"
  },
  {
    "id": "money-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "株式会社が資金を集めるために発行する「所有権を表す証券」のことを何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["債券", "株式", "投資信託", "手形"], "correct": 1 },
    "explain": ["株式とは、会社の所有権を細かく分割したものです。株式を持つ人（株主）は会社の一部オーナーとなり、配当金や議決権などの権利を得ます。"],
    "hint": "会社の「株」と書く、所有権の単位です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "会社が利益の一部を株主に分配するお金を何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["配当金", "利息", "補助金", "報酬"], "correct": 0 },
    "explain": ["配当金とは、会社が稼いだ利益の一部を株主に還元するお金です。すべての会社が配当を出すわけではなく、業績や経営方針によって異なります。"],
    "hint": "株を持っていると受け取れる、利益の「分配」です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "日本を代表する株価指数で、代表的な225銘柄の株価をもとに算出されるものはどれか？",
    "answer": { "kind": "choice", "options": ["TOPIX", "NYダウ", "日経平均株価", "S&P500"], "correct": 2 },
    "explain": ["日経平均株価（日経225）は、日本の株式市場の動向を示す代表的な指標です。ニュースで「今日の日経平均は〇〇円」と報じられるのがこれです。"],
    "hint": "日本の新聞社の名前が付いた、225銘柄の指数です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "NISA（少額投資非課税制度）の「非課税」とはどういう意味か？",
    "answer": { "kind": "choice", "options": ["投資した元本が保証される制度", "投資で得た利益に税金がかからない制度", "国から補助金がもらえる制度", "損をした場合に補填される制度"], "correct": 1 },
    "explain": ["通常、投資で得た利益には約20%の税金がかかります。NISAの非課税枠を使うと、その税金がゼロになります。元本の保証はなく、損失が出る可能性はあります。"],
    "hint": "利益にかかる「税」が「非（ない）」という意味です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "iDeCo（個人型確定拠出年金）の特徴として正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["いつでも自由に引き出せる", "掛金が全額所得控除になり節税できる", "元本が必ず増える", "会社員は加入できない"], "correct": 1 },
    "explain": ["iDeCoの大きなメリットは、毎月の掛金が全額所得控除となり、所得税・住民税が軽減される点です。ただし原則60歳まで引き出せないため、老後資金として積み立てる制度です。"],
    "hint": "「節税しながら老後に備える」のが特徴です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "多くの投資家から集めたお金をまとめて、専門家が複数の株や債券に投資する商品を何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["定期預金", "投資信託", "国債", "外貨預金"], "correct": 1 },
    "explain": ["投資信託は「ファンド」とも呼ばれ、少額からでも多くの銘柄に分散投資できる商品です。専門家が運用するため、投資の知識が少なくても始めやすいのが特徴です。"],
    "hint": "お金を「信託」して、プロに「投資」してもらう商品です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "複利と単利の違いとして正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["単利は利息にも利息がつき、複利は元本にだけ利息がつく", "複利は利息にも利息がつき、単利は元本にだけ利息がつく", "単利の方が長期で見ると必ず得になる", "複利と単利は長期間でも結果が変わらない"], "correct": 1 },
    "explain": ["複利は「利息が利息を生む」仕組みです。元本に利息を加えた金額に次の利息がつくため、長期になるほど単利との差が大きくなります。"],
    "hint": "「利息の利息」がつくのはどちらか考えましょう。",
    "pack": "お金・投資"
  },
  {
    "id": "money-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「卵はひとつのカゴに盛るな」という格言が示す投資の考え方はどれか？",
    "answer": { "kind": "choice", "options": ["高リスクな投資に集中すること", "投資せずに現金を保有すること", "複数の異なる資産に分けて投資すること", "プロに運用を任せること"], "correct": 2 },
    "explain": ["「分散投資」の重要性を示す格言です。1つの銘柄や資産に集中すると、それが値下がりしたとき大きな損失になります。複数に分散することでリスクを抑えられます。"],
    "hint": "カゴを落としたとき、卵が全部割れないようにする工夫です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "一般的に言われる「リスクとリターンの関係」として正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["リスクが高いほどリターンも高くなる傾向がある", "リスクが低いほどリターンが高くなる傾向がある", "リスクとリターンは無関係である", "リスクが高いほどリターンは必ず低くなる"], "correct": 0 },
    "explain": ["投資の世界では「ハイリスク・ハイリターン」が基本原則です。大きな利益を狙うほど損失のリスクも大きくなります。「高リターンで低リスク」のうまい話には注意が必要です。"],
    "hint": "「大きなリターン」を得るには、相応の「リスク」が伴います。",
    "pack": "お金・投資"
  },
  {
    "id": "money-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "物価が全体的に上がり続け、お金の価値が下がっていく現象を何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["デフレーション", "スタグフレーション", "インフレーション", "リセッション"], "correct": 2 },
    "explain": ["インフレーション（インフレ）とは物価が上昇し続ける現象です。100円で買えたものが120円になると、同じお金で買えるものが減り、現金の価値が実質的に下がります。"],
    "hint": "「インフレ」と略され、物価が「膨らむ」イメージです。",
    "pack": "お金・投資"
  },
  {
    "id": "money-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "円高が進んだとき、海外旅行をする日本人にとってどのような影響があるか？",
    "answer": { "kind": "choice", "options": ["旅行費用が実質的に高くなる", "旅行費用が実質的に安くなる", "円高は海外旅行に影響しない", "帰国後の外貨換金で必ず損をする"], "correct": 1 },
    "explain": ["円高とは「円の価値が外貨に対して高い」状態です。1ドル=100円の円高では、1ドル=150円のときより少ない円でドルを買えるため、海外旅行が割安になります。"],
    "hint": "円の価値が「高い」と、外国のものを買うとき有利か不利か考えましょう。",
    "pack": "お金・投資"
  },
  {
    "id": "money-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "国や企業がお金を借りるために発行する「借用証書」のような金融商品を何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["株式", "債券", "投資信託", "先物"], "correct": 1 },
    "explain": ["債券は、発行した国や企業がお金を借りる代わりに、定期的に利息を支払い、満期に元本を返す金融商品です。国が発行するものを「国債」と呼びます。"],
    "hint": "「借りた」しるしの「券」で、利息を受け取れます。",
    "pack": "お金・投資"
  },
  {
    "id": "money-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "変動金利型の住宅ローンで、世の中の金利が上がると返済額は一般的にどうなるか？",
    "answer": { "kind": "choice", "options": ["変わらない", "下がる", "上がる", "金利と返済額は無関係"], "correct": 2 },
    "explain": ["金利はお金を借りる際のコストです。変動金利型の住宅ローンでは、金利が上がると毎月の返済額も増加します。固定金利型は契約時の金利が維持されます。"],
    "hint": "「借りるコスト」が上がれば、返す額はどうなるでしょう。",
    "pack": "お金・投資"
  },
  {
    "id": "money-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ETF（上場投資信託）の特徴として正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["1日1回の価格でしか売買できない", "株式と同様に取引所でリアルタイムに売買できる", "元本が保証されている", "個人は購入できない"], "correct": 1 },
    "explain": ["ETF（上場投資信託）は証券取引所に上場された投資信託で、株式と同じようにリアルタイムで売買できます。通常の投資信託は1日1回の基準価額での取引です。"],
    "hint": "「上場」しているので株のように売買できます。",
    "pack": "お金・投資"
  },
  {
    "id": "money-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "毎月一定の金額で同じ投資信託を買い続ける投資手法を何と呼ぶか？",
    "answer": { "kind": "choice", "options": ["一括投資法", "ドルコスト平均法", "逆張り投資法", "信用取引法"], "correct": 1 },
    "explain": ["ドルコスト平均法は、価格が高いときには少なく、安いときには多く購入できるため、平均購入単価をならすことができます。相場を読む必要がなく、長期積立に向いた手法です。"],
    "hint": "定額で買い続けて「平均コスト」を安定させる方法です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「元本保証」とはどういう意味か？",
    "answer": { "kind": "choice", "options": ["投資した金額以上の利益が保証される", "投資した元のお金が減らずに戻ってくることが保証される", "損した場合に国が補填してくれる", "利息が必ず受け取れることが保証される"], "correct": 1 },
    "explain": ["元本保証とは、投資した元のお金（元本）が減らないことを意味します。銀行預金は預金保険で一定額まで保護されますが、株式や投資信託には原則ありません。"],
    "hint": "「元（もと）」のお金が「保証」される、という意味です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「72の法則」を使うと何の目安がわかるか？",
    "answer": { "kind": "choice", "options": ["株価が2倍になる銘柄を探す方法", "元本が2倍になるまでのおよその年数", "72%の確率で利益が出る投資法", "年間72万円の節税ができる制度"], "correct": 1 },
    "explain": ["72の法則は「72 ÷ 金利（%）= 元本が2倍になるおよその年数」で計算します。年利3%なら約24年、年利6%なら約12年が目安です。複利の威力を直感的に理解できます。"],
    "hint": "「72」を金利で割ると、2倍になる「年数」が出ます。",
    "pack": "お金・投資"
  },
  {
    "id": "money-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "長期投資のメリットとして最も適切なのはどれか？",
    "answer": { "kind": "choice", "options": ["短期間で必ず大きな利益が出る", "複利の効果を活かして資産を増やしやすい", "損失が出た場合に国が補填してくれる", "税金が一切かからない"], "correct": 1 },
    "explain": ["長期投資の大きなメリットは複利効果です。利益を再投資し続けることで、時間が経つほど「利益が利益を生む」雪だるま式の効果が大きくなります。"],
    "hint": "長い時間をかけて「複利」の雪だるまを大きくします。",
    "pack": "お金・投資"
  },
  {
    "id": "money-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "為替レートが1ドル=100円から1ドル=150円になった場合、円はどうなったか？",
    "answer": { "kind": "choice", "options": ["円高になった", "円安になった", "為替レートは変わっていない", "ドルが安くなった"], "correct": 1 },
    "explain": ["1ドルを買うのに必要な円が100円から150円に増えたということは、円の価値が下がった（ドルの価値が上がった）状態です。これを「円安」と呼びます。輸入品の価格上昇などにつながります。"],
    "hint": "同じ1ドルを買うのに、より多くの円が必要になりました。",
    "pack": "お金・投資"
  },
  {
    "id": "money-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "貯金（預金）と投資の違いとして最も正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["貯金は元本が大きく増え、投資は元本が保証されている", "投資は元本保証があり、貯金はリスクが高い", "貯金は元本保証がある一方、投資は元本が減る可能性もあるがリターンを期待できる", "貯金と投資に本質的な違いはない"], "correct": 2 },
    "explain": ["銀行預金（貯金）は元本が保護されますが、現在の低金利では利息はほとんどつきません。投資は元本割れのリスクがある分、長期的により高いリターンを期待できます。目的に応じた使い分けが大切です。"],
    "hint": "安全性とリターンはトレードオフ（あちらを立てればこちらが…）の関係です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "元本100万円を年利10%の単利で2年間運用した場合、2年後の合計金額はいくらか？",
    "answer": { "kind": "choice", "options": ["110万円", "120万円", "121万円", "112万円"], "correct": 1 },
    "explain": ["単利では毎年「元本×利率」が利息としてつきます。100万円×10%=10万円が毎年つくので、2年間で20万円の利息となり、合計120万円です。複利なら121万円になります。"],
    "hint": "単利は毎年同じ金額の利息がつきます。1年ごとに計算してみましょう。",
    "pack": "お金・投資"
  },
  {
    "id": "money-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "株価が上がったり下がったりする直接の理由として最も適切なのはどれか？",
    "answer": { "kind": "choice", "options": ["政府が毎日決定する", "買いたい人と売りたい人の需要と供給のバランスで決まる", "会社の利益に比例して自動的に決まる", "日本銀行が毎日設定する"], "correct": 1 },
    "explain": ["株価は市場での売買により、買いたい人（需要）と売りたい人（供給）のバランスで決まります。企業業績・経済指標・ニュース・投資家心理など様々な要因がこのバランスに影響します。"],
    "hint": "市場での「買いたい量」と「売りたい量」のバランスを考えましょう。",
    "pack": "お金・投資"
  },
  {
    "id": "money-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "投資信託を選ぶとき「信託報酬（運用管理費用）」に注意すべき理由として正しいのはどれか？",
    "answer": { "kind": "choice", "options": ["信託報酬が高いほど運用成績が必ず良くなるから", "信託報酬は毎年運用資産から差し引かれ、長期では結果に大きく影響するから", "信託報酬は解約時にのみ一度だけかかるから", "信託報酬は国が補助してくれるから"], "correct": 1 },
    "explain": ["信託報酬は年率で表示され、保有している間ずっと運用資産から差し引かれます。年率1%と0.1%では、長期間では最終的な資産額に大きな差が生じます。長期投資では低コストの商品を選ぶことが重要です。"],
    "hint": "毎年かかるコストが長期間積み重なると、最終結果に大きく影響します。",
    "pack": "お金・投資"
  },
  {
    "id": "money-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "株式を売買するために、まず必要となるものはどれか？",
    "answer": { "kind": "choice", "options": ["銀行の定期預金口座", "証券会社の口座", "郵便局の口座", "クレジットカードだけあればよい"], "correct": 1 },
    "explain": ["株式を売買するには、証券会社に「証券口座」を開設する必要があります。近年はネット証券でスマートフォンから手軽に口座開設・取引できるようになっています。"],
    "hint": "株を売買する「窓口」となる会社の口座が必要です。",
    "pack": "お金・投資"
  },
  {
    "id": "money-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "インフレ（物価上昇）が続く環境で、現金だけで資産を持ち続けると、その実質的な価値はどうなりやすいか？",
    "answer": { "kind": "choice", "options": ["実質的な価値が増える", "実質的な価値は変わらない", "実質的な価値が下がる", "インフレは現金保有に影響しない"], "correct": 2 },
    "explain": ["インフレで物価が上がると、同じ金額で買えるものが減ります。物価が年2%上がると、現金の実質的な購買力は年々目減りします。インフレ対策として投資が注目される理由のひとつです。"],
    "hint": "物価が上がると、同じ金額で買えるものの「量」はどうなるでしょう。",
    "pack": "お金・投資"
  },
  {
    "id": "boki-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "簿記とは、主にどのような目的で行われる記録作業ですか？",
    "answer": { "kind": "choice", "options": ["お店や会社のお金の出入りを記録し、財産や損益を明らかにする", "商品の在庫数を管理するための記録作業", "従業員の勤務時間を記録するための作業", "税務署への申告書類を作成するためだけの計算作業"], "correct": 0 },
    "explain": ["簿記は、お金や財産の動きを帳簿に記録し、会社の財産状況ともうけを正確に把握するための技術です。決算書の作成にもつながります。"],
    "hint": "帳簿に記録して、財産と損益を明らかにする作業です。",
    "pack": "簿記"
  },
  {
    "id": "boki-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「複式簿記」の特徴として正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["収入と支出だけを記録する方式", "1つの取引を原因と結果の2つの面から記録する方式", "複数の会社の帳簿をまとめて管理する方式", "現金だけに絞って記録する方式"], "correct": 1 },
    "explain": ["複式簿記は、1つの取引を「原因（借方）」と「結果（貸方）」の2つの面から必ず記録します。これにより記録の誤りを発見しやすく、財産と損益を同時に把握できます。"],
    "hint": "「複式」は「2つの側面」を意味します。",
    "pack": "簿記"
  },
  {
    "id": "boki-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "簿記で「資産」にあたるものはどれですか？",
    "answer": { "kind": "choice", "options": ["借入金", "買掛金", "資本金", "売掛金"], "correct": 3 },
    "explain": ["売掛金は「商品を売ったがまだ代金をもらっていない権利」で、将来お金が入ってくるため資産です。借入金・買掛金は負債、資本金は純資産に分類されます。"],
    "hint": "将来お金が入ってくる「権利」は会社にとってプラスの財産です。",
    "pack": "簿記"
  },
  {
    "id": "boki-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "貸借対照表（B/S）が成り立つ等式として正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["資産 ＝ 負債 − 純資産", "資産 ＋ 負債 ＝ 純資産", "資産 ＝ 負債 ＋ 純資産", "純資産 ＝ 資産 ＋ 負債"], "correct": 2 },
    "explain": ["「資産 ＝ 負債 ＋ 純資産」は簿記の大原則です。会社が持つ財産（資産）は、他から借りたもの（負債）と自分で積み上げたもの（純資産）の合計と必ず一致します。"],
    "hint": "会社の財産の出どころは「借りたもの」と「自分のもの」の2つです。",
    "pack": "簿記"
  },
  {
    "id": "boki-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "損益計算書（P/L）で「利益」を求める式として正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["利益 ＝ 収益 ＋ 費用", "利益 ＝ 収益 − 費用", "利益 ＝ 費用 − 収益", "利益 ＝ 資産 − 負債"], "correct": 1 },
    "explain": ["利益は「収益（売上などのかせぎ）から費用（経費など）を引いた残り」です。この式が損益計算書の基本で、利益がプラスなら黒字、マイナスなら赤字です。"],
    "hint": "かせぎからコストを引いた残りが利益です。",
    "pack": "簿記"
  },
  {
    "id": "boki-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "簿記で「借方（かりかた）」とはどちらの側を指しますか？",
    "answer": { "kind": "choice", "options": ["帳簿の右側", "帳簿の左側", "帳簿の上側", "帳簿の下側"], "correct": 1 },
    "explain": ["借方は帳簿の左側、貸方は右側です。名前の由来には諸説ありますが、簿記では「左＝借方・右＝貸方」と機械的に覚えるのが基本です。"],
    "hint": "「かり」は左、「かし」は右と覚えます。",
    "pack": "簿記"
  },
  {
    "id": "boki-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「仕訳（しわけ）」とは何をすることですか？",
    "answer": { "kind": "choice", "options": ["商品を種類ごとに倉庫に分類して保管すること", "取引を借方と貸方に分けて勘定科目と金額を記録すること", "年末に帳簿の合計を計算して締め切ること", "売上と費用を比較して利益を計算すること"], "correct": 1 },
    "explain": ["仕訳は、取引が起きたときに「何が増えた・減ったか」を借方と貸方に分けて記録する作業です。すべての帳簿記入はこの仕訳から始まります。"],
    "hint": "取引を左（借方）と右（貸方）に「仕分け」するイメージです。",
    "pack": "簿記"
  },
  {
    "id": "boki-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「買掛金」とはどのようなものですか？",
    "answer": { "kind": "choice", "options": ["商品を売ったが、まだ代金を受け取っていないお金", "銀行から借りているお金", "商品を仕入れたが、まだ代金を支払っていない義務", "将来受け取る予定の利息"], "correct": 2 },
    "explain": ["買掛金は「商品を仕入れたがまだ代金を払っていない」という支払い義務で、負債に分類されます。反対に「売ったがまだもらっていない」は売掛金（資産）です。"],
    "hint": "「買った代金をまだ払っていない」のは将来の支払い義務です。",
    "pack": "簿記"
  },
  {
    "id": "boki-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "貸借対照表（B/S）が表すものとして正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["一定期間の売上と費用の内訳", "ある時点での会社の財産と借金の状況", "一定期間の現金の増減の記録", "従業員への給料の支払い状況"], "correct": 1 },
    "explain": ["B/Sは「Balance Sheet（バランスシート）」の略で、決算日などある一時点の財産（資産）・借金（負債）・自己資本（純資産）をまとめた表です。会社の体力を一目で確認できます。"],
    "hint": "「ある時点でのスナップショット」のような財産の一覧表です。",
    "pack": "簿記"
  },
  {
    "id": "boki-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "損益計算書（P/L）が表すものとして正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["ある時点での会社の財産の状況", "一定期間における会社の収益・費用・利益の結果", "株主への配当金の支払い計画", "銀行からの借入金の残高"], "correct": 1 },
    "explain": ["P/Lは「Profit and Loss Statement」の略で、1年間などの期間中にどれだけかせいで（収益）、どれだけ使って（費用）、いくらもうかったか（利益）を示す成績表です。"],
    "hint": "「一定期間の経営の成績を示す」書類を思い浮かべましょう。",
    "pack": "簿記"
  },
  {
    "id": "boki-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「減価償却（げんかしょうきゃく）」の説明として正しいものはどれですか？",
    "answer": { "kind": "choice", "options": ["借入金の利息を毎年少しずつ返済していくこと", "建物や機械などの固定資産の取得費用を、使用年数にわたって少しずつ費用に配分すること", "商品の売れ残りを値引きして販売すること", "売掛金が回収できなかった場合に損失として計上すること"], "correct": 1 },
    "explain": ["建物や車は何年も使うので、購入費用を一度に経費にせず毎年少しずつ費用にします。これが減価償却です。10年使う機材なら、おおよそ10年に分けて費用にするイメージです。"],
    "hint": "長く使う資産のコストを「使う年数に分けて」費用にする仕組みです。",
    "pack": "簿記"
  },
  {
    "id": "boki-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「純資産（自己資本）」とは何を意味しますか？",
    "answer": { "kind": "choice", "options": ["銀行から借りているお金の合計", "資産から負債を差し引いた、会社が本当に自分のものとして持つ財産", "1年間で稼いだ売上の合計", "現金と預金の合計"], "correct": 1 },
    "explain": ["純資産は「資産 − 負債」で求められ、借金を返した後に残る本当の自己財産です。資本金や過去の利益の積み上げが含まれます。純資産が大きいほど財務的に安定しています。"],
    "hint": "全財産から借金を引いた「本当の自分のもの」が純資産です。",
    "pack": "簿記"
  },
  {
    "id": "boki-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「勘定科目（かんじょうかもく）」とは何ですか？",
    "answer": { "kind": "choice", "options": ["会社の商品に付けられた品番や型番のこと", "帳簿で取引の内容を分類して記録するための名前（ラベル）", "税務署に提出する書類の種類名", "銀行口座の種類を表す名称"], "correct": 1 },
    "explain": ["勘定科目は、お金の動きを「現金」「売掛金」「仕入」「売上」などのカテゴリーに分けるためのラベルです。取引を正しく分類することで、後から集計や分析がしやすくなります。"],
    "hint": "帳簿に記録するときに使う「取引の分類名」です。",
    "pack": "簿記"
  },
  {
    "id": "boki-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「売掛金（うりかけきん）」は簿記上どのように分類されますか？",
    "answer": { "kind": "choice", "options": ["負債", "費用", "資産", "純資産"], "correct": 2 },
    "explain": ["売掛金は「商品を販売したがまだ代金を受け取っていない権利」です。将来お金が入ってくるためプラスの財産として資産に分類されます。"],
    "hint": "まだもらっていないお金の「受け取る権利」は会社の財産です。",
    "pack": "簿記"
  },
  {
    "id": "boki-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "「決算（けっさん）」とはどのような作業ですか？",
    "answer": { "kind": "choice", "options": ["毎月の給料を計算して従業員に支払う作業", "一定期間の帳簿を締め切り、財務諸表を作成する作業", "銀行口座の残高を確認して記帳する作業", "仕入れた商品の数量を棚卸しして記録する作業"], "correct": 1 },
    "explain": ["決算は1年間（または四半期）の帳簿を締めて、貸借対照表・損益計算書などの財務諸表を作成する大切な作業です。会社の成績と財産状況をまとめます。"],
    "hint": "一定期間の帳簿を「締めくくる」大仕事です。",
    "pack": "簿記"
  },
  {
    "id": "boki-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "会社が商品を仕入れたときに使う勘定科目はどれですか？",
    "answer": { "kind": "choice", "options": ["売上", "受取手数料", "給料", "仕入"], "correct": 3 },
    "explain": ["商品を購入（仕入れ）したときは「仕入」という勘定科目を使います。仕入は費用に分類されます。商品を売った際の「売上」とセットで利益計算に使います。"],
    "hint": "「商品を買い入れる」ときに使う科目名をそのまま思い浮かべましょう。",
    "pack": "簿記"
  },
  {
    "id": "boki-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "「資本金」とは何ですか？",
    "answer": { "kind": "choice", "options": ["銀行からの借入金の合計", "会社が1年間で稼いだ利益の合計", "会社を設立したときや増資した際に株主が払い込んだお金", "商品の仕入れにかかった費用の合計"], "correct": 2 },
    "explain": ["資本金は会社設立時や増資時に株主から出資されたお金で、純資産の中心的な項目です。返済義務のない「会社の元手」として、負債（借金）とは区別されます。"],
    "hint": "会社の「元手」として株主が出資したお金のことです。",
    "pack": "簿記"
  },
  {
    "id": "boki-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "会社の収益が費用を下回り、利益がマイナスになった状態を何といいますか？",
    "answer": { "kind": "choice", "options": ["黒字", "均衡", "赤字", "余剰"], "correct": 2 },
    "explain": ["収益より費用が多く、利益がマイナスになった状態を「赤字」といいます。逆に利益がプラスの状態は「黒字」です。かつて帳簿で損失を赤いインクで書いたことが語源といわれています。"],
    "hint": "損失が出た状態を色で表現した言葉です。",
    "pack": "簿記"
  },
  {
    "id": "boki-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "日商簿記3級で主に学ぶ対象として最も適切なものはどれですか？",
    "answer": { "kind": "choice", "options": ["株式会社の連結財務諸表の作成", "小規模な株式会社などの基本的な商業簿記", "国際会計基準（IFRS）に基づく財務報告", "製造業における製品原価の計算"], "correct": 1 },
    "explain": ["日商簿記3級は、小規模な株式会社などを対象にした基本的な「商業簿記」が範囲です。日常的な売買取引の記帳・決算書の作成が中心で、社会人の基礎知識として人気の資格です。"],
    "hint": "3級は「入門レベル」で、身近な会社のお金の流れを扱います。",
    "pack": "簿記"
  },
  {
    "id": "boki-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "次のうち「負債」に分類されるものはどれですか？",
    "answer": { "kind": "choice", "options": ["現金", "建物", "借入金", "売掛金"], "correct": 2 },
    "explain": ["借入金は銀行などからの借金で、将来返済する義務があるため負債です。現金・建物・売掛金はいずれも資産です。「将来お金を払う義務」があるものが負債と覚えましょう。"],
    "hint": "「将来返さなければならない」義務があるものが負債です。",
    "pack": "簿記"
  },
  {
    "id": "keisan-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1000円の商品が2割引になっています。いくらで買えますか？",
    "answer": { "kind": "choice", "options": ["700円", "800円", "850円", "900円"], "correct": 1 },
    "explain": ["2割引は20%引きなので、1000円×0.8＝800円。1000円×0.2＝200円を引いても同じです。"],
    "hint": "2割引は、元の値段の8割を払うということ。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "税抜き価格が1000円の商品の、消費税10%込みの税込価格はいくらですか？",
    "answer": { "kind": "choice", "options": ["1010円", "1050円", "1100円", "1200円"], "correct": 2 },
    "explain": ["消費税10%なので、1000円×1.1＝1100円。1000円×0.1＝100円を足しても同じです。"],
    "hint": "税抜き価格に1割を足します。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "680円の買い物をして、1000円を出しました。おつりはいくらですか？",
    "answer": { "kind": "choice", "options": ["220円", "280円", "320円", "380円"], "correct": 2 },
    "explain": ["おつり＝1000円−680円＝320円です。"],
    "hint": "出した金額から買い物の金額を引きます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "4人で5200円の食事代を割り勘にします。1人あたりいくらになりますか？",
    "answer": { "kind": "choice", "options": ["1100円", "1200円", "1300円", "1400円"], "correct": 2 },
    "explain": ["5200円÷4人＝1300円です。"],
    "hint": "合計金額を人数で割ります。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "りんご3個で360円のAと、5個で500円のBがあります。1個あたりが安いのはどちらですか？",
    "answer": { "kind": "choice", "options": ["Aの方が安い", "Bの方が安い", "同じ値段", "計算できない"], "correct": 1 },
    "explain": ["A：360÷3＝120円、B：500÷5＝100円。BはAより1個20円安いです。"],
    "hint": "それぞれ1個あたりの値段を計算して比べます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "3000円の買い物で、5%のポイントが還元されます。何円分のポイントがたまりますか？",
    "answer": { "kind": "choice", "options": ["100円分", "150円分", "200円分", "300円分"], "correct": 1 },
    "explain": ["3000円×0.05＝150円分。3000円の5%は150円です。"],
    "hint": "5%は100円あたり5円分です。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "去年の電気代は月8000円でした。今年は10%値上がりしました。今年の月の電気代はいくらですか？",
    "answer": { "kind": "choice", "options": ["8100円", "8400円", "8800円", "9000円"], "correct": 2 },
    "explain": ["8000円×1.1＝8800円。8000円×0.1＝800円を足しても同じです。"],
    "hint": "10%増は、元の金額の1割を足します。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "クラス40人のうち15人が電車通学をしています。電車通学の割合は何%ですか？",
    "answer": { "kind": "choice", "options": ["25%", "30%", "37.5%", "40%"], "correct": 2 },
    "explain": ["15÷40＝0.375、つまり37.5%です。15÷40×100で求められます。"],
    "hint": "割合＝部分÷全体×100。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "時速60kmで走る車が30分間走ると、何km進みますか？",
    "answer": { "kind": "choice", "options": ["20km", "30km", "40km", "60km"], "correct": 1 },
    "explain": ["30分＝0.5時間なので、60km×0.5＝30km。時速60kmは1時間で60km進みます。"],
    "hint": "30分は1時間の半分です。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "午前10時45分から1時間30分後は何時何分ですか？",
    "answer": { "kind": "choice", "options": ["午後0時15分", "午後0時30分", "午前11時45分", "午後1時15分"], "correct": 0 },
    "explain": ["10時45分＋1時間＝11時45分、さらに30分足すと12時15分（午後0時15分）です。"],
    "hint": "1時間後を先に計算してから、残りの分を足します。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "国語80点、数学70点、英語90点のテスト3科目の平均点は何点ですか？",
    "answer": { "kind": "choice", "options": ["75点", "78点", "80点", "85点"], "correct": 2 },
    "explain": ["（80＋70＋90）÷3＝240÷3＝80点です。"],
    "hint": "平均＝合計点÷科目数。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "縦4m、横5mの部屋の面積は何平方メートル（㎡）ですか？",
    "answer": { "kind": "choice", "options": ["16㎡", "18㎡", "20㎡", "25㎡"], "correct": 2 },
    "explain": ["長方形の面積＝縦×横＝4×5＝20㎡です。"],
    "hint": "長方形の面積は縦と横をかけます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "通常1本120円のジュースを、10本まとめ買いすると1割引になります。10本買うといくらですか？",
    "answer": { "kind": "choice", "options": ["1000円", "1080円", "1100円", "1200円"], "correct": 1 },
    "explain": ["通常の合計は120×10＝1200円。1割引なので1200×0.9＝1080円です。"],
    "hint": "まず10本の定価合計を出してから、1割引を計算します。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "先月の電気代が5000円で、今月は先月より20%減りました。今月の電気代はいくらですか？",
    "answer": { "kind": "choice", "options": ["3500円", "4000円", "4200円", "4500円"], "correct": 1 },
    "explain": ["20%減なので5000円×0.8＝4000円。5000円×0.2＝1000円を引いても同じです。"],
    "hint": "20%減は、元の金額の8割になります。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "野球選手が100回打席に立ち、30本ヒットを打ちました。打率はいくつですか？",
    "answer": { "kind": "choice", "options": ["0.250", "0.300", "0.330", "0.350"], "correct": 1 },
    "explain": ["打率＝ヒット数÷打席数＝30÷100＝0.300です。"],
    "hint": "打率＝ヒット数÷打席数。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "額面の給料が25万円で、手取りが額面の約8割だとすると、手取りはおよそいくらですか？",
    "answer": { "kind": "choice", "options": ["18万円", "19万円", "20万円", "22万円"], "correct": 2 },
    "explain": ["25万円×0.8＝20万円。額面の約8割が手取りの目安とされることが多いです。"],
    "hint": "8割は0.8をかけると求められます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1kWhあたり30円の電気料金で、100kWh使用した場合の電気代はいくらですか？",
    "answer": { "kind": "choice", "options": ["2500円", "3000円", "3500円", "4000円"], "correct": 1 },
    "explain": ["30円×100kWh＝3000円。単価×使用量で計算できます。"],
    "hint": "1kWhの単価に使った量をかけます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "定価2500円の服が3割引のセールになっています。セール価格はいくらですか？",
    "answer": { "kind": "choice", "options": ["1500円", "1600円", "1750円", "2000円"], "correct": 2 },
    "explain": ["3割引は30%引きなので、2500円×0.7＝1750円。2500円×0.3＝750円を引いても同じです。"],
    "hint": "3割引は元の値段の7割を払います。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "税込み価格が2200円の商品の、税抜き価格（消費税10%）はいくらですか？",
    "answer": { "kind": "choice", "options": ["1800円", "1900円", "2000円", "2100円"], "correct": 2 },
    "explain": ["税込価格÷1.1＝税抜価格。2200÷1.1＝2000円です。"],
    "hint": "税込価格は税抜価格の1.1倍なので、1.1で割ります。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "自宅から駅まで時速4kmで歩くと20分かかります。自宅から駅までは約何kmですか？",
    "answer": { "kind": "choice", "options": ["約1.0km", "約1.3km", "約1.5km", "約2.0km"], "correct": 1 },
    "explain": ["20分＝20÷60時間＝約0.33時間。4km×0.33≒1.3kmです。"],
    "hint": "道のり＝速さ×時間。時間は「時間」の単位に直します。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "5人で食事をして合計7500円になりました。1人あたりいくら払えばよいですか？",
    "answer": { "kind": "choice", "options": ["1200円", "1400円", "1500円", "1600円"], "correct": 2 },
    "explain": ["7500円÷5人＝1500円です。"],
    "hint": "合計を人数で割ります。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "600円の弁当と150円のお茶と80円のあめを買いました。消費税10%込みの合計はいくらですか？",
    "answer": { "kind": "choice", "options": ["830円", "858円", "880円", "913円"], "correct": 3 },
    "explain": ["税抜合計は600＋150＋80＝830円。830円×1.1＝913円です。"],
    "hint": "先に税抜の合計を出してから、1.1をかけます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1袋100gで298円のひき肉と、1袋200gで498円のひき肉があります。100gあたりが安いのはどちらですか？",
    "answer": { "kind": "choice", "options": ["100g入りの方が安い", "200g入りの方が安い", "同じ値段", "どちらとも言えない"], "correct": 1 },
    "explain": ["100g入りは100gあたり298円。200g入りは498÷2＝100gあたり249円。200g入りの方が安いです。"],
    "hint": "両方とも100gあたりの値段に直して比べます。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "先月の売上が80万円で、今月は先月より25%増えました。今月の売上はいくらですか？",
    "answer": { "kind": "choice", "options": ["90万円", "95万円", "100万円", "105万円"], "correct": 2 },
    "explain": ["25%増なので80万円×1.25＝100万円。80万円×0.25＝20万円を足しても同じです。"],
    "hint": "25%増は元の金額の1.25倍です。",
    "pack": "暮らしの計算"
  },
  {
    "id": "keisan-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "毎月3万円ずつ貯金すると、50万円貯まるのは何ヶ月後ですか？",
    "answer": { "kind": "choice", "options": ["約14ヶ月後", "約17ヶ月後", "約20ヶ月後", "約24ヶ月後"], "correct": 1 },
    "explain": ["50万円÷3万円＝16.6…ヶ月。割り切れないので切り上げて17ヶ月後に達成できます。"],
    "hint": "目標金額÷毎月の貯金額で、何ヶ月かかるか計算できます。",
    "pack": "暮らしの計算"
  }
]

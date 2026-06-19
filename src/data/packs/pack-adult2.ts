/*
 * 大人向けクイズ 追加パック（4AI作成・合計240問）
 * 自動生成ファイル（build_pack_adult2.mjs が外部AIのJSONから生成）。手書き編集しない。
 * - AdultMode から PACK_ADULT と合わせて出題プールにする。
 * - subject/grade/type は採点に使わない付帯値。pack にジャンル名。hint に一言ヒント。
 */
import type { Question } from '../../types'

export const PACK_ADULT2: Question[] = [
  {
    "id": "math-001",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "2次方程式 x²−5x+6=0 の解の組はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "x=2,3",
        "x=1,6",
        "x=−2,−3",
        "x=3,5"
      ],
      "correct": 0
    },
    "explain": [
      "x²−5x+6は(x−2)(x−3)と因数分解できる。したがって解はx=2,3。"
    ],
    "hint": "積が6、和が5になる2つの数を考える。",
    "pack": "数学"
  },
  {
    "id": "math-002",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "log₂8 の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "2",
        "3",
        "4",
        "8"
      ],
      "correct": 1
    },
    "explain": [
      "log₂8は『2を何乗すると8になるか』を表す。2³=8なので値は3。"
    ],
    "hint": "対数は『底を何乗するか』を表す。",
    "pack": "数学"
  },
  {
    "id": "math-003",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "sin30° の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "√3/2",
        "1/3",
        "1/2",
        "√2/2"
      ],
      "correct": 2
    },
    "explain": [
      "30°、60°、90°の直角三角形では、sin30°は斜辺に対する向かい側の比で1/2。"
    ],
    "hint": "30°の向かい側の辺は斜辺の半分。",
    "pack": "数学"
  },
  {
    "id": "math-004",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "初項5、公差3の等差数列で、第10項はいくつですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "29",
        "30",
        "31",
        "32"
      ],
      "correct": 3
    },
    "explain": [
      "等差数列の第n項は aₙ=a₁+(n−1)d。5+9×3=32。"
    ],
    "hint": "第10項までに公差は9回足される。",
    "pack": "数学"
  },
  {
    "id": "math-005",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "不等式 x²−4x−5≦0 の解はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "−1≦x≦5",
        "x≦−1 または 5≦x",
        "−5≦x≦1",
        "x≦1 または 5≦x"
      ],
      "correct": 0
    },
    "explain": [
      "x²−4x−5=(x+1)(x−5)。上に開く放物線なので、0以下になるのは2つの解の間で−1≦x≦5。"
    ],
    "hint": "上に開く2次式は、根の間で0以下になる。",
    "pack": "数学"
  },
  {
    "id": "math-006",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "複素数 (2+i)(3−2i) を計算するとどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "4−i",
        "8−i",
        "8+i",
        "6−i"
      ],
      "correct": 1
    },
    "explain": [
      "(2+i)(3−2i)=6−4i+3i−2i²。i²=−1より、6−i+2=8−i。"
    ],
    "hint": "i²を−1に置き換えて整理する。",
    "pack": "数学"
  },
  {
    "id": "math-007",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "関数 f(x)=x³−3x²+2 の導関数 f'(x) はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "3x²−3x",
        "3x²−6",
        "3x²−6x",
        "x²−6x"
      ],
      "correct": 2
    },
    "explain": [
      "x³の微分は3x²、−3x²の微分は−6x、定数2の微分は0。よってf'(x)=3x²−6x。"
    ],
    "hint": "各項ごとに次数を1つ下げる。",
    "pack": "数学"
  },
  {
    "id": "math-008",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "∫₀² (3x²+1) dx の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "8",
        "9",
        "11",
        "10"
      ],
      "correct": 3
    },
    "explain": [
      "3x²+1の原始関数はx³+x。0から2まで代入すると(8+2)−0=10。"
    ],
    "hint": "原始関数を作って上端と下端を代入する。",
    "pack": "数学"
  },
  {
    "id": "math-009",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "2個のサイコロを同時に投げるとき、出た目の和が8になる確率はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "5/36",
        "1/6",
        "7/36",
        "1/9"
      ],
      "correct": 0
    },
    "explain": [
      "和が8になる組は(2,6),(3,5),(4,4),(5,3),(6,2)の5通り。全体36通りなので5/36。"
    ],
    "hint": "順序つきで何通りあるか数える。",
    "pack": "数学"
  },
  {
    "id": "math-010",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "5C2 の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "20",
        "10",
        "15",
        "25"
      ],
      "correct": 1
    },
    "explain": [
      "5C2は5個から2個を選ぶ組合せの数。5×4÷(2×1)=10。"
    ],
    "hint": "順番を区別しない選び方。",
    "pack": "数学"
  },
  {
    "id": "math-011",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "初項2、公比3の等比数列で、第5項はいくつですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "54",
        "81",
        "162",
        "486"
      ],
      "correct": 2
    },
    "explain": [
      "等比数列の第n項は aₙ=a₁rⁿ⁻¹。2×3⁴=2×81=162。"
    ],
    "hint": "第5項では公比を4回かける。",
    "pack": "数学"
  },
  {
    "id": "math-012",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "方程式 2ˣ=16 の解はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "2",
        "3",
        "5",
        "4"
      ],
      "correct": 3
    },
    "explain": [
      "16は2⁴なので、2ˣ=2⁴。よってx=4。"
    ],
    "hint": "16を2の累乗で表す。",
    "pack": "数学"
  },
  {
    "id": "math-013",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "円 x²+y²−4x+6y−12=0 の中心と半径の組はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "中心(2,−3)、半径5",
        "中心(−2,3)、半径5",
        "中心(2,3)、半径1",
        "中心(−2,−3)、半径1"
      ],
      "correct": 0
    },
    "explain": [
      "平方完成すると(x−2)²+(y+3)²=25。したがって中心は(2,−3)、半径は5。"
    ],
    "hint": "xとyをそれぞれ平方完成する。",
    "pack": "数学"
  },
  {
    "id": "math-014",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "曲線 y=x² 上の x=2 における接線の方程式はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "y=2x",
        "y=4x−4",
        "y=4x+4",
        "y=2x+2"
      ],
      "correct": 1
    },
    "explain": [
      "y=x²の導関数は2xなので、x=2での傾きは4。接点は(2,4)だから、接線はy−4=4(x−2)、つまりy=4x−4。"
    ],
    "hint": "接線は『傾き』と『接点』から作る。",
    "pack": "数学"
  },
  {
    "id": "math-015",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "方程式 log₃(x−1)+log₃(x−3)=1 の解はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "x=3",
        "x=0",
        "x=4",
        "x=6"
      ],
      "correct": 2
    },
    "explain": [
      "対数の和をまとめるとlog₃((x−1)(x−3))=1なので、(x−1)(x−3)=3。整理してx(x−4)=0、定義域x>3よりx=4。"
    ],
    "hint": "対数の中身が正になる範囲も確認する。",
    "pack": "数学"
  },
  {
    "id": "math-016",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "∫₀π sin²x dx の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "1",
        "π",
        "2π",
        "π/2"
      ],
      "correct": 3
    },
    "explain": [
      "sin²x=(1−cos2x)/2を用いると、0からπまでの積分はπ/2。cos2xの積分部分は端点で打ち消し合う。"
    ],
    "hint": "半角の公式を使うと積分しやすい。",
    "pack": "数学"
  },
  {
    "id": "math-017",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "多項式 P(x)=x³−2x+5 を x−2 で割った余りはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "9",
        "7",
        "5",
        "3"
      ],
      "correct": 0
    },
    "explain": [
      "剰余の定理より、x−2で割った余りはP(2)。P(2)=8−4+5=9。"
    ],
    "hint": "x−aで割る余りはP(a)。",
    "pack": "数学"
  },
  {
    "id": "math-018",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "lim x→∞ (3x²−x)/(x²+2) の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "1",
        "3",
        "0",
        "∞"
      ],
      "correct": 1
    },
    "explain": [
      "分子と分母をx²で割ると、(3−1/x)/(1+2/x²)。x→∞で1/xと2/x²は0に近づくので値は3。"
    ],
    "hint": "最高次数の係数に注目する。",
    "pack": "数学"
  },
  {
    "id": "math-019",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "−3² の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "9",
        "6",
        "−9",
        "−6"
      ],
      "correct": 2
    },
    "explain": [
      "−3²は−(3²)を意味するので−9。(−3)²と混同すると9を選びやすい。"
    ],
    "hint": "2乗されている範囲を確認する。",
    "pack": "数学"
  },
  {
    "id": "math-020",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "(−2)⁴ の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "−16",
        "8",
        "−8",
        "16"
      ],
      "correct": 3
    },
    "explain": [
      "(−2)⁴は−2全体を4回かけるので16。かっこがあるため、符号も含めて偶数回かける。"
    ],
    "hint": "かっこがある場合、符号も一緒に累乗される。",
    "pack": "数学"
  },
  {
    "id": "math-021",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "0.2² の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "0.04",
        "0.4",
        "0.004",
        "4"
      ],
      "correct": 0
    },
    "explain": [
      "0.2²=0.2×0.2=0.04。小数点の位置を1けただけ動かして0.4にする誤りが多い。"
    ],
    "hint": "小数どうしのかけ算では小数点以下の桁数を合計する。",
    "pack": "数学"
  },
  {
    "id": "math-022",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "実数xについて、√(x²) と常に等しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "x",
        "−x",
        "0",
        "|x|"
      ],
      "correct": 3
    },
    "explain": [
      "√(x²)は常に0以上の値を表すため|x|。xが負のときにxとすると符号が合わない。"
    ],
    "hint": "平方根の記号は0以上の値を表す。",
    "pack": "数学"
  },
  {
    "id": "math-023",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "x>3 の両辺に −2 をかけたとき、正しい不等式はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "−2x<−6",
        "−2x>−6",
        "2x<6",
        "−x>3"
      ],
      "correct": 0
    },
    "explain": [
      "不等式の両辺に負の数をかけると、不等号の向きが逆になる。したがって−2x<−6。"
    ],
    "hint": "負の数をかけると向きが変わる。",
    "pack": "数学"
  },
  {
    "id": "math-024",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "(a+b)² を展開した式として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "a²+b²",
        "a²−2ab+b²",
        "a²+2ab+b²",
        "2a+2b"
      ],
      "correct": 2
    },
    "explain": [
      "(a+b)²=(a+b)(a+b)=a²+2ab+b²。中央の2abを忘れてa²+b²にする誤りが多い。"
    ],
    "hint": "同じ2項式を2回かけてすべての項を掛け合わせる。",
    "pack": "数学"
  },
  {
    "id": "math-025",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "x=1, y=2 のとき、1/(x+y) の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "3/2",
        "1/3",
        "1/2",
        "1"
      ],
      "correct": 1
    },
    "explain": [
      "x+y=3なので1/(x+y)=1/3。1/x+1/y=3/2と混同しないように注意する。"
    ],
    "hint": "分母全体を先に計算する。",
    "pack": "数学"
  },
  {
    "id": "math-026",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "log₂(8+8) の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "3",
        "4",
        "6",
        "8"
      ],
      "correct": 1
    },
    "explain": [
      "8+8=16なのでlog₂16=4。log₂8+log₂8のように分けて6とするのは誤り。"
    ],
    "hint": "対数を取る前に、かっこの中を計算する。",
    "pack": "数学"
  },
  {
    "id": "math-027",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "関数 y=sin(x²) の導関数はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "cos(x²)",
        "2x sin(x²)",
        "2x cos(x²)",
        "cos(2x)"
      ],
      "correct": 2
    },
    "explain": [
      "合成関数の微分より、外側のsinを微分してcos(x²)、さらに内側x²の微分2xをかける。よって2x cos(x²)。"
    ],
    "hint": "合成関数では内側の微分もかける。",
    "pack": "数学"
  },
  {
    "id": "math-028",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "∫ 1/x dx として正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "1/x²+C",
        "x²/2+C",
        "−1/x+C",
        "log|x|+C"
      ],
      "correct": 3
    },
    "explain": [
      "1/xの不定積分はlog|x|+C。x⁻¹の積分を通常のべき乗公式で処理しようとすると間違えやすい。"
    ],
    "hint": "指数が−1のときは特別扱い。",
    "pack": "数学"
  },
  {
    "id": "math-029",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "不等式 |x−2|<3 の解はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "−1<x<5",
        "x<−1 または 5<x",
        "−3<x<3",
        "−5<x<1"
      ],
      "correct": 0
    },
    "explain": [
      "|x−2|<3は−3<x−2<3と同値。各辺に2を足して−1<x<5。外側を選ぶのは |x−2|>3 の場合。"
    ],
    "hint": "絶対値が小さい場合は中心から近い範囲。",
    "pack": "数学"
  },
  {
    "id": "math-030",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "100円の商品を20%値上げし、その後20%値下げしました。最終価格はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "100円",
        "104円",
        "80円",
        "96円"
      ],
      "correct": 3
    },
    "explain": [
      "20%値上げで120円、その後20%値下げは120×0.8=96円。増減率は元にする金額が変わるため、元通りにはならない。"
    ],
    "hint": "2回目の割合は、値上げ後の金額に対してかかる。",
    "pack": "数学"
  },
  {
    "id": "math-031",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "1辺5cmの正方形の対角線の長さはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "5√2 cm",
        "10 cm",
        "25 cm",
        "2√5 cm"
      ],
      "correct": 0
    },
    "explain": [
      "正方形の対角線は、1辺をaとするとa√2。したがって5√2cm。"
    ],
    "hint": "対角線で直角二等辺三角形ができる。",
    "pack": "数学"
  },
  {
    "id": "math-032",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "半径6cm、中心角60°のおうぎ形の面積はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "3π cm²",
        "6π cm²",
        "12π cm²",
        "36π cm²"
      ],
      "correct": 1
    },
    "explain": [
      "おうぎ形の面積はπr²×中心角/360°。π×6²×60/360=6πcm²。"
    ],
    "hint": "円全体の何分のいくつかを考える。",
    "pack": "数学"
  },
  {
    "id": "math-033",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "直角三角形で、直角をはさむ2辺が6cmと8cmです。斜辺の長さはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "9cm",
        "12cm",
        "10cm",
        "14cm"
      ],
      "correct": 2
    },
    "explain": [
      "三平方の定理より、斜辺は√(6²+8²)=√100=10cm。"
    ],
    "hint": "直角三角形では三平方の定理を使う。",
    "pack": "数学"
  },
  {
    "id": "math-034",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "3辺の長さが5cm、5cm、6cmの二等辺三角形の面積はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "10 cm²",
        "15 cm²",
        "18 cm²",
        "12 cm²"
      ],
      "correct": 3
    },
    "explain": [
      "底辺6cmを半分にすると3cmずつ。高さは√(5²−3²)=4cmなので、面積は6×4÷2=12cm²。"
    ],
    "hint": "底辺を半分に分けて直角三角形を作る。",
    "pack": "数学"
  },
  {
    "id": "math-035",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "点(1,2)と点(3,6)を通る直線の方程式はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "y=2x",
        "y=x+1",
        "y=2x+1",
        "y=3x−1"
      ],
      "correct": 0
    },
    "explain": [
      "傾きは(6−2)/(3−1)=2。点(1,2)を通るので y−2=2(x−1)、つまりy=2x。"
    ],
    "hint": "まず2点から傾きを求める。",
    "pack": "数学"
  },
  {
    "id": "math-036",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "点A(−1,2)と点B(3,5)の距離はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "4",
        "5",
        "6",
        "7"
      ],
      "correct": 1
    },
    "explain": [
      "距離は√((3−(−1))²+(5−2)²)=√(4²+3²)=5。"
    ],
    "hint": "座標の差で直角三角形を作る。",
    "pack": "数学"
  },
  {
    "id": "math-037",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "円 x²+y²=25 に対して、点(3,4)はどこにありますか。",
    "answer": {
      "kind": "choice",
      "options": [
        "円の内側",
        "円の外側",
        "円周上",
        "判断できない"
      ],
      "correct": 2
    },
    "explain": [
      "点(3,4)を代入すると3²+4²=25。円の式と等しいので円周上にある。"
    ],
    "hint": "座標を円の式に代入して比べる。",
    "pack": "数学"
  },
  {
    "id": "math-038",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ベクトル a=(2,−1), b=(1,3) のとき、a+2b はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "(3,2)",
        "(4,5)",
        "(5,4)",
        "(0,−7)"
      ],
      "correct": 1
    },
    "explain": [
      "2b=(2,6)なので、a+2b=(2,−1)+(2,6)=(4,5)。"
    ],
    "hint": "まずbを2倍してから成分ごとに足す。",
    "pack": "数学"
  },
  {
    "id": "math-039",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "3辺の長さが7cm、8cm、9cmの三角形の面積はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "10√5 cm²",
        "12√3 cm²",
        "12√5 cm²",
        "24 cm²"
      ],
      "correct": 2
    },
    "explain": [
      "ヘロンの公式でs=(7+8+9)/2=12。面積は√(12×5×4×3)=√720=12√5cm²。"
    ],
    "hint": "3辺が分かる三角形はヘロンの公式が使える。",
    "pack": "数学"
  },
  {
    "id": "math-040",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "ベクトル u=(1,0), v=(1,√3) のなす角はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "30°",
        "45°",
        "90°",
        "60°"
      ],
      "correct": 3
    },
    "explain": [
      "内積は1、|u|=1、|v|=2なのでcosθ=1/2。したがってθ=60°。"
    ],
    "hint": "内積と長さからcosθを求める。",
    "pack": "数学"
  },
  {
    "id": "math-041",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "点(2,3)から直線 x+2y−4=0 までの距離はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "4√5/5",
        "2√5/5",
        "4",
        "√5"
      ],
      "correct": 0
    },
    "explain": [
      "点と直線の距離は |ax₀+by₀+c|/√(a²+b²)。|2+6−4|/√5=4/√5=4√5/5。"
    ],
    "hint": "点と直線の距離公式に代入する。",
    "pack": "数学"
  },
  {
    "id": "math-042",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "円 x²+y²=25 と直線 x=3 の交点2つの距離はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "6",
        "8",
        "10",
        "4"
      ],
      "correct": 1
    },
    "explain": [
      "x=3を代入すると9+y²=25よりy=±4。交点は(3,4)と(3,−4)で、距離は8。"
    ],
    "hint": "直線の条件を円の式に代入する。",
    "pack": "数学"
  },
  {
    "id": "math-043",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "ベクトル (2,1) と (−1,3) を隣り合う2辺とする平行四辺形の面積はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "5",
        "6",
        "7",
        "8"
      ],
      "correct": 2
    },
    "explain": [
      "平行四辺形の面積は|2×3−1×(−1)|=|6+1|=7。2次元では成分の行列式の絶対値で求められる。"
    ],
    "hint": "2つのベクトルの行列式の絶対値を使う。",
    "pack": "数学"
  },
  {
    "id": "math-044",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "空間内の2点 A(1,2,3), B(4,6,15) の距離はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "11",
        "12",
        "14",
        "13"
      ],
      "correct": 3
    },
    "explain": [
      "距離は√((4−1)²+(6−2)²+(15−3)²)=√(9+16+144)=√169=13。"
    ],
    "hint": "3次元でも座標の差の2乗を足す。",
    "pack": "数学"
  },
  {
    "id": "math-045",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "2辺の長さが4cmと5cmで、その間の角が60°の三角形の面積はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "5√3 cm²",
        "10√3 cm²",
        "20 cm²",
        "10 cm²"
      ],
      "correct": 0
    },
    "explain": [
      "面積は1/2ab sinC。1/2×4×5×sin60°=10×√3/2=5√3cm²。"
    ],
    "hint": "2辺とその間の角から面積を求める公式を使う。",
    "pack": "数学"
  },
  {
    "id": "math-046",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "円 (x−1)²+(y+2)²=9 に、点(5,1)から引いた接線の長さはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 1
    },
    "explain": [
      "中心は(1,−2)、半径は3。中心から点(5,1)までの距離は5なので、接線の長さは√(5²−3²)=4。"
    ],
    "hint": "中心・外部の点・接点で直角三角形ができる。",
    "pack": "数学"
  },
  {
    "id": "math-047",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "ベクトル a=(3,4) の、単位ベクトル e=(1,0) 方向への正射影の長さはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "4",
        "5",
        "3",
        "7"
      ],
      "correct": 2
    },
    "explain": [
      "単位ベクトル方向への正射影の長さは内積a・e。3×1+4×0=3。"
    ],
    "hint": "単位ベクトルとの内積を考える。",
    "pack": "数学"
  },
  {
    "id": "math-048",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "点Pが線分ABを AP:PB=2:1 に内分します。A(1,2), B(7,5) のとき、Pの座標はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "(3,3)",
        "(4,3)",
        "(4,4)",
        "(5,4)"
      ],
      "correct": 3
    },
    "explain": [
      "AP:PB=2:1なので、PはAから全体の2/3進んだ（Bに近い側の）点。座標は((1×1+2×7)/3,(1×2+2×5)/3)=(5,4)。"
    ],
    "hint": "内分点の公式では、反対側の比を重みとして使う。",
    "pack": "数学"
  },
  {
    "id": "math-049",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "5! の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "120",
        "25",
        "60",
        "100"
      ],
      "correct": 0
    },
    "explain": [
      "!は階乗を表し、5!=5×4×3×2×1=120。"
    ],
    "hint": "階乗は1まで順にかける記号。",
    "pack": "数学"
  },
  {
    "id": "math-050",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "easy",
    "text": "7P2 の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "21",
        "42",
        "14",
        "49"
      ],
      "correct": 1
    },
    "explain": [
      "7P2は7個から順番を区別して2個並べる数。7×6=42。"
    ],
    "hint": "Pは順番を区別する並べ方。",
    "pack": "数学"
  },
  {
    "id": "math-051",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "7C2 の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "42",
        "14",
        "21",
        "35"
      ],
      "correct": 2
    },
    "explain": [
      "7C2は順番を区別しない選び方。7×6÷2=21。"
    ],
    "hint": "Cは順番を区別しない選び方。",
    "pack": "数学"
  },
  {
    "id": "math-052",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "Σ の記号を使った和 1+2+3+4+5 の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "10",
        "12",
        "20",
        "15"
      ],
      "correct": 3
    },
    "explain": [
      "1から5までを足すと、1+2+3+4+5=15。Σは指定された範囲の和を表す記号。"
    ],
    "hint": "小さい順にすべて足し合わせる。",
    "pack": "数学"
  },
  {
    "id": "math-053",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "数列 2, 6, 12, 20, 30, … の次の項はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "42",
        "40",
        "44",
        "46"
      ],
      "correct": 0
    },
    "explain": [
      "各項はn(n+1)の形で、1×2, 2×3, 3×4, 4×5, 5×6。次は6×7=42。"
    ],
    "hint": "となり合う2つの整数の積として見る。",
    "pack": "数学"
  },
  {
    "id": "math-054",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "normal",
    "text": "命題 p⇒q が偽になるのはどの場合ですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "pが真、qが真",
        "pが真、qが偽",
        "pが偽、qが真",
        "pが偽、qが偽"
      ],
      "correct": 1
    },
    "explain": [
      "p⇒qは『pならばq』なので、pが真なのにqが偽の場合だけ成り立たず偽になる。"
    ],
    "hint": "前提が成り立つのに結論が成り立たない場合を考える。",
    "pack": "数学"
  },
  {
    "id": "math-055",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "Σで表される 1+3+5+…+(2n−1) の値はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "n(n+1)",
        "2n²",
        "n²",
        "n²+n"
      ],
      "correct": 2
    },
    "explain": [
      "最初からn個の奇数の和はn²。例えば1+3+5+7=16=4²となる。"
    ],
    "hint": "奇数を順に足すと平方数が現れる。",
    "pack": "数学"
  },
  {
    "id": "math-056",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "数列 1, 1, 2, 3, 5, 8, … の次の項はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "11",
        "12",
        "14",
        "13"
      ],
      "correct": 3
    },
    "explain": [
      "各項は直前2項の和。5+8=13なので次の項は13。"
    ],
    "hint": "直前の2つを足す規則。",
    "pack": "数学"
  },
  {
    "id": "math-057",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "nC0 の値として常に正しいものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "1",
        "0",
        "n",
        "n−1"
      ],
      "correct": 0
    },
    "explain": [
      "n個から0個を選ぶ方法は『何も選ばない』1通り。したがってnC0=1。"
    ],
    "hint": "空集合を選ぶ場合も数え上げに含める。",
    "pack": "数学"
  },
  {
    "id": "math-058",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "論理式 ¬(p∧q) と同値なものはどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "¬p∧¬q",
        "¬p∨¬q",
        "p∨q",
        "p∧¬q"
      ],
      "correct": 1
    },
    "explain": [
      "ド・モルガンの法則より、¬(p∧q) は ¬p∨¬q と同値。『かつ』の否定は『または』に変わる。"
    ],
    "hint": "否定を内側へ入れると接続語が入れ替わる。",
    "pack": "数学"
  },
  {
    "id": "math-059",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "数列 2, 3, 7, 16, 32, … の次の項はどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "54",
        "55",
        "57",
        "64"
      ],
      "correct": 2
    },
    "explain": [
      "差をとると1,4,9,16で、平方数が並ぶ。次の差は25なので、32+25=57。"
    ],
    "hint": "まず隣どうしの差を並べてみる。",
    "pack": "数学"
  },
  {
    "id": "math-060",
    "subject": "japanese",
    "type": "vocab",
    "grade": 3,
    "difficulty": "hard",
    "text": "2進法の 1011₂ を10進法で表すとどれですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "9",
        "10",
        "12",
        "11"
      ],
      "correct": 3
    },
    "explain": [
      "1011₂=1×2³+0×2²+1×2¹+1×2⁰=8+2+1=11。"
    ],
    "hint": "右から2⁰、2¹、2²、2³の位で考える。",
    "pack": "数学"
  },
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
    "text": "オーストリッチ（ダチョウ）は危険を感じると頭を砂に埋めると言われますが、実際はどうですか。",
    "answer": {
      "kind": "choice",
      "options": [
        "頭を埋めない。足で走って逃げる",
        "本当に頭を埋める",
        "翼を広げて威嚇する",
        "その場でしゃがむ"
      ],
      "correct": 0
    },
    "explain": [
      "オーストリッチが頭を砂に埋めるのは俗説です。実際は高速で走って逃げます。頭を埋めるように見えるのは、地面に耳を付けて振動を感じている姿勢が誤解されたものです。"
    ],
    "hint": "走る速度と体の大きさを考えます。",
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
    "text": "『ナポレオン・ボナパルトは背が低かった』というイメージがありますが、実際の身長は当時の平均と比べてどうでしたか。",
    "answer": {
      "kind": "choice",
      "options": [
        "当時のフランス人男性の平均よりやや高かった",
        "非常に低かった",
        "平均よりかなり低かった",
        "記録がなく不明"
      ],
      "correct": 0
    },
    "explain": [
      "ナポレオンの身長は約169cmで、当時のフランス人男性の平均（約165cm前後）よりやや高めでした。『低身長』イメージは英国の風刺画や単位の違い（フランスインチと英国インチ）による誤解が広まったものです。"
    ],
    "hint": "当時の平均身長と単位の違いを考慮します。",
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
    "text": "『ライオンは群れの王で、狩りはオスが主に行う』というイメージがありますが、実際は？",
    "answer": {
      "kind": "choice",
      "options": [
        "狩りのほとんどはメスが行う",
        "オスとメスが半々で狩りをする",
        "オスだけが狩りをする",
        "群れにオスはいない"
      ],
      "correct": 0
    },
    "explain": [
      "ライオンの狩りは主にメスが担うことが多く、オスは群れの防衛が中心とされてきました。ただし近年はオスも待ち伏せ等で狩りをすることが確認されています。"
    ],
    "hint": "ライオンの社会構造と役割分担を考えます。",
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
    "text": "『ボーリングのスコアでストライクを取った後の次の投球でスペアを取ると何点入るか』という基本ルールで、正しいのは？",
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
      "ストライクを取ったフレームの得点は、10点＋次の2投のピンの合計になります。スペアを取った場合は10点＋次の1投です。これがボーリングの得点計算の基本です。"
    ],
    "hint": "ボーリングの得点の『ボーナス投』ルールです。",
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
  }
]

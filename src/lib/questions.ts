import type { Difficulty } from "../types";

export interface Question {
  id: string;
  category: 'money' | 'math' | 'other';
  difficulty: Difficulty;
  text: string;
  choices?: string[]; // If multiple choice
  answer: string | number;
  explanation?: string;
  type: 'choice' | 'input'; // For now assume multiple choice or simple input
}

export const QUESTIONS: Question[] = [
  // Easy (Money)
  { id: 'q1', category: 'money', difficulty: 'easy', type: 'choice', text: '50円玉はどれ？', choices: ['10円', '50円', '100円'], answer: '50円' },
  { id: 'q2', category: 'money', difficulty: 'easy', type: 'choice', text: '10円が10枚でいくら？', choices: ['50円', '100円', '200円'], answer: '100円' },
  { id: 'q3', category: 'money', difficulty: 'easy', type: 'choice', text: 'おかしが30円。50円出したらおつりは？', choices: ['10円', '20円', '30円'], answer: '20円' },
  { id: 'q3b', category: 'money', difficulty: 'easy', type: 'choice', text: '5 + 5 は？', choices: ['5', '10', '15'], answer: '10' },
  { id: 'q3c', category: 'money', difficulty: 'easy', type: 'choice', text: '100円玉は どんな色？', choices: ['茶色', '銀色', '黄色'], answer: '銀色' },
  { id: 'q3d', category: 'money', difficulty: 'easy', type: 'choice', text: '10円玉 5枚で いくら？', choices: ['15円', '50円', '100円'], answer: '50円' },
  
  // Normal (Math/Money)
  { id: 'q4', category: 'money', difficulty: 'normal', type: 'choice', text: '130円のお茶を買います。100円玉と何を出す？', choices: ['10円×2', '10円×3', '50円'], answer: '10円×3' },
  { id: 'q5', category: 'money', difficulty: 'normal', type: 'choice', text: '100円玉4枚と、10円玉3枚でいくら？', choices: ['430円', '403円', '340円'], answer: '430円' },
  { id: 'q6', category: 'money', difficulty: 'normal', type: 'choice', text: '25 + 34 は？', choices: ['59', '69', '49'], answer: '59' },
  { id: 'q6b', category: 'money', difficulty: 'normal', type: 'choice', text: '50円玉2枚と10円玉5枚。どっちがおおい？', choices: ['おなじ', '50円玉2枚', '10円玉5枚'], answer: '50円玉2枚' },
  { id: 'q6c', category: 'math', difficulty: 'normal', type: 'choice', text: '1時間は 何分？', choices: ['30分', '60分', '100分'], answer: '60分' },
  { id: 'q6d', category: 'math', difficulty: 'normal', type: 'choice', text: '九九の 3×4 は？', choices: ['7', '12', '15'], answer: '12' },
  { id: 'q6e', category: 'money', difficulty: 'normal', type: 'choice', text: '200円もっています。80円つかうと のこりは？', choices: ['100円', '120円', '180円'], answer: '120円' },

  // Hard (Calculation)
  { id: 'q7', category: 'money', difficulty: 'hard', type: 'choice', text: '500円玉で230円のジュースを買いました。おつりは？', choices: ['170円', '270円', '370円'], answer: '270円' },
  { id: 'q8', category: 'money', difficulty: 'hard', type: 'choice', text: '1000円札を出しました。650円の本を買います。おつりは？', choices: ['350円', '450円', '250円'], answer: '350円' },
  { id: 'q9', category: 'money', difficulty: 'hard', type: 'choice', text: '8×7 は？', choices: ['54', '56', '63'], answer: '56' },
  { id: 'q10', category: 'money', difficulty: 'hard', type: 'choice', text: '1000円 - 460円 = ?', choices: ['640円', '540円', '440円'], answer: '540円' },
  { id: 'q11', category: 'money', difficulty: 'hard', type: 'choice', text: '120円のパンを3つかいます。500円だしたらおつりは？', choices: ['140円', '240円', '40円'], answer: '140円' },
  { id: 'q12', category: 'math', difficulty: 'hard', type: 'choice', text: '35分 + 40分 は 何時間何分？', choices: ['1時間5分', '1時間15分', '75分'], answer: '1時間15分' },
  { id: 'q13', category: 'math', difficulty: 'hard', type: 'choice', text: '2000 - 125 = ?', choices: ['1875', '1975', '1775'], answer: '1875' },
  { id: 'q14', category: 'money', difficulty: 'hard', type: 'choice', text: '50円玉が 20枚あります。全部でいくら？', choices: ['200円', '1000円', '500円'], answer: '1000円' },
  { id: 'q15', category: 'math', difficulty: 'hard', type: 'choice', text: '九九の 7×8 は？', choices: ['48', '54', '56'], answer: '56' },
];

export const getQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const filtered = QUESTIONS.filter(q => q.difficulty === difficulty);
  // Shuffle and slice
  return filtered.sort(() => Math.random() - 0.5).slice(0, count);
};

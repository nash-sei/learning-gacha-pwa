import { useState } from 'react';
import type { Difficulty } from '../../types';
import { getQuestions, type Question } from '../../lib/questions';
import { LucideCheckCircle, LucideXCircle, LucideArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext'; // Import context

interface QuizProps {
  onComplete: (success: boolean, diff: Difficulty) => void;
  onBack: () => void;
  mode?: 'normal' | 'extra';
  initialDifficulty?: Difficulty;
}

export const Quiz = ({ onComplete, onBack, mode = 'normal', initialDifficulty }: QuizProps) => {
  const { user, updateUser, customQuestions } = useGame(); // Get user and updater
  const [phase, setPhase] = useState<'difficulty' | 'playing' | 'result'>('difficulty');
  // If extra mode, skip difficulty selection
  if (mode === 'extra' && phase === 'difficulty') {
      // Auto start with provided difficulty or hard
      const targetDiff = initialDifficulty || 'hard';
      setTimeout(() => startQuiz(targetDiff), 0);
  }

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ isCorrect: boolean; q: Question }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startQuiz = (diff: Difficulty) => {
    // Extra Stage = 1 Question (Boss)
    const count = mode === 'extra' ? 1 : (diff === 'easy' ? 3 : diff === 'normal' ? 4 : 5);
    
    // Use smart question selection based on user's clear counts
    const qs = getQuestions(diff, count, customQuestions, user?.questionClearCounts || {}); 
    setDifficulty(diff);
    setQuestions(qs);
    setPhase('playing');
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    // Tiny delay for animation
    setTimeout(() => {
        const currentQ = questions[currentIndex];
        const isCorrect = choice === currentQ.answer; 
        const newResults = [...results, { isCorrect, q: currentQ }];
        setResults(newResults);

        // Update clear count if correct
        if (isCorrect && user) {
            const newCounts = { ...(user.questionClearCounts || {}) };
            newCounts[currentQ.id] = (newCounts[currentQ.id] || 0) + 1;
            updateUser({ ...user, questionClearCounts: newCounts });
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
        } else {
            setPhase('result');
        }
    }, 500);
  };
  
  // Difficulty Selection Screen
  if (phase === 'difficulty') {
      return (
          <div className="full-screen" style={{ padding: '2rem', justifyContent: 'center', gap: '2rem' }}>
              <h2 className="text-gradient" style={{ textAlign: 'center', fontSize: '2rem' }}>むずかしさをえらんでね</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <DifficultyCard diff="easy" label="かんたん (3もん)" color="var(--color-success)" onClick={() => startQuiz('easy')} />
                  <DifficultyCard diff="normal" label="ふつう (4もん)" color="var(--color-primary)" onClick={() => startQuiz('normal')} />
                  <DifficultyCard diff="hard" label="むずかしい (5もん)" color="var(--color-danger)" onClick={() => startQuiz('hard')} />
              </div>
              <button onClick={onBack} style={{ marginTop: '2rem', color: 'var(--color-text-sub)', textAlign: 'center' }}>もどる</button>
          </div>
      );
  }

  // Result Screen
  if (phase === 'result') {
      const correctCount = results.filter(r => r.isCorrect).length;
      const allCorrect = correctCount === questions.length;
      
      const handleRetry = () => {
          // Filter incorrect questions
          const incorrectQs = results.filter(r => !r.isCorrect).map(r => r.q);
          setQuestions(incorrectQs);
          setPhase('playing');
          setCurrentIndex(0);
          setResults([]);
          setSelectedAnswer(null);
      };

      return (
          <div className="full-screen center-content" style={{ padding: '2rem' }}>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                      {allCorrect ? 'ぜんもんせいかい！' : 'おしい！'}
                  </h2>
                  <p style={{ marginBottom: '1rem', color: 'var(--color-text-sub)' }}>
                      {allCorrect ? 'すごい！かんぺきだね！' : `${questions.length - correctCount}もん まちがえちゃった...`}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                      {results.map((r, i) => (
                          <div key={i} style={{ color: r.isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                              {r.isCorrect ? <LucideCheckCircle /> : <LucideXCircle />}
                          </div>
                      ))}
                  </div>
                  
                  {allCorrect ? (
                      <button 
                        onClick={() => onComplete(true, difficulty)}
                        style={{ 
                            width: '100%', 
                            padding: '1rem', 
                            background: 'var(--color-secondary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                      >
                          ガチャへGO！
                      </button>
                  ) : (
                      <button 
                        onClick={handleRetry}
                        style={{ 
                            width: '100%', 
                            padding: '1rem', 
                            background: 'var(--color-danger)', // Red for retry
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                      >
                          まちがえたもんだいを<br/>やりなおす
                      </button>
                  )}
              </div>
          </div>
      );
  }

  // Playing Screen
  const currentQ = questions[currentIndex];
  
  // Safety check: if questions array is empty or currentQ is undefined, show error
  if (!currentQ) {
      return (
          <div className="full-screen center-content" style={{ padding: '2rem' }}>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>エラーが発生しました</h2>
                  <p style={{ margin: '1rem 0', color: 'var(--color-text-sub)' }}>問題の読み込みに失敗しました</p>
                  <button onClick={onBack} style={{ padding: '1rem 2rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                      ホームに戻る
                  </button>
              </div>
          </div>
      );
  }
  
  return (
      <div className="full-screen" style={{ padding: '1rem', paddingTop: '2rem' }}>
          {/* Header with Back Button and Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
              <button 
                  onClick={onBack}
                  style={{ 
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-main)',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                  }}
              >
                  ← もどる
              </button>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-text-sub)' }}>
                      {currentIndex + 1} / {questions.length}
                  </span>
                  <span className={`badge ${difficulty}`}>{difficulty.toUpperCase()}</span>
              </div>
          </div>

          {/* Question */}
          <div className="glass-panel" style={{ padding: '2rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', textAlign: 'center', lineHeight: '1.4' }}>
                  {currentQ.text}
              </h2>
          </div>

          {/* Choices */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <AnimatePresence>
              {currentQ.choices?.map((choice) => (
                  <motion.button
                    key={choice}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => !selectedAnswer && handleAnswer(choice)}
                    style={{
                        padding: '1.5rem',
                        background: selectedAnswer === choice 
                            ? (choice === currentQ.answer ? 'var(--color-success)' : 'var(--color-danger)')
                            : 'white',
                        color: selectedAnswer === choice ? 'white' : 'var(--color-text-main)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1.2rem',
                        boxShadow: 'var(--shadow-sm)',
                        textAlign: 'center',
                        border: '2px solid transparent',
                        borderColor: selectedAnswer === choice ? 'transparent' : 'var(--color-primary-light)'
                    }}
                  >
                      {choice}
                  </motion.button>
              ))}
              </AnimatePresence>
          </div>
      </div>
  );
};

// Helper Component
const DifficultyCard = ({ label, color, onClick }: any) => (
    <button 
        onClick={onClick}
        className="glass-panel"
        style={{ 
            padding: '1.5rem', 
            borderLeft: `6px solid ${color}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            textAlign: 'left'
        }}
    >
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{label}</span>
        <LucideArrowRight color={color} />
    </button>
);

import { useState, useMemo, useRef, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import { LucideArrowLeft, LucideCoins, LucideSparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CoinTreeProps {
  onBack: () => void;
}

const playSound = (type: 'harvest' | 'button') => {
  console.log(`Playing sound: ${type}`);
};

export const CoinTree = ({ onBack }: CoinTreeProps) => {
  const { user, updateUser } = useGame();
  const [harvestingIds, setHarvestingIds] = useState<number[]>([]);
  const [harvestedFruitIds, setHarvestedFruitIds] = useState<number[]>([]); // Permanently track harvested fruits
  
  // Stable fruit count at mount time - prevents slice shifting during harvest
  const [stableFruitCount, setStableFruitCount] = useState(() => Math.floor((user?.treeCoins || 0) / 10));
  const prevTreeCoinsRef = useRef(user?.treeCoins || 0);
  
  // Update stable count only when new coins are ADDED (not when harvesting)
  useEffect(() => {
    const currentTreeCoins = user?.treeCoins || 0;
    if (currentTreeCoins > prevTreeCoinsRef.current) {
      // New coins added - reset harvested list and update stable count
      setHarvestedFruitIds([]);
      setStableFruitCount(Math.floor(currentTreeCoins / 10));
    }
    prevTreeCoinsRef.current = currentTreeCoins;
  }, [user?.treeCoins]);
  
  // Canopy centers for elliptical leaf clusters
  const canopyClusters = [
    { x: 0, y: -450, rx: 120, ry: 100, rotate: 0 },    // Top large
    { x: -130, y: -380, rx: 100, ry: 80, rotate: -30 }, // Left upper
    { x: 130, y: -380, rx: 100, ry: 80, rotate: 30 },  // Right upper
    { x: -180, y: -280, rx: 90, ry: 70, rotate: -45 }, // Left lower
    { x: 180, y: -280, rx: 90, ry: 70, rotate: 45 },  // Right lower
    { x: 0, y: -320, rx: 110, ry: 90, rotate: 0 },    // Center mid
  ];

  const fruits = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const cluster = canopyClusters[i % canopyClusters.length];
      // Random position within elliptical cluster
      const angle = Math.random() * Math.PI * 2;
      const d = Math.random() * 0.8;
      return {
        id: i,
        // Ellipse coordinate calculation
        x: cluster.x + Math.cos(angle) * cluster.rx * d,
        y: cluster.y + Math.sin(angle) * cluster.ry * d,
      };
    });
  }, []);

  // Filter out both currently animating AND permanently harvested fruits
  const visibleFruits = fruits
    .slice(0, stableFruitCount)
    .filter(f => !harvestingIds.includes(f.id) && !harvestedFruitIds.includes(f.id));

  const handleHarvestFruit = (fruitId: number) => {
    if (harvestingIds.includes(fruitId) || harvestedFruitIds.includes(fruitId)) return;
    playSound('harvest');
    setHarvestingIds(prev => [...prev, fruitId]);
    setTimeout(() => {
      if (user) {
        const newTreeCoins = Math.max(0, (user.treeCoins || 0) - 10);
        const newTotalHarvested = (user.monthlyHarvestedCoins || 0) + 10;
        updateUser({ 
          ...user, 
          treeCoins: newTreeCoins,
          monthlyHarvestedCoins: newTotalHarvested 
        });
        // Remove from animating, add to permanently harvested
        setHarvestingIds(prev => prev.filter(id => id !== fruitId));
        setHarvestedFruitIds(prev => [...prev, fruitId]);
      }
    }, 800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
        userSelect: 'none',
        background: '#e0f2fe'
      }}
    >
      {/* Sky Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #0284c7 0%, #38bdf8 60%, #bae6fd 90%, #e0f2fe 100%)', // Slightly deeper blue at top
          zIndex: 0,
        }}
      />

      {/* Sun (Restored Small Sun) */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '60px',
          height: '60px',
          background: '#facc15', // Yellow-400
          borderRadius: '50%',
          boxShadow: '0 0 40px 10px rgba(250, 204, 21, 0.6)', // Glow
          zIndex: 1,
        }}
      />

      {/* Clouds (Moving) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`cloud-${i}`}
            style={{ 
              position: 'absolute', 
              top: `${15 + i * 20}%`,
              opacity: 0.7 
            }}
            initial={{ x: -200 }}
            animate={{ x: window.innerWidth + 200 }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              delay: i * 5,
              ease: "linear",
            }}
          >
             <svg width="120" height="50" viewBox="0 0 120 50">
               <path d="M20,40 Q10,40 5,30 Q0,10 30,15 Q40,5 60,10 Q80,0 100,10 Q115,20 110,40 L20,40 Z" fill="white" />
             </svg>
          </motion.div>
        ))}
      </div>

      {/* Ground - Hills layer */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          zIndex: 5,
        }}
      >
        <div 
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '120%',
            height: '100%',
            background: '#15803d',
            borderRadius: '50% 50% 0 0',
            transform: 'scaleY(0.4)',
            transformOrigin: 'bottom',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-20%',
            width: '140%',
            height: '100%',
            background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
            borderRadius: '50% 50% 0 0',
            transform: 'scaleY(0.35)',
            transformOrigin: 'bottom',
            boxShadow: '0 -10px 20px rgba(0,0,0,0.1) inset'
          }}
        />
      </div>

      {/* Header UI */}
      <header 
        style={{
          position: 'relative',
          zIndex: 50,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button 
          onClick={() => { playSound('button'); onBack(); }}
          style={{
            width: '44px',
            height: '44px',
            background: 'white',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
          }}
        >
          <LucideArrowLeft size={24} />
        </button>
        
        {/* Monthly Stat Badge */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '2px solid #eab308',
              color: '#854d0e',
              fontWeight: '800',
              fontSize: '0.9rem'
            }}
          >
            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>今月のしゅうかく:</span>
            <span>{user?.monthlyHarvestedCoins || 0}</span>
          </div>
          
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '6px 16px',
              borderRadius: '9999px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '2px solid #eab308',
              color: '#854d0e',
              fontWeight: '800',
            }}
          >
            <div style={{ background: '#facc15', borderRadius: '50%', padding: '4px', display: 'flex' }}>
              <LucideCoins size={16} color="#854d0e" />
            </div>
            <span style={{ fontSize: '1.2rem' }}>{user?.treeCoins || 0}</span>
          </div>
        </div>
      </header>

      {/* Main Content - Tree Area */}
      <main 
        style={{
          position: 'absolute',
          bottom: 0, // Adjusted for new ground height
          left: 0,
          right: 0,
          top: 0, // Fill vertical
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: '100%', maxWidth: '500px', height: '100%', position: 'relative', pointerEvents: 'auto' }}>
          <svg viewBox="0 0 500 800" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <radialGradient id="goldLeafGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#a16207" />
              </radialGradient>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3f1d0b" />
                <stop offset="30%" stopColor="#5d2e14" />
                <stop offset="50%" stopColor="#7c3a1b" />
                <stop offset="80%" stopColor="#5d2e14" />
                <stop offset="100%" stopColor="#3f1d0b" />
              </linearGradient>
              
              {/* Detailed bark texture pattern */}
              <pattern id="barkTexture" x="0" y="0" width="40" height="100" patternUnits="userSpaceOnUse">
                <path d="M10,0 Q15,50 10,100 M30,0 Q25,50 30,100" stroke="#4a220e" strokeWidth="1" fill="none" opacity="0.3" />
              </pattern>
            </defs>

            {/* Tree Group centered at bottom */}
            <g transform="translate(250, 800)">
              {/* Gnarled Trunk with wide roots */}
              <path 
                d="
                  M-40,0 
                  Q-60,-5 -90,20 
                  L-130,-10 
                  Q-90,-20 -70,-80 
                  Q-50,-150 -60,-250 
                  Q-80,-350 -120,-420 
                  L-80,-450 
                  Q-40,-400 0,-360 
                  Q40,-400 80,-450 
                  L120,-420 
                  Q80,-350 60,-250 
                  Q50,-150 70,-80 
                  Q90,-20 130,-10 
                  L90,20 
                  Q60,-5 40,0 
                  Z
                " 
                fill="url(#trunkGradient)"
              />
              <path d="M-40,0 Q-60,-5 -90,20 L-130,-10 Q-90,-20 -70,-80 Q-50,-150 -60,-250 Q-80,-350 -120,-420" fill="url(#barkTexture)" />

              {/* Bark Details */}
              <path d="M-50,-50 Q-40,-150 -45,-250" stroke="#351405" strokeWidth="5" fill="none" opacity="0.4" />
              <path d="M50,-50 Q40,-150 45,-250" stroke="#351405" strokeWidth="5" fill="none" opacity="0.4" />
              
              {/* Swaying Canopy Group */}
              <motion.g
                animate={{ rotate: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px -300px" }}
              >
                {/* Elliptical Leaf Clusters */}
                {canopyClusters.map((cluster, idx) => (
                  <ellipse
                    key={`leaf-cluster-${idx}`}
                    cx={cluster.x}
                    cy={cluster.y}
                    rx={cluster.rx}
                    ry={cluster.ry}
                    fill="url(#goldLeafGradient)"
                    transform={`rotate(${cluster.rotate}, ${cluster.x}, ${cluster.y})`}
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                  />
                ))}
                
                {/* Coin Fruits - Larger with big Y */}
                <AnimatePresence>
                  {visibleFruits.map((fruit) => (
                    <motion.g
                      key={`fruit-${fruit.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, x: fruit.x, y: fruit.y }}
                      exit={{ y: 800, opacity: 0, rotate: 180, transition: { duration: 1, ease: "easeIn" } }}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHarvestFruit(fruit.id);
                      }}
                       whileHover={{ scale: 1.25 }}
                       whileTap={{ scale: 0.9 }}
                    >
                      {/* Fruit Graphic */}
                      <circle r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
                      <circle r="11" fill="transparent" stroke="#fde047" strokeWidth="1" strokeDasharray="3 2" />
                      <text 
                        x="0" 
                        y="6" 
                        textAnchor="middle" 
                        fontSize="16" 
                        fontWeight="900" 
                        fill="#b45309" 
                        style={{ pointerEvents: 'none', filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.5))' }}
                      >
                        ¥
                      </text>
                      
                      {/* Shine Effect */}
                      <motion.circle 
                        r="4" 
                        cx="-5" 
                        cy="-5" 
                        fill="white" 
                        opacity="0.6"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.g>
                  ))}
                </AnimatePresence>
              </motion.g>
            </g>
          </svg>
        </div>
      </main>

      {/* Footer / Instructions */}
      <footer 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          zIndex: 50,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div 
          style={{ 
            display: 'inline-block',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(4px)',
            padding: '12px 24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            pointerEvents: 'auto',
          }}
        >
          {visibleFruits.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LucideSparkles style={{ color: '#eab308' }} size={24} />
              <div style={{ textAlign: 'left' }}>
                 <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', fontWeight: 'bold' }}>収穫チャンス！</p>
                 <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b', fontWeight: 'bold' }}>
                   あと <span style={{ color: '#ca8a04', fontSize: '1.4rem' }}>{visibleFruits.length}</span> 個の実があるよ
                 </p>
              </div>
            </motion.div>
          ) : (
            <p style={{ color: '#475569', fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>
              クイズに答えて<br/>黄金の木を育てよう！
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

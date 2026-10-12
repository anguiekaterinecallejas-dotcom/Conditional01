import React from 'react';
import { motion, TargetAndTransition } from 'motion/react';
import { MascotType, MascotEmotion } from '../types';

interface MascotProps {
  type: MascotType;
  emotion?: MascotEmotion;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  type,
  emotion = 'idle',
  size = 'md',
  bubbleText,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const getAnimation = (): TargetAndTransition => {
    switch (emotion) {
      case 'cheering':
        return {
          y: [0, -14, 0, -10, 0],
          rotate: [0, -5, 5, -3, 0],
          scale: [1, 1.08, 1, 1.05, 1],
          transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1 },
        };
      case 'happy':
        return {
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 },
        };
      case 'thinking':
        return {
          rotate: [-3, 3, -3],
          y: [0, -2, 0],
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const },
        };
      case 'encouraging':
        return {
          scale: [1, 1.03, 1],
          transition: { duration: 1.2, repeat: Infinity },
        };
      case 'idle':
      default:
        return {
          y: [0, -4, 0],
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
        };
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble (if provided) */}
      {bubbleText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5 }}
          className="relative mb-3 max-w-xs md:max-w-sm px-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm text-slate-800 text-center font-medium z-10"
        >
          {bubbleText}
          {/* Speech bubble pointer arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45 transform" />
        </motion.div>
      )}

      {/* Mascot Character Animation Container */}
      <motion.div
        animate={getAnimation()}
        className={`relative ${sizeMap[size]} flex items-center justify-center`}
      >
        {type === 'owl' && <OwlSVG emotion={emotion} />}
        {type === 'panda' && <PandaSVG emotion={emotion} />}
        {type === 'lion' && <LionSVG emotion={emotion} />}
        {type === 'fox' && <FoxSVG emotion={emotion} />}
        {type === 'turtle' && <TurtleSVG emotion={emotion} />}
      </motion.div>
    </div>
  );
};

// ==========================================
// SVG MASCOT CHARACTERS
// ==========================================

const OwlSVG: React.FC<{ emotion: MascotEmotion }> = ({ emotion }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="60" cy="68" rx="42" ry="44" fill="#6366F1" />
    <ellipse cx="60" cy="74" rx="30" ry="32" fill="#EEF2FF" />
    {/* Feather Chest Patterns */}
    <path d="M52 64C56 68 64 68 68 64" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 76C54 80 66 80 72 76" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 88C57 91 63 91 66 88" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Wings */}
    <motion.path
      d="M20 62C16 75 22 90 32 94C28 85 28 72 32 60C26 60 22 61 20 62Z"
      fill="#4F46E5"
      animate={emotion === 'cheering' ? { rotate: [-10, 15, -10], originX: '32px', originY: '60px' } : {}}
      transition={{ repeat: Infinity, duration: 0.4 }}
    />
    <motion.path
      d="M100 62C104 75 98 90 88 94C92 85 92 72 88 60C94 60 98 61 100 62Z"
      fill="#4F46E5"
      animate={emotion === 'cheering' ? { rotate: [10, -15, 10], originX: '88px', originY: '60px' } : {}}
      transition={{ repeat: Infinity, duration: 0.4 }}
    />
    {/* Big Expressive Owl Eyes */}
    <circle cx="44" cy="50" r="17" fill="#FFFFFF" stroke="#4338CA" strokeWidth="2" />
    <circle cx="76" cy="50" r="17" fill="#FFFFFF" stroke="#4338CA" strokeWidth="2" />
    {/* Pupils */}
    <circle cx={emotion === 'thinking' ? 47 : 44} cy={emotion === 'thinking' ? 47 : 50} r="8" fill="#1E1B4B" />
    <circle cx={emotion === 'thinking' ? 79 : 76} cy={emotion === 'thinking' ? 47 : 50} r="8" fill="#1E1B4B" />
    {/* Eye Sparkles */}
    <circle cx={emotion === 'thinking' ? 49 : 46} cy="48" r="2.5" fill="#FFFFFF" />
    <circle cx={emotion === 'thinking' ? 81 : 78} cy="48" r="2.5" fill="#FFFFFF" />
    {/* Golden Glasses */}
    <circle cx="44" cy="50" r="17" stroke="#F59E0B" strokeWidth="3" fill="none" />
    <circle cx="76" cy="50" r="17" stroke="#F59E0B" strokeWidth="3" fill="none" />
    <line x1="61" y1="50" x2="59" y2="50" stroke="#F59E0B" strokeWidth="3.5" />
    {/* Beak */}
    <polygon points="60,54 54,63 66,63" fill="#F97316" />
    {/* Graduation Cap (Scholar Professor Hoot) */}
    <path d="M60 12L24 24L60 36L96 24L60 12Z" fill="#1E1B4B" />
    <rect x="45" y="27" width="30" height="9" rx="3" fill="#312E81" />
    <line x1="60" y1="24" x2="88" y2="34" stroke="#F59E0B" strokeWidth="2.5" />
    <circle cx="88" cy="36" r="3.5" fill="#F59E0B" />
    {/* Feet */}
    <circle cx="48" cy="110" r="4.5" fill="#F97316" />
    <circle cx="54" cy="111" r="4.5" fill="#F97316" />
    <circle cx="66" cy="111" r="4.5" fill="#F97316" />
    <circle cx="72" cy="110" r="4.5" fill="#F97316" />
  </svg>
);

const PandaSVG: React.FC<{ emotion: MascotEmotion }> = ({ emotion }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Panda Ears */}
    <circle cx="32" cy="30" r="14" fill="#0F172A" />
    <circle cx="88" cy="30" r="14" fill="#0F172A" />
    <circle cx="32" cy="30" r="7" fill="#334155" />
    <circle cx="88" cy="30" r="7" fill="#334155" />
    {/* Body */}
    <ellipse cx="60" cy="80" rx="40" ry="32" fill="#0F172A" />
    <ellipse cx="60" cy="84" rx="26" ry="24" fill="#FFFFFF" />
    {/* Head */}
    <ellipse cx="60" cy="56" rx="38" ry="32" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    {/* Black Eye Patches */}
    <ellipse cx="44" cy="54" rx="12" ry="14" fill="#0F172A" transform="rotate(-15 44 54)" />
    <ellipse cx="76" cy="54" rx="12" ry="14" fill="#0F172A" transform="rotate(15 76 54)" />
    {/* Eyes */}
    <circle cx="44" cy="52" r="5" fill="#FFFFFF" />
    <circle cx="76" cy="52" r="5" fill="#FFFFFF" />
    <circle cx={emotion === 'thinking' ? 46 : 44} cy="52" r="3" fill="#0284C7" />
    <circle cx={emotion === 'thinking' ? 78 : 76} cy="52" r="3" fill="#0284C7" />
    <circle cx={emotion === 'thinking' ? 47 : 45} cy="50.5" r="1.2" fill="#FFFFFF" />
    <circle cx={emotion === 'thinking' ? 79 : 77} cy="50.5" r="1.2" fill="#FFFFFF" />
    {/* Blush */}
    <circle cx="34" cy="64" r="5.5" fill="#FDA4AF" opacity="0.6" />
    <circle cx="86" cy="64" r="5.5" fill="#FDA4AF" opacity="0.6" />
    {/* Nose & Mouth */}
    <ellipse cx="60" cy="62" rx="4" ry="3" fill="#0F172A" />
    <path d="M56 67C58 70 62 70 64 67" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    {/* Bamboo Leaf decoration */}
    <path d="M84 28C92 24 98 28 96 36C90 34 86 32 84 28Z" fill="#10B981" />
    <path d="M90 32C98 32 102 38 98 44C94 40 92 36 90 32Z" fill="#059669" />
  </svg>
);

const LionSVG: React.FC<{ emotion: MascotEmotion }> = ({ emotion }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lion Fluffy Mane */}
    <circle cx="60" cy="58" r="46" fill="#F59E0B" />
    <circle cx="32" cy="38" r="14" fill="#D97706" />
    <circle cx="88" cy="38" r="14" fill="#D97706" />
    <circle cx="24" cy="60" r="14" fill="#D97706" />
    <circle cx="96" cy="60" r="14" fill="#D97706" />
    <circle cx="32" cy="80" r="14" fill="#D97706" />
    <circle cx="88" cy="80" r="14" fill="#D97706" />
    {/* Body */}
    <ellipse cx="60" cy="90" rx="34" ry="24" fill="#FBBF24" />
    <ellipse cx="60" cy="94" rx="20" ry="16" fill="#FEF3C7" />
    {/* Head */}
    <circle cx="60" cy="58" r="30" fill="#FCD34D" />
    {/* Ears */}
    <circle cx="42" cy="36" r="8" fill="#F59E0B" />
    <circle cx="42" cy="36" r="4.5" fill="#FEF3C7" />
    <circle cx="78" cy="36" r="8" fill="#F59E0B" />
    <circle cx="78" cy="36" r="4.5" fill="#FEF3C7" />
    {/* Eyes */}
    <circle cx="48" cy="54" r="5" fill="#78350F" />
    <circle cx="72" cy="54" r="5" fill="#78350F" />
    <circle cx="49.5" cy="52.5" r="1.8" fill="#FFFFFF" />
    <circle cx="73.5" cy="52.5" r="1.8" fill="#FFFFFF" />
    {/* Snout */}
    <ellipse cx="60" cy="66" rx="10" ry="7" fill="#FEF3C7" />
    <polygon points="60,63 56,66 64,66" fill="#78350F" />
    <path d="M56 70C58 72 62 72 64 70" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    {/* Crown badge */}
    <path d="M50 26L54 32L60 24L66 32L70 26L68 36H52L50 26Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="60" cy="24" r="2" fill="#EF4444" />
  </svg>
);

const FoxSVG: React.FC<{ emotion: MascotEmotion }> = ({ emotion }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Big Fox Ears */}
    <polygon points="34,16 20,44 46,38" fill="#EA580C" />
    <polygon points="32,24 24,42 42,38" fill="#FFFFFF" />
    <polygon points="86,16 100,44 74,38" fill="#EA580C" />
    <polygon points="88,24 96,42 78,38" fill="#FFFFFF" />
    {/* Body */}
    <ellipse cx="60" cy="88" rx="34" ry="24" fill="#EA580C" />
    <ellipse cx="60" cy="92" rx="20" ry="16" fill="#FFFFFF" />
    {/* Head */}
    <ellipse cx="60" cy="58" rx="34" ry="28" fill="#F97316" />
    {/* White Fox Cheeks */}
    <path d="M26 60C36 68 50 72 60 74C70 72 84 68 94 60C92 74 78 84 60 84C42 84 28 74 26 60Z" fill="#FFFFFF" />
    {/* Eyes */}
    <ellipse cx="46" cy="54" rx="4.5" ry="5.5" fill="#1E293B" transform="rotate(-6 46 54)" />
    <ellipse cx="74" cy="54" rx="4.5" ry="5.5" fill="#1E293B" transform="rotate(6 74 54)" />
    <circle cx="47.5" cy="52" r="1.8" fill="#FFFFFF" />
    <circle cx="75.5" cy="52" r="1.8" fill="#FFFFFF" />
    {/* Black Nose */}
    <polygon points="60,70 56,74 64,74" fill="#0F172A" />
    {/* Whiskers */}
    <line x1="30" y1="68" x2="18" y2="66" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="72" x2="20" y2="74" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="90" y1="68" x2="102" y2="66" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="90" y1="72" x2="100" y2="74" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    {/* Detective Magnifying Glass for Riley Fox */}
    <circle cx="86" cy="74" r="9" stroke="#64748B" strokeWidth="2.5" fill="#E0F2FE" fillOpacity="0.4" />
    <line x1="93" y1="80" x2="102" y2="89" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const TurtleSVG: React.FC<{ emotion: MascotEmotion }> = ({ emotion }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Turtle Shell */}
    <ellipse cx="60" cy="68" rx="38" ry="32" fill="#0D9488" stroke="#115E59" strokeWidth="2.5" />
    {/* Hexagon Shell Patterns */}
    <polygon points="60,50 70,58 70,70 60,78 50,70 50,58" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
    <line x1="50" y1="58" x2="36" y2="54" stroke="#0F766E" strokeWidth="2" />
    <line x1="70" y1="58" x2="84" y2="54" stroke="#0F766E" strokeWidth="2" />
    <line x1="50" y1="70" x2="36" y2="76" stroke="#0F766E" strokeWidth="2" />
    <line x1="70" y1="70" x2="84" y2="76" stroke="#0F766E" strokeWidth="2" />
    {/* Flippers */}
    <ellipse cx="30" cy="80" rx="9" ry="6" fill="#2DD4BF" transform="rotate(-30 30 80)" />
    <ellipse cx="90" cy="80" rx="9" ry="6" fill="#2DD4BF" transform="rotate(30 90 80)" />
    <ellipse cx="34" cy="56" rx="10" ry="7" fill="#2DD4BF" transform="rotate(20 34 56)" />
    <ellipse cx="86" cy="56" rx="10" ry="7" fill="#2DD4BF" transform="rotate(-20 86 56)" />
    {/* Turtle Head */}
    <ellipse cx="60" cy="38" rx="18" ry="16" fill="#2DD4BF" stroke="#0F766E" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="52" cy="34" r="4.5" fill="#0F172A" />
    <circle cx="68" cy="34" r="4.5" fill="#0F172A" />
    <circle cx="53.5" cy="32.5" r="1.6" fill="#FFFFFF" />
    <circle cx="69.5" cy="32.5" r="1.6" fill="#FFFFFF" />
    {/* Cheerful Smile */}
    <path d="M56 42C58 45 62 45 64 42" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
    {/* Tiny Scholar Glasses */}
    <circle cx="52" cy="34" r="6" stroke="#F59E0B" strokeWidth="1.8" fill="none" />
    <circle cx="68" cy="34" r="6" stroke="#F59E0B" strokeWidth="1.8" fill="none" />
    <line x1="58" y1="34" x2="62" y2="34" stroke="#F59E0B" strokeWidth="1.8" />
  </svg>
);

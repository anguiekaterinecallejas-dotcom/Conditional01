import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Globe,
  Flame,
  Award
} from 'lucide-react';
import { soundEngine, speakEnglish } from '../utils/audio';
import { Mascot } from './Mascot';

interface Scene {
  id: number;
  timeLabel: string;
  title: string;
  subtitleEn: string;
  subtitleEs: string;
  boardHeading: string;
  formulaHighlight?: {
    condition: string;
    result: string;
  };
  boardBullets: string[];
  mascotType: 'owl' | 'panda' | 'lion' | 'fox';
  mascotEmotion: 'happy' | 'cheering' | 'thinking' | 'encouraging';
}

const VIDEO_SCENES: Scene[] = [
  {
    id: 1,
    timeLabel: '0:00 - 0:18',
    title: '1. Introducción al First Conditional',
    subtitleEn: 'Welcome! Today we learn the First Conditional to talk about real future possibilities.',
    subtitleEs: '¡Bienvenidos! Hoy aprenderemos el First Conditional para hablar sobre posibilidades reales del futuro.',
    boardHeading: 'What is the First Conditional?',
    boardBullets: [
      'Used for REAL & POSSIBLE future events.',
      'Connects an action today with a consequence tomorrow.',
      'Very common in classroom rules & daily planning!'
    ],
    mascotType: 'owl',
    mascotEmotion: 'happy',
  },
  {
    id: 2,
    timeLabel: '0:18 - 0:38',
    title: '2. La Fórmula Mágica (Estructura)',
    subtitleEn: 'The formula: IF plus Present Simple, followed by WILL plus the base verb.',
    subtitleEs: 'La fórmula: IF más Presente Simple, seguido de WILL más el verbo base.',
    boardHeading: 'The Golden Grammar Formula',
    formulaHighlight: {
      condition: 'IF + Present Simple',
      result: 'WILL + Base Verb',
    },
    boardBullets: [
      'Condition (Present): If you practice every day...',
      'Result (Future): ...your English will improve!',
      'Both clauses work together as a cause-and-effect team.'
    ],
    mascotType: 'fox',
    mascotEmotion: 'thinking',
  },
  {
    id: 3,
    timeLabel: '0:38 - 0:58',
    title: '3. Ejemplo Escolar: Estudio y Examen',
    subtitleEn: 'If you study your notes tonight, you will pass tomorrow\'s English quiz!',
    subtitleEs: '¡Si estudias tus apuntes esta noche, pasarás el examen de inglés de mañana!',
    boardHeading: 'Classroom Situation: Tomorrow\'s Exam',
    formulaHighlight: {
      condition: 'If you study tonight (Present Simple)',
      result: 'you will pass tomorrow (Future with WILL)',
    },
    boardBullets: [
      'Tonight = Real action happening now.',
      'Tomorrow = Expected positive result in the future.',
      'Inversion allowed: "You will pass tomorrow if you study tonight!"'
    ],
    mascotType: 'panda',
    mascotEmotion: 'cheering',
  },
  {
    id: 4,
    timeLabel: '0:58 - 1:18',
    title: '4. Oraciones Negativas con "WON\'T"',
    subtitleEn: 'For negative sentences, we use "won\'t", which is the short form of "will not".',
    subtitleEs: 'Para oraciones negativas, usamos "won\'t", que es la forma corta de "will not".',
    boardHeading: 'Negative Consequences: won\'t = will not',
    formulaHighlight: {
      condition: 'If it rains during recess',
      result: 'the coach WON\'T hold outdoor sports',
    },
    boardBullets: [
      'won\'t + verb = will not + verb',
      'If you don\'t sleep well, you won\'t focus in class.',
      'Notice: "don\'t" in the IF-clause, "won\'t" in the result!'
    ],
    mascotType: 'owl',
    mascotEmotion: 'encouraging',
  },
  {
    id: 5,
    timeLabel: '1:18 - 1:40',
    title: '5. ¡La Regla de Oro del Profesor!',
    subtitleEn: 'Top Teacher Rule: NEVER put "will" inside the IF-clause! Now you are ready to play!',
    subtitleEs: '¡Regla de oro del profesor!: NUNCA pongas "will" dentro de la cláusula IF. ¡Ahora estás listo para jugar!',
    boardHeading: 'Golden Teacher Rule: NO "WILL" after IF',
    boardBullets: [
      '❌ INCORRECT: "If it will rain tomorrow..."',
      '✔️ CORRECT: "If it rains tomorrow, we will stay inside."',
      '🎉 You have mastered the First Conditional! Let\'s earn high scores!'
    ],
    mascotType: 'lion',
    mascotEmotion: 'cheering',
  },
];

export const InteractiveVideoPlayer: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [showSpanishSubtitles, setShowSpanishSubtitles] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const scene = VIDEO_SCENES[currentSceneIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play narration when scene changes (if playing)
  useEffect(() => {
    if (isPlaying && !isAudioMuted) {
      speakEnglish(scene.subtitleEn, 0.88);
    }
  }, [currentSceneIndex, isPlaying, isAudioMuted]);

  // Automatic scene timer progression
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const durationPerSceneMs = 8000; // 8 seconds per scene
    const intervalMs = 100;
    const step = (intervalMs / durationPerSceneMs) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next scene
          if (currentSceneIndex < VIDEO_SCENES.length - 1) {
            soundEngine.playPop();
            setCurrentSceneIndex((idx) => idx + 1);
            return 0;
          } else {
            // End of video presentation
            setIsPlaying(false);
            soundEngine.playFanfare();
            return 100;
          }
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIndex]);

  const handleTogglePlay = () => {
    soundEngine.playPop();
    if (!isPlaying) {
      if (progress >= 100 && currentSceneIndex === VIDEO_SCENES.length - 1) {
        // Restart
        setCurrentSceneIndex(0);
        setProgress(0);
      }
      setIsPlaying(true);
      if (!isAudioMuted) {
        speakEnglish(scene.subtitleEn, 0.88);
      }
    } else {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleNextScene = () => {
    soundEngine.playPop();
    if (currentSceneIndex < VIDEO_SCENES.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setProgress(0);
    }
  };

  const handlePrevScene = () => {
    soundEngine.playPop();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleRestart = () => {
    soundEngine.playPop();
    setCurrentSceneIndex(0);
    setProgress(0);
    if (isPlaying && !isAudioMuted) {
      speakEnglish(VIDEO_SCENES[0].subtitleEn, 0.88);
    }
  };

  const handleSpeakCurrentScene = () => {
    soundEngine.playPop();
    speakEnglish(scene.subtitleEn, 0.85);
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 text-white select-none">
      {/* Top Video Player Bar */}
      <div className="bg-slate-950/80 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse inline-block" />
          <span className="font-bold text-slate-200">
            Safari Academy Video Lab: First Conditional
          </span>
          <span className="text-slate-400 hidden sm:inline">
            · Escena {currentSceneIndex + 1} de {VIDEO_SCENES.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSpanishSubtitles(!showSpanishSubtitles)}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
              showSpanishSubtitles
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Subtítulos ES</span>
          </button>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            title={isAudioMuted ? 'Activar audio' : 'Silenciar'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Video Screen: Animated Classroom & Blackboard */}
      <div className="relative min-h-[380px] sm:min-h-[440px] bg-linear-to-b from-slate-950 via-slate-900 to-indigo-950/50 p-4 sm:p-8 flex flex-col justify-between overflow-hidden">
        {/* Animated background particles / math grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Scene Title Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 bg-indigo-500/30 border border-indigo-400/40 rounded-full text-xs font-bold text-indigo-200 uppercase tracking-wider backdrop-blur-xs">
            {scene.title}
          </span>
          <span className="font-mono text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
            {scene.timeLabel}
          </span>
        </div>

        {/* Center Stage: The Interactive Classroom Blackboard */}
        <div className="relative z-10 my-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Animated Mascot Teacher on the Left (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2">
            <Mascot
              type={scene.mascotType}
              emotion={scene.mascotEmotion}
              size="lg"
            />
            <div className="bg-slate-800/80 backdrop-blur-xs px-3 py-1 rounded-xl border border-slate-700 text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Profesor Virtual en Vivo</span>
            </div>
          </div>

          {/* Classroom Chalk Blackboard on the Right (8 cols) */}
          <div className="md:col-span-8 bg-emerald-950/80 border-4 border-amber-900/60 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Blackboard Wooden Texture Header */}
            <div className="border-b border-emerald-800/80 pb-2.5 mb-3 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-amber-200 tracking-wide font-sans">
                {scene.boardHeading}
              </h3>
              <button
                onClick={handleSpeakCurrentScene}
                title="Escuchar explicación en inglés"
                className="p-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px]">Escuchar</span>
              </button>
            </div>

            {/* Formula Highlight Cards if present */}
            {scene.formulaHighlight && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3"
              >
                <div className="p-3 bg-emerald-900/90 border border-emerald-700/80 rounded-xl">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase block">Condición (Presente)</span>
                  <span className="text-sm font-extrabold text-white">{scene.formulaHighlight.condition}</span>
                </div>
                <div className="p-3 bg-indigo-900/90 border border-indigo-700/80 rounded-xl">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase block">Resultado (Futuro)</span>
                  <span className="text-sm font-extrabold text-amber-300">{scene.formulaHighlight.result}</span>
                </div>
              </motion.div>
            )}

            {/* Bullet Points written on the board */}
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/95 font-sans">
              {scene.boardBullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-amber-400 font-bold mt-0.5">✦</span>
                  <span className="leading-snug">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Subtitles (Closed Captions) */}
        <div className="relative z-10 bg-black/70 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 space-y-1 text-center">
          <p className="text-sm sm:text-base font-bold text-yellow-300 font-sans leading-snug">
            &quot;{scene.subtitleEn}&quot;
          </p>
          {showSpanishSubtitles && (
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug italic">
              {scene.subtitleEs}
            </p>
          )}
        </div>
      </div>

      {/* Video Progress Bar */}
      <div className="w-full bg-slate-800 h-2 cursor-pointer relative" onClick={() => handleTogglePlay()}>
        <div
          className="bg-indigo-500 h-full transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSceneIndex + progress / 100) / VIDEO_SCENES.length) * 100}%`,
          }}
        />
      </div>

      {/* Bottom Video Controls Deck */}
      <div className="bg-slate-950 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevScene}
            disabled={currentSceneIndex === 0}
            className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded-lg cursor-pointer"
            title="Escena anterior"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{progress >= 100 && currentSceneIndex === VIDEO_SCENES.length - 1 ? 'Repetir Video' : 'Reproducir Video'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextScene}
            disabled={currentSceneIndex === VIDEO_SCENES.length - 1}
            className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rounded-lg cursor-pointer"
            title="Siguiente escena"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={handleRestart}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg cursor-pointer ml-1"
            title="Reiniciar desde el inicio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Scene Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {VIDEO_SCENES.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                soundEngine.playPop();
                setCurrentSceneIndex(idx);
                setProgress(0);
                if (!isAudioMuted && isPlaying) {
                  speakEnglish(sc.subtitleEn, 0.88);
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSceneIndex === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Parte {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

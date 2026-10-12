import React, { useState } from 'react';
import { Play, Sparkles, Volume2, CheckCircle2, ChevronDown, ChevronUp, BookOpen, ExternalLink, Video } from 'lucide-react';
import { soundEngine, speakEnglish } from '../utils/audio';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';

interface VideoExplainerProps {
  defaultExpanded?: boolean;
  onContinueToGame?: () => void;
}

export const VideoExplainer: React.FC<VideoExplainerProps> = ({
  defaultExpanded = true,
  onContinueToGame,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [videoMode, setVideoMode] = useState<'animated' | 'youtube' | 'summary'>('animated');

  const keyTimestamps = [
    {
      time: '0:18',
      title: 'Estructura Básica',
      detail: 'If + Present Simple, will + base verb (Ej: If you study, you will pass).',
    },
    {
      time: '0:38',
      title: 'Situaciones Reales',
      detail: 'Predicciones y planes futuros que realmente pueden suceder.',
    },
    {
      time: '0:58',
      title: 'Forma Negativa',
      detail: 'Uso de "won\'t" (will not) en la cláusula de resultado.',
    },
    {
      time: '1:18',
      title: 'Regla del Profesor',
      detail: '¡NUNCA pongas "will" dentro de la cláusula IF!',
    },
  ];

  const handlePronounce = (text: string) => {
    soundEngine.playPop();
    speakEnglish(text);
  };

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-7 shadow-sm overflow-hidden space-y-5">
      {/* Header bar with toggle */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-indigo-600" />
            Video Explicativo de Inicio · First Conditional
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Lección en Video: ¿Cómo usar el First Conditional?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Aprende con animación, pizarra interactiva, voz en inglés y subtítulos en español.
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playPop();
            setIsExpanded(!isExpanded);
          }}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors shrink-0 cursor-pointer"
          title={isExpanded ? 'Ocultar video' : 'Mostrar video'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-5 pt-2">
          {/* Format Selector: Animated Video Player (100% Reliable) vs External YouTube vs Text Summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setVideoMode('animated');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  videoMode === 'animated'
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Video Animado Interactivo (Recomendado)
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setVideoMode('summary');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  videoMode === 'summary'
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Puntos Clave
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setVideoMode('youtube');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  videoMode === 'youtube'
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                YouTube BBC
              </button>
            </div>

            <a
              href="https://www.youtube.com/watch?v=K7s1L49-XoI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold hover:underline"
            >
              <span>Abrir lección en YouTube oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* MODE 1: BULLETPROOF INTERACTIVE ANIMATED VIDEO PLAYER */}
          {videoMode === 'animated' && (
            <div className="space-y-4">
              <InteractiveVideoPlayer />

              {/* Fast Timestamps Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                {keyTimestamps.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600">{item.title}</span>
                      <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 2: YOUTUBE EMBED + DIRECT LINK FALLBACK */}
          {videoMode === 'youtube' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-3">
                <span>
                  <strong>Nota:</strong> Algunos navegadores o redes escolares bloquean los videos insertados de YouTube. Si no reproduce, usa la pestaña <em>&quot;Video Animado Interactivo&quot;</em> o ábrelo directamente en YouTube.
                </span>
                <a
                  href="https://www.youtube.com/watch?v=K7s1L49-XoI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700 whitespace-nowrap shrink-0 flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir YouTube
                </a>
              </div>

              {/* Responsive 16:9 Video Frame with direct fallback */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner border border-slate-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/K7s1L49-XoI?rel=0&modestbranding=1"
                  title="First Conditional and Zero Conditional Video Lesson - BBC Learning English"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* MODE 3: SUMMARY NOTES */}
          {videoMode === 'summary' && (
            <div className="p-5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                  Resumen Pedagógico del Video
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Fórmula Esencial: [IF + Present Simple] ➔ [WILL + Verbo Base]
                </h3>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 block">Ejemplo Afirmativo:</span>
                    <span className="text-sm font-semibold text-slate-900">
                      &quot;If you study tonight, you will pass the quiz.&quot;
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      (Condición: Estudiar esta noche ➔ Resultado: Pasarás la prueba).
                    </span>
                  </div>
                  <button
                    onClick={() => handlePronounce('If you study tonight, you will pass the quiz.')}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg shrink-0 cursor-pointer"
                    title="Escuchar"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-rose-700 block">Ejemplo Negativo (won&apos;t):</span>
                    <span className="text-sm font-semibold text-slate-900">
                      &quot;If it rains during recess, the coach won&apos;t hold sports outside.&quot;
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      (&quot;won&apos;t&quot; es la contracción estándar de &quot;will not&quot;).
                    </span>
                  </div>
                  <button
                    onClick={() => handlePronounce('If it rains during recess, the coach won\'t hold sports outside.')}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg shrink-0 cursor-pointer"
                    title="Escuchar"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-indigo-900 bg-white/70 p-3 rounded-xl border border-indigo-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>¡Regla de oro!:</strong> Nunca pongas <em>&quot;will&quot;</em> inmediatamente después de <em>&quot;if&quot;</em>. Siempre usa presente simple en la cláusula condicional.
                </span>
              </div>
            </div>
          )}

          {/* Action button to continue directly to game */}
          {onContinueToGame && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  onContinueToGame();
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-transform hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>¡Entendido! Comenzar los Desafíos del Safari</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

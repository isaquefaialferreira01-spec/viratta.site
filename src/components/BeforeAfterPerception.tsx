import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { Sparkles, AlertCircle } from 'lucide-react';

export const BeforeAfterPerception: React.FC = () => {
  // Slider position in percentage (0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section 
      data-section-title="Percepção Antes & Depois"
      className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            Transformação Real
          </span>
          <h2 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.05] text-balance">
            O MESMO NEGÓCIO. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#FF5E14]">
              OUTRA PERCEPÇÃO.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-light">
            Arraste o divisor ou toque nos botões para comparar a percepção antes e depois da VIRATTA.
          </p>

          {/* Quick Preset Buttons (44px min touch target on mobile) */}
          <div className="mt-5 sm:mt-6 inline-flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setSliderPos(85)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all active:scale-95 ${
                sliderPos > 70 ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Ver Antes
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(50)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all active:scale-95 ${
                sliderPos >= 40 && sliderPos <= 60 ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              50 / 50
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(15)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all active:scale-95 ${
                sliderPos < 30 ? 'bg-[#FF5E14] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Ver Depois
            </button>
          </div>
        </motion.div>

        {/* Sophisticated Interactive Visual Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 select-none cursor-ew-resize shadow-2xl bg-[#090A0C]"
          style={{ touchAction: 'pan-y' }}
        >
          {/* AFTER SIDE (Full Background Layer: High-End VIRATTA Visual Presence) */}
          <div className="absolute inset-0 w-full h-full bg-[#0E0F12]">
            <img
              src="/src/assets/images/portfolio_gastronomy_1791218028786.jpg"
              alt="Percepção Profissional Viratta"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* After UI Annotations */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end text-right z-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#FF5E14] text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>DEPOIS — COM A VIRATTA</span>
              </div>
              <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-1.5 hidden sm:block">
                <div className="text-white font-extrabold text-xs sm:text-base tracking-tight">Profissional & Elegante</div>
                <div className="text-neutral-300 text-[11px] sm:text-xs font-medium">Reconhecível no Primeiro Olhar</div>
                <div className="text-[#FFA05C] text-[11px] sm:text-xs font-semibold">Consistente em Todos os Canais</div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 max-w-xs sm:max-w-sm text-right z-10 hidden md:block">
              <p className="text-xs sm:text-sm text-white font-medium">
                “O cliente não discute preço. Ele percebe autoridade imediata.”
              </p>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped Mask Layer: Improvised, Dull, Inconsistent) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden bg-[#18181A]"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="relative w-full h-full grayscale brightness-75 contrast-90">
              <img
                src="/src/assets/images/portfolio_gastronomy_1791218028786.jpg"
                alt="Percepção Amadora Anterior"
                className="w-full h-full object-cover filter blur-[2px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#121214]/85" />
            </div>

            {/* Before UI Annotations */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col items-start z-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 text-neutral-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-white/10 backdrop-blur-sm">
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400" />
                <span>ANTES — COMUNICAÇÃO AMADORA</span>
              </div>
              <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-1.5 hidden sm:block">
                <div className="text-neutral-400 font-medium text-xs sm:text-base line-through">Improvisado</div>
                <div className="text-neutral-400 font-medium text-[11px] sm:text-xs line-through">Inconsistente</div>
                <div className="text-neutral-400 font-medium text-[11px] sm:text-xs line-through">Esquecível no Feed</div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 max-w-xs sm:max-w-sm z-10 hidden md:block">
              <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                “Um ótimo produto parecendo uma empresa minúscula e insegura.”
              </p>
            </div>
          </div>

          {/* Interactive Drag Handle Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#070708] border-2 border-white flex items-center justify-center shadow-xl p-1">
              <VirattaSymbol className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        {/* Supporting Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0F12] border border-white/5">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#FF5E14] uppercase tracking-wider font-semibold">
              01 · Presença
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">Acaba o visual caseiro</h4>
            <p className="text-xs text-neutral-400 mt-1.5 sm:mt-2 leading-relaxed font-light">
              Sua marca transmite o mesmo refinamento das grandes empresas da sua cidade.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0F12] border border-white/5">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#FF5E14] uppercase tracking-wider font-semibold">
              02 · Valor
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">O valor vem antes do preço</h4>
            <p className="text-xs text-neutral-400 mt-1.5 sm:mt-2 leading-relaxed font-light">
              Quem vê sua empresa entende imediatamente por que ela vale o que cobra.
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0F12] border border-white/5">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#FF5E14] uppercase tracking-wider font-semibold">
              03 · Memória
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">Você passa a ser lembrado</h4>
            <p className="text-xs text-neutral-400 mt-1.5 sm:mt-2 leading-relaxed font-light">
              Consistência cria familiaridade. Familiaridade gera confiança e decisão.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

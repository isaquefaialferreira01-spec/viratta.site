import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const JOURNEY_STEPS = [
  { name: "DESCOBERTA", subtitle: "Primeiro impacto visual" },
  { name: "PERFIL", subtitle: "Visita ao seu canal" },
  { name: "CONTEÚDO", subtitle: "Consumo do material" },
  { name: "CONFIANÇA", subtitle: "Percepção de autoridade" },
  { name: "INTERESSE", subtitle: "Desejo pelo serviço" },
  { name: "CONTATO", subtitle: "Chamada no WhatsApp" },
  { name: "VENDA", subtitle: "Fechamento sem desconto" },
  { name: "RELACIONAMENTO", subtitle: "Fidelização e indicação" },
];

export const CustomerJourney: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-28 lg:py-36 bg-[#050506] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            A Jornada
          </span>
          <h2 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.05] text-balance">
            “ANTES DA VENDA, <br />
            <span className="text-[#FF5E14]">EXISTE PERCEPÇÃO.”</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-400 font-light">
            Nenhum cliente compra antes de confiar. E a confiança nasce no primeiro olhar.
          </p>
        </motion.div>

        {/* Visual Animated Flow - Desktop Flow */}
        <div className="hidden lg:grid grid-cols-8 gap-2 relative">
          {/* Subtle connecting track line */}
          <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10 -translate-y-1/2 z-0" />

          {JOURNEY_STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            const isPrior = hoveredIdx !== null && idx <= hoveredIdx;

            return (
              <div
                key={step.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Visual Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ${
                    isHovered
                      ? 'bg-[#FF5E14] text-white border-white scale-110 shadow-[0_0_20px_rgba(255,94,20,0.6)]'
                      : isPrior
                      ? 'bg-[#FF5E14]/20 text-[#FF5E14] border-[#FF5E14]/40'
                      : 'bg-[#0E0F12] text-neutral-400 border-white/10 group-hover:border-white/30'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Step Title */}
                <span
                  className={`mt-4 text-xs font-extrabold uppercase tracking-wider transition-colors duration-200 ${
                    isHovered ? 'text-white' : 'text-neutral-300'
                  }`}
                >
                  {step.name}
                </span>

                {/* Micro Subtitle */}
                <span className="mt-1 text-[11px] text-neutral-500 font-light leading-tight">
                  {step.subtitle}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Vertical Flow */}
        <div className="lg:hidden flex flex-col space-y-2.5">
          {JOURNEY_STEPS.map((step, idx) => (
            <div
              key={step.name}
              onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 active:scale-[0.99] ${
                hoveredIdx === idx
                  ? 'bg-[#0E0F12] border-[#FF5E14]/60 shadow-md'
                  : 'bg-[#0E0F12]/80 border-white/5'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`font-mono text-xs font-bold w-6 ${hoveredIdx === idx ? 'text-[#FF5E14]' : 'text-neutral-500'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide">{step.name}</div>
                  <div className="text-[11px] text-neutral-400 font-light">{step.subtitle}</div>
                </div>
              </div>
              {idx < JOURNEY_STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-neutral-600 shrink-0" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

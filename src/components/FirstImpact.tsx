import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { useCms } from '../context/CmsContext';

export const FirstImpact: React.FC = () => {
  const { content } = useCms();
  const copy = content?.copy || ({} as any);

  const kicker = copy.first_impact_kicker || "O Posicionamento";
  const headline = copy.first_impact_headline || "SER PEQUENO NÃO SIGNIFICA PARECER PEQUENO.";
  const subtitle = copy.first_impact_subtitle || "“Uma boa empresa pode perder valor quando sua comunicação não acompanha a qualidade do que ela entrega.”";

  return (
    <section 
      data-section-title="Posicionamento"
      className="relative py-16 sm:py-28 lg:py-32 bg-[#090A0C] border-y border-white/5 overflow-hidden"
    >
      {/* Decorative official symbol silhouette watermark */}
      <div 
        aria-hidden="true"
        className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none hidden md:block"
      >
        <VirattaSymbol size={480} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Index */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-4 sm:mb-6"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            {kicker}
          </span>
        </motion.div>

        {/* Large Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] sm:leading-[1.05] text-balance whitespace-pre-line"
        >
          {headline}
        </motion.h2>

        {/* Short Punchy Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-xl md:text-2xl text-neutral-300 font-light max-w-3xl mx-auto leading-relaxed text-balance px-2"
        >
          {subtitle}
        </motion.p>

        {/* Minimal divider signature */}
        <div className="mt-8 sm:mt-12 flex justify-center items-center gap-3">
          <div className="w-10 sm:w-12 h-px bg-neutral-700" />
          <div className="w-2 h-2 rotate-45 border border-[#FF5E14]" />
          <div className="w-10 sm:w-12 h-px bg-neutral-700" />
        </div>
      </div>
    </section>
  );
};

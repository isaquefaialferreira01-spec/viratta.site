import React from 'react';
import { motion } from 'motion/react';
import { AUDIENCE_CATEGORIES } from '../config/siteConfig';
import { Typewriter } from './ui/typewriter';

export const TargetAudience: React.FC = () => {
  const row1 = [...AUDIENCE_CATEGORIES, ...AUDIENCE_CATEGORIES];
  const row2 = [...AUDIENCE_CATEGORIES.slice().reverse(), ...AUDIENCE_CATEGORIES.slice().reverse()];

  return (
    <section 
      data-section-title="Público-Alvo"
      className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] overflow-hidden border-b border-white/5 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            Para Quem Criamos
          </span>
          <h2 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.05] text-balance">
            FEITO PARA QUEM <br />
            COMEÇOU PEQUENO, <br />
            <span className="text-[#FF5E14]">MAS PENSA GRANDE.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-neutral-400 font-light">
            Comunicação e autoridade de marca para{' '}
            <Typewriter
              words={["restaurantes", "clínicas", "academias", "lojas", "oficinas", "especialistas"]}
              className="text-[#FF5E14] font-semibold"
            />
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full max-w-full overflow-hidden py-2.5 sm:py-3 border-y border-white/5 bg-white/[0.01]">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {row1.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-8">
              <span className="text-xl sm:text-3xl md:text-5xl font-black tracking-tighter text-neutral-300 hover:text-white transition-colors cursor-default select-none">
                {cat}
              </span>
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 border border-[#FF5E14] opacity-80" />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="relative w-full max-w-full overflow-hidden py-2.5 sm:py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="animate-marquee-reverse flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {row2.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-8">
              <span className="text-xl sm:text-3xl md:text-5xl font-black tracking-tighter text-neutral-400 hover:text-[#FF5E14] transition-colors cursor-default select-none">
                {cat}
              </span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

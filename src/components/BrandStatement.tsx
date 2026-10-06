import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { SpotlightGrid } from './ui/spotlight-grid';

export const BrandStatement: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5">
      <SpotlightGrid className="py-20 sm:py-32 lg:py-40 bg-[#050506] min-h-[560px]">
        {/* Background radial atmosphere */}
        <div 
          aria-hidden="true"
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#FF5E14]/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" 
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle official emblem mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <VirattaSymbol className="w-9 h-9 sm:w-11 sm:h-11" glow />
          </motion.div>

          {/* Cinematic Headline */}
          <motion.blockquote
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-[-0.03em] leading-[1.08] sm:leading-[1.04] text-balance"
          >
            NÓS NÃO MUDAMOS <br className="hidden sm:inline" />
            O SEU NEGÓCIO. <br />
            <span className="text-neutral-400">MUDAMOS A FORMA</span> <br className="hidden sm:inline" />
            COMO ELE É{" "}
            <span className="relative inline-block text-[#FF5E14] drop-shadow-[0_0_35px_rgba(255,94,20,0.5)]">
              PERCEBIDO.
            </span>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-10 md:mt-12 text-xs sm:text-base md:text-lg text-neutral-400 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold"
          >
            Estratégia · Posicionamento · Presença Real
          </motion.p>
        </div>
      </SpotlightGrid>
    </section>
  );
};

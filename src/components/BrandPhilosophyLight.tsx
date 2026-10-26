import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';

export const BrandPhilosophyLight: React.FC = () => {
  return (
    <section 
      data-section-title="Filosofia de Marca"
      className="relative py-20 sm:py-36 lg:py-44 bg-[#F5F5F2] text-[#080809] overflow-hidden select-none transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Viratta symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-10"
        >
          <VirattaSymbol className="w-10 h-10 sm:w-12 sm:h-12" glow />
        </motion.div>

        {/* Large Bold Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-[#080809] leading-[1.05] sm:leading-[0.98] text-balance break-words"
        >
          BONS NEGÓCIOS <br />
          NÃO DEVERIAM <br />
          PASSAR DESPERCEBIDOS.
        </motion.h2>

        {/* Quiet Authentic Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 text-sm sm:text-xl font-medium tracking-tight text-neutral-600"
        >
          “É por isso que a VIRATTA existe.”
        </motion.p>
      </div>
    </section>
  );
};

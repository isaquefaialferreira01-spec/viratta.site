import React from 'react';
import { motion } from 'motion/react';
import { STRUCTURAL_NUMBERS } from '../config/siteConfig';
import { NumberTicker } from './ui/number-ticker';

export const StructuralNumbers: React.FC = () => {
  const numberData = [
    { value: 4, prefix: "0", suffix: "" },
    { value: 6, prefix: "0", suffix: "" },
    { value: 1, prefix: "0", suffix: "" },
    { value: 360, prefix: "", suffix: "°" },
  ];

  return (
    <section 
      data-section-title="Estrutura & Métricas"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#070708] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-10 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#FF5E14]">
              Estrutura Criativa
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1.5 sm:mt-2">
              Os Pilares do Sistema
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Comunicação não é improviso aleatório. É arquitetura de percepção pensada de ponta a ponta.
          </p>
        </div>

        {/* Structural Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STRUCTURAL_NUMBERS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 hover:border-[#FF5E14]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Giant Numerical Anchor with NumberTicker */}
              <div>
                <span className="font-mono tabular-nums text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white group-hover:text-[#FF5E14] transition-colors duration-300 leading-none block">
                  <NumberTicker
                    value={numberData[index]?.value ?? 0}
                    prefix={numberData[index]?.prefix ?? ""}
                    suffix={numberData[index]?.suffix ?? ""}
                    durationMs={1600}
                  />
                </span>
                <h3 className="mt-4 sm:mt-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-200 group-hover:text-white transition-colors">
                  {item.label}
                </h3>
              </div>

              {/* Clarifying Detail */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                {item.detail}
              </p>

              {/* Bottom Orange Accent Line */}
              <div className="mt-5 sm:mt-6 w-full h-[2px] bg-white/5 group-hover:bg-[#FF5E14] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

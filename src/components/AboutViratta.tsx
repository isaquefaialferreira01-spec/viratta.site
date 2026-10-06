import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';

const PRINCIPLES = [
  {
    title: "CLAREZA",
    desc: "Antes de criar, entendemos.",
    detail: "Sem diagnóstico não há direção. Toda peça de comunicação precisa ter um objetivo comercial evidente.",
  },
  {
    title: "IDENTIDADE",
    desc: "Sua comunicação precisa ter personalidade.",
    detail: "Negócio local não precisa copiar templates da internet. Você precisa de um tom e estética próprios.",
  },
  {
    title: "CONSISTÊNCIA",
    desc: "Marca forte não acontece em um único post.",
    detail: "A autoridade se fixa pela repetição do mesmo padrão de excelência visual semana após semana.",
  },
];

export const AboutViratta: React.FC = () => {
  return (
    <section id="sobre" className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Compact Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <VirattaSymbol className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
              A Viratta
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            VIRATTA
          </h2>

          <p className="mt-3 sm:mt-4 text-lg sm:text-2xl md:text-3xl text-neutral-300 font-light leading-snug">
            “Estratégia, criatividade e comunicação para negócios que querem crescer sem parecer amadores.”
          </p>
        </motion.div>

        {/* Three Short Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {PRINCIPLES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl bg-[#0E0F12] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#FF5E14]">
                  0{idx + 1} · PRINCÍPIO
                </span>
                <h3 className="mt-2.5 sm:mt-3 text-xl sm:text-2xl font-black text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-neutral-200 font-medium">
                  {item.desc}
                </p>
              </div>
              <p className="mt-4 sm:mt-6 text-xs text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-3 sm:pt-4">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

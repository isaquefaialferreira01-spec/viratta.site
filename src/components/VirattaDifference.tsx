import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { ArrowRight } from 'lucide-react';

const CONCEPTS = [
  {
    title: "MARCA",
    desc: "A essência e o padrão visual que transmitem solidez.",
  },
  {
    title: "CONTEÚDO",
    desc: "A mensagem intencional que retém atenção e gera autoridade.",
  },
  {
    title: "PRESENÇA",
    desc: "A consistência nos pontos de contato que cria memória.",
  },
  {
    title: "CONVERSÃO",
    desc: "A decisão natural do cliente de comprar com você.",
  },
];

export const VirattaDifference: React.FC = () => {
  return (
    <section 
      data-section-title="Diferenciais"
      className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-20"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            O Diferencial
          </span>
          <h2 className="mt-2 sm:mt-3 text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] sm:leading-[0.98] text-balance">
            NÃO SOMOS <br />
            UMA FÁBRICA <br />
            <span className="text-neutral-400">DE POSTS.</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-xl sm:text-3xl text-[#FF5E14] font-medium tracking-tight">
            “Construímos percepção.”
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Postar todo dia sem critério só cansa sua equipe. Nós alinhamos os quatro vértices da comunicação profissional.
          </p>
        </motion.div>

        {/* 4 Connected Concepts System */}
        <div className="relative">
          {/* Subtle connecting horizontal pipeline (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#FF5E14]/40 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {CONCEPTS.map((concept, idx) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 sm:p-8 rounded-2xl bg-[#0E0F12] border border-white/10 hover:border-[#FF5E14]/60 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="font-mono text-xs font-bold text-[#FF5E14]">
                      0{idx + 1}
                    </span>
                    <VirattaSymbol className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#FF5E14] transition-colors">
                    {concept.title}
                  </h3>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {concept.desc}
                  </p>
                </div>

                {/* Direct connection tag */}
                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 group-hover:text-[#FF5E14] transition-colors">
                  <span className="text-[10px] uppercase font-mono tracking-widest">Conexão Ativa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

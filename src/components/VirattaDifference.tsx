import React from 'react';
import { motion } from 'motion/react';
import { CardFanGallery, FanCard } from './ui/card-fan-gallery';
import marcaImg from '../assets/images/fan_card_marca_1793064994997.jpg';
import conteudoImg from '../assets/images/fan_card_conteudo_1793065007275.jpg';
import presencaImg from '../assets/images/fan_card_presenca_1793065021903.jpg';
import conversaoImg from '../assets/images/fan_card_conversao_1793065038282.jpg';

const FAN_CARDS: FanCard[] = [
  {
    title: "01 — MARCA",
    caption: "A essência e o padrão visual que transmitem solidez.",
    image: marcaImg,
  },
  {
    title: "02 — CONTEÚDO",
    caption: "A mensagem intencional que retém atenção e gera autoridade.",
    image: conteudoImg,
  },
  {
    title: "03 — PRESENÇA",
    caption: "A consistência nos pontos de contato que cria memória.",
    image: presencaImg,
  },
  {
    title: "04 — CONVERSÃO",
    caption: "A decisão natural do cliente de comprar com você.",
    image: conversaoImg,
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
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-16"
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

        {/* Galeria em Leque (CardFanGallery) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col items-center justify-center pt-2 sm:pt-6"
        >
          {/* Enhanced full-stage container without artificial downscaling */}
          <div className="w-full max-w-5xl">
            <CardFanGallery items={FAN_CARDS} />
          </div>

          {/* Interaction hints: Desktop and Mobile specific */}
          <div className="mt-4 sm:mt-8 text-center">
            <p className="hidden sm:block text-[11px] sm:text-xs uppercase font-mono tracking-widest text-neutral-400">
              PASSE O MOUSE PARA ABRIR • CLIQUE PARA EXPLORAR
            </p>
            <p className="block sm:hidden text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              TOQUE PARA ABRIR • TOQUE NO CARD PARA EXPLORAR
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { TestimonialsMarquee, Testimonial } from './ui/testimonials-marquee';

const VIRATTA_TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Marcelo Ramos",
    role: "Diretor Clínico · Lumine Dermatologia",
    text: "Nossos pacientes sempre elogiavam a clínica, mas pelo Instagram parecíamos um consultório qualquer. A Viratta virou a chave da nossa autoridade em menos de 60 dias.",
  },
  {
    name: "Camila Vianna",
    role: "Fundadora · Café & Bistrô Origem",
    text: "O visual e os vídeos da Viratta trouxeram um público que consome com prazer e não discute preço. Saímos do anonimato do bairro para fila de espera aos sábados.",
  },
  {
    name: "Rodrigo Toledo",
    role: "Head Coach · Iron Box Performance",
    text: "Achávamos que precisávamos de tráfego caro. Na verdade, precisávamos de uma identidade forte e vídeos com cara de cinema. Lotamos as turmas no terceiro mês.",
  },
  {
    name: "Eduardo Siqueira",
    role: "Proprietário · Officina Spezial Garage",
    text: "Os clientes pararam de pedir desconto quando viram nossos processos gravados com o padrão da Viratta. Nosso trabalho passou a ser visto como arte.",
  },
  {
    name: "Patrícia Mendes",
    role: "Sócia · Mendes & Prado Advocacia",
    text: "Comunicação elegante, limpa e estratégica. O time da Viratta entendeu perfeitamente a sobriedade que precisávamos sem perder o apelo moderno.",
  },
  {
    name: "Lucas Brandão",
    role: "CEO · Studio Forma Arquitetura",
    text: "Não é fábrica de post. É direção de arte de verdade. Cada material publicado agora tem coerência estética impecável.",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            Depoimentos em Movimento
          </span>
          <h2 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.05] text-balance">
            QUEM JÁ VIROU A CHAVE <br />
            <span className="text-[#FF5E14]">COM A VIRATTA.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-light">
            O que empresários e fundadores dizem sobre a transformação na percepção das suas marcas.
          </p>
        </motion.div>
      </div>

      {/* Two rows of testimonials sliding in opposite directions */}
      <div className="relative w-full max-w-full overflow-hidden">
        <TestimonialsMarquee items={VIRATTA_TESTIMONIALS} />
      </div>
    </section>
  );
};

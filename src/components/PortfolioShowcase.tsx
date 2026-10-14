import React from 'react';
import { motion } from 'motion/react';
import { useCms } from '../context/CmsContext';

export interface ClientLogo {
  name: string;
  src: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Café & Bistrô Origem",
    src: "/clients/cafe-origem.svg",
  },
  {
    name: "Clínica Lumine Dermatologia",
    src: "/clients/clinica-lumine.svg",
  },
  {
    name: "Iron Box Performance",
    src: "/clients/iron-box.svg",
  },
  {
    name: "Officina Spezial Garage",
    src: "/clients/officina-spezial.svg",
  },
];

export const PortfolioShowcase: React.FC = () => {
  const { content } = useCms();

  // Active logos from CMS or fallback to default
  const activeClients = (content?.clients || []).filter((c) => c.is_active);
  const displayLogos: ClientLogo[] = activeClients.length > 0
    ? activeClients.map((c) => ({ name: c.name, src: c.logo_url }))
    : CLIENT_LOGOS;

  const copy = content?.copy || ({} as any);
  const kicker = copy.portfolio_kicker || "CASOS & PORTFÓLIO";
  const headline = copy.portfolio_headline || "MARCAS QUE COMEÇARAM A VIRAR A CHAVE.";

  // Render a single sequence of client logo containers
  const renderLogoSequence = (sequenceKey: string, isAriaHidden = false) => (
    <div
      key={sequenceKey}
      aria-hidden={isAriaHidden}
      className="flex items-center gap-4 sm:gap-6 shrink-0"
    >
      {displayLogos.map((client, idx) => (
        <div
          key={`${sequenceKey}-${client.name}-${idx}`}
          className="group w-44 sm:w-60 md:w-68 h-20 sm:h-24 md:h-28 rounded-2xl bg-[#0E0F12] border border-white/5 hover:border-white/10 transition-colors duration-300 p-4 sm:p-6 flex items-center justify-center shrink-0 select-none shadow-sm"
        >
          <img
            src={client.src}
            alt={isAriaHidden ? "" : client.name}
            className="client-logo-img max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="projetos" 
      data-section-title="Projetos & Portfólio" 
      className="relative py-14 sm:py-24 lg:py-28 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#FF5E14]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14] block mb-2 sm:mb-3">
            {kicker}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.05] text-balance whitespace-pre-line">
            {headline}
          </h2>
        </motion.div>
      </div>

      {/* Infinite Horizontal Client Logo Marquee with Soft Edge Mask */}
      <div
        className="relative w-full max-w-full overflow-hidden select-none py-2"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="animate-client-marquee flex items-center gap-4 sm:gap-6 cursor-default">
          {/* First occurrences: Accessible for screen readers */}
          {renderLogoSequence('set-1', false)}
          {renderLogoSequence('set-2', true)}
          {/* Duplicated sequences: Guarantees seamless infinite loop on any screen width without blank gaps */}
          {renderLogoSequence('set-3', true)}
          {renderLogoSequence('set-4', true)}
        </div>
      </div>
    </section>
  );
};

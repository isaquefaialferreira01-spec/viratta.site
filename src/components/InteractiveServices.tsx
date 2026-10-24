import React from 'react';
import { motion } from 'motion/react';
import { VIRATTA_SERVICES } from '../config/siteConfig';
import { useCms } from '../context/CmsContext';
import { ArrowUpRight } from 'lucide-react';

export const InteractiveServices: React.FC = () => {
  const { content, getWhatsAppUrl } = useCms();

  const servicesList = (content?.services || []).filter((s) => s.is_active);
  const displayServices = servicesList.length > 0 ? servicesList : VIRATTA_SERVICES;
  const copy = content?.copy || ({} as any);

  const kicker = copy.services_kicker || "Capacidades Viratta";
  const headline = copy.services_headline || "O QUE FAZEMOS PARA SUA MARCA SER PERCEBIDA.";
  const subtitle = copy.services_subtitle || "Sem pacotes genéricos. Soluções conectadas para empresas que se recusam a continuar invisíveis.";

  return (
    <section 
      id="servicos" 
      data-section-title="Serviços" 
      className="relative py-10 sm:py-20 lg:py-28 bg-[#070708] border-b border-white/5"
    >
      {/* Background ambient gradient */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-[#FF5E14]/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header — Compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-10 lg:mb-12"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#FF5E14] block mb-1 sm:mb-2">
            {kicker}
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.06] text-balance whitespace-pre-line">
            {headline}
          </h2>
          <p className="mt-2 sm:mt-3 text-[11px] xs:text-xs sm:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Minimal Text-Based Service Cards (Optimized mobile vertical footprint) */}
        <div className="flex flex-col space-y-2 sm:space-y-3 max-w-5xl">
          {displayServices.map((service, index) => (
            <motion.a
              key={service.number}
              href={getWhatsAppUrl(`Olá! Gostaria de conversar sobre o serviço de ${service.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Serviço ${service.number}: ${service.name}. ${service.description} (abre WhatsApp da VIRATTA)`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block w-full min-h-[56px] rounded-xl sm:rounded-2xl bg-[#0E0F12] border border-white/5 hover:border-[#FF5E14]/40 active:border-[#FF5E14]/60 hover:bg-[#121318] active:bg-[#121318] px-3.5 py-3 sm:px-6 sm:py-4.5 lg:px-7 lg:py-5 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            >
              {/* Top Row: Number, Service Name, Subtle Arrow Indicator */}
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 sm:gap-4 truncate">
                  <span className="font-mono text-[11px] sm:text-sm md:text-base font-bold text-[#FF5E14] tracking-wider tabular-nums shrink-0">
                    {service.number}
                  </span>
                  <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors truncate">
                    {service.name}
                  </h3>
                </div>

                <div className="shrink-0 p-0.5 text-neutral-500 group-hover:text-[#FF5E14] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Mini Description: Compact, high legibility without bloating height */}
              <p className="mt-1 sm:mt-2 text-[11px] xs:text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

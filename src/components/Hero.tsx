import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { useCms } from '../context/CmsContext';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { getWhatsAppUrl, content } = useCms();
  const copy = content?.copy || ({} as any);

  const kicker = copy.hero_kicker || "VIRATTA MARKETING";
  const title1 = copy.hero_title_line1 || "SEU NEGÓCIO NÃO PRECISA";
  const title2 = copy.hero_title_line2 || "PARECER PEQUENO.";
  const subtitle = copy.hero_subtitle || "Estratégia, conteúdo e posicionamento para transformar a forma como sua empresa é percebida.";
  const ctaPrimaryText = copy.hero_cta_primary || "QUERO VIRAR A CHAVE";
  const ctaPrimaryUrl = copy.hero_cta_primary_link || getWhatsAppUrl("Olá! Quero virar a chave da minha marca com a VIRATTA.");
  const ctaSecondaryText = copy.hero_cta_secondary || "VER NOSSOS TRABALHOS";
  const ctaSecondaryUrl = copy.hero_cta_secondary_link || "#projetos";

  // Linha de serviços discreta de apoio visual
  const servicesLine = copy.hero_services_line || "Social Media • Filmmaker • Design • Branding • Posicionamento";
  const servicesList = servicesLine.includes('•')
    ? servicesLine.split('•').map((s: string) => s.trim()).filter(Boolean)
    : servicesLine.split(',').map((s: string) => s.trim()).filter(Boolean);

  // Smooth scroll handler for the secondary CTA button
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaSecondaryUrl.startsWith('#')) {
      e.preventDefault();
      const targetId = ctaSecondaryUrl.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = ctaSecondaryUrl;
      }
    }
  };

  return (
    <section
      id="inicio"
      data-section-title="Início"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#070708]"
    >
      {/* Optional Announcement Banner controlled by CMS */}
      {copy.banner_enabled && copy.banner_text && (
        <div className="absolute top-16 sm:top-20 left-0 right-0 z-30 px-4 py-2 bg-gradient-to-r from-[#FF5E14]/20 via-[#FF5E14]/30 to-[#FF5E14]/20 border-b border-[#FF5E14]/30 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-white font-medium">
            <span>{copy.banner_text}</span>
            {copy.banner_button && (
              <a
                href={copy.banner_link || getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-1 px-3 py-1.5 rounded-full bg-[#FF5E14] text-white text-[11px] font-bold hover:bg-[#E04E0B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{copy.banner_button}</span>
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Background Ambience: Subtle Warm Orange Volumetric Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] lg:w-[650px] h-[280px] sm:h-[500px] lg:h-[650px] bg-[#FF5E14]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true"
        className="absolute -top-32 right-10 w-[240px] h-[240px] bg-[#FF5E14]/10 rounded-full blur-[90px] pointer-events-none" 
      />

      {/* Subtle Grid Texture */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Main Hero Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* Subtle Keyhole Brand Anchor */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 mb-5 sm:mb-7 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-sm"
          >
            <VirattaSymbol className="w-4 h-4" glow />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
              {kicker}
            </span>
          </motion.div>

          {/* PRIMARY DOMINANT HEADLINE: Commercial, punchy, high perceived value */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-[-0.03em] sm:tracking-[-0.035em] text-white leading-[1.08] sm:leading-[0.98] max-w-5xl break-words"
          >
            <span className="block">{title1}</span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E14] via-[#FFA05C] to-[#FF5E14] drop-shadow-[0_0_30px_rgba(255,94,20,0.35)]">
              {title2}
            </span>
          </motion.h1>

          {/* Secondary Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-neutral-300 font-normal max-w-2xl text-balance px-2 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 max-w-sm sm:max-w-none mx-auto"
          >
            {/* Primary CTA — QUERO VIRAR A CHAVE */}
            <a
              href={ctaPrimaryUrl}
              target={ctaPrimaryUrl.startsWith('http') ? "_blank" : undefined}
              rel={ctaPrimaryUrl.startsWith('http') ? "noopener noreferrer" : undefined}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-[0_0_25px_rgba(255,94,20,0.35)] hover:shadow-[0_0_35px_rgba(255,94,20,0.55)] transition-all duration-200 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{ctaPrimaryText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary CTA — VER NOSSOS TRABALHOS (Smooth Scroll to Portfolio) */}
            <a
              href={ctaSecondaryUrl}
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            >
              <span>{ctaSecondaryText}</span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </a>
          </motion.div>

          {/* LINHA DE SERVIÇOS — Apoio visual discreto */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-xs sm:text-sm text-neutral-400 font-medium tracking-wide max-w-xl mx-auto px-4"
          >
            {servicesList.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="text-neutral-300 hover:text-white transition-colors">{item}</span>
                {idx < servicesList.length - 1 && (
                  <span className="text-[#FF5E14] select-none" aria-hidden="true">•</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 11 — HERO MICROCOPY STATEMENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full border-t border-white/5 pt-6 sm:pt-8 mt-10 sm:mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-6 text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 uppercase">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
              ESTRATÉGIA
            </span>
            <span className="hidden sm:inline text-neutral-700">/</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
              IDENTIDADE
            </span>
            <span className="hidden sm:inline text-neutral-700">/</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
              CONTEÚDO
            </span>
            <span className="hidden sm:inline text-neutral-700">/</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
              PERCEPÇÃO
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { getWhatsAppUrl } from '../config/siteConfig';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#070708]"
    >
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
            className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-sm"
          >
            <VirattaSymbol className="w-4 h-4" glow />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
              VIRATTA MARKETING
            </span>
          </motion.div>

          {/* PRIMARY DOMINANT HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.25rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-[-0.035em] text-white leading-[1.02] sm:leading-[0.96] max-w-5xl text-balance"
          >
            SEU NEGÓCIO <br className="hidden sm:inline" />
            NÃO PRECISA <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E14] via-[#FFA05C] to-[#FF5E14] drop-shadow-[0_0_30px_rgba(255,94,20,0.35)]">
              PARECER PEQUENO.
            </span>
          </motion.h1>

          {/* Secondary Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-xl md:text-2xl text-neutral-300 font-normal max-w-2xl text-balance px-2"
          >
            Transformamos comunicação em percepção de valor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-2"
          >
            {/* Primary CTA */}
            <a
              href={getWhatsAppUrl("Olá! Quero transformar a percepção da minha marca com a VIRATTA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-[0_0_25px_rgba(255,94,20,0.35)] hover:shadow-[0_0_35px_rgba(255,94,20,0.55)] transition-all duration-200 active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Quero Transformar Minha Marca</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#sobre"
              className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            >
              <span>Conheça a Viratta</span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </a>
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

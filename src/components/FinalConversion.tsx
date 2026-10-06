import React, { useState } from 'react';
import { motion } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { getWhatsAppUrl, SITE_CONFIG } from '../config/siteConfig';
import { ArrowUpRight, Lock, Unlock, MessageSquare, Mail, MapPin } from 'lucide-react';

export const FinalConversion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contato" className="relative py-20 sm:py-36 lg:py-44 bg-[#070708] overflow-hidden select-none">
      {/* Background Volumetric Light Ray */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] bg-[#FF5E14]/15 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Official VIRATTA Standalone Symbol with Unlock Microinteraction */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 sm:mb-10 transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        >
          <VirattaSymbol
            className="w-14 h-14 sm:w-20 sm:h-20"
            glow={isHovered}
          />

          {/* Interactive Unlocking Ripple */}
          {isHovered && (
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="block w-12 h-12 rounded-full border border-[#FF5E14] animate-ping opacity-60" />
            </div>
          )}
        </motion.div>

        {/* Large Dominant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.03em] leading-[1.02] sm:leading-[0.98] text-balance"
        >
          SUA EMPRESA <br />
          JÁ EXISTE. <br />
          <span className="text-neutral-400">AGORA ELA PRECISA</span> <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#FF5E14]">
            SER PERCEBIDA.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-xl text-neutral-300 font-light max-w-2xl text-balance px-2"
        >
          Não deixe que uma comunicação pequena limite a grandeza do seu negócio.
        </motion.p>

        {/* Primary Unlocking Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 w-full sm:w-auto px-2"
        >
          <a
            href={getWhatsAppUrl("Olá! Conheci a VIRATTA pelo site e quero virar a chave da comunicação da minha empresa.")}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 800)}
            className="group relative w-full sm:w-auto min-h-[52px] sm:min-h-[58px] inline-flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-xs sm:text-base font-black tracking-wider uppercase text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-[0_0_35px_rgba(255,94,20,0.4)] hover:shadow-[0_0_50px_rgba(255,94,20,0.65)] transition-all duration-300 active:scale-[0.98] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Lock / Unlock Icon Microinteraction */}
            {isHovered ? (
              <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform rotate-12" />
            ) : (
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            )}

            <span>Quero Virar a Chave</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        {/* Quiet Contact Channels */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-xs text-neutral-400">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:text-white transition-colors py-1.5"
          >
            <MessageSquare className="w-4 h-4 text-[#FF5E14]" />
            <span>WhatsApp Direto: {SITE_CONFIG.whatsappDisplay}</span>
          </a>
          <div className="flex items-center justify-center gap-2 py-1.5">
            <Mail className="w-4 h-4 text-[#FF5E14]" />
            <span>{SITE_CONFIG.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1.5">
            <MapPin className="w-4 h-4 text-[#FF5E14]" />
            <span>{SITE_CONFIG.location}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

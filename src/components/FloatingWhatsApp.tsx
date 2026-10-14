import React, { useState, useEffect, useCallback } from 'react';
import { useCms } from '../context/CmsContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, X } from 'lucide-react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { getActiveSectionTitle, buildContextAwareMessage } from '../utils/sectionTracking';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { getWhatsAppUrl, content } = useCms();
  const [activeSection, setActiveSection] = useState<string>('Início');

  // Track the active section in viewport as user scrolls or resizes
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const section = getActiveSectionTitle();
      setActiveSection(section);
      ticking = false;
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Initial calculation on mount
    updateActiveSection();

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  // Compute the context-aware WhatsApp URL with the prepended section title payload
  const getContextAwareUrl = useCallback(
    (sectionOverride?: string) => {
      const sectionTitle = sectionOverride || activeSection || 'Início';
      const baseMessage =
        content?.settings?.whatsapp_default_message || SITE_CONFIG.whatsappDefaultMessage;
      const fullMessage = buildContextAwareMessage(sectionTitle, baseMessage);
      return getWhatsAppUrl(fullMessage);
    },
    [activeSection, content?.settings?.whatsapp_default_message, getWhatsAppUrl]
  );

  // Synchronously ensure section accuracy right on click, hover or touch
  const handleInteraction = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    const currentSection = getActiveSectionTitle();
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
    const targetUrl = getContextAwareUrl(currentSection);
    e.currentTarget.href = targetUrl;
  };

  return (
    <div 
      className="fixed z-40 flex flex-col items-end pointer-events-auto"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1rem + env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Tooltip Card (Can be toggled or viewed) */}
      {showTooltip && (
        <div className="mb-2.5 p-3 max-w-[260px] sm:max-w-xs rounded-2xl bg-[#0E0F12] border border-white/10 shadow-2xl text-left relative animate-fadeIn">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-neutral-400 hover:text-white p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <VirattaSymbol className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              Viratta Marketing
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-300 leading-snug font-light">
            Quer transformar a percepção da sua empresa? Fale conosco pelo WhatsApp.
          </p>
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span>
              Seção ativa: <strong className="text-white font-medium">{activeSection}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button with Context-Aware WhatsApp Link */}
      <a
        href={getContextAwareUrl(activeSection)}
        onClick={handleInteraction}
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        onFocus={handleInteraction}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir conversa no WhatsApp com a Viratta - Seção: ${activeSection}`}
        title={`Falar no WhatsApp sobre ${activeSection}`}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white shadow-[0_8px_25px_rgba(255,94,20,0.4)] hover:shadow-[0_10px_35px_rgba(255,94,20,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {/* Pulsing indicator badge */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#070708]" />
        </span>

        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};

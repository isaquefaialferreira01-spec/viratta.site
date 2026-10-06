import React, { useState } from 'react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { MessageSquare, X } from 'lucide-react';
import { VirattaSymbol } from './brand/VirattaSymbol';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="fixed z-40 flex flex-col items-end pointer-events-auto"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1rem + env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Tooltip Card (Hidden by default on mobile to prevent obscuring content, can be toggled) */}
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
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com a Viratta"
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

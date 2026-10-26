import React from 'react';
import { VirattaLogo } from './brand/VirattaLogo';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { NAV_LINKS, SITE_CONFIG } from '../config/siteConfig';
import { useCms } from '../context/CmsContext';
import { Instagram, MessageSquare, ArrowUp, Lock, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, getWhatsAppUrl } = useCms();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramUrl = content?.social?.instagram?.url || SITE_CONFIG.instagramUrl;
  const email = content?.settings?.email || SITE_CONFIG.email;
  const location = content?.settings?.location || SITE_CONFIG.location;
  const description = content?.settings?.tagline
    ? `Empresa brasileira de marketing e comunicação estratégica. ${content.settings.tagline}`
    : 'Empresa brasileira de marketing e comunicação estratégica. Destrave a percepção da sua empresa e seja visto pelo valor real do que você entrega.';

  return (
    <footer className="relative bg-[#050506] border-t border-white/10 pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/5 items-start">
          
          {/* Brand Column with Official VIRATTA Horizontal Logo */}
          <div className="md:col-span-5 flex flex-col items-start">
            <VirattaLogo size="lg" />
            
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-neutral-300 font-light max-w-sm leading-relaxed">
              {description}
            </p>

            <div className="mt-4 sm:mt-6 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#FF5E14]">
              “Estratégia. Identidade. Conteúdo. Percepção.”
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold block mb-3">
                Navegação
              </span>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex items-center min-h-[44px] py-2 px-1 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold block mb-3">
                Canais Diretos
              </span>
              <ul className="space-y-1">
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-1 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#FF5E14] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FF5E14]" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-1 text-xs text-neutral-400 hover:text-[#FF5E14] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
                    title={`Enviar e-mail para ${email}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" aria-hidden="true" />
                    <span className="truncate max-w-[210px]">{email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-1 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#FF5E14] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#FF5E14]" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-1.5 py-2 px-1 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" aria-hidden="true" />
                  <span>{location}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Standalone Official Symbol Signature & Back to Top */}
          <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between self-stretch pt-4 md:pt-0 border-t border-white/5 md:border-t-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-neutral-500 uppercase tracking-widest">Símbolo Oficial</span>
              <VirattaSymbol className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-105 transition-transform" />
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

        </div>

        {/* Quiet Bottom Legal & Copyright Bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 text-center sm:text-left font-light">
          <div>
            © {new Date().getFullYear()} VIRATTA MARKETING. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-neutral-400">
            <span>Bons negócios não deveriam passar despercebidos.</span>
            <a
              href="/admin"
              className="inline-flex items-center gap-1 min-h-[44px] min-w-[44px] px-2 py-2 text-[11px] text-neutral-600 hover:text-[#FF5E14] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
              title="Acesso Administrativo"
            >
              <Lock className="w-3 h-3" aria-hidden="true" />
              <span>Admin</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

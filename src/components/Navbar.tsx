import React, { useState, useEffect } from 'react';
import { VirattaLogo } from './brand/VirattaLogo';
import { NAV_LINKS } from '../config/siteConfig';
import { useCms } from '../context/CmsContext';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getWhatsAppUrl, content } = useCms();

  const ctaText = content?.copy?.hero_cta_primary || "Falar com a Viratta";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
          scrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <nav
            aria-label="Navegação Principal"
            className={`flex items-center justify-between transition-all duration-300 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl ${
              scrolled
                ? 'bg-[#0E0F12]/85 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* Zone 1: Official VIRATTA Horizontal Logo with breathing room */}
            <a
              href="#inicio"
              className="flex items-center min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-lg transition-transform active:scale-95 py-1"
              aria-label="VIRATTA MARKETING - Página Inicial"
            >
              <VirattaLogo size="md" priority />
            </a>

            {/* Zone 2: Clean text navigation links (Desktop) */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase font-medium tracking-widest text-neutral-300 hover:text-white transition-colors py-1 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-md"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF5E14] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Zone 3: Primary Action CTA (WhatsApp) + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-[#FF5E14] hover:bg-[#E04E0B] transition-all duration-200 shadow-[0_0_20px_rgba(255,94,20,0.25)] hover:shadow-[0_0_25px_rgba(255,94,20,0.45)] active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              {/* Mobile Menu Hamburger Toggle (Minimum 44px touch target) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-neutral-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Safe Area Support */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu móvel de navegação"
          className="fixed inset-0 z-30 lg:hidden bg-black/95 backdrop-blur-2xl px-6 flex flex-col justify-between overflow-y-auto animate-fadeIn"
          style={{
            paddingTop: 'calc(5.5rem + env(safe-area-inset-top, 0px))',
            paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <VirattaLogo size="md" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#FF5E14] uppercase">
                Menu
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[48px] text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-[#FF5E14] active:text-[#FF5E14] transition-colors flex items-center justify-between border-b border-white/5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-lg"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-500" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[50px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-lg transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>{ctaText}</span>
            </a>
            <p className="text-center text-xs text-neutral-400 mt-2 tracking-wide font-light">
              Estratégia · Identidade · Conteúdo · Percepção
            </p>
          </div>
        </div>
      )}
    </>
  );
};

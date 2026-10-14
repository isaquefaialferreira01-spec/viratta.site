import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { useCms } from '../context/CmsContext';
import { Plus, Minus, ArrowUpRight, HelpCircle } from 'lucide-react';
import { DEFAULT_FAQ_ITEMS } from '../lib/cmsDefaults';
import { FaqItem } from '../types/cms';

export const FAQSection: React.FC = () => {
  const { content, getWhatsAppUrl } = useCms();
  const faqItems: FaqItem[] = content?.faq_items && content.faq_items.length > 0 
    ? content.faq_items.filter((item) => item.is_active !== false)
    : DEFAULT_FAQ_ITEMS;

  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || 'faq-1');
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (id: string, questionText: string) => {
    setOpenId((prev) => {
      const willOpen = prev !== id;
      setLiveAnnouncement(
        willOpen
          ? `Pergunta expandida: ${questionText}`
          : `Pergunta recolhida: ${questionText}`
      );
      return willOpen ? id : null;
    });
  };

  // Keyboard navigation according to W3C WAI-ARIA Accordion pattern
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % faqItems.length;
        triggerRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + faqItems.length) % faqItems.length;
        triggerRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        triggerRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        triggerRefs.current[faqItems.length - 1]?.focus();
        break;
      default:
        break;
    }
  };

  // SEO: Inject and synchronize Schema.org FAQPage structured data (JSON-LD) for rich search snippets
  useEffect(() => {
    if (typeof window === 'undefined' || !faqItems.length) return;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    };

    let script = document.getElementById('faq-schema-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

    return () => {
      // Keep script updated if items change
    };
  }, [faqItems]);

  return (
    <section 
      id="faq" 
      data-section-title="Perguntas Frequentes (FAQ)"
      aria-labelledby="faq-title"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      {/* Screen Reader Live Region for real-time status announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        role="status" 
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Background Ambience: Subtle Warm Volumetric Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] lg:w-[700px] h-[320px] sm:h-[550px] lg:h-[700px] bg-[#FF5E14]/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" 
      />

      {/* Subtle Grid Pattern */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-sm mb-5"
          >
            <VirattaSymbol className="w-3.5 h-3.5" glow aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-300">
              Perguntas Frequentes
            </span>
          </motion.div>

          <motion.h2
            id="faq-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[1.1]"
          >
            RESPOSTAS DIRETAS PARA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E14] via-[#FFA05C] to-[#FF5E14]">
              VIRAR A CHAVE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Tudo o que você precisa entender sobre metodologia, produção cinematográfica, posicionamento de autoridade e prazos.
          </motion.p>
        </div>

        {/* Minimalist Accordion List with APG Semantics */}
        <div 
          className="space-y-3 sm:space-y-4 max-w-4xl mx-auto"
          role="region"
          aria-label="Lista de perguntas frequentes"
        >
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const indexNumber = String(index + 1).padStart(2, '0');
            const triggerId = `faq-trigger-${item.id}`;
            const panelId = `faq-answer-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`group rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#0E0F12] border-[#FF5E14]/40 shadow-[0_4px_30px_rgba(255,94,20,0.08)]'
                    : 'bg-[#0E0F12]/60 hover:bg-[#0E0F12] border-white/5 hover:border-white/15'
                }`}
              >
                {/* W3C APG Pattern: Heading containing button trigger */}
                <h3 className="m-0 p-0 text-inherit font-inherit">
                  <button
                    ref={(el) => {
                      triggerRefs.current[index] = el;
                    }}
                    id={triggerId}
                    type="button"
                    onClick={() => toggleItem(item.id, item.question)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`Pergunta ${index + 1}: ${item.question}. ${
                      isOpen
                        ? 'Resposta aberta. Pressione Enter ou Espaço para recolher'
                        : 'Resposta fechada. Pressione Enter ou Espaço para expandir'
                    }`}
                    className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] rounded-2xl transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <span 
                        aria-hidden="true"
                        className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors duration-200 select-none ${
                          isOpen ? 'text-[#FF5E14]' : 'text-neutral-500 group-hover:text-neutral-300'
                        }`}
                      >
                        {indexNumber}
                      </span>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                        {item.question}
                      </span>
                      <span className="sr-only">
                        {isOpen ? ' (resposta expandida)' : ' (resposta recolhida)'}
                      </span>
                    </div>

                    <div 
                      aria-hidden="true"
                      className={`min-w-[32px] min-h-[32px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#FF5E14] text-white rotate-180'
                          : 'bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed font-light border-t border-white/5 mt-1">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Bottom Assistance Anchor (Direct WhatsApp Consultation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#FF5E14]" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              Tem alguma dúvida específica?
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 mb-5 max-w-md mx-auto">
            Cada negócio possui particularidades. Fale diretamente com nossa equipe estratégica no WhatsApp e entenda o formato ideal para sua empresa.
          </p>

          <a
            href={getWhatsAppUrl("Olá! Estava analisando as dúvidas frequentes no site da VIRATTA e gostaria de tirar uma dúvida específica sobre minha empresa.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tirar dúvida personalizada diretamente com a equipe estratégica da VIRATTA no WhatsApp (abre em uma nova aba)"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-[0_0_20px_rgba(255,94,20,0.3)] hover:shadow-[0_0_30px_rgba(255,94,20,0.5)] transition-all duration-200 active:scale-[0.98] group"
          >
            <span>Tirar Dúvida no WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

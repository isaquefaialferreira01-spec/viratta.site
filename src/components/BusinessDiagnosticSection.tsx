import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCms } from '../context/CmsContext';
import { AiChatInput } from './ui/ai-chat-input';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { MessageSquare, ArrowUpRight, RotateCcw, Sparkles } from 'lucide-react';

const DEFAULT_SUGGESTIONS = [
  "Melhorar Instagram",
  "Atrair mais clientes",
  "Posicionar minha marca",
  "Criar conteúdo",
  "Melhorar minha identidade",
  "Produzir vídeos"
];

interface DiagnosticResult {
  userText: string;
  response: string;
}

export const BusinessDiagnosticSection: React.FC = () => {
  const { getWhatsAppUrl, content } = useCms();
  const copy = content?.copy || ({} as any);

  const kicker = copy.diagnostic_kicker || "DIAGNÓSTICO ESTRATÉGICO";
  const headline = copy.diagnostic_headline || "O QUE ESTÁ TRAVANDO O SEU NEGÓCIO?";
  const subtitle = copy.diagnostic_subtitle || "Conte para a VIRATTA o que você quer melhorar. Vamos transformar sua dificuldade em direção.";
  const placeholder = copy.diagnostic_placeholder || "Ex.: Meu Instagram não gera clientes, minha marca parece amadora e não sei que tipo de conteúdo produzir.";
  const responseText = copy.diagnostic_response || "Entendi. A VIRATTA pode te ajudar a transformar isso em uma estratégia mais clara.";
  const ctaButtonText = copy.diagnostic_cta_button || "FALAR COM A VIRATTA";
  const microcopy = copy.diagnostic_microcopy || "Sem formulário gigante. Conte o problema e começamos por aí.";
  const suggestions = copy.diagnostic_suggestions?.length ? copy.diagnostic_suggestions : DEFAULT_SUGGESTIONS;

  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Fast, instant client-side diagnosis handling (no heavy chatbot, zero lag)
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setResult({
      userText: text.trim(),
      response: responseText,
    });
  };

  const getCustomWhatsAppUrl = (userText: string) => {
    const rawMessage = `Olá, vim pelo site da VIRATTA e quero ajuda com meu negócio.\n\nMeu principal desafio é:\n${userText}`;
    return getWhatsAppUrl(rawMessage);
  };

  return (
    <section
      id="diagnostico"
      data-section-title="Diagnóstico do Negócio"
      className="relative py-14 sm:py-24 lg:py-32 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      {/* Background Volumetric Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] bg-[#FF5E14]/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none"
      />

      {/* Subtle Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow Pill / Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black border border-white/20 mb-4 sm:mb-6 shadow-md"
          >
            <VirattaSymbol className="w-3.5 h-3.5" glow aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white font-semibold">
              {kicker}
            </span>
          </motion.div>

          {/* Main Dominant Title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.02] text-balance max-w-4xl"
          >
            {headline}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3.5 sm:mt-5 text-sm sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed text-balance px-2"
          >
            {subtitle}
          </motion.p>

          {/* Interactive Input Area / Suggestions */}
          {!result && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mt-7 sm:mt-10 flex flex-col items-center"
            >
              <div className="w-full max-w-2xl">
                <AiChatInput
                  id="business-diagnostic-input"
                  onSend={handleSend}
                  placeholder={placeholder}
                  suggestions={suggestions}
                  className="w-full"
                />
              </div>

              {/* Microcopy below field */}
              <p className="mt-3 sm:mt-4 text-xs text-neutral-400 font-light text-center">
                {microcopy}
              </p>
            </motion.div>
          )}

          {/* Result Card: Immediate Conversion Step */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#0E0F12] border border-white/20 p-5 sm:p-7 text-left shadow-[0_15px_45px_rgba(0,0,0,0.7)] relative overflow-hidden"
              >
                {/* Top orange gradient indicator */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5E14] via-[#FFA05C] to-[#FF5E14]"
                />

                <div className="flex flex-col gap-4">
                  {/* Category Pill + Reset Button */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5E14]" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-white">
                        DIAGNÓSTICO VIRATTA
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
                      aria-label="Digitar outro desafio do negócio"
                      title="Digitar outro desafio"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Alterar desafio</span>
                    </button>
                  </div>

                  {/* Captured User Input */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs sm:text-sm text-neutral-300 italic">
                    "{result.userText}"
                  </div>

                  {/* VIRATTA Response Message */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5E14] block font-semibold">
                      Direção VIRATTA
                    </span>
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                      {result.response}
                    </p>
                  </div>

                  {/* Primary WhatsApp Action CTA */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                    <span className="text-xs text-neutral-400 font-light">
                      Conversar diretamente com a equipe estratégica:
                    </span>

                    <a
                      href={getCustomWhatsAppUrl(result.userText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(255,94,20,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Falar com a VIRATTA no WhatsApp com o desafio preenchido (abre nova aba)"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" aria-hidden="true" />
                      <span>{ctaButtonText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

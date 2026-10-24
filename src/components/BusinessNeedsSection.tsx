import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCms } from '../context/CmsContext';
import { WordRotate } from './ui/word-rotate';
import { AiChatInput } from './ui/ai-chat-input';
import { Sparkles, MessageSquare, ArrowUpRight, RotateCcw } from 'lucide-react';

const ROTATING_WORDS = [
  "FILMMAKER",
  "SOCIAL MEDIA",
  "DESIGN GRÁFICO",
  "BRANDING",
  "COMUNICAÇÃO VISUAL",
  "POSICIONAMENTO",
  "GESTÃO DE MARKETING",
  "ESTRATÉGIA DE MARKETING",
  "TRÁFEGO PAGO",
  "CRIAÇÃO DE CONTEÚDO"
];

const SUGGESTIONS = [
  "Quero melhorar meu Instagram",
  "Preciso divulgar minha empresa",
  "Quero produzir vídeos",
  "Minha marca parece amadora",
  "Preciso atrair mais clientes",
  "Não sei por onde começar"
];

interface DiagnosisResult {
  userPrompt: string;
  analysis: string;
  serviceNeeded?: string;
}

export const BusinessNeedsSection: React.FC = () => {
  const { getWhatsAppUrl } = useCms();
  const [busy, setBusy] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const handleSend = async (text: string) => {
    if (!text.trim() || busy) return;
    setBusy(true);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiagnosis({
          userPrompt: text,
          analysis: data.analysis || 'Pelo que você contou, seu negócio precisa alinhar a comunicação com o real valor que entrega.',
          serviceNeeded: data.serviceNeeded || 'POSICIONAMENTO ESTRATÉGICO',
        });
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Offline / network fallback with immediate intelligent diagnosis
      const lower = text.toLowerCase();
      let service = 'POSICIONAMENTO ESTRATÉGICO';
      let analysis = 'Pelo que você contou, sua prioridade está em alinhar a comunicação com o valor que sua empresa realmente entrega, garantindo autoridade e atração de clientes qualificados.';

      if (lower.includes('vídeo') || lower.includes('video') || lower.includes('film') || lower.includes('gravar')) {
        service = 'FILMMAKER & PRODUÇÃO AUDIOVISUAL';
        analysis = 'Para elevar a percepção do seu negócio e transmitir autoridade imediata, a captação audiovisual com acabamento cinematográfico é o melhor investimento para sua marca.';
      } else if (lower.includes('instagram') || lower.includes('social') || lower.includes('post') || lower.includes('conteúdo') || lower.includes('conteudo')) {
        service = 'SOCIAL MEDIA & GESTÃO ESTRATÉGICA';
        analysis = 'Seu perfil precisa deixar de parecer improvisado e atuar como um motor de atração comercial diário, com design profissional e narrativa consistente.';
      } else if (lower.includes('amador') || lower.includes('logo') || lower.includes('marca') || lower.includes('branding')) {
        service = 'BRANDING & IDENTIDADE VISUAL';
        analysis = 'Quando a apresentação visual não reflete a qualidade do que você entrega, os clientes hesitam. Uma reformulação visual colocará sua empresa em outro patamar de percepção.';
      } else if (lower.includes('cliente') || lower.includes('vender') || lower.includes('divulgar') || lower.includes('tráfego') || lower.includes('trafego')) {
        service = 'ESTRATÉGIA DE MARKETING & TRÁFEGO';
        analysis = 'Mais do que simplesmente divulgar, sua empresa precisa de uma mensagem clara que diferencie sua entrega da concorrência e gere conversões reais.';
      }

      setDiagnosis({
        userPrompt: text,
        analysis,
        serviceNeeded: service,
      });
    } finally {
      setBusy(false);
    }
  };

  const getCustomWhatsAppUrl = (result: DiagnosisResult) => {
    const customMessage = `Olá! Vim pelo site da VIRATTA.

Preciso de ajuda com:
"${result.userPrompt}"

Necessidade identificada:
${result.serviceNeeded ? result.serviceNeeded : 'Comunicação e Posicionamento'}`;

    return getWhatsAppUrl(customMessage);
  };

  return (
    <section
      id="diagnostico"
      data-section-title="Diagnóstico Estratégico"
      className="relative py-16 sm:py-24 lg:py-32 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      {/* Background Volumetric Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] bg-[#FF5E14]/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none"
      />
      
      {/* Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Eyebrow / Aba */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-white/20 mb-4 sm:mb-6 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5E14]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white font-semibold">
              VIRATTA PARA O SEU NEGÓCIO
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.02] text-balance"
          >
            O QUE O SEU NEGÓCIO <br />
            PRECISA?
          </motion.h2>

          {/* Dynamic Sentence with WordRotate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 text-sm xs:text-base sm:text-2xl md:text-3xl text-neutral-300 font-light max-w-full overflow-hidden px-2"
          >
            <span className="whitespace-nowrap">Talvez você precise de</span>
            <span className="text-base xs:text-lg sm:text-2xl md:text-3xl max-w-full overflow-hidden">
              <WordRotate
                words={ROTATING_WORDS}
                className="font-black text-[#FF5E14] tracking-tight uppercase drop-shadow-[0_0_20px_rgba(255,94,20,0.35)]"
              />
            </span>
          </motion.div>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 max-w-2xl space-y-2 text-center"
          >
            <p className="text-xs sm:text-sm font-semibold text-neutral-200">
              Não sabe exatamente qual serviço precisa?
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Conte o momento da sua empresa, o que você quer melhorar ou o resultado que deseja alcançar.
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-500 font-light">
              Escreva do seu jeito. A gente entende a necessidade e ajuda a encontrar o próximo passo.
            </p>
          </motion.div>

          {/* AI Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-8 sm:mt-10 flex flex-col items-center"
          >
            <div className="w-full max-w-2xl">
              <AiChatInput
                onSend={handleSend}
                busy={busy}
                onStop={() => setBusy(false)}
                placeholder="Conte o que você precisa para o seu negócio..."
                suggestions={diagnosis ? [] : SUGGESTIONS}
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Diagnosis & Conversion Card Result */}
          <AnimatePresence>
            {diagnosis && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-black border border-white/20 p-5 sm:p-7 text-left shadow-[0_10px_35px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                {/* Subtle top indicator glow */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5E14] via-[#FFA05C] to-[#FF5E14]"
                />

                <div className="flex flex-col gap-4">
                  {/* Category Badge / Aba */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF5E14]" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-white">
                        {diagnosis.serviceNeeded || 'DIAGNÓSTICO VIRATTA'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDiagnosis(null)}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
                      aria-label="Fazer nova consulta de diagnóstico"
                      title="Fazer nova consulta"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Nova consulta</span>
                    </button>
                  </div>

                  {/* User Request Quote */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-400 italic">
                    "{diagnosis.userPrompt}"
                  </div>

                  {/* AI Strategic Analysis */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                      Primeira Análise Estratégica
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                      {diagnosis.analysis}
                    </p>
                  </div>

                  {/* Strong WhatsApp Lead Conversion CTA */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-neutral-400 font-light">
                      Dê o próximo passo com a equipe VIRATTA:
                    </span>

                    <a
                      href={getCustomWhatsAppUrl(diagnosis)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[48px] gap-2 px-5 py-3 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_4px_25px_rgba(255,94,20,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/20" aria-hidden="true" />
                      <span>Quero falar com a Viratta</span>
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

import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { SiteCopy } from '../../../types/cms';
import { Type, RotateCcw, Sparkles } from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

type CopySectionGroup = 'hero' | 'positioning' | 'manifesto' | 'services' | 'diagnostic' | 'cta';

export const SiteCopyView: React.FC = () => {
  const { draft, updateCopy } = useCms();
  const [activeGroup, setActiveGroup] = useState<CopySectionGroup>('hero');

  const copy = draft.copy;

  const handleUpdate = (field: keyof SiteCopy, value: any) => {
    updateCopy({ [field]: value });
  };

  const handleResetCopy = () => {
    if (confirm('Deseja restaurar todos os textos institucionais padrão da VIRATTA?')) {
      updateCopy(DEFAULT_CMS_STATE.copy);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Textos do Site (Copywriting)
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Gerencie todas as frases de impacto, títulos e manifestos agrupados por categoria.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Textos Padrão</span>
        </button>
      </div>

      {/* Segmented Group Navigation */}
      <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/5 overflow-x-auto custom-scrollbar">
        <button
          type="button"
          onClick={() => setActiveGroup('hero')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'hero' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Hero & Abertura
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('positioning')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'positioning' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Posicionamento
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('manifesto')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'manifesto' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Manifesto de Marca
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('services')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'services' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Serviços & Portfólio
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('diagnostic')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'diagnostic' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Diagnóstico Interativo
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('cta')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeGroup === 'cta' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Chamada Final (CTA)
        </button>
      </div>

      {/* Group Content */}
      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
        {activeGroup === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Kicker do Topo
              </label>
              <input
                type="text"
                value={copy.hero_kicker || ''}
                onChange={(e) => handleUpdate('hero_kicker', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Headline Linha 1
                </label>
                <input
                  type="text"
                  value={copy.hero_title_line1 || ''}
                  onChange={(e) => handleUpdate('hero_title_line1', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Headline Linha 2
                </label>
                <input
                  type="text"
                  value={copy.hero_title_line2 || ''}
                  onChange={(e) => handleUpdate('hero_title_line2', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Subtítulo Explicativo
              </label>
              <textarea
                rows={2}
                value={copy.hero_subtitle || ''}
                onChange={(e) => handleUpdate('hero_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}

        {activeGroup === 'positioning' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Kicker de Posicionamento
              </label>
              <input
                type="text"
                value={copy.first_impact_kicker || ''}
                onChange={(e) => handleUpdate('first_impact_kicker', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Headline de Impacto
              </label>
              <input
                type="text"
                value={copy.first_impact_headline || ''}
                onChange={(e) => handleUpdate('first_impact_headline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Citação / Subtítulo
              </label>
              <textarea
                rows={2}
                value={copy.first_impact_subtitle || ''}
                onChange={(e) => handleUpdate('first_impact_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}

        {activeGroup === 'manifesto' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Frase do Manifesto (Citação Gigante)
              </label>
              <textarea
                rows={3}
                value={copy.brand_statement_quote || ''}
                onChange={(e) => handleUpdate('brand_statement_quote', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Pilares / Subtítulo
              </label>
              <input
                type="text"
                value={copy.brand_statement_subtitle || ''}
                onChange={(e) => handleUpdate('brand_statement_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}

        {activeGroup === 'services' && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-[#FF5E14] font-bold">
              Cabeçalho de Serviços
            </h2>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Título
              </label>
              <input
                type="text"
                value={copy.services_headline || ''}
                onChange={(e) => handleUpdate('services_headline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Subtítulo
              </label>
              <textarea
                rows={2}
                value={copy.services_subtitle || ''}
                onChange={(e) => handleUpdate('services_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <h2 className="text-xs font-mono uppercase text-[#FF5E14] font-bold pt-4 border-t border-white/5">
              Cabeçalho do Portfólio / Casos
            </h2>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Título
              </label>
              <input
                type="text"
                value={copy.portfolio_headline || ''}
                onChange={(e) => handleUpdate('portfolio_headline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}

        {activeGroup === 'diagnostic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Kicker do Diagnóstico
              </label>
              <input
                type="text"
                value={copy.diagnostic_kicker || ''}
                onChange={(e) => handleUpdate('diagnostic_kicker', e.target.value)}
                placeholder="DIAGNÓSTICO ESTRATÉGICO"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={copy.diagnostic_headline || ''}
                onChange={(e) => handleUpdate('diagnostic_headline', e.target.value)}
                placeholder="O QUE ESTÁ TRAVANDO O SEU NEGÓCIO?"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Subtítulo de Instrução
              </label>
              <textarea
                rows={2}
                value={copy.diagnostic_subtitle || ''}
                onChange={(e) => handleUpdate('diagnostic_subtitle', e.target.value)}
                placeholder="Conte para a VIRATTA o que você quer melhorar. Vamos transformar sua dificuldade em direção."
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Exemplo de Placeholder do Campo
              </label>
              <input
                type="text"
                value={copy.diagnostic_placeholder || ''}
                onChange={(e) => handleUpdate('diagnostic_placeholder', e.target.value)}
                placeholder="Ex.: Meu Instagram não gera clientes, minha marca parece amadora e não sei que tipo de conteúdo produzir."
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Resposta Imediata (Direção)
                </label>
                <input
                  type="text"
                  value={copy.diagnostic_response || ''}
                  onChange={(e) => handleUpdate('diagnostic_response', e.target.value)}
                  placeholder="Entendi. A VIRATTA pode te ajudar a transformar isso em uma estratégia mais clara."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Texto do Botão CTA (WhatsApp)
                </label>
                <input
                  type="text"
                  value={copy.diagnostic_cta_button || ''}
                  onChange={(e) => handleUpdate('diagnostic_cta_button', e.target.value)}
                  placeholder="FALAR COM A VIRATTA"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Microcopy Inferior
              </label>
              <input
                type="text"
                value={copy.diagnostic_microcopy || ''}
                onChange={(e) => handleUpdate('diagnostic_microcopy', e.target.value)}
                placeholder="Sem formulário gigante. Conte o problema e começamos por aí."
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}

        {activeGroup === 'cta' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Kicker da Conversão
              </label>
              <input
                type="text"
                value={copy.final_cta_kicker || ''}
                onChange={(e) => handleUpdate('final_cta_kicker', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Headline Final
              </label>
              <input
                type="text"
                value={copy.final_cta_headline || ''}
                onChange={(e) => handleUpdate('final_cta_headline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Subtítulo de Encorajamento
              </label>
              <textarea
                rows={2}
                value={copy.final_cta_subtitle || ''}
                onChange={(e) => handleUpdate('final_cta_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

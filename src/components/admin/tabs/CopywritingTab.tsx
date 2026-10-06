import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SiteCopy } from '../../../types/cms';
import { Type, RotateCcw } from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

export const CopywritingTab: React.FC = () => {
  const { draft, updateCopy } = useCms();
  const copy = draft.copy;

  const handleUpdate = (field: keyof SiteCopy, value: string) => {
    updateCopy({ [field]: value });
  };

  const handleResetCopy = () => {
    if (confirm('Deseja restaurar todos os textos e chamadas aprovadas da VIRATTA?')) {
      updateCopy(DEFAULT_CMS_STATE.copy);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Textos & Copywriting Institucional
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Personalize os títulos de impacto, frases marcantes e botões de conversão.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetCopy}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Textos Padrão</span>
        </button>
      </div>

      {/* Hero Section Copy */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Type className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Seção de Entrada (Hero)</h3>
            <span className="text-xs text-neutral-400">Primeiro contato e grande promessa de valor</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Chapéu Superior (Kicker)
            </label>
            <input
              type="text"
              value={copy.hero_kicker}
              onChange={(e) => handleUpdate('hero_kicker', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Título Linha 1
              </label>
              <input
                type="text"
                value={copy.hero_title_line1}
                onChange={(e) => handleUpdate('hero_title_line1', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-black focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Título Linha 2 (Destaque)
              </label>
              <input
                type="text"
                value={copy.hero_title_line2}
                onChange={(e) => handleUpdate('hero_title_line2', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-black focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Subtítulo Descritivo
            </label>
            <textarea
              rows={2}
              value={copy.hero_subtitle}
              onChange={(e) => handleUpdate('hero_subtitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Texto do Botão Principal (CTA)
              </label>
              <input
                type="text"
                value={copy.hero_cta_primary}
                onChange={(e) => handleUpdate('hero_cta_primary', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Texto do Botão Secundário
              </label>
              <input
                type="text"
                value={copy.hero_cta_secondary}
                onChange={(e) => handleUpdate('hero_cta_secondary', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Statement / Quotes */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
          Manifesto & Frases Marcantes
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Primeiro Impacto (Headline Central)
            </label>
            <textarea
              rows={2}
              value={copy.first_impact_headline}
              onChange={(e) => handleUpdate('first_impact_headline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-bold uppercase focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Declaração de Marca (Brand Statement)
            </label>
            <textarea
              rows={2}
              value={copy.brand_statement_quote}
              onChange={(e) => handleUpdate('brand_statement_quote', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-bold uppercase focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>
        </div>
      </div>

      {/* Final Conversion Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
          Chamada Final para Conversão (Fechamento)
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Título Final de Fechamento
            </label>
            <input
              type="text"
              value={copy.final_cta_headline}
              onChange={(e) => handleUpdate('final_cta_headline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-black focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Subtítulo de Fechamento
            </label>
            <textarea
              rows={2}
              value={copy.final_cta_subtitle}
              onChange={(e) => handleUpdate('final_cta_subtitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Texto do Botão Final (WhatsApp)
            </label>
            <input
              type="text"
              value={copy.final_cta_button}
              onChange={(e) => handleUpdate('final_cta_button', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-[#FF5E14]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

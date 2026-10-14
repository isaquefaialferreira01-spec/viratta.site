import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SiteCopy } from '../../../types/cms';
import { Type, RotateCcw, Megaphone, Sparkles, MessageSquare, Briefcase, Instagram, Layers } from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

export const CopywritingTab: React.FC = () => {
  const { draft, updateCopy } = useCms();
  const copy = draft.copy;

  const handleUpdate = (field: keyof SiteCopy, value: any) => {
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
            Textos, Títulos & Botões (Copywriting)
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Personalize os títulos de impacto, legendas, chamadas para ação (CTAs) e links de cada seção da página.
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

      {/* 0. Top Announcement Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Megaphone className="w-5 h-5 text-[#FF5E14]" />
            <div>
              <h3 className="text-base font-bold text-white">Faixa de Aviso / Banner de Destaque</h3>
              <span className="text-xs text-neutral-400">Exibido no topo do site para avisos e promoções</span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={copy.banner_enabled || false}
              onChange={(e) => handleUpdate('banner_enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5E14]" />
          </label>
        </div>

        {copy.banner_enabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Texto do Banner
              </label>
              <input
                type="text"
                value={copy.banner_text || ''}
                onChange={(e) => handleUpdate('banner_text', e.target.value)}
                placeholder="Ex: 🚀 Condições especiais para novos projetos este mês. Agende sua reunião estratégica!"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={copy.banner_button || ''}
                  onChange={(e) => handleUpdate('banner_button', e.target.value)}
                  placeholder="Falar no WhatsApp"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                  Link de Destino
                </label>
                <input
                  type="text"
                  value={copy.banner_link || ''}
                  onChange={(e) => handleUpdate('banner_link', e.target.value)}
                  placeholder="https://wa.me/... ou #contato"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Hero Section Copy */}
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
                Título Linha 2 (Destaque em Gradiente Laranja)
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">
                Botão Principal (CTA)
              </label>
              <input
                type="text"
                value={copy.hero_cta_primary}
                onChange={(e) => handleUpdate('hero_cta_primary', e.target.value)}
                placeholder="Rótulo do Botão"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-[#FF5E14]"
              />
              <input
                type="text"
                value={copy.hero_cta_primary_link || ''}
                onChange={(e) => handleUpdate('hero_cta_primary_link', e.target.value)}
                placeholder="Link personalizado (em branco = WhatsApp automático)"
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/5 text-neutral-400 text-[11px] font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">
                Botão Secundário
              </label>
              <input
                type="text"
                value={copy.hero_cta_secondary}
                onChange={(e) => handleUpdate('hero_cta_secondary', e.target.value)}
                placeholder="Rótulo do Botão"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase focus:outline-none focus:border-[#FF5E14]"
              />
              <input
                type="text"
                value={copy.hero_cta_secondary_link || '#projetos'}
                onChange={(e) => handleUpdate('hero_cta_secondary_link', e.target.value)}
                placeholder="#projetos"
                className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/5 text-neutral-400 text-[11px] font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Linha de Apoio aos Serviços (Abaixo dos Botões)
            </label>
            <input
              type="text"
              value={copy.hero_services_line || 'Social Media • Filmmaker • Design • Branding • Posicionamento'}
              onChange={(e) => handleUpdate('hero_services_line', e.target.value)}
              placeholder="Social Media • Filmmaker • Design • Branding • Posicionamento"
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
            />
          </div>
        </div>
      </div>

      {/* 2. First Impact Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Sparkles className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Primeiro Impacto (O Posicionamento)</h3>
            <span className="text-xs text-neutral-400">Mensagem que estabelece a tese da marca</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Chapéu da Seção
            </label>
            <input
              type="text"
              value={copy.first_impact_kicker || 'O Posicionamento'}
              onChange={(e) => handleUpdate('first_impact_kicker', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Título Central
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
              Frase de Apoio / Citação
            </label>
            <textarea
              rows={2}
              value={copy.first_impact_subtitle || ''}
              onChange={(e) => handleUpdate('first_impact_subtitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>
        </div>
      </div>

      {/* 3. Brand Statement */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <MessageSquare className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Declaração de Marca (Brand Statement)</h3>
            <span className="text-xs text-neutral-400">Grande manifesto sobre percepção de valor</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Declaração / Citação Central
            </label>
            <textarea
              rows={3}
              value={copy.brand_statement_quote}
              onChange={(e) => handleUpdate('brand_statement_quote', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-bold uppercase focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
              Subtítulo do Manifesto
            </label>
            <input
              type="text"
              value={copy.brand_statement_subtitle || 'Estratégia · Posicionamento · Presença Real'}
              onChange={(e) => handleUpdate('brand_statement_subtitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
            />
          </div>
        </div>
      </div>

      {/* 4. Services & Portfolio Headers */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Layers className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Cabeçalhos das Seções de Serviços e Portfólio</h3>
            <span className="text-xs text-neutral-400">Kickers e chamadas introdutórias</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase">Seção de Serviços</h4>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Kicker</label>
              <input
                type="text"
                value={copy.services_kicker}
                onChange={(e) => handleUpdate('services_kicker', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Título</label>
              <input
                type="text"
                value={copy.services_headline}
                onChange={(e) => handleUpdate('services_headline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Subtítulo</label>
              <textarea
                rows={2}
                value={copy.services_subtitle}
                onChange={(e) => handleUpdate('services_subtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14] resize-y"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase">Seção de Portfólio</h4>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Kicker</label>
              <input
                type="text"
                value={copy.portfolio_kicker}
                onChange={(e) => handleUpdate('portfolio_kicker', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Título</label>
              <input
                type="text"
                value={copy.portfolio_headline}
                onChange={(e) => handleUpdate('portfolio_headline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Final Conversion Section */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Link do Botão Final (Opcional)
              </label>
              <input
                type="text"
                value={copy.final_cta_button_link || ''}
                onChange={(e) => handleUpdate('final_cta_button_link', e.target.value)}
                placeholder="Em branco = WhatsApp automático"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Link2, ExternalLink, ArrowRight } from 'lucide-react';

export const SiteLinksView: React.FC = () => {
  const { draft, updateCopy, getWhatsAppUrl } = useCms();
  const copy = draft.copy;

  const handleUpdate = (key: keyof typeof copy, val: string) => {
    updateCopy({ [key]: val });
  };

  const currentWhatsAppLink = getWhatsAppUrl();

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Botões e Links de Ação
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Controle central de todos os botões de conversão e destinos no site. Deixe o campo de link vazio para direcionar automaticamente ao WhatsApp com mensagem contextual.
        </p>
      </div>

      <div className="space-y-4">
        {/* Item 1: Hero Botão Primário */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              01. Botão Principal do Hero (Abertura)
            </span>
            <span className="text-[10px] font-mono text-[#FF5E14] bg-[#FF5E14]/10 px-2 py-0.5 rounded">
              Destaque Máximo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                value={copy.hero_cta_primary || ''}
                onChange={(e) => handleUpdate('hero_cta_primary', e.target.value)}
                placeholder="QUERO VIRAR A CHAVE"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Link de Destino
              </label>
              <input
                type="text"
                value={copy.hero_cta_primary_link || ''}
                onChange={(e) => handleUpdate('hero_cta_primary_link', e.target.value)}
                placeholder="Vazio = WhatsApp automático com mensagem"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>

        {/* Item 2: Hero Botão Secundário */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              02. Botão Secundário do Hero
            </span>
            <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
              Âncora Interna
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                value={copy.hero_cta_secondary || ''}
                onChange={(e) => handleUpdate('hero_cta_secondary', e.target.value)}
                placeholder="VER NOSSOS TRABALHOS"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Link de Destino
              </label>
              <input
                type="text"
                value={copy.hero_cta_secondary_link || ''}
                onChange={(e) => handleUpdate('hero_cta_secondary_link', e.target.value)}
                placeholder="#projetos"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>

        {/* Item 3: Conversão Final CTA */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              03. Botão de Conversão Final (Rodapé)
            </span>
            <span className="text-[10px] font-mono text-[#FF5E14] bg-[#FF5E14]/10 px-2 py-0.5 rounded">
              Conversão Comercial
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                value={copy.final_cta_button || ''}
                onChange={(e) => handleUpdate('final_cta_button', e.target.value)}
                placeholder="Quero Virar a Chave"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Link de Destino
              </label>
              <input
                type="text"
                value={copy.final_cta_button_link || ''}
                onChange={(e) => handleUpdate('final_cta_button_link', e.target.value)}
                placeholder="Vazio = WhatsApp automático com mensagem"
                className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>

        {/* Item 4: Botão de Seguir no Instagram */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              04. Botão de Seguir no Instagram
            </span>
            <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
              Rede Social
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Texto do Botão
            </label>
            <input
              type="text"
              value={copy.instagram_button_text || ''}
              onChange={(e) => handleUpdate('instagram_button_text', e.target.value)}
              placeholder="Seguir @virattamarketing"
              className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

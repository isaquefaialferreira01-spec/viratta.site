import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Megaphone, ExternalLink } from 'lucide-react';

export const MediaBannersView: React.FC = () => {
  const { draft, updateCopy } = useCms();
  const copy = draft.copy;

  const handleUpdate = (field: keyof typeof copy, value: any) => {
    updateCopy({ [field]: value });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Banners de Destaque
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Faixa superior de aviso e promoções temporárias no topo do site oficial.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF5E14]/10 text-[#FF5E14] flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Faixa de Aviso no Topo (Announcement Banner)
              </span>
              <span className="text-xs text-neutral-400 font-light">
                Exibido acima do menu superior de navegação
              </span>
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

        {copy.banner_enabled ? (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Mensagem do Banner
              </label>
              <input
                type="text"
                value={copy.banner_text || ''}
                onChange={(e) => handleUpdate('banner_text', e.target.value)}
                placeholder="🚀 Condições especiais para novos projetos este mês. Agende sua reunião estratégica!"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={copy.banner_button || ''}
                  onChange={(e) => handleUpdate('banner_button', e.target.value)}
                  placeholder="Falar no WhatsApp"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Link de Destino (Opcional)
                </label>
                <input
                  type="text"
                  value={copy.banner_link || ''}
                  onChange={(e) => handleUpdate('banner_link', e.target.value)}
                  placeholder="Vazio = WhatsApp automático"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="pt-3">
              <span className="text-[11px] font-mono uppercase text-neutral-400 mb-2 block">
                Pré-visualização do Banner:
              </span>
              <div className="p-2.5 rounded-lg bg-[#FF5E14] text-white flex items-center justify-between gap-3 text-xs font-medium shadow-md">
                <span className="truncate">{copy.banner_text || 'Mensagem do banner de exemplo'}</span>
                <span className="px-2.5 py-1 rounded bg-black text-white text-[10px] font-bold shrink-0">
                  {copy.banner_button || 'Ação'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-black/30 border border-white/5 text-neutral-400 text-xs text-center font-light">
            O banner do topo está atualmente <strong className="text-white">desativado</strong>. Ative a chave acima para configurá-lo e exibi-lo no site público.
          </div>
        )}
      </div>
    </div>
  );
};

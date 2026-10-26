import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { MessageSquare, ExternalLink, Check, Smartphone } from 'lucide-react';

export const ContactWhatsAppView: React.FC = () => {
  const { draft, updateSettings, getWhatsAppUrl } = useCms();
  const settings = draft.settings;

  const handleChange = (key: keyof typeof settings, val: string) => {
    updateSettings({ [key]: val });
  };

  const previewUrl = getWhatsAppUrl();

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          WhatsApp Oficial
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Canal principal de conversão comercial. Todos os botões do site e o botão flutuante utilizam esta configuração.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-3">
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Código do País (DDI)
            </label>
            <input
              type="text"
              value={settings.whatsapp_country}
              onChange={(e) => handleChange('whatsapp_country', e.target.value)}
              placeholder="55"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              DDD
            </label>
            <input
              type="text"
              value={settings.whatsapp_ddd}
              onChange={(e) => handleChange('whatsapp_ddd', e.target.value)}
              placeholder="21"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Número de Telefone
            </label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => handleChange('whatsapp_number', e.target.value)}
              placeholder="993074326"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#FF5E14]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
            Mensagem Padrão Inicial
          </label>
          <textarea
            rows={3}
            value={settings.whatsapp_default_message}
            onChange={(e) => handleChange('whatsapp_default_message', e.target.value)}
            placeholder="Olá! Conheci a VIRATTA pelo site e quero entender como transformar a comunicação da minha empresa."
            className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
          />
        </div>

        {/* Live URL test button */}
        <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-0.5">
              Link Gerado:
            </span>
            <span className="text-xs text-neutral-300 font-mono truncate block max-w-lg">
              {previewUrl}
            </span>
          </div>

          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testar no WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

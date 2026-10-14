import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { MessageSquare, Mail, MapPin, ExternalLink, Save, Check } from 'lucide-react';

export const ContactsTab: React.FC = () => {
  const { draft, updateSettings, getWhatsAppUrl } = useCms();
  const [copied, setCopied] = useState(false);

  const settings = draft.settings;

  const handleCopyLink = () => {
    const url = getWhatsAppUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Configuração de WhatsApp & Contatos Oficiais
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
          Ao atualizar os dados abaixo, todos os botões de contato, chamadas para ação da Hero, 
          cards de serviços e o botão flutuante serão atualizados automaticamente com o novo número.
        </p>
      </div>

      {/* WhatsApp Section Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-[#FF5E14]/10 text-[#FF5E14] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Canal Principal: WhatsApp</h3>
            <span className="text-xs text-neutral-400">Direciona todos os leads comerciais da VIRATTA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-3">
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
              DDI (País)
            </label>
            <input
              type="text"
              value={settings.whatsapp_country}
              onChange={(e) => updateSettings({ whatsapp_country: e.target.value })}
              placeholder="55"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] font-mono"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">Brasil = 55</span>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
              DDD
            </label>
            <input
              type="text"
              value={settings.whatsapp_ddd}
              onChange={(e) => updateSettings({ whatsapp_ddd: e.target.value })}
              placeholder="11"
              maxLength={3}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] font-mono"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">Ex: 11, 21, 19</span>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
              Número de Telefone (WhatsApp)
            </label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => updateSettings({ whatsapp_number: e.target.value })}
              placeholder="999999999"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] font-mono"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">Apenas números (8 ou 9 dígitos)</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
            Mensagem Padrão Pré-preenchida no WhatsApp
          </label>
          <textarea
            rows={3}
            value={settings.whatsapp_default_message}
            onChange={(e) => updateSettings({ whatsapp_default_message: e.target.value })}
            placeholder="Mensagem enviada automaticamente quando o cliente clica para falar no WhatsApp..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] font-sans resize-y"
          />
          <span className="text-[10px] text-neutral-500 mt-1 block">
            Dica: use um tom profissional e acolhedor para incentivar a primeira mensagem.
          </span>
        </div>

        {/* Live WhatsApp preview & test */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-neutral-300 block">Link gerado para os visitantes:</span>
            <code className="text-xs text-[#FF5E14] break-all block">
              {getWhatsAppUrl()}
            </code>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <span>Testar WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Institutional Contacts (Email & Location) */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">E-mail & Localização Institucional</h3>
            <span className="text-xs text-neutral-400">Exibidos no rodapé e comunicações formais</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateSettings({ email: e.target.value })}
                placeholder="contato@virattamarketing.com.br"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
              Localização / Praça de Atendimento
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={settings.location}
                onChange={(e) => updateSettings({ location: e.target.value })}
                placeholder="São Paulo, SP — Atendimento Brasil"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
            Slogan / Frase Curta Institucional (Rodapé)
          </label>
          <input
            type="text"
            value={settings.tagline || ''}
            onChange={(e) => updateSettings({ tagline: e.target.value })}
            placeholder="Destrave a percepção da sua marca."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
          />
        </div>
      </div>
    </div>
  );
};

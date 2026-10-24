import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SocialLinks } from '../../../types/cms';
import { Linkedin, Youtube, Share2, Facebook, Mail, MapPin } from 'lucide-react';

export const ContactSocialView: React.FC = () => {
  const { draft, updateSocial, updateSettings } = useCms();
  const social = draft.social;
  const settings = draft.settings;

  const handleSocialChange = (network: keyof SocialLinks, url: string, active: boolean) => {
    updateSocial({
      [network]: { url, active },
    });
  };

  const handleSettingsChange = (field: 'email' | 'location', val: string) => {
    updateSettings({ [field]: val });
  };

  const networks: Array<{
    key: keyof SocialLinks;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
  }> = [
    {
      key: 'linkedin',
      label: 'LinkedIn Company',
      placeholder: 'https://linkedin.com/company/virattamarketing',
      icon: <Linkedin className="w-4 h-4 text-sky-400" />,
    },
    {
      key: 'youtube',
      label: 'Canal no YouTube',
      placeholder: 'https://youtube.com/@virattamarketing',
      icon: <Youtube className="w-4 h-4 text-rose-500" />,
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      placeholder: 'https://tiktok.com/@virattamarketing',
      icon: <Share2 className="w-4 h-4 text-teal-400" />,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      placeholder: 'https://facebook.com/virattamarketing',
      icon: <Facebook className="w-4 h-4 text-blue-500" />,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Redes Sociais & Contatos Institucionais
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Canais de comunicação complementares exibidos no rodapé do site.
        </p>
      </div>

      {/* Social Networks List */}
      <div className="space-y-3">
        {networks.map(({ key, label, placeholder, icon }) => {
          const item = social[key] || { url: '', active: false };

          return (
            <div
              key={key}
              className="p-4 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    {label}
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={(e) => handleSocialChange(key, item.url, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF5E14]" />
                </label>
              </div>

              <div>
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => handleSocialChange(key, e.target.value, item.active)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Email & Physical Location */}
      <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
        <span className="text-xs font-mono font-bold uppercase text-neutral-300">
          Dados Corporativos
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingsChange('email', e.target.value)}
                placeholder="contato@virattamarketing.com.br"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Localização & Sede
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={settings.location}
                onChange={(e) => handleSettingsChange('location', e.target.value)}
                placeholder="São Paulo, SP — Atendimento Brasil"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

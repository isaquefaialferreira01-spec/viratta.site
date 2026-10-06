import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SocialLinks } from '../../../types/cms';
import { Instagram, Linkedin, Share2, Youtube } from 'lucide-react';

export const SocialTab: React.FC = () => {
  const { draft, updateSocial } = useCms();
  const social = draft.social;

  const handleUpdate = (network: keyof SocialLinks, url: string, active: boolean) => {
    updateSocial({
      [network]: { url, active },
    });
  };

  const networks: Array<{
    key: keyof SocialLinks;
    name: string;
    placeholder: string;
    icon: React.ReactNode;
  }> = [
    {
      key: 'instagram',
      name: 'Instagram Oficial',
      placeholder: 'https://instagram.com/virattamarketing',
      icon: <Instagram className="w-5 h-5 text-[#FF5E14]" />,
    },
    {
      key: 'linkedin',
      name: 'LinkedIn Company',
      placeholder: 'https://linkedin.com/company/viratta',
      icon: <Linkedin className="w-5 h-5 text-sky-400" />,
    },
    {
      key: 'youtube',
      name: 'Canal no YouTube',
      placeholder: 'https://youtube.com/@virattamarketing',
      icon: <Youtube className="w-5 h-5 text-rose-500" />,
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      placeholder: 'https://tiktok.com/@virattamarketing',
      icon: <Share2 className="w-5 h-5 text-teal-400" />,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Redes Sociais & Canais Externos
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
          Ative ou desative links para as redes oficiais da VIRATTA exibidos no rodapé e menu.
        </p>
      </div>

      <div className="space-y-4">
        {networks.map(({ key, name, placeholder, icon }) => {
          const item = social[key];

          return (
            <div
              key={key}
              className="p-5 md:p-6 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{name}</h3>
                    <span className="text-[11px] text-neutral-400">
                      {item.active ? 'Ativo no site' : 'Desativado'}
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={(e) => handleUpdate(key, item.url, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5E14]" />
                </label>
              </div>

              <div>
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => handleUpdate(key, e.target.value, item.active)}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

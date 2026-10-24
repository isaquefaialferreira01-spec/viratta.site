import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Instagram, ExternalLink } from 'lucide-react';

export const ContactInstagramView: React.FC = () => {
  const { draft, updateSocial } = useCms();
  const instagram = draft.social.instagram;

  const handleUrlChange = (url: string) => {
    updateSocial({
      instagram: { ...instagram, url },
    });
  };

  const handleToggle = (active: boolean) => {
    updateSocial({
      instagram: { ...instagram, active },
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Instagram Oficial
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Canal principal de mídia e bastidores da marca VIRATTA.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Perfil Oficial no Instagram
              </span>
              <span className="text-xs text-neutral-400 font-light">
                Exibido no rodapé e na seção de bastidores
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={instagram.active}
              onChange={(e) => handleToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5E14]" />
          </label>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
            URL Completa do Perfil
          </label>
          <input
            type="text"
            value={instagram.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://www.instagram.com/viratta.marketing/"
            className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#FF5E14]"
          />
        </div>

        {instagram.url && (
          <div className="pt-2">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#FF5E14] hover:underline font-mono"
            >
              <span>Abrir perfil no Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

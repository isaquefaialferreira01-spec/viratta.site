import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SocialLinks, ReelItem } from '../../../types/cms';
import { DEFAULT_REELS } from '../../../lib/cmsDefaults';
import { Instagram, Linkedin, Share2, Youtube, Film, Eye, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';

export const SocialTab: React.FC = () => {
  const { draft, updateSocial, updateReels } = useCms();
  const social = draft.social;
  const reels = (draft.reels && draft.reels.length > 0) ? draft.reels : DEFAULT_REELS;

  const handleUpdate = (network: keyof SocialLinks, url: string, active: boolean) => {
    updateSocial({
      [network]: { url, active },
    });
  };

  const handleReelChange = (index: number, field: keyof ReelItem, value: any) => {
    const updated = [...reels];
    updated[index] = { ...updated[index], [field]: value };
    updateReels(updated);
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
          Redes Sociais & Área de Conteúdo
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
          Gerencie os canais de redes sociais oficiais e os vídeos em destaque na seção de Reels e bastidores.
        </p>
      </div>

      {/* 1. Official Social Networks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
          Canais Sociais Oficiais
        </h3>
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

      {/* 2. Instagram & Reels Media Grid */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Film className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Cards de Reels & Bastidores (Grade 9:16)</h3>
            <span className="text-xs text-neutral-400">
              Personalize capas, contagem de visualizações e links dos 4 vídeos exibidos na página inicial
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reels.map((reel, idx) => (
            <div
              key={reel.id || idx}
              className="p-5 rounded-xl bg-black/50 border border-white/5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-[#FF5E14]">0{idx + 1}</span>
                  <span>{reel.title || `Reel ${idx + 1}`}</span>
                </span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reel.is_active !== false}
                    onChange={(e) => handleReelChange(idx, 'is_active', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF5E14]" />
                </label>
              </div>

              {/* Cover Image Upload / Replace */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1.5">
                  Capa do Vídeo (Aspecto 9:16)
                </label>
                <ImageUploadDropzone
                  value={reel.image}
                  onChange={(url) => handleReelChange(idx, 'image', url)}
                  folder="site"
                  label={`Capa Vídeo 0${idx + 1}`}
                  recommendedDimensions="1080x1920px (JPG/WebP/PNG)"
                  aspectRatio="portrait"
                  compact
                />
              </div>

              {/* Title & Views */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">
                    Título / Descrição Curta
                  </label>
                  <input
                    type="text"
                    value={reel.title}
                    onChange={(e) => handleReelChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Visualizações
                    </label>
                    <input
                      type="text"
                      value={reel.views}
                      onChange={(e) => handleReelChange(idx, 'views', e.target.value)}
                      placeholder="Ex: 24.5k"
                      className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Tipo de Mídia
                    </label>
                    <input
                      type="text"
                      value={reel.type || 'Reels'}
                      onChange={(e) => handleReelChange(idx, 'type', e.target.value)}
                      placeholder="Reels"
                      className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">
                    Link Direto do Vídeo / Reel
                  </label>
                  <input
                    type="url"
                    value={reel.url || ''}
                    onChange={(e) => handleReelChange(idx, 'url', e.target.value)}
                    placeholder="https://instagram.com/reel/..."
                    className="w-full px-3 py-2 rounded-lg bg-black/70 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

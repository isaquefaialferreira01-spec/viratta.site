import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SeoSettings } from '../../../types/cms';
import { Search, Globe, Share2, Sparkles } from 'lucide-react';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';

export const SeoView: React.FC = () => {
  const { draft, updateSeo } = useCms();
  const seo = draft.seo;

  const handleUpdate = (field: keyof SeoSettings, val: any) => {
    updateSeo({ [field]: val });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Otimização para Buscadores (SEO)
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Configure as meta tags do Google, Open Graph para compartilhamentos no WhatsApp e Twitter Cards.
        </p>
      </div>

      <div className="space-y-5">
        {/* Basic SEO */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300">
            Indexação & Google Search
          </span>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Título da Página (Title Tag)
            </label>
            <input
              type="text"
              value={seo.site_title || ''}
              onChange={(e) => handleUpdate('site_title', e.target.value)}
              placeholder="VIRATTA MARKETING — Destrave a Percepção da Sua Marca"
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Meta Descrição (Snippet de Busca)
            </label>
            <textarea
              rows={3}
              value={seo.meta_description || ''}
              onChange={(e) => handleUpdate('meta_description', e.target.value)}
              placeholder="Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm."
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Palavras-chave (Keywords)
              </label>
              <input
                type="text"
                value={seo.keywords || ''}
                onChange={(e) => handleUpdate('keywords', e.target.value)}
                placeholder="marketing, audiovisual, branding, posicionamento"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                URL Canônica Oficial
              </label>
              <input
                type="text"
                value={seo.canonical_url || ''}
                onChange={(e) => handleUpdate('canonical_url', e.target.value)}
                placeholder="https://virattamarketing.com.br"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>
        </div>

        {/* Social / OpenGraph Image */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300">
            Card de Compartilhamento (WhatsApp, LinkedIn, Twitter)
          </span>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Imagem do Card Social (1200x630px recomendado)
            </label>
            <ImageUploadDropzone
              value={seo.og_image_url || '/viratta-official-logo.png'}
              onChange={(url) => handleUpdate('og_image_url', url)}
              folder="seo"
              label="Imagem Social (OG Image)"
              recommendedDimensions="1200x630px (JPG ou PNG)"
              aspectRatio="og"
              previewBg="dark"
            />
          </div>
        </div>

        {/* Live Search Engine SERP Preview */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Prévia de Resultado no Google Search
          </span>

          <div className="p-4 rounded-xl bg-black border border-white/10 max-w-2xl space-y-1 font-sans">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="truncate">{seo.canonical_url || 'https://virattamarketing.com.br'}</span>
            </div>
            <h2 className="text-[#8ab4f8] text-base hover:underline cursor-pointer font-medium leading-snug">
              {seo.site_title || 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca'}
            </h2>
            <p className="text-xs text-[#bdc1c6] leading-relaxed line-clamp-2">
              {seo.meta_description || 'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

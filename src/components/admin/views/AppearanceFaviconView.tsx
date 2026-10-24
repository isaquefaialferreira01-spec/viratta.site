import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { Bookmark, Globe } from 'lucide-react';

export const AppearanceFaviconView: React.FC = () => {
  const { draft, updateAppearance } = useCms();
  const appearance = draft.appearance;

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Ícone Favicon do Navegador
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          O ícone que aparece na aba do navegador ao lado do título da página.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-5">
        {/* Browser Tab Simulation Preview */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Simulação da Aba do Navegador
          </span>
          <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-t-lg bg-[#18191E] border-t border-x border-white/10 text-xs text-white max-w-xs shadow-inner">
              <img
                src={appearance.favicon_url || '/favicon.ico'}
                alt="Favicon"
                className="w-4 h-4 object-contain"
              />
              <span className="truncate font-medium text-xs">
                {draft.seo.site_title || 'VIRATTA MARKETING'}
              </span>
            </div>
          </div>
        </div>

        {/* Upload / Replace via Supabase Storage */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Substituir Ícone Favicon
          </span>
          <ImageUploadDropzone
            value={appearance.favicon_url || '/favicon.ico'}
            onChange={(url) => updateAppearance({ favicon_url: url })}
            folder="branding"
            label="Ícone Favicon"
            recommendedDimensions="512x512px (ICO ou PNG quadrado)"
            aspectRatio="square"
            previewBg="dark"
          />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export const AppearanceLogoView: React.FC = () => {
  const { draft, updateAppearance } = useCms();
  const appearance = draft.appearance;

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Logotipo Oficial da Marca
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Arquivo mestre do logotipo aplicado no cabeçalho, rodapé e componentes oficiais do site.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-5">
        {/* Current Preview */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Logotipo Atual em Uso
          </span>
          <div className="h-28 w-full rounded-xl bg-black border border-white/10 p-6 flex items-center justify-center">
            {appearance.logo_url ? (
              <img
                src={appearance.logo_url}
                alt={appearance.logo_alt || 'Logotipo Oficial VIRATTA'}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-xs text-neutral-500 font-mono">Nenhum logotipo customizado configurado</span>
            )}
          </div>
        </div>

        {/* Upload / Replace with Supabase Storage */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Substituir Logotipo (Supabase Storage)
          </span>
          <ImageUploadDropzone
            value={appearance.logo_url || '/viratta-official-logo.png'}
            onChange={(url) => updateAppearance({ logo_url: url })}
            folder="branding"
            label="Logotipo Oficial Viratta"
            recommendedDimensions="2159x728px (PNG transparente ou SVG vetorial)"
            aspectRatio="logo"
            previewBg="dark"
          />
        </div>

        {/* Alt text field */}
        <div>
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
            Texto Alternativo (Alt Text para Acessibilidade & SEO)
          </label>
          <input
            type="text"
            value={appearance.logo_alt || 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca'}
            onChange={(e) => updateAppearance({ logo_alt: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
          />
        </div>
      </div>
    </div>
  );
};

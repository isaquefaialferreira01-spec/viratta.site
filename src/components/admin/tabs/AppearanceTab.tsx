import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Palette, RotateCcw, Image, Sparkles, Check, Type } from 'lucide-react';
import { DEFAULT_VIRATTA_COLORS } from '../../../lib/cmsDefaults';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';

export const AppearanceTab: React.FC = () => {
  const { draft, updateAppearance, restoreDefaultColors } = useCms();
  const appearance = draft.appearance;

  const handleColorChange = (key: keyof typeof appearance, val: string) => {
    updateAppearance({ [key]: val });
  };

  const fontOptions = [
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Oficial Viratta)', desc: 'Moderna, geométrica e com excelente legibilidade' },
    { id: 'Inter', label: 'Inter', desc: 'Neogrotesca neutra, ideal para interfaces corporativas' },
    { id: 'Syne', label: 'Syne', desc: 'Display editorial expressivo e marcante' },
    { id: 'Montserrat', label: 'Montserrat', desc: 'Clássica, equilibrada e com alto impacto' },
    { id: 'Outfit', label: 'Outfit', desc: 'Contemporânea com curvas suaves' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Identidade Visual & Cores Oficiais
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Controle do logotipo oficial, favicon, tipografia do sistema e paleta cromática com injeção em tempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={restoreDefaultColors}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrões da Marca</span>
        </button>
      </div>

      {/* 1. Logos & Brand Assets (Supabase Storage) */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Image className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Logotipo Oficial & Favicon</h3>
            <span className="text-xs text-neutral-400">Armazenados no bucket viratta-assets via Supabase Storage</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Logo */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-neutral-200">
              Logotipo Principal (Cabeçalho e Rodapé)
            </label>
            <ImageUploadDropzone
              value={appearance.logo_url || '/viratta-official-logo.png'}
              onChange={(url) => updateAppearance({ logo_url: url })}
              folder="branding"
              label="Logotipo Viratta"
              recommendedDimensions="2159x728px (PNG transparente ou SVG)"
              aspectRatio="video"
              previewBg="dark"
            />
          </div>

          {/* Favicon */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-neutral-200">
              Favicon da Aba do Navegador
            </label>
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

      {/* 2. Typography / Font Selection */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Type className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Tipografia do Site</h3>
            <span className="text-xs text-neutral-400">Fonte tipográfica aplicada a títulos, parágrafos e botões</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fontOptions.map((font) => {
            const isSelected = (appearance.font_family || 'Plus Jakarta Sans') === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateAppearance({ font_family: font.id })}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#FF5E14]/10 border-[#FF5E14] text-white shadow-sm'
                    : 'bg-black/40 border-white/5 text-neutral-300 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: `"${font.id}", sans-serif` }}>
                    {font.label}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 font-light">
                    {font.desc}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#FF5E14] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Color Palette Grid */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Palette className="w-5 h-5 text-[#FF5E14]" />
          <div>
            <h3 className="text-base font-bold text-white">Paleta Cromática do Sistema</h3>
            <span className="text-xs text-neutral-400">Controle de contraste e tonalidades de marca</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Color */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-300">Cor Primária (Destaque)</span>
              <div
                className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                style={{ backgroundColor: appearance.primary_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={appearance.primary_color}
                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={appearance.primary_color}
                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
              />
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Padrão Viratta: <code className="text-[#FF5E14]">#FF5E14</code>
            </span>
          </div>

          {/* Background Color */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-300">Fundo Geral (Background)</span>
              <div
                className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                style={{ backgroundColor: appearance.background_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={appearance.background_color}
                onChange={(e) => handleColorChange('background_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={appearance.background_color}
                onChange={(e) => handleColorChange('background_color', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
              />
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Padrão Viratta: <code>#070708</code>
            </span>
          </div>

          {/* Surface Color */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-300">Superfície dos Cards</span>
              <div
                className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                style={{ backgroundColor: appearance.surface_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={appearance.surface_color}
                onChange={(e) => handleColorChange('surface_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={appearance.surface_color}
                onChange={(e) => handleColorChange('surface_color', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
              />
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Padrão Viratta: <code>#0E0F12</code>
            </span>
          </div>

          {/* Text Color */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-300">Texto Principal</span>
              <div
                className="w-6 h-6 rounded-lg border border-white/20 shadow-sm"
                style={{ backgroundColor: appearance.text_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={appearance.text_color}
                onChange={(e) => handleColorChange('text_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={appearance.text_color}
                onChange={(e) => handleColorChange('text_color', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
              />
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Padrão Viratta: <code>#F3F4F6</code>
            </span>
          </div>
        </div>

        {/* Live Swatch Preview */}
        <div className="mt-8 p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
          <span className="text-xs font-mono uppercase text-neutral-400 block">
            Amostra visual em tempo real
          </span>

          <div
            className="p-6 rounded-xl border transition-colors space-y-3"
            style={{
              backgroundColor: appearance.surface_color,
              borderColor: appearance.primary_color + '40',
              color: appearance.text_color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold" style={{ color: appearance.primary_color }}>
                Demonstração de Contraste
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10">Ao Vivo</span>
            </div>
            <h4 className="text-base font-extrabold text-white">
              Estratégia & Posicionamento de Marca
            </h4>
            <p className="text-xs font-light text-neutral-300">
              Visualização da combinação entre fundo escuro, superfície dos cards e realce laranja característico da VIRATTA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

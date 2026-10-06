import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Palette, RotateCcw, Sparkles, Check } from 'lucide-react';
import { DEFAULT_VIRATTA_COLORS } from '../../../lib/cmsDefaults';

export const AppearanceTab: React.FC = () => {
  const { draft, updateAppearance, restoreDefaultColors } = useCms();
  const colors = draft.appearance;

  const handleColorChange = (key: keyof typeof colors, val: string) => {
    updateAppearance({ [key]: val });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Identidade Visual & Cores Oficiais
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            As alterações de cores são injetadas em tempo real através de variáveis CSS globais no navegador.
          </p>
        </div>

        <button
          type="button"
          onClick={restoreDefaultColors}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Cores Padrão</span>
        </button>
      </div>

      {/* Color Palette Grid */}
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
                style={{ backgroundColor: colors.primary_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.primary_color}
                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.primary_color}
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
                style={{ backgroundColor: colors.background_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.background_color}
                onChange={(e) => handleColorChange('background_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.background_color}
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
                style={{ backgroundColor: colors.surface_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.surface_color}
                onChange={(e) => handleColorChange('surface_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.surface_color}
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
                style={{ backgroundColor: colors.text_color }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.text_color}
                onChange={(e) => handleColorChange('text_color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.text_color}
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
            Amostra visual em tempo real (Componente de demonstração)
          </span>

          <div
            className="p-6 rounded-xl border transition-colors space-y-3"
            style={{
              backgroundColor: colors.surface_color,
              borderColor: colors.primary_color + '40',
              color: colors.text_color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold" style={{ color: colors.primary_color }}>
                Exemplo de Card Institucional
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10">01</span>
            </div>
            <h4 className="text-base font-extrabold text-white">
              Estratégia & Posicionamento de Marca
            </h4>
            <p className="text-xs font-light text-neutral-300">
              Visualização de contraste entre fundo escuro e realce laranja característico da VIRATTA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

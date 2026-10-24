import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Palette, RotateCcw } from 'lucide-react';
import { DEFAULT_VIRATTA_COLORS } from '../../../lib/cmsDefaults';

interface ColorField {
  key: 'primary_color' | 'accent_color' | 'background_color' | 'surface_color' | 'text_color' | 'secondary_text_color';
  label: string;
  desc: string;
  defaultVal: string;
}

const COLOR_FIELDS: ColorField[] = [
  {
    key: 'primary_color',
    label: 'Primary (Laranja Oficial)',
    desc: 'Cor de assinatura dos botões, ícones principais e destaques dinâmicos.',
    defaultVal: DEFAULT_VIRATTA_COLORS.primary_color,
  },
  {
    key: 'accent_color',
    label: 'Accent (Âmbar / Laranja Claro)',
    desc: 'Usado em gradientes, brilhos secundários e efeitos de transição.',
    defaultVal: DEFAULT_VIRATTA_COLORS.accent_color || '#FFA726',
  },
  {
    key: 'background_color',
    label: 'Background (Fundo do Site)',
    desc: 'Tom escuro principal de fundo de todas as seções (Preto VIRATTA).',
    defaultVal: DEFAULT_VIRATTA_COLORS.background_color,
  },
  {
    key: 'surface_color',
    label: 'Surface (Cards e Painéis)',
    desc: 'Superfície de cartões, formulários e elementos suspensos.',
    defaultVal: DEFAULT_VIRATTA_COLORS.surface_color,
  },
  {
    key: 'text_color',
    label: 'Text (Texto Principal)',
    desc: 'Tipografia de alto contraste para leitura clara e títulos.',
    defaultVal: DEFAULT_VIRATTA_COLORS.text_color,
  },
  {
    key: 'secondary_text_color',
    label: 'Secondary Text (Texto de Apoio)',
    desc: 'Legendas, descrições secundárias e metadados.',
    defaultVal: DEFAULT_VIRATTA_COLORS.secondary_text_color || '#9CA3AF',
  },
];

export const AppearanceColorsView: React.FC = () => {
  const { draft, updateAppearance, restoreDefaultColors } = useCms();
  const appearance = draft.appearance;

  const handleColorChange = (key: string, val: string) => {
    updateAppearance({ [key]: val });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Paleta de Cores da Marca
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Tokens de design aplicados via variáveis CSS nativas em todo o site. Use o seletor ou insira o código HEX.
          </p>
        </div>

        <button
          type="button"
          onClick={restoreDefaultColors}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrões VIRATTA</span>
        </button>
      </div>

      {/* Colors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COLOR_FIELDS.map((f) => {
          const currentColor = ((appearance as any)[f.key] as string) || f.defaultVal;

          return (
            <div
              key={f.key}
              className="p-4 rounded-xl bg-[#0A0B0E] border border-white/5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 space-y-1">
                <span className="text-xs font-mono font-bold text-white block">
                  {f.label}
                </span>
                <p className="text-[11px] text-neutral-400 font-light leading-snug">
                  {f.desc}
                </p>
              </div>

              {/* Color picker + hex input */}
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="color"
                  value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#FF5E14'}
                  onChange={(e) => handleColorChange(f.key, e.target.value)}
                  className="w-9 h-9 rounded-lg border border-white/20 bg-transparent cursor-pointer p-0.5 shrink-0"
                  title="Abrir seletor de cor"
                />
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => handleColorChange(f.key, e.target.value)}
                  placeholder="#000000"
                  className="w-24 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Token Swatch Preview */}
      <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
        <span className="text-xs font-mono font-bold uppercase text-neutral-400">
          Amostra da Paleta Aplicada
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: appearance.primary_color }} />
            <span className="text-neutral-300 font-mono">Primária</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: appearance.accent_color || '#FFA726' }} />
            <span className="text-neutral-300 font-mono">Destaque</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: appearance.background_color }} />
            <span className="text-neutral-300 font-mono">Fundo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: appearance.surface_color }} />
            <span className="text-neutral-300 font-mono">Superfície</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs">
            <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: appearance.text_color }} />
            <span className="text-neutral-300 font-mono">Texto</span>
          </div>
        </div>
      </div>
    </div>
  );
};

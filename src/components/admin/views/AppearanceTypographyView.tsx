import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Type, Check } from 'lucide-react';

interface FontOption {
  id: string;
  name: string;
  family: string;
  desc: string;
}

const SUPPORTED_FONTS: FontOption[] = [
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans (Oficial VIRATTA)',
    family: '"Plus Jakarta Sans", sans-serif',
    desc: 'Geométrica, moderna e de alto padrão estético.',
  },
  {
    id: 'Inter',
    name: 'Inter',
    family: '"Inter", sans-serif',
    desc: 'Neutro-grotesca com máxima legibilidade em telas e dados.',
  },
  {
    id: 'Syne',
    name: 'Syne',
    family: '"Syne", sans-serif',
    desc: 'Display autoral expressivo, com peso editorial marcante.',
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    family: '"Montserrat", sans-serif',
    desc: 'Clássica, equilibrada e impactante em maiúsculas.',
  },
  {
    id: 'Outfit',
    name: 'Outfit',
    family: '"Outfit", sans-serif',
    desc: 'Contemporânea com curvas limpas e elegância digital.',
  },
];

export const AppearanceTypographyView: React.FC = () => {
  const { draft, updateAppearance } = useCms();
  const currentFont = draft.appearance.font_family || 'Plus Jakarta Sans';

  const handleSelectFont = (fontId: string) => {
    updateAppearance({ font_family: fontId });
  };

  const selectedFontMeta = SUPPORTED_FONTS.find((f) => f.id === currentFont) || SUPPORTED_FONTS[0];

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Tipografia do Sistema
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Selecione uma das famílias tipográficas homologadas pela VIRATTA para aplicação global imediata.
        </p>
      </div>

      {/* Font Select Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SUPPORTED_FONTS.map((font) => {
          const isSelected = currentFont === font.id;

          return (
            <div
              key={font.id}
              onClick={() => handleSelectFont(font.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-[#FF5E14]/10 border-[#FF5E14] text-white'
                  : 'bg-[#0A0B0E] border-white/5 hover:border-white/15 text-neutral-300'
              }`}
            >
              <div className="space-y-1">
                <span className="text-sm font-bold block" style={{ fontFamily: font.family }}>
                  {font.name}
                </span>
                <p className="text-xs text-neutral-400 font-light leading-snug">
                  {font.desc}
                </p>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                isSelected ? 'border-[#FF5E14] bg-[#FF5E14] text-white' : 'border-white/20'
              }`}>
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Typography Preview: Título, Texto, Botão */}
      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Pré-visualização em Tempo Real ({selectedFontMeta.name})
          </span>
          <span className="text-[10px] font-mono text-[#FF5E14] bg-[#FF5E14]/10 px-2 py-0.5 rounded">
            CSS Seguro
          </span>
        </div>

        <div className="space-y-4 pt-1" style={{ fontFamily: selectedFontMeta.family }}>
          {/* Título Preview */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              [ TÍTULO DE IMPACTO ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              SEU NEGÓCIO NÃO PRECISA PARECER PEQUENO.
            </h2>
          </div>

          {/* Texto Preview */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              [ TEXTO CORRIDO / PARÁGRAFO ]
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed font-light max-w-2xl">
              Uma boa empresa pode perder valor quando sua comunicação não acompanha a qualidade do que ela entrega. Transformamos posicionamento, audiovisual e design em autoridade real.
            </p>
          </div>

          {/* Botão Preview */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              [ BOTÃO DE AÇÃO ]
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5E14] text-white text-xs font-bold tracking-wider shadow-md"
            >
              QUERO VIRAR A CHAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

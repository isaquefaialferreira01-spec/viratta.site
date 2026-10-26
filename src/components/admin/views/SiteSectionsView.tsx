import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SectionVisibility } from '../../../types/cms';
import { Sliders, RotateCcw, Check, Eye } from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

interface SectionConfigItem {
  key: keyof SectionVisibility;
  label: string;
  description: string;
  recommended: boolean;
}

const SECTIONS_CONFIG: SectionConfigItem[] = [
  {
    key: 'hero',
    label: '01. Abertura Principal (Hero)',
    description: 'Impacto visual inicial, headline, tagline e botões de chamada rápida.',
    recommended: true,
  },
  {
    key: 'first_impact',
    label: '02. O Posicionamento (Primeiro Impacto)',
    description: 'Declaração sobre valor percepção: "Ser pequeno não significa parecer pequeno".',
    recommended: true,
  },
  {
    key: 'business_needs',
    label: '03. Diagnóstico Estratégico (Chat Interativo)',
    description: 'Diagnóstico interativo de necessidades da empresa com direcionamento.',
    recommended: true,
  },
  {
    key: 'numbers',
    label: '04. Estrutura Criativa & Números',
    description: 'Métricas de captações, produções audiovisuais e marcas atendidas.',
    recommended: true,
  },
  {
    key: 'marquee_services',
    label: '05. Marquee de Serviços (Laranja)',
    description: 'Faixa animada horizontal com as disciplinas essenciais da VIRATTA.',
    recommended: true,
  },
  {
    key: 'services',
    label: '06. Capacidades & Serviços Oficiais',
    description: 'Lista editorial minimalista dos 5 serviços com links para WhatsApp.',
    recommended: true,
  },
  {
    key: 'brand_statement',
    label: '07. Manifesto de Marca (Citação em Destaque)',
    description: 'Frase de impacto: "Nós não mudamos o seu negócio. Mudamos a forma como ele é percebido".',
    recommended: true,
  },
  {
    key: 'target_audience',
    label: '08. Para Quem é a VIRATTA (Público-Alvo)',
    description: 'Segmentos atendidos: clínicas, empresas, estúdios, indústrias e comércio.',
    recommended: true,
  },
  {
    key: 'method',
    label: '09. O Método VIRATTA (Passo a Passo)',
    description: 'Fases da assessoria: Diagnóstico, Identidade, Conteúdo e Posicionamento.',
    recommended: true,
  },
  {
    key: 'portfolio',
    label: '10. Casos de Impacto & Marquee de Clientes',
    description: 'Carrossel infinito com logotipos de clientes que viraram a chave.',
    recommended: true,
  },
  {
    key: 'testimonials',
    label: '11. Depoimentos em Movimento',
    description: 'Citações de fundadores e gestores de marcas transformadas.',
    recommended: true,
  },
  {
    key: 'difference',
    label: '12. O Que Faz da VIRATTA Diferente',
    description: 'Comparativo entre agências comuns de volume e assessoria autoral de valor.',
    recommended: true,
  },
  {
    key: 'philosophy',
    label: '13. Filosofia de Marca (Fundo Claro)',
    description: 'Seção de respiro estético com texto de autoridade.',
    recommended: true,
  },
  {
    key: 'about',
    label: '14. Sobre a VIRATTA',
    description: 'História, estúdio próprio, equipamentos cinematográficos e essência.',
    recommended: true,
  },
  {
    key: 'marquee_mantra',
    label: '15. Marquee Mantra (Fundo Escuro)',
    description: 'Faixa reversa: "SEJA VISTO • SEJA LEMBRADO • COMUNIQUE VALOR • VIRE A CHAVE".',
    recommended: true,
  },
  {
    key: 'instagram',
    label: '16. Instagram & Reels (Vídeos)',
    description: 'Grid com 4 Reels e bastidores audiovisuais da VIRATTA.',
    recommended: true,
  },
  {
    key: 'faq',
    label: '17. Perguntas Frequentes (FAQ & SEO)',
    description: 'Acordeão de dúvidas frequentes com marcação estruturada para SEO.',
    recommended: true,
  },
  {
    key: 'final_conversion',
    label: '18. Conversão Final (O Próximo Passo)',
    description: 'Chamada definitiva para agendar diagnóstico estratégico via WhatsApp.',
    recommended: true,
  },
];

export const SiteSectionsView: React.FC = () => {
  const { draft, updateSections } = useCms();
  const sections = draft.sections || ({} as SectionVisibility);

  const handleToggle = (key: keyof SectionVisibility) => {
    const currentVal = sections[key] !== false;
    updateSections({ [key]: !currentVal });
  };

  const handleActivateAll = () => {
    const allActive: Partial<SectionVisibility> = {};
    SECTIONS_CONFIG.forEach((s) => {
      allActive[s.key] = true;
    });
    updateSections(allActive);
  };

  const handleResetDefaults = () => {
    updateSections(DEFAULT_CMS_STATE.sections);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Visibilidade de Seções
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Ligue ou desligue módulos inteiros do site com atualização imediata no rascunho.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleActivateAll}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            Ativar Todas
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrão</span>
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-2">
        {SECTIONS_CONFIG.map((sec) => {
          const isEnabled = sections[sec.key] !== false;

          return (
            <div
              key={sec.key}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                isEnabled
                  ? 'bg-[#0A0B0E] border-white/5'
                  : 'bg-black/30 border-white/5 opacity-60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isEnabled ? 'text-white' : 'text-neutral-400'}`}>
                    {sec.label}
                  </span>
                  {sec.recommended && isEnabled && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                      Ativa
                    </span>
                  )}
                  {!isEnabled && (
                    <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.2 rounded">
                      Oculta
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {sec.description}
                </p>
              </div>

              {/* Clean Switch Toggle */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => handleToggle(sec.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5E14]" />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { SectionVisibility } from '../../../types/cms';
import { LayoutGrid, CheckSquare, Square } from 'lucide-react';

export const SectionsTab: React.FC = () => {
  const { draft, updateSections, updateMarquee, updateMantraMarquee } = useCms();
  const sections = draft.sections;

  const sectionDefinitions: Array<{
    key: keyof SectionVisibility;
    title: string;
    description: string;
  }> = [
    { key: 'hero', title: '10 & 11 — Hero Principal', description: 'Entrada com tipografia display, kickers e CTAs' },
    { key: 'first_impact', title: '12 — Primeiro Impacto', description: 'Headline de percepção e valor' },
    { key: 'business_needs', title: 'Necessidades & Chat IA', description: 'Diagnóstico interativo de necessidades com IA' },
    { key: 'numbers', title: '13 — Números Estruturais', description: 'Métricas em ticker com contagem animada' },
    { key: 'marquee_services', title: 'Faixa Marquee (Laranja)', description: 'Faixa contínua com palavras-chave de serviços' },
    { key: 'services', title: '14 — Capacidades Viratta', description: '5 serviços oficiais em cards minimalistas' },
    { key: 'brand_statement', title: '15 — Declaração de Marca', description: 'Citação em destaque com grid de iluminação' },
    { key: 'target_audience', title: '17 — Para Quem É / Não É', description: 'Filtro e qualificação de clientes ideais' },
    { key: 'method', title: '18 — Método (O Processo)', description: 'Passo a passo da metodologia Viratta' },
    { key: 'portfolio', title: '20 — Casos & Portfólio', description: 'Marquee infinito de marcas parceiras' },
    { key: 'testimonials', title: 'Depoimentos em Movimento', description: 'Carrossel automático com avaliações de clientes' },
    { key: 'difference', title: '21 — O Diferencial Viratta', description: 'Comparativo contra agências genéricas' },
    { key: 'philosophy', title: '22 — Filosofia de Marca', description: 'Seção contrastante clara institucional' },
    { key: 'about', title: '23 — Sobre a Viratta', description: 'História, cultura e manifesto da agência' },
    { key: 'marquee_mantra', title: 'Faixa Mantra (Escura)', description: 'Marquee contínuo com manifesto da agência' },
    { key: 'instagram', title: '26 — Feed do Instagram', description: 'Grade com publicações recentes e bastidores' },
    { key: 'faq', title: 'Perguntas Frequentes (FAQ)', description: 'Accordion de dúvidas frequentes com Schema.org SEO' },
    { key: 'final_conversion', title: '24 & 25 — Fechamento & CTA', description: 'Última chamada para contato comercial' },
  ];

  const handleToggle = (key: keyof SectionVisibility) => {
    updateSections({ [key]: !sections[key] });
  };

  const handleAll = (enable: boolean) => {
    const updated = { ...sections };
    sectionDefinitions.forEach(({ key }) => {
      updated[key] = enable;
    });
    updateSections(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Gerenciador de Seções do Site
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Ative ou oculte blocos inteiros da página inicial sem excluir o conteúdo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAll(true)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors"
          >
            Ativar Todas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionDefinitions.map(({ key, title, description }) => {
          const isVisible = sections[key] !== false;

          return (
            <div
              key={key}
              onClick={() => handleToggle(key)}
              className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                isVisible
                  ? 'bg-[#0E0F12] border-white/10 hover:border-[#FF5E14]/40'
                  : 'bg-[#08080A] border-white/5 opacity-50'
              }`}
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {title}
                </h4>
                <p className="text-xs text-neutral-400 font-light">
                  {description}
                </p>
              </div>

              <div className="shrink-0">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isVisible
                      ? 'bg-[#FF5E14] text-white shadow-sm'
                      : 'bg-white/10 text-neutral-500'
                  }`}
                >
                  {isVisible ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marquees Content Management */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
          Palavras das Faixas Infinitas (Marquees)
        </h3>
        <p className="text-xs text-neutral-400 font-light">
          Separe as palavras por vírgula para atualizar o letreiro animado que percorre a tela.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-[#FF5E14]">
              Faixa Laranja (Frentes / Serviços)
            </label>
            <textarea
              rows={3}
              value={(draft.marquee_items || []).map(i => i.text).join(', ')}
              onChange={(e) => {
                const words = e.target.value.split(',').map(w => w.trim()).filter(Boolean);
                const items = words.map((w, idx) => ({ id: `mq-${idx + 1}`, text: w, display_order: idx + 1, is_active: true }));
                updateMarquee(items);
              }}
              placeholder="ESTRATÉGIA, IDENTIDADE, CONTEÚDO, SOCIAL MEDIA, FILMMAKER..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-neutral-300">
              Faixa Escura (Mantra de Posicionamento)
            </label>
            <textarea
              rows={3}
              value={(draft.marquee_mantra_items || []).map(i => i.text).join(', ')}
              onChange={(e) => {
                const words = e.target.value.split(',').map(w => w.trim()).filter(Boolean);
                const items = words.map((w, idx) => ({ id: `mt-${idx + 1}`, text: w, display_order: idx + 1, is_active: true }));
                updateMantraMarquee(items);
              }}
              placeholder="SEJA VISTO, SEJA LEMBRADO, COMUNIQUE VALOR, VIRE A CHAVE..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FF5E14] resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

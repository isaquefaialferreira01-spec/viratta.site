import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Users, 
  MessageSquare, 
  Instagram, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

type HomeTab = 'hero' | 'services' | 'clients' | 'cta' | 'instagram' | 'footer';

interface TabItem {
  id: HomeTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'services', label: 'Serviços' },
  { id: 'clients', label: 'Clientes' },
  { id: 'cta', label: 'CTA' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'footer', label: 'Footer' },
];

export const SiteHomeView: React.FC = () => {
  const { draft, updateCopy, updateSettings } = useCms();
  const [activeTab, setActiveTab] = useState<HomeTab>('hero');

  const copy = draft.copy;
  const settings = draft.settings;

  const handleCopyChange = (key: keyof typeof copy, val: any) => {
    updateCopy({ [key]: val });
  };

  const handleSettingsChange = (key: keyof typeof settings, val: any) => {
    updateSettings({ [key]: val });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Página Inicial
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Configure os textos e botões principais de cada bloco da homepage.
          </p>
        </div>
      </div>

      {/* Clean Tab Selector (Zero-Pill discipline: segmented tabs) */}
      <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/5 overflow-x-auto custom-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] ${
                isActive
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render ONLY the selected tab content */}
      <div className="pt-2">
        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Abertura (Hero Section)
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Kicker / Tag Superior
                  </label>
                  <input
                    type="text"
                    value={copy.hero_kicker || ''}
                    onChange={(e) => handleCopyChange('hero_kicker', e.target.value)}
                    placeholder="VIRATTA MARKETING"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Título — Linha 1
                    </label>
                    <input
                      type="text"
                      value={copy.hero_title_line1 || ''}
                      onChange={(e) => handleCopyChange('hero_title_line1', e.target.value)}
                      placeholder="SEU NEGÓCIO NÃO PRECISA"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Título — Linha 2
                    </label>
                    <input
                      type="text"
                      value={copy.hero_title_line2 || ''}
                      onChange={(e) => handleCopyChange('hero_title_line2', e.target.value)}
                      placeholder="PARECER PEQUENO."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Subtítulo / Proposta de Valor
                  </label>
                  <textarea
                    rows={2}
                    value={copy.hero_subtitle || ''}
                    onChange={(e) => handleCopyChange('hero_subtitle', e.target.value)}
                    placeholder="Estratégia, conteúdo e posicionamento para transformar a forma como sua empresa é percebida."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Botão Primário (Texto)
                    </label>
                    <input
                      type="text"
                      value={copy.hero_cta_primary || ''}
                      onChange={(e) => handleCopyChange('hero_cta_primary', e.target.value)}
                      placeholder="QUERO VIRAR A CHAVE"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Botão Primário (Link / WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={copy.hero_cta_primary_link || ''}
                      onChange={(e) => handleCopyChange('hero_cta_primary_link', e.target.value)}
                      placeholder="Vazio = WhatsApp automático"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Botão Secundário (Texto)
                    </label>
                    <input
                      type="text"
                      value={copy.hero_cta_secondary || ''}
                      onChange={(e) => handleCopyChange('hero_cta_secondary', e.target.value)}
                      placeholder="VER NOSSOS TRABALHOS"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Botão Secundário (Link de Destino)
                    </label>
                    <input
                      type="text"
                      value={copy.hero_cta_secondary_link || ''}
                      onChange={(e) => handleCopyChange('hero_cta_secondary_link', e.target.value)}
                      placeholder="#projetos ou URL"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Linha de Disciplinas / Habilidades
                  </label>
                  <input
                    type="text"
                    value={copy.hero_services_line || ''}
                    onChange={(e) => handleCopyChange('hero_services_line', e.target.value)}
                    placeholder="Social Media • Filmmaker • Design • Branding • Posicionamento"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVIÇOS */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Cabeçalho da Seção de Serviços
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Kicker
                  </label>
                  <input
                    type="text"
                    value={copy.services_kicker || ''}
                    onChange={(e) => handleCopyChange('services_kicker', e.target.value)}
                    placeholder="Capacidades Viratta"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={copy.services_headline || ''}
                    onChange={(e) => handleCopyChange('services_headline', e.target.value)}
                    placeholder="O QUE FAZEMOS PARA SUA MARCA SER PERCEBIDA."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Subtítulo Explicativo
                  </label>
                  <textarea
                    rows={2}
                    value={copy.services_subtitle || ''}
                    onChange={(e) => handleCopyChange('services_subtitle', e.target.value)}
                    placeholder="Sem pacotes genéricos. Soluções conectadas para empresas que se recusam a continuar invisíveis."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLIENTES */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Cabeçalho da Seção de Clientes / Portfólio
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Kicker
                  </label>
                  <input
                    type="text"
                    value={copy.portfolio_kicker || ''}
                    onChange={(e) => handleCopyChange('portfolio_kicker', e.target.value)}
                    placeholder="CASOS & PORTFÓLIO"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={copy.portfolio_headline || ''}
                    onChange={(e) => handleCopyChange('portfolio_headline', e.target.value)}
                    placeholder="MARCAS QUE COMEÇARAM A VIRAR A CHAVE."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CTA (Conversão Final) */}
        {activeTab === 'cta' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Chamada para Ação Final (Conversão)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Kicker
                  </label>
                  <input
                    type="text"
                    value={copy.final_cta_kicker || ''}
                    onChange={(e) => handleCopyChange('final_cta_kicker', e.target.value)}
                    placeholder="O PRÓXIMO PASSO"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={copy.final_cta_headline || ''}
                    onChange={(e) => handleCopyChange('final_cta_headline', e.target.value)}
                    placeholder="SUA EMPRESA JÁ EXISTE. AGORA ELA PRECISA SER PERCEBIDA."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Subtítulo
                  </label>
                  <textarea
                    rows={2}
                    value={copy.final_cta_subtitle || ''}
                    onChange={(e) => handleCopyChange('final_cta_subtitle', e.target.value)}
                    placeholder="Não deixe que uma comunicação pequena limite a grandeza do seu negócio."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm leading-relaxed focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Texto do Botão
                    </label>
                    <input
                      type="text"
                      value={copy.final_cta_button || ''}
                      onChange={(e) => handleCopyChange('final_cta_button', e.target.value)}
                      placeholder="Quero Virar a Chave"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Link do Botão (Vazio = WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={copy.final_cta_button_link || ''}
                      onChange={(e) => handleCopyChange('final_cta_button_link', e.target.value)}
                      placeholder="Vazio = WhatsApp automático"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INSTAGRAM */}
        {activeTab === 'instagram' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Seção Instagram & Bastidores
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Kicker
                  </label>
                  <input
                    type="text"
                    value={copy.instagram_kicker || ''}
                    onChange={(e) => handleCopyChange('instagram_kicker', e.target.value)}
                    placeholder="Bastidores & Conteúdo"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={copy.instagram_headline || ''}
                    onChange={(e) => handleCopyChange('instagram_headline', e.target.value)}
                    placeholder="A VIRATTA ACONTECE POR AQUI."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={copy.instagram_button_text || ''}
                    onChange={(e) => handleCopyChange('instagram_button_text', e.target.value)}
                    placeholder="Seguir @viratta.marketing"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FOOTER */}
        {activeTab === 'footer' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
                Informações Institucionais do Rodapé
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Slogan / Tagline do Rodapé
                  </label>
                  <input
                    type="text"
                    value={settings.tagline || ''}
                    onChange={(e) => handleSettingsChange('tagline', e.target.value)}
                    placeholder="Destrave a percepção da sua marca."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    E-mail de Contato
                  </label>
                  <input
                    type="email"
                    value={settings.email || ''}
                    onChange={(e) => handleSettingsChange('email', e.target.value)}
                    placeholder="contato@virattamarketing.com.br"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Localização & Abrangência
                  </label>
                  <input
                    type="text"
                    value={settings.location || ''}
                    onChange={(e) => handleSettingsChange('location', e.target.value)}
                    placeholder="São Paulo, SP — Atendimento Brasil"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

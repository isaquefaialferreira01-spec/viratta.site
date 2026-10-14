import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCms } from '../../context/CmsContext';
import { getAdminSession, logoutAdmin, AdminSession } from '../../lib/adminAuth';
import { supabase, isSupabaseConfigured, verifyAdminAuthorization } from '../../lib/supabase';
import { VirattaLogo } from '../brand/VirattaLogo';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  Layers, 
  Palette, 
  Type, 
  Share2, 
  Search, 
  LayoutGrid, 
  Database, 
  Globe, 
  Sparkles, 
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  CheckCircle2,
  User,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

import { OverviewTab } from './tabs/OverviewTab';
import { ContactsTab } from './tabs/ContactsTab';
import { ClientsTab } from './tabs/ClientsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { AppearanceTab } from './tabs/AppearanceTab';
import { CopywritingTab } from './tabs/CopywritingTab';
import { SocialTab } from './tabs/SocialTab';
import { SeoTab } from './tabs/SeoTab';
import { FaqTab } from './tabs/FaqTab';
import { SectionsTab } from './tabs/SectionsTab';
import { DatabaseTab } from './tabs/DatabaseTab';

type TabId = 
  | 'overview' 
  | 'contacts' 
  | 'clients' 
  | 'portfolio'
  | 'services' 
  | 'appearance' 
  | 'copywriting' 
  | 'social' 
  | 'seo' 
  | 'faq'
  | 'sections' 
  | 'database';

interface TabMeta {
  id: TabId;
  label: string;
  description: string;
  icon: React.ReactNode;
  category?: string;
}

export const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const { publish, setPreviewMode } = useCms();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAccess() {
      setCheckingAuth(true);
      const current = getAdminSession();

      if (!current || !current.email) {
        if (isMounted) {
          setLocation('/admin/login');
        }
        return;
      }

      // If Supabase is configured, verify actively against Supabase session and admin_users table
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: authData } = await supabase.auth.getUser();
          const userId = authData?.user?.id;
          const userEmail = (authData?.user?.email || current.email).toLowerCase().trim();
          const fullName = authData?.user?.user_metadata?.full_name || 
                           authData?.user?.user_metadata?.name || 
                           current.name;

          if (fullName && isMounted) {
            current.name = fullName;
          }

          // Query admin_users specifically to verify active status
          const { data: adminRecord, error: dbError } = await supabase
            .from('admin_users')
            .select('id, email, is_active, role')
            .or(userId ? `user_id.eq.${userId},email.eq.${userEmail}` : `email.eq.${userEmail}`)
            .maybeSingle();

          if (!dbError && adminRecord) {
            if (!adminRecord.is_active) {
              // Explicitly marked as inactive in admin_users table
              await logoutAdmin();
              if (isMounted) {
                setLocation('/admin/login?error=inactive');
              }
              return;
            }
          } else if (dbError && dbError.code !== 'PGRST116') {
            console.warn('admin_users query warning, falling back to verifyAdminAuthorization:', dbError.message);
            // Verify fallback
            const authCheck = await verifyAdminAuthorization(userEmail, userId);
            if (!authCheck.authorized) {
              await logoutAdmin();
              if (isMounted) {
                setLocation('/admin/login');
              }
              return;
            }
          } else {
            // No record in admin_users, perform standard authorization check
            const authCheck = await verifyAdminAuthorization(userEmail, userId);
            if (!authCheck.authorized) {
              await logoutAdmin();
              if (isMounted) {
                setLocation('/admin/login');
              }
              return;
            }
          }
        } catch (err) {
          console.error('Error verifying active admin status:', err);
        }
      } else {
        // Fallback check in local/development mode
        const authCheck = await verifyAdminAuthorization(current.email);
        if (!authCheck.authorized) {
          await logoutAdmin();
          if (isMounted) {
            setLocation('/admin/login');
          }
          return;
        }
      }

      if (isMounted) {
        setSession(current);
        setCheckingAuth(false);
      }
    }

    verifyAccess();

    return () => {
      isMounted = false;
    };
  }, [setLocation]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Erro ao invocar supabase.auth.signOut():', err);
    }
    await logoutAdmin();
    setLocation('/admin/login');
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishSuccess(false);
    try {
      const res = await publish();
      if (res.success) {
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 3500);
      } else {
        alert(res.error || 'Erro ao publicar.');
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenPreview = () => {
    setPreviewMode(true);
    window.open('/?preview=true', '_blank');
  };

  if (checkingAuth || !session) {
    return (
      <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center gap-4 text-neutral-400 text-sm">
        <div className="w-10 h-10 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs tracking-wider uppercase text-neutral-300 font-semibold">
            Painel Administrativo Viratta
          </span>
          <span className="text-[11px] text-neutral-500 font-mono">
            Validando permissões de administrador...
          </span>
        </div>
      </div>
    );
  }

  const navItems: TabMeta[] = [
    { 
      id: 'overview', 
      label: 'Visão Geral & Status', 
      description: 'Métricas, atalhos rápidos e status da publicação',
      icon: <LayoutDashboard className="w-4 h-4" />,
      category: 'Geral'
    },
    { 
      id: 'contacts', 
      label: 'WhatsApp & Contatos', 
      description: 'Números, e-mails comerciais e endereços',
      icon: <MessageSquare className="w-4 h-4" />,
      category: 'Geral'
    },
    { 
      id: 'clients', 
      label: 'Portfólio & Clientes', 
      description: 'Logos e marcas do portfólio via Supabase Storage',
      icon: <Briefcase className="w-4 h-4" />,
      category: 'Conteúdo'
    },
    { 
      id: 'services', 
      label: 'Capacidades (Serviços)', 
      description: 'Lista e detalhamento dos serviços prestados',
      icon: <Layers className="w-4 h-4" />,
      category: 'Conteúdo'
    },
    { 
      id: 'appearance', 
      label: 'Identidade & Cores', 
      description: 'Paleta visual, cores de destaque e logo',
      icon: <Palette className="w-4 h-4" />,
      category: 'Design'
    },
    { 
      id: 'copywriting', 
      label: 'Textos & Copywriting', 
      description: 'Slogans, títulos principais e depoimentos',
      icon: <Type className="w-4 h-4" />,
      category: 'Conteúdo'
    },
    { 
      id: 'social', 
      label: 'Redes Sociais', 
      description: 'Instagram, LinkedIn e links externos',
      icon: <Share2 className="w-4 h-4" />,
      category: 'Configuração'
    },
    { 
      id: 'seo', 
      label: 'SEO Settings', 
      description: 'Meta tags, títulos, Open Graph e indexação',
      icon: <Search className="w-4 h-4" />,
      category: 'Configuração'
    },
    { 
      id: 'faq', 
      label: 'Perguntas Frequentes (FAQ)', 
      description: 'Dúvidas frequentes, respostas e Schema.org SEO',
      icon: <HelpCircle className="w-4 h-4" />,
      category: 'Conteúdo'
    },
    { 
      id: 'sections', 
      label: 'Gerenciar Seções', 
      description: 'Ativação, visibilidade e ordenação do site',
      icon: <LayoutGrid className="w-4 h-4" />,
      category: 'Design'
    },
    { 
      id: 'database', 
      label: 'Banco de Dados', 
      description: 'Status do Supabase, backup e sincronização',
      icon: <Database className="w-4 h-4" />,
      category: 'Sistema'
    },
  ];

  const currentTabMeta = navItems.find((tab) => tab.id === activeTab) || navItems[0];
  const userName = session.name || session.email.split('@')[0];

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col font-sans antialiased selection:bg-[#FF5E14]/30 selection:text-white">
      {/* =========================================================================
          CABEÇALHO PRINCIPAL (TOP HEADER BAR)
          Identidade Viratta: Fundo preto profundo, borda sutil, nome do usuário
          autenticado e botão 'Sair' com chamada a supabase.auth.signOut().
         ========================================================================= */}
      <header className="h-16 border-b border-white/10 bg-[#0A0A0C]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
        {/* Esquerda: Menu mobile toggle + Logo Viratta + Tag CMS */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            aria-label="Alternar menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF5E14]" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="/admin" className="flex items-center gap-3 shrink-0 group">
            <VirattaLogo size="sm" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1 h-3.5 bg-[#FF5E14] rounded-full" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white transition-colors">
                ADMIN
              </span>
            </div>
          </a>
        </div>

        {/* Centro / Direita: Ações rápidas + Identificação do Usuário + Botão Sair */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Alerta de Publicação Concluída */}
          {publishSuccess && (
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Publicado com sucesso!</span>
            </div>
          )}

          {/* Botão Ver Prévia */}
          <button
            type="button"
            onClick={handleOpenPreview}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/10 transition-all hover:border-white/20"
            title="Abrir prévia do site no modo rascunho"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF5E14]" />
            <span>Ver Prévia</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </button>

          {/* Botão Publicar */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-all shadow-[0_2px_12px_rgba(255,94,20,0.35)] hover:shadow-[0_4px_20px_rgba(255,94,20,0.5)] disabled:opacity-50 active:scale-[0.98]"
            title="Publicar todas as alterações salvas no site oficial"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publicando...' : 'Publicar'}</span>
          </button>

          {/* Divisor Visual */}
          <div className="h-6 w-px bg-white/10 mx-0.5 sm:mx-1" />

          {/* Nome do Usuário Autenticado no Cabeçalho */}
          <div className="flex items-center gap-2.5 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5E14] to-[#FF8042] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm ring-1 ring-white/20 shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight max-w-[140px] lg:max-w-[180px]">
              <span className="text-xs font-semibold text-white truncate" title={userName}>
                {userName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                {session.role === 'super_admin' ? 'Super Admin' : 'Administrador'}
              </span>
            </div>
          </div>

          {/* Botão de 'Sair' que invoca 'supabase.auth.signOut()' */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-xs font-semibold text-neutral-300 hover:text-red-400 transition-all active:scale-[0.98] disabled:opacity-50"
            title="Sair do Painel Administrativo"
          >
            <LogOut className="w-3.5 h-3.5 text-[#FF5E14] group-hover:text-red-400 transition-colors" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          CORPO PRINCIPAL COM BARRA LATERAL (SIDEBAR) E CONTEÚDO (MAIN CONTENT)
         ========================================================================= */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Barra Lateral de Navegação (Sidebar) */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 lg:w-72 border-r border-white/10 bg-[#09090B] shrink-0 p-4 space-y-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto transition-all z-30`}
        >
          {/* Identificação de Perfil & Status Administrativo */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-black border border-[#FF5E14]/40 flex items-center justify-center text-[#FF5E14] shrink-0">
                <User className="w-4 h-4 text-[#FF5E14]" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{userName}</div>
                <div className="text-[11px] text-neutral-400 truncate font-mono">{session.email}</div>
              </div>
            </div>
            <span title="Acesso Administrativo Ativo">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14] shrink-0" />
            </span>
          </div>

          {/* Menu de Navegação Estruturado */}
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-mono tracking-wider uppercase text-neutral-400 font-semibold flex items-center justify-between">
              <span>Navegação & Módulos</span>
              <span className="text-[9px] text-[#FF5E14] bg-[#FF5E14]/10 px-1.5 py-0.5 rounded border border-[#FF5E14]/20">
                {navItems.length} abas
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left group ${
                      active
                        ? 'bg-black text-white border border-[#FF5E14]/60 shadow-[0_0_20px_rgba(255,94,20,0.12)] font-bold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`transition-colors shrink-0 ${
                          active ? 'text-[#FF5E14]' : 'text-neutral-500 group-hover:text-[#FF5E14]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className={`truncate ${active ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                        {item.label}
                      </span>
                    </div>

                    {active ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] shadow-[0_0_8px_#FF5E14] shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Rodapé da Barra Lateral */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Ambiente</span>
                <span className="text-[#FF5E14] font-semibold">Produção</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>Segurança</span>
                <span className="text-emerald-400 font-semibold">Supabase RLS</span>
              </div>
            </div>

            <div className="px-1 text-[10px] text-neutral-400 font-mono text-center">
              VIRATTA MARKETING • CMS v1.0
            </div>
          </div>
        </aside>

        {/* Área de Conteúdo Principal (Main Content Area) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-7xl">
          {/* Cabeçalho da Aba Atual */}
          <div className="mb-6 sm:mb-8 pb-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF5E14] tracking-wider uppercase mb-1">
                <span>Painel</span>
                <span>/</span>
                <span>{currentTabMeta.category || 'Módulo'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/20">
                  {currentTabMeta.icon}
                </span>
                <span>{currentTabMeta.label}</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {currentTabMeta.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-mono">
                Identidade: Preto • Laranja • Branco
              </span>
            </div>
          </div>

          {/* Conteúdo Dinâmico por Aba */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <OverviewTab
                onPublish={handlePublish}
                isPublishing={isPublishing}
                onOpenPreview={handleOpenPreview}
              />
            )}
            {activeTab === 'contacts' && <ContactsTab />}
            {(activeTab === 'clients' || activeTab === 'portfolio') && <ClientsTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'appearance' && <AppearanceTab />}
            {activeTab === 'copywriting' && <CopywritingTab />}
            {activeTab === 'social' && <SocialTab />}
            {activeTab === 'seo' && <SeoTab />}
            {activeTab === 'faq' && <FaqTab />}
            {activeTab === 'sections' && <SectionsTab />}
            {activeTab === 'database' && <DatabaseTab />}
          </div>
        </main>
      </div>
    </div>
  );
};


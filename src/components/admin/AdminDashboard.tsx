import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCms } from '../../context/CmsContext';
import { getAdminSession, logoutAdmin, AdminSession } from '../../lib/adminAuth';
import { supabase, isSupabaseConfigured, verifyAdminAuthorization } from '../../lib/supabase';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminNavId } from './AdminSidebar';

// Views
import { DashboardView } from './views/DashboardView';
import { SiteHomeView } from './views/SiteHomeView';
import { SiteSectionsView } from './views/SiteSectionsView';
import { SiteCopyView } from './views/SiteCopyView';
import { SiteLinksView } from './views/SiteLinksView';
import { ContentServicesView } from './views/ContentServicesView';
import { ContentClientsView } from './views/ContentClientsView';
import { ContentReelsView } from './views/ContentReelsView';
import { MediaImagesView } from './views/MediaImagesView';
import { MediaBannersView } from './views/MediaBannersView';
import { MediaUploadsView } from './views/MediaUploadsView';
import { AppearanceColorsView } from './views/AppearanceColorsView';
import { AppearanceTypographyView } from './views/AppearanceTypographyView';
import { AppearanceLogoView } from './views/AppearanceLogoView';
import { AppearanceFaviconView } from './views/AppearanceFaviconView';
import { ContactWhatsAppView } from './views/ContactWhatsAppView';
import { ContactInstagramView } from './views/ContactInstagramView';
import { ContactSocialView } from './views/ContactSocialView';
import { SeoView } from './views/SeoView';
import { SettingsView } from './views/SettingsView';

export const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const { content, draft, saveDraft, publish, setPreviewMode } = useCms();
  
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeNav, setActiveNav] = useState<AdminNavId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Authentication check
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
          const fullName =
            authData?.user?.user_metadata?.full_name ||
            authData?.user?.user_metadata?.name ||
            current.name;

          if (fullName && isMounted) {
            current.name = fullName;
          }

          const { data: adminRecord, error: dbError } = await supabase
            .from('admin_users')
            .select('id, email, is_active, role')
            .or(userId ? `user_id.eq.${userId},email.eq.${userEmail}` : `email.eq.${userEmail}`)
            .maybeSingle();

          if (!dbError && adminRecord) {
            if (!adminRecord.is_active) {
              await logoutAdmin();
              if (isMounted) {
                setLocation('/admin/login?error=inactive');
              }
              return;
            }
          } else if (dbError && dbError.code !== 'PGRST116') {
            const authCheck = await verifyAdminAuthorization(userEmail, userId);
            if (!authCheck.authorized) {
              await logoutAdmin();
              if (isMounted) {
                setLocation('/admin/login');
              }
              return;
            }
          } else {
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

  const hasUnpublishedChanges = JSON.stringify(content) !== JSON.stringify(draft);

  const showStatusNotice = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setStatusNotice({ message, type });
    setTimeout(() => {
      setStatusNotice(null);
    }, 4500);
  };

  // Flow: Salvar rascunho
  const handleSaveDraft = () => {
    saveDraft(draft);
    showStatusNotice('Alterações salvas.', 'success');
  };

  // Flow: Pré-visualizar
  const handlePreview = () => {
    setPreviewMode(true);
    setLocation('/?preview=true');
  };

  // Flow: Publicar alterações
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await publish();
      if (res.success) {
        showStatusNotice('Alterações publicadas no site.', 'success');
      } else {
        showStatusNotice(res.error || 'Erro ao publicar alterações.', 'error');
      }
    } catch (err: any) {
      showStatusNotice(err?.message || 'Falha de conexão ao publicar.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setLocation('/admin/login');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
          <span className="text-xs text-neutral-400 font-mono tracking-wider uppercase">
            Autenticando painel seguro...
          </span>
        </div>
      </div>
    );
  }

  // Render view corresponding to active nav
  const renderActiveView = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(id) => setActiveNav(id)}
            onPublish={handlePublish}
            isPublishing={isPublishing}
            onOpenPreview={handlePreview}
          />
        );
      case 'site-home':
        return <SiteHomeView />;
      case 'site-sections':
        return <SiteSectionsView />;
      case 'site-copy':
        return <SiteCopyView />;
      case 'site-links':
        return <SiteLinksView />;
      case 'content-services':
        return <ContentServicesView />;
      case 'content-clients':
        return <ContentClientsView />;
      case 'content-reels':
        return <ContentReelsView />;
      case 'media-images':
        return <MediaImagesView />;
      case 'media-banners':
        return <MediaBannersView />;
      case 'media-uploads':
        return <MediaUploadsView />;
      case 'appearance-colors':
        return <AppearanceColorsView />;
      case 'appearance-typography':
        return <AppearanceTypographyView />;
      case 'appearance-logo':
        return <AppearanceLogoView />;
      case 'appearance-favicon':
        return <AppearanceFaviconView />;
      case 'contact-whatsapp':
        return <ContactWhatsAppView />;
      case 'contact-instagram':
        return <ContactInstagramView />;
      case 'contact-social':
        return <ContactSocialView />;
      case 'seo':
        return <SeoView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onNavigate={(id) => setActiveNav(id)}
            onPublish={handlePublish}
            isPublishing={isPublishing}
            onOpenPreview={handlePreview}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans selection:bg-[#FF5E14] selection:text-white">
      {/* 1. Clean Top Header */}
      <AdminHeader
        session={session}
        onLogout={handleLogout}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onPublish={handlePublish}
        isPublishing={isPublishing}
        statusNotice={statusNotice}
        onDismissNotice={() => setStatusNotice(null)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        hasUnpublishedChanges={hasUnpublishedChanges}
      />

      {/* 2. Main Admin Layout: Sidebar + Viewport */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <AdminSidebar
          activeNav={activeNav}
          onSelectNav={(id) => setActiveNav(id)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

import React from 'react';
import {
  LayoutDashboard,
  Globe,
  Sliders,
  Type,
  Link2,
  Briefcase,
  Users,
  Film,
  Image as ImageIcon,
  Megaphone,
  UploadCloud,
  Palette,
  Sparkles,
  Layers,
  Bookmark,
  MessageSquare,
  Instagram,
  Share2,
  Search,
  Settings,
  ChevronRight,
  X
} from 'lucide-react';

export type AdminNavId =
  | 'dashboard'
  | 'site-home'
  | 'site-sections'
  | 'site-copy'
  | 'site-links'
  | 'content-services'
  | 'content-clients'
  | 'content-reels'
  | 'media-images'
  | 'media-banners'
  | 'media-uploads'
  | 'appearance-colors'
  | 'appearance-typography'
  | 'appearance-logo'
  | 'appearance-favicon'
  | 'contact-whatsapp'
  | 'contact-instagram'
  | 'contact-social'
  | 'seo'
  | 'settings';

interface NavGroup {
  label?: string;
  items: Array<{
    id: AdminNavId;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }>;
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'SITE',
    items: [
      {
        id: 'site-home',
        label: 'Página Inicial',
        icon: <Globe className="w-4 h-4" />,
      },
      {
        id: 'site-sections',
        label: 'Seções',
        icon: <Sliders className="w-4 h-4" />,
      },
      {
        id: 'site-copy',
        label: 'Textos',
        icon: <Type className="w-4 h-4" />,
      },
      {
        id: 'site-links',
        label: 'Botões e Links',
        icon: <Link2 className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'CONTEÚDO',
    items: [
      {
        id: 'content-services',
        label: 'Serviços',
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        id: 'content-clients',
        label: 'Clientes / Portfólio',
        icon: <Users className="w-4 h-4" />,
      },
      {
        id: 'content-reels',
        label: 'Instagram / Conteúdo',
        icon: <Instagram className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'MÍDIA',
    items: [
      {
        id: 'media-images',
        label: 'Imagens',
        icon: <ImageIcon className="w-4 h-4" />,
      },
      {
        id: 'media-banners',
        label: 'Banners',
        icon: <Megaphone className="w-4 h-4" />,
      },
      {
        id: 'media-uploads',
        label: 'Uploads',
        icon: <UploadCloud className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'APARÊNCIA',
    items: [
      {
        id: 'appearance-colors',
        label: 'Cores',
        icon: <Palette className="w-4 h-4" />,
      },
      {
        id: 'appearance-typography',
        label: 'Tipografia',
        icon: <Type className="w-4 h-4" />,
      },
      {
        id: 'appearance-logo',
        label: 'Logo',
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: 'appearance-favicon',
        label: 'Favicon',
        icon: <Bookmark className="w-4 h-4" />,
      },
    ],
  },
  {
    label: 'CONTATO',
    items: [
      {
        id: 'contact-whatsapp',
        label: 'WhatsApp',
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        id: 'contact-instagram',
        label: 'Instagram',
        icon: <Instagram className="w-4 h-4" />,
      },
      {
        id: 'contact-social',
        label: 'Redes Sociais',
        icon: <Share2 className="w-4 h-4" />,
      },
    ],
  },
  {
    items: [
      {
        id: 'seo',
        label: 'SEO',
        icon: <Search className="w-4 h-4" />,
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
];

interface AdminSidebarProps {
  activeNav: AdminNavId;
  onSelectNav: (id: AdminNavId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeNav,
  onSelectNav,
  mobileOpen,
  onCloseMobile,
}) => {
  const handleItemClick = (id: AdminNavId) => {
    onSelectNav(id);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full py-4 overflow-y-auto custom-scrollbar">
      <nav className="flex-1 px-3 space-y-6">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={group.label || `group-${gIdx}`} className="space-y-1">
            {group.label && (
              <div className="px-3 pb-1.5 pt-1 text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                {group.label}
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] ${
                      isActive
                        ? 'bg-[#FF5E14]/15 text-[#FF5E14] font-semibold border-l-2 border-[#FF5E14]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`transition-colors ${isActive ? 'text-[#FF5E14]' : 'text-neutral-400 group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Subtle bottom info */}
      <div className="px-6 pt-4 mt-auto border-t border-white/5 text-[11px] text-neutral-400 flex items-center justify-between">
        <span className="font-mono">VIRATTA v2.0</span>
        <span className="flex items-center gap-1.5 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Online</span>
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#070708] border-r border-white/5 h-[calc(100vh-4rem)] sticky top-16 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#070708] border-r border-white/10 h-full z-10 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                Navegação Admin
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
                aria-label="Fechar navegação"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

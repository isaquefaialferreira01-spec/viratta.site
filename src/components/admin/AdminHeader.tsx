import React from 'react';
import { VirattaSymbol } from '../brand/VirattaSymbol';
import { GradientText } from '../ui/gradient-text';
import { GradientBorderButton } from '../ui/gradient-border-button';
import { 
  Save, 
  Eye, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck,
  User
} from 'lucide-react';
import { AdminSession } from '../../lib/adminAuth';

interface AdminHeaderProps {
  session: AdminSession | null;
  onLogout: () => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
  isPublishing: boolean;
  statusNotice: { message: string; type: 'success' | 'error' | 'info' } | null;
  onDismissNotice: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  hasUnpublishedChanges: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  session,
  onLogout,
  onSaveDraft,
  onPreview,
  onPublish,
  isPublishing,
  statusNotice,
  onDismissNotice,
  mobileMenuOpen,
  onToggleMobileMenu,
  hasUnpublishedChanges,
}) => {
  const adminName = session?.name || 'Administrador';
  const adminEmail = session?.email || 'admin@virattamarketing.com.br';
  const initial = adminName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-[#070708]/95 backdrop-blur-md border-b border-white/5 transition-colors">
      <div className="max-w-[1600px] mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Mobile Toggle & Brand Identity */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center p-1.5 shadow-sm">
              <VirattaSymbol className="w-full h-full text-[#FF5E14]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-white font-mono">
                  VIRATTA ADMIN
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/5 text-neutral-300 border border-white/10">
                  CMS v2.0
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-normal leading-tight hidden xs:block">
                Controle total da{' '}
                <GradientText
                  className="font-semibold"
                  colors={['#F47A13', '#FFA726', '#E65100', '#F47A13']}
                >
                  sua marca
                </GradientText>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Center: Notice or Unsaved Indicator */}
        <div className="hidden md:flex items-center">
          {statusNotice ? (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border animate-fadeIn transition-all ${
                statusNotice.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                  : statusNotice.type === 'error'
                  ? 'bg-rose-950/60 border-rose-500/30 text-rose-300'
                  : 'bg-white/5 border-white/10 text-neutral-300'
              }`}
            >
              {statusNotice.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              {statusNotice.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
              <span>{statusNotice.message}</span>
              <button
                type="button"
                onClick={onDismissNotice}
                className="ml-1 text-white/50 hover:text-white"
                aria-label="Dispensar aviso"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : hasUnpublishedChanges ? (
            <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-950/30 border border-amber-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Rascunho com alterações pendentes</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Site sincronizado</span>
            </div>
          )}
        </div>

        {/* Right: Actions + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Action 1: Save Draft */}
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold tracking-wider transition-colors border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            title="Salvar alterações no rascunho de trabalho"
            aria-label="Salvar alterações no rascunho de trabalho"
          >
            <Save className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            <span className="hidden sm:inline">Salvar rascunho</span>
          </button>

          {/* Action 2: Preview */}
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold tracking-wider transition-colors border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            title="Visualizar como as alterações do rascunho ficam no site"
            aria-label="Visualizar como as alterações do rascunho ficam no site"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            <span className="hidden sm:inline">Pré-visualizar</span>
          </button>

          {/* Action 3: Primary Publish Button with Spinning Conic Gradient Border */}
          <GradientBorderButton
            onClick={onPublish}
            disabled={isPublishing}
            colors="#F47A13,#FFB347,#F47A13,#E65100,#F47A13"
            className="shadow-[0_2px_12px_rgba(244,122,19,0.25)] text-xs font-bold disabled:opacity-50 min-h-[44px] inline-flex items-center justify-center px-3.5"
            title="Publicar rascunho e atualizar o site público no Supabase"
            aria-label="Publicar rascunho e atualizar o site público no Supabase"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA726]" aria-hidden="true" />
              <span>{isPublishing ? 'Publicando...' : 'Publicar'}</span>
            </span>
          </GradientBorderButton>

          {/* Subtle separator */}
          <div className="hidden sm:block w-[1px] h-6 bg-white/10 mx-1" />

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B1C22] to-black border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner"
              title={`${adminName} (${adminEmail})`}
            >
              {initial}
            </div>

            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                {adminName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono leading-none">
                Administrador
              </span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
              title="Sair do painel"
              aria-label="Sair da conta"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile notice banner if active */}
      {statusNotice && (
        <div
          className={`md:hidden px-4 py-2 border-t text-xs font-medium flex items-center justify-between ${
            statusNotice.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
              : statusNotice.type === 'error'
              ? 'bg-rose-950/80 border-rose-500/30 text-rose-300'
              : 'bg-neutral-900 border-white/10 text-neutral-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusNotice.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            {statusNotice.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
            <span>{statusNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={onDismissNotice}
            className="text-white/60 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};

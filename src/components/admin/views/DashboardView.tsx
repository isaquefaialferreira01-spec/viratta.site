import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { GradientBorderButton } from '../../ui/gradient-border-button';
import { 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Sparkles, 
  Globe, 
  Briefcase, 
  Users, 
  Film, 
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import { AdminNavId } from '../AdminSidebar';

interface DashboardViewProps {
  onNavigate: (id: AdminNavId) => void;
  onPublish: () => void;
  isPublishing: boolean;
  onOpenPreview: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onPublish,
  isPublishing,
  onOpenPreview,
}) => {
  const { content, draft } = useCms();
  const supabaseActive = isSupabaseConfigured();

  // Determine if there are un-published draft changes
  const hasPendingChanges = JSON.stringify(content) !== JSON.stringify(draft);

  // Active counts
  const activeServices = (draft.services || []).filter((s) => s.is_active).length;
  const totalServices = (draft.services || []).length;

  const activeClients = (draft.clients || []).filter((c) => c.is_active).length;
  const totalClients = (draft.clients || []).length;

  const activeReels = (draft.reels || []).filter((r) => r.is_active).length;
  const totalReels = (draft.reels || []).length;

  // Format last published date
  const lastPublishedDate = content.last_published_at
    ? new Date(content.last_published_at).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Ainda não publicado';

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* 1. Header with Site Status & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Painel de Controle
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
              CMS Central
            </span>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 font-light">
            Visão geral simplificada e controle de publicação do site institucional VIRATTA.
          </p>
        </div>

        {/* Primary Actions requested: [ EDITAR SITE ] [ PUBLICAR ALTERAÇÕES ] */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => onNavigate('site-home')}
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-wider transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
          >
            <Edit3 className="w-3.5 h-3.5 text-neutral-300" aria-hidden="true" />
            <span>EDITAR SITE</span>
          </button>

          <GradientBorderButton
            onClick={onPublish}
            disabled={isPublishing}
            colors="#F47A13,#FFB347,#F47A13,#E65100,#F47A13"
            className="text-xs font-bold disabled:opacity-50 min-h-[44px] inline-flex items-center justify-center px-5"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA726]" aria-hidden="true" />
              <span>{isPublishing ? 'PUBLICANDO...' : 'PUBLICAR ALTERAÇÕES'}</span>
            </span>
          </GradientBorderButton>
        </div>
      </div>

      {/* 2. Core Operational Metrics (clean, no bloat) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Site Status */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Status do Site</span>
            {hasPendingChanges ? (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            )}
          </div>
          <div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              {hasPendingChanges ? (
                <span className="text-amber-400">Rascunho Pendente</span>
              ) : (
                <span className="text-emerald-400">100% Sincronizado</span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              {hasPendingChanges
                ? 'Há alterações no rascunho prontas para publicação'
                : 'O site público exibe a versão mais recente'}
            </p>
          </div>
        </div>

        {/* Metric 2: Última Publicação */}
        <div className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Última Publicação</span>
            <Globe className="w-4 h-4 text-neutral-400" />
          </div>
          <div>
            <div className="text-base font-bold text-white font-mono">
              {lastPublishedDate}
            </div>
            <button
              type="button"
              onClick={onOpenPreview}
              className="text-[11px] text-[#FF5E14] hover:underline mt-1 inline-flex items-center gap-1 font-medium"
            >
              <span>Ver site publicado</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Serviços Ativos */}
        <div 
          onClick={() => onNavigate('content-services')}
          className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/10 transition-colors cursor-pointer flex flex-col justify-between space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Serviços Ativos</span>
            <Briefcase className="w-4 h-4 text-neutral-400 group-hover:text-[#FF5E14] transition-colors" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {activeServices} <span className="text-xs font-normal text-neutral-400">/ {totalServices}</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 group-hover:text-neutral-300">
              Capacidades no menu e seção
            </p>
          </div>
        </div>

        {/* Metric 4: Clientes / Portfólio */}
        <div 
          onClick={() => onNavigate('content-clients')}
          className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/10 transition-colors cursor-pointer flex flex-col justify-between space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Clientes / Marquee</span>
            <Users className="w-4 h-4 text-neutral-400 group-hover:text-[#FF5E14] transition-colors" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {activeClients} <span className="text-xs font-normal text-neutral-400">/ {totalClients}</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 group-hover:text-neutral-300">
              Logotipos no carrossel público
            </p>
          </div>
        </div>
      </div>

      {/* 3. Secondary Row: Reels + Database Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reels Summary */}
        <div 
          onClick={() => onNavigate('content-reels')}
          className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300 group-hover:text-[#FF5E14] transition-colors">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {activeReels} de {totalReels} Reels Ativos
              </div>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Vídeos e bastidores exibidos na seção Instagram
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Supabase Storage & DB Status */}
        <div 
          onClick={() => onNavigate('settings')}
          className="p-5 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 transition-colors">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Supabase Conectado</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Storage bucket `viratta-assets` & persistência ativa
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* 4. Quick Flow Guide */}
      <div className="p-6 rounded-xl bg-[#0A0B0E]/60 border border-white/5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
          Fluxo de Trabalho Recomendado
        </h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-mono flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Edite os conteúdos desejados</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">→</span>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-mono flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Clique em "Salvar rascunho"</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">→</span>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-mono flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Pré-visualize suas alterações</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">→</span>
          <div className="flex items-center gap-2 text-[#FFA726] font-semibold">
            <span className="w-5 h-5 rounded-full bg-[#FF5E14]/20 text-[#FF5E14] font-mono flex items-center justify-center text-[10px] font-bold">4</span>
            <span>Publique no site oficial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Globe, 
  Database, 
  Smartphone, 
  Layers, 
  Briefcase, 
  FileText, 
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface OverviewTabProps {
  onPublish: () => void;
  isPublishing: boolean;
  onOpenPreview: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onPublish, isPublishing, onOpenPreview }) => {
  const { content, draft, reloadCms } = useCms();
  const supabaseActive = isSupabaseConfigured();

  // Calculate if there are pending un-published changes
  const hasChanges = JSON.stringify(content) !== JSON.stringify(draft);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Status Overview */}
      <div className="rounded-2xl bg-gradient-to-br from-[#121318] to-[#0A0A0C] border border-white/10 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5E14]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Painel Central VIRATTA Marketing v1.0</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Gerencie todo o site em um único lugar
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              Altere o número de WhatsApp, logos de clientes do marquee, 5 capacidades oficiais, 
              cores da marca, títulos e visibilidade das seções com publicação instantânea.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenPreview}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10"
            >
              <Globe className="w-4 h-4 text-neutral-300" />
              <span>Ver Prévia do Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={onPublish}
              disabled={isPublishing}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold tracking-wider transition-all shadow-[0_4px_20px_rgba(255,94,20,0.35)] disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isPublishing ? 'Publicando...' : 'Publicar Alterações no Site'}</span>
            </button>
          </div>
        </div>

        {/* Change Status Alert */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            {hasChanges ? (
              <>
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-amber-300 font-medium">Existem alterações salvas no rascunho prontas para publicação.</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">O site público está 100% sincronizado com as últimas edições.</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            {content.last_published_at && (
              <span>Última publicação: {new Date(content.last_published_at).toLocaleString('pt-BR')}</span>
            )}
            <button
              type="button"
              onClick={reloadCms}
              className="text-neutral-400 hover:text-white inline-flex items-center gap-1"
              title="Recarregar dados"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recarregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics & System Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* WhatsApp metric */}
        <div className="p-5 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">WhatsApp Oficial</span>
            <Smartphone className="w-4 h-4 text-[#FF5E14]" />
          </div>
          <div className="text-lg font-bold text-white tracking-tight">
            +{draft.settings.whatsapp_country} ({draft.settings.whatsapp_ddd}) {draft.settings.whatsapp_number}
          </div>
          <div className="text-[11px] text-neutral-400 truncate">
            {draft.settings.whatsapp_default_message}
          </div>
        </div>

        {/* Clients in marquee */}
        <div className="p-5 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">Marcas no Marquee</span>
            <Briefcase className="w-4 h-4 text-[#FF5E14]" />
          </div>
          <div className="text-lg font-bold text-white tracking-tight">
            {draft.clients.filter(c => c.is_active).length} ativas de {draft.clients.length}
          </div>
          <div className="text-[11px] text-neutral-400">
            Logotipos em looping contínuo no portfólio
          </div>
        </div>

        {/* Capacidades */}
        <div className="p-5 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">Serviços Oficiais</span>
            <Layers className="w-4 h-4 text-[#FF5E14]" />
          </div>
          <div className="text-lg font-bold text-white tracking-tight">
            {draft.services.filter(s => s.is_active).length} de 5 ativos
          </div>
          <div className="text-[11px] text-neutral-400">
            Apresentação minimalista baseada em texto
          </div>
        </div>

        {/* Supabase / Storage health */}
        <div className="p-5 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">Armazenamento</span>
            <Database className="w-4 h-4 text-[#FF5E14]" />
          </div>
          <div className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {supabaseActive ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Supabase Conectado</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Modo Local Ativo</span>
              </>
            )}
          </div>
          <div className="text-[11px] text-neutral-400">
            {supabaseActive ? 'Sincronização em nuvem ativa' : 'Persistência instantânea no navegador'}
          </div>
        </div>
      </div>

      {/* Guide & Architecture Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF5E14]" />
            <span>Como funciona a publicação instantânea</span>
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Quando você faz qualquer alteração nas abas ao lado (contatos, logos, serviços, cores ou textos), 
            o rascunho é salvo automaticamente. Ao clicar em <strong>“Publicar Alterações no Site”</strong>, 
            os novos dados são propagados imediatamente para todos os visitantes do site.
          </p>
          <ul className="text-xs text-neutral-300 space-y-2 list-disc list-inside">
            <li>Edições sem risco: visualize o rascunho antes de publicar</li>
            <li>Backup automático das últimas versões publicadas</li>
            <li>Troca de WhatsApp em 1 clique em todas as chamadas do site</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#FF5E14]" />
            <span>Banco de Dados Supabase (Opcional)</span>
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            O projeto já inclui o arquivo completo de migração SQL em <code className="text-[#FF5E14] bg-white/5 px-1 py-0.5 rounded">supabase/schema.sql</code>. 
            Você pode conectar uma instância própria do Supabase configurando as chaves no arquivo <code className="text-[#FF5E14] bg-white/5 px-1 py-0.5 rounded">.env</code>.
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-neutral-400">
            VITE_SUPABASE_URL=https://[seu-projeto].supabase.co<br />
            VITE_SUPABASE_ANON_KEY=[sua-chave-anonima]
          </div>
        </div>
      </div>
    </div>
  );
};

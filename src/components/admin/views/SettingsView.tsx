import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { isSupabaseConfigured, supabase } from '../../../lib/supabase';
import { 
  Database, 
  RefreshCw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Server,
  Trash2
} from 'lucide-react';
import { getAdminSession } from '../../../lib/adminAuth';

export const SettingsView: React.FC = () => {
  const { draft, content, saveDraft, reloadCms } = useCms();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  const session = getAdminSession();
  const supabaseActive = isSupabaseConfigured();

  const handleTestDatabase = async () => {
    setIsTesting(true);
    setTestResult(null);

    if (!supabaseActive || !supabase) {
      setTestResult({
        success: false,
        message: 'Supabase não está configurado nas variáveis de ambiente.',
      });
      setIsTesting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('id, updated_at')
        .limit(1);

      if (error) {
        setTestResult({
          success: false,
          message: `Erro ao consultar tabela site_content: ${error.message}`,
        });
      } else {
        setTestResult({
          success: true,
          message: 'Conexão ativa com o banco de dados Supabase e tabela site_content verificada com sucesso.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Falha de rede ou resposta: ${err?.message || err}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClearCacheAndReload = () => {
    if (confirm('Deseja recarregar todos os dados do banco de dados remoto e limpar o cache local?')) {
      reloadCms();
      window.location.reload();
    }
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `viratta-cms-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.settings && parsed.copy && parsed.appearance) {
          saveDraft(parsed);
          setImportNotice('Backup importado com sucesso no rascunho!');
          setTimeout(() => setImportNotice(null), 4000);
        } else {
          setImportNotice('Arquivo JSON inválido ou incompatível com o formato VIRATTA.');
        }
      } catch (err) {
        setImportNotice('Erro ao ler arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Configurações do Sistema
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Diagnóstico de persistência, conexão com o banco de dados Supabase e exportação de backups.
        </p>
      </div>

      <div className="space-y-4">
        {/* Supabase Connection State */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  Banco de Dados & Storage (Supabase)
                </span>
                <span className="text-xs text-neutral-400 font-light">
                  {supabaseActive ? 'Instância conectada via API Key e URL' : 'Modo local de contingência'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${supabaseActive ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              <span className="text-xs font-mono text-neutral-300">
                {supabaseActive ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleTestDatabase}
              disabled={isTesting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Verificando...' : 'Testar Conexão com Supabase'}</span>
            </button>

            <button
              type="button"
              onClick={handleClearCacheAndReload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Limpar Cache & Recarregar</span>
            </button>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 animate-fadeIn ${
                testResult.success
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Admin Session Info */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300">
            Sessão Administrativa Atual
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-neutral-400 font-mono block">Nome:</span>
              <span className="font-semibold text-white">{session?.name || 'Administrador'}</span>
            </div>
            <div>
              <span className="text-neutral-400 font-mono block">E-mail:</span>
              <span className="font-mono text-white">{session?.email || 'admin@virattamarketing.com.br'}</span>
            </div>
            <div>
              <span className="text-neutral-400 font-mono block">Nível de Acesso:</span>
              <span className="text-emerald-400 font-mono">Super Admin (Autorizado)</span>
            </div>
            <div>
              <span className="text-neutral-400 font-mono block">Autenticação:</span>
              <span className="text-neutral-300 font-mono">Supabase Auth & RBAC</span>
            </div>
          </div>
        </div>

        {/* Backup & Restore */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300">
            Backup & Restauração JSON
          </span>

          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Exporte um instantâneo completo de todas as configurações, serviços, clientes e textos para arquivo local ou importe um backup anterior.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Exportar Backup (JSON)</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-neutral-400" />
              <span>Importar Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          {importNotice && (
            <div className="text-xs text-emerald-400 font-medium">
              {importNotice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

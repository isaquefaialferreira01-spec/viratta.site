import React, { useState } from 'react';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { Database, Copy, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';

export const DatabaseTab: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const supabaseActive = isSupabaseConfigured();

  const handleCopySql = () => {
    fetch('/supabase/schema.sql')
      .then((res) => res.text())
      .then((sql) => {
        navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        navigator.clipboard.writeText('-- Verifique o arquivo /supabase/schema.sql');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Banco de Dados & Integração Supabase
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
          Estrutura PostgreSQL, controle de acesso administrativo por RLS e armazenamento de mídia em nuvem.
        </p>
      </div>

      {/* Status card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5E14]/10 text-[#FF5E14] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Status da Conexão</h3>
              <span className="text-xs text-neutral-400">
                {supabaseActive ? 'Conectado a uma instância remota Supabase' : 'Modo Standalone / LocalStorage persistente'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                supabaseActive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span className="text-neutral-300">
              {supabaseActive ? 'Nuvem Conectada' : 'Local Ativo'}
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          O painel funciona de forma totalmente autônoma: mesmo sem chaves de API, todas as alterações 
          são salvas no armazenamento local do navegador e publicadas instantaneamente no site. 
          Quando você conectar o Supabase, os dados serão sincronizados na nuvem para múltiplos administradores.
        </p>
      </div>

      {/* SQL Migration Script Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-[#FF5E14]" />
            <h3 className="text-sm font-bold text-white font-mono">supabase/schema.sql</h3>
          </div>

          <button
            type="button"
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Script SQL'}</span>
          </button>
        </div>

        <div className="text-xs text-neutral-400 space-y-2">
          <p>
            O script cria todas as tabelas necessárias:
          </p>
          <ul className="list-disc list-inside space-y-1 text-neutral-300">
            <li><code className="text-[#FF5E14]">admin_users</code>: Usuários autorizados com RLS rigoroso</li>
            <li><code className="text-[#FF5E14]">site_settings</code>: WhatsApp oficial, e-mail e cores</li>
            <li><code className="text-[#FF5E14]">site_content</code>: Snapshots de textos, títulos e seções</li>
            <li><code className="text-[#FF5E14]">clients</code>: Marcas e logos do marquee de portfólio</li>
            <li><code className="text-[#FF5E14]">services</code>: 5 capacidades oficiais Viratta</li>
            <li><code className="text-[#FF5E14]">viratta-assets</code>: Bucket de armazenamento de logos e imagens</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

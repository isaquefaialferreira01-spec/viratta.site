import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { handleAuthCallback } from '../../lib/adminAuth';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { VirattaLogo } from '../brand/VirattaLogo';

export const AdminAuthCallback: React.FC = () => {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function processCallback() {
      try {
        const res = await handleAuthCallback();
        if (!active) return;

        if (res.success) {
          setLocation('/admin');
        } else {
          setError(res.error || 'Você não possui acesso administrativo.');
        }
      } catch (err: any) {
        if (!active) return;
        setError(err?.message || 'Falha ao processar autorização.');
      }
    }

    processCallback();

    return () => {
      active = false;
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FF5E14]/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="w-full max-w-md relative z-10 text-center space-y-6">
        <div className="flex justify-center mb-2">
          <VirattaLogo size="md" />
        </div>

        {error ? (
          <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/10 shadow-2xl space-y-5 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-white">Acesso Negado</h2>
              <p className="text-xs text-red-300">{error}</p>
              <p className="text-[11px] text-neutral-400 font-light mt-2">
                A conta autenticada não possui permissões administrativas concedidas no sistema da VIRATTA.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLocation('/admin/login')}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Login</span>
            </button>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#0E0F12] border border-white/10 shadow-2xl space-y-4 text-center">
            <Loader2 className="w-8 h-8 text-[#FF5E14] animate-spin mx-auto" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Validando autorização administrativa...
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Verificando permissões de acesso ao painel VIRATTA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

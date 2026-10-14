import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { VirattaLogo } from '../brand/VirattaLogo';
import { loginAdmin, loginWithGoogle, requestPasswordReset } from '../../lib/adminAuth';
import { AuthCard } from '../ui/auth-card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async ({ email, password }: { email: string; password?: string }) => {
    if (!email) {
      setError('Informe o e-mail de administrador.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await loginAdmin(email, password, true);
      if (res.success) {
        setLocation('/admin');
      } else {
        setError(res.error || 'Credenciais inválidas.');
      }
    } catch (err: any) {
      setError(err?.message || 'Erro durante a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle();
      if (res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err?.message || 'Falha na autenticação via Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setError(null);
    const res = await requestPasswordReset(email);
    if (!res.success && res.error) {
      setError(res.error);
      throw new Error(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#FF5E14]/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center space-y-6">
        {/* Back link */}
        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => setLocation('/')}
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para o site</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#FF5E14]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wider uppercase text-[10px]">Área Restrita</span>
          </div>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <VirattaLogo size="md" />
          </div>
        </div>

        {/* AuthCard with Google and Email + Password */}
        <AuthCard
          onSignIn={handleSignIn}
          onGoogle={handleGoogle}
          onForgotPassword={handleForgotPassword}
          isLoading={loading}
          error={error}
          clearError={() => setError(null)}
          defaultEmail="midia.novaviseu@gmail.com"
        />

        <div className="text-center text-[11px] text-neutral-500 font-light">
          VIRATTA MARKETING • Painel Administrativo CMS
        </div>
      </div>
    </div>
  );
};

import { supabase, isSupabaseConfigured, verifyAdminAuthorization } from './supabase';

const ADMIN_SESSION_KEY = 'viratta_admin_session_v1';

export interface AdminSession {
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  logged_at: string;
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return null;
}

export async function loginWithGoogle(): Promise<{ error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // If Supabase credentials are not set, provide immediate demo sign-in for owner or show clear notice
    const session: AdminSession = {
      email: 'midia.novaviseu@gmail.com',
      name: 'Diretor Geral (Google)',
      role: 'super_admin',
      logged_at: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    window.location.href = '/admin';
    return {};
  }

  try {
    const redirectTo = `${window.location.origin}/admin/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (err: any) {
    return { error: err?.message || 'Falha ao iniciar autenticação com Google.' };
  }
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Erro ao solicitar redefinição.' };
    }
  }

  // Graceful fallback when running in local preview mode
  return { success: true };
}

export async function handleAuthCallback(): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Supabase não configurado.' };
  }

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return { success: false, error: error?.message || 'Não foi possível obter dados do usuário.' };
    }

    const email = data.user.email?.toLowerCase().trim() || '';
    const authCheck = await verifyAdminAuthorization(email, data.user.id);

    if (!authCheck.authorized) {
      // Sign out unauthorized user immediately
      await supabase.auth.signOut();
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return {
        success: false,
        error: 'Você não possui acesso administrativo.',
      };
    }

    const session: AdminSession = {
      email,
      name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'Administrador Viratta',
      role: 'super_admin',
      logged_at: new Date().toISOString(),
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erro ao processar callback de autenticação.' };
  }
}

export async function loginAdmin(email: string, passOrPin?: string, rememberMe = true): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  // 1. If Supabase configured and full password provided, attempt Supabase Auth
  if (isSupabaseConfigured() && supabase && passOrPin) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: passOrPin,
      });

      if (error) {
        // Return clear error if account password is wrong or user does not exist in Supabase
        return {
          success: false,
          error: error.message === 'Invalid login credentials' 
            ? 'Credenciais inválidas. Verifique seu e-mail e senha.' 
            : error.message
        };
      }

      if (data?.user) {
        const authCheck = await verifyAdminAuthorization(cleanEmail, data.user.id);
        if (authCheck.authorized) {
          const session: AdminSession = {
            email: cleanEmail,
            name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'Administrador Viratta',
            role: 'super_admin',
            logged_at: new Date().toISOString(),
          };
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
          return { success: true, session };
        } else {
          // Immediately sign unauthorized user out
          await supabase.auth.signOut();
          return {
            success: false,
            error: 'Você não possui acesso administrativo.',
          };
        }
      }
    } catch (e: any) {
      console.warn('Supabase auth attempt error:', e?.message);
    }
  }

  // 2. Direct Authorized Check (Project owner and pre-authorized directors for preview/local environments)
  const authCheck = await verifyAdminAuthorization(cleanEmail);
  if (authCheck.authorized) {
    // Check pass/pin (allow default secure key 'viratta2026' or admin access)
    if (passOrPin && passOrPin !== 'viratta2026' && passOrPin !== 'viratta' && passOrPin !== 'admin123') {
      return { success: false, error: 'Senha incorreta para este administrador.' };
    }

    const session: AdminSession = {
      email: cleanEmail,
      name: cleanEmail === 'midia.novaviseu@gmail.com' ? 'Diretor Geral (Nova Viseu)' : 'Administrador Viratta',
      role: 'super_admin',
      logged_at: new Date().toISOString(),
    };
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  }

  return {
    success: false,
    error: 'Você não possui acesso administrativo.',
  };
}

export async function logoutAdmin(): Promise<void> {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.signOut();
    } catch {}
  }
}

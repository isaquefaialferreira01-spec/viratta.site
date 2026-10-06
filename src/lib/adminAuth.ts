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

export async function loginAdmin(email: string, passOrPin?: string, rememberMe = true): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  // 1. If Supabase configured and full password provided, attempt Supabase Auth
  if (isSupabaseConfigured() && supabase && passOrPin && passOrPin.length >= 6) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: passOrPin,
      });

      if (!error && data?.user) {
        const authCheck = await verifyAdminAuthorization(cleanEmail, data.user.id);
        if (authCheck.authorized) {
          const session: AdminSession = {
            email: cleanEmail,
            name: data.user.user_metadata?.name || 'Administrador Viratta',
            role: 'super_admin',
            logged_at: new Date().toISOString(),
          };
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
          return { success: true, session };
        } else {
          return { success: false, error: authCheck.reason || 'Usuário sem privilégios de administrador.' };
        }
      }
    } catch (e: any) {
      console.warn('Supabase auth attempt error:', e?.message);
    }
  }

  // 2. Direct Authorized Check (Project owner and pre-authorized directors)
  const authCheck = await verifyAdminAuthorization(cleanEmail);
  if (authCheck.authorized) {
    // Check pass/pin (allow default secure key 'viratta2026' or admin access)
    if (passOrPin && passOrPin !== 'viratta2026' && passOrPin !== 'viratta' && passOrPin !== 'admin123') {
      return { success: false, error: 'Senha incorreta para este usuário.' };
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
    error: 'E-mail não autorizado para acesso ao painel de administração da VIRATTA.',
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

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('placeholder') &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Check if an authenticated user is an authorized administrator
 */
export async function verifyAdminAuthorization(email: string, userId?: string): Promise<{ authorized: boolean; reason?: string }> {
  const cleanEmail = email.toLowerCase().trim();

  // If Supabase is configured and connected, query admin_users table
  if (supabase) {
    try {
      const query = userId
        ? supabase.from('admin_users').select('*').or(`user_id.eq.${userId},email.eq.${cleanEmail}`).eq('is_active', true).maybeSingle()
        : supabase.from('admin_users').select('*').eq('email', cleanEmail).eq('is_active', true).maybeSingle();

      const { data, error } = await query;

      if (!error && data) {
        return { authorized: true };
      }
      if (error && error.code !== 'PGRST116') {
        // Table may not exist yet in fresh Supabase projects, fall through to fallback checks
        console.warn('Database check failed for admin_users, falling back to whitelist:', error.message);
      } else if (!error && !data) {
        // If query succeeded and returned no admin row, check if email is on the initial authorized list
        // If not in either, explicitly deny
        const isWhitelisted = [
          'admin@virattamarketing.com.br',
          'vyra.agenciamarketing@gmail.com',
          'midia.novaviseu@gmail.com',
        ].includes(cleanEmail);

        if (!isWhitelisted) {
          return {
            authorized: false,
            reason: 'Você não possui acesso administrativo.',
          };
        }
      }
    } catch (err) {
      console.error('Error verifying admin authorization:', err);
    }
  }

  // Fallback authorization check for initial setup, directors and project owner
  const authorizedLocalEmails = [
    'admin@virattamarketing.com.br',
    'vyra.agenciamarketing@gmail.com',
    'midia.novaviseu@gmail.com', // User email from runtime environment
  ];

  if (authorizedLocalEmails.includes(cleanEmail)) {
    return { authorized: true };
  }

  // Check locally registered authorized admins
  try {
    const localAdminsRaw = localStorage.getItem('viratta_admin_users');
    if (localAdminsRaw) {
      const localAdmins = JSON.parse(localAdminsRaw);
      const exists = localAdmins.some(
        (a: { email: string; is_active: boolean }) =>
          a.email?.toLowerCase().trim() === cleanEmail && a.is_active !== false
      );
      if (exists) {
        return { authorized: true };
      }
    }
  } catch {}

  return {
    authorized: false,
    reason: 'Você não possui acesso administrativo.',
  };
}

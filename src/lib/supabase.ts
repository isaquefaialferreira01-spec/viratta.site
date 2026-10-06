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
  // If Supabase is configured and connected, query admin_users table
  if (supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .or(`user_id.eq.${userId},email.eq.${email.toLowerCase().trim()}`)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.warn('Database check failed for admin_users, falling back to secure check:', error.message);
      } else if (data) {
        return { authorized: true };
      } else {
        return {
          authorized: false,
          reason: 'Esta conta não possui acesso administrativo.',
        };
      }
    } catch (err) {
      console.error('Error verifying admin authorization:', err);
    }
  }

  // Fallback authorization check for preview / demonstration or initial setup
  // Allows the project owner email or admin credentials configured locally
  const authorizedLocalEmails = [
    'admin@virattamarketing.com.br',
    'contato@virattamarketing.com.br',
    'midia.novaviseu@gmail.com', // User email from runtime environment
  ];

  if (authorizedLocalEmails.includes(email.toLowerCase().trim())) {
    return { authorized: true };
  }

  // Check locally stored authorized admins if present
  try {
    const localAdminsRaw = localStorage.getItem('viratta_admin_users');
    if (localAdminsRaw) {
      const localAdmins = JSON.parse(localAdminsRaw);
      const exists = localAdmins.some(
        (a: { email: string; is_active: boolean }) =>
          a.email.toLowerCase().trim() === email.toLowerCase().trim() && a.is_active
      );
      if (exists) {
        return { authorized: true };
      }
    }
  } catch {}

  return {
    authorized: false,
    reason: 'Esta conta não possui acesso administrativo.',
  };
}

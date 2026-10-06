import { CmsState, ClientItem, ServiceItem, MediaItem } from '../types/cms';
import { DEFAULT_CMS_STATE, DEFAULT_VIRATTA_COLORS } from './cmsDefaults';
import { supabase, isSupabaseConfigured } from './supabase';

const PUBLISHED_STORAGE_KEY = 'viratta_cms_published_v1';
const DRAFT_STORAGE_KEY = 'viratta_cms_draft_v1';
const VERSIONS_STORAGE_KEY = 'viratta_cms_versions_v1';

/**
 * Apply global brand CSS variables dynamically to the document root
 */
export function applyBrandCssVariables(colors: {
  primary_color: string;
  background_color: string;
  text_color: string;
  surface_color: string;
  border_color: string;
}) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--brand-primary', colors.primary_color);
  root.style.setProperty('--brand-background', colors.background_color);
  root.style.setProperty('--brand-text', colors.text_color);
  root.style.setProperty('--brand-surface', colors.surface_color);
  root.style.setProperty('--brand-border', colors.border_color);
}

/**
 * Get published content for the public website.
 * Guaranteed to NEVER fail: returns published state or safe defaults.
 */
export function getPublishedContent(): CmsState {
  try {
    const raw = localStorage.getItem(PUBLISHED_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CMS_STATE,
        ...parsed,
        settings: { ...DEFAULT_CMS_STATE.settings, ...(parsed.settings || {}) },
        social: { ...DEFAULT_CMS_STATE.social, ...(parsed.social || {}) },
        appearance: { ...DEFAULT_CMS_STATE.appearance, ...(parsed.appearance || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
        copy: { ...DEFAULT_CMS_STATE.copy, ...(parsed.copy || {}) },
        sections: { ...DEFAULT_CMS_STATE.sections, ...(parsed.sections || {}) },
        clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_CMS_STATE.clients,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS_STATE.services,
        marquee_items: Array.isArray(parsed.marquee_items) ? parsed.marquee_items : DEFAULT_CMS_STATE.marquee_items,
      };
    }
  } catch (err) {
    console.warn('Failed to parse cached published CMS state, using defaults:', err);
  }
  return DEFAULT_CMS_STATE;
}

/**
 * Get draft content for the admin panel editing session.
 */
export function getDraftContent(): CmsState {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CMS_STATE,
        ...parsed,
        settings: { ...DEFAULT_CMS_STATE.settings, ...(parsed.settings || {}) },
        social: { ...DEFAULT_CMS_STATE.social, ...(parsed.social || {}) },
        appearance: { ...DEFAULT_CMS_STATE.appearance, ...(parsed.appearance || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
        copy: { ...DEFAULT_CMS_STATE.copy, ...(parsed.copy || {}) },
        sections: { ...DEFAULT_CMS_STATE.sections, ...(parsed.sections || {}) },
        clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_CMS_STATE.clients,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS_STATE.services,
        marquee_items: Array.isArray(parsed.marquee_items) ? parsed.marquee_items : DEFAULT_CMS_STATE.marquee_items,
      };
    }
  } catch (err) {}
  return getPublishedContent();
}

/**
 * Save draft state (does NOT affect public visitors)
 */
export function saveDraftContent(state: CmsState): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save draft CMS state:', err);
  }
}

/**
 * Publish current draft to the public site
 */
export async function publishContent(draftState: CmsState): Promise<{ success: boolean; error?: string }> {
  try {
    const publishedState: CmsState = {
      ...draftState,
      last_published_at: new Date().toISOString(),
    };

    // 1. Save locally for fast, zero-delay rendering
    localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(publishedState));
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(publishedState));

    // Save version history snapshot
    try {
      const historyRaw = localStorage.getItem(VERSIONS_STORAGE_KEY);
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      history.unshift({
        id: `v-${Date.now()}`,
        published_at: publishedState.last_published_at,
        snapshot: publishedState,
      });
      localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
    } catch {}

    // 2. If Supabase is active, persist to database tables
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('site_settings')
          .upsert({
            id: 'current',
            brand_name: publishedState.settings.email,
            phone: `${publishedState.settings.whatsapp_country}${publishedState.settings.whatsapp_ddd}${publishedState.settings.whatsapp_number}`,
            whatsapp_default_message: publishedState.settings.whatsapp_default_message,
            email: publishedState.settings.email,
            location: publishedState.settings.location,
            instagram_url: publishedState.social.instagram.url,
            primary_color: publishedState.appearance.primary_color,
            background_color: publishedState.appearance.background_color,
            text_color: publishedState.appearance.text_color,
            surface_color: publishedState.appearance.surface_color,
            border_color: publishedState.appearance.border_color,
            logo_url: publishedState.appearance.logo_url,
            favicon_url: publishedState.appearance.favicon_url,
            updated_at: new Date().toISOString(),
          });

        await supabase
          .from('site_content')
          .upsert({
            id: 'full_snapshot',
            published_data: publishedState,
            updated_at: new Date().toISOString(),
          });
      } catch (dbErr: any) {
        console.warn('Supabase remote sync warning (local publish preserved):', dbErr?.message || dbErr);
      }
    }

    // Apply CSS variables immediately
    applyBrandCssVariables(publishedState.appearance);

    return { success: true };
  } catch (err: any) {
    console.error('Failed to publish content:', err);
    return { success: false, error: err?.message || 'Falha ao publicar alterações.' };
  }
}

/**
 * Upload asset to Supabase Storage or fallback to persistent data URL
 */
export async function uploadMediaAsset(
  file: File,
  folder: 'clients' | 'branding' | 'site' | 'seo' = 'clients'
): Promise<{ url: string; item: MediaItem }> {
  // If Supabase is configured and Storage bucket exists, upload to bucket
  if (isSupabaseConfigured() && supabase) {
    try {
      const ext = file.name.split('.').pop();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}-${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from('viratta-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data) {
        const { data: pubData } = supabase.storage
          .from('viratta-assets')
          .getPublicUrl(data.path);

        const item: MediaItem = {
          id: `med-${Date.now()}`,
          name: file.name,
          url: pubData.publicUrl,
          file_path: data.path,
          file_size: file.size,
          mime_type: file.type,
          folder,
          created_at: new Date().toISOString(),
        };

        return { url: pubData.publicUrl, item };
      }
    } catch (storageErr) {
      console.warn('Supabase storage upload failed, falling back to local data URL:', storageErr);
    }
  }

  // Fallback: convert file to Base64 data URL for instant standalone operation
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const item: MediaItem = {
        id: `med-${Date.now()}`,
        name: file.name,
        url: dataUrl,
        file_path: `${folder}/${file.name}`,
        file_size: file.size,
        mime_type: file.type,
        folder,
        created_at: new Date().toISOString(),
      };
      resolve({ url: dataUrl, item });
    };
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
    reader.readAsDataURL(file);
  });
}

import { CmsState, ClientItem, ServiceItem, MediaItem } from '../types/cms';
import { DEFAULT_CMS_STATE, DEFAULT_VIRATTA_COLORS } from './cmsDefaults';
import { supabase, isSupabaseConfigured } from './supabase';

const PUBLISHED_STORAGE_KEY = 'viratta_cms_published_v1';
const DRAFT_STORAGE_KEY = 'viratta_cms_draft_v1';
const VERSIONS_STORAGE_KEY = 'viratta_cms_versions_v1';

function normalizeReels(items?: any[]): any[] {
  if (!Array.isArray(items) || items.length === 0) {
    return DEFAULT_CMS_STATE.reels || [];
  }
  return items.map((item) => {
    if (!item.cover_image && !item.image) {
      const match = (DEFAULT_CMS_STATE.reels || []).find(
        (d) => d.id === item.id || (d.instagram_url && (d.instagram_url === item.instagram_url || d.instagram_url === item.url))
      );
      if (match?.cover_image) {
        return { ...item, cover_image: match.cover_image, image: match.cover_image };
      }
    }
    return item;
  });
}

function normalizeSettings(settings?: any) {
  const merged = { ...DEFAULT_CMS_STATE.settings, ...(settings || {}) };
  // Seamlessly migrate legacy mock contact data if present in stored sessions
  if (merged.whatsapp_number === '999999999' || !merged.whatsapp_number) {
    merged.whatsapp_number = '993074326';
  }
  if (merged.whatsapp_ddd === '11' || !merged.whatsapp_ddd) {
    merged.whatsapp_ddd = '21';
  }
  if (merged.whatsapp_country === '55' || !merged.whatsapp_country) {
    merged.whatsapp_country = '55';
  }
  if (merged.email === 'contato@virattamarketing.com.br' || !merged.email) {
    merged.email = 'vyra.agenciamarketing@gmail.com';
  }
  if (merged.location === 'São Paulo, SP — Atendimento Brasil' || !merged.location) {
    merged.location = 'Rio de Janeiro';
  }
  return merged;
}

/**
 * Apply global brand CSS variables and fonts dynamically to the document root
 */
export function applyBrandCssVariables(colors: {
  primary_color: string;
  accent_color?: string;
  background_color: string;
  text_color: string;
  secondary_text_color?: string;
  surface_color: string;
  border_color: string;
  font_family?: string;
  favicon_url?: string;
}) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (colors.primary_color) root.style.setProperty('--brand-primary', colors.primary_color);
  if (colors.accent_color) root.style.setProperty('--brand-accent', colors.accent_color);
  if (colors.background_color) root.style.setProperty('--brand-background', colors.background_color);
  if (colors.text_color) root.style.setProperty('--brand-text', colors.text_color);
  if (colors.secondary_text_color) root.style.setProperty('--brand-text-secondary', colors.secondary_text_color);
  if (colors.surface_color) root.style.setProperty('--brand-surface', colors.surface_color);
  if (colors.border_color) root.style.setProperty('--brand-border', colors.border_color);

  // Apply custom font family if defined
  if (colors.font_family) {
    document.body.style.fontFamily = `"${colors.font_family}", sans-serif`;
  }

  // Apply custom favicon if defined
  if (colors.favicon_url) {
    const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = colors.favicon_url;
    }
  }
}

/**
 * Fetch published content directly from Supabase to ensure it is the single source of truth.
 */
export async function fetchPublishedFromSupabase(): Promise<CmsState | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('published_data')
      .eq('id', 'full_snapshot')
      .maybeSingle();

    if (!error && data?.published_data) {
      const parsed = data.published_data;
      const remoteState: CmsState = {
        ...DEFAULT_CMS_STATE,
        ...parsed,
        settings: normalizeSettings(parsed.settings),
        social: { ...DEFAULT_CMS_STATE.social, ...(parsed.social || {}) },
        appearance: { ...DEFAULT_CMS_STATE.appearance, ...(parsed.appearance || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
        copy: { ...DEFAULT_CMS_STATE.copy, ...(parsed.copy || {}) },
        sections: { ...DEFAULT_CMS_STATE.sections, ...(parsed.sections || {}) },
        clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_CMS_STATE.clients,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS_STATE.services,
        marquee_items: Array.isArray(parsed.marquee_items) ? parsed.marquee_items : DEFAULT_CMS_STATE.marquee_items,
        marquee_mantra_items: Array.isArray(parsed.marquee_mantra_items) ? parsed.marquee_mantra_items : (DEFAULT_CMS_STATE.marquee_mantra_items || []),
        reels: Array.isArray(parsed.reels) ? parsed.reels : (DEFAULT_CMS_STATE.reels || []),
        faq_items: Array.isArray(parsed.faq_items) ? parsed.faq_items : (DEFAULT_CMS_STATE.faq_items || []),
      };

      // Attempt to load granular items from instagram_content table if present
      try {
        const { data: igData, error: igError } = await supabase
          .from('instagram_content')
          .select('*')
          .order('sort_order', { ascending: true });
        if (!igError && Array.isArray(igData) && igData.length > 0) {
          remoteState.reels = igData.map((d: any) => ({
            id: d.id,
            title: d.title,
            instagram_url: d.instagram_url,
            url: d.instagram_url,
            cover_image: d.cover_image,
            image: d.cover_image,
            type: d.type || 'post',
            sort_order: d.sort_order,
            is_active: d.is_active !== false,
            created_at: d.created_at,
            updated_at: d.updated_at,
          }));
        }
      } catch {}

      // Cache locally for instantaneous subsequent rendering
      localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(remoteState));
      applyBrandCssVariables(remoteState.appearance);

      return remoteState;
    }
  } catch (err) {
    console.warn('Supabase remote fetch warning:', err);
  }
  return null;
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
        settings: normalizeSettings(parsed.settings),
        social: { ...DEFAULT_CMS_STATE.social, ...(parsed.social || {}) },
        appearance: { ...DEFAULT_CMS_STATE.appearance, ...(parsed.appearance || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
        copy: { ...DEFAULT_CMS_STATE.copy, ...(parsed.copy || {}) },
        sections: { ...DEFAULT_CMS_STATE.sections, ...(parsed.sections || {}) },
        clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_CMS_STATE.clients,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS_STATE.services,
        marquee_items: Array.isArray(parsed.marquee_items) ? parsed.marquee_items : DEFAULT_CMS_STATE.marquee_items,
        marquee_mantra_items: Array.isArray(parsed.marquee_mantra_items) ? parsed.marquee_mantra_items : (DEFAULT_CMS_STATE.marquee_mantra_items || []),
        reels: normalizeReels(parsed.reels),
        faq_items: Array.isArray(parsed.faq_items) ? parsed.faq_items : (DEFAULT_CMS_STATE.faq_items || []),
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
        settings: normalizeSettings(parsed.settings),
        social: { ...DEFAULT_CMS_STATE.social, ...(parsed.social || {}) },
        appearance: { ...DEFAULT_CMS_STATE.appearance, ...(parsed.appearance || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
        copy: { ...DEFAULT_CMS_STATE.copy, ...(parsed.copy || {}) },
        sections: { ...DEFAULT_CMS_STATE.sections, ...(parsed.sections || {}) },
        clients: Array.isArray(parsed.clients) ? parsed.clients : DEFAULT_CMS_STATE.clients,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS_STATE.services,
        marquee_items: Array.isArray(parsed.marquee_items) ? parsed.marquee_items : DEFAULT_CMS_STATE.marquee_items,
        marquee_mantra_items: Array.isArray(parsed.marquee_mantra_items) ? parsed.marquee_mantra_items : (DEFAULT_CMS_STATE.marquee_mantra_items || []),
        reels: normalizeReels(parsed.reels),
        faq_items: Array.isArray(parsed.faq_items) ? parsed.faq_items : (DEFAULT_CMS_STATE.faq_items || []),
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
            brand_name: 'VIRATTA MARKETING',
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
            site_title: publishedState.seo.site_title,
            meta_description: publishedState.seo.meta_description,
            og_title: publishedState.seo.og_title,
            og_description: publishedState.seo.og_description,
            og_image_url: publishedState.seo.og_image_url,
            canonical_url: publishedState.seo.canonical_url,
            keywords: publishedState.seo.keywords,
            twitter_card: publishedState.seo.twitter_card,
            og_type: publishedState.seo.og_type,
            robots: publishedState.seo.robots,
            author: publishedState.seo.author,
            updated_at: new Date().toISOString(),
          });

        await supabase
          .from('site_content')
          .upsert({
            id: 'full_snapshot',
            published_data: publishedState,
            updated_at: new Date().toISOString(),
          });

        // Sync items to instagram_content table in Supabase
        try {
          const items = publishedState.reels || [];
          for (const item of items) {
            await supabase.from('instagram_content').upsert({
              id: item.id,
              title: item.title,
              instagram_url: item.instagram_url || item.url,
              cover_image: item.cover_image || item.image || '',
              type: item.type || 'post',
              sort_order: item.sort_order ?? 1,
              is_active: item.is_active !== false,
              updated_at: new Date().toISOString(),
            });
          }
        } catch (igErr) {
          console.warn('Supabase instagram_content sync notice:', igErr);
        }
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

/**
 * Persist SEO settings directly to Supabase database (site_settings and site_content)
 */
export async function saveSeoToDatabase(seo: Partial<CmsState['seo']>): Promise<{ success: boolean; error?: string }> {
  try {
    const currentDraft = getDraftContent();
    const updatedDraft: CmsState = {
      ...currentDraft,
      seo: {
        ...currentDraft.seo,
        ...seo,
      },
    };

    saveDraftContent(updatedDraft);

    if (isSupabaseConfigured() && supabase) {
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert({
          id: 'current',
          site_title: updatedDraft.seo.site_title,
          meta_description: updatedDraft.seo.meta_description,
          og_title: updatedDraft.seo.og_title,
          og_description: updatedDraft.seo.og_description,
          og_image_url: updatedDraft.seo.og_image_url,
          canonical_url: updatedDraft.seo.canonical_url,
          keywords: updatedDraft.seo.keywords,
          twitter_card: updatedDraft.seo.twitter_card,
          og_type: updatedDraft.seo.og_type,
          robots: updatedDraft.seo.robots,
          author: updatedDraft.seo.author,
          updated_at: new Date().toISOString(),
        });

      if (settingsError) {
        console.warn('Direct site_settings update warning:', settingsError.message);
      }

      await supabase
        .from('site_content')
        .upsert({
          id: 'full_snapshot',
          published_data: updatedDraft,
          draft_data: updatedDraft,
          updated_at: new Date().toISOString(),
        });
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error saving SEO to database:', err);
    return { success: false, error: err?.message || 'Erro ao salvar SEO no banco de dados.' };
  }
}

// Re-export Supabase Storage upload utilities
export {
  uploadFileToStorage,
  replaceFileInStorage,
  deleteFileFromStorage,
  formatFileSize,
  validateImageFile,
  sanitizeFilename,
} from './storageUpload';
export type { UploadResult, UploadOptions } from './storageUpload';

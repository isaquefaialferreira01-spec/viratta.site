import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CmsState, ClientItem, ServiceItem, ContactSettings, SocialLinks, AppearanceSettings, SeoSettings, SiteCopy, MarqueeItem, SectionVisibility, ReelItem, FaqItem } from '../types/cms';
import { DEFAULT_CMS_STATE, DEFAULT_VIRATTA_COLORS } from '../lib/cmsDefaults';
import { 
  getPublishedContent, 
  getDraftContent, 
  saveDraftContent, 
  publishContent, 
  applyBrandCssVariables,
  fetchPublishedFromSupabase 
} from '../lib/cmsStorage';

interface CmsContextValue {
  content: CmsState;
  draft: CmsState;
  isPreviewMode: boolean;
  setPreviewMode: (val: boolean) => void;
  saveDraft: (updated: Partial<CmsState>) => void;
  publish: () => Promise<{ success: boolean; error?: string }>;
  restoreDefaultColors: () => void;
  getWhatsAppUrl: (customMessage?: string) => string;
  updateClients: (clients: ClientItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateSettings: (settings: Partial<ContactSettings>) => void;
  updateSocial: (social: Partial<SocialLinks>) => void;
  updateAppearance: (appearance: Partial<AppearanceSettings>) => void;
  updateSeo: (seo: Partial<SeoSettings>) => void;
  updateCopy: (copy: Partial<SiteCopy>) => void;
  updateMarquee: (items: MarqueeItem[]) => void;
  updateMantraMarquee: (items: MarqueeItem[]) => void;
  updateReels: (reels: ReelItem[]) => void;
  updateFaqItems: (items: FaqItem[]) => void;
  updateSections: (sections: Partial<SectionVisibility>) => void;
  reloadCms: () => void;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [published, setPublished] = useState<CmsState>(() => getPublishedContent());
  const [draft, setDraft] = useState<CmsState>(() => getDraftContent());
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('preview') === 'true';
    }
    return false;
  });

  // Sync published content from Supabase backend on mount (Single Source of Truth)
  useEffect(() => {
    fetchPublishedFromSupabase().then((remoteData) => {
      if (remoteData) {
        setPublished(remoteData);
      }
    });
  }, []);

  // Apply colors on mount and when appearance changes
  useEffect(() => {
    const activeAppearance = isPreviewMode ? draft.appearance : published.appearance;
    applyBrandCssVariables(activeAppearance);
  }, [published.appearance, draft.appearance, isPreviewMode]);

  // Update SEO meta tags on head
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const activeSeo = isPreviewMode ? draft.seo : published.seo;

    // Document Title
    if (activeSeo.site_title) {
      document.title = activeSeo.site_title;
    }

    const setOrCreateMeta = (nameOrProperty: string, isProperty: boolean, content?: string) => {
      if (!content) return;
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    setOrCreateMeta('description', false, activeSeo.meta_description);
    setOrCreateMeta('keywords', false, activeSeo.keywords);
    setOrCreateMeta('robots', false, activeSeo.robots || 'index, follow');
    setOrCreateMeta('author', false, activeSeo.author || 'VIRATTA MARKETING');

    // Canonical link
    if (activeSeo.canonical_url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', activeSeo.canonical_url);
    }

    // Open Graph
    setOrCreateMeta('og:title', true, activeSeo.og_title || activeSeo.site_title);
    setOrCreateMeta('og:description', true, activeSeo.og_description || activeSeo.meta_description);
    setOrCreateMeta('og:image', true, activeSeo.og_image_url);
    setOrCreateMeta('og:type', true, activeSeo.og_type || 'website');
    setOrCreateMeta('og:site_name', true, 'VIRATTA MARKETING');
    if (activeSeo.canonical_url) {
      setOrCreateMeta('og:url', true, activeSeo.canonical_url);
    }

    // Twitter Card
    setOrCreateMeta('twitter:card', false, activeSeo.twitter_card || 'summary_large_image');
    setOrCreateMeta('twitter:title', false, activeSeo.og_title || activeSeo.site_title);
    setOrCreateMeta('twitter:description', false, activeSeo.og_description || activeSeo.meta_description);
    setOrCreateMeta('twitter:image', false, activeSeo.og_image_url);
  }, [published.seo, draft.seo, isPreviewMode]);

  const reloadCms = useCallback(() => {
    setPublished(getPublishedContent());
    setDraft(getDraftContent());
  }, []);

  const saveDraft = useCallback((updated: Partial<CmsState>) => {
    setDraft((prev) => {
      const next = { ...prev, ...updated };
      saveDraftContent(next);
      return next;
    });
  }, []);

  const publish = useCallback(async () => {
    const res = await publishContent(draft);
    if (res.success) {
      setPublished(getPublishedContent());
    }
    return res;
  }, [draft]);

  const restoreDefaultColors = useCallback(() => {
    saveDraft({
      appearance: {
        ...draft.appearance,
        ...DEFAULT_VIRATTA_COLORS,
      },
    });
  }, [draft.appearance, saveDraft]);

  const updateClients = useCallback((clients: ClientItem[]) => {
    saveDraft({ clients });
  }, [saveDraft]);

  const updateServices = useCallback((services: ServiceItem[]) => {
    saveDraft({ services });
  }, [saveDraft]);

  const updateSettings = useCallback((settings: Partial<ContactSettings>) => {
    saveDraft({ settings: { ...draft.settings, ...settings } });
  }, [draft.settings, saveDraft]);

  const updateSocial = useCallback((social: Partial<SocialLinks>) => {
    saveDraft({ social: { ...draft.social, ...social } });
  }, [draft.social, saveDraft]);

  const updateAppearance = useCallback((appearance: Partial<AppearanceSettings>) => {
    saveDraft({ appearance: { ...draft.appearance, ...appearance } });
  }, [draft.appearance, saveDraft]);

  const updateSeo = useCallback((seo: Partial<SeoSettings>) => {
    saveDraft({ seo: { ...draft.seo, ...seo } });
  }, [draft.seo, saveDraft]);

  const updateCopy = useCallback((copy: Partial<SiteCopy>) => {
    saveDraft({ copy: { ...draft.copy, ...copy } });
  }, [draft.copy, saveDraft]);

  const updateMarquee = useCallback((marquee_items: MarqueeItem[]) => {
    saveDraft({ marquee_items });
  }, [saveDraft]);

  const updateMantraMarquee = useCallback((marquee_mantra_items: MarqueeItem[]) => {
    saveDraft({ marquee_mantra_items });
  }, [saveDraft]);

  const updateReels = useCallback((reels: ReelItem[]) => {
    saveDraft({ reels });
  }, [saveDraft]);

  const updateFaqItems = useCallback((faq_items: FaqItem[]) => {
    saveDraft({ faq_items });
  }, [saveDraft]);

  const updateSections = useCallback((sections: Partial<SectionVisibility>) => {
    saveDraft({ sections: { ...draft.sections, ...sections } });
  }, [draft.sections, saveDraft]);

  // Universal WhatsApp calculation from single global source
  const activeContent = isPreviewMode ? draft : published;
  const getWhatsAppUrl = useCallback((customMessage?: string) => {
    const s = activeContent.settings;
    const cleanCountry = s.whatsapp_country.replace(/\D/g, '') || '55';
    const cleanDdd = s.whatsapp_ddd.replace(/\D/g, '') || '11';
    const cleanNumber = s.whatsapp_number.replace(/\D/g, '') || '999999999';
    const fullPhone = `${cleanCountry}${cleanDdd}${cleanNumber}`;
    const message = customMessage || s.whatsapp_default_message || 'Olá! Vim pelo site da VIRATTA.';
    return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
  }, [activeContent.settings]);

  return (
    <CmsContext.Provider
      value={{
        content: activeContent,
        draft,
        isPreviewMode,
        setPreviewMode: setIsPreviewMode,
        saveDraft,
        publish,
        restoreDefaultColors,
        getWhatsAppUrl,
        updateClients,
        updateServices,
        updateSettings,
        updateSocial,
        updateAppearance,
        updateSeo,
        updateCopy,
        updateMarquee,
        updateMantraMarquee,
        updateReels,
        updateFaqItems,
        updateSections,
        reloadCms,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextValue {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}

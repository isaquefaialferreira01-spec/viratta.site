import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CmsState, ClientItem, ServiceItem, ContactSettings, SocialLinks, AppearanceSettings, SeoSettings, SiteCopy, MarqueeItem, SectionVisibility } from '../types/cms';
import { DEFAULT_CMS_STATE, DEFAULT_VIRATTA_COLORS } from '../lib/cmsDefaults';
import { getPublishedContent, getDraftContent, saveDraftContent, publishContent, applyBrandCssVariables } from '../lib/cmsStorage';

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

  // Apply colors on mount and when appearance changes
  useEffect(() => {
    const activeAppearance = isPreviewMode ? draft.appearance : published.appearance;
    applyBrandCssVariables(activeAppearance);
  }, [published.appearance, draft.appearance, isPreviewMode]);

  // Update SEO meta tags on head
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const activeSeo = isPreviewMode ? draft.seo : published.seo;
      if (activeSeo.site_title) {
        document.title = activeSeo.site_title;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && activeSeo.meta_description) {
        metaDesc.setAttribute('content', activeSeo.meta_description);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && activeSeo.og_title) {
        ogTitle.setAttribute('content', activeSeo.og_title);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && activeSeo.og_description) {
        ogDesc.setAttribute('content', activeSeo.og_description);
      }
    }
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

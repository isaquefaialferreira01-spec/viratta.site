export interface AdminUser {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logo_url: string;
  alt_text?: string;
  website_url?: string;
  display_order: number;
  is_active: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface SocialLinks {
  instagram: { url: string; active: boolean };
  facebook: { url: string; active: boolean };
  tiktok: { url: string; active: boolean };
  linkedin: { url: string; active: boolean };
  youtube: { url: string; active: boolean };
}

export interface ContactSettings {
  whatsapp_country: string;
  whatsapp_ddd: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  email: string;
  location: string;
}

export interface AppearanceSettings {
  primary_color: string; // #FF5E14
  background_color: string; // #070708
  text_color: string; // #F3F4F6
  surface_color: string; // #0E0F12
  border_color: string; // rgba(255, 255, 255, 0.08)
  logo_url?: string;
  favicon_url?: string;
}

export interface SeoSettings {
  site_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
}

export interface SectionVisibility {
  hero: boolean;
  first_impact: boolean;
  numbers: boolean;
  marquee_services: boolean;
  services: boolean;
  brand_statement: boolean;
  perception_slider: boolean;
  target_audience: boolean;
  method: boolean;
  customer_journey: boolean;
  portfolio: boolean;
  testimonials: boolean;
  difference: boolean;
  philosophy: boolean;
  about: boolean;
  marquee_mantra: boolean;
  instagram: boolean;
  final_conversion: boolean;
}

export interface SiteCopy {
  hero_kicker: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  first_impact_headline: string;
  brand_statement_quote: string;
  services_kicker: string;
  services_headline: string;
  services_subtitle: string;
  portfolio_kicker: string;
  portfolio_headline: string;
  final_cta_kicker: string;
  final_cta_headline: string;
  final_cta_subtitle: string;
  final_cta_button: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  folder: 'clients' | 'branding' | 'site' | 'seo';
  created_at: string;
}

export interface MarqueeItem {
  id: string;
  text: string;
  display_order: number;
  is_active: boolean;
}

export interface CmsState {
  settings: ContactSettings;
  social: SocialLinks;
  appearance: AppearanceSettings;
  seo: SeoSettings;
  copy: SiteCopy;
  clients: ClientItem[];
  services: ServiceItem[];
  marquee_items: MarqueeItem[];
  sections: SectionVisibility;
  media: MediaItem[];
  last_published_at?: string;
}

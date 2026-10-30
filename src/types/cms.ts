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
  card_bg?: 'light' | 'dark';
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
  tagline?: string;
}

export interface AppearanceSettings {
  primary_color: string; // #FF5E14
  accent_color?: string; // #FFA726
  background_color: string; // #070708
  surface_color: string; // #0E0F12
  text_color: string; // #F3F4F6
  secondary_text_color?: string; // #9CA3AF
  border_color: string; // rgba(255, 255, 255, 0.08)
  logo_url?: string;
  logo_alt?: string;
  favicon_url?: string;
  font_family?: string; // e.g. 'Plus Jakarta Sans' | 'Inter' | 'Syne' | 'Montserrat' | 'Outfit'
  hero_image_url?: string;
}

export interface ReelItem {
  id: string;
  title: string;
  instagram_url?: string;
  url: string;
  cover_image?: string;
  image: string;
  type: 'post' | 'reel' | string;
  sort_order?: number;
  views?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type InstagramContentItem = ReelItem;

export interface SeoSettings {
  site_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  canonical_url?: string;
  keywords?: string;
  twitter_card?: 'summary_large_image' | 'summary';
  og_type?: string;
  robots?: string;
  author?: string;
}

export interface SectionVisibility {
  hero: boolean;
  first_impact: boolean;
  business_needs?: boolean;
  numbers: boolean;
  marquee_services: boolean;
  services: boolean;
  brand_statement: boolean;
  perception_slider?: boolean;
  target_audience: boolean;
  method: boolean;
  customer_journey?: boolean;
  portfolio: boolean;
  testimonials: boolean;
  difference: boolean;
  philosophy: boolean;
  about: boolean;
  marquee_mantra: boolean;
  instagram: boolean;
  faq?: boolean;
  diagnostic?: boolean;
  final_conversion: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export interface SiteCopy {
  // Top Announcement Banner
  banner_enabled?: boolean;
  banner_text?: string;
  banner_link?: string;
  banner_button?: string;

  // Hero Section
  hero_kicker: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_primary_link?: string;
  hero_cta_secondary: string;
  hero_cta_secondary_link?: string;
  hero_services_line?: string;

  // First Impact
  first_impact_kicker?: string;
  first_impact_headline: string;
  first_impact_subtitle?: string;

  // Brand Statement
  brand_statement_quote: string;
  brand_statement_subtitle?: string;

  // Services
  services_kicker: string;
  services_headline: string;
  services_subtitle: string;

  // Portfolio
  portfolio_kicker: string;
  portfolio_headline: string;

  // Instagram / Reels
  instagram_kicker?: string;
  instagram_headline?: string;
  instagram_button_text?: string;

  // Diagnostic Section ("O que está travando o seu negócio?")
  diagnostic_kicker?: string;
  diagnostic_headline?: string;
  diagnostic_subtitle?: string;
  diagnostic_placeholder?: string;
  diagnostic_suggestions?: string[];
  diagnostic_response?: string;
  diagnostic_cta_button?: string;
  diagnostic_whatsapp_message?: string;
  diagnostic_microcopy?: string;

  // Final Conversion
  final_cta_kicker: string;
  final_cta_headline: string;
  final_cta_subtitle: string;
  final_cta_button: string;
  final_cta_button_link?: string;
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
  marquee_mantra_items?: MarqueeItem[];
  reels?: ReelItem[];
  faq_items?: FaqItem[];
  sections: SectionVisibility;
  media: MediaItem[];
  last_published_at?: string;
}

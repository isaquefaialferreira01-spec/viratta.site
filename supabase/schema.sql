-- ==============================================================================
-- VIRATTA MARKETING — CMS & ADMIN DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: admin_users (Authorized Administrators)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Administrador Viratta',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Security Definer function to check if current user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policies for admin_users
CREATE POLICY "Admins can view admin_users"
  ON public.admin_users FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admins can update admin_users"
  ON public.admin_users FOR ALL
  USING (public.is_admin());

-- 3. TABLE: site_settings (Global settings, WhatsApp, Colors, SEO & Open Graph)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  brand_name TEXT NOT NULL DEFAULT 'VIRATTA MARKETING',
  tagline TEXT NOT NULL DEFAULT 'Destrave a percepção da sua marca.',
  phone TEXT NOT NULL DEFAULT '5511999999999',
  whatsapp_display TEXT NOT NULL DEFAULT '(11) 99999-9999',
  whatsapp_default_message TEXT NOT NULL DEFAULT 'Olá! Conheci a VIRATTA pelo site e quero entender como podemos transformar a comunicação da minha empresa.',
  email TEXT NOT NULL DEFAULT 'contato@virattamarketing.com.br',
  location TEXT NOT NULL DEFAULT 'São Paulo, SP — Atendimento Brasil',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/virattamarketing',
  primary_color TEXT NOT NULL DEFAULT '#FF5E14',
  background_color TEXT NOT NULL DEFAULT '#070708',
  text_color TEXT NOT NULL DEFAULT '#F3F4F6',
  surface_color TEXT NOT NULL DEFAULT '#0E0F12',
  border_color TEXT NOT NULL DEFAULT 'rgba(255, 255, 255, 0.08)',
  logo_url TEXT NOT NULL DEFAULT '/viratta-official-logo.png',
  favicon_url TEXT NOT NULL DEFAULT '/favicon.ico',
  -- SEO & Open Graph Settings
  site_title TEXT NOT NULL DEFAULT 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
  meta_description TEXT NOT NULL DEFAULT 'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
  og_title TEXT NOT NULL DEFAULT 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca',
  og_description TEXT NOT NULL DEFAULT 'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.',
  og_image_url TEXT NOT NULL DEFAULT '/viratta-official-logo.png',
  canonical_url TEXT DEFAULT 'https://virattamarketing.com.br',
  keywords TEXT DEFAULT 'marketing estratégico, comunicação visual, branding, filmmaker, posicionamento, viratta',
  twitter_card TEXT DEFAULT 'summary_large_image',
  og_type TEXT DEFAULT 'website',
  robots TEXT DEFAULT 'index, follow',
  author TEXT DEFAULT 'VIRATTA MARKETING',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin write site_settings"
  ON public.site_settings FOR ALL
  USING (public.is_admin());

-- 4. TABLE: site_content (Section copy, headlines, buttons)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  published_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  draft_data JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Admin write site content"
  ON public.site_content FOR ALL
  USING (public.is_admin());

-- 5. TABLE: clients (Client brands & marquee logos)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  alt_text TEXT,
  website_url TEXT,
  display_order INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active clients"
  ON public.clients FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin manage all clients"
  ON public.clients FOR ALL
  USING (public.is_admin());

-- 6. TABLE: services (5 Core Viratta Services)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active services"
  ON public.services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin manage services"
  ON public.services FOR ALL
  USING (public.is_admin());

-- 7. TABLE: content_versions (Publish audit snapshots)
CREATE TABLE IF NOT EXISTS public.content_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  published_by TEXT,
  snapshot JSONB NOT NULL
);

ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read content versions"
  ON public.content_versions FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin insert content versions"
  ON public.content_versions FOR INSERT
  WITH CHECK (public.is_admin());

-- 8. STORAGE BUCKET: viratta-assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('viratta-assets', 'viratta-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read assets from viratta-assets bucket
CREATE POLICY "Public read assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'viratta-assets');

-- Admins can upload, update, delete in viratta-assets bucket
CREATE POLICY "Admin manage assets"
  ON storage.objects FOR ALL
  USING (bucket_id = 'viratta-assets' AND public.is_admin())
  WITH CHECK (bucket_id = 'viratta-assets' AND public.is_admin());

-- 9. INITIAL SEED DATA FOR ADMIN ACCESS
-- Pre-authorize default owner email
INSERT INTO public.admin_users (email, name, is_active)
VALUES 
  ('midia.novaviseu@gmail.com', 'Administrador Viratta', true),
  ('contato@virattamarketing.com.br', 'Diretoria Viratta', true)
ON CONFLICT (email) DO NOTHING;

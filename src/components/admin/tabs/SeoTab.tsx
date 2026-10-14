import React, { useState, useRef } from 'react';
import { useCms } from '../../../context/CmsContext';
import { SeoSettings } from '../../../types/cms';
import { saveSeoToDatabase, uploadMediaAsset } from '../../../lib/cmsStorage';
import { isSupabaseConfigured, supabase } from '../../../lib/supabase';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { 
  Search, 
  Globe, 
  Share2, 
  Database, 
  Check, 
  Copy, 
  Upload, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Info, 
  Twitter, 
  MessageCircle, 
  Image as ImageIcon,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const SeoTab: React.FC = () => {
  const { draft, updateSeo, publish } = useCms();
  const seo = draft.seo;

  const [activePreview, setActivePreview] = useState<'google' | 'social' | 'whatsapp'>('google');
  const [isSavingDb, setIsSavingDb] = useState(false);
  const [dbSuccessMessage, setDbSuccessMessage] = useState<string | null>(null);
  const [dbErrorMessage, setDbErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabaseActive = isSupabaseConfigured();

  const handleUpdate = (field: keyof SeoSettings, val: any) => {
    updateSeo({ [field]: val });
  };

  const handleCopyTitleToOg = () => {
    if (seo.site_title) {
      updateSeo({ og_title: seo.site_title });
    }
  };

  const handleCopyDescToOg = () => {
    if (seo.meta_description) {
      updateSeo({ og_description: seo.meta_description });
    }
  };

  const handleSaveToDatabase = async () => {
    setIsSavingDb(true);
    setDbSuccessMessage(null);
    setDbErrorMessage(null);

    try {
      const res = await saveSeoToDatabase(seo);
      if (res.success) {
        setDbSuccessMessage(
          supabaseActive 
            ? 'Metadados e configurações Open Graph salvos no Supabase com sucesso!' 
            : 'Configurações de SEO salvas com sucesso no banco de dados local!'
        );
        setTimeout(() => setDbSuccessMessage(null), 4000);
      } else {
        setDbErrorMessage(res.error || 'Erro ao sincronizar com o banco.');
      }
    } catch (err: any) {
      setDbErrorMessage(err?.message || 'Falha na gravação.');
    } finally {
      setIsSavingDb(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaAsset(file, 'seo');
      if (res?.url) {
        updateSeo({ og_image_url: res.url });
      }
    } catch (err) {
      console.error('Erro no upload da imagem:', err);
      alert('Falha ao enviar imagem. Verifique o formato.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const titleLength = (seo.site_title || '').length;
  const descLength = (seo.meta_description || '').length;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl font-sans">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30">
              CONFIGURAÇÃO GLOBAL
            </span>
            <span className="text-xs text-neutral-400 font-mono">• Banco de Dados Supabase</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>SEO Settings & Open Graph</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
            Atualize títulos de página (&lt;title&gt;), meta tags de busca no Google e cartões sociais de compartilhamento Open Graph armazenados no banco de dados.
          </p>
        </div>

        {/* Database Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSaveToDatabase}
            disabled={isSavingDb}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all shadow-sm disabled:opacity-50 active:scale-[0.98]"
            title="Salvar configurações no banco de dados"
          >
            <Database className="w-3.5 h-3.5 text-[#FF5E14]" />
            <span>{isSavingDb ? 'Gravando no Banco...' : 'Salvar no Banco'}</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              const res = await publish();
              if (res.success) {
                setDbSuccessMessage('Alterações publicadas no site público!');
                setTimeout(() => setDbSuccessMessage(null), 3000);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-all shadow-[0_2px_12px_rgba(255,94,20,0.35)] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publicar Site</span>
          </button>
        </div>
      </div>

      {/* Database Feedback Alert */}
      {dbSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{dbSuccessMessage}</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-500/80 uppercase">site_settings atualizado</span>
        </div>
      )}

      {dbErrorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{dbErrorMessage}</span>
        </div>
      )}

      {/* Status Bar */}
      <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${supabaseActive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`} />
          <span className="text-xs text-neutral-300">
            {supabaseActive ? (
              <span className="flex items-center gap-1.5">
                <strong>Supabase PostgreSQL Conectado</strong> • Tabela <code className="text-[#FF5E14] font-mono">public.site_settings</code>
              </span>
            ) : (
              <span>Modo Standalone • Sincronização LocalStorage com suporte a nuvem</span>
            )}
          </span>
        </div>

        <div className="text-[11px] font-mono text-neutral-500">
          Última atualização: {draft.last_published_at ? new Date(draft.last_published_at).toLocaleTimeString() : 'Agora'}
        </div>
      </div>

      {/* Main 2-Column Grid: Form Inputs + Live Interactive Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Page Meta Tags (Google Search) */}
          <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#FF5E14]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  1. Metadados de Indexação (Google)
                </h3>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">&lt;title&gt; & &lt;meta&gt;</span>
            </div>

            {/* Page Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <span>Título da Página (&lt;title&gt;)</span>
                  <span className="text-[#FF5E14]">*</span>
                </label>
                <span className={`text-[11px] font-mono ${
                  titleLength >= 30 && titleLength <= 60 
                    ? 'text-emerald-400 font-bold' 
                    : titleLength > 60 
                    ? 'text-amber-400' 
                    : 'text-neutral-500'
                }`}>
                  {titleLength} / 60 caracteres (ideal: 30–60)
                </span>
              </div>
              <input
                type="text"
                value={seo.site_title || ''}
                onChange={(e) => handleUpdate('site_title', e.target.value)}
                placeholder="VIRATTA MARKETING — Destrave a Percepção da Sua Marca"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5E14] transition-colors placeholder:text-neutral-600"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Aparece na aba do navegador, no topo do Google e nos buscadores.
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <span>Meta Descrição</span>
                  <span className="text-[#FF5E14]">*</span>
                </label>
                <span className={`text-[11px] font-mono ${
                  descLength >= 120 && descLength <= 160 
                    ? 'text-emerald-400 font-bold' 
                    : descLength > 160 
                    ? 'text-amber-400' 
                    : 'text-neutral-500'
                }`}>
                  {descLength} / 160 caracteres (ideal: 120–160)
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.meta_description || ''}
                onChange={(e) => handleUpdate('meta_description', e.target.value)}
                placeholder="Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5E14] transition-colors placeholder:text-neutral-600 resize-y"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Texto de apresentação exibido diretamente abaixo do link nos resultados de busca.
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                Palavras-chave (&lt;meta name="keywords"&gt;)
              </label>
              <input
                type="text"
                value={seo.keywords || ''}
                onChange={(e) => handleUpdate('keywords', e.target.value)}
                placeholder="marketing estratégico, comunicação visual, branding, filmmaker, viratta"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5E14] transition-colors placeholder:text-neutral-600"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Termos principais separados por vírgula para indexação contextual.
              </p>
            </div>

            {/* Canonical URL & Robots row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                  URL Canônica
                </label>
                <input
                  type="text"
                  value={seo.canonical_url || ''}
                  onChange={(e) => handleUpdate('canonical_url', e.target.value)}
                  placeholder="https://virattamarketing.com.br"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14] placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                  Robôs & Indexação
                </label>
                <select
                  value={seo.robots || 'index, follow'}
                  onChange={(e) => handleUpdate('robots', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
                >
                  <option value="index, follow">index, follow (Padrão Recomendado)</option>
                  <option value="noindex, follow">noindex, follow (Ocultar da busca)</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow (Privado)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Open Graph & Social Cards */}
          <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Share2 className="w-4 h-4 text-[#FF5E14]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  2. Open Graph & Redes Sociais
                </h3>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">og:title & og:image</span>
            </div>

            {/* OG Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-200">
                  Título Open Graph (og:title)
                </label>
                <button
                  type="button"
                  onClick={handleCopyTitleToOg}
                  className="text-[10px] font-mono text-[#FF5E14] hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiar do Título Principal</span>
                </button>
              </div>
              <input
                type="text"
                value={seo.og_title || ''}
                onChange={(e) => handleUpdate('og_title', e.target.value)}
                placeholder={seo.site_title || 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca'}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5E14] transition-colors placeholder:text-neutral-600"
              />
            </div>

            {/* OG Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-200">
                  Descrição Open Graph (og:description)
                </label>
                <button
                  type="button"
                  onClick={handleCopyDescToOg}
                  className="text-[10px] font-mono text-[#FF5E14] hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiar da Meta Descrição</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={seo.og_description || ''}
                onChange={(e) => handleUpdate('og_description', e.target.value)}
                placeholder={seo.meta_description || 'Comunicação estratégica e percepção de marca.'}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5E14] transition-colors placeholder:text-neutral-600 resize-y"
              />
            </div>

            {/* OG Image Upload using Supabase Storage */}
            <div className="space-y-3">
              <ImageUploadDropzone
                value={seo.og_image_url || ''}
                onChange={(newUrl) => handleUpdate('og_image_url', newUrl)}
                onRemove={() => handleUpdate('og_image_url', '')}
                folder="seo"
                label="Imagem Open Graph (og:image)"
                description="Upload direto para o bucket Supabase Storage. Esta imagem é prévia no WhatsApp, LinkedIn, Facebook e redes sociais ao compartilhar o site."
                recommendedDimensions="1200 × 630 px (proporção 1.91:1 horizontal)"
                aspectRatio="og"
              />

              {/* Presets Rápidos */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-neutral-500 font-mono">Atalhos rápidos:</span>
                <button
                  type="button"
                  onClick={() => handleUpdate('og_image_url', '/viratta-official-logo.png')}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-neutral-300 font-mono border border-white/5 transition-colors"
                >
                  Logo Oficial
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate('og_image_url', '/viratta-app-icon-1024.png')}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-neutral-300 font-mono border border-white/5 transition-colors"
                >
                  Ícone HD 1024px
                </button>
              </div>
            </div>

            {/* Twitter Card & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                  Twitter Card Type
                </label>
                <select
                  value={seo.twitter_card || 'summary_large_image'}
                  onChange={(e) => handleUpdate('twitter_card', e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5E14]"
                >
                  <option value="summary_large_image">summary_large_image (Destaque Grande)</option>
                  <option value="summary">summary (Compacto)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                  Tipo de Conteúdo (og:type)
                </label>
                <input
                  type="text"
                  value={seo.og_type || 'website'}
                  onChange={(e) => handleUpdate('og_type', e.target.value)}
                  placeholder="website"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Real-Time Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0E0F12] border border-white/5 sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FF5E14]" />
                <span>Simulação Visual Ao Vivo</span>
              </h3>
            </div>

            {/* Preview Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5">
              <button
                type="button"
                onClick={() => setActivePreview('google')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePreview === 'google'
                    ? 'bg-white/10 text-white shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('social')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePreview === 'social'
                    ? 'bg-white/10 text-white shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Social Card
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('whatsapp')}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activePreview === 'whatsapp'
                    ? 'bg-white/10 text-white shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* PREVIEW 1: Google Search Simulation */}
            {activePreview === 'google' && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#202124] text-left border border-white/5 space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#303134] flex items-center justify-center text-white font-bold text-[10px]">
                    V
                  </div>
                  <div className="truncate">
                    <span className="text-[#dadce0] text-xs font-medium block leading-tight">VIRATTA MARKETING</span>
                    <span className="text-[#bdc1c6] text-[11px] font-mono block leading-tight truncate">
                      {seo.canonical_url || 'https://virattamarketing.com.br'}
                    </span>
                  </div>
                </div>

                <div className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                  {seo.site_title || 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca'}
                </div>

                <div className="text-xs sm:text-sm text-[#bdc1c6] leading-relaxed line-clamp-3">
                  {seo.meta_description || 'Comunicação estratégica, identidade visual, filmmaker e criação de conteúdo para pequenos e médios negócios serem percebidos com o valor que realmente têm.'}
                </div>
              </div>
            )}

            {/* PREVIEW 2: Social Card (LinkedIn, Facebook, Twitter) */}
            {activePreview === 'social' && (
              <div className="rounded-xl overflow-hidden bg-[#16181C] border border-white/10 text-left animate-fadeIn">
                <div className="w-full h-44 bg-black flex items-center justify-center overflow-hidden relative">
                  {seo.og_image_url ? (
                    <img
                      src={seo.og_image_url}
                      alt="Open Graph preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/viratta-official-logo.png';
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-500">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-mono">1200 x 630 px</span>
                    </div>
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-neutral-300 border border-white/10">
                    og:image
                  </span>
                </div>

                <div className="p-4 space-y-1.5 border-t border-white/5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    virattamarketing.com.br
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {seo.og_title || seo.site_title || 'VIRATTA MARKETING — Destrave a Percepção da Sua Marca'}
                  </div>
                  <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {seo.og_description || seo.meta_description || 'Comunicação estratégica e percepção de marca.'}
                  </div>
                </div>
              </div>
            )}

            {/* PREVIEW 3: WhatsApp Share Simulation */}
            {activePreview === 'whatsapp' && (
              <div className="p-4 rounded-xl bg-[#0b141a] border border-[#202c33] animate-fadeIn text-left">
                <div className="p-2.5 rounded-lg bg-[#202c33] border border-white/5 space-y-2">
                  <div className="w-full h-32 rounded bg-black/60 overflow-hidden flex items-center justify-center">
                    {seo.og_image_url ? (
                      <img
                        src={seo.og_image_url}
                        alt="WhatsApp Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500">Preview</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white truncate">
                      {seo.og_title || seo.site_title || 'VIRATTA MARKETING'}
                    </div>
                    <div className="text-[11px] text-[#8696a0] line-clamp-2 leading-tight">
                      {seo.og_description || seo.meta_description || 'Destrave a percepção da sua marca.'}
                    </div>
                    <div className="text-[10px] font-mono text-[#00a884]">
                      virattamarketing.com.br
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info helper box */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                <Info className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Otimização Técnica</span>
              </div>
              <p className="leading-relaxed">
                Todas as alterações são injetadas em tempo real nas tags <code className="text-[#FF5E14] font-mono">&lt;head&gt;</code> e persistidas na tabela <code className="text-[#FF5E14] font-mono">site_settings</code> do PostgreSQL via Supabase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

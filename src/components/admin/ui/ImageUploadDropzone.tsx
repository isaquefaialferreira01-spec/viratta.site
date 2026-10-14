import React, { useState, useRef } from 'react';
import { 
  Upload, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Copy,
  CheckCircle2,
  Cloud
} from 'lucide-react';
import { 
  uploadFileToStorage, 
  replaceFileInStorage, 
  formatFileSize, 
  UploadResult,
  UploadOptions 
} from '../../../lib/storageUpload';

export interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string, result?: UploadResult) => void;
  onRemove?: () => void;
  folder?: 'seo' | 'portfolio' | 'clients' | 'branding' | 'site';
  label?: string;
  description?: string;
  recommendedDimensions?: string;
  aspectRatio?: 'og' | 'logo' | 'square' | 'video' | 'portrait' | 'auto';
  previewBg?: 'dark' | 'transparent' | 'light';
  className?: string;
  compact?: boolean;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  onRemove,
  folder = 'portfolio',
  label,
  description,
  recommendedDimensions,
  aspectRatio = 'auto',
  previewBg = 'dark',
  className = '',
  compact = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File, isReplace = false) => {
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setSuccessNotice(null);
    setUploadProgress(`Enviando ${file.name} (${formatFileSize(file.size)}) para Supabase Storage...`);

    try {
      const options: UploadOptions = {
        folder,
        bucket: 'viratta-assets',
        maxSizeMB: 10,
      };

      let result: UploadResult;
      if (isReplace && value) {
        result = await replaceFileInStorage(file, value, options);
      } else {
        result = await uploadFileToStorage(file, options);
      }

      onChange(result.url, result);
      setSuccessNotice(
        result.isStorage 
          ? `Imagem carregada no Supabase Storage (${formatFileSize(result.size)})!`
          : `Imagem carregada com sucesso (${formatFileSize(result.size)})!`
      );

      setTimeout(() => setSuccessNotice(null), 4000);
    } catch (err: any) {
      console.error('Falha no upload para o Supabase Storage:', err);
      setUploadError(err?.message || 'Erro durante upload. Tente novamente.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isReplace = false) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file, isReplace);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file, Boolean(value));
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setIsUrlMode(false);
    setUrlInput('');
    setSuccessNotice('URL da imagem atualizada!');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleCopyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSupabaseAsset = value.includes('/storage/v1/object/public/viratta-assets') || value.includes('supabase.co');

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'og':
        return 'aspect-[1200/630] max-h-56';
      case 'logo':
        return 'h-24 sm:h-28';
      case 'square':
        return 'aspect-square max-h-48';
      case 'video':
        return 'aspect-video max-h-52';
      case 'portrait':
        return 'aspect-[9/16] max-h-64';
      default:
        return 'min-h-[140px] max-h-60';
    }
  };

  const getBgClass = () => {
    switch (previewBg) {
      case 'transparent':
        return 'bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:12px_12px] bg-black/80';
      case 'light':
        return 'bg-neutral-900';
      default:
        return 'bg-[#0A0A0C]';
    }
  };

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Label and Helper Header */}
      {(label || recommendedDimensions) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {label && (
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-2">
              <span>{label}</span>
              {isSupabaseAsset && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans normal-case">
                  <Cloud className="w-2.5 h-2.5" />
                  Supabase Storage
                </span>
              )}
            </label>
          )}
          {recommendedDimensions && (
            <span className="text-[11px] font-mono text-neutral-500">
              Recomendado: {recommendedDimensions}
            </span>
          )}
        </div>
      )}

      {description && (
        <p className="text-xs text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}

      {/* Upload Status / Alerts */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-[10px] underline hover:text-white"
          >
            Fechar
          </button>
        </div>
      )}

      {successNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Case 1: Image already exists -> Show rich preview + Replace / Delete actions */}
      {value && !isUrlMode ? (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0E0F12] p-4 space-y-3 shadow-md">
          <div className={`relative w-full rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-3 ${getAspectClass()} ${getBgClass()}`}>
            <img
              src={value}
              alt="Prévia do asset"
              className="max-h-full max-w-full object-contain select-none"
              onError={(e) => {
                // Keep image box clean if URL is broken
                (e.target as HTMLElement).setAttribute('data-error', 'true');
              }}
            />

            {/* Uploading overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
                <div className="w-8 h-8 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-white tracking-wide">
                  {uploadProgress || 'Substituindo no Supabase Storage...'}
                </span>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
            <div className="flex items-center gap-2">
              {/* Replace image button */}
              <button
                type="button"
                onClick={() => replaceInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 active:scale-95"
                title="Substituir imagem com um novo arquivo no Supabase Storage"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                <span>Substituir Imagem</span>
              </button>

              <input
                ref={replaceInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif"
                className="hidden"
                onChange={(e) => handleFileChange(e, true)}
                disabled={isUploading}
              />

              {/* Paste URL toggle */}
              <button
                type="button"
                onClick={() => {
                  setUrlInput(value);
                  setIsUrlMode(true);
                }}
                disabled={isUploading}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs transition-colors border border-white/10"
                title="Editar URL manualmente"
              >
                <LinkIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Editar URL</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Copy URL */}
              <button
                type="button"
                onClick={handleCopyUrl}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Copiar URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Open in new tab */}
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Abrir imagem em nova aba"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Remove button */}
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={isUploading}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remover imagem"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Footer info: Supabase Storage path/URL */}
          <div className="text-[11px] font-mono text-neutral-500 truncate pt-1">
            <span className="text-neutral-400">Origem:</span> {value}
          </div>
        </div>
      ) : (
        /* Case 2: No image yet OR in URL input mode -> Dropzone + URL option */
        <div className="space-y-3">
          {!isUrlMode ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all text-center flex flex-col items-center justify-center gap-3 select-none ${
                isDragOver
                  ? 'border-[#FF5E14] bg-[#FF5E14]/5'
                  : 'border-white/15 hover:border-[#FF5E14]/60 bg-[#0E0F12]/80 hover:bg-[#0E0F12]'
              } ${compact ? 'py-5' : 'py-8'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif"
                className="hidden"
                onChange={(e) => handleFileChange(e, false)}
                disabled={isUploading}
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-9 h-9 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
                  <p className="text-xs font-mono text-white">
                    {uploadProgress || 'Enviando para Supabase Storage...'}
                  </p>
                  <span className="text-[11px] text-neutral-500">Salvando no bucket viratta-assets</span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14] shadow-inner group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Arraste uma imagem ou <span className="text-[#FF5E14] underline decoration-1 underline-offset-2">clique para selecionar</span>
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Suporta PNG, JPG, WebP, SVG ou GIF (até 10MB) • Upload direto no Supabase Storage
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setIsUrlMode(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium border border-white/10 transition-colors"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Ou cole uma URL externa</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Mode: Paste URL manually */
            <div className="p-4 rounded-2xl bg-[#0E0F12] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#FF5E14]" />
                  Informar URL Direta
                </span>
                <button
                  type="button"
                  onClick={() => setIsUrlMode(false)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Voltar para upload de arquivo
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://exemplo.com/imagem.png"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={!urlInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors disabled:opacity-40"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

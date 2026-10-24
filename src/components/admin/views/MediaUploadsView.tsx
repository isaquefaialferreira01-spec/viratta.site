import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { UploadResult, formatFileSize } from '../../../lib/storageUpload';
import { UploadCloud, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';

export const MediaUploadsView: React.FC = () => {
  const { draft, saveDraft } = useCms();
  const [recentUploads, setRecentUploads] = useState<UploadResult[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleUploadDone = (url: string, result?: UploadResult) => {
    if (result) {
      setRecentUploads((prev) => [result, ...prev]);

      // Also persist to CMS media list
      const mediaList = draft.media || [];
      saveDraft({
        media: [
          {
            id: `med-${Date.now()}`,
            name: result.filename || 'arquivo',
            url: result.url,
            file_path: result.path || '',
            file_size: result.size,
            folder: 'site',
            created_at: new Date().toISOString(),
          },
          ...mediaList,
        ],
      });
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Uploads Gerais & Armazenamento
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
          Envie qualquer arquivo ou ativo visual diretamente para o bucket viratta-assets no Supabase Storage.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-4">
        <ImageUploadDropzone
          value=""
          onChange={handleUploadDone}
          folder="site"
          label="Área de Upload Rápido"
          recommendedDimensions="Arquivos PNG, JPG, WebP, SVG, ICO até 10MB"
        />
      </div>

      {recentUploads.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-neutral-400">
            Arquivos Enviados Nesta Sessão
          </span>

          <div className="space-y-2">
            {recentUploads.map((file, idx) => (
              <div
                key={`${file.url}-${idx}`}
                className="p-3.5 rounded-lg bg-[#0A0B0E] border border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-semibold text-white truncate block">
                      {file.filename}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {formatFileSize(file.size)} {file.isStorage && '• Supabase Storage'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(file.url)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white font-mono text-[11px] transition-colors"
                  >
                    {copiedUrl === file.url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-400" />
                        <span>Copiar URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-neutral-400 hover:text-white"
                    title="Abrir arquivo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

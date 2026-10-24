import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Eye, ArrowLeft, Sparkles, X } from 'lucide-react';
import { useLocation } from 'wouter';

export const AdminPreviewBar: React.FC = () => {
  const { isPreviewMode, setPreviewMode, publish } = useCms();
  const [, setLocation] = useLocation();

  if (!isPreviewMode) return null;

  const [publishedNotice, setPublishedNotice] = React.useState(false);

  const handlePublish = async () => {
    const res = await publish();
    if (res.success) {
      setPublishedNotice(true);
      setTimeout(() => setPublishedNotice(false), 3500);
    }
  };

  const handleExitPreview = () => {
    setPreviewMode(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-white/15 px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-semibold animate-fadeIn">
      <div className="flex items-center gap-2">
        <span className="p-1 rounded bg-white/10 text-[#FF5E14]">
          <Eye className="w-3.5 h-3.5" />
        </span>
        <span className="text-white">
          {publishedNotice
            ? 'Alterações publicadas no site.'
            : 'MODO PRÉVIA ATIVO — Você está visualizando o rascunho das edições'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLocation('/admin')}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Voltar ao Painel</span>
        </button>

        <button
          type="button"
          onClick={handlePublish}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] gap-1.5 px-3 py-2 rounded-lg bg-[#FF5E14] text-white hover:bg-[#E04E0B] transition-colors shadow-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Publicar Agora</span>
        </button>

        <button
          type="button"
          onClick={handleExitPreview}
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
          title="Fechar modo de prévia"
          aria-label="Fechar modo de prévia"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

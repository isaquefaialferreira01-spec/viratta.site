import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { MediaItem } from '../../../types/cms';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink,
  Edit2,
  Image as ImageIcon,
  Eye
} from 'lucide-react';
import { formatFileSize } from '../../../lib/storageUpload';

export const MediaImagesView: React.FC = () => {
  const { draft, saveDraft } = useCms();
  const mediaList = draft.media || [];

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingAltId, setEditingAltId] = useState<string | null>(null);
  const [altInput, setAltInput] = useState('');

  const filteredMedia = activeFolder === 'all'
    ? mediaList
    : mediaList.filter((m) => m.folder === activeFolder);

  const handleUploaded = (url: string, result?: any) => {
    if (!result) return;
    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      name: result.name || 'imagem-carregada',
      url: result.url,
      file_path: result.path || '',
      file_size: result.size,
      folder: (result.folder as any) || 'site',
      created_at: new Date().toISOString(),
    };
    saveDraft({ media: [newItem, ...mediaList] });
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja remover esta imagem da galeria?')) {
      saveDraft({ media: mediaList.filter((m) => m.id !== id) });
      if (selectedImage?.id === id) setSelectedImage(null);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveAlt = (id: string) => {
    const updated = mediaList.map((m) => (m.id === id ? { ...m, name: altInput.trim() || m.name } : m));
    saveDraft({ media: updated });
    setEditingAltId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Biblioteca de Imagens
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Gerencie todas as imagens dinâmicas armazenadas no bucket do Supabase Storage.
          </p>
        </div>

        {/* Folder filter */}
        <div className="flex items-center gap-1 p-1 bg-black/60 rounded-lg border border-white/5 text-xs">
          <button
            type="button"
            onClick={() => setActiveFolder('all')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFolder === 'all' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => setActiveFolder('portfolio')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFolder === 'portfolio' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Portfólio
          </button>
          <button
            type="button"
            onClick={() => setActiveFolder('clients')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFolder === 'clients' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Clientes
          </button>
          <button
            type="button"
            onClick={() => setActiveFolder('branding')}
            className={`px-3 py-1 rounded transition-colors ${
              activeFolder === 'branding' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Identidade
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="p-6 rounded-xl bg-[#0A0B0E] border border-white/5 space-y-3">
        <span className="text-xs font-mono font-bold uppercase text-neutral-300">
          Carregar Nova Imagem para Supabase Storage
        </span>
        <ImageUploadDropzone
          value=""
          onChange={handleUploaded}
          folder="site"
          label="Nova Imagem Dinâmica"
          recommendedDimensions="PNG, JPG, WebP ou SVG até 10MB"
        />
      </div>

      {/* Grid of Images */}
      {filteredMedia.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-[#0A0B0E] border border-white/5 text-neutral-400 text-xs">
          Nenhuma imagem cadastrada nesta pasta. Utilize o formulário acima para enviar imagens ao Supabase Storage.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-[#0A0B0E] border border-white/5 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="aspect-video bg-black/80 relative flex items-center justify-center overflow-hidden p-2">
                <img
                  src={item.url}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-black/70 text-white hover:text-[#FF5E14]"
                    title="Ver em tamanho original"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-1.5 rounded-lg bg-black/70 text-white hover:text-emerald-400"
                    title="Copiar link público"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-black/70 text-white hover:text-rose-400"
                    title="Excluir imagem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 text-xs flex flex-col justify-between flex-1 border-t border-white/5">
                {editingAltId === item.id ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={altInput}
                      onChange={(e) => setAltInput(e.target.value)}
                      className="w-full px-2 py-1 text-xs rounded bg-black border border-white/20 text-white"
                      placeholder="Texto alternativo"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveAlt(item.id)}
                        className="text-[10px] text-emerald-400 hover:underline"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAltId(null)}
                        className="text-[10px] text-neutral-400 hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white truncate max-w-[140px] block" title={item.name}>
                        {item.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAltId(item.id);
                          setAltInput(item.name);
                        }}
                        className="text-neutral-400 hover:text-white"
                        title="Editar nome / alt text"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                    {item.file_size && (
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {formatFileSize(item.file_size)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

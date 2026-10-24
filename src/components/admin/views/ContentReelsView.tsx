import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ReelItem } from '../../../types/cms';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit2, 
  ExternalLink,
  Instagram,
  Film,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  Image as ImageIcon,
  UploadCloud,
  X
} from 'lucide-react';
import { DEFAULT_REELS } from '../../../lib/cmsDefaults';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { VirattaSymbol } from '../../brand/VirattaSymbol';

export const ContentReelsView: React.FC = () => {
  const { draft, updateReels } = useCms();
  
  // Ensure default posts have their local real covers if draft had empty strings
  const reels: ReelItem[] = ((draft.reels && draft.reels.length > 0) ? draft.reels : DEFAULT_REELS).map((r) => {
    if (!r.cover_image && !r.image) {
      const match = DEFAULT_REELS.find((d) => d.id === r.id || d.instagram_url === r.instagram_url);
      if (match?.cover_image) {
        return { ...r, cover_image: match.cover_image, image: match.cover_image };
      }
    }
    return r;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [type, setType] = useState<'post' | 'reel'>('post');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isReplacingCover, setIsReplacingCover] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenAdd = () => {
    setTitle(`Post VIRATTA 0${reels.length + 1}`);
    setInstagramUrl('https://www.instagram.com/viratta.marketing/');
    setCoverImage('');
    setType('post');
    setSortOrder(reels.length + 1);
    setIsActive(true);
    setIsReplacingCover(false);
    setEditingId(null);
    setIsAdding(true);
    setSaveSuccess(false);
  };

  const handleOpenEdit = (item: ReelItem) => {
    const match = DEFAULT_REELS.find((d) => d.id === item.id || d.instagram_url === item.instagram_url);
    const resolvedCover = item.cover_image || item.image || match?.cover_image || '';
    
    setTitle(item.title);
    setInstagramUrl(item.instagram_url || item.url || '');
    setCoverImage(resolvedCover);
    setType((item.type?.toLowerCase() === 'reel' ? 'reel' : 'post'));
    setSortOrder(item.sort_order ?? (reels.indexOf(item) + 1));
    setIsActive(item.is_active !== false);
    setIsReplacingCover(false);
    setEditingId(item.id);
    setIsAdding(true);
    setSaveSuccess(false);
  };

  const syncItemToSupabase = async (item: ReelItem, isDelete = false) => {
    if (!isSupabaseConfigured() || !supabase) return;
    try {
      if (isDelete) {
        await supabase.from('instagram_content').delete().eq('id', item.id);
      } else {
        await supabase.from('instagram_content').upsert({
          id: item.id,
          title: item.title,
          instagram_url: item.instagram_url || item.url,
          cover_image: item.cover_image || item.image || '',
          type: item.type,
          sort_order: item.sort_order,
          is_active: item.is_active,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Supabase instagram_content sync notice:', err);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    const cleanUrl = instagramUrl.trim() || 'https://www.instagram.com/viratta.marketing/';
    const cleanImg = coverImage.trim();

    if (editingId) {
      const updatedList = reels.map((r) => {
        if (r.id === editingId) {
          const updated: ReelItem = {
            ...r,
            title: title.trim(),
            instagram_url: cleanUrl,
            url: cleanUrl,
            cover_image: cleanImg,
            image: cleanImg,
            type,
            sort_order: Number(sortOrder) || 1,
            is_active: isActive,
            updated_at: new Date().toISOString(),
          };
          syncItemToSupabase(updated);
          return updated;
        }
        return r;
      });
      updateReels(updatedList);
    } else {
      const newItem: ReelItem = {
        id: `ig-${Date.now()}`,
        title: title.trim(),
        instagram_url: cleanUrl,
        url: cleanUrl,
        cover_image: cleanImg,
        image: cleanImg,
        type,
        sort_order: Number(sortOrder) || reels.length + 1,
        is_active: isActive,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      syncItemToSupabase(newItem);
      updateReels([...reels, newItem]);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setIsAdding(false);
      setEditingId(null);
      setIsReplacingCover(false);
      setSaveSuccess(false);
    }, 400);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    const updated = reels.map((r) => {
      if (r.id === id) {
        const item = { ...r, is_active: !current };
        syncItemToSupabase(item);
        return item;
      }
      return r;
    });
    updateReels(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= reels.length) return;

    const list = [...reels];
    const item = list[index];
    list.splice(index, 1);
    list.splice(targetIdx, 0, item);

    // Re-index sort_order
    const reordered = list.map((r, i) => {
      const updated = { ...r, sort_order: i + 1 };
      syncItemToSupabase(updated);
      return updated;
    });

    updateReels(reordered);
  };

  const handleDelete = (id: string) => {
    const itemToDelete = reels.find((r) => r.id === id);
    if (confirm('Deseja excluir esta publicação do Instagram?')) {
      if (itemToDelete) syncItemToSupabase(itemToDelete, true);
      updateReels(reels.filter((r) => r.id !== id));
      if (editingId === id) {
        setIsAdding(false);
        setEditingId(null);
      }
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar as 3 publicações oficiais com capas reais da VIRATTA?')) {
      updateReels(DEFAULT_REELS);
      DEFAULT_REELS.forEach((item) => syncItemToSupabase(item));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Instagram / Conteúdo</span>
            <span className="text-xs font-mono font-normal text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/20 px-2 py-0.5 rounded-full">
              @viratta.marketing
            </span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Gerencie os posts e reels exibidos na seção "A VIRATTA ACONTECE POR AQUI.". Cada card exibe a capa real da publicação.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Publicação</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            title="Restaurar os 3 posts oficiais iniciais com capas reais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Iniciais</span>
          </button>
        </div>
      </div>

      {/* Add / Edit Form Modal / Panel */}
      {isAdding && (
        <div className="p-6 rounded-xl bg-[#0E1015] border border-[#FF5E14]/40 space-y-5 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold uppercase text-[#FF5E14] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{editingId ? 'Editar Publicação' : 'Nova Publicação'}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setIsReplacingCover(false);
              }}
              className="min-h-[44px] px-2 py-1 text-neutral-400 hover:text-white text-xs font-medium"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Título da Publicação *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Sua marca não precisa de mais do mesmo"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                URL da Publicação no Instagram *
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/DewlvThu2vZ/"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Link oficial do post ou reel no Instagram. Ao clicar no card, o usuário será direcionado para cá.
              </span>
            </div>

            {/* Type selector: Post vs Reel */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Tipo de Conteúdo
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('post')}
                  className={`min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    type === 'post'
                      ? 'bg-[#FF5E14] text-white border-[#FF5E14]'
                      : 'bg-black/50 text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Post (Feed)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('reel')}
                  className={`min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    type === 'reel'
                      ? 'bg-[#FF5E14] text-white border-[#FF5E14]'
                      : 'bg-black/50 text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Reel (Vídeo)</span>
                </button>
              </div>
            </div>

            {/* Sort order + Active state */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Ordem & Visibilidade
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-neutral-400 font-mono">Ordem:</span>
                  <input
                    type="number"
                    min={1}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-16 px-2.5 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-mono text-center focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none ml-auto min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded bg-black/50 border-white/10 text-[#FF5E14] focus:ring-[#FF5E14]"
                  />
                  <span className="text-xs text-neutral-200 font-medium">Aparece no site</span>
                </label>
              </div>
            </div>
          </div>

          {/* CAPA DA PUBLICAÇÃO (Upload, Pré-visualização, Substituir, Remover) */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase text-neutral-300 font-bold">
                Capa da Publicação (Elemento Principal do Card)
              </label>
              {coverImage && (
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Capa Cadastrada
                </span>
              )}
            </div>

            {/* Case 1: Cover image is present */}
            {coverImage && !isReplacingCover ? (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Visual Preview */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-20 sm:w-24 aspect-[4/5] rounded-lg overflow-hidden bg-black border border-white/20 shadow-md shrink-0">
                    <img
                      src={coverImage}
                      alt="Pré-visualização da capa"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Pré-visualização da Capa
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 break-all max-w-xs block mt-0.5">
                      {coverImage.startsWith('data:') ? 'Imagem salva localmente' : coverImage}
                    </span>
                    <span className="text-[11px] text-emerald-400/90 font-medium block mt-1">
                      Renderização com <code className="text-white">object-fit: cover</code>
                    </span>
                  </div>
                </div>

                {/* Actions: Substituir & Remover */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsReplacingCover(true)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-[#FF5E14]" />
                    <span>Substituir Capa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Deseja remover a capa desta publicação?')) {
                        setCoverImage('');
                      }
                    }}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover Capa</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Case 2: Cover image is NOT present or user clicked "Substituir Capa" */
              <div className="space-y-3">
                {!coverImage && (
                  <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-white">Capa necessária</span>
                      <span>Esta publicação ainda não possui imagem de capa. Faça o upload da imagem correspondente para que ela seja exibida com destaque real no site.</span>
                    </div>
                  </div>
                )}

                {isReplacingCover && (
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs text-neutral-300 font-semibold">
                      Selecione a nova imagem para substituir:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsReplacingCover(false)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Cancelar substituição
                    </button>
                  </div>
                )}

                <ImageUploadDropzone
                  value={coverImage}
                  onChange={(uploadedUrl) => {
                    setCoverImage(uploadedUrl);
                    setIsReplacingCover(false);
                  }}
                  folder="portfolio"
                  label="Upload da capa do post (Salvo no Supabase Storage)"
                  recommendedDimensions="Formato 1:1 (quadrado) ou 4:5 (vertical)"
                  aspectRatio="portrait"
                  previewBg="dark"
                />

                <div className="pt-1">
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Ou informe o caminho/URL da capa:
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/instagram/post-dewlvthu2vz.jpg ou URL no Supabase Storage"
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-200 text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={handleSave}
              disabled={!title.trim()}
              className="min-h-[44px] px-6 py-2.5 rounded-lg bg-[#FF5E14] text-white text-xs font-bold disabled:opacity-50 hover:bg-[#E04E0B] transition-colors inline-flex items-center gap-1.5 shadow-md"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <span>{editingId ? 'Salvar Alterações' : 'Salvar Publicação'}</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setIsReplacingCover(false);
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-lg bg-white/5 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Publications List */}
      <div className="space-y-3">
        {reels.map((item, index) => {
          const defaultMatch = DEFAULT_REELS.find((d) => d.id === item.id || d.instagram_url === item.instagram_url);
          const cover = item.cover_image || item.image || defaultMatch?.cover_image || '';
          const isReel = (item.type || '').toLowerCase() === 'reel';
          const link = item.instagram_url || item.url || '';

          return (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/15 transition-colors flex items-center justify-between gap-4"
            >
              {/* Thumbnail + Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Visual Thumbnail */}
                <div className="relative w-14 sm:w-16 aspect-[4/5] rounded-lg overflow-hidden bg-black border border-white/15 shrink-0 flex items-center justify-center shadow-md">
                  {cover ? (
                    <img
                      src={cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1 text-center bg-amber-950/20 text-amber-400">
                      <AlertCircle className="w-4 h-4 mb-0.5" />
                      <span className="text-[8px] font-mono uppercase">Sem capa</span>
                    </div>
                  )}
                  {isReel && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Film className="w-3.5 h-3.5 text-[#FF5E14]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#FF5E14] font-bold">
                      #{item.sort_order ?? (index + 1)}
                    </span>
                    <span className={`text-sm font-bold truncate max-w-[280px] sm:max-w-md ${item.is_active ? 'text-white' : 'text-neutral-500 line-through'}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                      {isReel ? 'Reel' : 'Post'}
                    </span>
                    {!cover && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Capa Pendente
                      </span>
                    )}
                    {!item.is_active && (
                      <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">
                        Oculto
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white truncate max-w-[260px] inline-flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span className="truncate">{link}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-neutral-500">Sem link</span>
                    )}
                    {cover && (
                      <span className="text-[10px] font-mono text-emerald-400/80 hidden sm:inline">
                        • Capa Ativa
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions: Reorder up/down, active, edit, delete */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="min-h-[44px] min-w-[36px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                  title="Mover para cima"
                  aria-label="Mover para cima"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === reels.length - 1}
                  className="min-h-[44px] min-w-[36px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                  title="Mover para baixo"
                  aria-label="Mover para baixo"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleActive(item.id, item.is_active)}
                  className={`min-h-[44px] px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    item.is_active
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/5 text-neutral-400 border border-white/5'
                  }`}
                >
                  {item.is_active ? 'Ativo' : 'Oculto'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="min-h-[44px] min-w-[40px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
                  title="Editar Publicação e Capa"
                  aria-label="Editar Publicação e Capa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="min-h-[44px] min-w-[40px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-white/5"
                  title="Excluir Publicação"
                  aria-label="Excluir Publicação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

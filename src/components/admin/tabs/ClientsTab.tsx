import React, { useState, useRef } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ClientItem } from '../../../types/cms';
import { 
  uploadFileToStorage, 
  replaceFileInStorage, 
  formatFileSize 
} from '../../../lib/storageUpload';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  ExternalLink,
  Check, 
  AlertCircle,
  Briefcase,
  Cloud,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

export const ClientsTab: React.FC = () => {
  const { draft, updateClients } = useCms();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state for add/edit
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [cardBg, setCardBg] = useState<'light' | 'dark'>('dark');

  // Per-item inline replacement state
  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ id?: string; message: string; type: 'success' | 'error' } | null>(null);

  const inlineReplaceInputRef = useRef<HTMLInputElement>(null);
  const currentReplacingTargetIdRef = useRef<string | null>(null);

  const clients = draft.clients || [];
  const supabaseActive = isSupabaseConfigured();

  const showNotification = (message: string, type: 'success' | 'error' = 'success', id?: string) => {
    setActionNotice({ message, type, id });
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  const handleSaveClient = () => {
    if (!name.trim() || !logoUrl.trim()) return;

    if (editingId) {
      const updated = clients.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: name.trim(),
              logo_url: logoUrl.trim(),
              alt_text: altText.trim() || `Logotipo ${name}`,
              website_url: websiteUrl.trim(),
              card_bg: cardBg,
            }
          : c
      );
      updateClients(updated);
      showNotification(`Item "${name}" atualizado com sucesso!`);
      setEditingId(null);
    } else {
      const newClient: ClientItem = {
        id: `client-${Date.now()}`,
        name: name.trim(),
        logo_url: logoUrl.trim(),
        alt_text: altText.trim() || `Logotipo ${name}`,
        website_url: websiteUrl.trim(),
        display_order: clients.length + 1,
        is_active: true,
        card_bg: cardBg || (logoUrl.includes('cloudinary') ? 'light' : 'dark'),
      };
      updateClients([...clients, newClient]);
      showNotification(`"${name}" adicionado ao portfólio!`);
      setIsAdding(false);
    }

    // Reset form
    setName('');
    setLogoUrl('');
    setAltText('');
    setWebsiteUrl('');
    setCardBg('dark');
  };

  const startEdit = (c: ClientItem) => {
    setEditingId(c.id);
    setName(c.name);
    setLogoUrl(c.logo_url);
    setAltText(c.alt_text || '');
    setWebsiteUrl(c.website_url || '');
    setCardBg(c.card_bg || (c.logo_url?.includes('cloudinary') ? 'light' : 'dark'));
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setName('');
    setLogoUrl('');
    setAltText('');
    setWebsiteUrl('');
    setCardBg('dark');
  };

  const toggleActive = (id: string) => {
    const updated = clients.map((c) =>
      c.id === id ? { ...c, is_active: !c.is_active } : c
    );
    updateClients(updated);
  };

  const deleteClient = (id: string, clientName: string) => {
    if (confirm(`Tem certeza que deseja remover "${clientName}" do portfólio?`)) {
      const updated = clients.filter((c) => c.id !== id);
      updateClients(updated);
      showNotification(`"${clientName}" removido do portfólio.`);
    }
  };

  // Direct 1-Click Replace Image from Dashboard List
  const handleTriggerInlineReplace = (clientId: string) => {
    currentReplacingTargetIdRef.current = clientId;
    if (inlineReplaceInputRef.current) {
      inlineReplaceInputRef.current.value = '';
      inlineReplaceInputRef.current.click();
    }
  };

  const handleInlineFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = currentReplacingTargetIdRef.current;
    if (!file || !targetId) return;

    const targetClient = clients.find((c) => c.id === targetId);
    if (!targetClient) return;

    setReplacingId(targetId);

    try {
      // Direct replace using Supabase Storage
      const res = await replaceFileInStorage(file, targetClient.logo_url, {
        folder: 'portfolio',
        bucket: 'viratta-assets',
      });

      const updated = clients.map((c) =>
        c.id === targetId
          ? {
              ...c,
              logo_url: res.url,
            }
          : c
      );
      updateClients(updated);
      showNotification(
        `Imagem de "${targetClient.name}" substituída com sucesso no Supabase Storage (${formatFileSize(res.size)})!`,
        'success',
        targetId
      );
    } catch (err: any) {
      console.error('Erro ao substituir imagem:', err);
      showNotification(
        err?.message || 'Falha ao substituir imagem no Supabase Storage.',
        'error',
        targetId
      );
    } finally {
      setReplacingId(null);
      currentReplacingTargetIdRef.current = null;
      if (inlineReplaceInputRef.current) {
        inlineReplaceInputRef.current.value = '';
      }
    }
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const reordered = [...clients];
    const temp = reordered[idx - 1];
    reordered[idx - 1] = reordered[idx];
    reordered[idx] = temp;
    updateClients(reordered);
  };

  const moveDown = (idx: number) => {
    if (idx >= clients.length - 1) return;
    const reordered = [...clients];
    const temp = reordered[idx + 1];
    reordered[idx + 1] = reordered[idx];
    reordered[idx] = temp;
    updateClients(reordered);
  };

  const isSupabaseAsset = (url: string) =>
    url.includes('/storage/v1/object/public/viratta-assets') || url.includes('supabase.co');

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl font-sans">
      {/* Hidden file input for 1-click inline image replace */}
      <input
        ref={inlineReplaceInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif"
        className="hidden"
        onChange={handleInlineFileSelected}
      />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              PORTFÓLIO & CLIENTES
            </span>
            <span className="text-xs text-neutral-400 font-mono">• Supabase Storage</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Gestão do Portfólio (Casos de Sucesso)</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
            Gerencie os logotipos das marcas da seção “Casos & Portfólio”. Faça upload ou substitua imagens diretamente via Supabase Storage.
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => {
              cancelEdit();
              setIsAdding(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold tracking-wider transition-all shadow-[0_2px_12px_rgba(255,94,20,0.35)] shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Marca ao Portfólio</span>
          </button>
        )}
      </div>

      {/* Global Notification Banner */}
      {actionNotice && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
            actionNotice.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/25 text-rose-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-[10px] underline hover:text-white"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Storage Status Ribbon */}
      <div className="p-3.5 rounded-xl bg-[#0E0F12] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-neutral-300 font-mono text-[11px]">
            Bucket: <code className="text-[#FF5E14] font-semibold">viratta-assets/portfolio</code>
          </span>
          {supabaseActive && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-sans">
              <Cloud className="w-3 h-3" />
              Supabase Storage Ativo
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-neutral-400 text-[11px] font-mono">
          <span>{clients.length} marcas cadastradas</span>
          <span>•</span>
          <span className="text-emerald-400">{clients.filter((c) => c.is_active).length} visíveis no site</span>
        </div>
      </div>

      {/* Add / Edit Form Card with ImageUploadDropzone */}
      {isAdding && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-[#FF5E14]/30 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{editingId ? 'Editar Marca do Portfólio' : 'Nova Marca para o Portfólio'}</span>
                <span className="text-[10px] font-mono uppercase bg-[#FF5E14]/10 text-[#FF5E14] px-2 py-0.5 rounded border border-[#FF5E14]/20">
                  Supabase Storage
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Preencha os dados e selecione o logotipo da marca para exibição no marquee da seção Casos & Portfólio.
              </p>
            </div>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Text inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2 font-semibold">
                  Nome da Empresa / Marca <span className="text-[#FF5E14]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Café & Bistrô Origem"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2 font-semibold">
                  Texto Alternativo / Acessibilidade (Alt)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder={`Logotipo ${name || 'da marca'}`}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2 font-semibold">
                  Link do Site ou Redes da Marca (Opcional)
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://instagram.com/empresa"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] transition-colors"
                />
              </div>
            </div>

            {/* Right Column: Supabase Storage File Upload Utility */}
            <div className="space-y-2">
              <ImageUploadDropzone
                value={logoUrl}
                onChange={(newUrl, result) => {
                  setLogoUrl(newUrl);
                  if (!name && result?.filename) {
                    const parsedName = result.filename
                      .replace(/\.[^/.]+$/, '')
                      .replace(/[-_]/g, ' ')
                      .replace(/\b\w/g, (c) => c.toUpperCase());
                    setName(parsedName);
                  }
                }}
                onRemove={() => setLogoUrl('')}
                folder="portfolio"
                label="Logotipo / Imagem no Supabase Storage"
                description="Selecione ou substitua a imagem. O arquivo é armazenado no bucket viratta-assets com URL pública permanente."
                recommendedDimensions="Formato horizontal ou quadrado, preferência SVG ou PNG com fundo transparente"
                aspectRatio="logo"
                previewBg="transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveClient}
              disabled={!name.trim() || !logoUrl.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-all shadow-[0_2px_12px_rgba(255,94,20,0.35)] disabled:opacity-40 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{editingId ? 'Salvar Edição' : 'Adicionar ao Portfólio'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Items List Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono px-1">
          <span>LISTA DE MARCAS E CASOS DO PORTFÓLIO</span>
          <span>AÇÕES RÁPIDAS</span>
        </div>

        {clients.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0E0F12] border border-white/5 text-center text-neutral-500 space-y-3">
            <FolderOpen className="w-10 h-10 mx-auto text-neutral-600" />
            <p className="text-sm">Nenhuma marca cadastrada no portfólio.</p>
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5E14] text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Primeira Marca</span>
            </button>
          </div>
        ) : (
          clients.map((client, idx) => {
            const isReplacingThis = replacingId === client.id;
            const hasSupabaseUrl = isSupabaseAsset(client.logo_url);

            return (
              <div
                key={client.id}
                className={`p-4 sm:p-5 rounded-2xl bg-[#0E0F12] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  client.is_active ? 'border-white/10 hover:border-white/20' : 'border-white/5 opacity-60 bg-[#0A0A0C]'
                } ${isReplacingThis ? 'ring-2 ring-[#FF5E14] bg-[#FF5E14]/5' : ''}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Order controls */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                      title="Subir posição no marquee"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === clients.length - 1}
                      className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                      title="Descer posição no marquee"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Logo thumbnail container with replacing overlay */}
                  <div className={`relative w-28 sm:w-36 h-16 sm:h-20 rounded-xl border p-2 sm:p-3 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group ${
                    client.card_bg === 'light' || client.logo_url?.includes('cloudinary')
                      ? 'bg-white border-white/20'
                      : 'bg-black/80 border-white/10'
                  }`}>
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain select-none"
                    />

                    {isReplacingThis && (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-1 z-10">
                        <RefreshCw className="w-4 h-4 text-[#FF5E14] animate-spin" />
                        <span className="text-[9px] font-mono text-white">Substituindo...</span>
                      </div>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">
                        {client.name}
                      </h4>
                      {!client.is_active ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
                          Oculto
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Ativo no Marquee
                        </span>
                      )}

                      {hasSupabaseUrl && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5 font-mono flex items-center gap-1">
                          <Cloud className="w-2.5 h-2.5 text-[#FF5E14]" />
                          Supabase
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-mono text-neutral-500 truncate max-w-xs sm:max-w-md">
                      {client.logo_url}
                    </div>

                    {client.website_url && (
                      <a
                        href={client.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#FF5E14] hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{client.website_url}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Direct Action buttons */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
                  {/* Direct 1-Click Replace Image via Supabase Storage */}
                  <button
                    type="button"
                    onClick={() => handleTriggerInlineReplace(client.id)}
                    disabled={isReplacingThis}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF5E14]/15 hover:bg-[#FF5E14]/25 text-[#FF5E14] border border-[#FF5E14]/30 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
                    title="Substituir imagem diretamente no Supabase Storage"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isReplacingThis ? 'animate-spin' : ''}`} />
                    <span>{isReplacingThis ? 'Enviando...' : 'Substituir Imagem'}</span>
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => toggleActive(client.id)}
                    className={`p-2 rounded-xl text-xs font-medium transition-colors ${
                      client.is_active
                        ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                        : 'text-neutral-500 bg-white/5 hover:bg-white/10'
                    }`}
                    title={client.is_active ? 'Ocultar da esteira' : 'Exibir na esteira'}
                  >
                    {client.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit Form */}
                  <button
                    type="button"
                    onClick={() => startEdit(client)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors border border-white/5"
                  >
                    Editar
                  </button>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={() => deleteClient(client.id, client.name)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Excluir marca do portfólio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

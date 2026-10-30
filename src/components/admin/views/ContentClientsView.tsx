import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ClientItem } from '../../../types/cms';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit2, 
  Check, 
  ExternalLink,
  Users,
  Image as ImageIcon 
} from 'lucide-react';
import { ImageUploadDropzone } from '../ui/ImageUploadDropzone';

export const ContentClientsView: React.FC = () => {
  const { draft, updateClients } = useCms();
  const clients = draft.clients || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [cardBg, setCardBg] = useState<'light' | 'dark'>('dark');

  const handleOpenAdd = () => {
    setName('');
    setLogoUrl('');
    setAltText('');
    setWebsiteUrl('');
    setCardBg('dark');
    setEditingId(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (client: ClientItem) => {
    setName(client.name);
    setLogoUrl(client.logo_url);
    setAltText(client.alt_text || '');
    setWebsiteUrl(client.website_url || '');
    setCardBg(client.card_bg || (client.logo_url?.includes('cloudinary') ? 'light' : 'dark'));
    setEditingId(client.id);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!name.trim() || !logoUrl.trim()) return;

    if (editingId) {
      const updated = clients.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: name.trim(),
              logo_url: logoUrl.trim(),
              alt_text: altText.trim() || `Logotipo ${name.trim()}`,
              website_url: websiteUrl.trim(),
              card_bg: cardBg,
            }
          : c
      );
      updateClients(updated);
    } else {
      const newClient: ClientItem = {
        id: `client-${Date.now()}`,
        name: name.trim(),
        logo_url: logoUrl.trim(),
        alt_text: altText.trim() || `Logotipo ${name.trim()}`,
        website_url: websiteUrl.trim(),
        display_order: clients.length + 1,
        is_active: true,
        card_bg: cardBg || (logoUrl.includes('cloudinary') ? 'light' : 'dark'),
      };
      updateClients([...clients, newClient]);
    }

    setIsAdding(false);
    setEditingId(null);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    const updated = clients.map((c) => (c.id === id ? { ...c, is_active: !current } : c));
    updateClients(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= clients.length) return;

    const list = [...clients];
    const item = list[index];
    list.splice(index, 1);
    list.splice(targetIdx, 0, item);

    const reordered = list.map((c, i) => ({ ...c, display_order: i + 1 }));
    updateClients(reordered);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este cliente do portfólio?')) {
      updateClients(clients.filter((c) => c.id !== id));
      if (editingId === id) {
        setIsAdding(false);
        setEditingId(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Clientes & Portfólio (Carrossel de Logos)
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Logotipos exibidos no carrossel contínuo da seção de marcas que viraram a chave.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar Cliente</span>
        </button>
      </div>

      {/* Add / Edit Form Modal / Panel */}
      {isAdding && (
        <div className="p-6 rounded-xl bg-[#0E1015] border border-[#FF5E14]/30 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#FF5E14]">
              {editingId ? 'Editar Cliente' : 'Novo Cliente'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="text-neutral-400 hover:text-white text-xs"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Nome da Empresa / Marca *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Café & Bistrô Origem"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Site / Link da Marca (Opcional)
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-neutral-300 text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          {/* Logo Dropzone via Supabase Storage */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
              Logotipo (SVG ou PNG com fundo transparente) *
            </label>
            <ImageUploadDropzone
              value={logoUrl}
              onChange={(url) => setLogoUrl(url)}
              folder="clients"
              label="Logotipo do Cliente"
              recommendedDimensions="SVG vetorial ou PNG 400x160px"
              aspectRatio="logo"
              previewBg="dark"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim() || !logoUrl.trim()}
              className="px-5 py-2 rounded-lg bg-[#FF5E14] text-white text-xs font-bold disabled:opacity-50 hover:bg-[#E04E0B] transition-colors"
            >
              {editingId ? 'Salvar Alterações' : 'Adicionar ao Carrossel'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="px-4 py-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white text-xs transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Clients List */}
      <div className="space-y-3">
        {clients.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#0A0B0E] border border-white/5 text-neutral-400 text-xs">
            Nenhum cliente cadastrado. Clique em "Adicionar Cliente" acima.
          </div>
        ) : (
          clients.map((client, index) => (
            <div
              key={client.id}
              className="p-3 sm:p-4 rounded-xl bg-[#0A0B0E] border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-4"
            >
              {/* Logo Preview + Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-20 sm:w-28 h-12 rounded-lg border p-2 flex items-center justify-center shrink-0 ${
                  client.card_bg === 'light' || client.logo_url?.includes('cloudinary')
                    ? 'bg-white border-white/20'
                    : 'bg-black border-white/10'
                }`}>
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold truncate ${client.is_active ? 'text-white' : 'text-neutral-500 line-through'}`}>
                      {client.name}
                    </span>
                    {!client.is_active && (
                      <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">
                        Inativo
                      </span>
                    )}
                  </div>
                  {client.website_url ? (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#FF5E14] hover:underline truncate inline-flex items-center gap-1 font-mono"
                    >
                      <span>{client.website_url}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Carrossel público
                    </span>
                  )}
                </div>
              </div>

              {/* Actions & Reordering */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                  title="Mover para a esquerda / cima no carrossel"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === clients.length - 1}
                  className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                  title="Mover para a direita / baixo no carrossel"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleActive(client.id, client.is_active)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    client.is_active
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {client.is_active ? 'Ativo' : 'Inativo'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(client)}
                  className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                  title="Editar cliente"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(client.id)}
                  className="p-1.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-white/5"
                  title="Excluir cliente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

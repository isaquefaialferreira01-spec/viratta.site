import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ClientItem } from '../../../types/cms';
import { uploadMediaAsset } from '../../../lib/cmsStorage';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Upload, 
  Image as ImageIcon,
  Check,
  AlertCircle
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const clients = draft.clients || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const res = await uploadMediaAsset(file, 'clients');
      setLogoUrl(res.url);
      if (!name) {
        setName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    } catch (err: any) {
      setUploadError(err?.message || 'Erro ao processar imagem.');
    } finally {
      setIsUploading(false);
    }
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
            }
          : c
      );
      updateClients(updated);
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
      };
      updateClients([...clients, newClient]);
      setIsAdding(false);
    }

    // Reset form
    setName('');
    setLogoUrl('');
    setAltText('');
    setWebsiteUrl('');
  };

  const startEdit = (c: ClientItem) => {
    setEditingId(c.id);
    setName(c.name);
    setLogoUrl(c.logo_url);
    setAltText(c.alt_text || '');
    setWebsiteUrl(c.website_url || '');
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setName('');
    setLogoUrl('');
    setAltText('');
    setWebsiteUrl('');
  };

  const toggleActive = (id: string) => {
    const updated = clients.map((c) =>
      c.id === id ? { ...c, is_active: !c.is_active } : c
    );
    updateClients(updated);
  };

  const deleteClient = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta marca do marquee?')) {
      const updated = clients.filter((c) => c.id !== id);
      updateClients(updated);
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

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Marcas & Clientes (Marquee do Portfólio)
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Gerencie os logotipos das marcas que aparecem na esteira contínua infinita da seção “Casos & Portfólio”.
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => {
              cancelEdit();
              setIsAdding(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold tracking-wider transition-colors shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Marca</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal or Card */}
      {isAdding && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0E0F12] border border-[#FF5E14]/30 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              {editingId ? 'Editar Marca Parceira' : 'Nova Marca para o Marquee'}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                  Nome da Empresa / Marca *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Café & Bistrô Origem"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                  Upload do Logotipo (PNG, SVG ou WebP)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Processando...' : 'Selecionar Arquivo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <span className="text-xs text-neutral-400">ou informe a URL abaixo</span>
                </div>
                {uploadError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{uploadError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                  URL da Imagem / Logo *
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="/clients/sua-marca.svg ou https://..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                  Link do Site da Marca (Opcional)
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://exemplo.com.br"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>

            {/* Live Visual Card Preview */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <span className="text-xs font-mono uppercase text-neutral-400">
                Prévia exata no card escuro do site
              </span>

              <div className="w-56 h-28 rounded-2xl bg-[#0E0F12] border border-white/10 p-5 flex items-center justify-center shadow-lg">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={name || 'Prévia'}
                    className="max-h-full max-w-full object-contain filter invert-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center text-neutral-600">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span className="text-[11px]">Nenhum logo carregado</span>
                  </div>
                )}
              </div>

              <span className="text-[11px] text-neutral-500 text-center">
                Recomendado: Logotipos brancos ou monocromáticos com fundo transparente.
              </span>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors disabled:opacity-40"
            >
              <Check className="w-4 h-4" />
              <span>{editingId ? 'Salvar Edição' : 'Adicionar ao Marquee'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Clients List Table / Cards */}
      <div className="space-y-3">
        {clients.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0E0F12] border border-white/5 text-center text-neutral-500">
            Nenhuma marca cadastrada. Clique em "Adicionar Marca" para começar.
          </div>
        ) : (
          clients.map((client, idx) => (
            <div
              key={client.id}
              className={`p-4 rounded-xl bg-[#0E0F12] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                client.is_active ? 'border-white/5' : 'border-white/5 opacity-50 bg-[#0A0A0C]'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Order controls */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                    title="Subir posição"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === clients.length - 1}
                    className="p-1 rounded text-neutral-500 hover:text-white disabled:opacity-20"
                    title="Descer posição"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Logo thumbnail */}
                <div className="w-24 h-14 rounded-lg bg-black/60 border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{client.name}</span>
                    {!client.is_active && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        Oculto
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500 truncate block max-w-xs sm:max-w-md">
                    {client.logo_url}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => toggleActive(client.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    client.is_active
                      ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                      : 'text-neutral-500 bg-white/5 hover:bg-white/10'
                  }`}
                  title={client.is_active ? 'Ocultar do marquee' : 'Exibir no marquee'}
                >
                  {client.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => startEdit(client)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => deleteClient(client.id)}
                  className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Excluir marca"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

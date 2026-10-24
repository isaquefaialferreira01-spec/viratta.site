import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ServiceItem } from '../../../types/cms';
import { 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  RotateCcw,
  Briefcase 
} from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

export const ContentServicesView: React.FC = () => {
  const { draft, updateServices } = useCms();
  const services = draft.services || [];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // New service form state
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleUpdate = (id: string, updates: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    updateServices(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const list = [...services];
    const item = list[index];
    list.splice(index, 1);
    list.splice(targetIdx, 0, item);

    // Update display_order
    const reordered = list.map((s, i) => ({ ...s, display_order: i + 1 }));
    updateServices(reordered);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    handleUpdate(id, { is_active: !current });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta capacidade/serviço?')) {
      updateServices(services.filter((s) => s.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const handleAddService = () => {
    if (!newName.trim()) return;

    const nextNumber = newNumber.trim() || `0${services.length + 1}`.slice(-2);
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      number: nextNumber,
      name: newName.trim(),
      description: newDesc.trim() || 'Descrição dos diferenciais e escopo estratégico da capacidade.',
      display_order: services.length + 1,
      is_active: true,
    };

    updateServices([...services, newService]);
    setIsAdding(false);
    setNewNumber('');
    setNewName('');
    setNewDesc('');
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar as 5 capacidades oficiais originais da VIRATTA?')) {
      updateServices(DEFAULT_CMS_STATE.services);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Serviços & Capacidades
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-0.5">
            Gerencie a lista de serviços oficiais, ordenação, descrições e status ativo/inativo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Serviço</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            title="Restaurar os 5 serviços padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrões</span>
          </button>
        </div>
      </div>

      {/* Add new service form (collapsible) */}
      {isAdding && (
        <div className="p-5 rounded-xl bg-[#0E1015] border border-[#FF5E14]/30 space-y-4 animate-fadeIn">
          <span className="text-xs font-mono font-bold uppercase text-[#FF5E14]">
            Novo Serviço / Capacidade
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Número
              </label>
              <input
                type="text"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                placeholder="06"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
            <div className="sm:col-span-9">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Nome do Serviço
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Consultoria de Autoridade"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Descrição Curta
            </label>
            <textarea
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Descreva o impacto e escopo para o cliente..."
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF5E14]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleAddService}
              disabled={!newName.trim()}
              className="px-4 py-2 rounded-lg bg-[#FF5E14] text-white text-xs font-bold disabled:opacity-50 hover:bg-[#E04E0B] transition-colors"
            >
              Salvar Serviço
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white text-xs transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Compact List of Services */}
      <div className="space-y-3">
        {services.map((service, index) => {
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`p-4 rounded-xl border transition-all ${
                isEditing
                  ? 'bg-[#0E1015] border-[#FF5E14]/40'
                  : 'bg-[#0A0B0E] border-white/5 hover:border-white/10'
              }`}
            >
              {isEditing ? (
                /* Inline Edit Mode */
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        value={service.number}
                        onChange={(e) => handleUpdate(service.id, { number: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                    <div className="sm:col-span-10">
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Nome do Serviço
                      </label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleUpdate(service.id, { name: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Descrição
                    </label>
                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(e) => handleUpdate(service.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Concluir Edição</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Compact Read/Row Mode */
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-[#FF5E14] px-2 py-1 rounded bg-[#FF5E14]/10 shrink-0">
                      {service.number}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold truncate ${service.is_active ? 'text-white' : 'text-neutral-500 line-through'}`}>
                          {service.name}
                        </span>
                        {!service.is_active && (
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1 font-light mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Reordering */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === services.length - 1}
                      className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-20"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Active Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(service.id, service.is_active)}
                      className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                        service.is_active
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      {service.is_active ? 'Ativo' : 'Inativo'}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => setEditingId(service.id)}
                      className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                      title="Editar serviço"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

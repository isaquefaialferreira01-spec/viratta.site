import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { ServiceItem } from '../../../types/cms';
import { Layers, ArrowUpRight, Edit2, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_CMS_STATE } from '../../../lib/cmsDefaults';

export const ServicesTab: React.FC = () => {
  const { draft, updateServices } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);

  const services = draft.services || [];

  const handleUpdateService = (id: string, updates: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    updateServices(updated);
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar os 5 serviços padrão da VIRATTA?')) {
      updateServices(DEFAULT_CMS_STATE.services);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Capacidades Viratta (5 Serviços Oficiais)
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Mantenha a apresentação minimalista baseada em texto aprovada no layout institucional.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar 5 Padrões</span>
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => {
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`p-5 md:p-6 rounded-2xl bg-[#0E0F12] border transition-all ${
                isEditing ? 'border-[#FF5E14]/40 bg-[#121318]' : 'border-white/5 hover:border-white/10'
              }`}
            >
              {isEditing ? (
                /* Editing Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        value={service.number}
                        onChange={(e) => handleUpdateService(service.id, { number: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                    <div className="sm:col-span-9">
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Nome da Capacidade / Serviço
                      </label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleUpdateService(service.id, { name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Mini Descrição Textual (Concisa e de Alto Impacto)
                    </label>
                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(e) => handleUpdateService(service.id, { description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Concluir Edição</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode matching real site layout */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#FF5E14]">
                        {service.number}
                      </span>
                      <h3 className="text-base font-extrabold text-white tracking-tight">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setEditingId(service.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editar</span>
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

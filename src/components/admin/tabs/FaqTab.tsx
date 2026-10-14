import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { FaqItem } from '../../../types/cms';
import { DEFAULT_FAQ_ITEMS } from '../../../lib/cmsDefaults';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Code
} from 'lucide-react';

export const FaqTab: React.FC = () => {
  const { draft, updateFaqItems } = useCms();
  const faqList: FaqItem[] = draft.faq_items || DEFAULT_FAQ_ITEMS;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  // New item form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // SEO Preview toggle
  const [showSchemaPreview, setShowSchemaPreview] = useState(false);

  const handleStartEdit = (item: FaqItem) => {
    setEditingId(item.id);
    setEditQuestion(item.question);
    setEditAnswer(item.answer);
  };

  const handleSaveEdit = (id: string) => {
    if (!editQuestion.trim() || !editAnswer.trim()) return;

    const updated = faqList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          question: editQuestion.trim(),
          answer: editAnswer.trim(),
        };
      }
      return item;
    });

    updateFaqItems(updated);
    setEditingId(null);
  };

  const handleToggleActive = (id: string) => {
    const updated = faqList.map((item) => {
      if (item.id === id) {
        return { ...item, is_active: !item.is_active };
      }
      return item;
    });
    updateFaqItems(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta pergunta frequente?')) {
      const updated = faqList.filter((item) => item.id !== id);
      updateFaqItems(updated);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqList.length) return;

    const updated = [...faqList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Re-index display_order
    const reordered = updated.map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));

    updateFaqItems(reordered);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newItem: FaqItem = {
      id: `faq-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      display_order: faqList.length + 1,
      is_active: true,
    };

    updateFaqItems([...faqList, newItem]);
    setNewQuestion('');
    setNewAnswer('');
    setShowAddForm(false);
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar as perguntas e respostas originais padrão da VIRATTA?')) {
      updateFaqItems(DEFAULT_FAQ_ITEMS);
      setEditingId(null);
    }
  };

  // Schema.org Preview JSON
  const schemaJson = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList
        .filter((f) => f.is_active !== false)
        .map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
    },
    null,
    2
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FF5E14]" />
            <span>Perguntas Frequentes & SEO (FAQ)</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light mt-1">
            Gerencie o conteúdo do accordion minimalista e os dados estruturados do Google (Schema.org FAQPage).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSchemaPreview(!showSchemaPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showSchemaPreview ? 'Ocultar JSON-LD' : 'Ver Schema SEO'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Pergunta</span>
          </button>
        </div>
      </div>

      {/* Optional SEO Schema.org JSON-LD Modal / Box */}
      {showSchemaPreview && (
        <div className="p-5 rounded-2xl bg-[#090A0C] border border-[#FF5E14]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#FF5E14]" />
              <span className="text-xs font-bold text-white">Schema.org FAQPage (Sincronizado automaticamente para indexação)</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#FF5E14]/20 text-[#FF5E14] px-2 py-0.5 rounded-full font-semibold">
              SEO Google Rich Snippet
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Este script é injetado dinamicamente no cabeçalho do site para que o Google exiba o carrossel expansível de respostas diretamente nas buscas:
          </p>
          <pre className="p-3.5 rounded-xl bg-black/70 border border-white/5 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-60 overflow-y-auto">
            {schemaJson}
          </pre>
        </div>
      )}

      {/* Form: Add New FAQ */}
      {showAddForm && (
        <form onSubmit={handleAddNew} className="p-6 rounded-2xl bg-[#0E0F12] border border-[#FF5E14]/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF5E14]" />
              <span>Adicionar Nova Pergunta Frequente</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Pergunta
              </label>
              <input
                type="text"
                required
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ex: Como funciona o processo de aprovação de vídeos?"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                Resposta Completa
              </label>
              <textarea
                required
                rows={4}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Explique com clareza a resposta..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Adicionar Pergunta
            </button>
          </div>
        </form>
      )}

      {/* List of FAQ Items */}
      <div className="space-y-3">
        {faqList.map((item, index) => {
          const isEditing = editingId === item.id;
          const indexNumber = String(index + 1).padStart(2, '0');

          if (isEditing) {
            return (
              <div key={item.id} className="p-5 rounded-2xl bg-[#0E0F12] border border-[#FF5E14] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono text-[#FF5E14] font-bold">Editando Pergunta #{indexNumber}</span>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Pergunta</label>
                    <input
                      type="text"
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Resposta</label>
                    <textarea
                      rows={4}
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5E14] resize-y"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(item.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#FF5E14] hover:bg-[#E04E0B] text-white text-xs font-bold"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                item.is_active !== false
                  ? 'bg-[#0E0F12] border-white/5 hover:border-white/10'
                  : 'bg-[#08080A] border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="font-mono text-xs font-bold text-[#FF5E14] shrink-0 mt-0.5">
                    {indexNumber}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Mover para cima"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === faqList.length - 1}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Mover para baixo"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                    title={item.is_active !== false ? 'Ocultar do site' : 'Exibir no site'}
                  >
                    {item.is_active !== false ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartEdit(item)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Editar pergunta"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

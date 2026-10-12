'use client';

import React, { useState } from 'react';
import { GroceryItem } from '@/types';
import { 
  ShoppingCart, 
  X, 
  CheckSquare, 
  Square, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface GroceryListModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onResetChecks: () => void;
}

export const GroceryListModal: React.FC<GroceryListModalProps> = ({
  isOpen,
  onClose,
  items,
  onToggleItem,
  onResetChecks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  if (!isOpen) return null;

  const categories = ['Todas', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = selectedCategory === 'Todas'
    ? items
    : items.filter(i => i.category === selectedCategory);

  const completedCount = items.filter(i => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Lista Semanal del Súper (Pareja)
              </h3>
              <p className="text-xs text-slate-500">
                Cantidades calculadas para Mauricio y Anny (Salmón, Camarones, Pollo, Cerdo y Vegetales)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Category Filter */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">
              Progreso de compra: {completedCount} de {items.length} artículos listos
            </span>
            <button
              onClick={onResetChecks}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar lista
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                item.checked
                  ? 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                  : 'bg-white hover:bg-emerald-50/40 text-slate-800 border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.checked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-semibold block">{item.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium block">{item.category}</span>
                </div>
              </div>

              <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                item.checked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
              }`}>
                {item.quantityForBothWeekly}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Alimentos frescos de bajo índice glucémico</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};

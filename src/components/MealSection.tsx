'use client';

import React, { useState } from 'react';
import { DayNutritionPlan, MealItem, UserId } from '@/types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Utensils, 
  Sparkles, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Layers,
  ChefHat
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MealSectionProps {
  dayPlan: DayNutritionPlan;
  activeUser: UserId;
  desayunoCompleted: boolean;
  almuerzoCompleted: boolean;
  cenaCompleted: boolean;
  snackCompleted: boolean;
  onToggleMeal: (mealType: 'desayuno' | 'almuerzo' | 'cena' | 'snack') => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
  dayPlan,
  activeUser,
  desayunoCompleted,
  almuerzoCompleted,
  cenaCompleted,
  snackCompleted,
  onToggleMeal,
}) => {
  const [selectedMealType, setSelectedMealType] = useState<'all' | 'desayuno' | 'almuerzo' | 'cena' | 'snack'>('all');
  const [showPairComparison, setShowPairComparison] = useState(true);
  const [expandedInstructions, setExpandedInstructions] = useState<Record<string, boolean>>({});

  const toggleInstructions = (id: string) => {
    setExpandedInstructions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMealCheck = (type: 'desayuno' | 'almuerzo' | 'cena' | 'snack') => {
    onToggleMeal(type);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#3b82f6', '#f59e0b'],
    });
  };

  const meals = [
    { type: 'desayuno' as const, item: dayPlan.desayuno, isDone: desayunoCompleted, label: 'Desayuno', timeLabel: '07:30 - 09:00' },
    { type: 'almuerzo' as const, item: dayPlan.almuerzo, isDone: almuerzoCompleted, label: 'Almuerzo', timeLabel: '13:00 - 14:30' },
    { type: 'cena' as const, item: dayPlan.cena, isDone: cenaCompleted, label: 'Cena', timeLabel: '19:30 - 21:00' },
    { type: 'snack' as const, item: dayPlan.snack, isDone: snackCompleted, label: 'Snack / Merienda', timeLabel: '16:30 - 17:30' },
  ];

  const filteredMeals = selectedMealType === 'all' 
    ? meals 
    : meals.filter(m => m.type === selectedMealType);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'salmon':
        return <span className="bg-orange-100 text-orange-800 border border-orange-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🐟 Salmón</span>;
      case 'camarones':
        return <span className="bg-rose-100 text-rose-800 border border-rose-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🍤 Camarones</span>;
      case 'pollo':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🍗 Pollo</span>;
      case 'cerdo':
        return <span className="bg-red-100 text-red-800 border border-red-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🥩 Cerdo Magro</span>;
      case 'huevo':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🍳 Huevos</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">🥗 Vegetal / Fibra</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-600" />
            Plan Nutricional: {dayPlan.dayName}
          </h3>
          <p className="text-xs text-slate-500">
            Enfocado en control glucémico continuo y porciones individuales
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Comparación de Pareja */}
          <button
            onClick={() => setShowPairComparison(!showPairComparison)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              showPairComparison
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showPairComparison ? 'Ver Ambas Porciones' : 'Solo Mi Porción'}</span>
          </button>

          {/* Filtros de Comida */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/60 text-xs">
            <button
              onClick={() => setSelectedMealType('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedMealType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedMealType('desayuno')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                selectedMealType === 'desayuno' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Desayuno
            </button>
            <button
              onClick={() => setSelectedMealType('almuerzo')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                selectedMealType === 'almuerzo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Almuerzo
            </button>
            <button
              onClick={() => setSelectedMealType('cena')}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                selectedMealType === 'cena' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Cena
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Tarjetas de Comida */}
      <div className="grid grid-cols-1 gap-5">
        {filteredMeals.map(({ type, item, isDone, label, timeLabel }) => {
          const currentMacros = activeUser === 'mauricio' ? item.macrosMauricio : item.macrosAnny;
          const isExpanded = !!expandedInstructions[item.id];

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                isDone
                  ? 'border-emerald-300 ring-1 ring-emerald-300/40 bg-emerald-50/10'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Card Header Bar */}
              <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleMealCheck(type)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform active:scale-90 ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                        : 'bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={isDone ? 'Marcar como pendiente' : 'Marcar como completada'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6 stroke-[1.5]" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {label} • {timeLabel}
                      </span>
                      {getCategoryBadge(item.category)}
                      <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        Carga Glucémica: {item.glycemicLoad}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Status & Prep time */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.prepTimeMinutes} min</span>
                  </div>

                  <button
                    onClick={() => handleMealCheck(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isDone ? '¡Comido! ✓' : 'Marcar Ingesta'}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Tip Clínico Anti-Glucosa */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-amber-900 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-950">Consejo Metabólico: </strong>
                    {item.glucoseTip}
                  </div>
                </div>

                {/* Ingredientes y Porciones */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-100 pb-1">
                    <span className="flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4 text-emerald-600" />
                      Ingredientes y Porciones Personalizadas:
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Cocinando para dos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {item.ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 text-xs gap-2"
                      >
                        <span className="font-medium text-slate-800">{ing.name}</span>

                        <div className="flex items-center gap-2">
                          {showPairComparison ? (
                            <>
                              <span className="bg-blue-50 text-blue-700 border border-blue-200/70 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                                Mauricio: {ing.portionMauricio}
                              </span>
                              <span className="bg-teal-50 text-teal-700 border border-teal-200/70 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                                Anny: {ing.portionAnny}
                              </span>
                            </>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                              Tu porción: {activeUser === 'mauricio' ? ing.portionMauricio : ing.portionAnny}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pasos de Preparación (Acordeón) */}
                <div>
                  <button
                    onClick={() => toggleInstructions(item.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Ocultar pasos de cocina
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Ver cómo preparar en {item.prepTimeMinutes} minutos
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <ol className="mt-3 pl-4 space-y-1.5 text-xs text-slate-600 list-decimal border-l-2 border-emerald-200 ml-1 py-1">
                      {item.instructions.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                {/* Barra de Macros de la Comida */}
                <div className="bg-slate-100/70 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs border border-slate-200/50">
                  <div className="font-semibold text-slate-700">
                    Aporte Nutricional ({activeUser === 'mauricio' ? 'Mauricio' : 'Anny'}):
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      {currentMacros.calories} kcal
                    </span>
                    <span className="text-blue-700 font-semibold">
                      P: {currentMacros.proteinG}g
                    </span>
                    <span className="text-amber-700 font-semibold">
                      C: {currentMacros.carbsG}g
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      G: {currentMacros.fatG}g
                    </span>
                    <span className="text-purple-700 font-semibold">
                      Fibra: {currentMacros.fiberG}g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

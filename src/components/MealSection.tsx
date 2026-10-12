'use client';

import React, { useState } from 'react';
import { DayNutritionPlan, MealItem, UserId } from '@/types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Layers,
  ChefHat,
  Apple
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'salmon':
        return <span className="bg-orange-100 text-orange-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🐟 Salmón</span>;
      case 'camarones':
        return <span className="bg-rose-100 text-rose-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🍤 Camarones</span>;
      case 'pollo':
        return <span className="bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🍗 Pollo</span>;
      case 'cerdo':
        return <span className="bg-red-100 text-red-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🥩 Cerdo Magro</span>;
      case 'huevo':
        return <span className="bg-yellow-100 text-yellow-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🍳 Huevos</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2 py-0.5 rounded-full font-semibold">🥗 Vegetal</span>;
    }
  };

  // Las 3 comidas principales colocadas en columnas horizontales
  const mainMeals = [
    {
      type: 'desayuno' as const,
      item: dayPlan.desayuno,
      isDone: desayunoCompleted,
      label: 'Desayuno',
      timeLabel: '07:30 - 09:00',
      icon: '🌅',
      headerBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
      accentColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      type: 'almuerzo' as const,
      item: dayPlan.almuerzo,
      isDone: almuerzoCompleted,
      label: 'Almuerzo',
      timeLabel: '13:00 - 14:30',
      icon: '☀️',
      headerBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      type: 'cena' as const,
      item: dayPlan.cena,
      isDone: cenaCompleted,
      label: 'Cena',
      timeLabel: '19:30 - 21:00',
      icon: '🌙',
      headerBg: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white',
      accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
  ];

  const snackItem = dayPlan.snack;
  const snackMacros = activeUser === 'mauricio' ? snackItem.macrosMauricio : snackItem.macrosAnny;
  const isSnackExpanded = !!expandedInstructions[snackItem.id];

  return (
    <div className="space-y-6">
      {/* Barra Superior con toggle de porciones de pareja (Sin texto Plan Nutricional) */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Comidas del Día • Vista en Columnas
          </span>
        </div>

        <button
          onClick={() => setShowPairComparison(!showPairComparison)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
            showPairComparison
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showPairComparison ? 'Ver Ambas Porciones' : 'Solo Mi Porción'}</span>
        </button>
      </div>

      {/* DISPOSICIÓN HORIZONTAL EN 3 MÓDULOS (COLUMNAS): DESAYUNO | ALMUERZO | CENA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {mainMeals.map(({ type, item, isDone, label, timeLabel, icon, headerBg, accentColor }) => {
          const currentMacros = activeUser === 'mauricio' ? item.macrosMauricio : item.macrosAnny;
          const isExpanded = !!expandedInstructions[item.id];

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between ${
                isDone
                  ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                {/* 1. Cabecera del Módulo (como en el boceto) */}
                <div className={`p-4 ${headerBg} flex items-center justify-between shadow-sm`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <h4 className="text-base font-extrabold tracking-wide uppercase">
                        {label}
                      </h4>
                      <span className="text-[11px] opacity-90 block">
                        {timeLabel}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMealCheck(type)}
                    className={`p-1.5 rounded-xl transition-all ${
                      isDone
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                    title={isDone ? 'Completado (clic para desmarcar)' : 'Marcar como completado'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6 stroke-[1.75]" />
                    )}
                  </button>
                </div>

                {/* 2. Cuerpo del Módulo */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Badges y Tiempo */}
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {getCategoryBadge(item.category)}
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        IG: {item.glycemicLoad}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.prepTimeMinutes}m</span>
                    </div>
                  </div>

                  {/* Título del plato */}
                  <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug min-h-[2.75rem] flex items-center">
                    {item.title}
                  </h5>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tip Metabólico */}
                  <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5 text-amber-900 text-[11px] leading-relaxed flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Tip Glucemia: </span>
                      {item.glucoseTip}
                    </div>
                  </div>

                  {/* Ingredientes y Porciones */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
                        Ingredientes:
                      </span>
                    </div>

                    <div className="space-y-1">
                      {item.ingredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg bg-slate-50 text-[11px] flex flex-col justify-between border border-slate-100 gap-0.5"
                        >
                          <span className="font-medium text-slate-800">{ing.name}</span>
                          <div>
                            {showPairComparison ? (
                              <div className="flex items-center gap-1 flex-wrap text-[10px]">
                                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-semibold">
                                  M: {ing.portionMauricio}
                                </span>
                                <span className="bg-teal-50 text-teal-700 px-1.5 py-0.2 rounded font-semibold">
                                  A: {ing.portionAnny}
                                </span>
                              </div>
                            ) : (
                              <span className="text-emerald-700 font-bold text-[10px]">
                                {activeUser === 'mauricio' ? ing.portionMauricio : ing.portionAnny}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acordeón Preparación */}
                  <div>
                    <button
                      onClick={() => toggleInstructions(item.id)}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          Ocultar preparación
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          Ver preparación ({item.prepTimeMinutes} min)
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <ol className="mt-2 pl-3 space-y-1 text-[11px] text-slate-600 list-decimal border-l border-emerald-200 ml-1 py-1">
                        {item.instructions.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed pl-1">
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Pie del Módulo (Macros y Botón de Acción) */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2.5">
                {/* Macros */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {currentMacros.calories} kcal
                  </span>
                  <span>P: <strong className="text-blue-700">{currentMacros.proteinG}g</strong></span>
                  <span>C: <strong className="text-amber-700">{currentMacros.carbsG}g</strong></span>
                  <span>G: <strong className="text-emerald-700">{currentMacros.fatG}g</strong></span>
                </div>

                {/* Botón de Marcado Ingesta */}
                <button
                  onClick={() => handleMealCheck(type)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>¡Comido!</span>
                    </>
                  ) : (
                    <span>Marcar Ingesta</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Módulo de Snack / Merienda (Horizontal compacto debajo de las 3 columnas) */}
      <div className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        snackCompleted
          ? 'border-emerald-400 ring-2 ring-emerald-400/20 bg-emerald-50/10'
          : 'border-slate-200/80 shadow-xs'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleMealCheck('snack')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              snackCompleted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-400 hover:text-emerald-600'
            }`}
          >
            {snackCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🍓</span>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                Snack / Merienda • 16:30 - 17:30
              </span>
              <span className="text-[11px] text-slate-400">
                {snackMacros.calories} kcal • {snackMacros.proteinG}g P
              </span>
            </div>
            <h5 className="font-bold text-slate-900 text-sm mt-0.5">
              {snackItem.title}
            </h5>
            <p className="text-xs text-slate-500 mt-0.5">
              {snackItem.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => toggleInstructions(snackItem.id)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {isSnackExpanded ? 'Ocultar ingredientes' : 'Ver ingredientes'}
          </button>

          <button
            onClick={() => handleMealCheck('snack')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              snackCompleted
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {snackCompleted ? '¡Comido! ✓' : 'Marcar Ingesta'}
          </button>
        </div>
      </div>

      {isSnackExpanded && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2 animate-in fade-in">
          <span className="font-bold text-slate-700 block">Porciones de Snack:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {snackItem.ingredients.map((ing, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between">
                <span className="font-medium text-slate-800">{ing.name}</span>
                <span className="text-slate-500 font-semibold">
                  M: {ing.portionMauricio} | A: {ing.portionAnny}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

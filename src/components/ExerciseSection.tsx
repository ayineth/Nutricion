'use client';

import React, { useState } from 'react';
import { ExerciseRoutine, UserId } from '@/types';
import { 
  Dumbbell, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ShieldAlert, 
  Heart, 
  Flame, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseSectionProps {
  routine: ExerciseRoutine;
  activeUser: UserId;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  routine,
  activeUser,
  isCompleted,
  onToggleComplete,
}) => {
  const isMauricio = activeUser === 'mauricio';
  const isStrong = routine.type === 'fuerte';

  const handleToggle = () => {
    onToggleComplete();
    if (!isCompleted) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#059669', '#3b82f6', '#f59e0b'],
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                isStrong
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : 'bg-teal-100 text-teal-800 border border-teal-200'
              }`}
            >
              {isStrong ? '⚡ Día Fuerte (Fuerza)' : '🌿 Día Suave (Movilidad / Caminata)'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {routine.dayName}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-600" />
            {routine.title}
          </h3>
          <p className="text-xs text-slate-500">
            {routine.focus} • Duración estimada: {routine.durationMinutes} minutos en casa
          </p>
        </div>

        {/* Check Button */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>¡Entrenamiento Cumplido!</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 stroke-[2]" />
              <span>Marcar Rutina Completada</span>
            </>
          )}
        </button>
      </div>

      {/* Razón Clínica para Prediabetes */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex items-start gap-3 text-emerald-900 text-xs">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-emerald-950">Por qué este entrenamiento revierte la prediabetes: </strong>
          {routine.benefitsForPrediabetes}
        </div>
      </div>

      {/* Alerta Personalizada según el Usuario Activo */}
      {isMauricio ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950">Nota de Protección para Mauricio (Cadera): </span>
            {routine.hipPrecautionsMauricio}
          </div>
        </div>
      ) : (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-teal-900">
          <Heart className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-teal-950">Recomendación para Anny (Masa Muscular): </span>
            {routine.annyRecommendation}
          </div>
        </div>
      )}

      {/* Calentamiento */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-xs">
        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Calentamiento Previo (3 minutos):
        </h4>
        <ul className="space-y-1 text-slate-600 list-disc list-inside">
          {routine.warmup.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Lista de Ejercicios */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Circuito de Ejercicios:
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {routine.exercises.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-white transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm">{ex.name}</h5>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {ex.repsOrTime}
                  </span>
                  {ex.restSeconds > 0 && (
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                      Descanso: {ex.restSeconds}s
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                {ex.instructions}
              </p>

              <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-1.5">
                <span className="font-medium">Músculos implicados:</span> {ex.targetMuscles}
              </div>

              {ex.hipFriendlyTip && (
                <div className="bg-blue-50/70 border border-blue-200/60 rounded-lg p-2 text-[11px] text-blue-900 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Adaptación segura para cadera:</strong> {ex.hipFriendlyTip}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enfriamiento */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 text-xs">
        <h4 className="font-bold text-slate-800 mb-2">
          Vuelta a la Calma y Estiramientos:
        </h4>
        <ul className="space-y-1 text-slate-600 list-disc list-inside">
          {routine.cooldown.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { UserId, DailyLog } from '@/types';
import { PROFILES } from '@/data/profiles';
import { WEEKLY_NUTRITION_PLANS } from '@/data/nutritionPlans';
import { WEEKLY_EXERCISES } from '@/data/exerciseRoutines';
import { 
  getLog, 
  saveLog, 
  loadAllLogs, 
  calculateStreak, 
  loadGroceries, 
  saveGroceries 
} from '@/lib/storage';
import { getSupabaseConfig } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { ProfileSummary } from '@/components/ProfileSummary';
import { MealSection } from '@/components/MealSection';
import { ExerciseSection } from '@/components/ExerciseSection';
import { CalendarTracker } from '@/components/CalendarTracker';
import { GroceryListModal } from '@/components/GroceryListModal';
import { GlucoseGuideModal } from '@/components/GlucoseGuideModal';
import { SupabaseConfigModal } from '@/components/SupabaseConfigModal';
import { 
  Utensils, 
  Dumbbell, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Flame,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';

export default function Home() {
  const [activeUser, setActiveUser] = useState<UserId>('mauricio');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [activeTab, setActiveTab] = useState<'nutrition' | 'exercise' | 'calendar'>('nutrition');

  // Modales
  const [isGroceriesOpen, setIsGroceriesOpen] = useState(false);
  const [isGlucoseGuideOpen, setIsGlucoseGuideOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);

  // Estados de datos
  const [allLogs, setAllLogs] = useState<Record<string, DailyLog>>({});
  const [currentLog, setCurrentLog] = useState<DailyLog>(() => getLog(selectedDate, activeUser));
  const [streak, setStreak] = useState<number>(0);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [groceries, setGroceries] = useState(() => loadGroceries());

  // Carga inicial y reactividad
  useEffect(() => {
    const loadedLogs = loadAllLogs();
    setAllLogs(loadedLogs);
    setCurrentLog(getLog(selectedDate, activeUser));
    setStreak(calculateStreak(activeUser));

    const cfg = getSupabaseConfig();
    setIsSupabaseConnected(cfg.isConfigured);
  }, [activeUser, selectedDate]);

  // Actualizar log diario
  const handleUpdateLog = (changes: Partial<DailyLog>) => {
    const updated = { ...currentLog, ...changes };
    setCurrentLog(updated);
    saveLog(updated);

    const key = `${updated.date}_${updated.userId}`;
    setAllLogs(prev => ({ ...prev, [key]: updated }));
    setStreak(calculateStreak(activeUser));
  };

  const handleToggleMeal = (mealType: 'desayuno' | 'almuerzo' | 'cena' | 'snack') => {
    switch (mealType) {
      case 'desayuno':
        handleUpdateLog({ desayunoCompleted: !currentLog.desayunoCompleted });
        break;
      case 'almuerzo':
        handleUpdateLog({ almuerzoCompleted: !currentLog.almuerzoCompleted });
        break;
      case 'cena':
        handleUpdateLog({ cenaCompleted: !currentLog.cenaCompleted });
        break;
      case 'snack':
        handleUpdateLog({ snackCompleted: !currentLog.snackCompleted });
        break;
    }
  };

  const handleToggleExercise = () => {
    handleUpdateLog({ exerciseCompleted: !currentLog.exerciseCompleted });
  };

  // Grocery toggles
  const handleToggleGrocery = (id: string) => {
    const updated = groceries.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setGroceries(updated);
    saveGroceries(updated);
  };

  const handleResetGroceries = () => {
    const reset = groceries.map(item => ({ ...item, checked: false }));
    setGroceries(reset);
    saveGroceries(reset);
  };

  // Determinar qué día de la semana corresponde a la fecha seleccionada
  const dateObj = new Date(selectedDate + 'T12:00:00');
  const dayOfWeek = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, etc.

  const currentNutritionPlan = WEEKLY_NUTRITION_PLANS.find(p => p.dayOfWeek === dayOfWeek) || WEEKLY_NUTRITION_PLANS[0];
  const currentExerciseRoutine = WEEKLY_EXERCISES.find(e => e.dayOfWeek === dayOfWeek) || WEEKLY_EXERCISES[0];

  const profile = PROFILES[activeUser];

  // Navegación de fechas rápida
  const changeDateByDays = (days: number) => {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Barra de navegación superior */}
      <Navbar
        activeUser={activeUser}
        onSelectUser={setActiveUser}
        streak={streak}
        isSupabaseConnected={isSupabaseConnected}
        onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        onOpenGlucoseGuide={() => setIsGlucoseGuideOpen(true)}
        onOpenGroceries={() => setIsGroceriesOpen(true)}
      />

      {/* Contenido Principal */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* Resumen del perfil activo */}
        <ProfileSummary profile={profile} />

        {/* Barra de Selector de Día & Navegación de Vistas */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Selector de Fecha */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => changeDateByDays(-1)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
              title="Día anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-sm font-extrabold text-slate-900 block capitalize">
                {currentNutritionPlan.dayName},{' '}
                {new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(dateObj)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {selectedDate === new Date().toISOString().split('T')[0] ? '¡Día de Hoy!' : selectedDate}
              </span>
            </div>

            <button
              onClick={() => changeDateByDays(1)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
              title="Día siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de Pestañas Principales */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/70 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'nutrition'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>Alimentación</span>
            </button>

            <button
              onClick={() => setActiveTab('exercise')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'exercise'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dumbbell className="w-4 h-4 text-emerald-600" />
              <span>Ejercicio</span>
              {currentLog.exerciseCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-emerald-600" />
              <span>Calendario</span>
            </button>
          </div>
        </div>

        {/* Vista: Nutrición */}
        {activeTab === 'nutrition' && (
          <MealSection
            dayPlan={currentNutritionPlan}
            activeUser={activeUser}
            desayunoCompleted={currentLog.desayunoCompleted}
            almuerzoCompleted={currentLog.almuerzoCompleted}
            cenaCompleted={currentLog.cenaCompleted}
            snackCompleted={currentLog.snackCompleted}
            onToggleMeal={handleToggleMeal}
          />
        )}

        {/* Vista: Ejercicio */}
        {activeTab === 'exercise' && (
          <ExerciseSection
            routine={currentExerciseRoutine}
            activeUser={activeUser}
            isCompleted={currentLog.exerciseCompleted}
            onToggleComplete={handleToggleExercise}
          />
        )}

        {/* Vista: Calendario & Tracking */}
        {activeTab === 'calendar' && (
          <CalendarTracker
            currentDate={selectedDate}
            onSelectDate={setSelectedDate}
            allLogs={allLogs}
            activeUser={activeUser}
            activeLog={currentLog}
            onUpdateLog={handleUpdateLog}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> para la salud de Mauricio & Anny
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <button onClick={() => setIsGlucoseGuideOpen(true)} className="hover:text-emerald-700">
              Guía Médica
            </button>
            <button onClick={() => setIsGroceriesOpen(true)} className="hover:text-emerald-700">
              Lista del Súper
            </button>
            <button onClick={() => setIsSupabaseConfigOpen(true)} className="hover:text-emerald-700">
              Base de Datos
            </button>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <GroceryListModal
        isOpen={isGroceriesOpen}
        onClose={() => setIsGroceriesOpen(false)}
        items={groceries}
        onToggleItem={handleToggleGrocery}
        onResetChecks={handleResetGroceries}
      />

      <GlucoseGuideModal
        isOpen={isGlucoseGuideOpen}
        onClose={() => setIsGlucoseGuideOpen(false)}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseConfigOpen}
        onClose={() => setIsSupabaseConfigOpen(false)}
        onConfigSaved={() => {
          const cfg = getSupabaseConfig();
          setIsSupabaseConnected(cfg.isConfigured);
        }}
      />
    </div>
  );
}

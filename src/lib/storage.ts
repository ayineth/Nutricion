import { DailyLog, GroceryItem, UserId } from '@/types';
import { INITIAL_GROCERY_LIST } from '@/data/groceries';
import { getSupabase } from './supabase';

const LOGS_STORAGE_KEY = 'nutri_daily_logs_v1';
const GROCERY_STORAGE_KEY = 'nutri_groceries_v1';

export const getEmptyDailyLog = (date: string, userId: UserId): DailyLog => ({
  date,
  userId,
  desayunoCompleted: false,
  almuerzoCompleted: false,
  cenaCompleted: false,
  snackCompleted: false,
  exerciseCompleted: false,
  waterGlasses: 0,
  notes: '',
});

export const loadAllLogs = (): Record<string, DailyLog> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error loading logs from localStorage', e);
    return {};
  }
};

export const saveLog = async (log: DailyLog) => {
  if (typeof window === 'undefined') return;
  const key = `${log.date}_${log.userId}`;
  const all = loadAllLogs();
  all[key] = log;
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(all));

  // Sincronización en segundo plano con Supabase si está activo
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('daily_logs').upsert({
        date: log.date,
        user_id: log.userId,
        desayuno_completed: log.desayunoCompleted,
        almuerzo_completed: log.almuerzoCompleted,
        cena_completed: log.cenaCompleted,
        snack_completed: log.snackCompleted,
        exercise_completed: log.exerciseCompleted,
        water_glasses: log.waterGlasses,
        fasting_glucose: log.glucoseFastingMgDl,
        notes: log.notes,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'date,user_id' });
    } catch (e) {
      console.warn('Sync to Supabase failed, kept locally', e);
    }
  }
};

export const getLog = (date: string, userId: UserId): DailyLog => {
  const all = loadAllLogs();
  const key = `${date}_${userId}`;
  return all[key] || getEmptyDailyLog(date, userId);
};

export const calculateStreak = (userId: UserId): number => {
  const all = loadAllLogs();
  let streak = 0;
  const today = new Date();

  // Comprobar días hacia atrás
  for (let i = 0; i < 60; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];
    const key = `${dateStr}_${userId}`;
    const log = all[key];

    if (!log) {
      // Si es hoy y aún no completa, no romper la racha de ayer todavía
      if (i === 0) continue;
      break;
    }

    // Se considera día cumplido si completó al menos las 3 comidas principales o 2 comidas + ejercicio
    const mealsDone = [log.desayunoCompleted, log.almuerzoCompleted, log.cenaCompleted].filter(Boolean).length;
    const isSuccessDay = mealsDone >= 2 && (log.exerciseCompleted || mealsDone === 3);

    if (isSuccessDay) {
      streak++;
    } else {
      if (i === 0) continue; // Hoy aún puede completarse
      break;
    }
  }

  return streak;
};

export const loadGroceries = (): GroceryItem[] => {
  if (typeof window === 'undefined') return INITIAL_GROCERY_LIST;
  try {
    const raw = localStorage.getItem(GROCERY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_GROCERY_LIST;
  } catch {
    return INITIAL_GROCERY_LIST;
  }
};

export const saveGroceries = (items: GroceryItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GROCERY_STORAGE_KEY, JSON.stringify(items));
};

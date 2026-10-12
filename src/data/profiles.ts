import { UserProfile } from '@/types';

export const PROFILES: Record<string, UserProfile> = {
  mauricio: {
    id: 'mauricio',
    name: 'Mauricio',
    age: 27,
    gender: 'Hombre',
    heightCm: 183,
    weightKg: 92,
    bmi: 27.5,
    condition: 'Prevención de Prediabetes / Recomposición Corporal',
    targetDailyCalories: 1900,
    targetDailyProtein: 155, // ~1.7g por kg
    targetDailyCarbs: 150,   // Carbos de bajo índice glucémico
    targetDailyFat: 68,      // Grasas monoinsaturadas y poliinsaturadas
    targetDailyFiber: 38,    // Vital para ralentizar absorción de glucosa
    hipCaution: true,
    notes: 'Priorizar protección articular en cadera (sin impacto, sin sentadillas profundas con rebote). Déficit calórico moderado para reducir grasa visceral.',
    avatarColor: 'from-blue-600 to-indigo-700',
  },
  anny: {
    id: 'anny',
    name: 'Anny',
    age: 27,
    gender: 'Mujer',
    heightCm: 154,
    weightKg: 52,
    bmi: 21.9,
    condition: 'Diagnóstico Oficial de Prediabetes (Enfoque Sensibilidad Insulina)',
    targetDailyCalories: 1500,
    targetDailyProtein: 100, // ~1.9g por kg para ganar masa muscular activa
    targetDailyCarbs: 125,   // Carbohidratos complejos de absorción lenta
    targetDailyFat: 55,      // Grasas saludables (omega-3, AOVE, aguacate)
    targetDailyFiber: 32,    // Esencial para aplanar curvas de glucosa
    hipCaution: false,
    notes: 'Normopeso metabólicamente vulnerable. NO debe hacer déficit agresivo. Enfoque en tonificación muscular para que el músculo funcione como depósito de glucosa.',
    avatarColor: 'from-emerald-600 to-teal-700',
  },
};

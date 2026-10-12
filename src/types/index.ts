export type UserId = 'mauricio' | 'anny';

export interface Macros {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
}

export interface UserProfile {
  id: UserId;
  name: string;
  age: number;
  gender: 'Hombre' | 'Mujer';
  heightCm: number;
  weightKg: number;
  bmi: number;
  condition: string;
  targetDailyCalories: number;
  targetDailyProtein: number;
  targetDailyCarbs: number;
  targetDailyFat: number;
  targetDailyFiber: number;
  hipCaution: boolean;
  notes: string;
  avatarColor: string;
}

export type MealCategory = 'salmon' | 'camarones' | 'pollo' | 'cerdo' | 'vegetal' | 'huevo';

export interface Ingredient {
  name: string;
  portionMauricio: string;
  portionAnny: string;
  notes?: string;
}

export interface MealItem {
  id: string;
  mealType: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTimeMinutes: number;
  macrosMauricio: Macros;
  macrosAnny: Macros;
  glycemicLoad: 'Muy Baja' | 'Baja' | 'Moderada Controlada';
  glucoseTip: string;
  category: MealCategory;
}

export interface DayNutritionPlan {
  dayOfWeek: number; // 0 = Domingo, 1 = Lunes, etc.
  dayName: string;
  desayuno: MealItem;
  almuerzo: MealItem;
  cena: MealItem;
  snack: MealItem;
}

export interface ExerciseStep {
  name: string;
  repsOrTime: string;
  restSeconds: number;
  instructions: string;
  hipFriendlyTip?: string;
  targetMuscles: string;
}

export interface ExerciseRoutine {
  id: string;
  dayOfWeek: number;
  dayName: string;
  type: 'fuerte' | 'suave';
  title: string;
  durationMinutes: number;
  focus: string;
  description: string;
  benefitsForPrediabetes: string;
  warmup: string[];
  exercises: ExerciseStep[];
  cooldown: string[];
  hipPrecautionsMauricio: string;
  annyRecommendation: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  userId: UserId;
  desayunoCompleted: boolean;
  almuerzoCompleted: boolean;
  cenaCompleted: boolean;
  snackCompleted: boolean;
  exerciseCompleted: boolean;
  waterGlasses: number; // vasos de 250ml
  glucoseFastingMgDl?: number;
  notes?: string;
}

export interface GroceryItem {
  id: string;
  category: 'Proteínas (Mariscos y Carnes)' | 'Verduras y Ensaladas' | 'Frutas Bajo IG' | 'Grasas Buenas y Frutos Secos' | 'Despensa y Condimentos';
  name: string;
  quantityForBothWeekly: string;
  checked: boolean;
}

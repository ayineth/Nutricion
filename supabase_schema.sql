-- =========================================================================
-- ESQUEMA SQL PARA SUPABASE: NUTRI-PREDIABETES (MAURICIO & ANNY)
-- Pega este script completo en el SQL Editor de tu panel de Supabase
-- =========================================================================

-- 1. Tabla de Perfiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- 'mauricio' o 'anny'
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  height_cm NUMERIC NOT NULL,
  weight_kg NUMERIC NOT NULL,
  bmi NUMERIC NOT NULL,
  condition TEXT NOT NULL,
  target_daily_calories INTEGER NOT NULL,
  target_daily_protein INTEGER NOT NULL,
  target_daily_carbs INTEGER NOT NULL,
  target_daily_fat INTEGER NOT NULL,
  target_daily_fiber INTEGER NOT NULL,
  hip_caution BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar perfiles iniciales
INSERT INTO public.profiles (id, name, age, gender, height_cm, weight_kg, bmi, condition, target_daily_calories, target_daily_protein, target_daily_carbs, target_daily_fat, target_daily_fiber, hip_caution, notes)
VALUES
  ('mauricio', 'Mauricio', 27, 'Hombre', 183, 92, 27.5, 'Prevención de Prediabetes / Recomposición Corporal', 1900, 155, 150, 68, 38, true, 'Priorizar protección articular de cadera (sin impacto ni sentadillas con rebote). Déficit moderado.')
ON CONFLICT (id) DO UPDATE SET
  weight_kg = EXCLUDED.weight_kg,
  target_daily_calories = EXCLUDED.target_daily_calories;

INSERT INTO public.profiles (id, name, age, gender, height_cm, weight_kg, bmi, condition, target_daily_calories, target_daily_protein, target_daily_carbs, target_daily_fat, target_daily_fiber, hip_caution, notes)
VALUES
  ('anny', 'Anny', 27, 'Mujer', 154, 52, 21.9, 'Diagnóstico Oficial de Prediabetes (Normopeso)', 1500, 100, 125, 55, 32, false, 'Normopeso metabólicamente vulnerable. Enfoque en tonificación muscular para aumentar reservorios de glucosa.')
ON CONFLICT (id) DO UPDATE SET
  weight_kg = EXCLUDED.weight_kg,
  target_daily_calories = EXCLUDED.target_daily_calories;

-- 2. Tabla de Registro Diario (Tracker de Cumplimiento)
CREATE TABLE IF NOT EXISTS public.daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  desayuno_completed BOOLEAN DEFAULT false,
  almuerzo_completed BOOLEAN DEFAULT false,
  cena_completed BOOLEAN DEFAULT false,
  snack_completed BOOLEAN DEFAULT false,
  exercise_completed BOOLEAN DEFAULT false,
  water_glasses INTEGER DEFAULT 0,
  fasting_glucose NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_date_user UNIQUE (date, user_id)
);

-- 3. Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_daily_logs_date_user ON public.daily_logs(date, user_id);

-- 4. Habilitar Row Level Security (RLS) con políticas públicas permisivas para la app
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica de perfiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Permitir actualizacion publica de perfiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Permitir lectura publica de logs" ON public.daily_logs FOR SELECT USING (true);
CREATE POLICY "Permitir insercion y actualizacion de logs" ON public.daily_logs FOR ALL USING (true);

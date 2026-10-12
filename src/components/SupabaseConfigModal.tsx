'use client';

import React, { useState } from 'react';
import { 
  Database, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { getSupabaseConfig, resetSupabaseClient } from '@/lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const [url, setUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nutri_supabase_url') || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    }
    return '';
  });

  const [anonKey, setAnonKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nutri_supabase_anon_key') || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    }
    return '';
  });

  const [copiedSql, setCopiedSql] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      if (url.trim() && anonKey.trim()) {
        localStorage.setItem('nutri_supabase_url', url.trim());
        localStorage.setItem('nutri_supabase_anon_key', anonKey.trim());
        resetSupabaseClient();
        setStatusMessage('¡Credenciales guardadas y sincronización activada con éxito!');
        onConfigSaved();
      } else {
        localStorage.removeItem('nutri_supabase_url');
        localStorage.removeItem('nutri_supabase_anon_key');
        resetSupabaseClient();
        setStatusMessage('Modo local activado (sin sincronización en la nube).');
        onConfigSaved();
      }
    }
  };

  const sqlScript = `-- 1. TABLA DE PERFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
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

-- 2. TABLA DE LOGS DIARIOS
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

-- 3. PERMISOS PUBLICOS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public All Profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public Read Logs" ON public.daily_logs FOR SELECT USING (true);
CREATE POLICY "Public All Logs" ON public.daily_logs FOR ALL USING (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Conectar con Supabase
              </h3>
              <p className="text-xs text-slate-500">
                Sincronización en la nube entre dispositivos y base de datos
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
          {/* Instrucciones 1-2-3 */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2 text-emerald-950">
            <span className="font-bold block text-sm">Pasos rápidos:</span>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-emerald-900">
              <li>
                Crea un proyecto gratis en{' '}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline inline-flex items-center gap-0.5 text-emerald-800"
                >
                  supabase.com <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                Copia el script SQL de abajo y pégalo en <strong>SQL Editor</strong> dentro de tu panel de Supabase.
              </li>
              <li>
                Pega tu <strong>Project URL</strong> y tu <strong>Anon Public Key</strong> en los campos inferiores.
              </li>
            </ol>
          </div>

          {/* Botón para copiar SQL */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Esquema SQL listo</span>
              <span className="text-[11px] text-slate-500">Tablas para perfiles y registros de calendario</span>
            </div>
            <button
              onClick={handleCopySql}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                copiedSql
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar SQL
                </>
              )}
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Supabase URL (NEXT_PUBLIC_SUPABASE_URL)
              </label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Supabase Anon Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-emerald-100/70 border border-emerald-300 text-emerald-900 rounded-xl font-medium">
              {statusMessage}
            </div>
          )}

          {/* Nota sobre funcionamiento sin claves */}
          <div className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            💡 <strong>Nota:</strong> La app funciona al 100% en modo local de forma inmediata guardando todo en tu dispositivo. Puedes conectar Supabase en cualquier momento para sincronizar entre el móvil y la laptop.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

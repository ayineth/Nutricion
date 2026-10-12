import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Permitir cargar desde variables de entorno o desde localStorage para configuración rápida en UI
export const getSupabaseConfig = () => {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('nutri_supabase_url');
    const localKey = localStorage.getItem('nutri_supabase_anon_key');
    if (localUrl && localKey) {
      return { url: localUrl, anonKey: localKey, isConfigured: true };
    }
  }

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && envUrl.startsWith('https://')) {
    return { url: envUrl, anonKey: envKey, isConfigured: true };
  }

  return { url: '', anonKey: '', isConfigured: false };
};

let clientInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  if (!clientInstance) {
    try {
      clientInstance = createClient(url, anonKey);
    } catch (e) {
      console.warn('Error al inicializar cliente Supabase:', e);
      return null;
    }
  }
  return clientInstance;
};

export const resetSupabaseClient = () => {
  clientInstance = null;
};

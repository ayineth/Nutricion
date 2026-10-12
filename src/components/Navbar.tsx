'use client';

import React from 'react';
import { UserId } from '@/types';
import { PROFILES } from '@/data/profiles';
import { 
  Flame, 
  Database, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  ShieldCheck, 
  HeartPulse 
} from 'lucide-react';

interface NavbarProps {
  activeUser: UserId;
  onSelectUser: (user: UserId) => void;
  streak: number;
  isSupabaseConnected: boolean;
  onOpenSupabaseConfig: () => void;
  onOpenGlucoseGuide: () => void;
  onOpenGroceries: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeUser,
  onSelectUser,
  streak,
  isSupabaseConnected,
  onOpenSupabaseConfig,
  onOpenGlucoseGuide,
  onOpenGroceries,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight flex items-center gap-1.5">
                NutriPlan Pareja
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Anti-Prediabetes
                </span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Nutrición a medida para Mauricio & Anny
              </p>
            </div>
          </div>

          {/* Racha Móvil */}
          <div className="flex md:hidden items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-amber-700 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{streak} días</span>
          </div>
        </div>

        {/* Selector de Perfil (Mauricio vs Anny) */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 w-full sm:w-auto justify-center">
          <button
            onClick={() => onSelectUser('mauricio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeUser === 'mauricio'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            Mauricio
            <span className="text-[10px] opacity-75 font-normal">(92 kg • Cadera)</span>
          </button>

          <button
            onClick={() => onSelectUser('anny')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeUser === 'anny'
                ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
            Anny
            <span className="text-[10px] opacity-75 font-normal">(52 kg • Glucemia)</span>
          </button>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Racha Desktop */}
          <div className="hidden md:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-amber-700 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{streak} días de racha</span>
          </div>

          {/* Guía Anti-Glucosa */}
          <button
            onClick={onOpenGlucoseGuide}
            title="Guía Clínica Anti-Picos de Glucosa"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden lg:inline">Tips Clínicos</span>
          </button>

          {/* Lista del Súper */}
          <button
            onClick={onOpenGroceries}
            title="Lista de Compras del Súper"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden lg:inline">Súper</span>
          </button>

          {/* Estado de Supabase */}
          <button
            onClick={onOpenSupabaseConfig}
            title="Configurar conexión con Supabase"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isSupabaseConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isSupabaseConnected ? 'Supabase Activo' : 'Conectar Supabase'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

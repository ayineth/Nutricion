'use client';

import React from 'react';
import { UserProfile } from '@/types';
import { 
  Activity, 
  AlertCircle, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface ProfileSummaryProps {
  profile: UserProfile;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profile }) => {
  const isMauricio = profile.id === 'mauricio';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 mb-6 overflow-hidden relative">
      {/* Decorative gradient corner */}
      <div 
        className={`absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-10 blur-2xl ${
          isMauricio ? 'bg-blue-600' : 'bg-emerald-600'
        }`}
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Bio & Condition */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div 
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md ${
                isMauricio ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/20' : 'bg-gradient-to-tr from-teal-600 to-emerald-600 shadow-teal-500/20'
              }`}
            >
              {profile.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {profile.age} años • {profile.heightCm} cm • {profile.weightKg} kg
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  IMC: {profile.bmi}
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-4 h-4" />
                {profile.condition}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            {profile.notes}
          </p>

          {profile.hipCaution && (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-xl text-xs font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Precaución de Cadera Activada:</strong> Rutinas adaptadas sin impacto, sin sentadillas profundas con rebote y con fortalecimiento de glúteo medio.
              </span>
            </div>
          )}

          {!profile.hipCaution && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-medium">
              <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Objetivo Reversible:</strong> Tu peso es saludable ({profile.weightKg} kg). No reduzcas calorías en exceso; el músculo activo absorberá la glucosa naturalmente.
              </span>
            </div>
          )}
        </div>

        {/* Right: Target Nutrition Macro Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full lg:w-auto">
          {/* Calorías */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-[11px] font-medium mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Calorías
            </div>
            <div className="text-base font-extrabold text-slate-800">
              {profile.targetDailyCalories}
            </div>
            <div className="text-[10px] text-slate-400">kcal/día</div>
          </div>

          {/* Proteína */}
          <div className="bg-blue-50/60 border border-blue-200/60 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 text-[11px] font-medium mb-1">
              <Beef className="w-3.5 h-3.5" />
              Proteína
            </div>
            <div className="text-base font-extrabold text-blue-800">
              {profile.targetDailyProtein}g
            </div>
            <div className="text-[10px] text-blue-500">Músculo & Saciante</div>
          </div>

          {/* Carbos */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 text-[11px] font-medium mb-1">
              <Wheat className="w-3.5 h-3.5" />
              Carbos
            </div>
            <div className="text-base font-extrabold text-amber-800">
              {profile.targetDailyCarbs}g
            </div>
            <div className="text-[10px] text-amber-500">Bajo Índice Gluc.</div>
          </div>

          {/* Grasas */}
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-[11px] font-medium mb-1">
              <Droplet className="w-3.5 h-3.5" />
              Grasas
            </div>
            <div className="text-base font-extrabold text-emerald-800">
              {profile.targetDailyFat}g
            </div>
            <div className="text-[10px] text-emerald-500">Omega-3 & AOVE</div>
          </div>

          {/* Fibra */}
          <div className="bg-purple-50/60 border border-purple-200/60 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-1 text-purple-600 text-[11px] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Fibra
            </div>
            <div className="text-base font-extrabold text-purple-800">
              {profile.targetDailyFiber}g+
            </div>
            <div className="text-[10px] text-purple-500">Freno a la Glucosa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

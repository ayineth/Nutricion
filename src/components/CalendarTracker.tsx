'use client';

import React, { useState } from 'react';
import { DailyLog, UserId } from '@/types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Droplet, 
  Activity, 
  Flame,
  Award
} from 'lucide-react';

interface CalendarTrackerProps {
  currentDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  allLogs: Record<string, DailyLog>;
  activeUser: UserId;
  activeLog: DailyLog;
  onUpdateLog: (updated: Partial<DailyLog>) => void;
}

export const CalendarTracker: React.FC<CalendarTrackerProps> = ({
  currentDate,
  onSelectDate,
  allLogs,
  activeUser,
  activeLog,
  onUpdateLog,
}) => {
  const [viewDate, setViewDate] = useState(() => new Date(currentDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Días del mes
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const daysArray: (number | null)[] = [];
  // Rellenar días en blanco para alinear con Lunes (índice 1)
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  for (let i = 0; i < offset; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const getDayStatus = (dayNum: number) => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(dayNum).padStart(2, '0');
    const dateKey = `${year}-${monthStr}-${dayStr}_${activeUser}`;
    const log = allLogs[dateKey];

    if (!log) return 'none';

    const mealsCount = [log.desayunoCompleted, log.almuerzoCompleted, log.cenaCompleted].filter(Boolean).length;
    if (mealsCount === 3 && log.exerciseCompleted) return 'perfect';
    if (mealsCount === 3) return 'full-meals';
    if (mealsCount > 0 || log.exerciseCompleted) return 'partial';
    return 'none';
  };

  const handleWaterAdd = () => {
    onUpdateLog({ waterGlasses: Math.min((activeLog.waterGlasses || 0) + 1, 12) });
  };

  const handleWaterSub = () => {
    onUpdateLog({ waterGlasses: Math.max((activeLog.waterGlasses || 0) - 1, 0) });
  };

  const glucoseValue = activeLog.glucoseFastingMgDl;
  const getGlucoseStatus = (val?: number) => {
    if (!val) return null;
    if (val < 100) return { label: 'Óptima (<100 mg/dL)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val <= 125) return { label: 'Rango Prediabetes (100-125 mg/dL)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Atención Elevada (>126 mg/dL)', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const glucoseStatus = getGlucoseStatus(glucoseValue);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-600" />
            Calendario de Cumplimiento & Registro Clínico
          </h3>
          <p className="text-xs text-slate-500">
            Monitorea el cumplimiento de tus comidas, rutinas y glucemia día a día
          </p>
        </div>

        {/* Controles de Mes */}
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 px-2 min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid del Calendario */}
      <div>
        {/* Nombres de días */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 mb-2">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mié</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sáb</span>
          <span>Dom</span>
        </div>

        {/* Días */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysArray.map((dayNum, idx) => {
            if (dayNum === null) {
              return <div key={`empty-${idx}`} className="h-12 sm:h-14 rounded-xl opacity-0" />;
            }

            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(dayNum).padStart(2, '0');
            const thisDateStr = `${year}-${monthStr}-${dayStr}`;
            const isSelected = thisDateStr === currentDate;
            const status = getDayStatus(dayNum);

            let statusBg = 'bg-slate-50 text-slate-700 hover:bg-slate-100';
            let dot = null;

            if (status === 'perfect') {
              statusBg = 'bg-emerald-100/70 text-emerald-900 border-emerald-300';
              dot = <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>;
            } else if (status === 'full-meals') {
              statusBg = 'bg-teal-50 text-teal-800 border-teal-200';
              dot = <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>;
            } else if (status === 'partial') {
              statusBg = 'bg-amber-50 text-amber-800 border-amber-200';
              dot = <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>;
            }

            return (
              <button
                key={dayNum}
                onClick={() => onSelectDate(thisDateStr)}
                className={`h-12 sm:h-14 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all relative ${statusBg} ${
                  isSelected ? 'ring-2 ring-emerald-600 font-bold border-transparent shadow-sm' : 'border-slate-200/70'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{dayNum}</span>
                <div className="flex items-center gap-1">
                  {dot}
                </div>
              </button>
            );
          })}
        </div>

        {/* Leyenda del Calendario */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>100% Comidas + Ejercicio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-400"></span>
            <span>3 Comidas Cumplidas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span>Parcial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300"></span>
            <span>Pendiente</span>
          </div>
        </div>
      </div>

      {/* Registro Adicional del Día Seleccionado (Agua + Glucosa en Ayunas) */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Detalle del Día Seleccionado ({currentDate})
          </span>
          <span className="text-xs text-emerald-700 font-semibold">
            Usuario: {activeUser === 'mauricio' ? 'Mauricio' : 'Anny'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tracker de Agua */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-500 fill-blue-500" />
                Hidratación (Vasos de 250ml)
              </span>
              <span className="text-xs font-bold text-blue-700">
                {activeLog.waterGlasses || 0} / 8 vasos ({((activeLog.waterGlasses || 0) * 0.25).toFixed(1)} L)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{ width: `${Math.min(((activeLog.waterGlasses || 0) / 8) * 100, 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleWaterSub}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  -
                </button>
                <button
                  onClick={handleWaterAdd}
                  className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              El agua ayuda a los riñones a excretar el exceso de glucosa en sangre.
            </p>
          </div>

          {/* Registro de Glucemia en Ayunas (Opcional) */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-500" />
                Glucosa en Ayunas (Opcional)
              </span>
              {glucoseStatus && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${glucoseStatus.color}`}>
                  {glucoseStatus.label}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="ej. 98"
                value={activeLog.glucoseFastingMgDl || ''}
                onChange={(e) => onUpdateLog({ glucoseFastingMgDl: e.target.value ? Number(e.target.value) : undefined })}
                className="w-28 px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-500 font-medium">mg/dL</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Registra si te realizas una medición matutina con glucómetro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { 
  BookOpen, 
  X, 
  Layers, 
  Footprints, 
  Dumbbell, 
  ShieldCheck, 
  Flame, 
  HeartHandshake 
} from 'lucide-react';

interface GlucoseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlucoseGuideModal: React.FC<GlucoseGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Guía Clínica: Cómo Revertir la Prediabetes
              </h3>
              <p className="text-xs text-slate-600">
                Los 5 pilares científicos adaptados para Mauricio & Anny
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-700 text-xs sm:text-sm">
          {/* Pilar 1: El Orden de los Alimentos */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              1. El Orden de Ingesta (El "Hack" Metabólico #1)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              En cada comida, come siempre en este orden estricto:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                1° Fibra / Ensalada
              </div>
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800 border border-blue-200">
                2° Proteínas y Grasas
              </div>
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
                3° Carbohidratos
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic pt-1">
              *La fibra crea una malla gelatinosa en el intestino delgado que ralentiza el paso de la glucosa hacia la sangre hasta en un 40-60%.
            </p>
          </div>

          {/* Pilar 2: Caminata Post-Prandial */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Footprints className="w-4 h-4 text-emerald-600" />
              2. Caminar 10-15 Minutos Después de Comer
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cuando caminan juntos después del almuerzo o la cena, los músculos sóleos de las pantorrillas y los cuádriceps absorben la glucosa en circulación mediante contracción muscular directa (transportadores GLUT4) <strong>sin necesidad de exigirle al páncreas secretar más insulina</strong>.
            </p>
          </div>

          {/* Pilar 3: Anny y el mito del peso */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
            <h4 className="font-bold text-teal-950 flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              3. Para Anny: Prediabetes en Normopeso (52 kg)
            </h4>
            <p className="text-xs text-teal-900 leading-relaxed">
              Tener prediabetes sin sobrepeso significa que el cuerpo necesita <strong>más masa muscular metabólicamente activa</strong>, no comer menos. Una dieta restrictiva te haría perder masa magra y empeoraría la sensibilidad a la insulina. Tu meta es entrenar fuerza con los ejercicios asignados y consumir tu meta de ~100g de proteína al día.
            </p>
          </div>

          {/* Pilar 4: Mauricio y la protección de cadera */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-2 text-sm">
              <Dumbbell className="w-4 h-4 text-amber-700" />
              4. Para Mauricio: Cadera Segura y Recomposición
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              El dolor en la unión del fémur con la pelvis se agrava con impactos o flexión forzada. Por eso tu plan reemplaza saltos y sentadillas profundas por <strong>box squats (sentadilla a silla), fortalecimiento de glúteo medio acostado y tren superior</strong>. Cada gramo de músculo que ganes te ayudará a reducir grasa visceral y protegerá la articulación.
            </p>
          </div>

          {/* Pilar 5: Vinagre de Manzana y Agua */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              5. Sinergia de Pareja: Cocinar Juntos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ambos disfrutan del salmón, camarones, pollo y cerdo. Cocinen la misma base proteica y vegetal; la única diferencia será la porción en el plato (Mauricio porciones más generosas para sus 1.83m y Anny ajustadas a su gasto calórico).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

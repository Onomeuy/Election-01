import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#D4AF37] shrink-0" />,
  };

  const borderStyles = {
    success: 'border-emerald-500/50 text-white',
    error: 'border-red-500/50 text-white',
    info: 'border-[#D4AF37]/50 text-white',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-2xl border bg-[#0F1E33] shadow-2xl flex items-start gap-3 ${borderStyles[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 text-xs font-medium leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
};

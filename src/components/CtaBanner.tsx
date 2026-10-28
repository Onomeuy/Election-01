import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Wallet } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const { branding } = useApp();

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#0B1726] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#243B53]/80">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1726] via-[#102A43] to-[#162C46] opacity-95"></div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          STAND WITH TEXAS
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Support The Ken Paxton Initiative Today
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
          Your contribution enables civic advocacy, defense of constitutional principles, and long-term economic stewardship.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={scrollToCalculator}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C5221F] hover:bg-[#A51D1A] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
          >
            <Wallet className="w-5 h-5 text-white" />
            <span>Contribute with Crypto</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="text-[11px] text-gray-400">
          Official Initiative Website • Multi-Currency Crypto Gateway
        </div>
      </div>
    </div>
  );
};

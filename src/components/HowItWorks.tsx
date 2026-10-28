import React from 'react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { branding } = useApp();

  const steps = [
    {
      num: '1',
      title: 'Choose Amount',
      desc: 'Select an eligible contribution between $500 and $10,000, or enter a custom amount.',
    },
    {
      num: '2',
      title: 'Review 8× Projection',
      desc: `View your projected total calculated with the ${branding.multiplier || 8}× multiplier.`,
    },
    {
      num: '3',
      title: 'Send Cryptocurrency',
      desc: 'Transfer directly to our official wallet address (BTC, ETH, USDT, SOL) and receive your verified receipt.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#0B1726] border-b border-[#243B53]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
            Simple 3-Step Process
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            How to Donate
          </h2>
        </div>

        {/* Short Numbered List */}
        <div className="space-y-3">
          {steps.map((item) => (
            <div 
              key={item.num}
              className="bg-[#0F1E33] border border-[#243B53] rounded-xl p-4 sm:p-5 flex items-center gap-4 hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-[#0B1726] font-heading font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                    {item.title}
                  </h3>
                  <span className="hidden sm:inline text-gray-500">—</span>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

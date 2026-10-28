import React from 'react';
import { Star, TrendingUp, Shield, Landmark } from 'lucide-react';

export const FourPillars: React.FC = () => {
  const pillars = [
    {
      icon: Star,
      title: 'Conservative Values',
      subtitle: 'Protecting what matters.',
    },
    {
      icon: TrendingUp,
      title: 'Economic Growth',
      subtitle: 'More opportunity for all.',
    },
    {
      icon: Shield,
      title: 'Safer Communities',
      subtitle: 'Stronger, safer neighborhoods.',
    },
    {
      icon: Landmark,
      title: 'Accountable Governance',
      subtitle: 'Transparency and results.',
    },
  ];

  return (
    <div className="bg-[#0F1E33] border-b border-[#243B53]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#13253A] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#162C46] border border-[#243B53] flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

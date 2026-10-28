import React from 'react';
import { Shield, TrendingUp, BookOpen, Landmark, ChevronRight } from 'lucide-react';

export const KeyIssues: React.FC = () => {
  const issues = [
    {
      icon: Shield,
      title: 'Border Security',
      description: 'Protecting our communities and constitutional sovereignty through decisive state-level enforcement.',
      badge: 'State Sovereignty',
    },
    {
      icon: TrendingUp,
      title: 'Economic Freedom',
      description: 'Lower taxes, fewer regulatory burdens, robust job creation, and fostering entrepreneurship across Texas.',
      badge: 'Fiscal Growth',
    },
    {
      icon: BookOpen,
      title: 'Educational Excellence',
      description: 'Empowering parents, investing in rigorous curriculum standards, and ensuring brighter futures for youth.',
      badge: 'Parental Rights',
    },
    {
      icon: Landmark,
      title: 'Government Accountability',
      description: 'Eliminating wasteful bureaucracy, restoring civic transparency, and strict accountability for public funds.',
      badge: 'Integrity',
    },
  ];

  return (
    <section className="py-20 bg-[#0F1E33] border-b border-[#243B53]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              Our Core Commitments
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Building a Stronger, Resilient Texas
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-gray-300 max-w-md">
            Our initiative channels resources and policy advocacy into key pillars that preserve Texas prosperity and individual liberties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {issues.map((issue, idx) => {
            const Icon = issue.icon;
            return (
              <div
                key={idx}
                className="bg-[#13253A] rounded-3xl p-6 border border-[#243B53] shadow-lg hover:border-gray-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1726] border border-[#243B53] text-[#D4AF37] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0B1726] border border-[#243B53] text-[#D4AF37] px-2 py-1 rounded-md">
                      {issue.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {issue.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {issue.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#243B53] flex items-center justify-between text-xs font-bold text-gray-300">
                  <span>Explore Initiative</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

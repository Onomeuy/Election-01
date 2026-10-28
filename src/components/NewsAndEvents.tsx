import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewsAndEvents: React.FC = () => {
  const { navigateTo } = useApp();

  const newsItems = [
    {
      date: 'OCT 15, 2026',
      title: 'Ken Paxton Outlines Vision for Texas Economic Resilience',
      excerpt: 'Comprehensive policy brief on expanding state energy independence, curbing unwarranted intrusion, and safeguarding local job creation.',
      category: 'Policy & Economy',
    },
    {
      date: 'OCT 08, 2026',
      title: 'Statewide Tour Connects with Community & Business Leaders',
      excerpt: 'Initiative delegates engage with regional stakeholders to address infrastructure resilience and constitutional legal defense.',
      category: 'Civic Outreach',
    },
    {
      date: 'OCT 01, 2026',
      title: 'Advancing Legal Protections for Texas Border Communities',
      excerpt: 'Detailed review of collaborative initiatives supporting state law enforcement agencies and frontline emergency personnel.',
      category: 'Public Safety',
    },
  ];

  const upcomingEvents = [
    {
      month: 'OCT',
      day: '30',
      title: 'Initiative Civic Assembly',
      city: 'Austin, TX',
      time: '6:00 PM – 8:00 PM CST',
    },
    {
      month: 'NOV',
      day: '02',
      title: 'Fiscal Policy Town Hall',
      city: 'San Antonio, TX',
      time: '5:30 PM – 7:30 PM CST',
    },
    {
      month: 'NOV',
      day: '09',
      title: 'Community Leadership Forum',
      city: 'Houston, TX',
      time: '4:00 PM – 6:00 PM CST',
    },
  ];

  return (
    <section className="py-20 bg-[#0B1726] border-b border-[#243B53]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Latest Updates Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                Latest Announcements
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">
                Stay Informed
              </h2>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-3 sm:mt-0 text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              Support Future Initiatives <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#13253A] rounded-3xl p-6 border border-[#243B53] hover:border-gray-500 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mb-3">
                    <span>{item.date}</span>
                    <span className="bg-[#0B1726] px-2 py-0.5 rounded-sm border border-[#243B53] text-[#D4AF37]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#243B53] flex items-center text-xs font-bold text-[#D4AF37]">
                  <span>Read Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
              Events & Summits
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Join the Movement
            </h2>
            <p className="text-xs text-gray-300 mt-2">
              Be a part of the statewide initiative. Meet leaders and attend civic sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, idx) => (
              <div
                key={idx}
                className="bg-[#13253A] rounded-2xl p-5 border border-[#243B53] shadow-md hover:border-gray-500 transition-all flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#C5221F] text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{ev.month}</span>
                  <span className="text-xl font-heading font-black leading-none">{ev.day}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base font-bold text-white truncate">
                    {ev.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{ev.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{ev.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

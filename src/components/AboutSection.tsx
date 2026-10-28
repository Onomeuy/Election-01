import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  FileCheck, 
  Scale, 
  Edit3
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { branding, user, navigateTo } = useApp();

  return (
    <section id="about" className="py-20 bg-[#0B1726] border-b border-[#243B53]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            About the Program
          </div>
          {user?.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="text-xs font-bold text-[#D4AF37] hover:text-[#B59226] bg-[#13253A] border border-[#243B53] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Initiative Copy in Admin Console
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Credibility Panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#243B53] bg-[#102A43]">
              <img
                src="/assets/aistudio/IMG-20261028-WA0000_51010816.jpg"
                alt="Ken Paxton Initiative Texas Portrait"
                className="w-full h-auto object-cover object-top max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1726] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  OFFICIAL CIVIC INITIATIVE
                </div>
                <h4 className="font-heading text-2xl font-bold">
                  {branding.websiteName}
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Constitutional Principles & Proven Texas Leadership
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-[#13253A] p-4 rounded-2xl border border-[#243B53]">
                <div className="text-xs text-gray-400 font-semibold uppercase">Jurisdiction</div>
                <div className="text-sm font-bold text-white mt-0.5">State of Texas</div>
              </div>
              <div className="bg-[#13253A] p-4 rounded-2xl border border-[#243B53]">
                <div className="text-xs text-gray-400 font-semibold uppercase">Payment Gateway</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Cryptocurrency Supported</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
              {branding.aboutHeading}
            </h2>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              {branding.aboutParagraph1}
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {branding.aboutParagraph2}
            </p>

            {/* Commitments */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#13253A] border border-[#243B53]">
                <div className="w-9 h-9 rounded-xl bg-[#0B1726] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#243B53]">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Constitutional Governance</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Operating to champion limited government, individual liberty, and fiscal stewardship.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#13253A] border border-[#243B53]">
                <div className="w-9 h-9 rounded-xl bg-[#0B1726] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#243B53]">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Digital On-Chain Records</h4>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Every transaction generates an immutable receipt reference for contributor verification and record-keeping.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('calculator');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Support the Initiative</span>
                <ArrowRight className="w-4 h-4 text-[#0B1726]" />
              </button>

              <button
                onClick={() => navigateTo('terms')}
                className="px-5 py-3 rounded-xl border border-[#243B53] text-xs font-semibold text-gray-300 hover:text-white hover:border-gray-400 transition-all bg-[#13253A]"
              >
                Program Guidelines
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

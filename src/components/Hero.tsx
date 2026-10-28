import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  TrendingUp, 
  Calculator as CalcIcon, 
  CheckCircle2,
  Wallet
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    branding, 
    selectedAmount, 
    setSelectedAmount, 
    contributionType, 
    setContributionType, 
    calculateProjection, 
    setPendingReviewData,
    navigateTo 
  } = useApp();

  const [customInput, setCustomInput] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const amounts = [500, 1000, 2500, 5000, 7500, 10000];
  const { total, gain } = calculateProjection(selectedAmount);

  const handleSelectAmount = (amt: number) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomInput('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 100) {
      setIsCustom(true);
      setSelectedAmount(num);
    }
  };

  const handleContinue = () => {
    setPendingReviewData({
      fullName: '',
      email: '',
      country: 'United States',
      phone: '',
    });
    navigateTo('review');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0B1726] text-white overflow-hidden border-b border-[#243B53]/60">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1726] via-[#0F1E33] to-[#162C46] opacity-95"></div>
      
      {/* Subtle star decorative accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C5221F]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Mission Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              A STRONGER TEXAS • CRYPTO DONATION PORTAL
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {branding.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal max-w-2xl leading-relaxed">
              {branding.heroSubtext}
            </p>

            {/* Featured Photograph of Ken Paxton in First Section */}
            <div className="relative rounded-2xl overflow-hidden border border-[#243B53] shadow-2xl group max-w-xl bg-[#0F1E33]">
              <img
                src="/assets/aistudio/IMG_20261028_005235_247_52da4c27.jpg"
                alt="Ken Paxton speaking to Texas supporters"
                className="w-full h-56 sm:h-64 object-cover object-top transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1726] via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  <span className="font-heading font-bold text-white text-sm">
                    Ken Paxton
                  </span>
                  <span className="text-gray-300 text-xs hidden sm:inline">• Proven Texas Leadership</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#102A43] border border-[#243B53] text-[#D4AF37]">
                  Statewide Initiative
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('calculator')}
                className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-2"
              >
                <CalcIcon className="w-4 h-4 text-[#0B1726]" />
                Calculate Contribution (8×)
              </button>
              
              <button
                onClick={() => scrollToSection('about')}
                className="px-6 py-3.5 rounded-xl bg-[#13253A] hover:bg-[#1A365D] border border-[#243B53] text-white font-medium text-sm transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Credibility Badges */}
            <div className="pt-6 border-t border-[#243B53]/60 grid grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>8× Multiplier</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Crypto Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Verified Receipts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Contribution Card in Dark Slate (Eliminating harsh white glare) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl shadow-2xl p-6 sm:p-7 border border-[#243B53] relative">
              
              {/* Header inside card */}
              <div className="border-b border-[#243B53] pb-4 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  OFFICIAL INITIATIVE PORTAL
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mt-0.5">
                  Support the Initiative
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Select your contribution amount to preview your 8× projection.
                </p>
              </div>

              {/* Amount Selection Grid */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Select Contribution Amount:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {amounts.map((amt) => {
                    const isSelected = selectedAmount === amt && !isCustom;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleSelectAmount(amt)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-bold transition-all text-center border ${
                          isSelected
                            ? 'bg-[#102A43] text-white border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                            : 'bg-[#13253A] text-gray-200 border-[#243B53] hover:border-[#D4AF37]/50 hover:bg-[#1A365D]'
                        }`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-semibold text-sm">
                    $
                  </div>
                  <input
                    type="text"
                    placeholder="Enter custom amount (e.g. 15000)"
                    value={customInput}
                    onChange={handleCustomChange}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl text-xs font-medium text-white placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Dynamic 8× Multiplier Projection Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-[#13253A] border border-[#243B53] text-white space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                    Projected Total ({branding.multiplier || 8}×):
                  </span>
                  <span className="font-heading font-bold text-base text-[#D4AF37]">
                    ${total.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-300 border-t border-[#243B53] pt-2">
                  <span>Projected Gain:</span>
                  <span className="font-bold text-emerald-400">
                    +${gain.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Contribution Frequency Toggle */}
              <div className="mt-4 pt-3 border-t border-[#243B53]">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Contribution Type:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <label 
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      contributionType === 'one-time'
                        ? 'border-[#D4AF37] bg-[#13253A] text-white font-semibold'
                        : 'border-[#243B53] text-gray-400 hover:bg-[#13253A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contributionTypeHero"
                      checked={contributionType === 'one-time'}
                      onChange={() => setContributionType('one-time')}
                      className="accent-[#D4AF37]"
                    />
                    <span>One-time transfer</span>
                  </label>

                  <label 
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      contributionType === 'recurring'
                        ? 'border-[#D4AF37] bg-[#13253A] text-white font-semibold'
                        : 'border-[#243B53] text-gray-400 hover:bg-[#13253A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contributionTypeHero"
                      checked={contributionType === 'recurring'}
                      onChange={() => setContributionType('recurring')}
                      className="accent-[#D4AF37]"
                    />
                    <span>Recurring monthly</span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C5221F] hover:bg-[#A51D1A] text-white font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Continue with Crypto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

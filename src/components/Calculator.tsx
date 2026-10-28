import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator as CalculatorIcon, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Sliders, 
  Sparkles,
  Wallet
} from 'lucide-react';

export const Calculator: React.FC = () => {
  const { 
    selectedAmount, 
    setSelectedAmount, 
    branding, 
    calculateProjection, 
    navigateTo,
    setPendingReviewData,
    openModal 
  } = useApp();

  const standardAmounts = [500, 1000, 2500, 5000, 7500, 10000];
  const [customVal, setCustomVal] = useState<string>('');
  const [sliderVal, setSliderVal] = useState<number>(selectedAmount);

  const multiplier = branding.multiplier || 8;
  const { total, gain } = calculateProjection(selectedAmount);

  const handleCardSelect = (amt: number) => {
    setSelectedAmount(amt);
    setSliderVal(amt);
    setCustomVal('');
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderVal(val);
    setSelectedAmount(val);
    setCustomVal('');
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = e.target.value.replace(/[^0-9]/g, '');
    setCustomVal(numeric);
    const parsed = parseInt(numeric, 10);
    if (!isNaN(parsed) && parsed >= 100) {
      setSelectedAmount(parsed);
      setSliderVal(Math.min(Math.max(parsed, 500), 10000));
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

  return (
    <section id="calculator" className="py-20 bg-[#0F1E33] border-b border-[#243B53]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
            <CalculatorIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            Contribution Calculator
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Calculate Your Contribution
          </h2>
          <p className="mt-4 text-gray-300 text-base leading-relaxed">
            Select an eligible tier between $500 and $10,000 or enter a custom amount to preview your {multiplier}× projected total.
          </p>
        </div>

        {/* Selectable Contribution Options Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Selectable Contribution Tiers:
            </h3>
            <span className="text-xs text-[#D4AF37] font-semibold">Tier Range: $500 – $10,000</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {standardAmounts.map((amt) => {
              const isSelected = selectedAmount === amt && !customVal;
              const cardTotal = amt * multiplier;
              const cardGain = cardTotal - amt;

              return (
                <div
                  key={amt}
                  onClick={() => handleCardSelect(amt)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between relative group ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#102A43] text-white shadow-xl scale-103 ring-2 ring-[#D4AF37]/50'
                      : 'border-[#243B53] bg-[#13253A] text-gray-200 hover:border-gray-500 hover:bg-[#1A365D] shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 right-3 bg-[#D4AF37] text-[#0B1726] rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isSelected ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                      Eligible Tier
                    </div>
                    <div className="text-2xl font-heading font-extrabold tracking-tight text-white">
                      ${amt.toLocaleString()}
                    </div>
                    <div className="mt-2 text-[11px] pt-2 border-t border-[#243B53] text-gray-300 space-y-0.5">
                      <div>{multiplier}×: <strong className={isSelected ? 'text-[#D4AF37]' : 'text-white'}>${cardTotal.toLocaleString()}</strong></div>
                      <div className="text-emerald-400 font-semibold">Diff: +${cardGain.toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardSelect(amt);
                    }}
                    className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#0B1726] hover:bg-[#C59F27]'
                        : 'bg-[#0B1726] text-gray-200 border border-[#243B53] hover:border-gray-400'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Amount'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Calculator Box */}
        <div className="bg-[#13253A] border border-[#243B53] rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#D4AF37]" />
                  Fine-Tune Contribution Amount:
                </label>
                <span className="text-xs font-semibold text-[#D4AF37]">
                  Multiplier: {multiplier}×
                </span>
              </div>

              {/* Range Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={sliderVal}
                  onChange={handleSliderChange}
                  className="w-full h-3 bg-[#0B1726] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs font-medium text-gray-400">
                  <span>$500</span>
                  <span>$2,500</span>
                  <span>$5,000</span>
                  <span>$7,500</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Custom Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Or Type Custom Amount (USD):
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37] font-bold text-sm">
                    $
                  </div>
                  <input
                    type="text"
                    value={customVal || selectedAmount.toString()}
                    onChange={handleCustomInput}
                    placeholder="Enter custom dollar amount"
                    className="w-full pl-8 pr-4 py-3 bg-[#0B1726] border border-[#243B53] rounded-xl font-bold text-base text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Formula display */}
              <div className="bg-[#0B1726] p-4 rounded-2xl border border-[#243B53] text-xs text-gray-300 space-y-1.5">
                <div className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Calculation Breakdown:
                </div>
                <div className="font-mono text-[11px] text-gray-300">
                  Projected Total = ${selectedAmount.toLocaleString()} × {multiplier} = ${total.toLocaleString()} USD<br/>
                  Projected Gain = ${total.toLocaleString()} − ${selectedAmount.toLocaleString()} = ${gain.toLocaleString()} USD
                </div>
              </div>

            </div>

            {/* Right Display: 4 Required Metrics */}
            <div className="lg:col-span-6">
              <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#243B53]">
                
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#243B53] pb-4">
                    <span className="text-xs uppercase font-bold tracking-wider text-gray-300">
                      Calculation Outputs
                    </span>
                    <span className="bg-[#D4AF37] text-[#0B1726] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                      {multiplier}× Multiplier
                    </span>
                  </div>

                  {/* 1. Selected Amount */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-300">Selected Contribution Amount:</span>
                    <span className="text-xl sm:text-2xl font-bold font-heading text-white">
                      ${selectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* 2. Projected Multiplier */}
                  <div className="flex items-center justify-between py-1 border-t border-[#243B53] pt-3">
                    <span className="text-sm text-gray-300">Projected Multiplier:</span>
                    <span className="inline-flex items-center gap-1 text-base font-extrabold text-[#D4AF37] bg-[#0B1726] px-3 py-1 rounded-xl border border-[#243B53]">
                      <TrendingUp className="w-4 h-4" />
                      {multiplier}× Multiplier
                    </span>
                  </div>

                  {/* 3. Projected Total */}
                  <div className="flex items-center justify-between py-1 border-t border-[#243B53] pt-3">
                    <div>
                      <span className="text-sm font-semibold text-white block">Projected Total:</span>
                      <span className="text-[11px] text-gray-400">Formula: Amount × {multiplier}</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#D4AF37]">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* 4. Projected Gain */}
                  <div className="flex items-center justify-between py-1 border-t border-[#243B53] pt-3">
                    <div>
                      <span className="text-sm font-semibold text-white block">Projected Gain (Difference):</span>
                      <span className="text-[11px] text-gray-400">Projected Total − Initial</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold font-heading text-emerald-400">
                      +${gain.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-4 border-t border-[#243B53]">
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="w-full py-4 px-6 rounded-2xl bg-[#C5221F] hover:bg-[#A51D1A] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Crypto Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

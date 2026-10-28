import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  TrendingUp, 
  Wallet,
  CheckCircle2
} from 'lucide-react';

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Switzerland',
  'Japan',
  'Singapore',
  'Other',
];

export const ReviewPage: React.FC = () => {
  const { 
    selectedAmount, 
    branding, 
    calculateProjection, 
    contributionType, 
    navigateTo, 
    openModal, 
    pendingReviewData, 
    setPendingReviewData,
    user 
  } = useApp();

  const multiplier = branding.multiplier || 8;
  const { total, gain } = calculateProjection(selectedAmount);

  // Form states
  const [fullName, setFullName] = useState(user?.fullName || pendingReviewData?.fullName || '');
  const [email, setEmail] = useState(user?.email || pendingReviewData?.email || '');
  const [country, setCountry] = useState(user?.country || pendingReviewData?.country || 'United States');
  const [phone, setPhone] = useState(user?.phone || pendingReviewData?.phone || '');

  // Disclosures checkboxes
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.fullName);
      if (!email) setEmail(user.email);
      if (user.country && !country) setCountry(user.country);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user]);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full legal name is required.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Valid email address is required for digital receipts.';
    }
    if (!country) {
      errs.country = 'Please select your country of residence.';
    }
    if (!termsAccepted) {
      errs.terms = 'Please accept the initiative contribution terms.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPendingReviewData({
      fullName: fullName.trim(),
      email: email.trim(),
      country,
      phone: phone.trim(),
    });

    openModal('checkout');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#0B1726] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Calculator / Modify Amount</span>
          </button>

          <span className="text-xs font-semibold text-gray-400">
            Step 2: Contributor Details
          </span>
        </div>

        <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl shadow-2xl border border-[#243B53] overflow-hidden">
          
          {/* Top Banner */}
          <div className="bg-[#102A43] text-white p-6 sm:p-8 border-b border-[#243B53]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  CONTRIBUTION REVIEW
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-1">
                  Confirm Contribution Details
                </h1>
                <p className="text-xs text-gray-300 mt-1">
                  Review your contribution details and continue to cryptocurrency payment.
                </p>
              </div>

              <div className="bg-[#0B1726] px-4 py-2.5 rounded-2xl border border-[#243B53] text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Selected Amount</span>
                <span className="text-2xl font-black font-heading text-[#D4AF37]">
                  ${selectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            
            {/* Breakdown Metrics Card */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Contribution Summary
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#13253A] p-5 rounded-2xl border border-[#243B53]">
                <div>
                  <span className="text-[11px] font-medium text-gray-400 block">Selected Amount:</span>
                  <span className="text-lg font-bold text-white mt-0.5 block">
                    ${selectedAmount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 capitalize">{contributionType}</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-gray-400 block">Multiplier:</span>
                  <span className="text-lg font-bold text-[#D4AF37] mt-0.5 block">
                    {multiplier}×
                  </span>
                  <span className="text-[10px] text-gray-400">Initiative Tier</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-gray-400 block">Projected Total:</span>
                  <span className="text-lg font-bold text-white mt-0.5 block">
                    ${total.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400">Amount × {multiplier}</span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-gray-400 block">Projected Gain:</span>
                  <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                    +${gain.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400">Total − Initial</span>
                </div>
              </div>
            </div>

            {/* Contributor Personal Details Form */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 border-b border-[#243B53] pb-2">
                Contributor Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Katherine Reynolds"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                      errors.fullName ? 'border-red-400' : 'border-[#243B53]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Email Address (For Verified Receipt) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., katherine@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                      errors.email ? 'border-red-400' : 'border-[#243B53]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Country of Residence */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Country of Residence <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                      errors.country ? 'border-red-400' : 'border-[#243B53]'
                    }`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0B1726] text-white">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Optional Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Telephone Number <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

              </div>
            </div>

            {/* Clean Agreement Checkbox without verbose caution blocks */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer bg-[#13253A] p-4 rounded-2xl border border-[#243B53]">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-[#243B53] text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
                />
                <span className="text-xs text-gray-300">
                  I confirm that I am contributing voluntarily using my lawful assets and agree to the program terms.
                </span>
              </label>
              {errors.terms && <p className="text-[11px] text-red-400 mt-1 pl-2">{errors.terms}</p>}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#243B53] flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#243B53] hover:border-gray-400 text-xs font-semibold text-gray-300 transition-colors"
              >
                ← Return to Amount Selector
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C5221F] hover:bg-[#A51D1A] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4 text-white" />
                <span>Proceed to Cryptocurrency Payment</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

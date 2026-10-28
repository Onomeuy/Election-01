import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const LegalPages: React.FC = () => {
  const { currentView, navigateTo, branding } = useApp();

  if (!['terms', 'privacy', 'risk-disclosure', 'refund-policy'].includes(currentView)) {
    return null;
  }

  return (
    <div className="py-16 bg-[#0B1726] min-h-[85vh] text-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
        </div>

        <div className="bg-[#0F1E33] rounded-3xl p-8 sm:p-12 border border-[#243B53] shadow-2xl space-y-8 text-xs text-gray-300 leading-relaxed">
          
          {/* Header */}
          <div className="border-b border-[#243B53] pb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
              PROGRAM GUIDELINES
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              {currentView === 'terms' && 'Program Terms and Conditions'}
              {currentView === 'privacy' && 'Privacy Policy & Contributor Data'}
              {currentView === 'risk-disclosure' && '8× Projection Overview'}
              {currentView === 'refund-policy' && 'Contribution Policy'}
            </h1>
            <p className="text-gray-400 mt-1">
              Last Updated: October 2026 • Governing Authority: State of Texas
            </p>
          </div>

          {/* TERMS AND CONDITIONS */}
          {currentView === 'terms' && (
            <div className="space-y-6 text-sm">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">1. Agreement to Terms</h2>
                <p>
                  By accessing the official website of the <strong>{branding.websiteName}</strong> and contributing via cryptocurrency, you agree to be bound by these program terms.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">2. Voluntary Contributions</h2>
                <p>
                  Contributions made through this portal are voluntary financial contributions supporting civic advocacy, legal defense operations, and constitutional governance initiatives.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">3. 8× Multiplier Projection</h2>
                <p>
                  The interactive calculator displays projected calculations generated from the initiative's {branding.multiplier || 8}× formula for informational modeling.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">4. Lawful Funds & Eligibility</h2>
                <p>
                  Contributors must be at least 18 years of age and confirm that all transfers are funded using lawful personal assets.
                </p>
              </section>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {currentView === 'privacy' && (
            <div className="space-y-6 text-sm">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">1. Information We Collect</h2>
                <p>
                  We collect information necessary to register transactions and generate official receipts, including your name, email address, country of residence, and blockchain transaction references.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">2. On-Chain Transaction Privacy</h2>
                <p>
                  Cryptocurrency transfers are registered on public distributed ledgers. We do not store sensitive private keys or seed phrases on our web servers.
                </p>
              </section>
            </div>
          )}

          {/* RISK DISCLOSURE / PROJECTION OVERVIEW */}
          {currentView === 'risk-disclosure' && (
            <div className="space-y-6 text-sm">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">1. Multiplier Projection Overview</h2>
                <p>
                  The {branding.multiplier || 8}× multiplier tool is an interactive calculator designed to calculate projected figures based on user-selected tiers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">2. Initiative Funding</h2>
                <p>
                  Contributions directly support initiative directives and civic outreach programs across Texas.
                </p>
              </section>
            </div>
          )}

          {/* REFUND POLICY */}
          {currentView === 'refund-policy' && (
            <div className="space-y-6 text-sm">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">1. Contribution Finality</h2>
                <p>
                  Due to the irreversible nature of cryptocurrency blockchain transactions and immediate initiative allocation, confirmed cryptocurrency contributions are generally final once confirmed on-chain.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-white">2. Inquiries and Verification</h2>
                <p>
                  For transaction confirmation assistance, contributors may contact our administrative support desk with their unique transaction reference code.
                </p>
              </section>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="pt-6 border-t border-[#243B53] flex justify-between items-center">
            <span className="text-xs text-gray-400">
              Inquiries: contact@kenpaxtoninitiative.com
            </span>
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Back to Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

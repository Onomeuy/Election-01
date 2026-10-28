import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/initialData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useApp();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#0F1E33] border-b border-[#243B53]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            Frequently Asked Questions
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Program Clarity & Details
          </h2>
          <p className="mt-3 text-sm text-gray-300">
            Review key details regarding contribution tiers, the 8× projection, and cryptocurrency transfers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#13253A] rounded-2xl border border-[#243B53] shadow-md overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-hidden hover:bg-[#1A365D]/50"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#0B1726] border border-[#243B53] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-gray-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-[#243B53] bg-[#0F1E33]/60">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center bg-[#13253A] rounded-2xl p-6 border border-[#243B53] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading font-bold text-white text-base">Have more questions?</h4>
            <p className="text-xs text-gray-400 mt-0.5">Our support team is available to assist you.</p>
          </div>
          <button
            onClick={() => openModal('support')}
            className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Contributor Support
          </button>
        </div>

      </div>
    </section>
  );
};

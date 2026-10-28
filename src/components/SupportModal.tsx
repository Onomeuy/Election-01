import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const SupportModal: React.FC = () => {
  const { activeModal, closeModal, submitSupportMessage, user } = useApp();

  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (activeModal !== 'support') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    submitSupportMessage({ name, email, subject, message });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl max-w-lg w-full shadow-2xl border border-[#243B53] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 relative border-b border-[#243B53]">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            <MessageSquare className="w-4 h-4" />
            Initiative Support Desk
          </div>

          <h3 className="font-heading text-xl font-bold text-white mt-1">
            Contact Support
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Submit inquiries regarding your cryptocurrency contribution or receipt documentation.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-white">
              Message Sent
            </h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto">
              Our coordinator team has received your message and will respond to {email} promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Robert Sterling"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. robert@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Crypto TXID confirmation"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details regarding your contribution..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Inquiry</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

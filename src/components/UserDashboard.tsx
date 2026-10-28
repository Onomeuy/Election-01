import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Mail, 
  Phone, 
  Wallet,
  Clock,
  DollarSign
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    user, 
    transactions, 
    branding, 
    openModal, 
    navigateTo, 
    selectedAmount,
    calculateProjection 
  } = useApp();

  const userTxns = transactions.filter(t => 
    user && (t.userId === user.id || t.contributorEmail.toLowerCase() === user.email.toLowerCase())
  );

  const totalGiven = userTxns
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0);

  const { total: simTotal, gain: simGain } = calculateProjection(selectedAmount);

  return (
    <div className="py-12 bg-[#0B1726] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#243B53] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-[#13253A] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                CONTRIBUTOR PORTAL
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold">
                Welcome back, {user ? user.fullName : 'Contributor'}
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
                Review your cryptocurrency contribution records and access official digital receipts.
              </p>
            </div>

            <div className="bg-[#0B1726] p-5 rounded-2xl border border-[#243B53] text-right shrink-0">
              <span className="text-xs uppercase tracking-wider text-gray-400 block">
                Total Lifetime Contributions
              </span>
              <span className="text-3xl font-heading font-black text-[#D4AF37]">
                ${totalGiven.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">
                {userTxns.filter(t => t.status === 'completed').length} Confirmed Settlement(s)
              </span>
            </div>
          </div>
        </div>

        {/* User Profile & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="bg-[#0F1E33] rounded-3xl p-6 border border-[#243B53] shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-[#243B53] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#102A43] border border-[#243B53] text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                {user?.fullName?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  {user?.fullName || 'Contributor'}
                </h3>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex justify-between py-1 border-b border-[#243B53]/50">
                <span className="text-gray-400">Account Role:</span>
                <span className="font-bold text-[#D4AF37] capitalize">{user?.role || 'Contributor'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#243B53]/50">
                <span className="text-gray-400">Country:</span>
                <span className="font-bold text-white">{user?.country || 'United States'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#243B53]/50">
                <span className="text-gray-400">Email Status:</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Member Since:</span>
                <span className="text-gray-300">
                  {user ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* 8x Projection Card */}
          <div className="bg-[#0F1E33] rounded-3xl p-6 border border-[#243B53] shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#243B53] pb-3">
              <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                Projected 8× Calculation
              </h3>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase">
                {branding.multiplier}× Multiplier
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Calculates your projected return based on your selected contribution amount.
            </p>

            <div className="bg-[#13253A] p-3.5 rounded-xl border border-[#243B53] text-xs space-y-1.5">
              <div className="flex justify-between text-gray-300">
                <span>Selected Tier:</span>
                <strong className="text-white">${selectedAmount.toLocaleString()} USD</strong>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Projected 8× Total:</span>
                <strong className="text-[#D4AF37] font-heading font-bold text-sm">${simTotal.toLocaleString()} USD</strong>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Net Difference:</span>
                <strong className="text-emerald-400 font-bold">+${simGain.toLocaleString()} USD</strong>
              </div>
            </div>

            <button
              onClick={() => {
                navigateTo('home');
                setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="w-full py-2.5 rounded-xl bg-[#13253A] hover:bg-[#1A365D] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Adjust in Calculator
            </button>
          </div>

          {/* Support & Crypto Quick Access */}
          <div className="bg-[#0F1E33] rounded-3xl p-6 border border-[#243B53] shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#243B53] pb-3">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#D4AF37]" />
                  Crypto Desk & Support
                </h3>
              </div>
              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                Need receipt adjustments or custom blockchain verification? Our coordinator desk is ready to help.
              </p>
              <div className="mt-4 space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{branding.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{branding.contactPhone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {user?.role === 'admin' ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openModal('crypto-manager')}
                    className="py-2.5 rounded-xl bg-[#13253A] hover:bg-[#1A365D] border border-[#243B53] text-xs font-bold text-[#D4AF37] transition-colors"
                  >
                    Crypto Wallets
                  </button>
                  <button
                    onClick={() => openModal('support')}
                    className="py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Get Support
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openModal('support')}
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Contact Support Desk
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Contribution History Table */}
        <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-xl overflow-hidden">
          
          <div className="p-6 border-b border-[#243B53] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-white">
                Verified Contribution History
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                On-chain cryptocurrency records with digital receipt references.
              </p>
            </div>

            <button
              onClick={() => {
                navigateTo('home');
                setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="px-4 py-2 rounded-xl bg-[#C5221F] hover:bg-[#A51D1A] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5" />
              Make New Contribution
            </button>
          </div>

          {userTxns.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileText className="w-12 h-12 text-gray-600 mx-auto" />
              <h4 className="font-heading text-base font-bold text-gray-300">
                No Contribution Records Yet
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Once your cryptocurrency transfer is registered, it will appear here with an official downloadable receipt.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#13253A] text-gray-300 uppercase font-bold text-[11px] border-b border-[#243B53]">
                  <tr>
                    <th className="py-3.5 px-6">Transaction Ref</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Amount (USD)</th>
                    <th className="py-3.5 px-6">Crypto Used</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243B53]">
                  {userTxns.map((t) => (
                    <tr key={t.id} className="hover:bg-[#13253A]/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-white">
                        {t.reference}
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 font-bold text-white">
                        ${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <span className="block text-[10px] text-gray-500 capitalize">{t.type}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        <span className="font-bold text-[#D4AF37]">{t.cryptoSymbol}</span>
                        <span className="block text-[10px] text-gray-400">{t.cryptoNetwork}</span>
                      </td>
                      <td className="py-4 px-6">
                        {t.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </span>
                        )}
                        {t.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                        {t.status === 'under_review' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300">
                            <AlertCircle className="w-3 h-3" /> Under Review
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openModal('receipt', t)}
                          className="px-3 py-1.5 rounded-lg border border-[#243B53] hover:border-gray-400 text-[11px] font-semibold text-[#D4AF37] bg-[#13253A] transition-colors"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

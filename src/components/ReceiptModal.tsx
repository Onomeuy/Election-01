import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Download, 
  ArrowRight, 
  Star,
  Wallet
} from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedReceiptTxn, 
    navigateTo, 
    branding, 
    showToast 
  } = useApp();

  if (activeModal !== 'receipt' || !selectedReceiptTxn) return null;

  const txn = selectedReceiptTxn;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Digital receipt snapshot prepared for your files.', 'success');
  };

  const handleGoDashboard = () => {
    closeModal();
    navigateTo('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl max-w-xl w-full shadow-2xl border border-[#243B53] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 relative border-b border-[#243B53]">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-md bg-[#162C46] flex items-center justify-center text-[#D4AF37] border border-[#243B53]">
              <Star className="w-4 h-4 fill-[#D4AF37]" />
            </div>
            <div>
              <div className="font-heading font-bold text-base leading-tight">
                {branding.websiteName}
              </div>
              <div className="text-[10px] text-gray-300 uppercase tracking-widest">
                Official Contribution Receipt
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#243B53] flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Settlement Status: Confirmed & Logged
            </span>
            <span className="font-mono text-gray-400">{txn.receiptNumber}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Amount Box */}
          <div className="text-center py-5 bg-[#13253A] rounded-2xl border border-[#243B53]">
            <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Total Amount Contributed
            </div>
            <div className="text-3xl sm:text-4xl font-black font-heading text-white mt-1">
              ${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </div>
            <div className="text-xs text-[#D4AF37] mt-1 flex items-center justify-center gap-1.5 font-medium">
              <Wallet className="w-3.5 h-3.5" />
              <span>Paid via {txn.cryptoSymbol} ({txn.cryptoNetwork})</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block">Transaction Reference:</span>
              <span className="font-mono font-bold text-white mt-0.5 block">{txn.reference}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Date & Timestamp:</span>
              <span className="font-bold text-white mt-0.5 block">
                {new Date(txn.date).toLocaleDateString()} {new Date(txn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Contributor Name:</span>
              <span className="font-bold text-white mt-0.5 block">{txn.contributorName}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Email on Record:</span>
              <span className="font-bold text-white mt-0.5 block truncate">{txn.contributorEmail}</span>
            </div>
          </div>

          {/* Crypto Coordinates Record */}
          <div className="bg-[#0B1726] p-4 rounded-xl border border-[#243B53] text-xs space-y-2">
            <div>
              <span className="text-gray-400 text-[11px] block">Receiving Wallet Address:</span>
              <span className="font-mono text-[11px] text-[#D4AF37] break-all block mt-0.5">
                {txn.cryptoAddress}
              </span>
            </div>
            {txn.txHash && (
              <div className="pt-1.5 border-t border-[#243B53]/50">
                <span className="text-gray-400 text-[11px] block">Blockchain TXID / Hash:</span>
                <span className="font-mono text-[11px] text-gray-300 break-all block mt-0.5">
                  {txn.txHash}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1.5 border-t border-[#243B53]/50">
              <span className="text-gray-300 font-bold">{txn.multiplier}× Projected Total:</span>
              <span className="font-bold text-[#D4AF37]">${txn.projectedTotal.toLocaleString()} USD</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#243B53] hover:border-gray-400 text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 transition-colors bg-[#13253A]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#243B53] hover:border-gray-400 text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 transition-colors bg-[#13253A]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleGoDashboard}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

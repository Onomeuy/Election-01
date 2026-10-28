import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  Wallet, 
  QrCode, 
  ExternalLink, 
  ShieldCheck, 
  Loader2, 
  Plus, 
  SlidersHorizontal,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal, 
    selectedAmount, 
    pendingReviewData, 
    cryptoWallets, 
    processCryptoPayment, 
    showToast,
    branding 
  } = useApp();

  // Active wallets
  const availableWallets = cryptoWallets.filter(w => w.isActive);
  const [selectedWalletId, setSelectedWalletId] = useState<string>(
    availableWallets[0]?.id || ''
  );

  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'checkout' || !pendingReviewData) return null;

  const currentWallet = availableWallets.find(w => w.id === selectedWalletId) || availableWallets[0];

  const handleCopyAddress = () => {
    if (currentWallet) {
      navigator.clipboard.writeText(currentWallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(`${currentWallet.symbol} address copied to clipboard!`, 'success');
    }
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentWallet) {
      showToast('No active cryptocurrency address available. Please add one.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Short processing animation
      await new Promise(r => setTimeout(r, 1200));

      const res = await processCryptoPayment({
        cryptoSymbol: currentWallet.symbol,
        cryptoNetwork: currentWallet.network,
        cryptoAddress: currentWallet.address,
        txHash: txHash.trim() || undefined,
      });

      setIsProcessing(false);

      if (res.success && res.transaction) {
        closeModal();
        openModal('receipt', res.transaction);
      } else {
        showToast(res.error || 'Payment registration failed.', 'error');
      }
    } catch (err: any) {
      setIsProcessing(false);
      showToast('Payment processing error. Please try again.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl max-w-lg w-full shadow-2xl border border-[#243B53] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A43] p-6 relative border-b border-[#243B53]">
          <button
            type="button"
            disabled={isProcessing}
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            <Wallet className="w-4 h-4" />
            Official Initiative Cryptocurrency Transfer
          </div>

          <h3 className="font-heading text-xl font-bold text-white mt-1">
            Complete Crypto Transfer
          </h3>

          <div className="mt-3 flex items-center justify-between bg-[#0B1726]/60 px-4 py-2.5 rounded-xl border border-[#243B53] text-xs">
            <span className="text-gray-300">Contributor: <strong>{pendingReviewData.fullName}</strong></span>
            <span className="text-base font-bold font-heading text-[#D4AF37]">
              ${selectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </span>
          </div>
        </div>

        {isProcessing ? (
          <div className="p-10 text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37] mx-auto" />
            <h4 className="font-heading text-lg font-bold text-white">
              Verifying Cryptocurrency Transfer
            </h4>
            <p className="text-xs text-gray-300 max-w-xs mx-auto">
              Registering on-chain reference and generating your digital contribution receipt...
            </p>
          </div>
        ) : (
          <form onSubmit={handleCompletePayment} className="p-6 space-y-5 text-xs">
            
            {/* Select Crypto Currency */}
            <div>
              <div className="mb-2">
                <label className="font-bold uppercase tracking-wider text-gray-300">
                  Select Currency & Network:
                </label>
              </div>

              {availableWallets.length === 0 ? (
                <div className="p-4 bg-[#13253A] rounded-xl border border-[#243B53] text-center text-gray-300 space-y-2">
                  <p>Cryptocurrency receiving addresses are currently being updated by the administrator. Please try again shortly.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableWallets.map((wallet) => {
                    const isSelected = (currentWallet?.id || '') === wallet.id;
                    return (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setSelectedWalletId(wallet.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#1A365D] border-[#D4AF37] text-white shadow-md'
                            : 'bg-[#13253A] border-[#243B53] text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-bold text-xs flex items-center justify-between">
                          <span>{wallet.symbol}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate mt-0.5">
                          {wallet.network}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {currentWallet && (
              <div className="bg-[#13253A] rounded-2xl p-4 border border-[#243B53] space-y-3">
                
                {/* QR Code Simulation & Address */}
                <div className="flex items-center gap-4">
                  {/* Visual QR box */}
                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <rect x="0" y="0" width="100" height="100" fill="white" />
                      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#102A43" />
                      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#102A43" />
                      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#102A43" />
                      <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                      <rect x="50" y="20" width="8" height="8" fill="#102A43" />
                      <rect x="60" y="60" width="8" height="8" fill="#102A43" />
                      <rect x="75" y="75" width="15" height="15" fill="#102A43" />
                    </svg>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Send to {currentWallet.cryptoName} Address ({currentWallet.network}):
                    </div>
                    <div className="p-2 bg-[#0B1726] rounded-lg font-mono text-[11px] text-white break-all select-all border border-[#243B53]">
                      {currentWallet.address}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="px-3 py-1.5 rounded-lg bg-[#243B53] hover:bg-[#324F6F] text-[#D4AF37] font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Wallet Address'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#243B53] flex items-center justify-between text-gray-300">
                  <span>Transfer Target:</span>
                  <span className="font-bold text-[#D4AF37] text-sm">
                    ${selectedAmount.toLocaleString()} USD in {currentWallet.symbol}
                  </span>
                </div>
              </div>
            )}

            {/* Optional Transaction Hash Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Transaction Hash / TXID <span className="text-gray-400 font-normal">(Optional, if available)</span>
              </label>
              <input
                type="text"
                placeholder="Paste transaction hash or sender transaction ID"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl font-mono text-xs text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
              />
            </div>

            {/* Confirm Payment Button */}
            <button
              type="submit"
              disabled={!currentWallet}
              className="w-full py-3.5 rounded-xl bg-[#C5221F] hover:bg-[#A51D1A] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-white" />
              <span>I Have Sent the Cryptocurrency</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

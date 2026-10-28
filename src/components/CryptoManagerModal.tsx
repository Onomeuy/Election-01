import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Trash2, Wallet, Copy, Check, Lock, KeyRound, ShieldCheck } from 'lucide-react';

export const CryptoManagerModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    cryptoWallets, 
    addCryptoWallet, 
    removeCryptoWallet, 
    toggleCryptoWallet,
    user,
    login,
    showToast 
  } = useApp();

  const [cryptoName, setCryptoName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [network, setNetwork] = useState('');
  const [address, setAddress] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Admin access gate
  const [adminPasskey, setAdminPasskey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(user?.role === 'admin');

  if (activeModal !== 'crypto-manager') return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey.trim().toLowerCase() === 'admin2026' || adminPasskey.trim().toLowerCase() === 'paxton') {
      login('admin@kenpaxtoninitiative.com');
      setIsUnlocked(true);
      showToast('Admin access verified.', 'success');
    } else {
      showToast('Invalid administrator passkey.', 'error');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoName.trim() || !symbol.trim() || !network.trim() || !address.trim()) {
      showToast('Please complete all crypto address fields.', 'error');
      return;
    }

    addCryptoWallet({
      cryptoName: cryptoName.trim(),
      symbol: symbol.trim().toUpperCase(),
      network: network.trim(),
      address: address.trim(),
      isActive: true,
    });

    setCryptoName('');
    setSymbol('');
    setNetwork('');
    setAddress('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast('Address copied to clipboard.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#243B53] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
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
            <ShieldCheck className="w-4 h-4" />
            Admin Only • Cryptocurrency Wallet Manager
          </div>

          <h3 className="font-heading text-xl font-bold text-white mt-1">
            Manage Receiving Crypto Addresses
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Restricted to verified administrators to add or remove initiative receiving addresses.
          </p>
        </div>

        {/* Access Guard: Only Admin Can Access */}
        {!isUnlocked && user?.role !== 'admin' ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-[#D4AF37] border border-[#243B53] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold text-white">
                Administrator Authentication Required
              </h4>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Only authorized initiative administrators can add, remove, or modify cryptocurrency receiving addresses.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="max-w-xs mx-auto space-y-3 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Admin Passkey
                </label>
                <input
                  type="password"
                  placeholder="Enter passkey (admin2026)"
                  value={adminPasskey}
                  onChange={(e) => setAdminPasskey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-4 h-4" />
                <span>Verify Admin Access</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Active Wallets List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Current Receiving Addresses ({cryptoWallets.length})
              </h4>

              {cryptoWallets.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-400 bg-[#13253A] rounded-2xl border border-[#243B53]">
                  No cryptocurrency addresses configured yet. Add one below.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cryptoWallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="p-4 rounded-2xl bg-[#13253A] border border-[#243B53] flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-[#3E5C82] transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {wallet.cryptoName}
                          </span>
                          <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-sm text-[10px] font-bold">
                            {wallet.symbol}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            ({wallet.network})
                          </span>
                          {!wallet.isActive && (
                            <span className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-xs text-[9px] uppercase font-bold">
                              Disabled
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-gray-300 truncate">
                          <span className="truncate">{wallet.address}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(wallet.id, wallet.address)}
                            className="text-[#D4AF37] hover:text-white shrink-0 p-1 rounded-sm"
                            title="Copy address"
                          >
                            {copiedId === wallet.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleCryptoWallet(wallet.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            wallet.isActive
                              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {wallet.isActive ? 'Active' : 'Disabled'}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeCryptoWallet(wallet.id)}
                          className="p-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/30 transition-colors"
                          title="Remove address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Wallet Address Form */}
            <form onSubmit={handleAdd} className="bg-[#10243C] p-5 rounded-2xl border border-[#243B53] space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                Add New Cryptocurrency Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Crypto Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bitcoin / USDT"
                    value={cryptoName}
                    onChange={(e) => setCryptoName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BTC, ETH, USDT"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Network
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TRC-20, ERC-20"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium text-xs mb-1">
                  Receiving Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter complete public receiving wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl font-mono text-xs text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Save & Add Crypto Address</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};

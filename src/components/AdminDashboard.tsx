import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Download, 
  Search, 
  Save, 
  CheckCircle2, 
  Lock, 
  KeyRound,
  MessageSquare,
  Activity,
  Edit,
  Wallet,
  Plus,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { ContributionStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    user, 
    allUsers, 
    transactions, 
    branding, 
    cryptoWallets,
    addCryptoWallet,
    removeCryptoWallet,
    toggleCryptoWallet,
    auditLogs, 
    supportMessages, 
    updateBranding, 
    updateTransactionStatus, 
    exportTransactionsCSV,
    openModal,
    showToast,
    login 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'transactions' | 'wallets' | 'users' | 'content' | 'audit' | 'support'>('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Security passkey
  const [adminPasskey, setAdminPasskey] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(user?.role === 'admin');

  // Content form edit state
  const [editableBranding, setEditableBranding] = useState(branding);

  // New crypto wallet form state
  const [newCryptoName, setNewCryptoName] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newNetwork, setNewNetwork] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey.trim().toLowerCase() === 'admin2026' || adminPasskey.trim().toLowerCase() === 'paxton') {
      login('admin@kenpaxtoninitiative.com');
      setIsAdminUnlocked(true);
      showToast('Admin access granted.', 'success');
    } else {
      showToast('Invalid passkey.', 'error');
    }
  };

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCryptoName.trim() || !newSymbol.trim() || !newNetwork.trim() || !newAddress.trim()) {
      showToast('Please provide all cryptocurrency address details.', 'error');
      return;
    }

    addCryptoWallet({
      cryptoName: newCryptoName.trim(),
      symbol: newSymbol.trim().toUpperCase(),
      network: newNetwork.trim(),
      address: newAddress.trim(),
      isActive: true,
    });

    setNewCryptoName('');
    setNewSymbol('');
    setNewNetwork('');
    setNewAddress('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast('Address copied.', 'success');
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.contributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.contributorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.cryptoSymbol && t.cryptoSymbol.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0);

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(editableBranding);
  };

  if (!isAdminUnlocked && user?.role !== 'admin') {
    return (
      <div className="py-20 bg-[#0B1726] min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-[#0F1E33] rounded-3xl p-8 max-w-md w-full border border-[#243B53] shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#102A43] text-[#D4AF37] border border-[#243B53] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Administrative Console
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              Enter administrative passkey to access crypto wallet management and initiative settings.
            </p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Admin Security Key
              </label>
              <input
                type="password"
                placeholder="Enter passkey (hint: admin2026)"
                value={adminPasskey}
                onChange={(e) => setAdminPasskey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Verify & Access Console</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#0B1726] min-h-[90vh] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#243B53] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
              <Wallet className="w-4 h-4" />
              Administrative Governance & Crypto Console
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold">
              Initiative Management Console
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Operator: <strong>{user?.email || 'admin@kenpaxtoninitiative.com'}</strong> • Multiplier: {branding.multiplier}×
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('wallets')}
              className="px-4 py-2.5 rounded-xl bg-[#13253A] hover:bg-[#1A365D] border border-[#243B53] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <Wallet className="w-4 h-4" />
              <span>Manage Crypto Wallets ({cryptoWallets.length})</span>
            </button>
            <button
              onClick={exportTransactionsCSV}
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0F1E33] p-5 rounded-3xl border border-[#243B53] shadow-md">
            <span className="text-[11px] uppercase font-bold text-gray-400 block">Total Settled Volume</span>
            <div className="text-2xl font-black font-heading text-white mt-1">
              ${totalRevenue.toLocaleString()} USD
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">100% On-Chain Settled</span>
          </div>

          <div className="bg-[#0F1E33] p-5 rounded-3xl border border-[#243B53] shadow-md">
            <span className="text-[11px] uppercase font-bold text-gray-400 block">Crypto Addresses</span>
            <div className="text-2xl font-black font-heading text-[#D4AF37] mt-1">
              {cryptoWallets.length} Configured
            </div>
            <span className="text-[11px] text-gray-400 font-semibold">BTC, ETH, USDT & More</span>
          </div>

          <div className="bg-[#0F1E33] p-5 rounded-3xl border border-[#243B53] shadow-md">
            <span className="text-[11px] uppercase font-bold text-gray-400 block">All Transactions</span>
            <div className="text-2xl font-black font-heading text-white mt-1">
              {transactions.length}
            </div>
            <span className="text-[11px] text-gray-400 font-semibold">Recorded Transactions</span>
          </div>

          <div className="bg-[#0F1E33] p-5 rounded-3xl border border-[#243B53] shadow-md">
            <span className="text-[11px] uppercase font-bold text-gray-400 block">Projection Multiplier</span>
            <div className="text-2xl font-black font-heading text-[#D4AF37] mt-1">
              {branding.multiplier}× Multiplier
            </div>
            <span className="text-[11px] text-gray-400 font-semibold">Active Program Rate</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#243B53] space-x-2 sm:space-x-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'transactions'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Transactions ({transactions.length})
          </button>

          <button
            onClick={() => setActiveTab('wallets')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'wallets'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4 text-[#D4AF37]" />
            Crypto Addresses ({cryptoWallets.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'users'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Contributors ({allUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Edit className="w-4 h-4" />
            Website Content & Branding
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'support'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Inquiries ({supportMessages.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-[#D4AF37] text-white bg-[#0F1E33] rounded-t-xl'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Audit Trail
          </button>
        </div>

        {/* TAB 1: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md overflow-hidden space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="p-5 border-b border-[#243B53] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search contributor, TXN ref, crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0B1726] border border-[#243B53] rounded-xl text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0B1726] border border-[#243B53] rounded-xl text-xs text-white focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#13253A] text-gray-300 uppercase font-bold text-[11px] border-b border-[#243B53]">
                  <tr>
                    <th className="py-3 px-6">Reference</th>
                    <th className="py-3 px-6">Contributor</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Crypto Currency & Address</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243B53]">
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-[#13253A]/50 transition-colors">
                      <td className="py-3.5 px-6 font-mono font-bold text-white">
                        {t.reference}
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-white">{t.contributorName}</div>
                        <div className="text-[11px] text-gray-400 truncate max-w-[160px]">{t.contributorEmail}</div>
                      </td>
                      <td className="py-3.5 px-6 text-gray-400">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-6 font-bold text-white">
                        ${t.amount.toLocaleString()} USD
                        <div className="text-[10px] text-gray-500 capitalize">{t.type}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-[#D4AF37]">{t.cryptoSymbol}</div>
                        <div className="font-mono text-[10px] text-gray-400 truncate max-w-[150px]" title={t.cryptoAddress}>
                          {t.cryptoAddress}
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <select
                          value={t.status}
                          onChange={(e) => updateTransactionStatus(t.id, e.target.value as ContributionStatus)}
                          className="px-2.5 py-1 rounded-lg border border-[#243B53] bg-[#0B1726] text-xs font-semibold text-white focus:outline-hidden"
                        >
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => openModal('receipt', t)}
                          className="text-[#D4AF37] hover:underline font-semibold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: CRYPTO WALLETS MANAGEMENT (Add & Remove Cryptocurrency Addresses) */}
        {activeTab === 'wallets' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md p-6 sm:p-10 space-y-8">
            <div className="border-b border-[#243B53] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Cryptocurrency Wallet Addresses
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Add, remove, or modify cryptocurrency receiving addresses displayed to contributors during checkout.
                </p>
              </div>
            </div>

            {/* Existing Wallets List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Configured Receiving Wallets ({cryptoWallets.length})
              </h4>

              <div className="space-y-3">
                {cryptoWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="p-4 rounded-2xl bg-[#13253A] border border-[#243B53] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{wallet.cryptoName}</span>
                        <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-sm text-[10px] font-bold">
                          {wallet.symbol}
                        </span>
                        <span className="text-[11px] text-gray-400">({wallet.network})</span>
                        {!wallet.isActive && (
                          <span className="bg-red-500/20 text-red-300 text-[9px] uppercase px-1.5 py-0.5 rounded-xs font-bold">
                            Disabled
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs text-gray-300 break-all select-all">
                        <span>{wallet.address}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(wallet.id, wallet.address)}
                          className="text-[#D4AF37] hover:text-white p-1"
                        >
                          {copiedId === wallet.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => toggleCryptoWallet(wallet.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          wallet.isActive
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {wallet.isActive ? 'Active' : 'Disabled'}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeCryptoWallet(wallet.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                        title="Remove address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Cryptocurrency Wallet Form */}
            <form onSubmit={handleAddWallet} className="bg-[#10243C] p-6 rounded-3xl border border-[#243B53] space-y-4 text-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                Add New Cryptocurrency Receiving Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Currency Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bitcoin / Tether USDT"
                    value={newCryptoName}
                    onChange={(e) => setNewCryptoName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BTC, ETH, USDT"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Network
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TRON TRC-20, ERC-20, SOL"
                    value={newNetwork}
                    onChange={(e) => setNewNetwork(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Public Wallet Receiving Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste receiving cryptocurrency address (e.g. 0x... or bc1... or T...)"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0B1726] border border-[#243B53] rounded-xl font-mono text-xs text-white focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save New Cryptocurrency Address</span>
              </button>
            </form>

          </div>
        )}

        {/* TAB 3: USERS */}
        {activeTab === 'users' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md overflow-hidden">
            <div className="p-5 border-b border-[#243B53] flex justify-between items-center">
              <h3 className="font-heading font-bold text-base text-white">
                Registered Contributor Records
              </h3>
              <span className="text-xs text-gray-400">{allUsers.length} total users</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#13253A] text-gray-300 uppercase font-bold text-[11px] border-b border-[#243B53]">
                  <tr>
                    <th className="py-3 px-6">User ID</th>
                    <th className="py-3 px-6">Full Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Country</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Email Status</th>
                    <th className="py-3 px-6">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243B53]">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#13253A]/50">
                      <td className="py-3.5 px-6 font-mono text-gray-500">{u.id}</td>
                      <td className="py-3.5 px-6 font-bold text-white">{u.fullName}</td>
                      <td className="py-3.5 px-6 text-gray-300">{u.email}</td>
                      <td className="py-3.5 px-6 text-gray-400">{u.country || 'United States'}</td>
                      <td className="py-3.5 px-6">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${
                          u.role === 'admin' ? 'bg-[#D4AF37] text-[#0B1726]' : 'bg-[#13253A] text-gray-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-emerald-400 font-bold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITE BRANDING & CONTENT MANAGEMENT */}
        {activeTab === 'content' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md p-6 sm:p-10 space-y-6">
            <div className="border-b border-[#243B53] pb-4">
              <h3 className="font-heading font-bold text-xl text-white">
                Website Content & Multiplier Management
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Modify initiative titles, multiplier value, hero text, and contact information.
              </p>
            </div>

            <form onSubmit={handleSaveBranding} className="space-y-6 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Website Name / Campaign Title
                  </label>
                  <input
                    type="text"
                    value={editableBranding.websiteName}
                    onChange={(e) => setEditableBranding({ ...editableBranding, websiteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editableBranding.tagline}
                    onChange={(e) => setEditableBranding({ ...editableBranding, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#13253A] p-4 rounded-2xl border border-[#243B53]">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Multiplier Value (Current: {editableBranding.multiplier}×)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={editableBranding.multiplier}
                    onChange={(e) => setEditableBranding({ ...editableBranding, multiplier: parseInt(e.target.value, 10) || 8 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs font-bold focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Minimum Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={editableBranding.minAmount}
                    onChange={(e) => setEditableBranding({ ...editableBranding, minAmount: parseInt(e.target.value, 10) || 500 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs font-bold focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Maximum Single Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={editableBranding.maxAmount}
                    onChange={(e) => setEditableBranding({ ...editableBranding, maxAmount: parseInt(e.target.value, 10) || 10000 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs font-bold focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Hero Section Headline
                  </label>
                  <input
                    type="text"
                    value={editableBranding.heroHeadline}
                    onChange={(e) => setEditableBranding({ ...editableBranding, heroHeadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Hero Supporting Subtext
                  </label>
                  <textarea
                    rows={2}
                    value={editableBranding.heroSubtext}
                    onChange={(e) => setEditableBranding({ ...editableBranding, heroSubtext: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    About Section Description
                  </label>
                  <textarea
                    rows={3}
                    value={editableBranding.aboutParagraph1}
                    onChange={(e) => setEditableBranding({ ...editableBranding, aboutParagraph1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={editableBranding.contactEmail}
                    onChange={(e) => setEditableBranding({ ...editableBranding, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editableBranding.contactPhone}
                    onChange={(e) => setEditableBranding({ ...editableBranding, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Headquarters
                  </label>
                  <input
                    type="text"
                    value={editableBranding.contactAddress}
                    onChange={(e) => setEditableBranding({ ...editableBranding, contactAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#243B53] bg-[#0B1726] text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 5: SUPPORT INQUIRIES */}
        {activeTab === 'support' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md overflow-hidden">
            <div className="p-5 border-b border-[#243B53] flex justify-between items-center">
              <h3 className="font-heading font-bold text-base text-white">
                Contributor Messages & Inquiries
              </h3>
              <span className="text-xs text-gray-400">{supportMessages.length} total messages</span>
            </div>

            <div className="divide-y divide-[#243B53]">
              {supportMessages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-[#13253A]/50 transition-colors space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{msg.name} ({msg.email})</span>
                    <span className="text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-bold text-[#D4AF37] text-sm">{msg.subject}</h4>
                  <p className="text-xs text-gray-300 bg-[#0B1726] p-3.5 rounded-xl border border-[#243B53] leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="bg-[#0F1E33] rounded-3xl border border-[#243B53] shadow-md overflow-hidden">
            <div className="p-5 border-b border-[#243B53] flex justify-between items-center">
              <h3 className="font-heading font-bold text-base text-white">
                Cryptographic Administrative Audit Trail
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#13253A] text-gray-300 uppercase font-bold text-[11px] border-b border-[#243B53]">
                  <tr>
                    <th className="py-3 px-6">Timestamp</th>
                    <th className="py-3 px-6">Operator</th>
                    <th className="py-3 px-6">Action</th>
                    <th className="py-3 px-6">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243B53]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#13253A]/50">
                      <td className="py-3.5 px-6 text-gray-400 font-mono">
                        {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-[#D4AF37]">{log.adminEmail}</td>
                      <td className="py-3.5 px-6 font-bold text-white">{log.action}</td>
                      <td className="py-3.5 px-6 text-gray-300 max-w-md">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

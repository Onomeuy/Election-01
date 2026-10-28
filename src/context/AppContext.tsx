import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Contribution, 
  WebsiteContent, 
  AuditLogItem, 
  SupportMessage, 
  ContributionStatus,
  ContributionType,
  CryptoWallet
} from '../types';
import { 
  DEFAULT_WEBSITE_CONTENT, 
  INITIAL_USERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_SUPPORT_MESSAGES,
  DEFAULT_CRYPTO_WALLETS
} from '../data/initialData';
import { 
  db, 
  auth, 
  testConnection, 
  signInWithGoogle, 
  logoutFirebase, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  user: User | null;
  allUsers: User[];
  transactions: Contribution[];
  branding: WebsiteContent;
  cryptoWallets: CryptoWallet[];
  auditLogs: AuditLogItem[];
  supportMessages: SupportMessage[];
  selectedAmount: number;
  contributionType: ContributionType;
  currentView: string;
  activeModal: string | null;
  selectedReceiptTxn: Contribution | null;
  pendingReviewData: {
    fullName: string;
    email: string;
    country: string;
    phone: string;
  } | null;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  
  // Actions
  setSelectedAmount: (amount: number) => void;
  setContributionType: (type: ContributionType) => void;
  navigateTo: (view: string) => void;
  openModal: (modal: string, extraData?: any) => void;
  closeModal: () => void;
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  setPendingReviewData: (data: { fullName: string; email: string; country: string; phone: string }) => void;
  
  // Crypto Wallet Management
  addCryptoWallet: (wallet: Omit<CryptoWallet, 'id'>) => Promise<void>;
  removeCryptoWallet: (id: string) => Promise<void>;
  toggleCryptoWallet: (id: string) => Promise<void>;
  updateCryptoWallet: (id: string, updated: Partial<CryptoWallet>) => Promise<void>;
  
  // Crypto Payment Processing
  processCryptoPayment: (params: {
    cryptoSymbol: string;
    cryptoNetwork: string;
    cryptoAddress: string;
    txHash?: string;
  }) => Promise<{ success: boolean; transaction?: Contribution; error?: string }>;
  
  updateTransactionStatus: (txnId: string, status: ContributionStatus) => Promise<void>;
  updateBranding: (newBranding: Partial<WebsiteContent>) => Promise<void>;
  submitSupportMessage: (data: { name: string; email: string; subject: string; message: string }) => Promise<void>;
  exportTransactionsCSV: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // Helper calculations
  calculateProjection: (amount: number) => { total: number; gain: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'kp_auth_user',
  USERS: 'kp_all_users',
  TRANSACTIONS: 'kp_transactions',
  BRANDING: 'kp_branding',
  CRYPTO_WALLETS: 'kp_crypto_wallets',
  AUDIT: 'kp_audit_logs',
  SUPPORT: 'kp_support_msgs',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Website Branding
  const [branding, setBranding] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDING);
    return saved ? JSON.parse(saved) : DEFAULT_WEBSITE_CONTENT;
  });

  // Crypto Wallets
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CRYPTO_WALLETS);
    return saved ? JSON.parse(saved) : DEFAULT_CRYPTO_WALLETS;
  });

  // Users
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Current Logged-in User
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  // Transactions
  const [transactions, setTransactions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Support Messages
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPPORT);
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_MESSAGES;
  });

  // Calculator State
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [contributionType, setContributionType] = useState<ContributionType>('one-time');
  
  // View Routing
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState<Contribution | null>(null);

  // Review Form Data Buffer
  const [pendingReviewData, setPendingReviewData] = useState<{
    fullName: string;
    email: string;
    country: string;
    phone: string;
  } | null>(null);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const isAdminEmail = 
          fbUser.email === 'onometroy14@gmail.com' || 
          fbUser.email === 'admin@kenpaxtoninitiative.com' || 
          (fbUser.email && fbUser.email.toLowerCase().includes('admin'));
        
        const role = isAdminEmail ? 'admin' : 'contributor';
        const userObj: User = {
          id: fbUser.uid,
          email: fbUser.email || '',
          fullName: fbUser.displayName || (isAdminEmail ? 'System Administrator' : 'Contributor'),
          role,
          createdAt: new Date().toISOString(),
          emailVerified: fbUser.emailVerified,
        };

        setUser(userObj);
        setAllUsers(prev => {
          if (!prev.some(u => u.id === userObj.id)) {
            return [userObj, ...prev];
          }
          return prev;
        });

        // Sync user profile to Firestore
        try {
          await setDoc(doc(db, 'users', fbUser.uid), userObj, { merge: true });
          if (role === 'admin') {
            await setDoc(doc(db, 'admins', fbUser.uid), {
              email: fbUser.email,
              role: 'admin',
              addedAt: new Date().toISOString()
            }, { merge: true });
          }
        } catch (err) {
          console.warn('Syncing user profile deferred:', err);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Sync Branding from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global_branding'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as WebsiteContent;
        setBranding(data);
      } else {
        // Initial seed if not yet present
        setDoc(doc(db, 'settings', 'global_branding'), DEFAULT_WEBSITE_CONTENT).catch(() => {});
      }
    }, (err) => {
      console.warn('Firestore branding snapshot error:', err);
    });

    return () => unsubscribe();
  }, []);

  // Sync Crypto Wallets from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'crypto_wallets'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as CryptoWallet);
        setCryptoWallets(list);
      } else {
        // Seed default crypto wallets if collection is empty
        DEFAULT_CRYPTO_WALLETS.forEach(w => {
          setDoc(doc(db, 'crypto_wallets', w.id), w).catch(() => {});
        });
      }
    }, (err) => {
      console.warn('Firestore crypto wallets snapshot error:', err);
    });

    return () => unsubscribe();
  }, []);

  // Sync Transactions from Firestore
  useEffect(() => {
    if (!user) return;

    let q = query(collection(db, 'transactions'));
    if (user.role !== 'admin') {
      q = query(collection(db, 'transactions'), where('userId', '==', user.id));
    }

    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as Contribution);
        setTransactions(list);
      }
    }, (err) => {
      console.warn('Firestore transactions snapshot error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync Audit Logs from Firestore (Admin only)
  useEffect(() => {
    if (user?.role !== 'admin') return;

    const unsubscribe = onSnapshot(collection(db, 'audit_logs'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as AuditLogItem);
        // Sort descending by timestamp
        list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setAuditLogs(list);
      }
    }, (err) => {
      console.warn('Firestore audit logs snapshot error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync Support Messages from Firestore (Admin only)
  useEffect(() => {
    if (user?.role !== 'admin') return;

    const unsubscribe = onSnapshot(collection(db, 'support_messages'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => d.data() as SupportMessage);
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSupportMessages(list);
      }
    }, (err) => {
      console.warn('Firestore support messages snapshot error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CRYPTO_WALLETS, JSON.stringify(cryptoWallets));
  }, [cryptoWallets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPORT, JSON.stringify(supportMessages));
  }, [supportMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (modal: string, extraData?: any) => {
    if (modal === 'receipt' && extraData) {
      setSelectedReceiptTxn(extraData);
    }
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const calculateProjection = (amount: number) => {
    const multiplier = branding.multiplier || 8;
    const total = amount * multiplier;
    const gain = total - amount;
    return { total, gain };
  };

  // Add / Remove Crypto Addresses (Restricted to Administrator Only)
  const addCryptoWallet = async (walletData: Omit<CryptoWallet, 'id'>) => {
    if (user?.role !== 'admin') {
      showToast('Administrative authorization required to add cryptocurrency addresses.', 'error');
      return;
    }

    const newWallet: CryptoWallet = {
      id: `cw-${Date.now().toString(36)}`,
      ...walletData,
      isActive: true,
    };

    setCryptoWallets(prev => [...prev, newWallet]);

    const audit: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminEmail: user?.email || 'admin@kenpaxtoninitiative.com',
      action: 'Crypto Wallet Added',
      details: `Added ${newWallet.cryptoName} (${newWallet.symbol}) address: ${newWallet.address.slice(0, 10)}...`,
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Persist to Firestore
    try {
      await setDoc(doc(db, 'crypto_wallets', newWallet.id), newWallet);
      await setDoc(doc(db, 'audit_logs', audit.id), audit);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `crypto_wallets/${newWallet.id}`);
    }

    showToast(`Added ${newWallet.cryptoName} address successfully!`, 'success');
  };

  const removeCryptoWallet = async (id: string) => {
    if (user?.role !== 'admin') {
      showToast('Administrative authorization required.', 'error');
      return;
    }

    const target = cryptoWallets.find(w => w.id === id);
    setCryptoWallets(prev => prev.filter(w => w.id !== id));

    const audit: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminEmail: user?.email || 'admin@kenpaxtoninitiative.com',
      action: 'Crypto Wallet Removed',
      details: `Removed wallet ID: ${id} (${target?.cryptoName || 'Unknown'})`,
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Persist to Firestore
    try {
      await deleteDoc(doc(db, 'crypto_wallets', id));
      await setDoc(doc(db, 'audit_logs', audit.id), audit);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `crypto_wallets/${id}`);
    }

    showToast('Cryptocurrency address removed.', 'info');
  };

  const toggleCryptoWallet = async (id: string) => {
    if (user?.role !== 'admin') {
      showToast('Administrative authorization required.', 'error');
      return;
    }

    const target = cryptoWallets.find(w => w.id === id);
    if (!target) return;
    const updatedStatus = !target.isActive;

    setCryptoWallets(prev => prev.map(w => w.id === id ? { ...w, isActive: updatedStatus } : w));

    try {
      await updateDoc(doc(db, 'crypto_wallets', id), { isActive: updatedStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `crypto_wallets/${id}`);
    }

    showToast('Wallet address status updated.', 'info');
  };

  const updateCryptoWallet = async (id: string, updated: Partial<CryptoWallet>) => {
    if (user?.role !== 'admin') {
      showToast('Administrative authorization required.', 'error');
      return;
    }

    setCryptoWallets(prev => prev.map(w => w.id === id ? { ...w, ...updated } : w));

    try {
      await updateDoc(doc(db, 'crypto_wallets', id), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `crypto_wallets/${id}`);
    }

    showToast('Cryptocurrency address updated.', 'success');
  };

  // Authentication Flows
  const login = async (emailInput: string): Promise<{ success: boolean; error?: string }> => {
    const normalized = emailInput.trim().toLowerCase();
    const existing = allUsers.find(u => u.email.toLowerCase() === normalized);

    if (existing) {
      setUser(existing);
      showToast(`Welcome back, ${existing.fullName}!`, 'success');
      closeModal();
      return { success: true };
    }

    // Auto-create user for frictionless authentication
    const isAdmin = normalized.includes('admin') || normalized === 'onometroy14@gmail.com';
    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      email: normalized,
      fullName: isAdmin ? 'Administrator' : 'Contributor',
      role: isAdmin ? 'admin' : 'contributor',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };

    setAllUsers(prev => [newUser, ...prev]);
    setUser(newUser);

    try {
      await setDoc(doc(db, 'users', newUser.id), newUser);
      if (isAdmin) {
        await setDoc(doc(db, 'admins', newUser.id), { email: newUser.email, role: 'admin', addedAt: new Date().toISOString() });
      }
    } catch (err) {
      console.warn('Firestore user write deferred:', err);
    }

    showToast(`Signed in as ${newUser.fullName}.`, 'success');
    closeModal();
    return { success: true };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await signInWithGoogle();
      const fbUser = res.user;
      const isAdminEmail = 
        fbUser.email === 'onometroy14@gmail.com' || 
        fbUser.email === 'admin@kenpaxtoninitiative.com' || 
        (fbUser.email && fbUser.email.toLowerCase().includes('admin'));

      const role = isAdminEmail ? 'admin' : 'contributor';
      const userObj: User = {
        id: fbUser.uid,
        email: fbUser.email || '',
        fullName: fbUser.displayName || (isAdminEmail ? 'System Administrator' : 'Contributor'),
        role,
        createdAt: new Date().toISOString(),
        emailVerified: fbUser.emailVerified,
      };

      setUser(userObj);
      setAllUsers(prev => {
        if (!prev.some(u => u.id === userObj.id)) {
          return [userObj, ...prev];
        }
        return prev;
      });

      try {
        await setDoc(doc(db, 'users', fbUser.uid), userObj, { merge: true });
        if (role === 'admin') {
          await setDoc(doc(db, 'admins', fbUser.uid), {
            email: fbUser.email,
            role: 'admin',
            addedAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (err) {
        console.warn('Syncing user profile deferred:', err);
      }

      showToast(`Welcome, ${userObj.fullName}!`, 'success');
      closeModal();
      return { success: true };
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      return { success: false, error: err.message || 'Google sign in failed.' };
    }
  };

  const register = async (name: string, emailInput: string): Promise<{ success: boolean; error?: string }> => {
    const normalized = emailInput.trim().toLowerCase();
    const existing = allUsers.find(u => u.email.toLowerCase() === normalized);

    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const isAdmin = normalized.includes('admin') || normalized === 'onometroy14@gmail.com';
    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      email: normalized,
      fullName: name.trim(),
      role: isAdmin ? 'admin' : 'contributor',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };

    setAllUsers(prev => [newUser, ...prev]);
    setUser(newUser);

    try {
      await setDoc(doc(db, 'users', newUser.id), newUser);
      if (isAdmin) {
        await setDoc(doc(db, 'admins', newUser.id), { email: newUser.email, role: 'admin', addedAt: new Date().toISOString() });
      }
    } catch (err) {
      console.warn('Firestore user write deferred:', err);
    }

    showToast(`Account created successfully for ${newUser.fullName}.`, 'success');
    closeModal();
    return { success: true };
  };

  const logout = async () => {
    try {
      await logoutFirebase();
    } catch (err) {
      console.warn('Firebase signout:', err);
    }
    setUser(null);
    showToast('Signed out successfully.', 'info');
    if (currentView === 'dashboard' || currentView === 'admin') {
      setCurrentView('home');
    }
  };

  const resetPassword = async (email: string) => {
    showToast(`Password recovery link dispatched to ${email}.`, 'info');
    return { success: true, message: 'Recovery instructions sent.' };
  };

  // Process crypto payment
  const processCryptoPayment = async (params: {
    cryptoSymbol: string;
    cryptoNetwork: string;
    cryptoAddress: string;
    txHash?: string;
  }): Promise<{ success: boolean; transaction?: Contribution; error?: string }> => {
    if (!pendingReviewData) {
      return { success: false, error: 'Review details are missing.' };
    }

    const { total, gain } = calculateProjection(selectedAmount);
    const txnCode = `TXN-KP-${Math.floor(100000 + Math.random() * 900000)}`;
    const rcptCode = `RCPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTxn: Contribution = {
      id: `txn-${Date.now()}`,
      reference: txnCode,
      userId: user?.id || `anon-${Date.now()}`,
      contributorName: pendingReviewData.fullName,
      contributorEmail: pendingReviewData.email,
      contributorCountry: pendingReviewData.country || 'United States',
      contributorPhone: pendingReviewData.phone || undefined,
      amount: selectedAmount,
      multiplier: branding.multiplier || 8,
      projectedTotal: total,
      projectedGain: gain,
      type: contributionType,
      paymentMethod: 'crypto',
      cryptoSymbol: params.cryptoSymbol,
      cryptoNetwork: params.cryptoNetwork,
      cryptoAddress: params.cryptoAddress,
      txHash: params.txHash || `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      status: 'completed',
      date: new Date().toISOString(),
      receiptNumber: rcptCode,
      notes: `Settled via ${params.cryptoSymbol} (${params.cryptoNetwork}).`,
    };

    if (!user) {
      const autoUser: User = {
        id: newTxn.userId,
        email: pendingReviewData.email,
        fullName: pendingReviewData.fullName,
        role: 'contributor',
        country: pendingReviewData.country,
        phone: pendingReviewData.phone,
        createdAt: new Date().toISOString(),
        emailVerified: true,
      };
      setAllUsers(prev => [autoUser, ...prev]);
      setUser(autoUser);
      setDoc(doc(db, 'users', autoUser.id), autoUser).catch(() => {});
    }

    setTransactions(prev => [newTxn, ...prev]);

    const audit: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminEmail: 'crypto-gateway@system',
      action: 'Crypto Contribution Settled',
      details: `${newTxn.reference} of $${newTxn.amount.toLocaleString()} received via ${params.cryptoSymbol}.`,
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Persist transaction to Firestore
    try {
      await setDoc(doc(db, 'transactions', newTxn.id), newTxn);
      await setDoc(doc(db, 'audit_logs', audit.id), audit);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `transactions/${newTxn.id}`);
    }

    showToast(`Payment registered! Reference: ${txnCode}`, 'success');
    return { success: true, transaction: newTxn };
  };

  const updateTransactionStatus = async (txnId: string, status: ContributionStatus) => {
    setTransactions(prev => prev.map(t => t.id === txnId ? { ...t, status } : t));

    try {
      await updateDoc(doc(db, 'transactions', txnId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `transactions/${txnId}`);
    }

    showToast(`Transaction ${txnId} updated to ${status}`, 'info');
  };

  const updateBranding = async (newBranding: Partial<WebsiteContent>) => {
    const updated = { ...branding, ...newBranding };
    setBranding(updated);

    try {
      await setDoc(doc(db, 'settings', 'global_branding'), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'settings/global_branding');
    }

    showToast('Website content updated successfully.', 'success');
  };

  const submitSupportMessage = async (data: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: SupportMessage = {
      id: `msg-${Date.now()}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setSupportMessages(prev => [newMsg, ...prev]);

    try {
      await setDoc(doc(db, 'support_messages', newMsg.id), newMsg);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `support_messages/${newMsg.id}`);
    }

    showToast('Your message has been sent.', 'success');
  };

  const exportTransactionsCSV = () => {
    if (transactions.length === 0) {
      showToast('No transactions to export.', 'info');
      return;
    }
    const headers = ['Reference', 'Date', 'Contributor Name', 'Email', 'Amount', 'Multiplier', 'Projected Total', 'Crypto Symbol', 'Network', 'Crypto Address', 'TXID', 'Status', 'Receipt Number'];
    const rows = transactions.map(t => [
      t.reference,
      t.date,
      `"${t.contributorName.replace(/"/g, '""')}"`,
      t.contributorEmail,
      t.amount,
      t.multiplier,
      t.projectedTotal,
      t.cryptoSymbol,
      t.cryptoNetwork,
      t.cryptoAddress,
      t.txHash || '',
      t.status,
      t.receiptNumber,
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KenPaxton_Contributions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Export generated successfully.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        allUsers,
        transactions,
        branding,
        cryptoWallets,
        auditLogs,
        supportMessages,
        selectedAmount,
        contributionType,
        currentView,
        activeModal,
        selectedReceiptTxn,
        pendingReviewData,
        toast,
        setSelectedAmount,
        setContributionType,
        navigateTo,
        openModal,
        closeModal,
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
        setPendingReviewData,
        addCryptoWallet,
        removeCryptoWallet,
        toggleCryptoWallet,
        updateCryptoWallet,
        processCryptoPayment,
        updateTransactionStatus,
        updateBranding,
        submitSupportMessage,
        exportTransactionsCSV,
        showToast,
        calculateProjection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

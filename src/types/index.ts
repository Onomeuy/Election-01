/**
 * Core application data models and type definitions
 */

export interface CryptoWallet {
  id: string;
  cryptoName: string;
  symbol: string;
  network: string;
  address: string;
  qrCodeUrl?: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'contributor' | 'admin';
  country?: string;
  phone?: string;
  createdAt: string;
  emailVerified: boolean;
}

export type ContributionStatus = 'completed' | 'pending' | 'under_review' | 'cancelled';
export type PaymentMethod = 'crypto';
export type ContributionType = 'one-time' | 'recurring';

export interface Contribution {
  id: string;
  reference: string;
  userId: string;
  contributorName: string;
  contributorEmail: string;
  contributorCountry: string;
  contributorPhone?: string;
  amount: number;
  multiplier: number;
  projectedTotal: number;
  projectedGain: number;
  type: ContributionType;
  paymentMethod: PaymentMethod;
  cryptoSymbol: string;
  cryptoNetwork: string;
  cryptoAddress: string;
  txHash?: string;
  status: ContributionStatus;
  date: string;
  receiptNumber: string;
  notes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  details: string;
}

export interface WebsiteContent {
  websiteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  multiplier: number;
  minAmount: number;
  maxAmount: number;
  aboutHeading: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
}

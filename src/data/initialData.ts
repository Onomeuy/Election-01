import { WebsiteContent, User, Contribution, AuditLogItem, SupportMessage, CryptoWallet } from '../types';

export const DEFAULT_CRYPTO_WALLETS: CryptoWallet[] = [
  {
    id: 'cw-btc',
    cryptoName: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Mainnet',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    isActive: true,
  },
  {
    id: 'cw-usdt-trc20',
    cryptoName: 'Tether USDT',
    symbol: 'USDT (TRC20)',
    network: 'TRON TRC-20',
    address: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd3ZiPULj',
    isActive: true,
  },
  {
    id: 'cw-eth',
    cryptoName: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum ERC-20',
    address: '0x71C8364437a9b08573DA20300307400d98650E30',
    isActive: true,
  },
  {
    id: 'cw-usdt-erc20',
    cryptoName: 'Tether USDT',
    symbol: 'USDT (ERC20)',
    network: 'Ethereum ERC-20',
    address: '0x71C8364437a9b08573DA20300307400d98650E30',
    isActive: true,
  },
  {
    id: 'cw-sol',
    cryptoName: 'Solana',
    symbol: 'SOL',
    network: 'Solana Network',
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    isActive: true,
  },
];

export const DEFAULT_WEBSITE_CONTENT: WebsiteContent = {
  websiteName: 'Ken Paxton Donation Initiative',
  tagline: 'Principled Leadership • Fiscal Integrity • Proven Results',
  heroHeadline: 'Make Your Contribution Count',
  heroSubtext: 'Select your contribution amount, preview your 8× projection, and complete your transfer securely with cryptocurrency.',
  multiplier: 8,
  minAmount: 500,
  maxAmount: 10000,
  aboutHeading: 'About The Ken Paxton Initiative',
  aboutParagraph1: 'Ken Paxton has dedicated his career to public service, advocating for constitutional governance, limited government oversight, economic prosperity, and transparent stewardship. This initiative provides a structured platform for supporters and civic contributors to engage with programs focused on institutional growth and community stability.',
  aboutParagraph2: 'All contributions gathered through this portal support initiative directives and operational objectives. Administrative controls allow authorized coordinators to update program information and cryptocurrency payment coordinates in real time.',
  contactEmail: 'contact@kenpaxtoninitiative.com',
  contactPhone: '+1 (512) 555-0198',
  contactAddress: 'Austin, Texas • Official Initiative Headquarters',
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-01',
    email: 'admin@kenpaxtoninitiative.com',
    fullName: 'System Administrator',
    role: 'admin',
    country: 'United States',
    phone: '+1 (512) 555-0199',
    createdAt: '2026-01-15T09:00:00Z',
    emailVerified: true,
  },
  {
    id: 'usr-demo-01',
    email: 'contributor@example.com',
    fullName: 'Robert Sterling',
    role: 'contributor',
    country: 'United States',
    phone: '+1 (214) 555-8821',
    createdAt: '2026-02-10T14:30:00Z',
    emailVerified: true,
  },
];

export const INITIAL_TRANSACTIONS: Contribution[] = [
  {
    id: 'txn-1001',
    reference: 'TXN-KP-782194',
    userId: 'usr-demo-01',
    contributorName: 'Robert Sterling',
    contributorEmail: 'contributor@example.com',
    contributorCountry: 'United States',
    contributorPhone: '+1 (214) 555-8821',
    amount: 1000,
    multiplier: 8,
    projectedTotal: 8000,
    projectedGain: 7000,
    type: 'one-time',
    paymentMethod: 'crypto',
    cryptoSymbol: 'USDT (TRC20)',
    cryptoNetwork: 'TRON TRC-20',
    cryptoAddress: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd3ZiPULj',
    txHash: '0x9a8f23c7b12d45e6f890123456789abcdef0123456789abcdef0123456789abc',
    status: 'completed',
    date: '2026-03-12T16:45:00Z',
    receiptNumber: 'RCPT-2026-0389',
    notes: 'Cryptocurrency on-chain settlement confirmed.',
  },
  {
    id: 'txn-1002',
    reference: 'TXN-KP-902341',
    userId: 'usr-demo-01',
    contributorName: 'Robert Sterling',
    contributorEmail: 'contributor@example.com',
    contributorCountry: 'United States',
    amount: 500,
    multiplier: 8,
    projectedTotal: 4000,
    projectedGain: 3500,
    type: 'one-time',
    paymentMethod: 'crypto',
    cryptoSymbol: 'BTC',
    cryptoNetwork: 'Bitcoin Mainnet',
    cryptoAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    txHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    status: 'completed',
    date: '2026-04-05T11:20:00Z',
    receiptNumber: 'RCPT-2026-0442',
    notes: 'Bitcoin block verification confirmed.',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-04-05T11:22:00Z',
    adminEmail: 'system@kenpaxtoninitiative.com',
    action: 'Crypto Settlement Confirmed',
    details: 'Bitcoin transaction TXN-KP-902341 ($500.00) confirmed on-chain.',
  },
  {
    id: 'log-2',
    timestamp: '2026-03-12T16:46:00Z',
    adminEmail: 'system@kenpaxtoninitiative.com',
    action: 'USDT Settlement Verified',
    details: 'Captured TXN-KP-782194 ($1,000.00 USDT) via TRON network.',
  },
  {
    id: 'log-3',
    timestamp: '2026-01-15T09:00:00Z',
    adminEmail: 'admin@kenpaxtoninitiative.com',
    action: 'Portal System Initialization',
    details: 'Configured crypto payment gateways and 8× calculation engine.',
  },
];

export const INITIAL_SUPPORT_MESSAGES: SupportMessage[] = [
  {
    id: 'msg-1',
    name: 'David Vance',
    email: 'dvance@texasholdings.net',
    subject: 'Crypto contribution and transaction verification',
    message: 'Could you confirm the on-chain confirmation threshold for direct Bitcoin and USDT transfers above $5,000?',
    status: 'resolved',
    createdAt: '2026-04-01T10:15:00Z',
  },
  {
    id: 'msg-2',
    name: 'Eleanor Davis',
    email: 'eleanor.d@austinemail.com',
    subject: 'Receipt generation question',
    message: 'I completed my USDT contribution and would like an official digital receipt for my records.',
    status: 'in_progress',
    createdAt: '2026-04-18T15:40:00Z',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does the contribution process work?',
    answer: 'The process involves three steps: (1) Select your contribution amount between $500 and $10,000; (2) Review your 8× projection; and (3) Complete your transfer using our official cryptocurrency address (Bitcoin, Ethereum, USDT, Solana). Once sent, your transaction reference and digital receipt are generated automatically.',
  },
  {
    question: 'What is the minimum and maximum contribution?',
    answer: 'Standard amounts range from $500.00 up to $10,000.00. For custom amounts exceeding $10,000, please contact our administrative desk.',
  },
  {
    question: 'How is the projected amount calculated?',
    answer: 'The calculator calculates your projection: Projected Total = Selected Amount × 8. The projected difference equals Projected Total minus Selected Amount.',
  },
  {
    question: 'Which cryptocurrencies are supported?',
    answer: 'We support Bitcoin (BTC), Tether USDT (TRC-20 and ERC-20), Ethereum (ETH), and Solana (SOL). The administrator can also add new cryptocurrency networks and wallet addresses dynamically.',
  },
  {
    question: 'How quickly is the cryptocurrency transaction confirmed?',
    answer: 'Transactions are typically registered immediately upon receiving your transaction hash (TXID) and settled according to standard blockchain confirmation times.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can submit an inquiry anytime via our Contact form, email us at contact@kenpaxtoninitiative.com, or reach our office during standard business hours.',
  },
];

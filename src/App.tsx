/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FourPillars } from './components/FourPillars';
import { HowItWorks } from './components/HowItWorks';
import { Calculator } from './components/Calculator';
import { AboutSection } from './components/AboutSection';
import { KeyIssues } from './components/KeyIssues';
import { NewsAndEvents } from './components/NewsAndEvents';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { ReviewPage } from './components/ReviewPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CryptoManagerModal } from './components/CryptoManagerModal';
import { ReceiptModal } from './components/ReceiptModal';
import { SupportModal } from './components/SupportModal';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1726] text-[#E2E8F0]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <FourPillars />
            <HowItWorks />
            <Calculator />
            <AboutSection />
            <KeyIssues />
            <NewsAndEvents />
            <FaqSection />
            <CtaBanner />
          </>
        )}

        {currentView === 'review' && <ReviewPage />}
        {currentView === 'dashboard' && <UserDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
        {['terms', 'privacy', 'risk-disclosure', 'refund-policy'].includes(currentView) && <LegalPages />}
      </main>

      <Footer />

      {/* Global Interactive Modals & Alerts */}
      <AuthModal />
      <CheckoutModal />
      <CryptoManagerModal />
      <ReceiptModal />
      <SupportModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

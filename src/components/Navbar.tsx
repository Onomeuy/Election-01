import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Settings, 
  FileText, 
  Star,
  ChevronDown,
  Wallet
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    branding, 
    currentView, 
    navigateTo, 
    openModal, 
    logout 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (view: string, hashId?: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    
    if (view === 'home' && hashId) {
      if (currentView !== 'home') {
        navigateTo('home');
        setTimeout(() => {
          const el = document.getElementById(hashId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hashId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTo(view);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1726]/95 backdrop-blur-md border-b border-[#243B53]/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-10 h-10 rounded-md bg-[#102A43] border border-[#243B53] flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:bg-[#1A365D] transition-colors">
              <Star className="w-5 h-5 fill-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                  {branding.websiteName.toUpperCase().includes('KEN PAXTON') ? 'KEN PAXTON' : branding.websiteName}
                </span>
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-sm bg-[#D4AF37]/20 text-[#D4AF37]">
                  OFFICIAL
                </span>
              </div>
              <div className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                {branding.tagline ? 'TEXAS INITIATIVE' : 'FOR TEXAS'}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-300">
            <button 
              onClick={() => handleNavClick('home')}
              className={`hover:text-white transition-colors py-1 ${currentView === 'home' ? 'text-white font-semibold border-b-2 border-[#D4AF37]' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('home', 'about')}
              className="hover:text-white transition-colors py-1"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('home', 'how-it-works')}
              className="hover:text-white transition-colors py-1"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('home', 'calculator')}
              className="hover:text-white transition-colors py-1 flex items-center gap-1 text-[#D4AF37] font-semibold"
            >
              8× Calculator
            </button>
            <button 
              onClick={() => handleNavClick('home', 'faq')}
              className="hover:text-white transition-colors py-1"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavClick('home', 'contact')}
              className="hover:text-white transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#243B53] hover:border-gray-500 bg-[#13253A] text-xs font-medium text-white transition-all shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#102A43] text-[#D4AF37] flex items-center justify-center font-bold text-[10px] border border-[#243B53]">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="max-w-[110px] truncate">{user.fullName}</span>
                  {user.role === 'admin' && (
                    <span className="bg-[#D4AF37] text-[#0B1726] text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0F1E33] shadow-2xl border border-[#243B53] py-1.5 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#243B53]">
                      <p className="font-semibold text-white">{user.fullName}</p>
                      <p className="text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setUserDropdownOpen(false); navigateTo('dashboard'); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#13253A] flex items-center gap-2 text-gray-200"
                    >
                      <FileText className="w-4 h-4 text-[#D4AF37]" />
                      My Contribution Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <>
                        <button
                          onClick={() => { setUserDropdownOpen(false); navigateTo('admin'); }}
                          className="w-full text-left px-4 py-2 hover:bg-[#13253A] flex items-center gap-2 text-white font-medium"
                        >
                          <Settings className="w-4 h-4 text-[#D4AF37]" />
                          Admin Console
                        </button>
                        <button
                          onClick={() => { setUserDropdownOpen(false); openModal('crypto-manager'); }}
                          className="w-full text-left px-4 py-2 hover:bg-[#13253A] flex items-center gap-2 text-[#D4AF37]"
                        >
                          <Wallet className="w-4 h-4" />
                          Manage Crypto Addresses
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { setUserDropdownOpen(false); logout(); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-500/10 flex items-center gap-2 text-red-400 border-t border-[#243B53]"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal('auth')}
                className="px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white border border-[#243B53] hover:border-gray-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}

            {/* Prominent Contribution CTA Button */}
            <button
              onClick={() => handleNavClick('home', 'calculator')}
              className="px-5 py-2.5 rounded-lg bg-[#C5221F] hover:bg-[#A51D1A] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Contribute Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('home', 'calculator')}
              className="px-3 py-1.5 rounded-md bg-[#C5221F] text-white text-xs font-bold uppercase"
            >
              Donate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1E33] border-b border-[#243B53] px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-white rounded-md hover:bg-[#13253A]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('home', 'about')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-white rounded-md hover:bg-[#13253A]"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('home', 'how-it-works')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-white rounded-md hover:bg-[#13253A]"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('home', 'calculator')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#D4AF37] bg-[#13253A] rounded-md"
          >
            8× Contribution Calculator
          </button>
          <button 
            onClick={() => handleNavClick('home', 'faq')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-white rounded-md hover:bg-[#13253A]"
          >
            Frequently Asked Questions
          </button>
          <button 
            onClick={() => handleNavClick('home', 'contact')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-white rounded-md hover:bg-[#13253A]"
          >
            Contact
          </button>

          <div className="pt-4 border-t border-[#243B53] flex flex-col gap-2">
            {user ? (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigateTo('dashboard'); }}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-gray-300 bg-[#13253A] rounded-md"
                >
                  Contributor Dashboard ({user.fullName})
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigateTo('admin'); }}
                    className="w-full text-left py-2 px-3 text-sm font-medium text-[#D4AF37] bg-[#13253A] rounded-md"
                  >
                    Admin Console
                  </button>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); openModal('auth'); }}
                className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white border border-[#243B53] rounded-lg"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

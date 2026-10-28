import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Mail, Phone, MapPin, Settings, Wallet } from 'lucide-react';

export const Footer: React.FC = () => {
  const { branding, navigateTo, openModal, user } = useApp();

  return (
    <footer className="bg-[#080F1A] text-gray-400 border-t border-[#243B53]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#102A43] flex items-center justify-center text-[#D4AF37] border border-[#243B53]">
                <Star className="w-5 h-5 fill-[#D4AF37]" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-wider">
                {branding.websiteName}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Dedicated to constitutional leadership, fiscal accountability, and transparent civic participation. Contributions support legal defense, institutional oversight, and civic programs.
            </p>

            <div className="pt-2 text-xs text-gray-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${branding.contactEmail}`} className="hover:text-white transition-colors">
                  {branding.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{branding.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{branding.contactAddress}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => {
                  navigateTo('home');
                  setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="hover:text-white transition-colors">
                  About Initiative
                </button>
              </li>
              <li>
                <button onClick={() => {
                  navigateTo('home');
                  setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => {
                  navigateTo('home');
                  setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="hover:text-white transition-colors">
                  8× Multiplier Calculator
                </button>
              </li>
              <li>
                <button onClick={() => {
                  navigateTo('home');
                  setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Guidelines & Terms
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Program Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund-policy')} className="hover:text-white transition-colors">
                  Contribution Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contributor Portal & Crypto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contributor Access
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => user ? navigateTo('dashboard') : openModal('auth')} className="hover:text-white transition-colors">
                  My Contribution Dashboard
                </button>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <button onClick={() => openModal('crypto-manager')} className="text-[#D4AF37] hover:underline transition-colors flex items-center gap-1.5 font-semibold">
                    <Wallet className="w-3.5 h-3.5" />
                    Manage Crypto Addresses
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => openModal('support')} className="hover:text-white transition-colors">
                  Contact Support Desk
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')} 
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#D4AF37]"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean copyright row without verbose warning blocks */}
        <div className="mt-12 pt-8 border-t border-[#243B53]/50 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {branding.websiteName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>Official Portal</span>
            <span>•</span>
            <span>Cryptocurrency On-Chain Settlement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight,
  Loader2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    login, 
    loginWithGoogle,
    register, 
    resetPassword 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (activeModal !== 'auth') return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'A valid email address is required.';
    }

    if (mode === 'register') {
      if (!fullName.trim()) {
        errs.fullName = 'Full legal name is required.';
      }
      if (password.length < 6) {
        errs.password = 'Password must be at least 6 characters.';
      }
      if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match.';
      }
    } else if (mode === 'login') {
      if (!password) {
        errs.password = 'Password is required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email);
        setIsLoading(false);
        if (res.success) {
          closeModal();
        } else {
          setErrors({ form: res.error || 'Authentication failed.' });
        }
      } else if (mode === 'register') {
        const res = await register(fullName, email);
        setIsLoading(false);
        if (res.success) {
          closeModal();
        } else {
          setErrors({ form: res.error || 'Registration failed.' });
        }
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setIsLoading(false);
        setMode('login');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrors({ form: 'An unexpected authentication error occurred.' });
    }
  };

  const handleDemoSignIn = (role: 'contributor' | 'admin') => {
    if (role === 'admin') {
      login('admin@kenpaxtoninitiative.com');
    } else {
      login('contributor@example.com');
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0F1E33] text-[#E2E8F0] rounded-3xl max-w-md w-full shadow-2xl border border-[#243B53] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 relative border-b border-[#243B53]">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="font-heading text-xl font-bold text-white">
            {mode === 'login' && 'Sign In to Your Account'}
            {mode === 'register' && 'Register Contributor Account'}
            {mode === 'forgot' && 'Password Recovery'}
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            {mode === 'login' && 'Access verified contribution records and program updates.'}
            {mode === 'register' && 'Create your account to track contributions.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="bg-[#0B1726] px-6 py-3 border-b border-[#243B53] flex items-center justify-between text-xs">
          <span className="text-gray-400 font-medium">Quick Demo:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('contributor')}
              className="px-2.5 py-1 rounded-md bg-[#13253A] border border-[#243B53] hover:border-gray-400 text-gray-200 font-semibold text-[11px]"
            >
              Demo Contributor
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('admin')}
              className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0B1726] font-semibold text-[11px]"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Google Sign In via Firebase */}
        <div className="px-6 pt-5 pb-1">
          <button
            type="button"
            onClick={async () => {
              setIsLoading(true);
              setErrors({});
              const res = await loginWithGoogle();
              setIsLoading(false);
              if (res.success) {
                closeModal();
              } else if (res.error) {
                setErrors({ form: res.error });
              }
            }}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#13253A] hover:bg-[#1a3350] border border-[#243B53] text-white font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
          
          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#243B53]"></div>
            </div>
            <span className="relative bg-[#0F1E33] px-3 text-[10px] uppercase font-bold text-gray-400">
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
          
          {errors.form && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-xs text-red-300">
              {errors.form}
            </div>
          )}

          {/* Full Name (Registration only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.fullName ? 'border-red-400' : 'border-[#243B53]'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="e.g. user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                  errors.email ? 'border-red-400' : 'border-[#243B53]'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-gray-300">
                  Password <span className="text-red-400">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-semibold text-[#D4AF37] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.password ? 'border-red-400' : 'border-[#243B53]'
                  }`}
                />
              </div>
              {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password}</p>}
            </div>
          )}

          {/* Confirm Password */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-white bg-[#0B1726] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                    errors.confirmPassword ? 'border-red-400' : 'border-[#243B53]'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-red-400 mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59F27] text-[#0B1726] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0B1726]" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Register'}
                  {mode === 'forgot' && 'Send Password Reset'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Mode Switcher */}
          <div className="pt-2 text-center text-xs text-gray-400">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-[#D4AF37] hover:underline"
                >
                  Create Account
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#D4AF37] hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#D4AF37] hover:underline"
                >
                  Return to Sign In
                </button>
              </p>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};

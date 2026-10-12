'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { ShieldCheck, User, Store, LogIn, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { lang, t, loginUser, switchRoleDemo } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser({
        id: 'user-logged',
        name: email.split('@')[0],
        email: email,
        role: 'customer'
      });
      router.push('/dashboard');
    }
  };

  const handleOAuthLogin = (provider) => {
    loginUser({
      id: `oauth-${provider}`,
      name: provider === 'google' ? 'Google User' : 'GitHub User',
      email: `${provider}user@example.com`,
      role: 'customer'
    });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-900">{t('login')}</h1>
          <p className="text-xs text-slate-600">
            Website Bazer BD ড্যাশবোর্ড ও ক্রয়ে অ্যাক্সেস পেতে লগইন করুন
          </p>
        </div>

        {/* Demo Fast Login Switchers */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-2">
          <p className="font-bold text-slate-700 text-center">
            ⚡ {lang === 'bn' ? 'দ্রুত ডেমো রোল দিয়ে সাইন ইন করুন:' : 'Fast Demo Login Shortcuts:'}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => { switchRoleDemo('admin'); router.push('/admin'); }}
              className="px-2 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => { switchRoleDemo('seller'); router.push('/seller'); }}
              className="px-2 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm"
            >
              <Store className="w-3 h-3" />
              <span>Seller</span>
            </button>
            <button
              onClick={() => { switchRoleDemo('customer'); router.push('/dashboard'); }}
              className="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 shadow-sm"
            >
              <User className="w-3 h-3" />
              <span>Buyer</span>
            </button>
          </div>
        </div>

        {/* Social OAuth Login Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="w-full py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleOAuthLogin('github')}
            className="w-full py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <hr className="w-full border-slate-200" />
          <span className="absolute bg-white px-2 text-[10px] text-slate-400 font-bold uppercase">
            OR EMAIL
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">পাসওয়ার্ড</label>
              <Link href="/forgot-password" className="text-[11px] font-bold text-emerald-600 hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{t('login')}</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-600">
          নতুন ব্যবহারকারী?{' '}
          <Link href="/register" className="font-bold text-emerald-600 hover:underline">
            {t('register')} করুন
          </Link>
        </p>

      </div>
    </div>
  );
}

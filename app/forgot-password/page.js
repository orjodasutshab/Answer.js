'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { t } = useStore();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-900">পাসওয়ার্ড রিসেট</h1>
          <p className="text-xs text-slate-600">
            আপনার একাউন্টের ইমেইল এড্রেস প্রদান করুন। পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">ইমেইল পাঠানো হয়েছে!</h3>
            <p className="text-xs text-slate-600">
              {email} ঠিকানায় পাসওয়ার্ড রিসেটের লিংক পাঠানো হয়েছে। দয়া করে আপনার ইনবক্স চেক করুন।
            </p>
            <Link
              href="/login"
              className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              লগইন পেজে যান
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              রিসেট লিংক পাঠান
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

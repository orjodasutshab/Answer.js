'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  Search,
  Globe,
  ShoppingCart,
  User,
  ShieldCheck,
  Store,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const { lang, changeLang, t, user, logoutUser, switchRoleDemo } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/websites?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Bar for Demo Role Switcher & Announcements */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">
            DEMO PREVIEW
          </span>
          <span className="text-slate-300 hidden sm:inline">
            {lang === 'bn' ? 'সব ফিচার পরীক্ষা করতে যেকোনো রোল সুইচ করুন:' : 'Switch roles to test all platform features:'}
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          <span className="text-slate-400">
            {lang === 'bn' ? 'বর্তমান রোল:' : 'Current Role:'}
          </span>
          <span className="font-semibold text-emerald-400 capitalize bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {user.role}
          </span>
          <button
            onClick={() => setIsDemoMenuOpen(!isDemoMenuOpen)}
            className="flex items-center gap-1 text-slate-200 bg-emerald-600 hover:bg-emerald-500 px-2.5 py-0.5 rounded font-medium transition"
          >
            <span>{lang === 'bn' ? 'রোল পরিবর্তন' : 'Switch Role'}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {isDemoMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 p-2 text-slate-200 text-xs">
              <p className="text-[10px] text-slate-400 mb-1 px-2 font-bold uppercase">
                {lang === 'bn' ? 'টেস্ট ইউজার সিলেক্ট করুন:' : 'Select Test Role:'}
              </p>
              <button
                onClick={() => { switchRoleDemo('admin'); setIsDemoMenuOpen(false); }}
                className="w-full text-left px-2 py-1.5 hover:bg-slate-700 rounded flex items-center gap-2 text-emerald-400 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={() => { switchRoleDemo('seller'); setIsDemoMenuOpen(false); }}
                className="w-full text-left px-2 py-1.5 hover:bg-slate-700 rounded flex items-center gap-2 text-amber-400 font-medium"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Account</span>
              </button>
              <button
                onClick={() => { switchRoleDemo('customer'); setIsDemoMenuOpen(false); }}
                className="w-full text-left px-2 py-1.5 hover:bg-slate-700 rounded flex items-center gap-2 text-blue-400 font-medium"
              >
                <User className="w-3.5 h-3.5" />
                <span>Buyer/Customer</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block">
                Website <span className="text-emerald-600">Bazer BD</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">
                Digital Website Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-emerald-600 transition">
              {t('navHome')}
            </Link>
            <Link href="/websites" className="hover:text-emerald-600 transition">
              {t('navBrowse')}
            </Link>
            <Link href="/seller" className="hover:text-emerald-600 transition">
              {t('navSell')}
            </Link>
            <Link href="/contact" className="hover:text-emerald-600 transition">
              {t('navContact')}
            </Link>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => changeLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-emerald-500 bg-white text-slate-700 text-xs font-semibold transition shadow-sm"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('switchTo')}</span>
            </button>

            {/* Auth / Account Menu */}
            {user && user.role !== 'guest' ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-300">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-2 text-slate-700 text-sm">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>{t('dashboard')}</span>
                      </Link>

                      {user.role === 'seller' && (
                        <Link
                          href="/seller"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium"
                        >
                          <Store className="w-4 h-4 text-amber-600" />
                          <span>{t('sellerPanel')}</span>
                        </Link>
                      )}

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-purple-700"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>{t('adminPanel')}</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold px-3 py-2 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
                >
                  {t('register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="flex flex-col gap-2 font-medium text-slate-700 text-sm">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-slate-50 rounded-lg"
            >
              {t('navHome')}
            </Link>
            <Link
              href="/websites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-slate-50 rounded-lg"
            >
              {t('navBrowse')}
            </Link>
            <Link
              href="/seller"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-slate-50 rounded-lg"
            >
              {t('navSell')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-slate-50 rounded-lg"
            >
              {t('navContact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

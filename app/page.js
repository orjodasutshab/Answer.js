'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ListingCard from '@/components/ListingCard';
import {
  Search,
  ShoppingBag,
  Briefcase,
  User,
  FileText,
  GraduationCap,
  Code,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Download,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { lang, t, categories, listings } = useStore();
  const [heroSearch, setHeroSearch] = useState('');

  const approvedListings = listings.filter((item) => item.status === 'Approved');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/websites?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-blue-600" />;
      case 'User': return <User className="w-6 h-6 text-purple-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-amber-600" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-rose-600" />;
      default: return <Code className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">

      {/* SECTION 1: HERO BANNER */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-16 pb-20 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>{t('brandTagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {t('heroTitle')}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-slate-700">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full px-3 py-2 text-slate-900 text-sm focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0"
              >
                {lang === 'bn' ? 'সার্চ করুন' : 'Search'}
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-left sm:text-center">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-lg font-bold text-emerald-400">{t('heroStatWebsites')}</p>
              <p className="text-[11px] text-slate-400">টোটাল সোর্স কোড ও টেমপ্লেট</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-lg font-bold text-amber-400">{t('heroStatSellers')}</p>
              <p className="text-[11px] text-slate-400">দেশি ভেরিফাইড ডেভেলপার</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-lg font-bold text-blue-400">{t('heroStatCustomers')}</p>
              <p className="text-[11px] text-slate-400">সন্তুষ্ট ব্যবহারকারী</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t('categoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const catName = lang === 'bn' ? cat.nameBn : cat.nameEn;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center group flex flex-col items-center justify-between"
              >
                <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 transition mb-3">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs group-hover:text-emerald-600 transition mb-1">
                    {catName}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {cat.count} {lang === 'bn' ? 'টি ফাইল' : 'Items'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: FEATURED LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span>{lang === 'bn' ? 'পপুলার ও টপ রেটেড ওয়েবসাইট' : 'Popular & Top Rated Websites'}</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              যাচাইকৃত সোর্স কোড ও সরাসরি লাইভ ডেমো সহ প্রজেক্ট
            </p>
          </div>

          <Link
            href="/websites"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition"
          >
            <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-slate-100 py-16 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('howTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              সহজ ৪টি ধাপে আপনার প্রয়োজনীয় ওয়েবসাইট সোর্স কোড ও টেমপ্লেট সংগ্রহ করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{t('step1Title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step1Desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{t('step2Title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step2Desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{t('step3Title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step3Desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center mb-4">
                04
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{t('step4Title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SELLER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Earn With Coding
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {t('sellerCtaTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {t('sellerCtaDesc')}
            </p>
          </div>

          <Link
            href="/seller"
            className="px-6 py-3.5 bg-white text-slate-900 hover:bg-emerald-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition shrink-0 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>{t('becomeSellerBtn')}</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

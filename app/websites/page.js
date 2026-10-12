'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ListingCard from '@/components/ListingCard';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || 'all';

  const { lang, t, categories, listings } = useStore();
  const [query, setQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState('newest');

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Must be approved
      if (item.status !== 'Approved') return false;

      // Filter by Search Query
      if (query.trim()) {
        const q = query.toLowerCase();
        const titleMatch =
          (item.titleBn && item.titleBn.toLowerCase().includes(q)) ||
          (item.titleEn && item.titleEn.toLowerCase().includes(q));
        const descMatch =
          (item.shortDescBn && item.shortDescBn.toLowerCase().includes(q)) ||
          (item.shortDescEn && item.shortDescEn.toLowerCase().includes(q));
        if (!titleMatch && !descMatch) return false;
      }

      // Filter by Category
      if (selectedCategory !== 'all' && item.categorySlug !== selectedCategory) {
        return false;
      }

      // Filter by Type
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.salesCount - a.salesCount;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [listings, query, selectedCategory, selectedType, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold">{t('navBrowse')}</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          আপনার পছন্দমতো ই-কমার্স, এলএমএস, ল্যান্ডিং পেজ বা রেডি সোর্স কোড নির্বাচন করুন।
        </p>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {lang === 'bn' ? cat.nameBn : cat.nameEn}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">{lang === 'bn' ? 'সর্বশেষ প্রকাশিত' : 'Newest First'}</option>
            <option value="popular">{lang === 'bn' ? 'সর্বাধিক বিক্রি' : 'Most Popular'}</option>
            <option value="price-low">{lang === 'bn' ? 'কম মূল্য থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price-high">{lang === 'bn' ? 'বেশি মূল্য থেকে কম' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {/* Listing Type Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedType === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {lang === 'bn' ? 'সকল টাইপ' : 'All Types'}
        </button>
        <button
          onClick={() => setSelectedType('Template')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedType === 'Template'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {t('typeTemplate')}
        </button>
        <button
          onClick={() => setSelectedType('Source Code')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedType === 'Source Code'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {t('typeSourceCode')}
        </button>
        <button
          onClick={() => setSelectedType('Complete Website')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedType === 'Complete Website'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {t('typeCompleteWebsite')}
        </button>
      </div>

      {/* Grid Results */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">{t('noData')}</p>
          <p className="text-xs text-slate-500">
            আপনার ফিল্টারের সাথে মিলে এমন কোনো ওয়েবসাইট খুঁজে পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="text-center py-12 text-sm text-slate-500">Loading Marketplace...</div>}>
        <BrowseContent />
      </Suspense>
    </div>
  );
}

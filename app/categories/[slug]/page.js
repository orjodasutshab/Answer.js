'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ListingCard from '@/components/ListingCard';

export default function CategoryDetailsPage() {
  const params = useParams();
  const slug = params.slug;
  const { lang, t, categories, listings } = useStore();

  const category = categories.find((c) => c.slug === slug);
  const catName = category
    ? lang === 'bn'
      ? category.nameBn
      : category.nameEn
    : slug;

  const categoryListings = listings.filter(
    (item) => item.categorySlug === slug && item.status === 'Approved'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          {t('navCategories')}
        </span>
        <h1 className="text-3xl font-extrabold">{catName}</h1>
        <p className="text-xs text-slate-300">
          এই ক্যাটাগরিতে মোট {categoryListings.length} টি ওয়েবসাইট ও সোর্স কোড প্রজেক্ট রয়েছে।
        </p>
      </div>

      {categoryListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">{t('noData')}</p>
          <p className="text-xs text-slate-500">
            এই ক্যাটাগরিতে এখনো কোনো সক্রিয় ওয়েবসাইট যোগ করা হয়নি।
          </p>
        </div>
      )}
    </div>
  );
}

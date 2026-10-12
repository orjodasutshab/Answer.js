'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  ShieldCheck,
  Star,
  ExternalLink,
  Heart,
  ShoppingCart,
  CheckCircle2,
  FileCode,
  Layers,
  Award,
  Lock,
  ArrowLeft
} from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t, listings, favorites, toggleFavorite, categories } = useStore();

  const listing = listings.find((item) => item.id === params.id);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-lg font-bold text-slate-800">ওয়েবসাইটটি পাওয়া যায়নি!</p>
        <Link href="/websites" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          সকল ওয়েবসাইট দেখুন
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(listing.id);
  const title = lang === 'bn' ? listing.titleBn : listing.titleEn;
  const fullDesc = lang === 'bn' ? listing.fullDescBn : listing.fullDescEn;
  const category = categories.find((c) => c.slug === listing.categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'bn' ? 'ফিরে যান' : 'Go Back'}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Product Info, Screenshots & Tech Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Main Banner Image */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="relative h-72 sm:h-96 w-full bg-slate-100">
              <img
                src={listing.coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                {listing.type}
              </span>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {category ? (lang === 'bn' ? category.nameBn : category.nameEn) : listing.categorySlug}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{listing.rating} ({listing.salesCount} Sales)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {title}
              </h1>
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {lang === 'bn' ? 'বিস্তারিত বর্ণনা' : 'Description'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {fullDesc}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-600" />
                <span>{t('techStack')}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {listing.techStack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-medium rounded-xl border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Included Files */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{t('includedFiles')}</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {listing.includedFiles?.map((file, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Purchase Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 sticky top-24">

            {/* Price Header */}
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                {t('price')}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  {t('bdtSymbol')} {listing.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">BDT</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href={`/checkout/${listing.id}`}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('buyNow')}</span>
              </Link>

              {listing.demoUrl && (
                <a
                  href={listing.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 border border-slate-200"
                >
                  <ExternalLink className="w-4 h-4 text-slate-600" />
                  <span>{t('liveDemo')}</span>
                </a>
              )}

              <button
                onClick={() => toggleFavorite(listing.id)}
                className={`w-full py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                  isFav
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600' : ''}`} />
                <span>{isFav ? t('inFavorite') : t('addToFavorite')}</span>
              </button>
            </div>

            <hr className="border-slate-100" />

            {/* Seller Profile Summary */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('sellerInfo')}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                  {listing.sellerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                    {listing.sellerName}
                    {listing.isVerifiedSeller && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">Verified Marketplace Developer</p>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* License & Protection Info */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('licenseStandard')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>bKash & Nagad Verified Purchase</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

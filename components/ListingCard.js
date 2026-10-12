'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  ShoppingBag,
  Briefcase,
  User,
  FileText,
  GraduationCap,
  Code,
  ShieldCheck,
  Star,
  Eye,
  ArrowRight,
  Heart,
  Sparkles,
  Download,
  CheckCircle2,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

export default function ListingCard({ listing }) {
  const { lang, t, favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(listing.id);

  const title = lang === 'bn' ? listing.titleBn : listing.titleEn;
  const desc = lang === 'bn' ? listing.shortDescBn : listing.shortDescEn;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Listing Type Tag */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
          {listing.type}
        </span>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(listing.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isFav
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
          }`}
          title={t('addToFavorite')}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller & Rating Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              {listing.sellerName}
              {listing.isVerifiedSeller && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              )}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/websites/${listing.id}`}>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition line-clamp-2 mb-2">
              {title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {desc}
          </p>
        </div>

        {/* Footer Info: Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">
              {t('price')}
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {t('bdtSymbol')} {listing.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/websites/${listing.id}`}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title={t('viewDetails')}
            >
              <Eye className="w-4 h-4" />
            </Link>
            <Link
              href={`/checkout/${listing.id}`}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1"
            >
              <span>{t('buyNow')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

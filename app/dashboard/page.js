'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ListingCard from '@/components/ListingCard';
import {
  ShoppingBag,
  Download,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  ShieldCheck,
  User,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function UserDashboardPage() {
  const { lang, t, user, orders, favorites, listings } = useStore();

  const myOrders = orders.filter((ord) => ord.buyerId === user.id || user.role === 'admin' || user.role === 'customer');
  const myApprovedOrders = myOrders.filter((ord) => ord.status === 'Approved');
  const favoriteListings = listings.filter((item) => favorites.includes(item.id) && item.status === 'Approved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-black">{user.name || 'User Dashboard'}</h1>
            <p className="text-xs text-slate-300">{user.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider border border-emerald-500/30">
              Role: {user.role}
            </span>
          </div>
        </div>

        {user.role === 'admin' && (
          <Link
            href="/admin"
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Go to Admin Panel</span>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('totalPurchases')}
            </span>
            <span className="text-2xl font-black text-slate-900">{myOrders.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('downloadableFiles')}
            </span>
            <span className="text-2xl font-black text-slate-900">{myApprovedOrders.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('dashFavorites')}
            </span>
            <span className="text-2xl font-black text-slate-900">{favorites.length}</span>
          </div>
        </div>
      </div>

      {/* Section 1: My Orders & Verification Status */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">{t('dashOrders')}</h2>
          <span className="text-xs text-slate-500 font-medium">bKash & Nagad Order History</span>
        </div>

        {myOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">প্রজেক্ট নাম</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">পেমেন্ট</th>
                  <th className="p-3">TrxID</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">ডাউনলোড</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {myOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900">{ord.id}</td>
                    <td className="p-3 max-w-[200px] truncate">
                      {lang === 'bn' ? ord.listingTitleBn : ord.listingTitleEn}
                    </td>
                    <td className="p-3 font-bold text-slate-900">৳ {ord.amount.toLocaleString()}</td>
                    <td className="p-3 text-emerald-600 font-semibold">{ord.paymentMethod}</td>
                    <td className="p-3 font-mono text-slate-600">{ord.trxId}</td>
                    <td className="p-3">
                      {ord.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          <span>Paid & Approved</span>
                        </span>
                      )}
                      {ord.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>Pending Verification</span>
                        </span>
                      )}
                      {ord.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          <span>Rejected</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {ord.status === 'Approved' ? (
                        <a
                          href={ord.downloadUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-sm transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>ZIP Download</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          Locked (Awaiting Approval)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">আপনার কোনো অর্ডার ইতিহাস পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* Section 2: Saved Favorites */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">{t('dashFavorites')}</h2>
        {favoriteListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500">আপনার কোনো পছন্দকৃত ওয়েবসাইট নেই।</p>
          </div>
        )}
      </div>

    </div>
  );
}

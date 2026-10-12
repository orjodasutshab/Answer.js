'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Settings,
  Layers,
  PhoneCall,
  Hash,
  ShoppingBag,
  Save,
  Check
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    lang,
    t,
    orders,
    updateOrderStatus,
    listings,
    updateListingStatus,
    siteSettings,
    updateSettings
  } = useStore();

  const [activeTab, setActiveTab] = useState('payments'); // 'payments', 'listings', 'settings'

  // Settings State
  const [bkashNumber, setBkashNumber] = useState(siteSettings.bkashNumber);
  const [nagadNumber, setNagadNumber] = useState(siteSettings.nagadNumber);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Computed Pending Counts
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const pendingListings = listings.filter((l) => l.status === 'Pending');
  const totalApprovedSales = orders
    .filter((o) => o.status === 'Approved')
    .reduce((sum, o) => sum + o.amount, 0);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({ bkashNumber, nagadNumber });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg border border-purple-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              {t('adminPanel')} Control Hub
            </span>
          </div>
          <h1 className="text-2xl font-black">Website Bazer BD Administration</h1>
          <p className="text-xs text-slate-300">
            বিকাশ/নগদ পেমেন্ট ভেরিফিকেশন, সেলার প্রজেক্ট মডারেশন এবং ওয়েবসাইট কনফিগারেশন।
          </p>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('pendingPaymentsCount')}
            </span>
            <span className="text-2xl font-black text-slate-900">{pendingOrders.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              পেন্ডিং লিস্টিং
            </span>
            <span className="text-2xl font-black text-slate-900">{pendingListings.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ভেরিফাইড মোট আয়
            </span>
            <span className="text-2xl font-black text-slate-900">৳ {totalApprovedSales.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('totalUsers')}
            </span>
            <span className="text-2xl font-black text-slate-900">1,240</span>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-6">
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 transition border-b-2 flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{t('dashVerifyPayments')}</span>
          {pendingOrders.length > 0 && (
            <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {pendingOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition border-b-2 flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>লিস্টিং মডারেশন Center</span>
          {pendingListings.length > 0 && (
            <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full">
              {pendingListings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 transition border-b-2 flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{t('dashSiteSettings')}</span>
        </button>
      </div>

      {/* TAB 1: PAYMENT VERIFICATION CENTER */}
      {activeTab === 'payments' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              bKash & Nagad Transaction ID Verification
            </h2>
            <span className="text-xs text-slate-500">
              যাচাই করে Approve দিলে ক্রেতার ড্যাশবোর্ডে সোর্স কোড ডাউনলোড লিংক দৃশ্যমান হবে।
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">ক্রেতা নাম</th>
                  <th className="p-3">প্রজেক্ট</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">পেমেন্ট মেথড</th>
                  <th className="p-3">সেন্ডার নম্বর</th>
                  <th className="p-3">Transaction ID (TrxID)</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">এডমিন অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900">{ord.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{ord.buyerName}</td>
                    <td className="p-3 max-w-[180px] truncate">{ord.listingTitleBn}</td>
                    <td className="p-3 font-bold text-slate-900">৳ {ord.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`font-bold ${ord.paymentMethod === 'bKash' ? 'text-[#e2136e]' : 'text-[#f7931e]'}`}>
                        {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-800">{ord.senderMobile}</td>
                    <td className="p-3 font-mono font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">
                      {ord.trxId}
                    </td>
                    <td className="p-3">
                      {ord.status === 'Approved' && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Approved
                        </span>
                      )}
                      {ord.status === 'Pending' && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                          Pending
                        </span>
                      )}
                      {ord.status === 'Rejected' && (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {ord.status !== 'Approved' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Approved')}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition"
                        >
                          Approve Payment
                        </button>
                      )}
                      {ord.status !== 'Rejected' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Rejected')}
                          className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[10px] rounded-lg transition"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LISTING MODERATION */}
      {activeTab === 'listings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900">
            সেলার সাবমিট করা প্রজেক্ট অনুমোদন প্যানেল
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-3">প্রজেক্ট</th>
                  <th className="p-3">সেলার</th>
                  <th className="p-3">টাইপ</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">মডারেশন অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                      <img src={item.coverImage} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="line-clamp-1">{item.titleBn}</p>
                        <span className="text-[10px] text-slate-400">{item.categorySlug}</span>
                      </div>
                    </td>
                    <td className="p-3">{item.sellerName}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3 font-bold text-slate-900">৳ {item.price.toLocaleString()}</td>
                    <td className="p-3">
                      {item.status === 'Approved' && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Live on Marketplace
                        </span>
                      )}
                      {item.status === 'Pending' && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Pending Moderation
                        </span>
                      )}
                      {item.status === 'Rejected' && (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {item.status !== 'Approved' && (
                        <button
                          onClick={() => updateListingStatus(item.id, 'Approved')}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm transition"
                        >
                          Approve Listing
                        </button>
                      )}
                      {item.status !== 'Rejected' && (
                        <button
                          onClick={() => updateListingStatus(item.id, 'Rejected')}
                          className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[10px] rounded-lg transition"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SITE SETTINGS (BKASH / NAGAD NUMBERS) */}
      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-2xl">
          <h2 className="text-lg font-black text-slate-900 border-b pb-3">
            পেমেন্ট নম্বর ও গ্লোবাল সাইট সেটিংস
          </h2>

          {settingsSaved && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>সেটিংস সফলভাবে আপডেট হয়েছে!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                bKash Merchant / Personal Number
              </label>
              <input
                type="text"
                required
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nagad Personal Number
              </label>
              <input
                type="text"
                required
                value={nagadNumber}
                onChange={(e) => setNagadNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>সেটিংস সেভ করুন</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

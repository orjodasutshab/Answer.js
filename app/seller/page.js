'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import {
  Store,
  PlusCircle,
  FileCode,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SellerDashboardPage() {
  const { lang, t, user, listings, addListing, categories } = useStore();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'new'

  // New Listing Form State
  const [form, setForm] = useState({
    titleBn: '',
    titleEn: '',
    type: 'Source Code',
    categorySlug: 'ecommerce',
    price: '',
    shortDescBn: '',
    shortDescEn: '',
    fullDescBn: '',
    fullDescEn: '',
    techStack: 'Next.js, Tailwind CSS, PostgreSQL',
    includedFiles: 'Source Code (.zip), Documentation',
    demoUrl: 'https://demo.example.com',
    coverImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    downloadUrl: 'https://cdn.websitebazerbd.com/downloads/sample-listing.zip'
  });

  const sellerListings = listings.filter(
    (item) => item.sellerId === user.id || user.role === 'admin' || user.role === 'seller'
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.titleBn || !form.price) return;

    const newListing = {
      id: `listing-${Date.now()}`,
      slug: form.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '-') || `item-${Date.now()}`,
      titleBn: form.titleBn,
      titleEn: form.titleEn || form.titleBn,
      type: form.type,
      categorySlug: form.categorySlug,
      price: Number(form.price),
      sellerId: user.id || 'seller-1',
      sellerName: user.name || 'ThemeLooks BD',
      isVerifiedSeller: true,
      rating: 5.0,
      salesCount: 0,
      shortDescBn: form.shortDescBn,
      shortDescEn: form.shortDescEn || form.shortDescBn,
      fullDescBn: form.fullDescBn,
      fullDescEn: form.fullDescEn || form.fullDescBn,
      techStack: form.techStack.split(',').map((s) => s.trim()),
      includedFiles: form.includedFiles.split(',').map((s) => s.trim()),
      demoUrl: form.demoUrl,
      downloadUrl: form.downloadUrl,
      coverImage: form.coverImage,
      screenshots: [form.coverImage],
      status: 'Pending', // Requires Admin Approval
      createdAt: new Date().toISOString().split('T')[0]
    };

    addListing(newListing);
    setActiveTab('listings');
    alert('আপনার প্রজেক্ট সফলভাবে আপলোড করা হয়েছে! এডমিন প্যানেল থেকে অনুমোদনের পর মার্কেটপ্লেসে প্রকাশিত হবে।');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Seller Header */}
      <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-8 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t('sellerPanel')}
            </span>
          </div>
          <h1 className="text-2xl font-black">{user.name || 'Seller Dashboard'}</h1>
          <p className="text-xs text-slate-300">
            আপনার ওয়েবসাইট সোর্স কোড ও টেমপ্লেট বিক্রি করুন এবং আয় ট্র্যাক করুন।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('new')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('dashNewListing')}</span>
        </button>
      </div>

      {/* Seller Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('activeListings')}
            </span>
            <span className="text-2xl font-black text-slate-900">{sellerListings.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('totalSales')}
            </span>
            <span className="text-2xl font-black text-slate-900">355 Items</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('totalRevenue')}
            </span>
            <span className="text-2xl font-black text-slate-900">৳ ৮,৭৫,০০০</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition border-b-2 ${
            activeTab === 'listings'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('dashListings')} ({sellerListings.length})
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`pb-3 transition border-b-2 ${
            activeTab === 'new'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('dashNewListing')}
        </button>
      </div>

      {/* Tab 1: Seller Listing Table */}
      {activeTab === 'listings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          {sellerListings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="p-3">প্রজেক্ট</th>
                    <th className="p-3">টাইপ</th>
                    <th className="p-3">মূল্য</th>
                    <th className="p-3">বিক্রি</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {sellerListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                        <img src={item.coverImage} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="line-clamp-1">{lang === 'bn' ? item.titleBn : item.titleEn}</p>
                          <span className="text-[10px] text-slate-400">{item.categorySlug}</span>
                        </div>
                      </td>
                      <td className="p-3">{item.type}</td>
                      <td className="p-3 font-bold text-slate-900">৳ {item.price.toLocaleString()}</td>
                      <td className="p-3">{item.salesCount} Sales</td>
                      <td className="p-3">
                        {item.status === 'Approved' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            <span>Approved (Live)</span>
                          </span>
                        )}
                        {item.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>Pending Moderation</span>
                          </span>
                        )}
                        {item.status === 'Rejected' && (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-500">{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">আপনার কোনো লিস্টিং নেই। নতুন প্রজেক্ট আপলোড করুন।</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Add New Listing Form */}
      {activeTab === 'new' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900 border-b pb-3">
            নতুন ওয়েবসাইট বা সোর্স কোড তথ্য পূরণ করুন
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  শিরোনাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={form.titleBn}
                  onChange={(e) => setForm({ ...form, titleBn: e.target.value })}
                  placeholder="যেমন: কার্টলি মাল্টিভেন্ডর ই-কমার্স সাইট"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="e.g. Kartly Multivendor eCommerce"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">প্রোডাক্ট টাইপ</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Template">Template</option>
                  <option value="Source Code">Source Code</option>
                  <option value="Complete Website">Complete Website</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={form.categorySlug}
                  onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {lang === 'bn' ? c.nameBn : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  মূল্য (BDT ৳) *
                </label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="2500"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
              <textarea
                rows={2}
                value={form.shortDescBn}
                onChange={(e) => setForm({ ...form, shortDescBn: e.target.value })}
                placeholder="প্রজেক্টের মূল হাইলাইট..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                টেকনোলজি স্ট্যাক (কমা দিয়ে লিখুন)
              </label>
              <input
                type="text"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                placeholder="Next.js, Node.js, Tailwind CSS, PostgreSQL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">কভার ইমেজ লিংক (URL)</label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">লাইভ ডেমো ইউআরএল</label>
                <input
                  type="text"
                  value={form.demoUrl}
                  onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>প্রজেক্ট সাবমিট করুন</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import {
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Clock,
  PhoneCall,
  Hash
} from 'lucide-react';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t, listings, user, siteSettings, addOrder } = useStore();

  const listing = listings.find((item) => item.id === params.id);

  const [paymentMethod, setPaymentMethod] = useState('bKash'); // bKash or Nagad
  const [senderMobile, setSenderMobile] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-lg font-bold text-slate-800">অর্ডার করার জন্য ওয়েবসাইট পাওয়া যায়নি!</p>
        <Link href="/websites" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          ওয়েবসাইট সমূহ দেখুন
        </Link>
      </div>
    );
  }

  const activeNumber =
    paymentMethod === 'bKash' ? siteSettings.bkashNumber : siteSettings.nagadNumber;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!senderMobile || !trxId) return;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      listingId: listing.id,
      listingTitleBn: listing.titleBn,
      listingTitleEn: listing.titleEn,
      amount: listing.price,
      buyerId: user.id || 'guest-user',
      buyerName: user.name || 'Guest Buyer',
      paymentMethod,
      senderMobile,
      trxId: trxId.trim().toUpperCase(),
      status: 'Pending',
      downloadUrl: listing.downloadUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addOrder(newOrder);
    setSubmittedOrder(newOrder);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {submittedOrder ? (
        /* Order Confirmation & Pending Verification Message */
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {t('status')}: Pending Verification
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              {t('paymentPendingTitle')}
            </h1>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              {t('paymentPendingDesc')}
            </p>
          </div>

          {/* Submitted Order Summary Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto text-xs">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">অর্ডার আইডি:</span>
              <span className="font-bold text-slate-900">{submittedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">পেমেন্ট মেথড:</span>
              <span className="font-bold text-emerald-600">{submittedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">সেন্ডার মোবাইল:</span>
              <span className="font-bold text-slate-900">{submittedOrder.senderMobile}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-bold text-purple-700 font-mono">{submittedOrder.trxId}</span>
            </div>
              <div className="flex justify-between pt-1">
              <span className="text-slate-500">মোট মূল্য:</span>
              <span className="font-extrabold text-slate-900 text-sm">৳ {submittedOrder.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/dashboard/orders"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>আমার অর্ডার দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/websites"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              মার্কেটপ্লেসে ফিরুন
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Order Summary Side Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
                {t('orderSummary')}
              </h2>

              <div className="flex items-start gap-3">
                <img
                  src={listing.coverImage}
                  alt={listing.titleBn}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-2">
                    {lang === 'bn' ? listing.titleBn : listing.titleEn}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {listing.type}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>সাবটোটাল:</span>
                  <span>৳ {listing.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>সার্ভিস ফি:</span>
                  <span className="text-emerald-600 font-bold">ফ্রি (৳ ০)</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t pt-2">
                  <span>সর্বমোট:</span>
                  <span>৳ {listing.price.toLocaleString()} BDT</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>নিরাপদ ম্যানুয়াল বিকাশ ও নগদ পেমেন্ট গেটওয়ে</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions & Form */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{t('checkoutTitle')}</h1>
              <p className="text-xs text-slate-600 mt-1">
                নিচের যে কোনো একটি বিডি ওয়ালেট মেথড সিলেক্ট করে পেমেন্ট সম্পূর্ণ করুন।
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('selectPaymentMethod')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition ${
                    paymentMethod === 'bKash'
                      ? 'border-[#e2136e] bg-[#e2136e]/5 text-[#e2136e]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span>bKash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition ${
                    paymentMethod === 'Nagad'
                      ? 'border-[#f7931e] bg-[#f7931e]/5 text-[#f7931e]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span>Nagad</span>
                </button>
              </div>
            </div>

            {/* Payment Instructions Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
              <p className="text-xs text-slate-300">
                {paymentMethod === 'bKash' ? t('bkashInstruction') : t('nagadInstruction')}
              </p>

              {/* Number Display & Copy */}
              <div className="flex items-center justify-between bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                    {paymentMethod} Official Number
                  </span>
                  <span className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
                    {activeNumber}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('copied') : t('copyNumber')}</span>
                </button>
              </div>

              <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                <li>সরাসরি ৳ {listing.price.toLocaleString()} টাকা সেন্ড মানি বা ক্যাশ আউট করুন।</li>
                <li>টাকা পাঠানোর পর প্রাপ্ত মেসেজ থেকে TrxID কপি করে নিচের ফর্মে বসান।</li>
              </ul>
            </div>

            {/* Submission Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('senderMobile')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={senderMobile}
                    onChange={(e) => setSenderMobile(e.target.value)}
                    placeholder={t('enterSenderMobile')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('trxId')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder={t('enterTrxId')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{t('submitPayment')}</span>
              </button>
            </form>

          </div>

        </div>
      )}
    </div>
  );
}

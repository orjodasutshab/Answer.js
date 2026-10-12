'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function RefundPage() {
  const { t } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 border-b pb-4">{t('refund')}</h1>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700">
          <p>
            যেহেতু ওয়েবসাইট টেমপ্লেট ও সোর্স কোড সরাসরি ডিজিটাল ফাইল হিসেবে ইনস্ট্যান্ট ডাউনলোডের সুযোগ দেওয়া হয়, সেহেতু কিছু নির্দিষ্ট শর্ত সাপেক্ষে রিফান্ড পলিসি কার্যকর হবে।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">১. কখন রিফান্ড পাওয়ার যোগ্য?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>যদি ক্রয়কৃত ফাইলটি সম্পূর্ণ কাজ না করে এবং বিবরণীর সাথে কোনো মিল না থাকে।</li>
            <li>যদি সোর্স কোডে বড় ধরনের টেকনিক্যাল এরর বা মিসিং ফাইল থাকে যা সেলার সমাধান করতে ব্যর্থ হয়।</li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm pt-2">২. কখন রিফান্ড প্রযোজ্য নয়?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>ভুলবশত প্রোডাক্ট অর্ডার করলে অথবা ডাউনলোডের পর আর প্রয়োজন না থাকলে।</li>
            <li>যদি ওয়েবসাইট লাইভ সার্ভারে সেটআপ করার মতো ন্যূনতম টেকনিক্যাল জ্ঞান বা হোস্টিং এনভায়রনমেন্ট ক্রেতার না থাকে।</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

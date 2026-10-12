'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function PrivacyPage() {
  const { t } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 border-b pb-4">{t('privacy')}</h1>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700">
          <p>
            Website Bazer BD ব্যবহারকারীদের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা প্রদানে প্রতিশ্রুতিবদ্ধ।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">১. আমরা কী তথ্য সংগ্রহ করি?</h3>
          <p>
            আপনার নাম, ইমেইল এড্রেস, পেমেন্ট সাবমিশনের সেন্ডার মোবাইল নম্বর এবং ট্রানজেকশন আইডি সংক্রান্ত তথ্য অর্ডার প্রসেসিংয়ের জন্য সংরক্ষিত থাকে।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">২. তথ্যের ব্যবহার</h3>
          <p>
            আপনার তথ্য শুধুমাত্র আপনার কেনা পণ্যের ডাউনলোড লিংক নিশ্চিত করতে, পেমেন্ট ভেরিফাই করতে এবং প্রয়োজনীয় কাস্টমার সাপোর্ট দিতে ব্যবহৃত হয়।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">৩. থার্ড পার্টি শেয়ারিং</h3>
          <p>
            আমরা কোনো তৃতীয় পক্ষের কাছে ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রি বা শেয়ার করি না।
          </p>
        </div>
      </div>
    </div>
  );
}

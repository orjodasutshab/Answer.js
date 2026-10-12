'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export default function TermsPage() {
  const { t } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 border-b pb-4">{t('terms')}</h1>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700">
          <p>
            Website Bazer BD প্ল্যাটফর্মে আপনাকে স্বাগতম। এই মার্কেটপ্লেসটি ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলী মেনে নিতে সম্মত হচ্ছেন।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">১. একাউন্ট এবং নিরাপত্তা</h3>
          <p>
            ইউজারদের সঠিক তথ্য দিয়ে একাউন্ট তৈরি করতে হবে। আপনার একাউন্টের পাসওয়ার্ড ও ট্রানজেকশনের গোপনীয়তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">২. ফাইল ও লাইসেন্স ব্যবহারের নীতি</h3>
          <p>
            ক্রয়কৃত যে কোনো সোর্স কোড বা ওয়েবসাইটের ক্ষেত্রে স্ট্যান্ডার্ড কমার্শিয়াল লাইসেন্স প্রযোজ্য। বিনা অনুমতিতে কেনা ফাইল সর্বসাধারণের জন্য পুনঃবিতরণ বা বিনামূল্যে অনলাইনে আপলোড করা নিষিদ্ধ।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">৩. সেলার নীতি ও লিস্টিং</h3>
          <p>
            সেলারগণ কেবল নিজেদের তৈরি বা বৈধ অধিকারভুক্ত প্রজেক্ট আপলোড করতে পারবেন। কোনো পাইরেটেড বা ক্ষতিকারক কোড সংবলিত লিস্টিং সাথে সাথে ডিলিট করা হবে এবং সেলার একাউন্ট ব্যান করা হবে।
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2">৪. পেমেন্ট ও এডমিন ভেরিফিকেশন</h3>
          <p>
            বিকাশ ও নগদ ম্যানুয়াল পেমেন্টের ক্ষেত্রে সঠিক মোবাইল নম্বর ও ট্রানজেকশন আইডি (TrxID) প্রদান বাধ্যতামূলক। ভুল তথ্য দিয়ে একাধিকবার পেমেন্ট সাবমিট করলে একাউন্ট স্থগিত হতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
}

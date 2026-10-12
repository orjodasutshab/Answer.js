'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Sparkles, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const { t, siteSettings } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">
                Website <span className="text-emerald-400">Bazer BD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerDesc')}
            </p>

            {/* Payment Partners Badge */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Accepted Manual Payments
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-[#e2136e] text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm">
                  bKash
                </div>
                <div className="bg-[#f7931e] text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm">
                  Nagad
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/websites" className="hover:text-emerald-400 transition">
                  {t('navBrowse')}
                </Link>
              </li>
              <li>
                <Link href="/websites?type=Template" className="hover:text-emerald-400 transition">
                  {t('typeTemplate')}
                </Link>
              </li>
              <li>
                <Link href="/websites?type=Source+Code" className="hover:text-emerald-400 transition">
                  {t('typeSourceCode')}
                </Link>
              </li>
              <li>
                <Link href="/seller" className="hover:text-emerald-400 transition">
                  {t('navSell')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition">
                  {t('dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              {t('supportAndPolicy')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  {t('navContact')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-emerald-400 transition">
                  {t('refund')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Help Desk
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.supportEmail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('copyright')}</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Bangladeshi Web Developers & Sellers
          </p>
        </div>
      </div>
    </footer>
  );
}

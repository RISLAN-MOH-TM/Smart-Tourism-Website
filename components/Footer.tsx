'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import Image from 'next/image';
import { Shield, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { messages } = useLanguage();
  const { rates } = useCurrency();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-700 flex-shrink-0 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Smart Tourism Sri Lanka Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                {messages.nav.brand}
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {messages.footer.aboutText}
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <p>
                <strong className="text-stone-400">FX Status:</strong> {rates.source} (As of {rates.date})
              </p>
              <p className="italic">
                {messages.currency.indicativeNotice}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Pages */}
          <div>
            <h4 className="font-serif text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.packages}
                </Link>
              </li>
              <li>
                <Link href="/trip-planner" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.tripPlanner}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.destinations}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.reviews}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  {messages.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h4 className="font-serif text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Featured Citadels & Coasts
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link
                  href="/destinations/sigiriya"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sigiriya Ancient Citadel
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/ella"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Ella Highlands & Nine Arches
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/galle"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Galle Fort Maritime Bastion
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/mirissa"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Mirissa Coast & Blue Whales
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div>
            <h4 className="font-serif text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Colombo Tourism Hub
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Level 4, Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a
                  href={`mailto:${messages.footer.email}`}
                  className="hover:text-white transition-colors"
                >
                  {messages.footer.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>+94 11 243 7050</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-stone-800/80 px-3 py-1.5 rounded border border-stone-700"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Staff & Admin Portal
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 {messages.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

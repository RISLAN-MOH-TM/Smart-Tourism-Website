'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { trackEnquiryClick } from '@/lib/analytics';
import { MapPin, Globe2, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { messages } = useLanguage();

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden">
      {/* Authentic Background Photo with Traditional Tone Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1920&q=85')",
        }}
      >
        <div className="absolute inset-0 bg-stone-950/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {messages.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-tight mb-6">
            {messages.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {messages.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="#destinations"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded shadow transition-colors text-sm sm:text-base"
            >
              {messages.hero.exploreCta}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#enquiry"
              onClick={() => trackEnquiryClick('General', 'hero_cta')}
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-stone-900 font-semibold px-6 py-3.5 rounded border border-stone-200 shadow transition-colors text-sm sm:text-base"
            >
              {messages.hero.enquireCta}
            </Link>
          </div>
        </div>

        {/* Traditional Stat Strip */}
        <div className="mt-16 pt-8 border-t border-stone-700/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                Verified Highlights
              </p>
              <p className="font-serif text-base font-bold text-white">
                {messages.hero.statDestinations}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15">
              <Globe2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                Global Accessibility
              </p>
              <p className="font-serif text-base font-bold text-white">
                {messages.hero.statLanguages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15">
              <CreditCard className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                Transparent Pricing
              </p>
              <p className="font-serif text-base font-bold text-white">
                {messages.hero.statCurrencies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


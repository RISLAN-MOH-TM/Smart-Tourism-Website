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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{messages.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-tight mb-5">
            {messages.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm xs:text-base sm:text-xl text-stone-200 font-normal leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            {messages.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold px-6 py-3.5 rounded shadow-sm transition-colors text-sm sm:text-base text-center"
            >
              <span>{messages.hero.exploreCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#enquiry"
              onClick={() => trackEnquiryClick('General', 'hero_cta')}
              className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white active:bg-stone-100 text-stone-900 font-semibold px-6 py-3.5 rounded border border-stone-200 shadow-sm transition-colors text-sm sm:text-base text-center"
            >
              {messages.hero.enquireCta}
            </Link>
          </div>
        </div>

        {/* Traditional Stat Strip */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-stone-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15 flex-shrink-0">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-300 font-medium">
                Verified Highlights
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                {messages.hero.statDestinations}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15 flex-shrink-0">
              <Globe2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-300 font-medium">
                Global Accessibility
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                {messages.hero.statLanguages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-white/10 border border-white/15 flex-shrink-0">
              <CreditCard className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-300 font-medium">
                Transparent Pricing
              </p>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                {messages.hero.statCurrencies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

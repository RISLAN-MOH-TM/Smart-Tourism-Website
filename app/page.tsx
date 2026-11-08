'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DestinationCard } from '@/components/DestinationCard';
import { WhyVisit } from '@/components/WhyVisit';
import { SriLankaMap } from '@/components/SriLankaMap';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Footer } from '@/components/Footer';
import { DESTINATIONS } from '@/lib/destinations';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Sparkles, Info, MapPin } from 'lucide-react';

export default function HomePage() {
  const { messages } = useLanguage();
  const { rates } = useCurrency();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Popular Destinations Section */}
        <section id="destinations" className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {messages.destinations.sectionBadge}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
                {messages.destinations.sectionTitle}
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                {messages.destinations.sectionSubtitle}
              </p>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            {/* Rate Source Notice */}
            <div className="mt-8 p-3.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-500 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>{messages.destinations.indicativeRateNotice}</span>
              </div>
              <span className="font-medium text-stone-600">
                Rate Source: {rates.source} ({rates.date})
              </span>
            </div>
          </div>
        </section>

        {/* Why Visit Sri Lanka */}
        <WhyVisit />

        {/* Interactive Google Map of Sri Lanka Main Places */}
        <section className="py-20 bg-stone-100 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                Geographic Highlights
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
                Main Places Across Sri Lanka
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Pinpoint our UNESCO heritage citadels, tea highland passes, and southern marine reserves on the interactive live Google Map.
              </p>
            </div>

            <SriLankaMap />
          </div>
        </section>

        {/* Enquiry Section */}
        <EnquiryForm />
      </main>

      <Footer />
    </>
  );
}

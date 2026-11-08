'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Destination } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { trackDestinationView, trackEnquiryClick } from '@/lib/analytics';
import {
  MapPin,
  Calendar,
  Sun,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  Compass,
} from 'lucide-react';

interface DestinationDetailClientProps {
  destination: Destination;
}

export default function DestinationDetailClient({
  destination,
}: DestinationDetailClientProps) {
  const { messages } = useLanguage();
  const { formatPrice, rates } = useCurrency();

  useEffect(() => {
    if (destination) {
      trackDestinationView(destination.name, destination.category);
    }
  }, [destination]);

  const details =
    messages.items[destination.slug as keyof typeof messages.items] || {
      name: destination.name,
      category: destination.category,
      tagline: '',
      description: '',
      duration: '1-2 Days',
      season: 'Year-round',
      highlights: [],
    };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Destinations</span>
            </Link>
            <span className="text-stone-400 hidden sm:inline">
              Sri Lanka &gt; {destination.category} &gt; {details.name}
            </span>
          </div>
        </div>

        {/* Hero Banner with Authentic Photography */}
        <section className="relative h-80 sm:h-[450px] w-full bg-stone-900">
          <Image
            src={destination.heroImage}
            alt={details.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-stone-950/45" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10 text-white">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              {details.category}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
              {details.name}
            </h1>
            <p className="text-stone-200 text-sm sm:text-lg max-w-2xl font-light">
              {details.tagline}
            </p>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Cols: Description, Location & Highlights */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                  Overview & Experience
                </h2>
                <p className="text-stone-700 text-base leading-relaxed mb-6 whitespace-pre-line">
                  {details.description}
                </p>

                {/* Info strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200 text-sm">
                  <div className="flex items-center gap-2.5 text-stone-700">
                    <MapPin className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-400 uppercase font-bold">
                        Location
                      </span>
                      <span className="font-medium">{destination.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-stone-700">
                    <Calendar className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-400 uppercase font-bold">
                        {messages.destinations.idealDuration}
                      </span>
                      <span className="font-medium">{details.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-stone-700">
                    <Sun className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-400 uppercase font-bold">
                        {messages.destinations.bestTimeToVisit}
                      </span>
                      <span className="font-medium">{details.season}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">
                  {messages.destinations.keyHighlights}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.highlights.map((highlight: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3.5 bg-stone-50 rounded border border-stone-200 text-sm text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Booking / Inquiry Sidebar */}
            <div>
              <div className="sticky top-28 bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    {messages.destinations.startingFrom}
                  </span>
                  <div className="text-3xl font-bold font-serif text-emerald-900">
                    {formatPrice(destination.priceLKR)}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-stone-400" />
                    Per adult / Private guided excursion
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 space-y-1">
                  <p className="font-medium text-stone-800">
                    Rate Reference: {rates.source}
                  </p>
                  <p>{messages.destinations.indicativeRateNotice}</p>
                </div>

                <Link
                  href={`/#enquiry?destination=${encodeURIComponent(details.name)}`}
                  onClick={() =>
                    trackEnquiryClick(details.name, 'destination_detail_sidebar')
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3.5 px-4 rounded text-sm transition-colors shadow-sm"
                >
                  <span>{messages.destinations.bookEnquiry}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-xs text-stone-500 space-y-2 pt-2 border-t border-stone-200">
                  <p>✓ Dedicated licensed English-speaking chauffeur & guide</p>
                  <p>✓ Transparent quotes in LKR, USD, GBP, or JPY</p>
                  <p>✓ Flexible customisation available upon request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


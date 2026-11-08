'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DESTINATIONS } from '@/lib/destinations';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Compass,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  Info,
  Sun,
  CheckCircle,
} from 'lucide-react';

export default function AllDestinationsPage() {
  const { formatPrice, rates } = useCurrency();
  const { messages } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Heritage & Culture',
    'Nature & Adventure',
    'History & Coastal Culture',
    'Beach & Marine Experiences',
  ];

  const filteredDestinations = DESTINATIONS.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Banner */}
        <section className="bg-stone-900 text-white py-16 sm:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1920&q=85')",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Discover Ceylon
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Explore Sri Lanka Destinations
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              From soaring 5th-century citadel fortresses and mist-wrapped tea hills to centuries-old colonial bastions and golden ocean shores.
            </p>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-200">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs sm:text-sm px-4 py-2 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-800" />
              <span>Indicative rates ({rates.source})</span>
            </div>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-8">
            {filteredDestinations.map((destination) => {
              const item =
                messages.items[destination.slug as keyof typeof messages.items] || {
                  name: destination.name,
                  category: destination.category,
                  tagline: '',
                  description: '',
                  duration: '1-2 Days',
                  season: 'Year-round',
                };

              return (
                <article
                  key={destination.id}
                  className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="relative h-64 sm:h-full min-h-[220px] bg-stone-200">
                      <Image
                        src={destination.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-stone-900/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-stone-500 font-medium mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                          <span>{destination.location}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                          {item.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                          {item.description || item.tagline}
                        </p>

                        <div className="space-y-1.5 text-xs text-stone-500 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span>
                              <strong>Ideal stay:</strong> {item.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-stone-400" />
                            <span>
                              <strong>Best weather:</strong> {item.season}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                        <div>
                          <span className="block text-[10px] text-stone-400 uppercase font-semibold">
                            Starting from
                          </span>
                          <span className="font-serif text-lg font-bold text-emerald-900">
                            {formatPrice(destination.priceLKR)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs font-semibold">
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="inline-flex items-center justify-center gap-1 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 py-2 rounded transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-emerald-800" />
                      <span>View Full Guide</span>
                    </Link>

                    <Link
                      href={`/#enquiry?destination=${encodeURIComponent(item.name || destination.name)}`}
                      className="inline-flex items-center justify-center gap-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2 rounded transition-colors shadow-sm"
                    >
                      <span>Enquire for Tour</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

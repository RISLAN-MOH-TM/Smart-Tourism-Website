'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Calendar,
  MapPin,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface TourPackage {
  id: string;
  title: string;
  duration: string;
  category: 'Cultural' | 'Wildlife' | 'Coastal' | 'Grand Tour';
  priceLKR: number;
  image: string;
  destinations: string[];
  highlights: string[];
  idealFor: string;
}

const PACKAGES: TourPackage[] = [
  {
    id: 'pkg-cultural-hills',
    title: '7-Day Cultural Heritage & Highland Mist',
    duration: '7 Days / 6 Nights',
    category: 'Cultural',
    priceLKR: 85000,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
    destinations: ['Sigiriya', 'Dambulla', 'Kandy', 'Nuwara Eliya', 'Ella'],
    highlights: [
      'Climb UNESCO Sigiriya Lion Rock at sunrise',
      'Sacred Temple of the Tooth & cultural Kandyan dance',
      'Scenic highland blue train through mist-clad tea valleys',
      'Tea plucking & tasting in a heritage Ceylon tea factory',
      'Hike to Little Adam’s Peak and Nine Arches Bridge',
    ],
    idealFor: 'Couples, history lovers & photography enthusiasts',
  },
  {
    id: 'pkg-grand-tour',
    title: '10-Day All-Island Grand Discovery',
    duration: '10 Days / 9 Nights',
    category: 'Grand Tour',
    priceLKR: 145000,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80',
    destinations: ['Negombo', 'Sigiriya', 'Kandy', 'Ella', 'Yala', 'Mirissa', 'Galle Fort'],
    highlights: [
      'Comprehensive journey combining heritage, wildlife & coast',
      'Jeep safari in Yala National Park for wild leopards & elephants',
      'Ocean cruise to see blue whales in Mirissa',
      'Sunset walks atop Galle Fort 17th-century ramparts',
      'Private air-conditioned chauffeur throughout the island',
    ],
    idealFor: 'First-time visitors wanting the complete Sri Lankan experience',
  },
  {
    id: 'pkg-southern-safari',
    title: '5-Day Southern Coast, Whales & Wildlife',
    duration: '5 Days / 4 Nights',
    category: 'Coastal',
    priceLKR: 65000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    destinations: ['Galle Fort', 'Mirissa Coast', 'Weligama', 'Yala'],
    highlights: [
      'Deep sea whale and dolphin expedition with marine biologists',
      'Leisurely days at secluded golden sand crescent beaches',
      'Beginner surf lessons at Weligama bay coral breaks',
      'Historic colonial architecture and seafood dinners in Galle Fort',
      'Evening game drive in Yala leopard sanctuary',
    ],
    idealFor: 'Beach vacationers, marine enthusiasts & families',
  },
  {
    id: 'pkg-ancient-kingdoms',
    title: '4-Day Ancient Kingdoms & UNESCO Highlights',
    duration: '4 Days / 3 Nights',
    category: 'Cultural',
    priceLKR: 48000,
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1000&q=80',
    destinations: ['Anuradhapura', 'Sigiriya', 'Polonnaruwa', 'Dambulla'],
    highlights: [
      'Immersion into Sri Lanka’s 2,500-year royal chronicles',
      'Sigiriya rock fortress & ancient hydraulic engineering gardens',
      'Dambulla golden rock cave monasteries with 150+ Buddha statues',
      'Cycling through Polonnaruwa medieval royal palace ruins',
      'Traditional village bullock cart ride and authentic organic lunch',
    ],
    idealFor: 'Archaeology enthusiasts & short-stay travelers',
  },
];

export default function PackagesPage() {
  const { formatPrice, rates } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPackages = PACKAGES.filter(
    (pkg) => selectedCategory === 'All' || pkg.category === selectedCategory
  );

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Header Banner */}
        <section className="bg-stone-900 text-white py-16 sm:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Handcrafted Ceylon Itineraries
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Curated Sri Lanka Tour Packages
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Carefully designed multi-day journeys combining luxury boutique stays, licensed private chauffeur-guides, and immersive cultural encounters.
            </p>
          </div>
        </section>

        {/* Filters & Rate Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-200">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Cultural', 'Coastal', 'Grand Tour'].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs sm:text-sm px-4 py-2 rounded font-medium transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Currency conversion info */}
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-800" />
              <span>Prices displayed in selected currency ({rates.source})</span>
            </div>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Photo & Duration */}
                  <div className="relative h-64 w-full bg-stone-200">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/85 text-white text-xs font-semibold px-3 py-1 rounded">
                      {pkg.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-3 py-1 rounded shadow-sm flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                      {pkg.title}
                    </h3>

                    {/* Route */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-4 flex-wrap">
                      <MapPin className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                      <span>Route:</span>
                      {pkg.destinations.map((d, i) => (
                        <span key={i} className="inline-flex items-center">
                          <strong className="text-stone-700">{d}</strong>
                          {i < pkg.destinations.length - 1 && (
                            <span className="mx-1 text-stone-400">→</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                        Included Highlights
                      </span>
                      {pkg.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-stone-700"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span>
                        <strong>Best for:</strong> {pkg.idealFor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer / Price & CTA */}
                <div className="p-6 pt-4 border-t border-stone-200 bg-stone-50/50 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                      Starting Price (Per Adult)
                    </span>
                    <span className="font-serif text-2xl font-bold text-emerald-900">
                      {formatPrice(pkg.priceLKR)}
                    </span>
                  </div>

                  <Link
                    href={`/#enquiry?destination=${encodeURIComponent(pkg.title)}`}
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded transition-colors shadow-sm"
                  >
                    <span>Enquire for This Tour</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


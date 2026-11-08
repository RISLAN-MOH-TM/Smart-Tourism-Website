'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Compass,
  Landmark,
  ShieldCheck,
  Globe2,
  TreePine,
  Coffee,
  Waves,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Banner */}
        <section className="bg-stone-900 text-white py-16 sm:py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              The Pearl of the Indian Ocean
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              About Sri Lanka & Smart Tourism
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              A teardrop-shaped island blessed with immense cultural depth, extraordinary biodiversity, and centuries-old traditions of warm hospitality.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                Living Heritage
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 leading-snug">
                Over 2,500 Years of Royal Chronicles & UNESCO Wonders
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Sri Lanka is an ancient land where historical epics and royal dynasties shaped vast stone irrigation tanks, sacred stupas rising into the clouds, and monumental rock citadels.
              </p>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Despite its compact geographic footprint, the island boasts eight UNESCO World Heritage Sites. From the architectural and hydraulic marvel of Sigiriya Rock Fortress to the living colonial ramparts of Galle Fort, visitors can journey through millennia of human ingenuity within short travel times.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-stone-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>8 UNESCO World Heritage Sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-emerald-700" />
                  <span>Multilingual Cultural Sanctuary</span>
                </div>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden border border-stone-300 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"
                alt="Sigiriya Citadel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Pillars of the Ceylon Experience */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                Pillars of the Sri Lankan Experience
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                What makes this island a world-renowned destination for thoughtful travelers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  The Ceylon Tea Legacy
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Introduced in the 19th century, Ceylon tea is renowned globally for its distinct aroma, crafted across misty high-elevation plantations in Nuwara Eliya, Ella, and Kandy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <TreePine className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  Extraordinary Wildlife Density
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Home to the highest density of wild leopards in Yala, vast Asian elephant gatherings in Minneriya, and the marine superhighways frequented by blue whales and spinner dolphins.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Waves className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  1,340 km of Tropical Coast
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Year-round tropical sunshine, golden crescent bays, coconut-fringed promontories, and gentle beginner to intermediate surf breaks across Mirissa, Weligama, and Bentota.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Mission Note */}
          <div className="bg-white p-8 rounded-lg border border-stone-300 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-100 text-emerald-900 rounded border border-stone-200 flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Smart Tourism Project Mission
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Smart Tourism Sri Lanka is developed as an academic discovery platform demonstrating responsive multilingual accessibility (English, Tamil, Sinhala, Simplified Chinese, and Japanese), transparent multi-currency calculation, and ethical data-driven marketing tracking via Google Tag Manager and GA4.
                </p>
                <div className="pt-3">
                  <Link
                    href="/destinations"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>Browse Our Featured Destination Guides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


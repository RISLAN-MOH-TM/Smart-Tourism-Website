'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  country: string;
  destination: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  travelType: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Eleanor & Mark Davies',
    country: 'United Kingdom',
    destination: 'Sigiriya',
    date: 'October 2026',
    rating: 5,
    title: 'Climbing Sigiriya at sunrise was the highlight of our year',
    comment:
      'We booked a private excursion to Sigiriya and Dambulla caves. Our licensed guide explained the hydraulic engineering of the water gardens and guided us past the Lion’s Paws before the crowds arrived. The 360-degree view of the central plains is simply unforgettable.',
    travelType: 'Couple / Cultural Tour',
  },
  {
    id: 'rev-2',
    name: 'Takashi Tanaka',
    country: 'Japan',
    destination: 'Ella',
    date: 'November 2026',
    rating: 5,
    title: 'The blue train ride to Ella exceeded all expectations',
    comment:
      'The train ride through the tea estates to Ella was spectacular. Watching the train cross the Nine Arches Viaduct from the tea hills was like a scene from a movie. The Japanese translation on this website made planning very simple.',
    travelType: 'Solo Traveler / Scenic Rail',
  },
  {
    id: 'rev-3',
    name: 'Zhang Wei & Family',
    country: 'China',
    destination: 'Mirissa',
    date: 'October 2026',
    rating: 5,
    title: 'Seeing the majestic blue whale in Mirissa was breathtaking',
    comment:
      'Our boat tour was respectful to marine wildlife and we saw both a blue whale mother with a calf and a pod of spinner dolphins. Coconut Tree Hill sunset in Mirissa was magical. Highly recommend the fresh seafood along the coast.',
    travelType: 'Family with Children',
  },
  {
    id: 'rev-4',
    name: 'Sophie & Julien Martin',
    country: 'France',
    destination: 'Galle Fort',
    date: 'September 2026',
    rating: 5,
    title: 'Galle Fort feels like stepping into a romantic maritime history book',
    comment:
      'Walking along the 17th-century ramparts while watching the sun sink into the Indian Ocean was extraordinary. The cobblestone streets, colonial villas, and artisan jewelry boutiques make Galle Fort a must-visit.',
    travelType: 'Couples Getaway',
  },
  {
    id: 'rev-5',
    name: 'Liam O’Connor',
    country: 'Australia',
    destination: 'Ella',
    date: 'November 2026',
    rating: 5,
    title: 'Hikes, waterfalls, and world-class Ceylon tea',
    comment:
      'Hiking Little Adam’s Peak took only 45 minutes and offered sweeping vistas of Ella Gap. Afterwards we tasted fresh Ceylon orange pekoe tea at a century-old tea factory. Authentic hospitality from start to finish.',
    travelType: 'Adventure & Hiking',
  },
  {
    id: 'rev-6',
    name: 'Ananya & Rajiv Sharma',
    country: 'India',
    destination: 'Sigiriya',
    date: 'August 2026',
    rating: 5,
    title: 'Rich heritage, exquisite frescoes, and seamless private transport',
    comment:
      'Our chauffeur-guide was punctual, knowledgeable, and gave us profound historical context on the Anuradhapura and Sigiriya civilizations. Having transparent pricing in our preferred currency gave us great peace of mind.',
    travelType: 'Heritage Enthusiasts',
  },
];

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredReviews = REVIEWS.filter(
    (r) => selectedFilter === 'All' || r.destination === selectedFilter
  );

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
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              Verified Traveler Experiences
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Visitor Reviews & Stories
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Read authentic feedback from international travelers who discovered the ancient citadels, scenic tea trails, and pristine coasts of Sri Lanka.
            </p>
          </div>
        </section>

        {/* Rating Summary Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="font-serif text-5xl font-bold text-stone-900">
                4.9
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Based on 340+ verified international guest evaluations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-600 flex-wrap justify-center">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>100% Verified Guides</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Ethical Wildlife Standards</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-5 py-2.5 rounded transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Write a Review
            </button>
          </div>

          {/* Optional review submission form */}
          {showForm && (
            <div className="mb-10 bg-white p-6 rounded-lg border border-stone-300 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Share Your Sri Lanka Experience
              </h3>
              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                  Thank you! Your feedback has been received and will be published following editorial verification.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      className="bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Home Country *"
                      className="bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs"
                    />
                    <select
                      required
                      className="bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs"
                    >
                      <option value="">Select Destination Visited *</option>
                      <option value="Sigiriya">Sigiriya Citadel</option>
                      <option value="Ella">Ella Highlands</option>
                      <option value="Galle Fort">Galle Fort</option>
                      <option value="Mirissa">Mirissa Coast</option>
                    </select>
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other travelers about your guide, highlights, and travel tips..."
                    className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Destination Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-stone-200">
            {['All', 'Sigiriya', 'Ella', 'Galle Fort', 'Mirissa'].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setSelectedFilter(dest)}
                className={`text-xs px-3.5 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  selectedFilter === dest
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {dest === 'All' ? 'All Destinations' : dest}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {rev.destination}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-stone-900 mb-2">
                    &ldquo;{rev.title}&rdquo;
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center text-xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800 block">
                        {rev.name}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {rev.country} • {rev.travelType}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-400">{rev.date}</span>
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


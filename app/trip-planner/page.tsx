'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Compass,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  Users,
  Send,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export default function TripPlannerPage() {
  const { formatPrice } = useCurrency();

  const [duration, setDuration] = useState('7-9 Days');
  const [style, setStyle] = useState('Heritage & Nature Discovery');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Sigiriya',
    'Ella',
    'Galle Fort',
  ]);
  const [travelers, setTravelers] = useState(2);
  const [accommodation, setAccommodation] = useState('Boutique & Heritage Villas (4-Star)');

  // Contact form submission state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleDestination = (dest: string) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  // Estimate price dynamically based on duration and destinations
  const estimatedDays = duration === '3-5 Days' ? 4 : duration === '7-9 Days' ? 8 : 12;
  const baseCostPerDayLKR = 11500;
  const calculatedEstimateLKR = estimatedDays * baseCostPerDayLKR * (travelers > 2 ? 0.85 : 1);

  const handlePlannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!userName.trim() || !userEmail.trim()) {
      setSubmitError('Please enter your full name and email address.');
      return;
    }

    setSubmitting(true);
    try {
      const summaryMessage = `Custom Trip Planner Request:
- Duration: ${duration}
- Travel Style: ${style}
- Destinations: ${selectedDestinations.join(', ')}
- Accommodation: ${accommodation}
- Group Size: ${travelers} Travelers
- Additional Notes: ${customNotes || 'None'}`;

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
          destination: `Custom Tour: ${selectedDestinations.join(' - ')}`,
          message: summaryMessage,
          guests: travelers,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit itinerary inquiry.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('An error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-stone-50 pb-20">
        {/* Banner */}
        <section className="bg-stone-900 text-white py-14 sm:py-16 text-center px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              Tailor-Made Ceylon Travel
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
              Custom Sri Lanka Trip Planner
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Design your personalized journey across Sri Lanka in 4 simple steps. Our local travel specialists will construct a private itinerary tailored to your dates and preferences.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Step Selection Form (2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Duration */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    How long do you plan to travel?
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['3-5 Days', '7-9 Days', '10-13 Days', '14+ Days'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDuration(opt)}
                      className={`p-3 rounded border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                        duration === opt
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                          : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Travel Style */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    What is your preferred travel style?
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Heritage & Nature Discovery', desc: 'Ancient UNESCO ruins, tea plantations & scenic trains' },
                    { title: 'Coastal Sanctuary & Whales', desc: 'Southern beaches, surfing, marine life & sunset ramparts' },
                    { title: 'Wildlife Safari & Adventure', desc: 'Yala leopard drives, elephant corridors & misty peaks' },
                    { title: 'Luxury & Wellness Retreat', desc: 'Ayurvedic treatments, private villas & leisurely pace' },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setStyle(item.title)}
                      className={`p-3.5 rounded border text-left transition-all cursor-pointer ${
                        style === item.title
                          ? 'bg-emerald-50 border-emerald-800 ring-1 ring-emerald-800'
                          : 'bg-stone-50 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <p className="font-semibold text-xs sm:text-sm text-stone-900 mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Destinations */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Which places would you like to include?
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mb-4">
                  Select all that interest you (tap to toggle)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'Sigiriya Citadel',
                    'Ella Highlands',
                    'Galle Dutch Fort',
                    'Mirissa Beach',
                    'Kandy Temple',
                    'Nuwara Eliya',
                    'Yala National Park',
                    'Colombo Capital',
                  ].map((place) => {
                    const active = selectedDestinations.includes(place);
                    return (
                      <button
                        key={place}
                        type="button"
                        onClick={() => toggleDestination(place)}
                        className={`p-2.5 rounded border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            active ? 'text-emerald-200' : 'text-stone-300'
                          }`}
                        />
                        <span>{place}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Group & Hotel Preferences */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Travel Party & Accommodation
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Travelers Count
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 2)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-sm text-stone-900"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Traveler (Solo)' : 'Travelers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Accommodation Standard
                    </label>
                    <select
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-sm text-stone-900"
                    >
                      <option value="Comfort 3-Star Selected Hotels">
                        Comfort 3-Star Selected Hotels
                      </option>
                      <option value="Boutique & Heritage Villas (4-Star)">
                        Boutique & Heritage Villas (4-Star)
                      </option>
                      <option value="Luxury 5-Star Resorts & Tea Bungalows">
                        Luxury 5-Star Resorts & Tea Bungalows
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Dynamic Summary & Lead Submission (1 Col) */}
            <div>
              <div className="sticky top-28 bg-white p-6 rounded-lg border border-stone-300 shadow-sm space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    Custom Plan Estimate
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    Your Personalized Itinerary
                  </h4>
                </div>

                <div className="text-xs space-y-2.5 p-3.5 bg-stone-50 rounded border border-stone-200 text-stone-700">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Duration:</span>
                    <strong className="text-stone-900">{duration}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Style:</span>
                    <strong className="text-stone-900 truncate max-w-[170px]">
                      {style}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Party:</span>
                    <strong className="text-stone-900">{travelers} Guests</strong>
                  </div>
                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-stone-500 block mb-1">Route:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedDestinations.map((d) => (
                        <span
                          key={d}
                          className="bg-white border border-stone-300 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Indicative Price */}
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                    Estimated Starting Range (Per Person)
                  </span>
                  <div className="text-2xl font-bold font-serif text-emerald-900">
                    {formatPrice(calculatedEstimateLKR)}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Includes private chauffeur, vehicle, accommodation & daily breakfast.
                  </p>
                </div>

                {/* Submission Form */}
                {submitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                    <h5 className="font-serif font-bold text-stone-900 text-sm">
                      Itinerary Request Sent!
                    </h5>
                    <p className="text-xs text-stone-600">
                      Our destination specialist will finalize your custom day-by-day plan and quote within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePlannerSubmit} className="space-y-3 pt-2 border-t border-stone-200">
                    <span className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Request This Custom Plan
                    </span>

                    {submitError && (
                      <div className="p-2 text-xs bg-red-50 border border-red-200 rounded text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Full Name *"
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />

                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Your Email Address *"
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />

                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (Optional)"
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />

                    <textarea
                      rows={2}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Any specific sights or special requests?"
                      className="w-full bg-stone-50 border border-stone-300 rounded px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs py-3 px-4 rounded transition-colors shadow-sm disabled:bg-stone-400 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {submitting ? 'Submitting Request...' : 'Get My Custom Quote'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


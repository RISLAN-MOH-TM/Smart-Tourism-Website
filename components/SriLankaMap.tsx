'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Compass, ExternalLink, Star } from 'lucide-react';

interface SriLankaPlace {
  id: string;
  name: string;
  category: string;
  region: string;
  coordinates: string;
  description: string;
  query: string;
  slug?: string;
}

export const MAIN_PLACES: SriLankaPlace[] = [
  {
    id: 'sigiriya',
    name: 'Sigiriya Ancient Citadel',
    category: 'UNESCO Heritage & Ancient Fortress',
    region: 'Central Province / Cultural Triangle',
    coordinates: '7.9570° N, 80.7603° E',
    description: '5th-century palace in the sky with world-renowned frescoes, mirror wall, and royal water gardens.',
    query: 'Sigiriya Ancient Rock Fortress Sri Lanka',
    slug: 'sigiriya',
  },
  {
    id: 'ella',
    name: 'Ella & Nine Arches Bridge',
    category: 'Nature, Tea Highlands & Railways',
    region: 'Badulla District, Uva Province',
    coordinates: '6.8728° N, 81.0461° E',
    description: 'Iconic colonial viaduct enveloped in cloud forest, Little Adam’s Peak, and panoramic hiking trails.',
    query: 'Nine Arches Bridge Ella Sri Lanka',
    slug: 'ella',
  },
  {
    id: 'galle',
    name: 'Galle Dutch Fort',
    category: 'Living Colonial History & Coast',
    region: 'Southern Province',
    coordinates: '6.0269° N, 80.2170° E',
    description: 'Intact 17th-century European fortress overlooking the Indian Ocean with cobblestone streets & lighthouse.',
    query: 'Galle Fort Sri Lanka',
    slug: 'galle',
  },
  {
    id: 'mirissa',
    name: 'Mirissa Coast & Marine Reserve',
    category: 'Beach, Blue Whales & Surfing',
    region: 'Southern Province',
    coordinates: '5.9482° N, 80.4571° E',
    description: 'Golden sand crescent bay, Coconut Tree Hill viewpoint, and ethical ocean blue whale watching.',
    query: 'Mirissa Beach Sri Lanka',
    slug: 'mirissa',
  },
  {
    id: 'kandy',
    name: 'Kandy Sacred City',
    category: 'Royal Capital & Temple of the Tooth',
    region: 'Central Province',
    coordinates: '7.2906° N, 80.6337° E',
    description: 'Last royal kingdom of Ceylon, home to the sacred Relic of the tooth of Buddha and lush botanical gardens.',
    query: 'Temple of the Sacred Tooth Relic Kandy Sri Lanka',
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya (Tea Country)',
    category: 'Colonial Hill Retreat & Waterfalls',
    region: 'Central Province',
    coordinates: '6.9497° N, 80.7891° E',
    description: 'High elevation hill station famed for emerald Ceylon tea estates, Lake Gregory, and cool misty climate.',
    query: 'Nuwara Eliya Sri Lanka',
  },
  {
    id: 'colombo',
    name: 'Colombo Hub & Head Office',
    category: 'Commercial Capital & Tourism Hub',
    region: 'Western Province',
    coordinates: '6.9271° N, 79.8612° E',
    description: 'Vibrant coastal gateway, national museums, Dutch hospital shopping precinct, and tourism central desk.',
    query: 'Galle Face Green Colombo Sri Lanka',
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    category: 'Wildlife Safari & Leopard Sanctuary',
    region: 'Southern & Uva Provinces',
    coordinates: '6.3714° N, 81.5204° E',
    description: 'Premier wildlife park boasting the world’s highest density of wild leopards, elephants, and coastal lagoons.',
    query: 'Yala National Park Sri Lanka',
  },
];

export const SriLankaMap: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<SriLankaPlace>(MAIN_PLACES[0]);

  // Google Maps embed URL dynamically focusing on the selected place query or whole island
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedPlace.query
  )}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white rounded-lg border border-stone-300 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-800 text-white rounded">
            <Compass className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
              Interactive Sri Lanka Map & Key Landmarks
            </h3>
            <p className="text-xs text-stone-500">
              Select any premier destination below to pinpoint on the live map
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-emerald-700" />
          <span>Active: {selectedPlace.name}</span>
        </div>
      </div>

      {/* Place Selector Pills - optimized for touch on iPhone / Android */}
      <div className="p-3 bg-stone-50 border-b border-stone-200 overflow-x-auto flex items-center gap-2 touch-pan-x overscroll-x-contain">
        {MAIN_PLACES.map((place) => {
          const isSelected = selectedPlace.id === place.id;
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => setSelectedPlace(place)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-900'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              <MapPin className={`w-3 h-3 ${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`} />
              <span>{place.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Map + Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Live Google Map Embed */}
        <div className="lg:col-span-2 relative h-[300px] sm:h-[400px] lg:h-[460px] w-full bg-stone-200">
          <iframe
            title={`Map of ${selectedPlace.name}`}
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Selected Place Detail Sidebar */}
        <div className="p-5 sm:p-6 bg-stone-50 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col justify-between">
          <div>
            <div className="inline-block text-[11px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded mb-2">
              {selectedPlace.category}
            </div>

            <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-1">
              {selectedPlace.name}
            </h4>

            <p className="text-xs text-stone-500 font-medium mb-4 flex items-center gap-1 flex-wrap">
              <Navigation className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
              <span>{selectedPlace.region}</span>
              <span>•</span>
              <span className="font-mono">{selectedPlace.coordinates}</span>
            </p>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
              {selectedPlace.description}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-2">
            {selectedPlace.slug ? (
              <Link
                href={`/destinations/${selectedPlace.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold py-2.5 px-4 rounded transition-colors shadow-sm"
              >
                <span>View Full Destination Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            ) : null}

            <Link
              href={`/#enquiry?destination=${encodeURIComponent(selectedPlace.name)}`}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold py-2 px-4 rounded transition-colors"
            >
              <span>Enquire for a Tour Here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

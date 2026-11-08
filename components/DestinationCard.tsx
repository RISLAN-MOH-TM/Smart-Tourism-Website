'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { trackDestinationSelect, trackEnquiryClick } from '@/lib/analytics';
import { MapPin, ArrowRight, Calendar, Compass } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { formatPrice } = useCurrency();
  const { messages } = useLanguage();

  const itemDetails =
    messages.items[destination.slug as keyof typeof messages.items] || {
      name: destination.name,
      category: destination.category,
      tagline: '',
      duration: '1-2 Days',
    };

  return (
    <article className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Real Destination Photography */}
      <div className="relative h-56 w-full bg-stone-200 overflow-hidden">
        <Image
          src={destination.image}
          alt={itemDetails.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded">
          {itemDetails.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-800" />
            <span>{destination.location}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 leading-snug">
            {itemDetails.name}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-3 mb-4 leading-relaxed">
            {itemDetails.tagline}
          </p>
        </div>

        {/* Footer Area: Price & Actions */}
        <div className="pt-4 border-t border-stone-100 mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="block text-[11px] text-stone-500 uppercase font-medium">
                {messages.destinations.startingFrom}
              </span>
              <span className="text-lg font-bold text-emerald-900 font-serif">
                {formatPrice(destination.priceLKR)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{itemDetails.duration}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/destinations/${destination.slug}`}
              onClick={() => trackDestinationSelect(itemDetails.name)}
              className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              {messages.destinations.viewDetails}
            </Link>

            <Link
              href={`/#enquiry?destination=${encodeURIComponent(destination.slug)}`}
              onClick={() => trackEnquiryClick(itemDetails.name, 'card_button')}
              className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-2 rounded transition-colors shadow-sm"
            >
              <span>{messages.destinations.bookEnquiry}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};


'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Landmark, Mountain, Waves, HeartHandshake, ShieldCheck } from 'lucide-react';

const icons = [Landmark, Mountain, Waves, HeartHandshake];

export const WhyVisit: React.FC = () => {
  const { messages } = useLanguage();

  return (
    <section id="why-visit" className="py-20 bg-stone-100 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-stone-200 text-stone-800 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            {messages.whyVisit.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            {messages.whyVisit.title}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {messages.whyVisit.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {messages.whyVisit.cards.map((card, idx) => {
            const IconComponent = icons[idx] || Landmark;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-emerald-50 text-emerald-900 flex items-center justify-center mb-5 border border-emerald-100">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


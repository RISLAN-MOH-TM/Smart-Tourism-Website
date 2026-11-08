'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/lib/types';
import { Banknote } from 'lucide-react';

const currencies: Currency[] = ['LKR', 'USD', 'GBP', 'JPY'];

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Banknote className="w-4 h-4 text-emerald-800" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="bg-white border border-stone-300 rounded px-2 py-1 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 hover:border-emerald-700 cursor-pointer transition-colors shadow-sm"
        aria-label="Select Currency"
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};


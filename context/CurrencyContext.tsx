'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/lib/types';
import { trackCurrencyChange } from '@/lib/analytics';
import {
  ExchangeRates,
  FALLBACK_RATES,
  convertFromLKR,
  formatCurrency,
} from '@/lib/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: ExchangeRates;
  formatPrice: (amountLKR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'LKR',
  setCurrency: () => {},
  rates: FALLBACK_RATES,
  formatPrice: (amount) => `LKR ${amount.toLocaleString()}`,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<Currency>('LKR');
  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);

  useEffect(() => {
    const saved = localStorage.getItem('tourism_currency') as Currency;
    if (saved && ['LKR', 'USD', 'GBP', 'JPY'].includes(saved)) {
      setCurrencyState(saved);
    }

    // Fetch exchange rates from internal API route
    fetch('/api/exchange-rates')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setRates(data);
        }
      })
      .catch((err) => {
        console.warn('Using fallback exchange rates:', err);
      });
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tourism_currency', curr);
      trackCurrencyChange(curr);
    }
  };

  const formatPrice = (amountLKR: number): string => {
    const converted = convertFromLKR(amountLKR, currency, rates);
    return formatCurrency(converted, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rates, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);


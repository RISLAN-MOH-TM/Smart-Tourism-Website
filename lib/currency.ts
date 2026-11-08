import { Currency } from './types';

export interface ExchangeRates {
  date: string;
  source: string;
  isFallback: boolean;
  rates: Record<Currency, number>; // value of 1 LKR in target currency
}

export const FALLBACK_RATES: ExchangeRates = {
  date: '2026-11-08',
  source: 'Central Bank Reference Rates (Indicative)',
  isFallback: true,
  rates: {
    LKR: 1,
    USD: 1 / 305, // 1 USD ~ 305 LKR
    GBP: 1 / 395, // 1 GBP ~ 395 LKR
    JPY: 1 / 2.02, // 1 JPY ~ 2.02 LKR
  },
};

export function convertFromLKR(
  amountInLKR: number,
  targetCurrency: Currency,
  rates: ExchangeRates = FALLBACK_RATES
): number {
  const rate = rates.rates[targetCurrency] || 1;
  return amountInLKR * rate;
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: string = 'en-US'
): string {
  try {
    const fractionDigits = currency === 'JPY' || currency === 'LKR' ? 0 : 2;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}


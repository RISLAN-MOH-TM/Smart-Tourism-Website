import { NextResponse } from 'next/server';
import { FALLBACK_RATES } from '@/lib/currency';

export async function GET() {
  try {
    // Attempt to fetch fresh rates from European Central Bank / Frankfurter API
    // If not reachable or error, gracefully return FALLBACK_RATES
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=GBP,JPY', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      // Calculate rates relative to LKR: 1 USD ~ 305 LKR
      const lkrPerUsd = 305;
      const gbpPerUsd = data.rates?.GBP || 0.78;
      const jpyPerUsd = data.rates?.JPY || 152;

      return NextResponse.json({
        date: data.date || FALLBACK_RATES.date,
        source: 'Frankfurter API / Reference FX',
        isFallback: false,
        rates: {
          LKR: 1,
          USD: 1 / lkrPerUsd,
          GBP: gbpPerUsd / lkrPerUsd,
          JPY: jpyPerUsd / lkrPerUsd,
        },
      });
    }
  } catch {
    // Graceful fallback
  }

  return NextResponse.json(FALLBACK_RATES);
}


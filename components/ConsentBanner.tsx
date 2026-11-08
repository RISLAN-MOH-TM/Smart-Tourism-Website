'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { setAnalyticsConsent, CONSENT_KEY } from '@/lib/analytics';
import { ShieldCheck, X } from 'lucide-react';

export const ConsentBanner: React.FC = () => {
  const { messages } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAnswered = localStorage.getItem(CONSENT_KEY);
    if (!hasAnswered) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setVisible(false);
  };

  return (
    <aside
      aria-label="Consent Notice"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-stone-900/95 text-stone-200 border-t border-stone-800 shadow-2xl backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            <span className="font-semibold text-white block sm:inline mr-2">
              {messages.consent.title}:
            </span>
            {messages.consent.message}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleDecline}
            className="text-xs font-medium text-stone-300 hover:text-white px-3 py-2 rounded border border-stone-700 hover:border-stone-500 transition-colors"
          >
            {messages.consent.decline}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded transition-colors shadow-sm"
          >
            {messages.consent.accept}
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-stone-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};


'use client';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = 'tourism_consent_accepted';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, granted ? 'true' : 'false');
  if (granted) {
    pushDataLayerEvent('consent_update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  } else {
    pushDataLayerEvent('consent_update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    });
  }
}

export function pushDataLayerEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

// Track destination view
export function trackDestinationView(destinationName: string, category: string): void {
  pushDataLayerEvent('view_destination', {
    destination_name: destinationName,
    destination_category: category,
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: destinationName,
      content_category: category,
    });
  }
}

// Track destination card selection
export function trackDestinationSelect(destinationName: string): void {
  pushDataLayerEvent('select_destination', {
    destination_name: destinationName,
  });
}

// Track language switch
export function trackLanguageChange(languageCode: string): void {
  pushDataLayerEvent('language_change', {
    language: languageCode,
  });
}

// Track currency switch
export function trackCurrencyChange(currencyCode: string): void {
  pushDataLayerEvent('currency_change', {
    currency: currencyCode,
  });
}

// Track click on Enquiry button
export function trackEnquiryClick(destinationName?: string, location?: string): void {
  pushDataLayerEvent('click_enquiry', {
    destination_name: destinationName || 'General',
    button_location: location || 'navbar_or_hero',
  });
}

// Track valid lead submission (DO NOT send email or personal name)
export function trackLeadGenerated(destinationName: string): void {
  pushDataLayerEvent('generate_lead', {
    destination_name: destinationName,
    form_type: 'tourism_enquiry_form',
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: destinationName,
    });
  }
}


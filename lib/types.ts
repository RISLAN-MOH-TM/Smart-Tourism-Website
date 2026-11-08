export type Language = 'en' | 'ta' | 'si' | 'zh' | 'ja';

export type Currency = 'LKR' | 'USD' | 'GBP' | 'JPY';

export interface Destination {
  slug: string;
  id: string;
  name: string;
  category: string;
  priceLKR: number;
  image: string;
  heroImage: string;
  location: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Closed';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  destination: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  phone?: string;
  travel_date?: string;
  guests?: number;
}


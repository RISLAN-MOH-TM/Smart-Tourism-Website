import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    slug: 'sigiriya',
    id: 'sigiriya',
    name: 'Sigiriya Ancient Citadel',
    category: 'Heritage & Culture',
    priceLKR: 12000,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1800&q=85',
    location: 'Matale District, Central Province'
  },
  {
    slug: 'ella',
    id: 'ella',
    name: 'Ella & Highlands',
    category: 'Nature & Adventure',
    priceLKR: 8000,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1800&q=85',
    location: 'Badulla District, Uva Province'
  },
  {
    slug: 'galle',
    id: 'galle',
    name: 'Galle Fort',
    category: 'History & Coastal Culture',
    priceLKR: 10000,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1566296517004-220e93cb2835?auto=format&fit=crop&w=1800&q=85',
    location: 'Galle District, Southern Province'
  },
  {
    slug: 'mirissa',
    id: 'mirissa',
    name: 'Mirissa Coast',
    category: 'Beach & Marine Experiences',
    priceLKR: 15000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85',
    location: 'Matara District, Southern Province'
  }
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}


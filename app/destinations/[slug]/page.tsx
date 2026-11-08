import { DESTINATIONS, getDestinationBySlug } from '@/lib/destinations';
import { notFound } from 'next/navigation';
import DestinationDetailClient from './DestinationDetailClient';

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({
    slug: d.slug,
  }));
}

export default function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  return <DestinationDetailClient destination={destination} />;
}

import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Image } from '.prisma/client';

interface MetadataType {
  title?: string;
  productId?: string;
  description?: string | null;
  keywords?: string[];
  images?: Image[] | null | undefined;
}

export default function customMetadataGenerator({
  title = 'Digital Marketing',
  description = 'a Digital Marketing for ...',
  images = undefined,
  keywords = ['digital', 'shopping', 'marketing', 'laptop', 'mobile'],
  productId = '',
}: MetadataType): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      url: `http://localhost:3000/products/${productId}`,
      type: 'website',
      images,
    } as OpenGraph,
  };
}

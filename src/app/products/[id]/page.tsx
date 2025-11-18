import { Metadata } from 'next';
import ProductDetail from '@/modules/products/components/ProductDetail';
import { getProductById } from '@/modules/products/services';
import { ProductWithImages } from '@/types';
import customMetadataGenerator from '@/lib/metadata';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = params;
  const product = (await getProductById(id)) as ProductWithImages | null;

  if (!product) {
    return customMetadataGenerator({ title: 'not found' });
  }

  return customMetadataGenerator({
    title: product?.name,
    description: product?.description,
    images: product?.images,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = (await getProductById(id)) as ProductWithImages;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.length && product.images[0].image,
    brand: {
      '@type': 'Brand',
      name: 'Digital Marketing',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail {...product} />
    </section>
  );
}

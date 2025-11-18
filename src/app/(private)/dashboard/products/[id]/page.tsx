import ProductDetailView from '@/modules/products/views/ProductDetailView';
import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      other components
      <Suspense fallback={<Spinner />}>
        <ProductDetailView id={id} />
      </Suspense>
    </div>
  );
}

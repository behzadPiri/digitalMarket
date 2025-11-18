'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';
import CatalogList from '@/components/catalog/List';
import { useSearchParams } from 'next/navigation';

export default function Catalog() {
  const params = useSearchParams();
  const id = params.get('id');

  return (
    <div className="flex flex-col items-center mx-auto my-4">
      <CatalogList />
      <Button asChild>
        <Link href="/products">Back to product list</Link>
      </Button>
    </div>
  );
}

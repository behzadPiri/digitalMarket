'use client';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ProductWithImages } from '@/types';
import { useCart } from '@/hooks/useCart';

export default function ProductDetail(product: ProductWithImages) {
  const { addToCartMutation } = useCart();
  return (
    <div className="container mx-auto my-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {product?.images.length > 0 ? (
                <Image
                  width={500}
                  height={500}
                  quality={50}
                  property="1"
                  alt={product?.name}
                  className="rounded-lg"
                  src={product?.images[0]?.image}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  No Image Available
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-xl font-semibold">
                ${product?.price?.toFixed(2)}
              </p>
              <p className="text-gray-700"> quantity: {product?.quantity}</p>
              <p className="mt-2 text-sm"> category: {product?.category}</p>
              <p className="text-gray-600 line-clamp">
                {' '}
                category: {product?.description || 'No Destination Available'}
              </p>
              <Button
                onClick={() => addToCartMutation.mutate(product?.id)}
                className="my-4"
              >
                Add to card
                <ShoppingCart />
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

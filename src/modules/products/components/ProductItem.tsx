import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui';
import Link from 'next/link';
import { GalleryThumbnails, Heart } from 'lucide-react';
import Image from 'next/image';
import { ProductWithImages } from '@/types';

export default function ProductItem(props: { product: ProductWithImages }) {
  const { product } = props;

  return (
    <Card className="w-[400px] transform transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="relative w-full h-[300px]">
          <Image
            fill
            className="rounded-t-lg object-cover"
            src={product?.images[0]?.image || '/mock/noImage.png'}
            alt={product?.name}
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product?.name}</h2>
        <p className="text-gray-500">{product?.category}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg mt-4 font-semibold">
            {product?.price?.toFixed(2)}
          </p>
          <div className="flex items-center justify-between gap-2">
            <Heart />
            <Link href={`/products/catalog?id=${product?.id}`}>
              <GalleryThumbnails />
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full " asChild>
          <Link href={`/products/${product.id}`}>More Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

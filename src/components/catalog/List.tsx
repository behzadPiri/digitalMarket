import { DATA } from '@/modules/products/mock/products';
import { Card, CardContent } from '@/components/ui';
import Image from 'next/image';

export default function CatalogList() {
  const images = DATA[0].images;

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images?.map((image, index) => (
        <div key={index} className="p-1">
          <Card>
            <CardContent className="flex w-[400px] h-[400px] items-center justify-center p-6">
              <Image
                width={400}
                height={400}
                alt="gallery"
                src={image.image}
                className="hover:scale-105 transform transition-transform duration-300"
              />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

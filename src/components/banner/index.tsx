import Image from 'next/image';
import { memo } from 'react';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import Img1 from '@/../public/banner/img1.png';
import Img2 from '@/../public/banner/img2.png';
import Img3 from '@/../public/banner/img3.png';
import Img4 from '@/../public/banner/img4.png';

function Banner() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {[Img1, Img2, Img3, Img4].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="py-0 overflow-hidden border-2">
                <CardContent className="relative h-[400px] w-full items-center justify-center p-6 aspect-square flex">
                  <Image
                    src={image}
                    alt="banner"
                    fill
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default memo(Banner);

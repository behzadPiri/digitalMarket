import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Image from 'next/image';

export default function Ads() {
  return (
    <Card>
      <CardContent className="flex items-center gap-6">
        <div>
          <CardHeader>
            <CardTitle>on Slot products</CardTitle>
            <CardDescription>
              Buy outdated products with 50% discount
            </CardDescription>
          </CardHeader>

          <CardFooter className=" mt-4">
            <Button>Buy Now</Button>
          </CardFooter>
        </div>

        <Image
          src="/assets/ads.png"
          alt="ads"
          width={300}
          height={200}
          className="rounded-lg shrink-0"
        />
      </CardContent>
    </Card>
  );
}

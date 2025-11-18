import { MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <span>Welcome to</span>
      <div className="flex items-center p-3 gap-2">
        <MonitorSmartphone />
        <h1 className="font-bold text-2xl text-gray-800">Digital Market</h1>
      </div>
      <Button asChild className="mt-6">
        <Link href="/products">Go to Products</Link>
      </Button>
    </div>
  );
}

'use client';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-8xl font-bold text-black animate-bounce">404</h1>
      <p className="text-xl my-4 text-gray-600">
        Oops! The page you are looking for dose not exist
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}

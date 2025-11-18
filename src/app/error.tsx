'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface errorType {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: errorType) {
  const route = useRouter();

  const backToHome = useCallback(() => {
    route.push('/');
  }, [route]);
  console.log({ error });
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h2 className="text-xl">{error.message}</h2>
      <div className="flex justify-between mt-6 gap-10">
        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
        <Button onClick={backToHome}>Home</Button>
      </div>
    </div>
  );
}

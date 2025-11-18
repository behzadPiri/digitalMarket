import { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;
  if (!isAdmin) redirect('/');

  return <>{children}</>;
}

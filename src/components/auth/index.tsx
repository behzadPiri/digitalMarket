// "use client"

import { currentUser } from '@clerk/nextjs/server';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import AdminMenu from '@/components/auth/AdminMenu';

async function Auth() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;
  console.log({ user });
  return (
    <div>
      <SignedIn>{isAdmin ? <AdminMenu /> : <UserButton />}</SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default Auth;

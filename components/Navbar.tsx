import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import { MainNav } from '@/components/main-nav';
import { StoreSwitcher } from '@/components/store-switcher';
import prismaDb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import { ModeToggle } from './theme-toggle';

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-4" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

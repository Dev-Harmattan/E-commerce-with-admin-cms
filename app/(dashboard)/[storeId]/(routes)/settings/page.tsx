import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import { SettingForm } from './components/settings-form';

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: React.FC<SettingPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect('/');

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;

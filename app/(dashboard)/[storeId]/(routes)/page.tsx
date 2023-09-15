import prismaDb from '@/lib/prismadb';
import React from 'react';

interface DashboardPageProp {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProp> = async ({ params }) => {
  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active store : {store?.name}</div>;
};

export default DashboardPage;

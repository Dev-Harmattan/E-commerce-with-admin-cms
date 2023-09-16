import { format } from 'date-fns';

import prismaDb from '@/lib/prismadb';
import { BillboardsClient } from './components/client';
import { BillboardColumn } from './components/column';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;

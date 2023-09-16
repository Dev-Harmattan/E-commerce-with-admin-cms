import { format } from 'date-fns';

import prismaDb from '@/lib/prismadb';
import { SizesClient } from './components/client';
import { SizeColumn } from './components/column';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default SizesPage;

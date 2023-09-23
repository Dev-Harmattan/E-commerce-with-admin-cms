import prismaDb from '@/lib/prismadb';

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismaDb.product.count({
    where: {
      storeId,
      isAchieved: false,
    },
  });

  return stockCount;
};

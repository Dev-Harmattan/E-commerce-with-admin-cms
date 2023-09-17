import prismaDb from '@/lib/prismadb';
import { ProductForm } from './components/product-form';

const ProductPage = async ({ params }: { params: { productId: string, storeId: string } }) => {
  const product = await prismaDb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    }
  })

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm colors={colors} sizes={sizes} categories={categories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;

import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const product = await prismaDb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        color: true,
        size: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_GET', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isAchieved,
    } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) return new NextResponse('Name is required', { status: 400 });

    if (!price)
      return new NextResponse('Price url is required', { status: 400 });

    if (!images || !images.length)
      return new NextResponse('Image is required', { status: 400 });

    if (!categoryId)
      return new NextResponse('Category id is required', { status: 400 });

    if (!sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    if (!colorId)
      return new NextResponse('Color id is required', { status: 400 });

    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    await prismaDb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isAchieved,
      },
    });

    const product = await prismaDb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_PATCH', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const product = await prismaDb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_DELETE', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

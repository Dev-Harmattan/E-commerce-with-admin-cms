import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const product = await prismaDb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isAchieved,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(['PRODUCTS_POST'], error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });

    const products = await prismaDb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isAchieved: false,
      },
      include: {
        images: true,
        color: true,
        size: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(['PRODUCTS_GET'], error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

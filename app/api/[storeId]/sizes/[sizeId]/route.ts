import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const size = await prismaDb.size.findFirst({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_GET', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name) return new NextResponse('Name is required', { status: 400 });

    if (!value)
      return new NextResponse('Value id is required', { status: 400 });

    if (!params.sizeId)
      return new NextResponse('Size id is required', {
        status: 400,
      });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const size = await prismaDb.size.update({
      where: {
        id: params.sizeId,
      },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_PATCH', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const size = await prismaDb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_DELETE', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

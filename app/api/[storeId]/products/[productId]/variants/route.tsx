import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request, { params }: { params: { storeId: string, productId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { price, stock, colorId, sizeId, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!stock) {
      return new NextResponse('Stock is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }
    const productWithId = await prismadb.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId
      },
    });

    if (!productWithId) {
      return new NextResponse('Product Id does not belong to store', { status: 405 });
    }

    const variant = await prismadb.variant.create({
      data: {
        price,
        stock,
        colorId,
        sizeId,
        productId: params.productId
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const variants = await prismadb.variant.findMany({
      where: {
        productId: params.productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(variants);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

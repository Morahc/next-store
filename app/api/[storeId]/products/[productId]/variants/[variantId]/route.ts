import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { productId: string; variantId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const variant = await prismadb.variant.findUnique({
      where: {
        id: params.variantId,
        productId: params.productId
      },
      include: {
        color: true,
        size: true,
        discount: true,
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.log('[VARIANT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string; variantId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
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

    const variant = await prismadb.variant.delete({
      where: {
        id: params.variantId,
        productId: params.productId,
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.log('[VARIANT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string; variantId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { colorId, sizeId, discountId, price, stock } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!stock) {
      return new NextResponse('Stock is required', { status: 400 });
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

    const variant = await prismadb.variant.update({
      where: {
        id: params.variantId,
        productId: params.productId,
      },
      data: {
        price,
        stock,
        colorId,
        sizeId,
        discountId,
      },
    });

    return NextResponse.json(variant);
  } catch (error) {
    console.log('[VARIANT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

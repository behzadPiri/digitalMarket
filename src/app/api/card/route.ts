import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();
  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (existingCartItem) {
    const updateCart = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
    return NextResponse.json(updateCart, { status: 200 });
  } else {
    const newCartItem = await prisma.cartItem.create({
      data: { productId, userId, quantity: 1 },
    });
    return NextResponse.json(newCartItem, { status: 200 });
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (userId) {
    const cardItem = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(cardItem, { status: 200 });
  } else {
    return NextResponse.json([]);
  }
}

export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();
  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  console.log({ existingCartItem });
  if (existingCartItem) {
    if (existingCartItem.quantity > 1) {
      const updateCart = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 },
      });
      return NextResponse.json(updateCart, { status: 200 });
    } else {
      const updateCart = await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      });
      return NextResponse.json(updateCart, { status: 200 });
    }
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 400 });
  }
}

'use server';
import { prisma } from '@/lib/prisma';
import { ProductWithImages } from '@/types';
import { Product } from '.prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

export const getProducts = async () => {
  return await prisma.product.findMany({ include: { images: true } });
};

export async function getProductApi(): Promise<ProductWithImages[]> {
  // const res = await fetch("/api/product", {cache: "no-store"});
  const res = await fetch('http://localhost:3000/api/product', {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  const { data } = await res.json();
  return data as ProductWithImages[];
}

export const getProductById = cache(async (id: string) => {
  const result = await prisma.product.findFirst({
    where: { id },
    include: { images: true },
  });
  if (!result) {
    return null;
  }
  return result;
});

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: { id },
      data: product,
    });
  } else {
    result = await prisma.product.create({ data: product });
  }
  revalidatePath('/dashboard/products');
  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};

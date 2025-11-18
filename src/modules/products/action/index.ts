'use server';
import { Product, ProductCategory } from '.prisma/client';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z, ZodIssue } from 'zod';

const validationUpsertProduct = (data: Record<string, unknown>) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: 'name is required' }),
    description: z.string(),
    category: z.enum(Object.values(ProductCategory) as [string]),
    price: z
      .number({ message: 'price is required' })
      .min(1, { message: 'price must be at least 1' }),
    quantity: z
      .number({ message: 'quantity is required' })
      .min(1, { message: 'quantity must be at least 1' })
      .max(1000, { message: 'quantity must be at least 1000' }),
  });
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      const field = issue.path[0];
      if (typeof field === 'string') {
        errors[field] = issue.message;
      }
    });
    return errors;
  }
  return null;
};

export const upsertProduct = async (
  prevData: {
    data: Product | null;
    error: Record<string, string> | null;
  },
  formData: FormData,
) => {
  const id = formData.get('id') as string | null;
  const productData = {
    name: formData.get('name'),
    category: formData.get('category') as string,
    description: formData.get('description'),
    price: parseInt(formData.get('price') as string),
    quantity: parseInt(formData.get('quantity') as string),
  } as Product;

  const error = validationUpsertProduct(productData);
  if (error) {
    return { error, data: prevData.data };
  }
  try {
    let result;
    if (id) {
      result = await prisma.product.update({
        where: { id },
        data: productData,
      });
    } else {
      result = await prisma.product.create({ data: productData });
    }
    revalidatePath('/dashboard/products');
    return { data: result, error: null };
  } catch (e) {
    return { error: { general: 'upsert failed' }, data: prevData.data };
  }
};

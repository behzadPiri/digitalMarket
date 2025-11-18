import ProductListView from '@/modules/products/views/ProductListView';
import { prisma, PrismaType } from '@/lib/prisma';

export default async function Products() {
  const data: PrismaType.Product[] = await prisma.product.findMany();
  console.log({ data });
  return (
    <div>
      <ProductListView />
    </div>
  );
}

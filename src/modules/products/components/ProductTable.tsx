'use client';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import Link from 'next/link';
import { Edit, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import { ProductWithImages } from '@/types';
import { deleteProduct, getProducts } from '@/modules/products/services';

const ProductTable = (props: {
  products: Awaited<ReturnType<typeof getProducts>>;
}) => {
  const { products } = props;

  const onDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button asChild>
          <Link href="/dashboard/products/new">
            Add New Product
            <PlusCircle />
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: ProductWithImages) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                <Image
                  width={50}
                  height={50}
                  alt={product.name}
                  className="rounded-lg mx-auto"
                  src={product?.images[0]?.image || '/mock/noImage.png'}
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center gap-2">
                  <Button asChild variant="ghost">
                    <Link prefetch href={`/dashboard/products/${product.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableHead className="text-right">{products.length}</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductTable;

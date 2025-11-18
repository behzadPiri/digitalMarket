'use client';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { Product, ProductCategory } from '.prisma/client';
import Link from 'next/link';
import UploadImages from '@/modules/products/components/UploadImage';
import { useActionState, useEffect, useState } from 'react';
import { upsertProduct } from '../action';
import { toast } from 'sonner';

function ProductForm(props: { product: Product | null }) {
  const { product } = props;
  const [state, action, isPending] = useActionState<
    {
      data: Product | null;
      error: Record<string, string> | null;
    },
    FormData
  >(upsertProduct, {
    data: product,
    error: null,
  });

  const { error, data } = state;

  const [submited, setSubmited] = useState(false);
  const handelAction = (formData: FormData) => {
    setSubmited(true);
    action(formData);
  };

  useEffect(() => {
    if (!submited) return;
    if (error) toast.error('error data');
    else if (data) {
      if (product?.id) {
        toast.success('success update product');
      } else {
        toast.success('success create product', { position: 'top-right' });
      }
    }
  }, [state]);

  return (
    <Card className="w-[500px] mt-10 mx-auto">
      <form className="max-w-lg" action={handelAction}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          {product?.id && <input type="hidden" name="id" value={product.id} />}

          <div className="my-2">
            <Label className="mb-2" htmlFor="name">
              Name Product
            </Label>
            <Input id="name" name="name" defaultValue={data?.name || ''} />
            {error?.name && (
              <span className="mr-1 mt-1, text-red-600">{error.name}</span>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="category">
              Category
            </Label>
            <Select
              name="category"
              defaultValue={data?.category || ProductCategory.OTHERS}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={data?.description || ''}
            />
            {error?.description && (
              <span className="mr-1 mt-1, text-red-600">
                {error.description}
              </span>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="price">
              Price
            </Label>
            <Input
              type="number"
              step="0.01"
              id="price"
              name="price"
              defaultValue={data?.price || ''}
            />
            {error?.price && (
              <span className="mr-1 mt-1, text-red-600">{error.price}</span>
            )}
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="quantity">
              Quantity
            </Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={product?.quantity || ''}
            />
            {error?.quantity && (
              <span className="mr-1 mt-1, text-red-600">{error.quantity}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {isPending ? (
              <span>loading...</span>
            ) : product?.id ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
          </Button>
        </CardFooter>
        {product?.id && (
          <CardFooter>
            <UploadImages productId={product?.id} />
          </CardFooter>
        )}
      </form>
    </Card>
  );
}

export default ProductForm;

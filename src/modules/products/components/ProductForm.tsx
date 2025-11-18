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
import { useForm } from 'react-hook-form';
import { upsertProduct } from '@/modules/products/services';
import UploadImages from '@/modules/products/components/UploadImage';

function ProductForm(props: { product: Product | null }) {
  const { product } = props;
  const { register, handleSubmit, setValue } = useForm<Product>();

  const onSubmitForm = async (data: Product) => {
    const value = {
      ...data,
      price: parseFloat(data?.price?.toString() || '0.0'),
      quantity: parseInt(data?.quantity?.toString() || '0'),
      category: data?.category || product?.category,
    };
    if (product?.id) {
      value.id = product.id;
    }
    console.log({ value });
    await upsertProduct(value);
  };

  return (
    <Card className="w-[500px] mt-10 mx-auto">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="my-2">
            <Label className="mb-2" htmlFor="name">
              Name Product
            </Label>
            <Input
              {...register('name')}
              id="name"
              required
              defaultValue={product?.name || ''}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="category">
              Category
            </Label>
            <Select
              required
              defaultValue={product?.category || ProductCategory.OTHERS}
              onValueChange={(value) =>
                setValue('category', value as ProductCategory)
              }
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
              {...register('description')}
              id="description"
              required
              defaultValue={product?.description || ''}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="price">
              Price
            </Label>
            <Input
              {...register('price')}
              type="number"
              step="0.01"
              id="price"
              required
              defaultValue={product?.price || ''}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="quantity">
              Quantity
            </Label>
            <Input
              {...register('quantity')}
              type="number"
              id="quantity"
              required
              defaultValue={product?.quantity || ''}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {product?.id ? 'Update Product' : 'Add Product'}
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

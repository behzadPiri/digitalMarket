import { ProductWithImages } from '@/types';
import ProductItem from '@/modules/products/components/ProductItem';

export default function ProductList(props: { products: ProductWithImages[] }) {
  const { products } = props;

  return (
    <div className="flex flex-wrap w-full justify-between items-center my-10">
      {products.map((product) => (
        <ProductItem product={product} key={product?.id} />
      ))}
    </div>
  );
}

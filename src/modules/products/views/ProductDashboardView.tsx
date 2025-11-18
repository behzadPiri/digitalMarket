import ProductTable from '@/modules/products/components/ProductTable';
import { getProducts } from '@/modules/products/services';
import { ProductWithImages } from '@/types';

async function ProductDashboardView() {
  const products = (await getProducts()) as ProductWithImages[];

  return (
    <>
      <ProductTable products={products} />
    </>
  );
}

export default ProductDashboardView;

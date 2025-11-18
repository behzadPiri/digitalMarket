import ProductForm from '@/modules/products/components/ProductFormWithAction';
import { getProductById } from '@/modules/products/services';

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);
  // const products = await getProductApi()
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetailView;

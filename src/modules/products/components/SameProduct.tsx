import { getProductById } from '@/modules/products/services';

async function SameProduct(props: { id: string }) {
  const { id } = props;
  const product = await getProductById(id);

  return <div>Same Product...</div>;
}

export default SameProduct;

// "use client"
import ProductList from '@/modules/products/components/ProductList';
import { getProducts } from '@/modules/products/services';

export default async function ProductListView() {
  const products = await getProducts();
  // const [products, setProducts] = useState<ProductWithImages[]>([])

  // const getProducts = async () => {
  //     const result = await getProductApi()
  //     console.log("res",result)
  //     setProducts(result)
  // }
  //
  // useEffect(() => {
  //     getProducts();
  // }, [])

  // useEffect(() => {
  //     (async () => {
  //         const data = await getProductApi();
  //         setProducts(data);
  //     })();
  // }, []);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

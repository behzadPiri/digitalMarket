import CatalogList from '@/components/catalog/List';
import CatalogSelector from '@/components/catalog/Selector';

export default function Catalog() {
  return (
    <div className="flex flex-col items-center my-4 mx-auto">
      <CatalogList />
      <CatalogSelector />
    </div>
  );
}

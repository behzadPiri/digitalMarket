import { MetadataRoute } from 'next';
import { getProducts } from '@/modules/products/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  if (products.length < 1) return [];
  const baseUrl = 'http://localhost:3000';
  const sitemapLink = products.map((item) => {
    return {
      url: `${baseUrl}/products/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];
}

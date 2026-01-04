import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/static-data';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bodybiohacker.online';

  // Static routes
  const routes = [
    '',
    '/about',
    '/shop',
    '/blog',
    '/compare',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Product routes
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/reviews/${product.category}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...blogRoutes];
}

import { MetadataRoute } from 'next';
import { getAllPosts, type MetaData } from './db/blog';
import { HOST } from '../utils/constant';

export const dynamic = 'force-static';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsData: MetaData[] = await getAllPosts();

  const posts = postsData.map((post) => ({
    url: `https://${HOST}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ['', '/about',].map((route) => ({
    url: `https://${HOST}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...posts, ...routes];
};
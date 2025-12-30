import { promises as fs } from 'fs';
import path from 'path';
import { cacheLife } from 'next/cache';

export interface MetaData {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}


export async function getAllPosts(): Promise<MetaData[]> {
  'use cache'
  cacheLife('days')
  const postsPath = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsPath);
  const mdxNames = filenames.filter((filename) => path.extname(filename) === '.mdx');
  const posts = await Promise.all(
    mdxNames.map(async(filename) => {
      const mdxModule =  await import(`../../posts/${filename}`);
      return { ...mdxModule.metadata };
    })
  );

  posts.sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));

  return posts
}
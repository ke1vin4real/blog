import Posts from '../components/Posts';
import { getAllPosts, type MetaData } from './db/blog';

export default async function HomePage() {
  'use cache'
  const posts: MetaData[] = await getAllPosts();

  return (
    <Posts posts={posts} />
  );
};

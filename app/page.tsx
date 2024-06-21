import Posts from '../components/Posts';
import { getAllPosts, type FrontMatter } from './db/blog';

export default async function HomePage() {
  const posts: FrontMatter[] = await getAllPosts();

  return (
    <Posts posts={posts} />
  );
};

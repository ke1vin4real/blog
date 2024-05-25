import fs from 'fs';
import path from 'path';
import Posts from '../components/Posts';

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}

function parseFrontMatter(fileContent: string): FrontMatter {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let frontMatter: Partial<FrontMatter> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    frontMatter[key.trim() as keyof FrontMatter] = value;
  });

  return frontMatter as FrontMatter;
}


async function getAllPosts() {
  const filenames = fs.readdirSync(path.join(process.cwd(), 'posts')).filter((filename) => path.extname(filename) === '.mdx');
  const posts: FrontMatter[] = filenames.map((filename) => {
    const rawContent = fs.readFileSync(path.join(process.cwd(), 'posts', filename), 'utf-8');
    const frontMatter = parseFrontMatter(rawContent);
    return frontMatter
  });

  posts.sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));

  return posts
}

export default async function HomePage() {
  const posts: FrontMatter[] = await getAllPosts();

  return (
    <Posts posts={posts} />
  );
};

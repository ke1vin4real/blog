import MDXContent from "./MDXContent";
import fs from 'fs';
import path from 'path';
import { serialize } from "next-mdx-remote/serialize";
import { Metadata } from "next";
import { HOST } from "../../../utils/constant";

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}

function parseFileContent(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let frontMatter: Partial<FrontMatter> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    frontMatter[key.trim() as keyof FrontMatter] = value;
  });

  return { frontMatter: frontMatter as FrontMatter, content };
}

export const dynamicParams = false;


export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const paths = posts.map((filename) => ({ slug: path.basename(filename, '.mdx') }));

  return paths;
}

async function getPost(slug: string) {
  const rawContent = fs.readFileSync(path.join(process.cwd(), 'posts', slug + '.mdx'), 'utf-8');
  const { content, frontMatter } = parseFileContent(rawContent);
  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require('remark-autolink-headings'), require('remark-slug')],
      rehypePlugins: [require('rehype-highlight')],
    },
  });
  return {
    source,
    frontMatter,
  }
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const { frontMatter: { title, description, date } } = await getPost(slug);
 
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(date).toISOString(),
      url: `https://${HOST}/blog/${slug}`
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { source, frontMatter } = await getPost(params.slug);
  const publishedAt = new Date(frontMatter.date).toISOString();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontMatter.title,
    datePublished: publishedAt,
    dateModified: publishedAt,
    description: frontMatter.description,
    url: `https://${HOST}/blog/${params.slug}`,
    author: {
      '@type': 'Person',
      name: 'Ke1vin',
    },
    image: frontMatter.image ? frontMatter.image : []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MDXContent source={source} frontMatter={frontMatter} />
    </>
  )
}
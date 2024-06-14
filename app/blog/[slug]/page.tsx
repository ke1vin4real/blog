import { promises as fsPromises } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image'
import { Metadata } from "next";
import { HOST } from "../../../utils/constant";
import Comments from "../../../components/Comments";
import '../../../utils/github-markdown.css';
import MDXContent from '../../../components/MDXContent';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}

function parseFileFrontMatter(fileContent: string) {
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

  return { frontMatter: frontMatter as FrontMatter };
}

export const dynamicParams = false;


export async function generateStaticParams() {
  const posts = await fsPromises.readdir(path.join(process.cwd(), 'posts'));
  const paths = posts.map((filename) => ({ slug: path.basename(filename, '.mdx') }));

  return paths;
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const rawContent = await fsPromises.readFile(path.join(process.cwd(), 'posts', slug + '.mdx'), 'utf-8');
  const { frontMatter: { title, description, date } } = parseFileFrontMatter(rawContent);
 
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

function MDXImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} />
}

const components = {
  Image: MDXImage
};

export default async function Post({ params }: { params: { slug: string } }) {
  const rawContent = await fsPromises.readFile(path.join(process.cwd(), 'posts', params.slug + '.mdx'), 'utf-8');
  const { content, frontmatter: frontMatter } = await compileMDX<FrontMatter>({ source: rawContent, components, options: {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
    },
  } });

  const publishedAt = new Date(frontMatter.date).toISOString();
  const date = new Date(frontMatter.date).toISOString().split('T')[0];
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
      <MDXContent title={frontMatter.title} date={date}>{content}</MDXContent>
      <Comments />
    </>
  )
}
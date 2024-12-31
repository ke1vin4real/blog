import { promises as fsPromises } from 'fs';
import path from 'path';
import { Metadata } from "next";
import { HOST } from "../../../utils/constant";
import Comments from "../../../components/Comments";
import './github-markdown.css';
import { default as Content } from '../../../components/MDXContent';
import type { MDXContent } from 'mdx/types';

interface MetaData {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}

export const dynamicParams = false;


export async function generateStaticParams() {
  const posts = await fsPromises.readdir(path.join(process.cwd(), 'posts'));
  const paths = posts.map((filename) => ({ slug: path.basename(filename, '.mdx') }));

  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { metadata: { title, description, date } } = await import(`../../../posts/${slug}.mdx`);
 
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(date).toISOString(),
      url: `https://${HOST}/blog/${slug}`
    },
    metadataBase: new URL(`https://${HOST}`),
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: { url: '/favicon/favicon.ico' }
    },
    verification: {
      google: 'WkS-hKu7hobka_Ks2yKjVhnxu824ehCsXYQ-dyJ5zVo'
    }
  }
};

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`../../../posts/${slug}.mdx`) as { default: MDXContent, metadata: MetaData };

  const publishedAt = new Date(metadata.date).toISOString();
  const date = new Date(metadata.date).toISOString().split('T')[0];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    datePublished: publishedAt,
    dateModified: publishedAt,
    description: metadata.description,
    url: `https://${HOST}/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Ke1vin',
    },
    image: metadata.image ? metadata.image : []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Content title={metadata.title} date={date}><Post /></Content>
      <Comments />
    </>
  )
}
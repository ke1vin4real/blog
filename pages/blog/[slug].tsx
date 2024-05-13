import fs from 'fs';
import path from 'path';
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { HOST } from '../../utils/constant';

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  cover: string,
  slug: string,
}

export const getStaticPaths = (async() => {
  const posts = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const paths = posts.map((filename) => ({ params: { slug: path.basename(filename, '.mdx') } }));

  return {
    paths,
    fallback: false,
  }
});

export const getStaticProps = (async({ params: { slug } }: { params: { slug: string } }) => {
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
    props: {
      source,
      frontMatter,
    },
  }
});

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

export default function MDX({ source, frontMatter }: { source: MDXRemoteSerializeResult, frontMatter: FrontMatter}) {
  const { title, date, description, cover, slug } = frontMatter;
  const publishedDate = new Date(date).toISOString();
  const url = `https://${HOST}/blog/${slug}`;

  const featuredImage = {
    url: `https://${HOST}/${cover}`,
    alt: title,
  };
  return (
    <>
      {/* language=SCSS */}
      <style jsx>{`
          .info {
            font-size: 0.875rem;
            color: #2D3748;
            display: flex;
          }
              
          .reading-time {
            font-size: 0.875rem;
            color: #718096;
            margin-left: auto;
          }  
              
          .cover {
            margin: 2rem 0;
          } 
              
          .post-date {
          color: var(--post-date-text-color);
          }
            `}
      </style>
      <NextSeo
        title={`${title} - Kelvin`}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          type: 'article',
          article: {
            publishedTime: publishedDate,
          },
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        dateModified={publishedDate}
        datePublished={publishedDate}
        description={description}
        images={[cover]}
        authorName="Kelvin"
        publisherLogo="/favicon/android-chrome-192x192.png"
        publisherName="Kelvin"
        title={title}
        url={url}
      />
      <article className="markdown-body">
        <h1>{title}</h1>
        <div className="info">
          <span className="post-date">{date}</span>
        </div>
        <img className="cover" src={cover} />
        <MDXRemote {...source}></MDXRemote>
      </article>
    </>
  );
}
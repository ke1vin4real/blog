import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { HOST } from '../../utils/constant';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface Props {
  posts: Array<FrontMatter>,
}

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  cover: string,
  slug: string,
}

function parseFrontMatter(fileContent: string) {
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

  return frontMatter;
}

export const getStaticProps: GetStaticProps = (async () => {
  const filenames = fs.readdirSync(path.join(process.cwd(), 'posts')).filter((filename) => path.extname(filename) === '.mdx');
  const posts: Partial<FrontMatter>[] = filenames.map((filename) => {
    const rawContent = fs.readFileSync(path.join(process.cwd(), 'posts', filename), 'utf-8');
    const frontMatter = parseFrontMatter(rawContent);
    return frontMatter
  });

  posts.sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string));

  return {
    props: {
      posts
    }
  }
});

export default function BlogList({ posts }: Props) {
  const title = 'Blog - Kelvin';
  const url = `https://${HOST}/blog`;

  return (
    <>
      {/* language=SCSS */}
      <style jsx>{`
        .title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--main-text-color);
          
          &-line {
            display: flex;
            align-items: flex-start;
          }
        }
        .section-title {
          margin-bottom: 1rem;
          color: var(--main-text-color);
        }
        .post {
          margin-bottom: 1rem;
          &-date {
            margin-left: auto;
            margin-bottom: 0.5rem;
            color: #718096;
            min-width: 6.25rem;
            text-align: right;
          }
          
          &-desc {
            color: #718096;
            font-size: 0.9375rem;
          }
        }
        
        @media (max-width: 767px) {
          .title-line {
            flex-direction: column;
          }
          .post-date {
            margin-left: 0;
            text-align: left;
            font-size: 0.875rem;
          }
        }
      `}
      </style>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <div className="section-title"><h2>All Posts</h2></div>
      <ul>
        {
          posts.map((frontMatter: FrontMatter) => (
            <li key={frontMatter.title} className="post">
              <Link href={'/blog/' + frontMatter.slug}>
                <a>
                  <div className="title-line">
                    <h3 className="title">{frontMatter.title}</h3>
                    <span className="post-date">{frontMatter.date}</span>
                  </div>
                  <p className="post-desc">{frontMatter.description}</p>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  );
};

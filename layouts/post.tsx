import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { convertDateFormat } from '../utils/func';
import { HOST } from '../utils/constant';

interface frontMatterProps {
  title: string,
  readingTime: {
    minutes: number,
  },
  date: Date,
  description: string,
  __resourcePath: string,
  cover: string,
}

interface Props {
  children: React.ReactNode,
}

export default function Post(frontMatter: frontMatterProps) {
  const { title, date, readingTime, description, __resourcePath, cover } = frontMatter;

  const publishedDate = new Date(date).toISOString();

  const url = `https://${HOST}/${__resourcePath.replace('.mdx', '')}`;

  const featuredImage = {
    url: `https://${HOST}/${cover}`,
    alt: title,
  };

  return ({ children: content }: Props) => {
    // @ts-ignore
    // @ts-ignore
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
            <span className="post-date">{convertDateFormat(date)}</span>
            <span className="reading-time">{Math.ceil(readingTime.minutes)} min read</span>
          </div>
          <img className="cover" src={cover} />
          <div>{content}</div>
        </article>
      </>
    );
  };
}

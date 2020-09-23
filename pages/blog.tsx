import Layout from '../components/Layout';
import React from 'react';
import Link from 'next/link';
// @ts-ignore
import { frontMatter as docsPages } from './blog/*.mdx';
import { convertDateFormat } from '../utils/func';
import { NextSeo } from 'next-seo';
import { HOST } from '../utils/constant';

interface Page {
  __resourcePath: string,
  title: string,
  description: string,
  date: Date
}

export default function BlogList() {
  const title = 'Blog - Kelvin';
  const url = `https://${HOST}/blog`;
  return (
    <Layout>
      {/* language=SCSS */}
      <style jsx>{`
        .title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          
          &-line {
            display: flex;
            align-items: flex-start;
          }
        }
        .section-title {
          margin-bottom: 1rem;
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
            color: #2D3748;
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
          docsPages.map((page: Page) => (
            <li key={page.__resourcePath} className="post">
              <Link href={formatPath(page.__resourcePath)}>
                <a>
                  <div className="title-line">
                    <h3 className="title">{page.title}</h3>
                    <span className="post-date">{convertDateFormat(page.date)}</span>
                  </div>
                  <p className="post-desc">{page.description}</p>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </Layout>
  );
};

function formatPath(p: string) {
  return p.replace(/\.mdx$/, '');
}

import Layout from '../components/Layout';
import React from 'react';
import Link from 'next/link';
// @ts-ignore
import { frontMatter as docsPages } from './blog/*.mdx';
import { convertDateFormat } from '../utils/func';

interface Page {
  __resourcePath: string,
  title: string,
  description: string,
  date: Date
}

export default function BlogList() {
  return (
    <Layout>
      {/* language=SCSS */}
      <style jsx>{`
        .title {
          font-size: 1.25rem;
          
          &-line {
            display: flex;
            align-items: flex-start;
          }
        }
        .section-title {
          margin-bottom: 1rem;
        }
        .post {
          &-date {
            margin-left: auto;
            color: #718096;
            min-width: 6.25rem;
            text-align: right;
          }
          
          &-desc {
            color: #2D3748;
          }
        }
        
        @media (min-width: 481px) and (max-width: 767px) {
          .title-line {
            flex-direction: column;
          }
          .post-date {
            margin-left: 0;
            text-align: left;
          }
        }
      `}
      </style>
      <div className="section-title"><h2>All Posts</h2></div>
      <ul>
        {
          docsPages.map((page: Page) => (
            <li key={page.__resourcePath}>
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
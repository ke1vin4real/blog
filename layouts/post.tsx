import React from 'react';
import Layout from '../components/Layout';
import { convertDateFormat } from '../utils/func';

interface frontMatterProps {
  title: string,
  readingTime: {
    minutes: number,
  },
  date: Date,
}

interface Props {
  children: React.ReactNode,
}

export default function Post({ title, date, readingTime }: frontMatterProps) {
  return ({ children: content }: Props) => {
    return (
      <Layout>
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
        `}
        </style>
        <article className="markdown-body">
          <h1>{title}</h1>
          <div className="info">
            <span>{convertDateFormat(date)}</span>
            <span className="reading-time">{Math.ceil(readingTime.minutes)} min read</span>
          </div>
          <div>{content}</div>
        </article>
      </Layout>
    );
  };
}

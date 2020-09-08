import React from 'react';
import Layout from '../components/Layout';

interface frontMatterProps {
  title: string,
  readingTime: number,
}

interface Props {
  children: React.ReactNode,
}

export default function Post({ title, readingTime }: frontMatterProps) {
  console.log(readingTime)
  return ({ children: content }: Props) => {
    return (
      <Layout>
        {/* language=SCSS */}
        <style jsx>{`
          article {
            max-width: 700px;
            margin: 0 auto;
          }
        `}
        </style>
        <article className="markdown-body">
          <h1>{title}</h1>
          <div>{content}</div>
        </article>
      </Layout>
    );
  };
}

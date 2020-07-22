import React from 'react';
import Layout from '../components/Layout';

interface Props {
  title: string,
}

export default function Post({ }: Props) {
  return ({ children: content }: { children: React.ReactNode }) => {
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
          <div>{content}</div>
        </article>
      </Layout>
    );
  };
}

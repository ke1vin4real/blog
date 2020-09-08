import React from 'react';
import Layout from '../components/Layout';

interface Props {
  title: string,
}

export default function Post(props: Props) {
  return (props2: { children: React.ReactNode }) => {
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
          <h1>{props.title}</h1>
          <div>{props2.children}</div>
        </article>
      </Layout>
    );
  };
}

import React from 'react';
import Layout from '../components/Layout';

interface Props {
  frontMatter: {
    title: string,
  },
}

export default function Post({ frontMatter: { title } }: Props) {
  return ({ children: content }: { children: React.ReactNode }) => {
    return (
      <Layout>
        <h1>{title}</h1>
        {content}
      </Layout>
    );
  };
}
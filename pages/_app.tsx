import React from 'react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import '../utils/global.css';
import '../utils/github-markdown.css';
import SEO from '../next-seo.config';
import Layout from '../components/Layout';

interface Props extends AppProps {
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: Props) {
  return (
    <Layout>
      <Component {...pageProps} />
      <DefaultSeo {...SEO} />
    </Layout>
  );
}

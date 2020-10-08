import React from 'react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import '../utils/global.css';
import '../utils/github-markdown.css';
import '../utils/github-code-block.css';
import SEO from '../next-seo.config';
import { getCookie } from '../utils/func';
import Layout from '../components/Layout';

interface Props extends AppProps {
  theme: number | null,
}


interface Context {
  // any modifications to the default context, e.g. query types
  ctx: NextPageContext,
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, theme }: Props) {

  return (
    <Layout themeSetting={theme}>
      <Component {...pageProps} />
      <DefaultSeo {...SEO} />
    </Layout>
  );
}

MyApp.getInitialProps = async (context: Context) => {
  let theme = null;

  const allCookies = context?.ctx?.req?.headers?.cookie;

  if (allCookies) {
    theme = getCookie('theme', allCookies);
  }

  return {
    theme: theme !== null ? Number(theme) : theme,
  };
};

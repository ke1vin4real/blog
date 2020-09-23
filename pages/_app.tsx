import React from 'react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import '../utils/global.css';
import '../utils/github-markdown.css';
import '../utils/github-code-block.css';
import SEO from '../next-seo.config';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
      <DefaultSeo {...SEO} />
    </>
  );
}

import '../utils/global.css';
import '../utils/github-markdown.css';
import '../utils/github-code-block.css';
import React from 'react';
import { AppProps } from 'next/app';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

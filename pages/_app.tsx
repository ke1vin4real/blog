import '../utils/global.css';
import '../utils/github-markdown.css';
import React from 'react';

interface Props {
  Component: Function,
  pageProps: Object,
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />;
}
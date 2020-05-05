import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

interface Props {
  ctx: Object,
}
export default class MyDocument extends Document {
  static async getInitialProps(ctx: Props) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
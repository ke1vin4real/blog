import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet" />
          <Head>
            <link href="/favicon/favicon.ico" rel="shortcut icon" />
            <link href="/favicon/site.webmanifest" rel="manifest" />
            <link
              rel="dns-prefetch"
              href="https://fonts.googleapis.com/"
              crossOrigin=""
            />
            <link
              href="/favicon/apple-touch-icon.png"
              rel="apple-touch-icon"
              sizes="180x180"
            />
            <link
              href="/favicon/favicon-32x32.png"
              rel="icon"
              sizes="32x32"
              type="image/png"
            />
            <link
              href="/favicon/favicon-16x16.png"
              rel="icon"
              sizes="16x16"
              type="image/png"
            />
          </Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

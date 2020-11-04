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
          <script
            async
            type="text/javascript"
            /* language=javascript */
            dangerouslySetInnerHTML={{ __html: `
              try {
                var query = window.matchMedia("(prefers-color-scheme: dark)");
                var preference = window.localStorage.getItem("ke1vin-blog-theme");
                window.__LOCAL_THEME__ = preference;
              
                if (preference) {
                  if ((preference === "SYSTEM" && query.matches) || preference === "DARK") {
                    document.documentElement.classList.add("dark-theme");
                  }
                }
              } catch (e) {
                console.error(e);
              }
            ` }}
          />
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet" />
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

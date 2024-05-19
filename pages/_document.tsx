import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh">
        <Head>
          <script
            async
            type="text/javascript"
            /* language=javascript */
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  const query = window.matchMedia("(prefers-color-scheme: dark)");
                  const preference = window.localStorage.getItem("ke1vin-blog-theme");
                  window.__LOCAL_THEME__ = preference;
                
                  if (preference) {
                    if ((preference === "SYSTEM" && query.matches) || preference === "DARK") {
                      document.documentElement.classList.add("dark-theme");
                    }
                  }
                } catch (e) {
                  console.error(e);
                }
              `,
            }}
          />
          <meta name='theme-color' content='#000000' />
          <link href="/favicon/favicon.ico" rel="shortcut icon" />
          <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

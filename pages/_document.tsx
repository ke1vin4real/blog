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
          <script
            async
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                 if ('serviceWorker' in navigator) {
                   window.addEventListener('load', () => {
                     navigator.serviceWorker.register('/sw.js').then(registration => {
                       console.log('SW registered: ', registration);
                     }).catch(registrationError => {
                       console.log('SW registration failed: ', registrationError);
                     });
                     
                     navigator.serviceWorker.oncontrollerchange = function() {
                       console.log('This page is now controlled by:', navigator.serviceWorker.controller);
                     };
                   });
                 }
              `,
            }}
          />
          <meta name='application-name' content="Ke1vin's Blog" />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content="Ke1vin's Blog" />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#000000' />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link crossOrigin="anonymous"  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
          <link href="/favicon/favicon.ico" rel="shortcut icon" />
          <link href="/manifest.json" rel="manifest" />
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

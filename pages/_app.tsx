import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import '../utils/global.css';
import '../utils/github-markdown.css';
import SEO from '../next-seo.config';
import Layout from '../components/Layout';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',

});

interface Props extends AppProps {
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: Props) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${inter.style.fontFamily},-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        }
      `}</style>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

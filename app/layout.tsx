import { Metadata, Viewport } from "next"
import Script from "next/script";
import { HOST } from "../utils/constant";
import Layout from "../components/Layout";
import StyledJsxRegistry from './registry';
import fs from 'fs';
import path from 'path';
// import '../utils/global.css';

export const metadata: Metadata = {
  title: {
    default: 'Kelvin – Development and creation.',
    template: '%s | Kelvin'
  },
  description: 'Full-tack developer, JavaScript enthusiast.',
  metadataBase: new URL(`https://${HOST}`),
  openGraph: {
    title: 'Kelvin – Development and creation.',
    description: 'Full-tack developer, JavaScript enthusiast.',
    url: `https://${HOST}`,
    siteName: 'Kelvin',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: { url: '/favicon/favicon.ico' }
  },
  verification: {
    google: 'WkS-hKu7hobka_Ks2yKjVhnxu824ehCsXYQ-dyJ5zVo'
  }
};

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <style
          id="global-style"
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(
              path.join(process.cwd(), 'utils', 'global.css'),
              'utf8',
            ),
          }}
        />
        <Script
          id="script-add-theme"
          async
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
      </head>
      <body>
        <StyledJsxRegistry>
          <Layout>{children}</Layout>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
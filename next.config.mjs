import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * @type {import('next').NextConfig}
 */

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})

const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? undefined: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.\w+(?<!(s?c|sa)ss)$/i,       // Next.js handles url() in css/sass/scss files
      use: [
        {
          loader: require.resolve('svg-inline-loader'),
        },
      ],
    });

    return config;
  },
};

export default withMDX(nextConfig);

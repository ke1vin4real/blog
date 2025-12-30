import createMDX from '@next/mdx';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const remarkGfm = require.resolve('remark-gfm');
const rehypeHighlight = require.resolve('rehype-highlight');

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
  cacheComponents: true,
  // output: 'export' removed - not compatible with Cache Components
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: /\.\w+(?<!(s?c|sa)ss)$/i,       // Next.js handles url() in css/sass/scss files
  //     use: [
  //       {
  //         loader: require.resolve('svg-inline-loader'),
  //       },
  //     ],
  //   });

  //   return config;
  // },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['svg-inline-loader'],
        as: '*.js',
      },
    },
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default withMDX(nextConfig);

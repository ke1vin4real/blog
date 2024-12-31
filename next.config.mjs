import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * @type {import('next').NextConfig}
 */

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
})

const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? undefined: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
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

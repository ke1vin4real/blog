const withMdxEnhanced = require('next-mdx-enhanced');
const readingTime = require('reading-time');
const highlight = require('rehype-highlight');

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-autolink-headings'),
    require('remark-slug'),
  ],
  rehypePlugins: [highlight],
  extendFrontMatter: {
    process: function(mdxContent) {
      return {
        wordCount: mdxContent.split(/\s+/gu).length,
        readingTime: readingTime(mdxContent),
      };
    },
  },
})({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // Next.js already handles url() in css/sass/scss files
        test: /\.\w+(?<!(s?c|sa)ss)$/i,
      },
      use: [
        {
          loader: require.resolve('svg-inline-loader'),
        },
      ],
    });

    return config;
  },
});

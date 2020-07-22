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
    process: (mdxContent) => ({
      wordCount: mdxContent.split(/\s+/gu).length,
      readingTime: readingTime(mdxContent),
    }),
    phase: 'prebuild|loader|both',
  },
})({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});

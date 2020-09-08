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
});

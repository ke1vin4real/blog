const withMdxEnhanced = require('next-mdx-enhanced');
const readingTime = require('reading-time');
const highlight = require('rehype-highlight');
const { InjectManifest } = require('workbox-webpack-plugin');
// const runtimeCaching = require('./runtimeCache');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const globby = require('globby');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const getRevision = (file) => crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');

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
  webpack(config, options) {
    const { dev } = options;
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

    const manifestEntries = globby.sync(
      [
        '**/*',
        '!workbox-*.js',
        '!workbox-*.js.map',
        '!worker-*.js',
        '!worker-*.js.map',
        '!fallback-*.js',
        '!fallback-*.js.map',
        '!sw.js',
        '!sw.js.map',
        '!offline.html',
      ],
      {
        cwd: 'public',
      }
    ).map((f) => ({
      url: path.posix.join(`/${f}`),
      revision: getRevision(`public/${f}`),
    }));

    config.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.resolve('public', 'workbox-*.js'),
          path.resolve('public', 'workbox-*.js.map'),
          path.resolve('public', 'sw.js'),
          path.resolve('public', `sw.js.map`),
        ],
      }),
      new InjectManifest({
        // clientsClaim: true,
        // skipWaiting: true,
        // cleanupOutdatedCaches: true,
        // runtimeCaching: dev ? [{
        //   urlPattern: /.*/i,
        //   handler: 'NetworkOnly',
        //   options: {
        //     cacheName: 'dev',
        //   },
        // }] : runtimeCaching,
        swSrc: path.resolve('service-worker.js'),
        swDest: path.resolve('public', 'sw.js'),
        additionalManifestEntries: manifestEntries,
        exclude: [
          ({ asset }) => {
            if (asset.name.match(/^(build-manifest\.json|react-loadable-manifest\.json)$/)) {
              return true;
            } else if (dev && !asset.name.startsWith('static/runtime/')) {
              return true;
            }
            return false;
          },
        ],
        modifyURLPrefix: {
          'static/': '/_next/static/',
        },
        mode: dev ? 'development' : 'production',
      }),
    );

    return config;
  },
});

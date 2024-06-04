module.exports = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  swcMinify: true,
  transpilePackages: ["next-mdx-remote"],
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

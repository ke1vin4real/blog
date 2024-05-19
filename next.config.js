module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  swcMinify: true,
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

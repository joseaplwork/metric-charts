module.exports = {
  plugins: {
    'postcss-normalize': {
      browsers: 'last 3 versions',
    },
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: { grid: true },
      browsers: 'last 3 versions',
    },
  },
};

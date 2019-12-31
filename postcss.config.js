module.exports = {
  plugins: {
    'postcss-normalize': {
      browsers: 'last 2 versions',
    },
    'postcss-preset-env': {
      stage: 3,
      browsers: 'last 2 versions',
    },
  },
};

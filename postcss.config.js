module.exports = {
  plugins: {
    'postcss-normalize': {
      browsers: 'last 3 versions',
    },
    'postcss-preset-env': {
      stage: 3,
      browsers: 'last 3 versions',
      features: { 'nesting-rules': true },
    },
  },
};

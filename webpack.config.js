const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {};

if (process.env.NODE_ENV === 'development') {
  devConfig.devtool = 'source-map';
}

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    index: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'client/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: { loader: 'babel-loader' },
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: { mode: 'local', localIdentName: '[local]' } },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  ...devConfig,
};

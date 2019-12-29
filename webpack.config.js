const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

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
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { modules: { mode: 'local', localIdentName: '[local]' } },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({ extractComments: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './client/index.html',
    }),
    new MiniCssExtractPlugin(),
    new StyleExtHtmlWebpackPlugin(),
  ],
  ...devConfig,
};

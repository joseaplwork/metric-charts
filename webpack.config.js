const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const bundleName = 'bundle.js';
const devConfig = {};

if (process.env.NODE_ENV === 'development') {
  devConfig.devtool = 'source-map';
  devConfig.devServer = { open: true };
}

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    index: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: `[name].${bundleName}`,
    filename: bundleName,
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
    new ScriptExtHtmlWebpackPlugin({
      inline: /^(.*?(\bvendors\b)[^$]*)$/,
      async: bundleName,
      preload: bundleName,
    }),
    new MiniCssExtractPlugin(),
    new StyleExtHtmlWebpackPlugin(),
  ],
  ...devConfig,
};

/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:15:33
 */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackConfig = require('./webpack.config.js');

webpackConfig.mode = 'production';
webpackConfig.output.filename = '[name].[contenthash].js';

webpackConfig.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
      include: path.resolve(__dirname, '../view'),
      cache: true,
      parallel: true,
      sourceMap: true,
      extractComments: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
};

module.exports = webpackConfig;

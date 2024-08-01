/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:15:06
 */
const { HotModuleReplacementPlugin } = require('webpack');
const webpackConfig = require('./webpack.config.js');

webpackConfig.mode = 'development';

webpackConfig.entry = Object.entries(webpackConfig.entry).reduce(
  (total, [key, value]) => {
    total[key] = [
      'webpack-hot-middleware/client?name=acc&reload=true&timeout=2000&overlay=true',
      value,
    ];
    return total;
  },
  {}
);

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new HotModuleReplacementPlugin(),
];

module.exports = webpackConfig;

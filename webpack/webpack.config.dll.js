/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:15:22
 */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// 判断环境变量
const isLocal = process.env.NODE_ENV === 'local';

const vendor = ['react', 'react-dom', 'antd'];

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: {
    lib: vendor, // 这里列出你想要打包成 DLL 的库
  },
  output: {
    path: path.resolve(__dirname, '../public/dist/webpack'),
    filename: isLocal ? '[name].js' : '[name].[contenthash].js',
    library: '[name]', // 这个名称需要和下面 DllReferencePlugin 中的名称一致
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(
        __dirname,
        '../public/dist/webpack',
        '[name].manifest.json'
      ),
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.dll.json',
      publicPath: '',
    }),
    new TerserPlugin({
      extractComments: false, // 通过设置为 false 禁用 .LICENSE 文件的生成
    }),
  ],
};

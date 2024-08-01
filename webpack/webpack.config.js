/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:13:50
 */
const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// 判断环境变量
const isLocal = process.env.NODE_ENV === 'local';

module.exports = {
  entry: {
    home: path.resolve(__dirname, '../view/entry/index.tsx'),
  },

  devtool: 'source-map',
  output: {
    publicPath: '/public/dist/webpack/',
    path: path.resolve(__dirname, '../public/dist/webpack'),
    filename: '[name].js',
  },

  cache: {
    type: 'memory', // 使用内存缓存
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../view'),
    },
    fallback: {
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      process: require.resolve('process/browser'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192, // 文件大小限制，单位为字节
          },
        },
        generator: {
          filename: 'imgs/[name].[hash:8][ext]', // 指定文件输出位置和文件名
        },
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../public/dist/webpack/lib.manifest.json'), // 引用生成的 manifest 文件
    }),
    new MiniCssExtractPlugin({
      filename: isLocal ? '[name].css' : '[name].[contenthash].css',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '',
    }),
  ],
};

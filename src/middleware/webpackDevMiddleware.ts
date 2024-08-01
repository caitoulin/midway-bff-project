/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:45:00
 */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const expressToKoa = expressMiddleware => {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      expressMiddleware(ctx.req, ctx.res, err => {
        if (err) {
          reject(err);
        } else {
          resolve(void 0);
        }
      });
    });
    return await next();
  };
};

export const devMiddleware = () => {
  const webpackConfig = require('../../webpack/webpack.config.dev.js');
  const compiler = webpack(webpackConfig);
  const WebpackDevMiddleware = expressToKoa(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
      headers: { 'Access-Control-Allow-Origin': '*' },
      index: false,
      writeToDisk: path => {
        return /manifest\.json$/.test(path);
      },
    })
  );

  const WebpackHotMiddleware = expressToKoa(
    webpackHotMiddleware(compiler, {
      log: console.log,
    })
  );

  return [WebpackDevMiddleware, WebpackHotMiddleware];
};

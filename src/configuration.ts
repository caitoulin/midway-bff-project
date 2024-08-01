import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as staticFile from '@midwayjs/static-file';
import * as processAgent from '@midwayjs/process-agent';
import * as view from '@midwayjs/view-nunjucks';

@Configuration({
  imports: [egg, view, staticFile, processAgent],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('egg')
  app: egg.Application;

  async onReady() {
    const env = this.app.getEnv();
    // 初始化逻辑
    if (env === 'local') {
      const { devMiddleware } = require('./middleware/webpackDevMiddleware');
      this.app.useMiddleware([...devMiddleware()]);
    }
  }
}

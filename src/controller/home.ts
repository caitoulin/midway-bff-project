/*
 * @Author: yihe.cl
 * @Date: 2024-07-09 10:46:16
 */
import { Controller, Inject, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

import { ResourceService } from '../service/resource';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  resourceService: ResourceService;

  @Get('/')
  async home() {
    const resourceNames = ['home.js', 'home.css', 'lib.js'];
    const resource = await this.resourceService.getResource(resourceNames);

    const options = {
      lib: resource['lib.js'],
      js: resource['home.js'],
      css: resource['home.css'],
    };
    await this.ctx.render('index.html', options);
  }
}

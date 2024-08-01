/*
 * @Author: yihe.cl
 * @Date: 2024-07-31 16:49:28
 */
import { Provide } from '@midwayjs/core';

import { readFileSync } from 'fs';
import { resolve } from 'path';
const current = process.cwd();

@Provide()
export class ResourceService {
  async getResource(nameAry: string[]) {
    const manifestPath = resolve(current, 'public/dist/webpack/manifest.json');
    const manifestDllPath = resolve(
      current,
      'public/dist/webpack/manifest.dll.json'
    );
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    const manifestDll = JSON.parse(readFileSync(manifestDllPath, 'utf-8'));
    const resourceMap = nameAry.reduce((total, cur) => {
      total[cur] = manifest[cur] || manifestDll[cur];
      return total;
    }, {});
    return resourceMap;
  }
}

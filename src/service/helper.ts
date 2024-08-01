/*
 * @Author: yihe.cl
 * @Date: 2024-07-04 20:19:42
 */
import { Provide } from '@midwayjs/core';
import { IResponseType } from '../interface';

@Provide()
export class HelperService {
  public successResponse<T>(data: T, message?: string): IResponseType<T> {
    return { success: true, data, message, provider: 'route-check', code: 200 };
  }

  public errorResponse(message?: string, error?: string): IResponseType<null> {
    return {
      success: false,
      message,
      error,
      data: null,
      provider: 'route-check',
      code: 500,
    };
  }
}

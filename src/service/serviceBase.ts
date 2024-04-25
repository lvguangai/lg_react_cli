/* eslint-disable @typescript-eslint/no-explicit-any */
import requestMethod from './axiosPackage/requestMethod';

type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

class Basic extends requestMethod {
  /**
   * get示例
   */
  axiosGet(url: string, params?: any, responseType?: ResponseType) {
    return this.getReq({ url, params, responseType});
  }
  /**
   * post示例
   */
   axiosPost(url: string, data?: string | { [key: string]: any }, headers?: any, responseType?: ResponseType, params?: any) {
    return this.postReq({ url, data, params, headers, responseType });
  }
  /**
   * put示例
   */
   axiosPut(url: string, data?: string | { [key: string]: any }, headers?: any, responseType?: ResponseType, params?: any) {
    return this.putReq({ url, data, params, headers, responseType });
  }
  /**
   * delete示例
   */
   axiosDelete(url: string, data?: string | { [key: string]: any }, params?: any) {
    return this.deleteReq({ url, params, data });
  }
}

// 单列模式返回对象
const ProxyCreateSingleton = (() => {
  let instance: any = null;
  return function() {
    if (instance) return instance;
    instance = new Basic(import.meta.env.VITE_BASE_URL);
    return instance;
  };
})();
export default ProxyCreateSingleton;
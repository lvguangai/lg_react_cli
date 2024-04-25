/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosRequestConfig, Method} from 'axios';
import responseConfig from './responseConfig';
import {message} from 'antd';
const apiError = (msg: string) => {
  message.error(msg);
};

const axiosPublic = (url: string | undefined, time = 30, headers = {
  'Content-Type': 'application/json; charset=utf-8'
}): any => {
  // 定义接口
  interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    f: () => void;
  }

  // 取消重复请求
  const pending: Array<PendingType> = [];
  const CancelToken = axios.CancelToken;

  //配置项
  const config = {
    baseURL: url,
    timeout: 1000 * time,
    // withCredentials: true,
    headers: headers
  };
  // 创建响应
  const setAxios = axios.create(config);

  // 移除重复请求
  const removePending = (config: AxiosRequestConfig) => {
    pending.forEach((item, index: number) => {
      const list: PendingType = item;
      // 当前请求在数组中存在时执行函数体
      if (
        list.url === config.url &&
        list.method === config.method &&
        JSON.stringify(list.params) === JSON.stringify(config.params) &&
        JSON.stringify(list.data) === JSON.stringify(config.data)
      ) {
        // 执行取消操作
        apiError('操作太频繁，请稍后再试');
        list.f();
        // 从数组中移除记录
        pending.splice(index, 1);
      }
    });
  };
  // 添加请求拦截器
  setAxios.interceptors.request.use(
    (request: any) => {
      const token = localStorage.getItem('USER_TOKEN');
      const touristsToken = localStorage.getItem('TOURISTS_TOKEN');
      if (token) {
        request.headers.Authorization = `bearer ${token}`;
      } else {
        if (touristsToken){
          request.headers.TouristsAuthorization = `bearer ${touristsToken}`;
        }
      }
      const cb = () => {
        removePending(request);
        request.cancelToken = new CancelToken((c) => {
          pending.push({
            url: request.url,
            method: request.method,
            params: request.params,
            data: request.data,
            f: c
          });
        });
        return Promise.resolve(request);
      };
      return cb();
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // 请求响应
  setAxios.interceptors.response.use(
    function (response: any) {
      // console.log(response);
      return responseConfig(response);
    },
    function (error: any) {
      // console.log(error.response);
      return responseConfig(error?.response);
    }
  );
  return setAxios;
};

export default axiosPublic;

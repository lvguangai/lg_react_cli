/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback} from 'react';
import api from '@/service/api';
import ProxyCreateSingleton from '@/service/serviceBase';

const fetch = new (ProxyCreateSingleton as any)();

// 注册
export const useSignUp = () => {
  const run = useCallback(async (data: {
      mobile: string;
      code: string;
      password: string;
      repassword: string;
      invite_code: string;
    }) => {
    const res = await fetch.axiosPost(api.SignIn, data);
    return res;
  },[]);
  return {
    run
  };
};

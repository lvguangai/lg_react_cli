/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
const apiError = (msg: string) => {
  message.error(msg);
};
// 登录异常码
const codeWarning = [401, 403];
interface ResponseParams {
  status: number;
  data: any;
  statusText: string
}
const responseConfig = (response: ResponseParams): any => {
  const index = codeWarning.indexOf(response.status);
  if (index >= 0) {
    // token过期或验证失败重新登录
    const {origin} = window.location;
    localStorage.removeItem('USER_TOKEN');
    apiError(response.statusText);
    window.location.href = `${origin}/sign_in`;
    return response.statusText;
  }
  return response;
};
export default responseConfig;

/**
 * 基于 fetch 封装全局的http请求。  fetch和axios在于，fetch 在服务端返回任何状态码都不会抛出异常，而 axios 则会在返回码 >= 400 的情况下抛出异常。
 */
import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "context/auth-provider";
const apiurl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    // 如果是get请求，则讲入参加入到 url后边
    endpoint += `?${qs.stringify(data)}`;
  } else {
    // 如果是 post，则会转化为json字符串
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiurl}/${endpoint}`, { ...config })
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      // 如果ok
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
// useHttp 都是首先从 auth context 中拿到user
export const useHttp = () => {
  const { user } = useAuth();
  // Parameters ts 操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

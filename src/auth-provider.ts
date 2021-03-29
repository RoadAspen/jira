// 在真实环境中，如果使用 firebase 这种第三方 auth服务的话，本文件不需要开发者开发。

import { User } from "screens/project-list/search-panel";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
// 注册成功，在localstorage中存储
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};
const apiurl = process.env.REACT_APP_API_URL;
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiurl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiurl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 登出
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

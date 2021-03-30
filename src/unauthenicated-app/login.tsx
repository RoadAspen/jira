import { useAuth } from "context/auth-context";
import React, { useRef, useCallback } from "react";

// 登录
export const LoginScreen = () => {
  // 在 login 内部 调用了 setUser
  const { login, user } = useAuth();
  // 使用ref，获取真实dom，或者组件本身
  const forms = useRef<HTMLFormElement>(null);

  // 在这里，每次更新不会创建新的函数，但是可以取到新的forms 的 current
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let username, password;
      if (forms && forms.current) {
        username = (forms.current.elements[0] as HTMLFormElement).value;
        password = (forms.current.elements[1] as HTMLFormElement).value;
        console.log(username, password);
      }
      // const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
      // const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
      login({ username, password });
    },
    [forms, login]
  );
  return (
    <form onSubmit={handleSubmit} ref={forms}>
      {user ? `登陆成功，用户名：${user.name}` : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="usernmae" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

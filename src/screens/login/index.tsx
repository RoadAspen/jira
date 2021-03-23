import React, { FormEvent } from "react";
const apiurl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiurl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
        await response.json();
      }
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
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

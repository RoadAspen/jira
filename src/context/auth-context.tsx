/**
 * 负责 登录和注册的用户信息
 */
import React, { ReactNode, useState } from "react";
import * as auth from "context/auth-provider";
import { User } from "screens/project-list/search-panel";
interface AuthForm {
  username: string;
  password: string;
}
// 创建一个 context
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

// displayName  用于 devOpts
AuthContext.displayName = "AuthContext";

// AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // point free  消参
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 封装hooks，返回 context中的value值
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider中使用");
  }
  return context;
};

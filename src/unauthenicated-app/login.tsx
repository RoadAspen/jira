import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { LoginButton } from "unauthenicated-app";

// 登录
export const LoginScreen = () => {
  // 在 login 内部 调用了 setUser
  const { login, user } = useAuth();
  // 使用ref，获取真实dom，或者组件本身

  // 在这里，每次更新不会创建新的函数，但是可以取到新的forms 的 current
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? `登陆成功，用户名：${user.name}` : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LoginButton htmlType="submit" type={"primary"}>
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

import { Form, Input, Button } from "antd";
import { useAuth } from "context/auth-context";
import { LoginButton } from "unauthenicated-app";

// 登录
export const RegisterScreen = () => {
  // register 中调用了 setUser
  const { register } = useAuth();

  // 在这里，每次更新不会创建新的函数，但是可以取到新的forms 的 current
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
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
          注册
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

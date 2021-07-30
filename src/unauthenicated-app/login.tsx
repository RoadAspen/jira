import { useAuth } from "context/auth-context";
import { Form, Input, Typography } from "antd";
import { LoginButton } from "unauthenicated-app";
import { useAsync } from "utils/use-async";
interface LoginScreenProps {
  onError?: (error: Error) => void;
}
// 登录
export const LoginScreen = ({ onError }: LoginScreenProps) => {
  // 在 login 内部 调用了 setUser
  const { login, user } = useAuth();

  const { run, isLoading } = useAsync<any>(undefined, {
    throwOnError: true,
  });

  // 在这里，每次更新不会创建新的函数，但是可以取到新的forms 的 current
  const handleSubmit = async (values: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (values.password !== values.cpassword) {
      onError?.(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(login(values));
    } catch (e) {
      console.log(e);
      onError?.(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? `登陆成功，用户名：${user.name}` : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请再次输入密码" }]}
      >
        <Input placeholder={"请再次输入密码"} type="password" />
      </Form.Item>
      <Form.Item>
        <LoginButton htmlType="submit" type={"primary"} loading={isLoading}>
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

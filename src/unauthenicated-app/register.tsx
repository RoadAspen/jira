import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LoginButton } from "unauthenicated-app";
import { useAsync } from "utils/use-async";

interface RegisterScreenProps {
  onError?: (error: Error | null) => void;
}
// 登录
export const RegisterScreen = (props: RegisterScreenProps) => {
  // register 中调用了 setUser
  const { register } = useAuth();

  const { run, isLoading } = useAsync();

  // 在这里，每次更新不会创建新的函数，但是可以取到新的forms 的 current
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(register(values));
    } catch (error) {
      props.onError?.(error);
    }
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
        <LoginButton loading={isLoading} htmlType="submit" type={"primary"}>
          注册
        </LoginButton>
      </Form.Item>
    </Form>
  );
};

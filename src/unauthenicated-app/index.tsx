import { Button, Card } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
export const UnauthicatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <div>
          <Button onClick={() => setIsRegister(!isRegister)} type="primary">
            切换到{isRegister ? "登 录" : "注 册"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

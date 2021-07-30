/**
 * 登录之后
 */
import { useAuth } from "context/auth-context";

import styled from "@emotion/styled";
import ProjectListScreen from "screens/project-list";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

export const AuthicatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true} between={true}>
          {/* <img src={SoftwareLogo} alt="" /> */}
          <SoftwareLogo width="10rem" color="rgb(38,132,255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
/**
 * grid 和 flex 各自的应用场景。
 * 1、 要考虑 一维布局 还是 二维布局
 * 一般来说 一维布局 使用 flex  ， 二维布局使用 grid
 *
 * 2、 根据布局角度出发，是根据 内容布局 还是 页面布局
 * 内容布局：内容不固定，使用 flex
 * 页面布局： 页面布局固定， 使用
 */

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;

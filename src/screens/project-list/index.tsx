/**
 * 筛选列表
 */
import { ProjectListScreen } from "./project-list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumenTitle } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectSearchParams } from "./util";
function Index() {
  useDocumenTitle("项目列表");
  const [param, setParam] = useProjectSearchParams();
  const debounceParams = useDebounce(param, 1000);
  const { data: list, error, isLoading } = useProjects(debounceParams || {});
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={param} setParams={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <ProjectListScreen
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;

export default Index;

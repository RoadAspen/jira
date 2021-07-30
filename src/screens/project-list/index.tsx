/**
 * 筛选列表
 */
import { useState, useEffect } from "react";
import { ProjectListScreen } from "./project-list";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
function Index() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  // user list
  const [users, setUsers] = useState([]);

  // project list
  const [list, setList] = useState([]);

  const client = useHttp();
  const debounceParams = useDebounce(params, 1000);
  useMount(() => {
    client("users", {}).then((response) => {
      setUsers(response);
    });
  });
  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParams),
    }).then((response) => {
      setList(response);
    });
  }, [debounceParams]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <ProjectListScreen list={list} users={users} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;

export default Index;

/**
 * 筛选列表
 */
import { useState, useEffect } from "react";
import { ProjectListScreen } from "./project-list";
import SearchForm from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/index";
import { useHttp } from "utils/http";
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
    <div>
      <SearchForm params={params} setParams={setParams} users={users} />
      <ProjectListScreen list={list} users={users} />
    </div>
  );
}

export default Index;

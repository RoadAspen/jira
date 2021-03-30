/**
 * 筛选列表
 */
import { useState, useEffect } from "react";
import { ProjectListScreen } from "./project-list";
import SearchForm from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils/index";
const apiurl = process.env.REACT_APP_API_URL;
function Index() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  // user list
  const [users, setUsers] = useState([]);

  // project list
  const [list, setList] = useState([]);

  const debounceParams = useDebounce(params, 1000);
  useMount(() => {
    fetch(`${apiurl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  useEffect(() => {
    fetch(
      `${apiurl}/projects?${qs.stringify(cleanObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
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

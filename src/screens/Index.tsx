import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import SearchForm from "./SearchForm";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../utils/index";
const apiurl = process.env.REACT_APP_API_URL;
function Index() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);

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
      <ProjectList list={list} users={users} />
    </div>
  );
}

export default Index;

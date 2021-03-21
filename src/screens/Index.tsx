import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import SearchForm from "./SearchForm";
import qs from "qs";
import { cleanObject, useDebounce, useMount, useArray } from "../utils/index";
const apiurl = process.env.REACT_APP_API_URL;
function Index() {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 26 },
    { name: "ma", age: 24 },
  ];
  const { value, add, clear, removeIndex } = useArray(persons);
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useMount(() => {
    // 类型“{ name: string; age: number; }[]”上不存在属性“notExist”。
    //console.log(value.notExist);
    // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性。
    // add({name:'david'})
    // 类型“string”的参数不能赋给类型“number”的参数。
    // removeIndex("123")
  });

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
      <div>
        <button onClick={() => add({ name: "join", age: 22 })}>add join</button>
        <button onClick={() => removeIndex(0)}>remove 0</button>
        <button onClick={() => clear()}>clear</button>
        {value.map((person, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;

import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/** 获取所有的用户列表 */
export const useUsers = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useMount(() => {
    run(client("users", {}));
  });

  return {
    ...result,
    user: result.data,
  };
};

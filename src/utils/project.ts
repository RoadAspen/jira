import { useEffect } from "react";
import { Project } from "screens/project-list/project-list";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
/** 获取所有的项目列表 */
export const useProjects = (params: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(params),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return result;
};

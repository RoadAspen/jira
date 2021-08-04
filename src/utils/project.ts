import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/project-list";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
/** 获取所有的项目列表 */
export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProject = useCallback(
    () =>
      client("projects", {
        data: cleanObject(params),
      }),
    [client, params]
  );
  useEffect(() => {
    run(fetchProject(), { retry: fetchProject });
  }, [fetchProject, params, run]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();

  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { data: params, method: "PATCH" })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

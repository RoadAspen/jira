import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表提交参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam<string>(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        name: param.name,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

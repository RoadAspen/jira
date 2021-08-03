import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

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

import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./project-list";
export interface User {
  id: number;
  token: string;
  name: string;
}
export interface SearchPanelProps {
  params: Partial<Pick<Project, "name" | "personId">>;
  users: User[];
  setParams: (param: SearchPanelProps["params"]) => void;
}
function SearchPanel({ params, setParams, users = [] }: SearchPanelProps) {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          value={params?.name || ""}
          placeholder="项目名"
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={params?.personId || undefined}
          onChange={(value: number | undefined) =>
            setParams({
              ...params,
              personId: value,
            })
          }
          style={{ width: 150 }}
          placeholder={"选择人员筛选"}
          allowClear
        />
      </Form.Item>
    </Form>
  );
}

export default SearchPanel;

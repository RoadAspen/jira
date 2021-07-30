import { Form, Input, Select } from "antd";
export interface Params {
  name: string;
  personId?: number;
}
export interface User {
  token: string;
  id: number;
  name: string;
}
export interface ProjectProps {
  params: Params;
  users: User[];
  setParams: (param: Params) => void;
}
function SearchPanel({ params, setParams, users = [] }: ProjectProps) {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          value={params.name}
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
        <Select
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
          style={{ width: 150 }}
          placeholder={"选择人员筛选"}
          allowClear
        >
          {users.map((user) => {
            return (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default SearchPanel;

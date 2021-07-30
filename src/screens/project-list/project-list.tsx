import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps {
  list: Project[];
  users: User[];
}
export function ProjectListScreen({ list, users }: ListProps) {
  const columns: ColumnsType<Project> = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "部门",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "负责人",
      render: (value, project) => {
        return (
          users.find((user) => user.id === project.personId)?.name || "未知"
        );
      },
    },
    {
      title: "创建日期",
      dataIndex: "created",
      key: "created",
      render: (value, project) => {
        return (
          <span>
            {project.created ? dayjs(project.created).format("YYYY-MM-DD") : ""}
          </span>
        );
      },
    },
  ];
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
}

import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  dataSource: Project[];
  users: User[];
}
export function ProjectListScreen({ users, ...props }: ListProps) {
  const columns: ColumnsType<Project> = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render(value, project) {
        return <Link to={`/${project.id}`}>{value}</Link>;
      },
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
      {...props}
      pagination={false}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
}

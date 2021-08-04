import { Dropdown, Menu, Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
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
  refresh: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}
export function ProjectListScreen({ users, refresh, ...props }: ListProps) {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={false} disabled={true} />,
      render(value, project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render(value, project) {
        return <Link to={`/projects/${project.id}`}>{value}</Link>;
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
          users.find((user) => user.id === Number(project.personId))?.name ||
          "未知"
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
    {
      render(value, project) {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <ButtonNoPadding
                    type="link"
                    onClick={() => props.setProjectModalOpen(true)}
                  >
                    编辑
                  </ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type="link">...</ButtonNoPadding>
          </Dropdown>
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

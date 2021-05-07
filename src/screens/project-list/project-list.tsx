import React from "react";
import { Table } from "antd";

export interface List {
  id: number;
  name: string;
  personId: number;
}
export interface User {
  token: string;
  id: number;
  name: string;
}
interface ProjectProps {
  list: List[];
  users: User[];
}
export function ProjectListScreen({ list, users }: ProjectProps) {
  const dataSource = list.map((project) => ({
    id: project.id,
    name: project.name,
    manager: users.find((user) => user.id === project.personId)?.name || "未知",
  }));
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "负责人",
      dataIndex: "manager",
      key: "manager",
    },
  ];
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => {
  //         return (
  //           <tr key={project.id}>
  //             <td>{project.name}</td>
  //             <td>
  //               {users.find((user) => user.id === project.personId)?.name ||
  //                 "未知"}
  //             </td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </table>
  // );
}

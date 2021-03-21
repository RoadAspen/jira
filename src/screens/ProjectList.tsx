interface List {
  id: number;
  name: string;
  personId: number;
}
interface User {
  id: number;
  name: string;
}
interface ProjectProps {
  list: List[];
  users: User[];
}
function ProjectList({ list, users }: ProjectProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default ProjectList;

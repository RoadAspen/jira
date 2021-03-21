interface Params {
  name: string;
  personId: string;
}
interface User {
  id: number;
  name: string;
}
interface ProjectProps {
  params: Params;
  users: User[];
  setParams: React.Dispatch<
    React.SetStateAction<{
      name: string;
      personId: string;
    }>
  >;
}
function Form({ params, setParams, users = [] }: ProjectProps) {
  return (
    <form>
      <input
        type="text"
        name="project_name"
        value={params.name}
        placeholder="项目名"
        onChange={(e) =>
          setParams({
            ...params,
            name: e.target.value,
          })
        }
      />
      <select
        name="project_user"
        id="project_user"
        value={params.personId}
        onChange={(e) =>
          setParams({
            ...params,
            personId: e.target.value,
          })
        }
      >
        {users.map((user) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default Form;

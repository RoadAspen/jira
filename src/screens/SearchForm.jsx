
function Form({params,setParams,users=[]}){
    
    return <form action="">
        <input type="text" name="project_name" value={params.name} placeholder="项目名" onChange={e=>setParams({
            ...params,
            name:e.target.value
        })}/>
        <select name="project_user" id="project_user" value={params.personId} onChange={e=>setParams({
            ...params,
            personId:e.target.value
        })}>
            {
                users.map(user=>{
                    return <option value={user.id} key={user.id}>{user.name}</option>
                })
            }
        </select>
    </form>
}

export default Form
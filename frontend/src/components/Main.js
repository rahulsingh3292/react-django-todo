import List from "./List";
import {useEffect,useState} from "react";
const axios = require("axios");

function Main(){
  const user = JSON.parse(localStorage.getItem("user"));
  const url = "https://djangotodo-api.herokuapp.com/api/";
 
  const [text,setText] = useState("");
  const [todos,setTodo] = useState([]);
  const [isEditing,setIsEditing] = useState(false);
  const [updatingId,setUpdatingId] = useState(0);
  const [todoCompleted,setTodoCompleted] = useState(null);
  
  useEffect(()=>{
    axios.get(url+"get-todos/",{
        headers:{Authorization:"Token "+user.token}
      }).then(resp=>{
      const data = resp.data 
      setTodo([...data])
     
    }).catch(err=>{
      alert("Something went wrong..")
    })
  },[])
  
  const addTodo = (title)=>{
    axios.post(url+"add-todo/",{
      title:text,
      is_completed:false
    },{headers:{
      Authorization:"Token "+user.token
    }}).then(resp=>{
      const newTodo = resp.data 
      setTodo([...todos,newTodo])
      setText("")
      return 
    }).catch(err=>{
      alert("Something went wrong..")
      return 
    })
  }
  
  const clickEdit = (id,text,completed)=>{
      setText(text)
      setIsEditing(true)
      setUpdatingId(id);
      setTodoCompleted(completed)
  }
  
  
  const updateTodo = (id,isCompleted,t=null)=>{
    const txt = t?t:text
    axios.patch(url+"edit-todo/"+id+"/",{
      title:txt,
      is_completed:isCompleted
    },{headers:{
      Authorization:"Token "+user.token
    }}).then(resp=>{
     
      const idx = todos.indexOf(todos.find((item)=>{return item.id==id}))
      const newTodo = resp.data 
      
      setTodo([...todos.slice(0,idx),newTodo,...todos.slice(idx+1,todos.length)])
     canelUpdate()
      return 
      
    }).catch(err=>{
      alert(user.name + " Something went wrong..")
    return
      
    })
  }
  
  const removeTodo = (id)=>{
    axios.delete(url+"delete-todo/"+id+"/",{
      headers:{
        Authorization:"Token "+user.token
      }
    }).then(resp=>{
      const newTodos = todos.filter((item)=>{
        return item.id != id 
      })
      canelUpdate()
      setTodo([...newTodos])
      return
    }).catch(err=>{
      alert(user.name+" Something went wrong..")
    return
      
    })
  }
  
  const canelUpdate=()=>{
    setText("")
    setUpdatingId(0)
    setTodoCompleted(null)
    setIsEditing(false)
    return 
  }
  
  const logOut = () =>{
    localStorage.clear();
    window.location.replace("/login");
  }
  
  const editOrCancel = ()=>{
    return (<> 
    <button className="btn btn-primary" onClick={()=>updateTodo(updatingId,todoCompleted)}>
    Edit
    </button>
    <button className="btn btn-danger ml-2 pl-2" onClick={canelUpdate}>
    Cancel
    </button>
    </>)
  }
  
  
  return (<>
      
  <section className="vh-100 gradient-custom-2 bg-dark">
  
  <div className="container py-5 h-100">
  
    <div className="row d-flex justify-content-center align-items-center h-100">
     
      <div className="col-md-12 col-xl-10">
      
      <div className="bg-dark row">
         <div className="col-5 form">
           <input type="text" className="form-control" onChange={(e)=>setText(e.target.value)} placeholder="Add Your Task" value={text} />
         </div>
         <div className="col-7">
         {
         isEditing?editOrCancel():<button className="btn btn-outline-warning" onClick={addTodo}>Add</button>
         }
         </div>
         
       </div>
        
        
        <div className="card mask-custom mt-3">
          <div className="card-body p-4 text-white bg-dark">

            <div className="text-center pt-3 pb-2">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check" width="60"/>
              <h2 className="my-4">Task List</h2>
              
              <button className="btn  btn-danger" onClick={logOut}>Logout</button>
            </div>

            <table className="table text-white mb-0">
              <thead>
                <tr>
               
                  <th scope="col">Mark</th>
                  <th scope="col">Task</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              
             {
              todos.map((item)=>{
                return <List title={item.title} key={item.id} id={item.id} remove={removeTodo} clickEdit={clickEdit} isCompleted={item.is_completed} markComplete={updateTodo}/>
              })
             }
          </tbody>
            </table>


          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  </>);
}

export default Main;

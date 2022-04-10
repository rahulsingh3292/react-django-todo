
import {Link} from "react-router-dom";
import {useState,useEffect} from "react";
const axios = require ("axios");

export default function Login(){
 
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [done,setDone] = useState(false)
   
  useEffect(()=>{
    if (done){
    setTimeout(()=>{
      window.location.replace("/")
    },2000)}
  },[done])
  
  const Login = ()=>{
    axios.post("https://djangotodo-api.herokuapp.com/api/login/",{
      username:username,
      password:password
    }).then(resp=>{
      
      const user = resp.data.user; 
      localStorage.setItem("user",JSON.stringify(user))
      localStorage.setItem("isLogged",true)
      
      setDone(true)
      return 
    }).catch(err=>{
      alert("Wrong username or password .. try again")
      return 
    })
  }
  
  return (
    <> 
     <form className="mt-4 container">
    <h2 className="text-center"><span className="badge badge-primary">Login</span></h2>
    {
      
    
   done?<div className="alert alert-success container">Sign in success..</div>:""
      
    }
  <div className="form mb-4">
   <label className="form-label">username</label>
    <input type="email" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="Enter username"/>
   
  </div>

 
  <div className="form mb-4">
   <label className="form-label">Password</label>
    <input type="password" placeholder="Enter your password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
  </div>
     
     <div className="row">
     <div className="col-8 ml-4">
        don't have an account?<Link to="/register"> Regsiter</Link>
       </div>
     </div>
     
  <button type="button" onClick={Login} className="btn btn-outline-warning btn-block mt-2">Sign in</button>
</form>
  </>);
}
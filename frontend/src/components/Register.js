
import {useState,useEffect} from 'react';
import {useNavigate,Link} from "react-router-dom";

const axios = require("axios");

export default function Register(){
  const navigate = useNavigate();
 
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [done,setDone] = useState(false);
 
   
  useEffect(()=>{
    if(done){
      setTimeout(()=>{
      return navigate("/login")
      },2000)
    }
  },[done])
  
  const Register = ()=>{
    
    if (username.length < 5){
      alert("Username length should be more than 5 characterS..")
      return 
    }
    
    if (name.length < 5){
      alert("Name should be more than 5 characters..")
      return
    }
    
    if (password.length < 5){
      alert("password length should be more than 5 characters..")
      return 
    }
    
    axios.post("https://djangotodo-api.herokuapp.com/api/register/",{
      username:username,
      password:password,
      name:name
      
    }).then(resp=>{
      setDone(true)
      return 
    }).catch(err=>{
      if(err.response.status === 409){
        alert("This username already exists..")
      return 
      }
      alert("Something went wrong..")
      return 
    })
    
  }
  
  return (
    <> 
     <form className="mt-4 container">
    <h2 className="text-center"><span className="badge badge-primary">SignUp</span></h2>
     
     {done?
     <div className=" mt-2 alert alert-success" role="alert">Sign up  success redirecting you to Login page..</div>:""}
  <div className="form mb-4">
   <label className="form-label">username</label>
    <input type="email" value={username}  onChange={(e)=>{setUsername(e.target.value)}} className="form-control" placeholder="Enter username"/>
   
  </div>

    <div className="form mb-4">
   <label className="form-label">Name</label>
    <input type="email" value={name} className="form-control" onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Your Name" />
  </div>
 
  <div className="form mb-4">
   <label className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter your password" className="form-control" />
  </div>
     
     <div className="row">
     <div className="col-8 ml-4">
        already have an account?<Link to="/login"> SignIn</Link>
       </div>
     </div>
     
  <button type="button" onClick={Register} className="btn btn-outline-success btn-block mt-3">Sign Up</button>
</form>
  </>);
}
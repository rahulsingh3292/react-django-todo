
import Main from "./components/Main";
import {Route,Navigate,Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App(){

  const isLogged = JSON.parse(localStorage.getItem("isLogged"));
 
  return (
    <Routes>
   
     <Route path="/" exact element={isLogged?<Main/>:<Navigate to="/login" replace/>}/>
     
     <Route path="/login" extact element={!isLogged?<Login/>:<Navigate to="/" replace/>}/>
     
     <Route path="/register" extact element={!isLogged?<Register/>:<Navigate to="/" replace/>}/>
     
     <Route path="*" element={<h1>404 Page Not found..</h1>}/>
     </Routes>
    );
}

export default App;

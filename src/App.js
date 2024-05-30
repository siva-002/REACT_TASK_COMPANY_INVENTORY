import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/user/Home";
import Logout from "./components/Logout";
import {DataProvider} from "./components/user/Context/DataContext";


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/user">
            <Route index element={<DataProvider><Home/></DataProvider> }></Route>
            <Route path="logout" element={<Logout/>}></Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;

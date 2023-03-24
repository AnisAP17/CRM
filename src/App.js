import "./App.css";
import LoginPage from "./component/LoginPage/LoginPage";
import HomePage from "./component/HomePage/HomePage";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Authorization from "./component/Authorization/Authorization";
import Client from "./component/HomePage/Client/Client";
import Applications from "./component/HomePage/Applications/Applications";
import Expenses from "./component/HomePage/Expenses/Expenses";
import Income from "./component/HomePage/Income/Income";



function App() {
  const [userRegistr, setUserRegistr] = useState(localStorage.getItem("user"));

  return (
    <div>
      <Routes>
        <Route path="/" element={userRegistr ? <HomePage/> : <LoginPage/>} />
        <Route path="/auth" element={userRegistr ? <HomePage/> : <Authorization />} />
        <Route path="/client" element={<Client/>}/>
        <Route path="/applications" element={<Applications/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/income" element={<Income/>}/>

      </Routes> 
    </div>
  );
}

export default App;

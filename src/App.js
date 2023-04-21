import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Certificate from "./components/Certificate";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details"
import { useState } from "react";
import Approve from "./pages/Approve";
import NablSite from "./pages/NablSite";

function App() {
  const[isAuth,setIsAuth]=useState(false);

  return (
    <>
    <Routes>
        
        <Route path="/" element={<HomePage  setIsAuth={setIsAuth} isAuth={isAuth} />} />
        <Route path="/details" element={<Details  setIsAuth={setIsAuth} isAuth={isAuth}/>} />
        <Route path="/approve" element={<Approve />}/>
        <Route path="/nabl" element={<NablSite />}/>
      </Routes>
      {/* <Certificate /> */}
    
    </>
  );
}

export default App;

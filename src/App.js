import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Certificate from "./components/Certificate";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details"
import { useState } from "react";

function App() {
  const[isAuth,setIsAuth]=useState(false);

  return (
    <>
    <Routes>
        
        <Route path="/" element={<HomePage  setIsAuth={setIsAuth} isAuth={isAuth} />} />
        <Route path="/details" element={<Details  setIsAuth={setIsAuth} isAuth={isAuth}/>} />
      </Routes>
      {/* <Certificate /> */}
    
    </>
  );
}

export default App;

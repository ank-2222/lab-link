import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Certificate from "../components/Certificate"


import "./HomePage.css";
// import Certificate from "../components/Certificate";

function HomePage({ setIsAuth, isAuth }) {
  // const[userData,setUserData]=useState({});

  const [dataList, setDataList] = useState([]);
  const dataCollectionRef = collection(db, "machineData");

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(dataCollectionRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

    getList();
  }, []);

  // console.log(dataList);
  console.log(dataList);

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    if (result) {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      // setUserData(result);
      navigate("/details");
    }
  };

  return (
    <div className="homeMain">
      
        <div>
          {
            dataList?.map((elem,index)=>{
              return(
            <>
             <Certificate key={index} elem={elem}/>
            </>
              );
            })
          }
        </div>
     

      <div className="loginMain">
        <button className="loginEngineer" onClick={signInWithGoogle}>
          Login For Engineer!
        </button>
      </div>

      {/* <div className="loginMain">
        <Link to="/approve" className="loginEngineer">
          Get Certified by NABL
        </Link>
      </div>

      <div className="loginMain">
        <Link to="/nabl" className="loginEngineer">
          NABL Site
        </Link>
      </div> */}
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import logo from "../img/lab.png"
import{TbCertificate} from "react-icons/tb"

import "./HomePage.css";
// import Certificate from "../components/Certificate";

function HomePage({ setIsAuth, isAuth }) {
  // const[userData,setUserData]=useState({});

  const [dataList, setDataList] = useState([]);
  const dataCollectionRef = collection(db, "nablApprovedData");

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(dataCollectionRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

    getList();
  }, []);

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
        
                {/* {dataList[0].status && (
                  <div className="certificateMain">
                    <h1 className="certificateHead">
                      <img
                        classname="logo"
                        src={require("../img/logo.png")}
                        width="80px"
                        height={"80px"}
                        alt="logo"
                      />
                      Certificate
                    </h1>
                    <div className="indi">
                      <h3 className="details">Manufacturer: </h3>
                      <h4>{dataList[0].nablData.sendData.manufacturer}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Liscense:</h3>
                      <h4> {dataList[0].nablData.sendData.liscense}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Model Number:</h3>
                      <h4> {dataList[0].nablData.sendData.model}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Owner:</h3>
                      <h4> {dataList[0].nablData.sendData.owner}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Purchase Date: </h3>
                      <h4>
                        {" "}
                        {moment(
                          dataList[0].nablData.sendData.purchaseDate
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Last Service Date: </h3>
                      <h4>
                        {moment(
                          dataList[0].nablData.sendData.lastService
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Next Service Date: </h3>
                      <h4>
                        {moment(
                          dataList[0].nablData.sendData.nextService
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                  </div>
                )} */}



{/* <Certificate/> */}

           
          {/* {dataList?.map((certificate) => {
            return (
              <>
                {certificate.status && (
               
                 
                )}
              </>
            );
          })} */}


<div className="certificateMain">
                      <div className="certificateHero">
                        <TbCertificate style={{marginRight:"20px"}} fontSize={40}/>
                        <h1>Maintenance Certificate</h1>
                      </div>
                      <div className="certificatePara">
                        <p>
                          <b>LAB LINK</b> Certifies that a thorough service has been carried out in accordance with the service schedule.
                        </p>
                      </div>
                      <div className="certificateContent">
                        <div className="detailDiv">
                    <h3>Machine ID:</h3>
                    <h4>10001</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Machine Name:</h3>
                    <h4>MRI Machine</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Manufacturer:</h3>
                    <h4>Phillips</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Purchase Date:</h3>
                    <h4>2020-02-15</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Maintenance Date:</h3>
                    <h4>2022-03-12</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Next Maintenance:</h3>
                    <h4>2022-09-15</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Calibration Date:</h3>
                    <h4>2022-03-15</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Calibration Expiry:</h3>
                    <h4>2023-03-15</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Location:</h3>
                    <h4>Delhi</h4>
                  </div>
                  <div className="detailDiv">
                    <h3>Status:</h3>
                    <h4>OK</h4>
                  </div>
                 
                     
                  

                
                      </div>


                      <div className="certificateFooter">
                        <div className="footerDiv1">
                        <div >
                          <p className="key">Date:</p>
                          <p className="value">12/12/34</p>                          
                        </div>
                        <div>
                        <p className="key">Certified By:</p>
                        <p className="value">lablink Laboratory</p>
                        </div>
                        </div>
                        <div className="footerDiv2">
<img src={logo} className="certificateLogo" alt="lab link"></img>
                        </div>
                       
                      </div>
                      <div className="hrLine">
                      </div>
                      <div className="certificateCreated">
                        <h5>Created by LabLink Sol. Tech</h5>
                      </div>
                  </div>


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

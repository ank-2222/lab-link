import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import "./Certificate.css";
import logo from "../img/lab.png";
import { TbCertificate } from "react-icons/tb";
function Certificate() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const dataCollectionRef = collection(db, "machineData");
  const approveDataRef = collection(db, "approveData");
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(dataCollectionRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

    getList();
  }, []);

  const approveFunc = async () => {
    // console.log("approve")
    const sendData = dataList[0];
    await addDoc(approveDataRef, {
      sendData,
    });

    // navigate("/");
  };

  return (
    <div className="certificateMain">
      <div className="certificateHero">
        <TbCertificate style={{ marginRight: "20px" }} fontSize={40} />
        <h1>Maintenance Certificate</h1>
      </div>
      <div className="certificatePara">
        <p>
          <b>LAB LINK</b> Certifies that a thorough service has been carried out
          in accordance with the service schedule.
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
          <div>
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
      <div className="hrLine"></div>
      <div className="certificateCreated">
        <h5>Created by LabLink Sol. Tech</h5>
      </div>
    </div>
  );
}

export default Certificate;

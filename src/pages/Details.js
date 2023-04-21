import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
export default function Details({ isAuth }) {
  const navigate = useNavigate();
  const [machineId, setMachineId] = useState("");
  const [machineName, setMachineName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [date, setDate] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [nextMaintenance, setNextMaintenance] = useState("");
  const [calibrationDate, setCalibrationDate] = useState("");
  const [calibrationExpiry, setCalibrationExpiry] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const dataCollectionRef = collection(db, "machineData");

  const submitHandler = async () => {
    if (
      !machineId ||
      !machineName ||
      !manufacturer ||
      !purchaseDate ||
      !maintenanceDate ||
      !nextMaintenance ||
      !calibrationDate ||
      !calibrationExpiry ||
      !location ||
      !status
    ) {
      toast.warn("Enter all Data!!!");
    } else {
      if (purchaseDate > date) {
        toast.warn("Purchase Date should be less than currnt date");
      }
      await addDoc(dataCollectionRef, {
        machineId,
        machineName,
        manufacturer,
        purchaseDate,
        date,
        maintenanceDate,
        nextMaintenance,
        calibrationDate,
        calibrationExpiry,
        location,
        status,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      toast("Data Added Successfully!");
      navigate("/");
    }
  };

    // useEffect(() => {
    //   if (!isAuth) {
    //     navigate("/");
    //   }
    // }, []);

  const handleOptionChange = (value) => {
    setStatus(value);
  };

  // console.log(status);
  return (
    <div className="detailsMain">
      <h1 className="detailHead">REPORT DATA</h1>

      <div className="detailsForm">
        <div>
          <div className="detailsInput">
            <h4>Machine ID</h4>
            <input onChange={(e) => setMachineId(e.target.value)} type="text" />
          </div>
          <div className="detailsInput">
            <h4>Machine Name</h4>
            <input
              onChange={(e) => setMachineName(e.target.value)}
              type="text"
            />
          </div>
          <div className="detailsInput">
            <h4>Manufacturer</h4>
            <input
              onChange={(e) => setManufacturer(e.target.value)}
              type="text"
            />
          </div>
          <div className="detailsInput">
            <h4>Purchase Date</h4>
            <input
              onChange={(e) => setPurchaseDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="detailsInput">
            <h4>Maintenance Date</h4>
            <input
              onChange={(e) => setMaintenanceDate(e.target.value)}
              type="date"
            />
          </div>
        </div>

        <div>
          <div className="detailsInput">
            <h4>Next Maintenance Date</h4>
            <input
              onChange={(e) => setNextMaintenance(e.target.value)}
              type="date"
            />
          </div>
          <div className="detailsInput">
            <h4>Calibration Date</h4>
            <input
              onChange={(e) => setCalibrationDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="detailsInput">
            <h4>Calibration Expiry</h4>
            <input
              onChange={(e) => setCalibrationExpiry(e.target.value)}
              type="date"
            />
          </div>
          <div className="detailsInput">
            <h4>Data Entry Date</h4>
            <input onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
          <div className="detailsInput">
            <h4>Location</h4>
            <input onChange={(e) => setLocation(e.target.value)} type="text" />
          </div>
        </div>
      </div>
        <h4 className="statusHead">Status</h4>
      <div className="radioInput">

        <div>
          <label htmlFor="status">OK</label>
          <input
            value="true"
            type="radio"
            name="status"
            onChange={(e) => handleOptionChange(true)}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="status">FAULTY</label>
          <input
            value="false"
            onChange={(e) => handleOptionChange(false)}
            type="radio"
            name="status"
          />
        </div>
      </div>
      <div className="submitBtnDiv">
        <button className="submitBtn" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

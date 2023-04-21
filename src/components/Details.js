import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
export default function Details({ isAuth }) {
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [owner, setOwner] = useState("");
  const [liscense, setLiscense] = useState("");
  const [lastService, setLastService] = useState(new Date());
  const [nextService, setNextService] = useState(new Date());

  const dataCollectionRef = collection(db, "machineData");

  const uploadData = async () => {
    await addDoc(dataCollectionRef, {
      model,
      manufacturer,
      purchaseDate,
      owner,
      liscense,
      lastService,
      nextService,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    toast("Data Added Successfully!");
    navigate("/");
  };

  //   useEffect(() => {
  //     if (!isAuth) {
  //       navigate("/");
  //     }
  //   }, []);

  return (
    <div className="detailsMain">
      <div className="detailsForm">
        <div className="detailsInput">
          <h4>Machine ID</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Machine Name</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Manufacturer</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Maintenance Date</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Next Maintenance</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Calibration Date</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Calibration Expiry</h4>
          <input  type="text" />
        </div>
        <div className="detailsInput">
          <h4>Location</h4>
          <input  type="text" />
        </div>
      </div>
    </div>
  );
}

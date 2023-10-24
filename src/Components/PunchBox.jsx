import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { DB, Storage } from "../config/firebase.config";
import moment from "moment";
import { FaCamera, FaCheck, FaFingerprint, FaUser, FaX } from "react-icons/fa6";
const cat = [{ name: "Bike" }, { name: "Train" }];

// Confirmation Form
const Punch = ({ close, submitIN }) => {    
  return (
    <div className="absolute top-0 self-auto z-50 bg-slate-200 w-screen h-screen">
      <div className="bg-white w-72 mt-48 ml-14 p-3 border-2 border-black rounded-lg">
        <div className="flex justify-center p-3">
          <h1 className="text-2xl font-bold capitalize">Confirm Punch</h1>
        </div>
        <div className="flex justify-center gap-10">
          <button
            className="py-4 px-10 rounded-3xl bg-green-500"
            onClick={submitIN}
          >
            <FaCheck />
          </button>
          <button className="py-4 px-10 rounded-3xl bg-red-500" onClick={close}>
            <FaX />
          </button>
        </div>
      </div>
    </div>
  );
};
// Main Form Punch Form
const punchRef = collection(DB, "Punch");
const PunchBoxModel = ({ close }) => {
  const [selectCtg, setSelectCtg] = useState();
  const [catagoryList, setCatagoryList] = useState(cat);
  const [confirModel, setConfirModel] = useState(false);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [kiloMetor,setKiloMetor] = useState(null);
  const [onPunch, setOnPunch] = useState("OUT");
  const [selectImg, setSelectImg] = useState(null);
  const [startKm,setStartKm] = useState(null);
  const [collectionId,setCollectionId] = useState(null);

  const Date = () => {
    const date = moment().format("DD MMMM  YYYY");
    localStorage.setItem("Date", date);
    setDate(date);
    return date;
  };
  const Time = () => {
    const time = moment().format("h:mm a");
    localStorage.setItem("Time", time);
    setTime(time);
    return time;
  };
  useEffect(() => {  
    const punch = localStorage.getItem('Punch');
    const Start = localStorage.getItem('start');
    const Sel = localStorage.getItem('sel');
    const id = localStorage.getItem('id');    
    if(punch){
      setOnPunch(punch);
      setStartKm(Start);
      setSelectCtg(Sel);
      setCollectionId(id);
    }
    console.log(collectionId);
  }, []);
  const onSelected = (e) => {
    setSelectCtg(e.target.value);
  };
  const clearInput = () => {
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectImg(imageURL);
    }
  };
  const submitIN = async () => {
    // Insert data in collection  
    const data = {trpmode:selectCtg,punch:[{startKm:kiloMetor,time:Time(),date:Date(),img:selectImg}]};
    if (onPunch === 'OUT') {
      localStorage.setItem('Punch','IN');
      localStorage.setItem('start',kiloMetor);
      localStorage.setItem('sel',selectCtg);
      localStorage.setItem('id',collectionId);      
      await addDoc(punchRef,data).then((doc)=>{
        localStorage.setItem('id',doc.id);
        setConfirModel(false);        
        window.location.reload(false);
        close();
      })
      
      
    } else if(onPunch === 'IN'){
      const data = {trpmode:selectCtg,punch:[{endKm:kiloMetor,time:Time(),date:Date(),img:selectImg}]};      
      const getdata = doc(punchRef,collectionId);
      updateDoc(getdata,data).then((doc)=>{
        localStorage.setItem('Punch','OUT');
        localStorage.removeItem('sel');
        localStorage.removeItem('start');  
        localStorage.removeItem('id');   
        setConfirModel(false);        
        window.location.reload(false);      
        close();
      })
 
 
    }  
  };
  return (
    <>
      {confirModel && <Punch close={() => setConfirModel(false)} submitIN={submitIN} />}
      <div
        className="absolute w-screen h-screen z-40 top-0"
        onClick={close}
      ></div>
      <div className="flex justify-center">
        <div className="absolute w-72 p-4 bg-white mt-20 rounded-lg shadow-lg z-40">
          <FaX className="text-3xl w-6 h-5 absolute right-3" onClick={close} />
          <div className="py-3 font-bold ">
            <h4>Transportation Mode</h4>
          </div>
          <div className="flex flex-col py-1">
            <label className="text-sm"> Choose Transportation Mode</label>
            <select
              value={selectCtg}
              onChange={onSelected}
              disabled={onPunch === "OUT" ? false : true}
              className="bg-white border-b-2 py-3 valid:outline-none"
            >
              <option selected disabled>
                Select Transportant
              </option>
              {catagoryList.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          {selectCtg === "Bike" ? (
            onPunch === "OUT" ? (
              <>
                <div className="flex flex-col py-1">
                  <input
                  value={kiloMetor}
                  onChange={(e)=>setKiloMetor(e.target.value)}
                    type="tel"
                    className="valid:outline-none border-b-2 py-2"
                    placeholder="Enter start KM"            
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label for="in" className="text-sm flex items-center gap-3">
                    <FaCamera className="text-3xl text-yellow-500" />
                    <strong> Take Photo</strong>
                  </label>
                  <input
                    id="in"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <img src={selectImg} />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col py-1">
                  <input
                  value={startKm}
                    type="tel"
                    disabled
                    className="valid:outline-none border-b-2 py-2"
                    placeholder="Enter start KM"
                  />
                </div>
                <div className="flex flex-col py-1">
                  <input     
                  value={kiloMetor}
                  onChange={(e)=>setKiloMetor(e.target.value)}     
                    type="tel"
                    className="border-b-2 py-2 valid:outline-none"
                    placeholder="Enter end KM"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label for="in" className="text-sm flex items-center gap-3">
                    <FaCamera className="text-3xl text-yellow-500" />
                    <strong> Take Photo</strong>
                  </label>
                  <input
                    id="in"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </>
            )
          ) : (
            ""
          )}
          <div className="flex justify-center">
            {onPunch === "OUT" ? (
              <button
                className="bg-green-500 text-white p-3 rounded-xl"
                onClick={() => setConfirModel(true)}
              >
                Punch IN
              </button>
            ) : (
              <button
                className="bg-green-500 text-white p-3 rounded-xl"
                onClick={() => setConfirModel(true)}
              >
                Punch OUT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
// Main Container
export default function PunchBox() {
  const [modelOpen, setModelOpen] = useState(false);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  useEffect(() => {  
    setDate(localStorage.getItem("Date"));
    setTime(localStorage.getItem("Time"));
  }, []);

  return (
    <>
      {modelOpen && <PunchBoxModel close={() => setModelOpen(false)} />}
      <div className="bg-blue-700 h-36 shadow-lg p-3 m-2 rounded-md flex justify-center items-center gap-5">
        <div className="border-2 rounded-full w-24 h-24 relative flex justify-center items-center">
          <FaUser className="text-6xl text-white " />
        </div>
        <div className="text-white italic">
          <p className="text-xs">Hello,</p>
          <h6>Amit Pandey</h6>
          <p className="text-xs">You hav punched in @</p>
          <p className="text-xs">
            {date} {time}
          </p>
        </div>
        <div
          className="border-2 rounded-full w-24 h-24 relative flex justify-center items-center"
          onClick={() => setModelOpen(true)}
        >
          <FaFingerprint className="text-7xl text-white " />
        </div>
      </div>
    </>
  );
}

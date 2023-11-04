import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Auth, DB, Storage } from"../config/firebase.config";
import moment from "moment";
import { FaCamera, FaCheck, FaFingerprint, FaUser, FaX } from "react-icons/fa6";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ClipLoader } from "react-spinners";
import calculateTimeDuration from "../Functions/calculateTimeDuration";
const cat = [{ name: "Bike" }, { name: "Train" }];

// Confirmation Form
const Punch = ({ close, submitIN, spin }) => {
  return (
    <div
      className="absolute top-0 self-auto z-50 w-screen h-screen"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
    >
      <div className="bg-white w-72 mt-72 ml-14 p-3 border-2 border-black rounded-lg">
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
  const [onPunch, setOnPunch] = useState("OUT");
  const [startKm, setStartKm] = useState(null);
  const [kiloMetor, setKiloMetor] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [selectImg, setSelectImg] = useState(null);
  const [startTime, setStartTime] = useState(null);  
  const [loader, setloader] = useState(false);  
  const [progres, setProgres] = useState(0);
  const [duration, setDuration] = useState(null);
  const [userId, setUserId] = useState(null);
  const Date = () => {
    return moment().format("DD MMMM  YYYY");
  };
  const Time = () => {
    return moment().format("h:mm A");
  };
  useEffect(() => {
    const punch = localStorage.getItem("Punch");
    const Start = localStorage.getItem("start");
    const Sel = localStorage.getItem("sel");
    const id = localStorage.getItem("id");
    const Time = localStorage.getItem("Time");
    const Date = localStorage.getItem("Date");
    console.log(Time, Date);
    if (punch) {
      setStartTime(Time);
      setDate(Date);
      setOnPunch(punch);
      setStartKm(Start);
      setSelectCtg(Sel);
      setCollectionId(id);
      console.log("DocId :", collectionId);
    }    
  }, []);  
  const onSelected = (e) => {
    setSelectCtg(e.target.value);
  };
  const submitIN = async () => {
    if (selectCtg === "Bike") {
      if (!selectCtg || !startKm || !selectImg) {
        return alert("Please Fill All Data !!!");
      }
      const storageRef = ref(Storage, `PunchImg/${uuidv4()}`);
      const uploadImg = uploadBytesResumable(storageRef, selectImg);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progresPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgres(progresPercent);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadImg.snapshot.ref).then((url) => {
            if (onPunch === "OUT") {
              addDoc(punchRef, {
                userid:'',                
                date: Date(),
                TrpMode: selectCtg,
                startkm: startKm,
                starttime: Time(),
                startImg: url,
                endkm: null,
                endtime: null,
                endImg: null,
                totalkm: null,
                duration: null,
              })
                .then((doc) => {
                  localStorage.setItem("id", doc.id);
                  localStorage.setItem("Punch", "IN");
                  localStorage.setItem("start", startKm);
                  localStorage.setItem("sel", selectCtg);
                  localStorage.setItem("Time", Time());
                  localStorage.setItem("Date", Date());
                  setConfirModel(false);
                  window.location.reload(false);
                  close();
                })
                .catch((error) => alert("Upload Error"));
            } else if (onPunch === "IN") {
              const getdata = doc(punchRef, collectionId);
              updateDoc(getdata, {
                endkm: kiloMetor,
                endtime: Time(),
                endImg: url,
                totalkm: kiloMetor - startKm,
                duration: calculateTimeDuration(startTime, Time()),
              }).then(() => {
                localStorage.setItem("Punch", "OUT");
                localStorage.removeItem("sel");
                localStorage.removeItem("start");
                localStorage.removeItem("id");
                window.location.reload(false);
                localStorage.setItem("Time", Time());
                localStorage.setItem("Date", Date());
                setConfirModel(false);
                close();
              });
            }
          });
        }
      );
    } else if (selectCtg === "Train") {
    }
  };

  return (
    <>
      {confirModel && (
        <Punch close={() => setConfirModel(false)} submitIN={submitIN} />
      )}
      <div
        className="absolute w-screen h-screen z-40 top-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
        onClick={close}
      ></div>
      <div className="flex justify-center">
        <div className="absolute w-72 p-4 bg-white mt-20 rounded-lg shadow shadow-slate-400 z-40">
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
            <>
              <div className="flex flex-col py-1">
                <input
                  disabled={onPunch === "OUT" ? false : true}
                  value={startKm}
                  onChange={(e) => {
                    setStartKm(e.target.value);
                  }}
                  type="tel"
                  className="valid:outline-none border-b-2 py-2"
                  placeholder="Enter start KM"
                />
              </div>
              {onPunch == "IN" ? (
                <div className="flex flex-col py-1">
                  <input
                    value={kiloMetor}
                    onChange={(e) => {
                      setKiloMetor(e.target.value);
                    }}
                    type="tel"
                    className="border-b-2 py-2 valid:outline-none"
                    placeholder="Enter end KM"
                  />
                </div>
              ) : (
                ""
              )}
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
                  onChange={(e) => setSelectImg(e.target.files[0])}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="flex justify-center">
            <button
              disabled={
                onPunch === "OUT"
                  ? !(startKm && selectImg)
                  : !(kiloMetor && selectImg)
              }
              className="flex justify-center items-center disabled:bg-green-800 bg-green-500 w-40 h-12 text-white font-bold rounded-3xl"
              onClick={() => setConfirModel(true)}
            >
              {loader == false ? (
                onPunch === "OUT" ? (
                  "Punch IN"
                ) : (
                  "Punch OUT"
                )
              ) : (
                <ClipLoader color="#fff" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
// Main Container
export default function PunchBox() {
  const [modelOpen, setModelOpen] = useState(false);
  const [punch, setPunch] = useState("OUT");
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  useEffect(() => {
    setPunch(localStorage.getItem("Punch"));
    setDate(localStorage.getItem("Date"));
    setTime(localStorage.getItem("Time"));
  }, []);

  return (
    <>
      {modelOpen && <PunchBoxModel close={() => setModelOpen(false)} />}
      <div className="bg-blue-700 h-36 shadow-md shadow-slate-400 p-3 m-4 rounded-md flex justify-evenly items-center gap-5">
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
          <FaFingerprint
            className="text-7xl"
            color={punch == "IN" ? "green" : "white"}
          />
        </div>
      </div>
    </>
  );
}

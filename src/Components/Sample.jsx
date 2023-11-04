import { useState } from "react";
import { stringify, v4 as uuidv4 } from "uuid";
import { DB,Storage } from "../config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { ClipLoader } from "react-spinners";
const punchRef = collection(DB, "Punch");
export default function Sample(params) {
  const [select, setSelect] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [url, setUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState();
  const [progres, setProgres] = useState(0);

  const UploadFile=async ()=>{
    if (!file) {
      return alert("Please Select File !!!");
    }    
    let URL = null;
    const storageRef = ref(Storage, `PunchImg/${uuidv4()}`);
    const uploadImg = uploadBytesResumable(storageRef, file);
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
                    setUrl(url);
        });
        return url
      }
    );

  }
  const Submit = async () => {
  const imgUrl=UploadFile();
  addDoc(punchRef, {files: url})
            .then(() => alert("Uploaded :)"))
            .catch((error) => alert("Upload Error"));
  
  };
  return (
    <div className="">
      <select onClick={(e) => setSelect(e.target.value)}>
        <option selected disabled>
          Select Mode
        </option>
        <option value="Bike">Bike</option>
        <option value="Train">Train</option>
      </select>
      <input
        placeholder="start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        placeholder="End"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <input
        id="in"
        type="file"
        accept="image/*"
        capture="environment"
        className=""
        onChange={(e) => setFile(e.target.files[0])}
      />
      {`${progres}%`}
      <button       
        className="disabled:bg-slate-800"
        onClick={Submit}
      >
       Submit
      </button>
    </div>
  );
}

import { useState } from "react";
const cat = [{ name: "Bike" }, { name: "Train" }];
function Model({ close }) {
  const [selectCtg, setSelectCtg] = useState();
  const [catList, setCatList] = useState(cat);
  const [startKm, setStartKm] = useState();
  const [onPunch, setOnPunch] = useState("IN");
  return (
    <>
      <div className="bg-slate-500 absolute top-0 h-screen w-screen"></div>
      
      { selectCtg === 'Bike' ? onPunch === "OUT" ? (
        <input
          type="tel"
          value={startKm}
          onChange={(e) => setStartKm(e.target.value)}
        />
        
      ) : (
        ""
      ) :''}
    </>
  );
}

export default function Selmple() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <>
      {openModel && <Model close={(e) => setOpenModel(e.target.value)} />}

      <div className="">
        <button className="">Click Me</button>
        <Model />
      </div>
    </>
  );
}

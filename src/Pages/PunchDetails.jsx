import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiLinkAlt, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "../config/firebase.config";
const ImageViwer = ({ close, imgurl }) => {
  return (
    <>
      <div
        onClick={close}
        className="absolute top-0 left-0 right-0 h-screen w-screen z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.46)" }}
      ></div>
      <div className="w-screen z-50 absolute bg-white flex justify-center mt-14">
        <BiX className="absolute right-0 text-4xl" onClick={close} />
        <img src={imgurl} width={400} height={400} />
      </div>
    </>
  );
};
const punchRef = collection(DB, "Punch");
export default function PunchDetails() {
  const [dataList, setDataList] = useState([]);
  const [imgViwerModel, setImgViwerModel] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const getData = async () => {
    const date = await getDocs(punchRef);
    const filteredData = date.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDataList(filteredData);
    console.log(dataList);
  };
  useEffect(() => {
    getData();
  }, []);
  const imgOpner = (url) => {
    setImgUrl(url);
    setImgViwerModel(true);
  };

  return (
    <>
      {imgViwerModel && (
        <ImageViwer close={() => setImgViwerModel(false)} imgurl={imgUrl} />
      )}
      <div className="px-5 w-screen bg-slate-200 h-screen">
        <div className="bg-blue-800 w-screen h-20 absolute left-0 top-12"></div>
        <div className="py-3 flex gap-2 items-center drop-shadow-none">
          <BiCalendar className="text-xl text-white" />
          <p className="text-lg text-white capitalize">october 2023</p>
        </div>
        {dataList.map((item) => (
          <div className="p-3 rounded-lg drop-shadow-sm bg-white">
            <div className="flex justify-between pb-3">
              <strong className="text-xl">{item.date}</strong>
              <strong className="capitalize text-xl">{item.TrpMode}</strong>
            </div>
            <div className="bg-blue-200 rounded-lg p-3 flex justify-between">
              <div className=" flex flex-col">
                <p className="capitalize text-green-500 text-lg">punched in</p>
                <strong className="text-lg">{item.starttime}</strong>
                <Link className="text-slate-500 flex items-center gap-1 text-sm">
                  <BiLinkAlt className="text-green-500" />
                  attechment
                </Link>
              </div>
              <div className=" flex flex-col gap-0">
                <p className="capitalize text-red-500 text-lg">punched out</p>
                <strong className="text-lg">{item.endtime}</strong>
                <Link
                  onClick={() => imgOpner(item.endImg)}
                  className="text-slate-500 flex items-center gap-1 text-sm"
                >
                  <BiLinkAlt className="text-green-500" />
                  attechment
                </Link>
              </div>
              <div className=" flex flex-col gap-0">
                <p className="capitalize text-blue-500 text-lg">duration</p>
                <strong className="text-lg">{item.duration}</strong>
              </div>
            </div>
            <div className="bg-white border mt-3 border-slate-300 flex justify-around rounded-lg">
              <div className="flex justify-center items-center flex-col w-32 border-r p-2 border-slate-300">
                <p className="capitalize text-slate-500 text-sm">start KM</p>
                <strong className="text-sm ">{item.startkm}</strong>
              </div>
              <div className=" flex justify-center items-center flex-col w-32 p-2">
                <p className="capitalize text-slate-500 text-sm">End KM</p>
                <strong className="text-sm ">{item.endkm}</strong>
              </div>

              <div className=" flex justify-center items-center flex-col w-32 p-2 border-l border-slate-300">
                <p className="capitalize text-slate-500 text-sm">Total KM</p>
                <strong className="text-sm ">{item.totalkm}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

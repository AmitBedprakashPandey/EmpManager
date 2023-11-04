import { useState } from "react";
import { BiFingerprint, BiPlus } from "react-icons/bi";
import Select from "react-select";

export default function VisitPunch(params) {
  const [selectedOption, setSelectedOption] = useState("doctor visit");
  const [isOpen, setIsOpen] = useState(false);
  const [visitPunch, setVisitPunch] = useState(false);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="bg-slate-300 py-5 px-10 m-4 flex justify-between rounded-lg shadow shadow-slate-400">
        <div className="">
          <label className="flex items-center gap-3 text-2xl uppercase">
            <input
              type="radio"
              name="radioGroup"
              value="doctor visit"
              checked={selectedOption === "doctor visit"}
              onChange={handleOptionChange}
              className="w-5 h-5"
            />
            Doctor Visit
          </label>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-3 text-2xl uppercase">
            <input
              type="radio"
              name="radioGroup"
              value="other visit"
              checked={selectedOption === "other visit"}
              onChange={handleOptionChange}
              className="w-5 h-5"
            />
            Other Visit
          </label>
        </div>
      </div>
      {selectedOption === "doctor visit" ? (
        <div>
          <div className="m-4">
            <label>Select Area</label>
            <Select className="" />
          </div>
          <div className="m-4">
            <label>Select Customer</label>
            <Select />
          </div>
        </div>
      ) : (
        <div className="m-4">
          <h1 className="text-xl py-3">Enter Other VIsit Resaon</h1>
          <textarea
            maxLength={500}
            className="w-full h-40 shadow shadow-slate-400 p-3 rounded-lg"
          ></textarea>
        </div>
      )}
      <div className="mx-5">
        <div className="border-2 border-black rounded-full w-28 h-28 flex justify-center items-center">
          <div
            onClick={() => setVisitPunch(!visitPunch)}
            className={` ${
              visitPunch === false ? "bg-red-500" : "bg-green-500"
            }  border-2 border-black rounded-full w-24 h-24 flex justify-center items-center `}
          >
            <BiFingerprint className="text-7xl text-white" />
          </div>
        </div>
      </div>
      <div className="flex">
        {isOpen && (
          <div className="w-48 max-h-60 p-4 mt-4 rounded-lg border border-gray-300 absolute right-10 bottom-28 bg-blue-500">
            <p className="text-white">Coming Soon</p>
            <div className="bg-blue-500 w-3 h-3 absolute -bottom-1 right-6 rotate-45"></div>
          </div>
        )}
        <div
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 absolute bottom-10 right-10"
          onClick={toggleDiv}
        >
          <BiPlus className="text-5xl" />
        </div>
      </div>
    </div>
  );
}

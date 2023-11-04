import React from "react";
export default function CustomerVisitList(params) {
  return (
    <>
      <div className="px-5 w-screen bg-slate-200 h-screen">
        <div className="bg-blue-800 w-screen h-20 absolute left-0 top-12"></div>
        <div className="p-3 mt-3 rounded-lg drop-shadow-sm bg-white">
          <div className="flex flex-col px-3">
            <strong className="capitalize text-lg">Dental designs (MUM002498)</strong>
            <p className="text-lg text-slate-400">06 Oct 2023</p>
          </div>
          <div className="px-3 py-2 flex justify-between">
            <div className=" flex flex-col gap-0">
              <p className="capitalize text-green-500 text-lg">punched in</p>
              <strong className="text-lg">09:34:45 AM</strong>
            </div>
            <div className=" flex flex-col gap-0">
              <p className="capitalize text-red-500 text-lg">punched out</p>
              <strong className="text-lg">09:34:45 AM</strong>
            </div>
            <div className=" flex flex-col gap-0">
              <p className="capitalize text-blue-500 text-lg">duration</p>
              <strong className="text-lg">12:12</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

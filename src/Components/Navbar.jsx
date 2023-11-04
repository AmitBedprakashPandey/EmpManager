import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { BiBell, BiHome, BiLogOut, BiMenu } from "react-icons/bi";
import { FaCamera, FaCopyright, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const SideNavBar = ({ close }) => {  
  return (
    <>
      <div
        className=" w-[100%] h-[100%] duration-200 absolute top-0 z-50"
        onClick={close}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <FaX
          className="absolute  text-3xl right-5 top-5 text-white"
          onClick={close}
        />
      </div>
      <div className="bg-blue-800 w-72 h-[100%] z-50 absolute top-0">
        <div className="relative w-32 h-32 p-3">
          <div className="border-2 w-32 h-32 rounded-full"></div>
          <div className="border-2 w-11 h-11 rounded-full flex justify-center items-center absolute -right-5 -bottom-2 bg-blue-800">
            <label for="floatingInput">
              <FaCamera className="text-2xl text-white" />
            </label>
            <input
              type="file"
              className="hidden"
              multiple={false}
              id="floatingInput"
              accept=".png, .jpg, .jpeg, image/png, image/jpg, image/jpeg"
            />
          </div>
        </div>
        <div className="p-3 ">
          <span className="flex gap-3 text-white">
            <p>Employee Id :</p>
            <p>DP-5868</p>
          </span>
          <span className="flex gap-3 text-white">
            <p>Name :</p>
            <p>Amit Pandey</p>
          </span>
        </div>
        <hr />
        <div>
          <ol className="w-[100%] mt-3">
            <Link
              to={"/pucnhdetails"}
              onClick={close}
              className="py-2 px-3 w-[100%] text-white active:bg-slate-700 focus:bg-transparent flex"
            >
              Punch IN /OUT
            </Link>
            <Link
              to={"/customervisitlist"}
              onClick={close}
              className="py-2 px-3 w-[100%] text-white active:bg-slate-700 focus:bg-transparent flex"
            >
              Customer Visit List
            </Link>
          </ol>
        </div>

        <div className="absolute bottom-0 py-5 px-8 text-white flex justify-center items-center gap-1">
          <p>Made By Amit Pandey </p>
          <FaCopyright />
          <p>2023</p>
        </div>
      </div>
    </>
  );
};
export default function Navbar() {
  const [sideNavModel, setSideNavModel] = useState(false);
  const auth = getAuth();
  const history = useNavigate();
  const signout = async () => {
    await signOut(auth).then(() => history("/login"));
  };
  return (
    <>
      <div className="bg-blue-700 p-3 flex justify-between w-screen z-50">
        <div className="flex gap-6 items-center">
          <button
            className="btn text-white text-3xl"
            onClick={() => setSideNavModel(true)}
          >
            <BiMenu />
          </button>
          <div className="uppercase text-white">emp manager</div>
        </div>
        <div className="text-white text-3xl flex gap-3">
          <Link to={"/"}>
            <BiHome />
          </Link>
          <BiBell />
          <BiLogOut onClick={signout} />
        </div>
      </div>
      {sideNavModel && <SideNavBar close={() => setSideNavModel(false)} />}
    </>
  );
}

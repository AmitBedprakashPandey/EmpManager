import { useEffect, useState } from "react";
import { BiTrash, BiEdit, BiX } from "react-icons/bi";
import { DB } from "../config/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const cityRef = collection(DB, "City");

export default function City() {
  const [cityList, setCityList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [id, setId] = useState();
  const [tital, setTital] = useState("");
  const getCity = async () => {
    const querySnapshot = await getDocs(cityRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCityList(data);
    setFilterData(data);
  };
  useEffect(() => {
    getCity();
  }, []);
  const updateBtn = (e) => {
    setId(e);
    setTital("Update City");
    setOpenModel(true);
  };
  const addBtn = (e) => {
    setTital("Add City");
    setOpenModel(true);
  };
  const deleteBtn = (id) => {
    deleteDoc(doc(cityRef, id)).then(() => {
      getCity();
    });
  };
  const searchCity = (e) => {
    const data = cityList.filter((val) =>
      val.name.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };
  return (
    <>
      {openModel && (
        <AddAndUpdateData
          id={id}
          close={() => setOpenModel(false)}
          sync={() => getCity()}
          tital={tital}
        />
      )}
      <div className="max-h-[700px] overflow-hidden overflow-y-scroll">
      <div className="flex flex-col">
          <div
            className="uppercase flex justify-center p-3  bg-blue-600 text-white"
          >
            City
          </div>
        </div>
        <div className="flex flex-col px-3 mt-2">
          <button
            onClick={addBtn}
            className="uppercase p-3 bg-green-500 text-white rounded-xl"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col px-3 mt-2">
          <input type="text" placeholder="Search" className="p-3 capitalize" required onChange={searchCity}/>
        </div>
        <table>
          <thead className="p-3">
            <th className="p-3 ">Sr.</th>
            <th className="p-3 w-20 flex justify-start ">Name</th>
            <th className="p-3 w-20 ">State</th>
            <th className="p-3">Active</th>
            <th className="p-3">Action</th>
          </thead>
        </table>
        <table>
          <tbody className="block w-full overflow-hidden overflow-y-auto max-h-[650px]">
            {filterData.map((doc, index) => (
              <tr
                key={index}
                className="flex items-center border-b border-slate-300"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 w-20 flex justify-start truncate">{doc.name}</td>
                <td className="p-3 w-20 flex justify-start truncate">{doc.state}</td>
                <td className="p-3">{doc.active === true ? "YES" : "NO"}</td>
                <td className="p-3 w-32 flex justify-center gap-3">
                  <button
                    onClick={() => updateBtn(doc.id)}
                    className="text-2xl bg-blue-500 text-white px-2 py-1 rounded-lg"
                  >
                    <BiEdit />
                  </button>

                  <button
                    onClick={() => deleteBtn(doc.id)}
                    className="text-2xl bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const AddAndUpdateData = ({ id, close, sync, tital }) => {
  const [oldName, setOldName] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [oldActive, SetOldActive] = useState(false);
  const [selectState, SetSelectState] = useState(null);
  const getolddata = async () => {
    if (tital === "Update City") {
      const datas = await getDoc(doc(cityRef, id));
      setOldName(datas.data().name);
      SetOldActive(datas.data().active);
      SetSelectState(datas.data().state);
    }
  };
  const getState = async () => {
    const stateRef = query(collection(DB, "State"),where('active','==',true));
    const querySnapshot = await getDocs(stateRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setStateList(data);    
  };
  useEffect(() => {
    
    if(tital === 'Update City'){
      getolddata();
      getState();
    }else if(tital === 'Add City'){
      getState();
    }

    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const checkboxValues = () => {
    if (!oldActive) {
      SetOldActive(true);
    } else {
      SetOldActive(false);
    }
  };
  const formhand = () => {
    if (tital === "Update City") {
      const data = doc(cityRef, id);
      updateDoc(data, { name: oldName,state:selectState,active: oldActive}).then(() => {                
        sync();
      });
    } else if(tital === 'Add City'){
      addDoc(cityRef, { name: oldName,state:selectState, active: oldActive }).then(() => {
        setOldName("");
        SetSelectState(null);
        sync();
      });
    }
  };
  return (
    <div className="">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 z-40 "
        style={{ backgroundColor: "rgb(21,21,21,0.25)" }}
        onClick={close}
      ></div>
      <div className="flex justify-center">
        <div className="absolute w-80 bg-white z-50 p-3 rounded-lg shadow-md shadow-slate-600">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl capitalize">{tital}</h3>
            <BiX className="text-3xl cursor-pointer" onClick={close} />
          </div>
          <div className="flex flex-col mt-5">
              <label className="text-base py-1 capitalize">State*</label>              
              <select className="p-3 outline-none bg-white" onChange={(e)=>SetSelectState(e.target.value)} value={selectState}>
                <option disabled selected>Select State</option>
                {stateList.map((doc)=>(
                  <option value={doc.name}>{doc.name}</option>
                ))}
              </select>
            </div>
          
            <div className="flex flex-col mt-5">
              <label className="text-base py-1 capitalize">old Name*</label>
              <input
                placeholder="customer name"
                className="p-3 capitalize disabled:bg-slate-200"
                value={oldName}    
                onChange={(e)=>setOldName(e.target.value)}            
              />
            </div>                        
          
          
          <div className="flex gap-3 my-3 items-center">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={oldActive}
              onChange={checkboxValues}
            />
            <span className="flex gap-3 items-center">
              <p>Active</p>
              <p className="capitalize text-slate-500 text-xs">
                (Click on checkbox make public)
              </p>
            </span>
          </div>
          <div className="my-3">
            <button
              onClick={formhand}
              className="bg-blue-500 text-white w-full p-3 rounded-md capitalize text-lg shadow-md duration-100 hover:shadow-slate-500 hover:bg-blue-600 disabled::bg-blue-800"
            >
              public
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

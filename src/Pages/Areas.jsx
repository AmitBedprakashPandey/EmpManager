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
const areaRef = collection(DB, "Areas");

export default function Areas() {
  const [areaList, setAreaList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [id, setId] = useState();
  const [tital, setTital] = useState("");
  const getArea = async () => {
    const querySnapshot = await getDocs(areaRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAreaList(data);
    setFilterData(data);
  };
  useEffect(() => {
    getArea();
});
  const updateBtn = (e) => {
    setId(e);
    setTital("Update Area");
    setOpenModel(true);
  };
  const addBtn = (e) => {
    setTital("Add Area");
    setOpenModel(true);
  };
  const deleteBtn = (id) => {
    deleteDoc(doc(areaRef, id)).then(() => {
      getArea();
    });
  };
  const searchCity = (e) => {
    const data = areaList.filter((val) =>
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
          sync={() => getArea()}
          tital={tital}
        />
      )}
      <div className="max-h-[700px] overflow-hidden overflow-y-scroll">
      <div className="flex flex-col">
          <div
            className="uppercase flex justify-center p-3  bg-blue-600 text-white"
          >
            Area
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
            <th className="p-3 w-20 ">City</th>
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
                <td className="p-3 w-20 flex justify-start truncate">{doc.city}</td>
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
  const [title, setTitle] = useState(null);
  const [stateList, setCityList] = useState([]);
  const [active, setActive] = useState(false);
  const [selectState, SetSelectState] = useState(null);
  const getolddata = async () => {
    if (tital === "Update Area") {
      const datas = await getDoc(doc(areaRef, id));
      setTitle(datas.data().name);
      setActive(datas.data().active);
      SetSelectState(datas.data().city);
    }
  };
  const getCity = async () => {
    const stateRef = query(collection(DB, "City"),where('active','==',true));
    const querySnapshot = await getDocs(stateRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCityList(data);    
  };
  useEffect(() => {
    
    if(tital === 'Update Area'){
      getolddata();
      getCity();
    }else if(tital === 'Add Area'){
      getCity();
    }

    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const checkboxValues = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const formhand = () => {
    if (tital === "Update Area") {
      const data = doc(areaRef, id);
      updateDoc(data, { name: title,city:selectState,active: active}).then(() => {                
        sync();
      });
    } else if(tital === 'Add Area'){
      addDoc(areaRef, { name: title,city:selectState, active: active }).then(() => {
        setTitle("");
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
              <label className="text-base py-1 capitalize">Area*</label>              
              <select className="p-3 outline-none bg-white" onChange={(e)=>SetSelectState(e.target.value)} value={selectState}>
                <option disabled selected>Select city</option>
                {stateList.map((doc)=>(
                  <option value={doc.name}>{doc.name}</option>
                ))}
              </select>
            </div>
          
            <div className="flex flex-col mt-5">
              <label className="text-base py-1 capitalize">Title*</label>
              <input
                placeholder="customer name"
                className="p-3 capitalize disabled:bg-slate-200"
                value={title}                
                onChange={(e)=>setTitle(e.target.value)}   
              />
            </div>                        
          
          
          <div className="flex gap-3 my-3 items-center">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={active}
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

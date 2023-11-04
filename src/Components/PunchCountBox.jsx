import { BiGroup, BiUser, BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function PunchCountBox() {
  return (
    <>
      <div className="bg-white grid grid-cols-2 shadow shadow-slate-400 m-4 p-4 rounded-lg" >
        <div className="flex flex-col items-center">
          <p className="uppercase font-medium text-xl">Total Visit</p>
          <p className="font-bold text-2xl">10</p>
        </div>        
        <div className="flex flex-col items-center">
          <p className="uppercase font-medium text-xl">Month Visit</p>
          <p className="font-bold text-2xl">10</p>
        </div>
      </div>

      <div className="h-auto w-auto grid grid-cols-3 grid-rows-3 gap-1 m-4 shadow shadow-slate-400 bg-white">
        <Link to={'/visitpunch'} className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiUser className="text-6xl"/>
        <h5 className="text-1xl">Visit</h5>    
        </Link>
        <Link className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiWallet className="text-6xl"/>
        <h5 className="text-1xl">Expenses</h5>    
        </Link>        
        <Link to={'/customer'} className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiGroup className="text-6xl"/>
        <h5 className="text-1xl">Customer</h5>    
        </Link>        
        <Link to={'/pucnhdetails'} className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiUser className="text-6xl"/>
        <h5 className="text-1xl">Visit</h5>    
        </Link>
        <Link className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiWallet className="text-6xl"/>
        <h5 className="text-1xl">Expenses</h5>    
        </Link>        
        <Link className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiGroup className="text-6xl"/>
        <h5 className="text-1xl">Customer</h5>    
        </Link>
        <Link to={'/pucnhdetails'} className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiUser className="text-6xl"/>
        <h5 className="text-1xl">Visit</h5>    
        </Link>
        <Link className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiWallet className="text-6xl"/>
        <h5 className="text-1xl">Expenses</h5>    
        </Link>        
        <Link className="h-32 w-36 border border-slate-300 flex flex-col justify-center items-center">
        <BiGroup className="text-6xl"/>
        <h5 className="text-1xl">Customer</h5>    
        </Link>
        
        
        
        
        
      </div>
    </>
  );
}

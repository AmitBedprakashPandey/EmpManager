import { useEffect, useState } from "react";
import PunchBox from "./PunchBox";
import PunchCountBox from "./PunchCountBox";
import { useNavigate } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";
export default function Home() {  
  const history = useNavigate();
  const Auth = getAuth();
  useEffect(() => {    
    onAuthStateChanged(Auth,(user) => {      
      if(user){         
        history('/');    
      }else{
        history('/login');    
      }
    });    
  }, []);
 
  return (
    <>      
      <PunchBox />
      <PunchCountBox />      
    </>
  );
}

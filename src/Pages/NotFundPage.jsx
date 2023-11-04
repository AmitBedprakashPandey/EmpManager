import { useEffect } from 'react';
import passwordSvg from '../assets/image/404 error with a landscape-rafiki.png';  
export default function NotFundPage() {
    useEffect(()=>{
        document.body.style.overflow = "hidden";
    },[])
    return<>
    <div className="hidden  md:flex flex-col bg-blue-700 justify-center items-center h-screen w-screen p-10 absolute top-0 bottom-0 right-0 left-0 z-50">    
        <img src={passwordSvg} width={400}/>                   
    </div>
    </>
}
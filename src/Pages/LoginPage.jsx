import { useState } from "react";
import { useNavigate, useh } from "react-router-dom";
import logo from "../assets/image/Reset password-rafiki.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage(params) {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const history = useNavigate();
  const Auth = getAuth();

  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(Auth, user, pass).then((user)=>{
        if(user){
          history('/');
        }else{
          history('/login');
        }
      });
    } catch (error) {}
  };
  return (
    <div className="w-screen h-screen bg-blue-500 flex items-center flex-col z-50 absolute top-0">
      <img src={logo} alt="" width={350} />
      <div>
        <div className="p-3 flex justify-center items-center flex-col gap-3 w-80">
          <h1 className="text-white text-2xl">Login</h1>
          <input
            type="text"
            placeholder="enter email"
            className="p-3 text-lg w-full rounded-lg"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="enter pass"
            className="p-3 text-lg w-full rounded-lg"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            className="bg-red-500 p-3 w-full font-bold text-2xl text-white rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

//how to center a div?

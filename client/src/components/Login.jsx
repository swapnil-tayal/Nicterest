import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginState, setLoginState] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerCall = async () => {

    const data = {
      email: email,
      name: name,
      password: password
    }
    const registerResponse = await fetch(`http://localhost:3001/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    })
    const isRegisSucc = await registerResponse.json();
    if(isRegisSucc){
      console.log('user registered');
    }
  }

  const loginCall = async () => {

    const data = {
      email: email,
      password: password
    }
    const loginResponse = await fetch(`http://localhost:3001/login`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    })
    const isLoginSucc = await loginResponse.json();
    if(isLoginSucc){
      // console.log(isLoginSucc.user, isLoginSucc.token);
      dispatch(
        setLogin({
          user: isLoginSucc.user,
          token: isLoginSucc.token,
        })
      )
      navigate("/home");
    }else{
      console.log("invalid");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoginState) await loginCall();
    else await registerCall();
  }

  return (
    <div className="h-[100vh] bg-[url('../images/loginBg.png')]
                    flex flex-row justify-center">

      <div className="text-white font-semibold text-8xl w-[100%] items-center select-none hidden
                      md:flex md:justify-center">
        Sign up to <br/> Get your <br/> ideas
      </div>

      <div className="px-0 lg:px-32 w-[95vw]">
        <div className="bg-white  p-[1rem] sm:p-[2rem] w-[100%] sm:w-[30rem] h-[100%]">

            <div className="flex flex-col justify-center items-center mt-8 sm:mt-16" >
              <img className="w-[85px]" src="../images/logo.png" alt="" /> 
              <div className="text-black font-semibold text-[1.2rem] sm:text-[1.8rem]">Welcome to Nicterest</div>
              <div className="text-black font-normal text-[1rem]">Find new ideas to try</div>
            </div>
            
            <form className="px-[2rem] mt-8" onSubmit={handleSubmit}>
              <div className="items-start ml-[7px] mb-[5px]">Email</div>
              <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                focus:outline-none rounded-xl" 
                      text="email" 
                      required
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
              /> 
              {!isLoginState && 
                <div>
                  <div className="items-start ml-[7px] mb-[5px] mt-[10px]">Name</div>
                  <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                    focus:outline-none rounded-xl" 
                          text="name" 
                          required
                          placeholder="Name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                  /> 
                </div>
              }
              <div className="items-start ml-[7px] mb-[5px] mt-[10px]">Password</div>
              <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                focus:outline-none rounded-xl" 
                      text="password" 
                      type="password"
                      required
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
              /> 
              <div className="flex justify-center items-center" >
              {!isLoginState 
              ? <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3" 
                >Create Account
                </button>
              : <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3" 
                >Log In
                </button>
              } 
              </div>

              <div className="mt-[8px] flex flex-col justify-center items-center">OR</div>

              <div className="flex justify-center items-center" >
              {!isLoginState 
              ? <button 
                      onClick={() => setLoginState(!isLoginState)}
                      className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3"
                > Log In
                </button>
              : <button 
                    onClick={() => setLoginState(!isLoginState)}
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3"
                > Sign Up
                </button>
              }
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

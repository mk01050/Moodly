"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [seePassword,setSeePassword] = useState(false)
  
  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    
    try {
      if (!isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
      } else {
        console.log("Loggin in a new user");
        await login(email, password);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-4 justify-center items-center ">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ? "Login" : "Register"}
      </h3>
      <p className="">You&apos;re one step away!</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="max-w-[400px] w-full px-3 hover:border-indigo-600 focus:border-indigo-600 py-2 mx-auto sm:py-3 rounded-full outline-none border border-solid border-indigo-400"
        type=""
        placeholder="Email"
      />
      <div className="relative items-center max-w-[400px] w-full mx-auto">
        
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="max-w-[400px] w-full px-3 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-3 rounded-full  border border-solid border-indigo-400 outline-none"
        type={seePassword?"text":'password'}
        placeholder="Password"
        />
        <button onClick={()=>{setSeePassword(!seePassword)}} >
        <i className={"absolute right-[3%] top-[37%] z-1 fa-solid "+(seePassword?'fa-eye-slash':'fa-eye') }></i>
        </button>
        </div>
      
      <div className="w-full max-w-[400px]">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p>
        {isRegister ? "Don't have an account? " : "Already have an account? "}{" "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
          }}
          className="text-indigo-600 text-center "
        >
          {isRegister ? "SignUp" : "Log In"}
        </button>
      </p>
    </div>
  );
}

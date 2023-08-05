"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios  from "axios";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);


  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log("response of login call to backend:====", res);
      if(res.data.error == "Invalid password"){
        toast.error("Invalid Password")
      }
      // toast.success(res.data);
      router.push("/profile");
      
    } catch (error:any) {
      console.log("Login Failed!",error.message);
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center bg-[#16233d] h-screen">
      <Toaster />
      <h1 className="font-bold text-2xl m-6 text-[#54c2f1] ">{loading ? "Processing...":"Login"}</h1>
      <div className="bg-[#A5C9CA]/25 w-[450px] p-8 px-12">
        {/* <form className="flex flex-col"> */}
        <div className="flex flex-col">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-bold text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e)=>setUser({...user, email:e.target.value})}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1C82AD] dark:focus:border-[#1C82AD] outline-none"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-bold text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e)=>setUser({...user, password: e.target.value})}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1C82AD] dark:focus:border-[#1C82AD] outline-none"
              required
            />
          </div>
          
          <button
            onClick={onLogin}
            className="text-white bg-[#1C82AD] hover:bg-[#186c91] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {buttonDisabled ? "No Login":"Login"}
          </button>
          <Link href={'/signup'} className="mt-5 text-base font-semibold text-[#91d9f5] hover:underline">No Account? | Register here</Link>
          <Link href={'/resetPassword'} className="mt-5 text-base font-semibold text-[#91d9f5] hover:underline">Forgot Password?</Link>
        {/* </form> */}
        </div>
      </div>
    </div>
  );
}

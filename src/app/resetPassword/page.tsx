"use client";

import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import React, {useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [user, setUser] = useState({
        email:'',
    })

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]; //in url before the = all will be at [0] and right side of = will be all [1] value
        setToken(urlToken || "");
      }, []);

    const onSubmit = async() => {
        try {
            await axios.post("/api/users/resetpassword", { token, user});
        } catch (error:any) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0){
            setButtonDisabled(false);
        }
    },[user])


  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#16233d] h-screen">
        <Toaster />
        <h1 className="font-bold text-2xl m-6 text-[#54c2f1] ">
          Forgot Password
        </h1>
        <div className="bg-[#A5C9CA]/25 w-[450px] p-8 px-12">
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
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1C82AD] dark:focus:border-[#1C82AD] outline-none"
                placeholder="name@example.com"
                required
              />
            </div>
            <button
              onClick={onSubmit}
              className={`${
                buttonDisabled
                  ? "disabled text-white bg-[#1C82AD] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-not-allowed focus:outline-none disabled:opacity-75"
                  : "text-white bg-[#1C82AD] hover:bg-[#186c91] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              }`}
            >
              Send an Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center bg-[#16233d] h-screen">
      <h1 className="font-bold text-2xl m-6 text-[#54c2f1] ">Login</h1>
      <div className="bg-[#A5C9CA]/25 w-[450px] p-8 px-12">
        <form className="flex flex-col">

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
            type="submit"
            onClick={onLogin}
            className="text-white bg-[#1C82AD] hover:bg-[#186c91] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
          <Link href={'/signup'} className="mt-5 text-base font-semibold text-[#91d9f5] hover:underline">No Account? | Register here</Link>
        </form>
      </div>
    </div>
  );
}
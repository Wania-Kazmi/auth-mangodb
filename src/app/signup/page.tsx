"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import {redirect} from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// export default function SignupPage() {
//   const router = useRouter();
//   const [user, setUser] = React.useState({
//       email: "",
//       password: "",
//       username: "",
//   })
//   const [buttonDisabled, setButtonDisabled] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const onSignup = async () => {
//       try {
//           setLoading(true);
//           const response = await axios.post("/api/users/signup", user);
//           console.log("Signup success", response.data);
//           router.push("/login");

//       } catch (error:any) {
//           console.log("Signup failed", error.message);

//           toast.error(error.message);
//       }finally {
//           setLoading(false);
//       }
//   }

//   useEffect(() => {
//       if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
//           setButtonDisabled(false);
//       } else {
//           setButtonDisabled(true);
//       }
//   }, [user]);

//   return (
//   <div className="flex flex-col items-center justify-center min-h-screen py-2">
//     <Toaster />
//       <h1>{loading ? "Processing" : "Signup"}</h1>
//       <hr />
//       <label htmlFor="username">username</label>
//       <input
//       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//           id="username"
//           type="text"
//           value={user.username}
//           onChange={(e) => setUser({...user, username: e.target.value})}
//           placeholder="username"
//           />
//       <label htmlFor="email">email</label>
//       <input
//       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//           id="email"
//           type="text"
//           value={user.email}
//           onChange={(e) => setUser({...user, email: e.target.value})}
//           placeholder="email"
//           />
//       <label htmlFor="password">password</label>
//       <input
//       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//           id="password"
//           type="password"
//           value={user.password}
//           onChange={(e) => setUser({...user, password: e.target.value})}
//           placeholder="password"
//           />
//           <button
//           onClick={onSignup}
//           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
//           <Link href="/login">Visit login page</Link>
//       </div>
//   )

// }

export default function Signup() {


  const router = useRouter(); //once the user is sign up I want to push it to the login page. For this we will use Router
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Response of Sign up page", res);
      toast.success("Signup Successfully!");
      //push the user onto new page i.e login page
      if (res.status == 200) {
        try {
          console.log("Welcomeeeeeeeeeeeeeeeeeee");
          router.push("/login");
          toast.success("Directed to login");
          {
            <h1 className="text-white text-5xl font-extrabold">Workinggggg</h1>;
          }
        } catch {
          toast.error("Not Directing to login page");
        }
        // redirect('/login');
      }
    } catch (error: any) {
      console.log("Signup Failed!!", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false); //no matter what Processing... needs to go away
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#16233d] h-screen">
      <div>
        <Toaster />
      </div>
      <h1 className="font-bold text-2xl m-6 text-[#54c2f1] ">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <div className="bg-[#A5C9CA]/25 w-[450px] p-8 px-12">

        {/* <form className="flex flex-col"> */}
        <div className="flex flex-col">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-lg font-bold text-white outline-none"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#1C82AD] focus:border-[#1C82AD] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1C82AD] dark:focus:border-[#1C82AD] outline-none"
              required
            />
          </div>
          
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1C82AD] dark:focus:border-[#1C82AD] outline-none"
              required
            />
          </div>

          <button
            onClick={onSignup}
            className="text-white bg-[#1C82AD] hover:bg-[#186c91] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {buttonDisabled ? "No Sign up" : "Sign up"}
          </button>

          {/* <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            {buttonDisabled ? "No signup" : "Signup"}
          </button> */}

          <Link
            href="/login"
            className="mt-5 text-base font-semibold text-[#91d9f5] hover:underline"
          >
            Already Signup? | Login here
          </Link>
        {/* </form> */}
        </div>
      </div>
    </div>
  );
}

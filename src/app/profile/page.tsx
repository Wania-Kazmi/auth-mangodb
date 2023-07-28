"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [data, setData] = useState("nothing");
//   const logout = async () => {
//     try {
//       await axios.get("/api/users/logout");
//       toast.success("Logout successful");
//       router.push("/login");
//     } catch (error: any) {
//       console.log(error.message);
//       toast.error(error.message);
//     }
//   };

//   const getUserDetails = async () => {
//     const res = await axios.get("/api/users/user");
//     console.log(res.data);
//     setData(res.data.data._id);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>Profile</h1>
//       <hr />
//       <p>Profile page</p>
//       <h2 className="p-1 rounded bg-green-500">
//         {data === "nothing" ? (
//           "Nothing"
//         ) : (
//           <Link href={`/profile/${data}`}>{data}</Link>
//         )}
//       </h2>
//       <hr />
//       <button
//         onClick={logout}
//         className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Logout
//       </button>

//       <button
//         onClick={getUserDetails}
//         className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         GetUser Details
//       </button>
//     </div>
//   );
// }


export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState("");

  const logout = async () => {
    try {
      const res = await axios.get(`/api/users/logout`);
      console.log("Response call of logout button ===", res);
      toast.success("Logout Successfully!");
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  };
  useEffect(()=>{
    const getUserDetails = async() => {
      const res:any = await axios.get('/api/users/user');
      console.log("User detail is ====", res);
      setUser(res.data.data._id);
    }
    getUserDetails();
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Toaster />
        <h1>User Profile here</h1>
        <h2>{user == '' ? '': <a href={`/profile/${user}`}> {user}</a>}</h2>
      </div>
      <div>
        <button
          onClick={logout}
          className="text-white mt-4 bg-[#1C82AD] hover:bg-[#186c91] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Logout
        </button>
        {/* <button onClick={}></button> */}
      </div>
    </div>
  );
}

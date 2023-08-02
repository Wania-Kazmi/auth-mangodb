"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  //we need to grab that token and store it somewhere - so for this
  const [token, setToken] = useState(""); //to set the user's token
  const [verifiedEmail, setVerifiedEmail] = useState(false); //mesage show when the email is verified
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerifiedEmail(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; //in url before the = all will be at [0] and right side of = will be all [1] value
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-center text-3xl">Verify Email Page</h1>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="bg-orange-500 text-xl text-white p-2 m-2">{token ? `${token}` : "No Token"}</h2>
        <div className="m-2">{verifiedEmail && (
          <div className="m-2">
            <h2 className="text-2xl bg-green-500 p-2 m-2">Email Verified</h2>
            <Link href={"/login"} className="bg-blue-500 p-3 m-2">
              Login
            </Link>
          </div>
        )}</div>
        <div className="m-2">
        {error && (
          <div>
            <h2 className="text-2xl bg-red-300 text-white">Error</h2>
            <Link href={"/login"} className="bg-blue-500 p-3">
              Login
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

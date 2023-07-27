import { NextResponse } from "next/server";

//We don't need to have a post request for logout - we just want to clear out the token that user have -
//we can create a token and set the expiration time, refresh token etc.
//But here we will just peform the basic that we will clear out the token from user's cookies

export async function GET() {
  try {
    const response = NextResponse.json({
      //here we are getting the NextResponse in response variable so that we can interact with the cookies with the help of response
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}

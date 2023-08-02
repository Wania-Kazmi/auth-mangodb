import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) { 
  try {
    const req = await request.json();
    const { token } = req;
    //there is front-end who will make a call to an api and will be able to handle this - it could be different if i use a different approach that is I create a [id]/[token] so i can directly extract the user token = both appraoches are correct
    console.log("Token of verify email: ==== ", token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    }); //$gt = greater than - it check that if the expiry time should be greater than current time
    console.log("User found to verify a token!", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" });
    }

    user.isVerified = true;
    user.verifyToken = undefined; //we get rid of verifyToken and verifyTokenExpiry now - as it is not imp to keep the unneccassary data
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

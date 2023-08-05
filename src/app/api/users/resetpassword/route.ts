import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { token, user } = req;
    console.log("Token for forgot password is:", token, user.email);


    const userdb = await User.findOne({email: user.email});
    
    // const user: any = User.findOne({
    //   forgotPasswordToken: token,
    //   forgotPasswordTokenExpiry: { $gt: Date.now() },
    // });

    // console.log("User after getting the token of forgot password", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" });
    }

    console.log("User from reset pass====",userdb);

    await sendEmail({email:user.email, emailType: "RESET", userId: userdb._id});

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Reset Password Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

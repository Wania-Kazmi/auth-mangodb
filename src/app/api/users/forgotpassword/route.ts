import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, newPassword } = req;
    console.log(
      "email from forgot password: ======",
      email,
      " password to reset is: ====",
      newPassword
    );

    //Check if user exist or not:
    const user = await User.findOne({ email }); //here we get the whole user data to update
    console.log("User from password forget is: ====", user);

    //hashing the new password:
    const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
    const hashPassword = await bcrypt.hash(newPassword, salt);
    if (!user) {
      return NextResponse.json(
        { error: "User doesnot exist" },
        { status: 400 }
      );
    } else {
      await User.findByIdAndUpdate(user._id, {
        password: hashPassword,
      });
    }

    return NextResponse.json({
      message: "Password Updated Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

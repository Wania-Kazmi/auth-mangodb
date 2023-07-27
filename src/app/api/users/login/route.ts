import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password } = req;
    console.log("request from login page ====", req);

    //Check if user exist or not:
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesnot exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //if user exist and password is correct then we want to create a token (created through jsonwebtoken). We encrypt that token and send this token to user's cookies not in user localStorage because user can manipulate token there but we can send the secure cookie to the user and later we can access those cookies. So token here is like an ID of user and we can send payload to that such as email, userID anything

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    }); //it takes sometime to create a token so we use await here
    //.sign - jwt has method .sign to create a sign token which takes the 1. tokenData(that should be unique), 2. Token Secret key, 3. expiresIn - how long you wanted to stay on application for 1h or for 1d.

    //Token is created but not set into user's cookies - so to set it into cookies:
    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true, //this cookie will be store in the browser where normal cookie store. But since httpOnly is true so it cannot be accessed by client-side scripts, they are not accessible via JS or other client side languages.
    });
    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

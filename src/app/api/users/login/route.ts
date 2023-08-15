import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import * as jose from "jose";
// import { JWE, JWK } from 'jose';
// import jose from 'node-jose';
// import encryptionKey from "@/constant";
import CryptoJS from "crypto-js";

connect();

// Generate a JWK (JSON Web Key) for encryption
// export const keystore = jose.JWK.createKeyStore();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password } = req;
    console.log("request from login page ====", req);

    //Check if user exist or not:
    const user = await User.findOne({ email });
    // console.log("Hit 25 line =================",user);
    if (!user) {
      // console.log("Hit line 28===============");
      return NextResponse.json({ error: "User doesnot exist" });
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Valid password====", validPassword);
    if (!validPassword) {
      // console.log("Hit line 38============");
      return NextResponse.json({ error: "Invalid password" },{status: 400});
    }

    if (user.isVerified == false) {
      return NextResponse.json(
        { error: "User is not Verified" },
        { status: 400 }
      );
    }

    //if user exist and password is correct then we want to create a token (created through jsonwebtoken). We encrypt that token and send this token to user's cookies not in user localStorage because user can manipulate token there but we can send the secure cookie to the user and later we can access those cookies. So token here is like an ID of user and we can send payload to that such as email, userID anything

    //create jwt token data here
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create a jwt token
    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    //   expiresIn: "2d",
    // });

    //it takes sometime to create a token so we use await here
    //.sign - jwt has method .sign to create a sign token which takes the 1. tokenData(that should be unique), 2. Token Secret key, 3. expiresIn - how long you wanted to stay on application for 1h or for 1d.

    //creating a token using jose ===
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )

    const alg = "HS256";
    const jwtToken = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

      console.log("jwt token is: ===",jwtToken);
    // const jweToken = JWE.encrypt(token, JWE.generateSync('RSA-OAEP-256', 2048));

    // const encryptionKey = await keystore.generate('RSA', 2048);
    // console.log("Value of encryption in login =======",encryptionKey);
    // Encrypt the JWT with JWE
    // const jweToken = await jose.JWE.createEncrypt({ format: 'compact' }, encryptionKey)
    //   .update(Buffer.from(token))
    //   .final();

    var ciphertext = CryptoJS.AES.encrypt(
      jwtToken,
      process.env.TOKEN_SECRET!
    ).toString();
    console.log("Our new cipher text is:====", ciphertext);

    // console.log("JWE encrypted token is: =====",jweToken);

    //Token is created but not set into user's cookies - so to set it into cookies:
    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", ciphertext, {
      httpOnly: true, //this cookie will be store in the browser where normal cookie store. But since httpOnly is true so it cannot be accessed by client-side scripts, they are not accessible via JS or other client side languages.
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

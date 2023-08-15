import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import * as jose from "jose";
import CryptoJS from "crypto-js";
// import { keystore } from "@/app/api/users/login/route";
//Here we will get the token information and we will done this multiple time.
//we can get the tokenData that we define in login route if we have a token key which we define in the .env - token data that we can get is 
// const tokenData = {
//     id: user._id,
//     username: user.username,
//     email: user.email,
//   };

// export const getDataFromToken = (request: NextRequest) => {
//     try {
//         const token = request.cookies.get("token")?.value || '';
//         console.log("Encoded Token is ======",token,"======");
//         const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!); //it not only verify the token but it also actually extract the token information as a response of this function
//         //return decodedToken; //you can return the entire decodedToken which contain id, username, email or can just extract the id
//         console.log("Decoded Token is: ========", decodedToken);
//         return decodedToken.id;
//     } catch (error:any) {
//         console.log("Error in getting data from token======")
//         throw new Error(error.message);
//     }
// }

export const getDataFromToken = async(request: NextRequest) => {
    try {
        const cipherText = request.cookies.get("token")?.value || '';
        var bytes  = CryptoJS.AES.decrypt(cipherText, process.env.TOKEN_SECRET!);
        var jwtToken = bytes.toString(CryptoJS.enc.Utf8);
     
        //Decrypt from jose===
        const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');
     
        const { payload, protectedHeader } = await jose.jwtVerify(jwtToken, secret);  
        
        let BToken = payload as jwt.JwtPayload
        // return payload;
        return BToken.id;
    } catch (error: any) {
        console.log("error here in decoded token")
        console.log("Error is: ",error.message)
        throw new Error(error.message);
    }

}

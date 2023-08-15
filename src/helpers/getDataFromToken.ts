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
    // const keystore = jose.JWK.createKeyStore();
    // console.log("Value of keystore is:",keystore);
    try {
        const cipherText = request.cookies.get("token")?.value || '';
        // console.log("encoded JWE token is ===", cipherText,"========");


        var bytes  = CryptoJS.AES.decrypt(cipherText, process.env.TOKEN_SECRET!);
        var jwtToken = bytes.toString(CryptoJS.enc.Utf8);

        // console.log("JWT token is:====",jwtToken);
        // const decryptJWEToken = JWE.decrypt(jweToken, JWK.generateSync('RSA-OAEP-256', 2048));

        // const decodedToken = jwt.verify(decryptJWEToken, process.env.TOKEN_SECRET!);
        // const keystore = jose.JWK.createKeyStore();
        // console.log("Before decryption =====");
        // const encryptionKey = await keystore.generate('RSA', 2048);
        // console.log("value of encryption key is:", encryptionKey);
        // const decryptJWEToken = await jose.JWE.createDecrypt(encryptionKey).decrypt(jweToken);
        // console.log("decrypt JWE Token is: =======",decryptJWEToken);

        // const decryptJWT = jwt.verify(jwtToken.toString(), process.env.TOKEN_SECRET!)
        // console.log("Decoded token is ====",decryptJWT);
        
        //Decrypt from jose===
        const secret = jose.base64url.decode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');
        // const { payload, protectedHeader } = await jose.jwtDecrypt(jwtToken, secret, {
        //     issuer: 'urn:example:issuer',
        //     audience: 'urn:example:audience',
        //   })
        const decodeJWT = jwt.decode(jwtToken);
        console.log("DEcoded token is ===",decodeJWT)
        // console.log("protected header is =====",protectedHeader)
        // console.log("Payload of decrypted token is: ====",payload)  
        
        let BToken = decodeJWT as jwt.JwtPayload
        // return payload;
        return BToken.id;
    } catch (error: any) {
        console.log("error here in decoded token")
        console.log("Error is: ",error.message)
        throw new Error(error.message);
    }

}

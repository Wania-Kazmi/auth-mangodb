import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


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

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log("encoded token is ===", token,"========");
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("Decoded token is ====",decodedToken);
        return decodedToken.id;
    } catch (error: any) {
        console.log("error here in decoded token")
        throw new Error(error.message);
    }

}

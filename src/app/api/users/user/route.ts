import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(request: NextRequest){
    try {
        console.log("request from decoded token",request);
        const user_id = await getDataFromToken(request); //it will give us return response that is id of user
        console.log("We are getting the user id", user_id);
        //we will find the user based on this user_id
        const user = await User.findOne({_id: user_id}).select("-password");
        console.log("We get the User detail =====",user);
        return NextResponse.json({message: "User found", data: user});
    } catch (error:any) {
        console.log("error in user route");
        return NextResponse.json({error: error.message}, {status: 400})
    }
}


// export async function GET(request:NextRequest){

//     try {
//         const userId = await getDataFromToken(request);
//         const user = await User.findOne({_id: userId}).select("-password");
//         console.log("User we are getting is ====",user);
//         return NextResponse.json({
//             mesaaage: "User found",
//             data: user
//         })
//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 400});
//     }

// }

//Here we will get the token information and we will done this multiple time.
//we can get the tokenData that we define in login route if we have a token key which we define in the .env - token data that we can get is 
// const tokenData = {
//     id: user._id,
//     username: user.username,
//     email: user.email,
//   };
import {connect}  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const req = await request.json();
        const {username,email,password} = req
        console.log("req of user is =========",req);

        //check if user already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exist"},{status:400});
        }

        //hash password
        const salt = await bcrypt.genSalt(10); //genSalt will create a salt with the 10 rounds - Salt is a cryptographically secure random string that is added to a password before it's hashed,
        console.log("Salt of password is ==========", salt)
        const hashPassword = await bcrypt.hash(password, salt); //it created a hash password. It requires 2 parameters 1. password from req body and 2. salt that we created

        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })

        const savedUser = await newUser.save();
        console.log("New Saved User is: =====",savedUser);
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
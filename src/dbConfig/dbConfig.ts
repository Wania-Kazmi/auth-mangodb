//mongoos is capable to connecting and talking to mongodb - it is mongoos
import mongoose from "mongoose";

export async function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI!); //added the mongodb string
        const connection = mongoose.connection;//start creating a connection and based on that connection we can listen to varity of events
        connection.on("connected",()=>{
            console.log("MongoDB connected successfully")
        })//listening an event - connection to db event 
        connection.on("error",(err)=>{
            console.log("MongoDB connected error. Please make sure MongoDB is running. ",err);
            process.exit();
        })//listening an event - error to connection event
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}
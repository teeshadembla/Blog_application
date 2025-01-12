import mongoose from "mongoose"
import dotenv from 'dotenv'
const Connection = async() => {
    dotenv.config();
    try{
        await mongoose.connect(process.env.URL);
        console.log("Database connected successfully!");
    }catch(err){
        console.log("Error while connecting with the database",err);
    }
}

export default Connection;
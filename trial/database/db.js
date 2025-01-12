import mongoose from 'mongoose'
import dotenv from 'dotenv'

const Connection = async() =>{
    dotenv.config();
    const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5c2tb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 
    try{
        await mongoose.connect(URL);
        console.log("Db connection successful");
    }catch(err){
        console.log("Error has occured in connection", err);
    }
}

export default Connection;
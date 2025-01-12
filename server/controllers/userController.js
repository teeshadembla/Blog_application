import User from "../models/user.js";
import bcrypt, { hash } from 'bcrypt';

export const signupUser = async(req, res) =>{
    try{
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {name: req.body.name, username: req.body.username, password: hashedPassword};
        if(!user.name || !user.username || !user.password){
            return res.status(400).json({ msg: "All fields are required." });
        }
        console.log(user);
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: 'signup successful', user: newUser})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg: 'Error while signing up the user'})
    }
}



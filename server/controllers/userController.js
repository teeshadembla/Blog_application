import User from "../models/user.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from "../models/token.js";

dotenv.config();

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

export const loginUser = async(req, res) =>{
    console.log(req.body);
    let user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).json({msg: 'User does not exist'});
    }

    try{
        let match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new token({token: refreshToken})
            await newToken.save();

            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})
        }else{
            return res.status(400).json({msg: 'Password does not match'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:'error while logging in user'})
    }

}




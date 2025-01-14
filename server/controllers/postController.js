import post from '../models/post.js';

export const createPost = async(req,res) => {
    try{
        const post = await new post(req.body);
        post.save();

        return res.status(200).json('Post saved successfully');
    }catch(err){
        return res.status(500).json(err);
    }
}
import Post from '../models/post.js';

export const createPost = async(req,res) => {
    try{
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json('Post saved successfully');
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getAllPosts = async(req, res) =>{
    let category = req.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories: category});
        }else{
            posts = await Post.find({});
        }

        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json({msg : err});
    }
}

export const getPost = async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id);

        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}
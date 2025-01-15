import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }, 
    username: {
        type: String,
        required: true
    }, 
    categories: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
    }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
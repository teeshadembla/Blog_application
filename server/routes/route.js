//route is an api endpoint
import express from 'express';
import {signupUser, loginUser} from '../controllers/userController.js'
import {uploadImage, getImage} from '../controllers/imageController.js'
import upload from '../utils/upload.js';
import {createPost, getAllPosts, getPost, updatePost, deletePost} from '../controllers/postController.js';
import { authenticateToken } from '../controllers/jwtController.js';



const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload",upload.single('file') ,uploadImage);
router.get("/file/:filename", getImage);
router.post('/create',authenticateToken, createPost);

router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);

router.put("/update/:id",authenticateToken, updatePost);

router.delete("/delete/:id", authenticateToken, deletePost);
export default router;

//route is an api endpoint
import express from 'express';
import {signupUser, loginUser} from '../controllers/userController.js'
import {uploadImage} from '../controllers/imageController.js'

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", uploadImage);

export default router;

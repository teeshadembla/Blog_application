//multer is a middleware that directly stores images to mongodb
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new GridFsStorage({
    url : process.env.URL,
})
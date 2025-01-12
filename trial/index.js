import express from 'express';
import Connection from "./database/db.js";

const app = express();
const PORT = 8000;

app.listen(()=>{
    console.log(`Server is listening on port ${PORT}`);
})

Connection();
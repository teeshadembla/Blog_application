import express from 'express'
import cors from 'cors';
import Connection from './database/db.js';
import router from './routes/route.js';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`Great! Server is listening on ${PORT}`);
})

Connection();

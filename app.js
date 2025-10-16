import express, { json } from "express";
import {establishConnection} from "./services/sqlConnectionService.js";
import { booksRouter } from "./routes/booksRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT=process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:"false"}));
app.use('/images', express.static(path.join(__dirname, 'public/images/cover')));
app.use("/api/books",booksRouter)
app.get('/',(req,res)=>{
    return res.status(200).json({"status":"success"}); 
})
establishConnection().then(()=>{
    console.log("PGSQL Connection success")
    app.listen(PORT,()=>{
        console.log(`http://127.0.0.1:${PORT}`);
    });
})
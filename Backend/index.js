import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { login, register } from './Controller/user.Controller.js';

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

dotenv.config();

// app.get('/', (req, res) => {
//     return res.send("Hello backend");
// })

app.post("/register", register);
app.post("/login", login);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to DB")
}).catch((error) => {
    console.log("error are occured", -error)
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on ${process.env.PORT}`);
})
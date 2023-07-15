import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { login, register } from './Controller/user.Controller.js';
import { addproduct, homepage } from './Controller/prodcut.controller.js';

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

dotenv.config();

app.get('/', (req, res) => {
    return res.send("Hello backend");
})

//Register
app.post("/register", register);

//Login
app.post("/login", login);

// Addproduct
app.post("/addproduct", addproduct)

//Homepage
app.get("/homepage", homepage)


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to DB")
}).catch((error) => {
    console.log("error are occured", -error)
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on ${process.env.PORT}`);
})
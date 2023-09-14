import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { getCurrentUser, getallpraticularsellerproduct, getcurrentuserwithpass, login, register, updateprofile, updatesingleproduct } from './Controller/user.Controller.js';
import { addproduct, showproduct, updateproduct } from './Controller/prodcut.controller.js';

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

//showproduct
app.get("/showproduct", showproduct)

//check user
app.post("/get-current-user", getCurrentUser)
app.post("/get-current-user-with-pass", getcurrentuserwithpass)

//updateuserProfile
app.post("/updated-profile", updateprofile)

//getallparticularselletproduct
app.post("/get-all-particular-seller-product", getallpraticularsellerproduct)

//updateproductdetails
app.post("/update-single-sell-product", updatesingleproduct);

// update-product
app.post("/update-product", updateproduct)


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to DB")
}).catch((error) => {
    console.log("error are occured", -error)
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on ${process.env.PORT}`);
})
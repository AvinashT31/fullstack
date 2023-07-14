import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

export default mongoose.model("Product", productSchema)
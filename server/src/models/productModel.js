import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const Product = mongoose.model('Product',productSchema)

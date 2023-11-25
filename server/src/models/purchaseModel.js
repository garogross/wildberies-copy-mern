import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const purchaseSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const Purchase = mongoose.model('Purchase',purchaseSchema)


export const fileCamel = 'fileCamel'
export const fileLower = 'fileLower'

export const controllerContent = `import {${fileCamel}} from "../models/${fileLower}Model.js";
import {HandlerFactory} from "./HandlerFactory.js";


const handleFactory = new HandlerFactory(${fileCamel}, '${fileLower}')
`

export const routerContent = `import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";

export const ${fileLower}Router = express.Router()


${fileLower}Router.use(protect)

// private routes


${fileLower}Router.use(restrictTo('user'))
// user restricted routes
`

export const modelContent = `import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const ${fileLower}Schema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const ${fileCamel} = mongoose.model('${fileCamel}',${fileLower}Schema)
`
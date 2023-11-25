import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";

export const productRouter = express.Router()


productRouter.use(protect)

// private routes


productRouter.use(restrictTo('user'))
// user restricted routes

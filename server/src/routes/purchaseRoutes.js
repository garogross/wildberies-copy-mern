import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";

export const purchaseRouter = express.Router()


purchaseRouter.use(protect)

// private routes


purchaseRouter.use(restrictTo('user'))
// user restricted routes

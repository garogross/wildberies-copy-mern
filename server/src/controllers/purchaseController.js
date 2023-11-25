import {Purchase} from "../models/purchaseModel.js";
import {HandlerFactory} from "./HandlerFactory.js";


const handleFactory = new HandlerFactory(Purchase, 'purchase')

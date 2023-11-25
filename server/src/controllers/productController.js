import {Product} from "../models/productModel.js";
import {HandlerFactory} from "./HandlerFactory.js";


const handleFactory = new HandlerFactory(Product, 'product')

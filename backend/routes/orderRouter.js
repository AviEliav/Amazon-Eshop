import express from "express";
import expressAsyncHandler from "express-async-handler";
import { addOrder, getOrderById } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";


const orderRouter = express.Router();

orderRouter.get('/:id', isAuth, expressAsyncHandler(getOrderById))
orderRouter.post('/', isAuth, expressAsyncHandler(addOrder))

export default orderRouter;
import { Router } from "express";
import { addProductToCartApi, createCartApi, deleteCartApi, deleteProductToCartApi, editCartApi, editProductToCartApi, getCartApi, getCartIdApi } from "../controllers/cart.controller.js";


const cartsRouter = Router();


cartsRouter.get('/', getCartApi);
cartsRouter.get('/:cId', getCartIdApi);


cartsRouter.post('/', createCartApi);
cartsRouter.post('/:cId/product/:pId', addProductToCartApi);


cartsRouter.put('/:cId', editCartApi);
cartsRouter.put('/:cId/product/:pId', editProductToCartApi);


cartsRouter.delete('/:cId', deleteCartApi);
cartsRouter.delete('/:cId/product/:pId', deleteProductToCartApi);


export default cartsRouter;
import { Router } from "express";
import { addProductToCartApi, createCartApi, deleteCartApi, deleteProductToCartApi, editCartApi, editProductToCartApi, getCartApi, getCartIdApi, purchase } from "../controllers/cart.controller.js";
import { checkAuth, checkExistingUser, checkRoleUser } from "../middlewares/auth.js";


const cartsRouter = Router();


cartsRouter.get('/',checkRoleUser, getCartApi);
cartsRouter.get('/:cId',checkRoleUser, getCartIdApi);


cartsRouter.post('/',checkRoleUser, createCartApi);
cartsRouter.post('/:cId/product/:pId',checkRoleUser, addProductToCartApi);


cartsRouter.put('/:cId',checkRoleUser, editCartApi);
cartsRouter.put('/:cId/product/:pId',checkRoleUser, editProductToCartApi);


cartsRouter.delete('/:cId',checkRoleUser, deleteCartApi);
cartsRouter.delete('/:cId/product/:pId',checkRoleUser, deleteProductToCartApi);

cartsRouter.get('/:cId/purchase',checkRoleUser,  purchase);

export default cartsRouter;
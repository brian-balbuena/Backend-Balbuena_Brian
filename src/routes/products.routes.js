import { Router } from "express";
import { addApiProduct, deleteApiProduct, getApiProduct, getApiProductId, updateApiProduct } from "../controllers/product.controller.js";
import { checkRolAdmin, checkRolPremium } from "../middlewares/auth.js";
import { ErrorHandler } from "../middlewares/error.js";


const productsRouter = Router();


productsRouter.get('/',checkRolAdmin, getApiProduct);

productsRouter.get('/:pid',checkRolAdmin, getApiProductId);

productsRouter.post('/',checkRolAdmin, addApiProduct);

productsRouter.put('/:pId',checkRolAdmin,checkRolPremium, updateApiProduct);

productsRouter.delete('/:pId',checkRolAdmin, checkRolPremium, deleteApiProduct);


export default productsRouter;
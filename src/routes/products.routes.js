import { Router } from "express";
import { addApiProduct, deleteApiProduct, getApiProduct, getApiProductId, updateApiProduct } from "../controllers/product.controller.js";
import { checkRolAdmin } from "../middlewares/auth.js";


const productsRouter = Router();


productsRouter.get('/',checkRolAdmin, getApiProduct);

productsRouter.get('/:pid',checkRolAdmin, getApiProductId);

productsRouter.post('/',checkRolAdmin, addApiProduct);

productsRouter.put('/:pId',checkRolAdmin, updateApiProduct);

productsRouter.delete('/:pId',checkRolAdmin, deleteApiProduct);

export default productsRouter;
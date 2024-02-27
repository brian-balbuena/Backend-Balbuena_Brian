import { Router } from "express";
import { addApiProduct, deleteApiProduct, getApiProduct, getApiProductId, updateApiProduct } from "../controllers/product.controller.js";


const productsRouter = Router();


productsRouter.get('/', getApiProduct);

productsRouter.get('/:pid', getApiProductId);

productsRouter.post('/', addApiProduct);

productsRouter.put('/:pId', updateApiProduct);

productsRouter.delete('/:pId', deleteApiProduct);

export default productsRouter;
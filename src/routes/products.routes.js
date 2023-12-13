import { Router } from "express";
import ProductManager from "../productManager.js";

const productsRouter = Router();

const productManager = new ProductManager('./db_Productos.json');

productsRouter.get('/', async (req, res) => {
    const { limit } = req.query;

    if(!limit){
        const products = await productManager.getProducts();
        res.send(products);
        return; //finalizo la ejecucion 
    }
    
    const products = await productManager.getProducts()
    if( limit > products.length || limit == 0){
        res.send('Error en el limite');
        return; //finalizo la ejecucion 
    }
  
    const productsLimit = products.slice(0, limit);   
    res.send(productsLimit);
    return; //finalizo la ejecucion 
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    const productId = await productManager.getProductById(+pid);

    if(productId === undefined){
        return res.send({message: 'invalid id'});
    }

    res.send(productId);
});

export default productsRouter;
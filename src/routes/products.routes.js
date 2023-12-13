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
        return res.status(404).send({massage: 'product not found'});
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

productsRouter.post('/', async (req, res) => {
    const infoProduct = req.body;
    const productAdd = await productManager.addProduct(infoProduct);

    console.log(infoProduct, 'product body');
    if(!productAdd){
        return res.status(400).send({message: 'error: product not added'});
    }

    return res.send({message: 'product added'});
});

productsRouter.put('/:pId', async (req, res) => {
    const { pId } = req.params;
    const infoNew = req.body;

    console.log(infoNew, 'info nueva body')
    const productUpdate = await productManager.updateProduct(+pId, infoNew);

    if(!productUpdate){
        return res.status(404).send({massage: 'product not found'});
    }
    res.send({massage: 'product updated'});
});

productsRouter.delete('/:pId', async (req, res) => {
    const { pid } = req.params;
    const productDeleted = await productManager.deleteProduct(+pid);

    if(!productDeleted){
        return res.status(404).send({massage: 'product not found'});
    }

    res.send({massage: 'product deleted'});
});

export default productsRouter;
import { Router } from "express";
/* import ProductManager from "../dao/managersFs/productManager.js"; */
import { productModel } from "../dao/models/products.model.js";
import ProductManagerMongo from "../dao/managersMongo/productManagerMongo.js";
/* import { productModel } from "../dao/models/products.model.js"; */

const productsRouter = Router();

/* const productManager = new ProductManager('./dao/db_Productos.json'); */

productsRouter.get('/', async (req, res) => {
    const { limit = 10, page = 1, query = '', sort = '' } = req.query;

   /*  if(!limit){ */
        /* const products = await productManager.getProducts();
        res.send(products);
        return; */

     /*    try {
            const product = await productModel.find();
           return res.status(200).send({product})
        } catch (error) {
            console.error(error);
            return res.status(400).send({message: 'products not found'})
        } */

    /* } */
    
  /*   try {
        const product = await productModel.find();
        if( limit > product.length || limit == 0){
            return res.status(404).send({massage: 'product not found'});
        }

        const productsLimit = product.slice(0, limit);   
        return res.send(productsLimit);
           
    } catch (error) {
        console.error(error);
       return res.status(400).send({message: 'products not found'})
    } */

   
    try {
        const productManager = new ProductManagerMongo();
        
        const products = await productManager.getProduct(limit, page, query, sort);

        if(products){
            res.send(products)
        }else{
            res.status(400).send({message: 'product not found'})
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'product not found'})
    }

});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    /* const productId = await productManager.getProductById(+pid);

    if(productId === undefined){
        return res.send({message: 'invalid id'});
    }

    res.send(productId); */
    try {
        const productId = await productModel.findOne({_id: pid});
        res.status(200).send({productId});
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'products not found'});   
     }
});

productsRouter.post('/', async (req, res) => {
    const {title, description, price, code, stock, category} = req.body;
  /*   const productAdd = await productManager.addProduct(infoProduct);
    
    if(!productAdd){
        return res.status(400).send({message: 'error: product not added'});
    }

    return res.send({message: 'product added'}); */

    if(!title || !description || !price || !code  || !stock || !category){
        return res.status(400).send({message: 'Product incomplete'});
    };

    try {
        await productModel.create({title, description, price, code, stock, category});
        res.status(201).send({message: 'Product created'});

    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Could not create a product'});
    }

});

productsRouter.put('/:pId', async (req, res) => {
    const { pId } = req.params;
    const infoNew = req.body;

    /* const productUpdate = await productManager.updateProduct(+pId, infoNew); */

   /*  if(!productUpdate){
        return res.status(404).send({massage: 'product not found'});
    } */
    /* res.send({massage: 'product updated'}); */

    try {
        const productUpdate = await productModel.updateOne({_id: pId}, infoNew);

        if(!productUpdate. modifiedCount){
            return res.status(404).send({message: 'Product not found'});
        }
       return res.status(200).send({message: 'Product updated'});      
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'could not update product'});
    }
});

productsRouter.delete('/:pId', async (req, res) => {
    const { pId } = req.params;
    /* const productDeleted = await productManager.deleteProduct(+pId); */

    /* if(!productDeleted){
        return res.status(404).send({massage: 'product not found'});
    } */

    /* res.send({massage: 'product deleted'}); */

    try {
       const productDeleted=  await productModel.deleteOne({_id: pId});

        if(!productDeleted.deletedCount){
           return res.status(404).send({message: 'Product not found'});
        };
        return res.status(200).send({message: 'product deleted'})
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'could not delete product'})
    }
});

export default productsRouter;
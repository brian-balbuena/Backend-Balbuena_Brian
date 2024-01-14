import { Router } from "express";
import ProductManager from "../productManager.js";
import { productModel } from "../../dao/models/products.model.js";

const viewRouters = Router();

/* const productManager = new ProductManager('./db_Productos.json'); */

viewRouters.get('/', async (req, res) =>  {

    /* const products = await productManager.getProducts(); */
  /*   const products = await productModel.find();
    
    res.render('index', {products: products}); */

    try {
        const products = await productModel.find();
        console.log(products)
       return res.render('index', {products: products});
    } catch (error) {
        console.error(error);
        return res.status(400).send({message: 'products not found'})
    }

});

viewRouters.get('/realTimeproducts', (req, res) => {
    res.render('realTimeProducts');
    
});

viewRouters.get('/createProduct',  (req, res) => {
    /* const infoProduct = req.body;
    const productAdd = await productManager.addProduct(infoProduct);

    console.log(infoProduct, 'product body');
    if(!productAdd){
        return res.status(400).send({message: 'error: product not added'});
    }

    return res.send({message: 'product added'}); */
    res.render('createProduct');

});

viewRouters.get('/deleteProduct',  (req, res) => {
    /* const infoProduct = req.body;
    const productAdd = await productManager.addProduct(infoProduct);

    console.log(infoProduct, 'product body');
    if(!productAdd){
        return res.status(400).send({message: 'error: product not added'});
    }

    return res.send({message: 'product added'}); */
    res.render('deleteProduct');

});

viewRouters.get('/chatLogin',  (req, res) => {
 
    res.render('loginChat');

});

viewRouters.get('/chat',  (req, res) => {
 
    const user = req.query;
    console.log(user)
    res.render('chat', user);

});


export default viewRouters;
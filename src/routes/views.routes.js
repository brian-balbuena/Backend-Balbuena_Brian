import { Router } from "express";
import ProductManager from "../productManager.js";

const viewRouters = Router();

const productManager = new ProductManager('./db_Productos.json');

viewRouters.get('/', async (req, res) =>  {

    const products = await productManager.getProducts();
    res.render('index', {products: products});

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


export default viewRouters;
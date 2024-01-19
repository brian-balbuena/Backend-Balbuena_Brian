import { Router } from "express";
/* import ProductManager from "../dao/managersFs/productManager.js"; */
import { productModel } from "../dao/models/products.model.js";
import ProductManagerMongo from "../dao/managersMongo/productManagerMongo.js";
import { cartModel } from "../dao/models/carts.model.js";
import CartManagerMongo from "../dao/managersMongo/cartManagerMongo.js";
/* import { productModel } from "../src/dao/models/products.model.js"; */

const viewRouters = Router();

const productManager = new ProductManagerMongo();
const cartManager = new CartManagerMongo
/* const productManager = new ProductManager('./db_Productos.json'); */

viewRouters.get('/', async (req, res) =>  {

    /* const products = await productManager.getProducts(); */
  /*   const products = await productModel.find();
    
    res.render('index', {products: products}); */

    try {
        const products = await productModel.find();
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

viewRouters.get('/products', async (req, res) => {

    const { page } = req.query;
    
    const products = await productManager.getProduct(10, page);

    res.render('products', products);
})

viewRouters.get('/carts/:cId', async (req, res) => {
    const { cId } = req.params;

   const productCart = await cartManager.getCart(cId);
   res.render('cart', productCart)

});
export default viewRouters;
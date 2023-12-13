import { Router } from "express";
import CartManager from "../cartManager.js";

const cartsRouter = Router();

const cartManager = new CartManager('./db_Cart.json');

cartsRouter.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send(carts);
});

cartsRouter.get('/:cId', async (req, res) => {
   const { cId } = req.params;
   const cartById = await cartManager.getCartsById(cId);

   if(!cartById){
    return res.status(404).send({massage: 'cart not found'});
   };

   res.send(cartById);
});

cartsRouter.post('/', async (req, res) => {
    const cartAdd = await cartManager.addCart();

    if (!cartAdd) {
        return res.status(400).send({
            message: 'error: cart not added'
        });
    }

    res.send(cartAdd);
});

cartsRouter.post('/:cId/product/:pId', async (req, res) => {

    const { cId, pId } = req.params;

    const addProductToCart = await cartManager.addProductToCart(cId, pId);

    if(!addProductToCart){
        return res.status(400).send({message: 'error: product not added'});
    }

    return res.send({message: 'product added to cart'});
});



export default cartsRouter;
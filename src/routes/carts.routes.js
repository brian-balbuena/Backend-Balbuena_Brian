import { Router } from "express";
import CartManager from "../cartManager.js";
import { cartModel } from "../../dao/models/carts.model.js";


const cartsRouter = Router();

const cartManager = new CartManager('./dao/db_Cart.json');

cartsRouter.get('/', async (req, res) => {
    /* const carts = await cartManager.getCarts();
    res.send(carts); */
    try {
        const carts = await cartModel.find();
        res.status(200).send({carts});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: 'cart not found'});
    }
});

cartsRouter.get('/:cId', async (req, res) => {
   const { cId } = req.params;
   /* const cartById = await cartManager.getCartsById(cId); */

  /*  if(!cartById){
    return res.status(404).send({massage: 'cart not found'});
   }; */

   /* res.send(cartById); */
   try {
    const cartId = await cartModel.findOne({_id: cId});
    res.status(200).send({cartId});   
   } catch (error) {
    console.error(error);
    res.status(400).send({message: 'Cart not found'})
   }
});

cartsRouter.post('/', async (req, res) => {
    /* const cartAdd = await cartManager.addCart(); */

    /* if (!cartAdd) {
        return res.status(400).send({
            message: 'error: cart not added'
        });
    } */

    /* res.send(cartAdd); */

    try {
        await cartModel.createCart();
        res.status(200).send({message: 'Cart created'});
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Could not create a cart'});
    }
});

cartsRouter.post('/:cId/product/:pId', async (req, res) => {

    const { cId, pId } = req.params;

    /* const addProductToCart = await cartManager.addProductToCart(cId, pId); */

   /*  if(!addProductToCart){
        return res.status(400).send({message: 'error: product not added'});
    } */

    /* return res.send({message: 'product added to cart'}); */

    try {
        const cart = await cartModel.findOne({_id: cId});
       
        if(cart.products.length === 0){
            cart.products.push({idProduct: pId});
        }
        
        const productExists = await cartModel.findOne({ _id: cId}, {'products.ipProduct': pId });;
        if(!productExists){
            cart.products.push({idProduct: pId});
        }else{
            console.log('entra')
            const productoSuma = cart.products.find(product => product.idProduct.toString() === pId);
            productoSuma.quantity = productoSuma.quantity +1 ;
        }

        
        await productExists.save();
        await cart.save();

        res.status(200).send({message: 'Product added to cart'})
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Product not added'});
    }
});

cartsRouter.delete('/:cId', async (req, res) => {
    const { cId } = req.params;

    try {
       const cartDeleted=  await cartModel.deleteOne({_id: cId});

        if(!cartDeleted.deletedCount){
           return res.status(404).send({message: 'Cart not found'});
        };
        return res.status(200).send({message: 'Cart deleted'})
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'could not delete cart'})
    }
});


export default cartsRouter;
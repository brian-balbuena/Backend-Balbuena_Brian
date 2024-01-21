import { Router } from "express";
/* import CartManager from "../dao/managersFs/cartManager.js"; */
import { cartModel } from "../dao/models/carts.model.js";
import mongoose from "mongoose";
import { productModel } from "../dao/models/products.model.js";


const cartsRouter = Router();

/* const cartManager = new CartManager('./dao/db_Cart.json'); */

cartsRouter.get('/', async (req, res) => {
    /* const carts = await cartManager.getCarts();
    res.send(carts); */
    try {
        const carts = await cartModel.find();
        res.status(200).send({ carts });
    } catch (error) {
        console.error(error);
        res.status(404).send({ message: 'cart not found' });
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
        const cartId = await cartModel.findOne({ _id: cId }).populate('products.idProduct');
        res.status(200).send({ cartId });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Cart not found' })
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
        res.status(200).send({ message: 'Cart created' });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Could not create a cart' });
    }
});

cartsRouter.post('/:cId/product/:pId', async (req, res) => {

    const { cId, pId } = req.params;
   const { quantity = 1 } = req.body;

    /* const addProductToCart = await cartManager.addProductToCart(cId, pId); */

    /*  if(!addProductToCart){
         return res.status(400).send({message: 'error: product not added'});
     } */

    /* return res.send({message: 'product added to cart'}); */

    try {
        const cart = await cartModel.findOne({ _id: cId });

        if(!cart){
           return res.status(400).send({ message: 'Product not added' });
        }

        if (cart.products.length === 0) {
            cart.products.push({ idProduct: pId }, {quantity: quantity});

            await cart.save();
            return res.status(200).send({ message: 'Product added to cart' })
        }

        const productId = await productModel.findOne({_id: pId});
        if(!productId){
            return res.status(400).send({ message: 'Product not added' });
         }

        const productExists =  cart.products.find(p => p.idProduct.toString() === pId); 
        
        if (productExists != undefined) {
            
            const productoSuma = cart.products.find(product => product.idProduct.toString() === pId);
            productoSuma.quantity = productoSuma.quantity + quantity;
            await productExists.save();
        } else {

            cart.products.push({ idProduct: pId });
            const productoSuma = cart.products.find(product => product.idProduct.toString() === pId);
            productoSuma.quantity = productoSuma.quantity + quantity;
        }
 
        await cart.save();
        res.status(200).send({ message: 'Product added to cart' })
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Product not added' });
    }
});




cartsRouter.put('/:cId', async (req, res) =>{

    const { cId } = req.params;
    const cartBody = req.body;

    try {
        
        const cart = await cartModel.updateOne({_id: cId}, cartBody);
        if(cart.modifiedCount > 0){
            res.status(200).send({message: 'Cart updated'});
        }else{
            res.status(400).send({message: 'Could not update cart'});
        }

    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Could not update cart'});
    }

});

cartsRouter.put('/:cId/product/:pId', async (req, res) => {

    const { cId, pId } = req.params;
    const { quantity } = req.body;
    
    if(!quantity){
        console.log('1')
        return res.status(400).send({message: 'Not found'})
    }
    try {
    
        const cart = await cartModel.findOne({_id: cId});
        if(!cart){
            console.log('2')
            return res.status(400).send({message: 'Not found'})
        }

        const product = cart.products.find(p => p.idProduct.toString() === pId);
        if(!product){
            console.log('3')
            return res.status(400).send({message: 'Not found'})
        }

        product.quantity = quantity;
        await cart.save();
        return res.status(200).send({message: 'Product updated'})
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Could not update product'})
    }
})



cartsRouter.delete('/:cId', async (req, res) => {
    const { cId } = req.params;

    try {
        const cartdeleted = await cartModel.updateOne({_id: cId}, {
            products: []
        });

        if(cartdeleted.modifiedCount > 0){
            res.status(200).send({message: 'Product deleted'})

        }else{

          res.status(400).send({ message: 'could not delete product'})
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'could not delete product' })
    }
});

cartsRouter.delete('/:cId/product/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    

    try {
  
        if (!/^[0-9a-fA-F]{24}$/.test(pId) ||  !/^[0-9a-fA-F]{24}$/.test(cId)) {
            return res.status(400).send({ message: 'Invalid format' });
        };

        const objetCartId =  new mongoose.Types.ObjectId(cId);
        const objetProductId =  new mongoose.Types.ObjectId(pId);
  

        
        const cartDelete = await cartModel.updateOne({ _id: objetCartId }, {
            
            $pull: { products: {idProduct: objetProductId} }
        });

        if (cartDelete.modifiedCount > 0) {
            res.status(200).send({ message: 'Product deleted' });
        } else {
            console.log('1')
            res.status(400).send({ message: 'Could not deleted product' });
        }

    } catch (error) {
        console.log('2')
        console.error(error);
        res.status(400).send({ message: 'Could not deleted product' });
    }

})


export default cartsRouter;
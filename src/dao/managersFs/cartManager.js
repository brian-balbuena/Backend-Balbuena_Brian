import { json } from 'express';
import fs from 'fs';
import ProductManager from './productManager.js';

class CartManager {

    constructor(path) {
        this.path = path;
    };


    async addCart() {
       try {
        const carts = await this.getCarts();
        const idNew = await this.#assignId();

        carts.push({
         id: idNew,
         products: []
        });

        await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8');
        return true;

       } catch (error) {

        console.error(error);
        return false;

       }

    };

    async addProductToCart(cartId, productId){

        const cart = await this.getCartsById(+cartId);
        if(!cart){
            return false;
        }

        const productManager = new ProductManager('./db_Productos.json');
        const product = await productManager.getProductById(+productId);

        if(!product){
            return false;
        }

        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === +cartId);

        if(!cart.products.length){
            
            cart.products = [ {id: +productId, quantity: 1} ];
        }else{
            const existingProduct = cart.products.find(product => product.id === +productId);
            if(existingProduct){
                existingProduct.quantity = existingProduct.quantity + 1;
            }else{
                cart.products = [...cart.products, {id: +productId, quantity: 1}];
            }
        }

        try {
            carts[index] = cart;
            const productStrinify = JSON.stringify(carts);
            await fs.promises.writeFile(this.path, productStrinify);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        
    };

    async getCarts(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const dataArray = JSON.parse(data);

            return dataArray;

        } catch (error) {
            console.error(error);
            return [];
        }
    };

    async getCartsById(cartId){
        try {
            const data = await this.getCarts();
            const dataId = data.find(cart => cart.id === +cartId);

            if(!dataId){
                return false;

            }

            return dataId;

        } catch (error) {
            console.error(error);
            return false;
        }

    };

    async #assignId(){
        const data = await this.getCarts();

        if(data.length === 0){
            return 1;
        };
        const ultimoObj = data[data.length -1];
        const idUltimoObj = ultimoObj.id;

        const id = idUltimoObj + 1;
       
        return id;
    };
};

export default CartManager;

const test = async () => {

    const cartManager = new CartManager('./db_Cart.json');

    
    /* let add = await cartManager.addCart(); */

    /* let carts = await cartManager.getCarts();
    console.log(carts); */
};

test();
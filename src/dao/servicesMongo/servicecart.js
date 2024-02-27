import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import mongoose from "mongoose";


class ServiceCart {

    async getCartIdService(id) {
        try {

            const productsCart = await cartModel.findOne({ _id: id }).populate('products.idProduct');
            const productsRender = productsCart.products
            return {
                message: 'ok',
                status: (200),
                send: productsRender,
                products: productsRender
            }

        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'Cart not found' }) };
        }
    };

    async getCartService() {

        try {
            const carts = await cartModel.find();
            return { status: (200), send: ({ carts }) };
        } catch (error) {
            console.error(error);
            return { status: (404), send: ({ message: 'cart not found' }) };
        }
    };

    async createCartService() {
        try {
            await cartModel.createCart();
            return { status: (200), send: ({ message: 'Cart created' }) };
        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'Could not create a cart' }) };
        }

    };

    async addProductToCartService(cId, pId, quantity) {
        try {
            const cart = await cartModel.findOne({ _id: cId });

            if (!cart) {
                return { status: (400), send: ({ message: 'Product not added' }) };
            }

            if (cart.products.length === 0) {
                cart.products.push({ idProduct: pId, quantity: quantity });

                await cart.save();
                return { status: (200), send: ({ message: 'Product added to cart' }) };
            }

            const productId = await productModel.findOne({ _id: pId });
            if (!productId) {
                return { status: (400), send: ({ message: 'Product not added' }) };
            }


            const productExists = cart.products.some(p => p.idProduct.toString() === pId);

            if (productExists) {

                const productoSuma = cart.products.find(product => product.idProduct.toString() === pId);
                productoSuma.quantity = productoSuma.quantity + quantity;
            } else {

                cart.products.push({ idProduct: pId, quantity: quantity });

            }

            await cart.save();
            return { status: (200), send: ({ message: 'Product added to cart' }) };
        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'Product not added' }) };
        }
    };

    async editCartService(cId, cartBody) {
        try {

            const cart = await cartModel.updateOne({ _id: cId }, cartBody);
            if (cart.modifiedCount > 0) {
                return { status: (200), send: ({ message: 'Cart updated' }) };
            } else {
                return { status: (400), send: ({ message: 'Could not update cart' }) };
            }

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'Could not update cart' }) };
        }
    };

    async editProductToCartService(cId, pId, quantity) {

        if (!quantity) {
            return { status: (400), send: ({ message: 'Not found' }) };
        }
        try {

            const cart = await cartModel.findOne({ _id: cId });
            if (!cart) {
                return { status: (400), send: ({ message: 'Not found' }) };
            }

            const product = cart.products.find(p => p.idProduct.toString() === pId);
            if (!product) {
                return { status: (400), send: ({ message: 'Not found' }) };
            }

            product.quantity = quantity;
            await cart.save();
            return { status: (200), send: ({ message: 'Product updated' }) };
        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'Could not update product' }) };

        }
    };

    async deleteCartService(cId) {

        try {
            const cartdeleted = await cartModel.updateOne({ _id: cId }, {
                products: []
            });

            if (cartdeleted.modifiedCount > 0) {
                return { status: (200), send: ({ message: 'Product deleted' }) };

            } else {

                return { status: (400), send: ({ message: 'could not delete product' }) };
            }
        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'could not delete product' }) };
        }
    };

    async deleteProductToCartService(cId, pId) {

        try {

            if (!/^[0-9a-fA-F]{24}$/.test(pId) || !/^[0-9a-fA-F]{24}$/.test(cId)) {
                return { status: (400), send: ({ message: 'Invalid format' }) };
            };

            const objetCartId = new mongoose.Types.ObjectId(cId);
            const objetProductId = new mongoose.Types.ObjectId(pId);

            const cartDelete = await cartModel.updateOne({ _id: objetCartId }, {

                $pull: { products: { idProduct: objetProductId } }
            });

            if (cartDelete.modifiedCount > 0) {
                return { status: (200), send: ({ message: 'Product deleted' }) };
            } else {
                return { status: (400), send: ({ message: 'Could not deleted product' }) };
            }

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'Could not deleted product' }) };
        }
    };
}

export default ServiceCart;
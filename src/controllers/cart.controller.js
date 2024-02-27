import ServiceCart from "../dao/servicesMongo/servicecart.js";

const serviceCart = new ServiceCart();

export const getCartId = async (req, res) => {

    const { cId } = req.params;

    const productCart = await serviceCart.getCartIdService(cId);

    if (productCart.status === 200) {
        res.render('cart', productCart);
    } else {
        res.render('fail');
    }

};

export const getCartIdApi = async (req, res) => {

    const { cId } = req.params;

    const productCart = await serviceCart.getCartIdService(cId);

    return res.status(productCart.status).send(productCart.send);
};

export const getCartApi = async (req, res) => {

    const carts = await serviceCart.getCartService();

    return res.status(carts.status).send(carts.send);

};

export const createCartApi = async (req, res) => {

    const createCart = await serviceCart.createCartService();

    return res.status(createCart.status).send(createCart.send);

};

export const addProductToCartApi = async (req, res) => {

    const { cId, pId } = req.params;
    const { quantity = 1 } = req.body;

    const addProduct = await serviceCart.addProductToCartService(cId, pId, quantity);

    return res.status(addProduct.status).send(addProduct.send);

};

export const editCartApi = async (req, res) => {

    const { cId } = req.params;
    const cartBody = req.body;

    const editCart = await serviceCart.editCartService(cId, cartBody);

    return res.status(editCart.status).send(editCart.send);
};

export const editProductToCartApi = async (req, res) => {

    const { cId, pId } = req.params;
    const { quantity } = req.body;


    const editProduct = await serviceCart.editProductToCartService(cId, pId, quantity);

    return res.status(editProduct.status).send(editProduct.send);
};

export const deleteCartApi = async (req, res) => {

    const { cId } = req.params;
    const deleteCart = await serviceCart.deleteCartService(cId);

    return res.status(deleteCart.status).send(deleteCart.send);

};

export const deleteProductToCartApi = async (req, res) => {

    const { cId, pId } = req.params;

    const deleteProduct = await serviceCart.deleteProductToCartService(cId, pId);

    return res.status(deleteProduct.status).send(deleteProduct.send);

};
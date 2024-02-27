import { Router } from "express";
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";
import { getProduct } from "../controllers/product.controller.js";
import { getCartId } from "../controllers/cart.controller.js";

const viewRouters = Router();

viewRouters.get('/', checkAuth, getProduct);

viewRouters.get('/realTimeproducts', (req, res) => {
    res.render('realTimeProducts');

});

viewRouters.get('/createProduct', (req, res) => {
    res.render('createProduct');

});

viewRouters.get('/deleteProduct', (req, res) => {
    res.render('deleteProduct');

});

viewRouters.get('/chatLogin', (req, res) => {

    res.render('loginChat');

});

viewRouters.get('/chat', (req, res) => {

    const user = req.query;
    res.render('chat', user);

});

viewRouters.get('/products', checkAuth, getProduct);

viewRouters.get('/carts/:cId', getCartId);


viewRouters.get('/login', checkExistingUser, (req, res) => {

    res.render('login');
});
viewRouters.get('/faillogin', (req, res) => {
    res.render('failLogin');
})

viewRouters.get('/register', checkExistingUser, (req, res) => {

    res.render('register');
});
viewRouters.get('/failregister', (req, res) => {
    res.render('failRegister');
})

viewRouters.get('/current', checkAuth, (req, res) => {

    const { user } = req.session;

    res.render('current', user);
});

export default viewRouters;
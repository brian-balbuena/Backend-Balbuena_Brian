import { Router } from "express";
import { checkAuth, checkExistingUser, checkRolAdmin, checkRoleUser } from "../middlewares/auth.js";
import { getProduct } from "../controllers/product.controller.js";
import { getCartId } from "../controllers/cart.controller.js";
import { current } from "../controllers/session.controller.js";

const viewRouters = Router();

viewRouters.get('/',checkRoleUser , getProduct);

viewRouters.get('/realTimeproducts',checkRolAdmin, (req, res) => {
    res.render('realTimeProducts');

});

viewRouters.get('/createProduct',checkRolAdmin, (req, res) => {
    res.render('createProduct');

});

viewRouters.get('/deleteProduct',checkRolAdmin, (req, res) => {
    res.render('deleteProduct');

});

viewRouters.get('/chatLogin',checkRoleUser , (req, res) => {

    res.render('loginChat');

});

viewRouters.get('/chat',checkRoleUser, (req, res) => {

    const user = req.query;
    res.render('chat', user);

});

viewRouters.get('/products', checkRoleUser, getProduct);

viewRouters.get('/carts/:cId',checkRoleUser, getCartId);


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

viewRouters.get('/current', checkAuth, current);

export default viewRouters;
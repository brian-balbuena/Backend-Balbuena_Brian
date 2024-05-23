import { Router } from "express";
import { checkAuth, checkExistingUser, checkRolAdmin, checkRoleUser } from "../middlewares/auth.js";
import { getMokingProducts, getProduct } from "../controllers/product.controller.js";
import { getCartId } from "../controllers/cart.controller.js";
import { current } from "../controllers/session.controller.js";
import { getApiUsersData, getIdByEmail } from "../controllers/user.controller.js";

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
viewRouters.get('/fail', (req, res) =>  {
    res.render('failDeleteProduct');
});

viewRouters.get('/register', checkExistingUser, (req, res) => {

    res.render('register');
});
viewRouters.get('/failregister', (req, res) => {
    res.render('failRegister');
})

viewRouters.get('/restorePassword', (req, res) => {
    res.render('restorePassword');
})
viewRouters.get('/current', checkAuth, current);

viewRouters.get('/mockingproducts', getMokingProducts)

viewRouters.get('/uploader', (req, res) => {
    res.render('uploader');
})

viewRouters.get('/uploaderDocuments', checkRoleUser ,async (req, res) => {

    const userReq = req.session
    const user = userReq.user;

    const id = await getIdByEmail(user.email);
  
    res.render('uploaderDocuments', { user , id });
});

viewRouters.get('/uploaderProduct', checkRoleUser, async (req, res) => {
    const userReq = req.session
    const user = userReq.user;

    const id = await getIdByEmail(user.email);

    res.render('uploaderProduct', { user, id })

});

viewRouters.get('/changeToPremium', checkRoleUser, async (req, res) => {
    const userReq = req.session
    const user = userReq.user;

    const id = await getIdByEmail(user.email);

    res.render('changeToPremium', { user, id })

});

/************ENTEGA FINAL *********** */

viewRouters.get('/manageUsers', checkRolAdmin, async (req, res) =>{

    const users = await getApiUsersData();
    res.render('manageUsers', { users })
})
/* *************************************** */
export default viewRouters;
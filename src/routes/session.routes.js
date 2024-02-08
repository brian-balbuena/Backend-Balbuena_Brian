import { Router } from "express";
import SessionManagerMongo from "../dao/managersMongo/sessionManagerMongo.js";
import passport from "passport";

const sessionRoutes = Router();


sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };
    res.redirect('/products');
    /* res.status(201).send({ message: 'User to register' }); */



    /*     const { first_name, last_name, email, age, password } = req.body;
    
        try {
            const sessionManger = new SessionManagerMongo();
    
            const result = await sessionManger.register(first_name, last_name, email, age, password);
            
            req.session.user = result.user;
            res.redirect('/products');
    
    
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: 'Not found' })
        } */
});


sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: "/faillogin" }), async (req, res) => {

    if (!req.user) {
        return res.status(400).send({ message: 'Error witch credentials' });
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart
    };
    res.redirect('/products');



    /*  const { email, password } = req.body;

    try {
        const sessionManger = new SessionManagerMongo();

        const result = await sessionManger.loginValidation(email, password);

        if (result.status !== "ok") {
            return res.status(404).send({ message: 'Invalid credentials' })
        }

        req.session.user = result.user;
        res.redirect('/products');

    } catch (error) {
        console.error(error);
        res.status(400).send({ error });
    } */

});

sessionRoutes.get('/github', passport.authenticate('github', { scope: ["user:email"] }), (req, res) => {

});

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {

    req.session.user = req.user;
    res.redirect('/products')
});

sessionRoutes.post('/logout', async (req, res) => {

    try {
        await new Promise((resolve, reject) => {
            req.session.destroy((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        res.send({ redirect: 'http://localhost:8080/login' });

    } catch (error) {
        res.status(400).send({ error });
    }
});



export default sessionRoutes;
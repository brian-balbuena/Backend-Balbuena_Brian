import { Router } from "express";
import passport from "passport";
import { logoutSession, restorePassword, sessionLog } from "../controllers/session.controller.js";

const sessionRoutes = Router();


sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), sessionLog);


sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: "/faillogin" }), sessionLog);

sessionRoutes.get('/github', passport.authenticate('github', { scope: ["user:email"] }), (req, res) => {

});

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {

    req.session.user = req.user;
    res.redirect('/products')
});

sessionRoutes.post('/logout', logoutSession);

sessionRoutes.post('/restorePassword', restorePassword)


export default sessionRoutes;
import { idVerification } from "../controllers/product.controller.js";

export const checkAuth = (req, res, next) => {
console.log('entra', req.session.user)
    if (!req.session.user) {
        return res.redirect('/login')
    }
    next();
};

export const checkExistingUser = (req, res, next) => {

    if (req.session.user) {
        return res.redirect('/products')
    }
    next();
}

export const checkRoleUser = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/login')
    } if (req.session.user.role === 'admin' ) {
        return res.redirect('/createProduct');
    }
    next();
};

export const checkRolAdmin = async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    } if (req.session.user.role === 'usuario') {
        return res.redirect('/products');
    }

    next();
};

export const checkRolPremium = async (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/login')
    }if (req.session.user.role === 'premium') {
        const { pId } = req.params;
        if (pId) {
            const verification = await idVerification(pId, req.session.user)
            if (!verification) {
                return res.send({ message: 'solo puedes modificar tus productos' })
            }
        }
    }
    next();
};
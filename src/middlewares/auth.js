export const checkAuth = (req, res, next) => {

    if(!req.session.user){
        return res.redirect('/login')
    }
    next();
};

export const checkExistingUser = ( req, res, next) => {

    if(req.session.user){
        return res.redirect('/products')
    }
    next();
}

export const checkRoleUser = (req, res, next) => {

    if(!req.session.user){
        return res.redirect('/login')
    }if(req.session.user.role != 'usuario'){
        return res.redirect('/createProduct');
    }
    next();
};

export const checkRolAdmin = (req, res, next) => {

    if(!req.session.user){
        return res.redirect('/login')
    }if(req.session.user.role != 'admin'){
        return res.redirect('/products');
    }
    next();
};
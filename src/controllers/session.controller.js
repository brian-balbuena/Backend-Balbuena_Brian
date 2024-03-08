import UserDTO from "../dao/dtos/user.dto.js";



export const sessionLog = (req, res) => {

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role
    };

    if(req.session.user){
        return res.redirect('/products')
    }else {
        return res.redirect('/failregister')
    }
};

export const logoutSession = async (req, res) => {
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
};

export const current = (req, res) => {
    const { user } = req.session;
    const userDTO = new UserDTO(user);
    res.render('current', userDTO);
};
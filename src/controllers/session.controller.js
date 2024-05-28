import UserDTO from "../dao/dtos/user.dto.js";
import { userModel } from "../dao/models/user.model.js";
import ServiceUser from "../dao/servicesMongo/serviceuser.js";
import { createHash } from "../utils/bcrypt.js";

const serviceUser = new ServiceUser();

export const sessionLog = async (req, res) => {

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        documents: req.user.documents,
        last_connection: Date.now
    };

    if (req.session.user) {
        try {
            const newConnection = await serviceUser.updateLastConection(req.user.email);

        } catch (error) {
            console.error(error);
            return res.redirect('/failregister');
        }
        return res.redirect('/products');

    } else {

        return res.redirect('/failregister');
    }
};

export const logoutSession = async (req, res) => {
    try {
        const port = process.env.PORT;
        await new Promise((resolve, reject) => {
            req.session.destroy((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });



        await serviceUser.updateLastConection(req.user.email);


        res.send({ redirect: `http://localhost:${port}/login` });

    } catch (error) {
        res.status(400).send({ error });
    }
};

export const current = (req, res) => {
    const { user } = req.session;
    const userDTO = new UserDTO(user);
    
    res.render('current', userDTO);
};

export const restorePassword = async (req, res) => {

    const { email, password } = req.body;
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Unautorized' });
        }
        user.password = createHash(password);
        await user.save();
        res.send({ message: 'password update' })
    } catch (error) {
        console.error(error);
        return res.status(404).send({ message: 'restored not found' });
    }

};
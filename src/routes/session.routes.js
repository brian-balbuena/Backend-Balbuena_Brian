import { Router } from "express";
import SessionManagerMongo from "../dao/managersMongo/sessionManagerMongo.js";

const sessionRoutes = Router();


sessionRoutes.post('/register', async (req, res) =>{

    const {first_name, last_name, email, age, password} = req.body;

    try {
        const sessionManger = new SessionManagerMongo();

        const result = await sessionManger.register(first_name, last_name, email, age, password);

        res.status(200).send({message: result.message});

    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'Not found'})
    }
});

sessionRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const sessionManger = new SessionManagerMongo();

        const result = await sessionManger.loginValidation(email, password);

        if(result.status !== "ok"){
            return res.status(404).send({message: 'Invalid credentials'})
        }

        req.session.user = result.user;
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(400).send({error});
    }

});



export default sessionRoutes;
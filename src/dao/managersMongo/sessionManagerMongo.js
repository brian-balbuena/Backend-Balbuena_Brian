import { createHash, isValidPassword } from "../../utils/bcrypt.js";
import { userModel } from "../models/user.model.js";

class SessionManagerMongo {

    async register (first_name, last_name, email, age, password){

        try {
           const user =  await userModel.create({
                first_name,
                last_name,
                email,
                age,
                email,
                password: createHash(password)
            })

            return {status: 'ok', message: 'User added', user: user};
        } catch (error) {
            console.error(error);
            return { status:'error', message: error}
        }

    };


    async loginValidation(email, password) {

        try {
            const response = {
                status: "ok",
                email: email,
                password: password,
                user: {}
            };
            const user = await userModel.findOne({email});

            if(!user) {
                response.status = "error"
                response.email = "error"
                return response;
            }

            if(!isValidPassword(user, password)){
                response.status = "error"
                response.password = "error"
                return response;
            }

            response.user = user;
            return response;

        } catch (error) {
            console.error(error);

            return  {
                status: "error",
                email: "error",
                password: "error"
            }
        }

    };

};

export default SessionManagerMongo;
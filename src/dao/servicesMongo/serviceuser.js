import { userModel } from "../models/user.model.js";


class ServiceUser {

    async updateUserService(uid) {
        try {
            const user = await userModel.findOne({ _id: uid });
            if (!user) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }

            let newRole = {};
            if (user.role === 'usuario') {
                newRole = {
                    role: "premium"
                };
            } else if (user.role === 'premium') {
                newRole = {
                    role: "usuario"
                }
            }

            const userUpdate = await userModel.updateOne({ _id: uid }, newRole);

            if (!userUpdate.modifiedCount) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }
            return { status: (200), send: ({ message: 'User updated' }) };
        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update user' }) };
        }
    }

    async idUser(email) {
        try {
            const user = await userModel.findOne({email: email})

            if (!user) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }

            return {status: 200, id: user._id.toString()};
        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update user' }) };
        }
    }

    async getUserbyemail(email){
        try {
            const user = await userModel.findOne({email});

            if(!user){
                return false;
            }
             
            return {
                user: user
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

export default ServiceUser;
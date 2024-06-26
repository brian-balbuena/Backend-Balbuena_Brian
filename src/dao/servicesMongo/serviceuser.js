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
    };

    async idUser(email) {
        try {
            const user = await userModel.findOne({ email: email })

            if (!user) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }

            return { status: 200, id: user._id.toString() };
        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update user' }) };
        }
    };

    async getUserbyemail(email) {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return false;
            }

            return {
                user: user
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    async updateLastConection(email) {
        try {
            const user = await this.getUserbyemail(email);
            if(!user.user){
                return { status: (404), send: ({ message: 'User not found' }) };
            }

            const newLastConection = {
                last_connection: Date.now()
            }
            const uid = user.user._id;
            const userUpdate = await userModel.updateOne({ _id: uid }, newLastConection);

            if (!userUpdate.modifiedCount) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }
            return { status: (200), send: ({ message: 'User updated' }) };

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update user' }) };
        }

    };

    /************ENTEGA FINAL *********** */

    async getUsers() {

        try {
            const users = await userModel.find();
            return { status: (200), send: ({ users }) };
        } catch (error) {
            console.error(error);
            return { status: (404), send: ({ message: 'users not found' }) };
        }
    };

    async deleteUsers(email) {
        try {
            const userDeleted = await userModel.deleteOne({ email: email })
 
            if (!userDeleted.deletedCount) {
                return {status:(404), send:({ message: 'user not found' })};
            };
            return {status:(200), send:({ message: 'user deleted' })};
        } catch (error) {
            console.error(error);
            return {status:(400), error: error, send:({ message: 'could not delete ' })};
        }
    };

    async updateRole(email, newRole) {

        try {
            
            const userUpdate = await userModel.updateOne({ email: email }, { $set: { role: newRole } });

            if (!userUpdate.modifiedCount) {
                return { status: (404), send: ({ message: 'User not found' }) };
            }
            return { status: (200), send: ({ message: 'User updated' }) };

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update user' }) };
        }
    };
    /**************************************** */
};

export default ServiceUser;
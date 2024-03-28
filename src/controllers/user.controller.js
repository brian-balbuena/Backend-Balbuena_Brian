import UserDTO from "../dao/dtos/user.dto.js";
import ServiceUser from "../dao/servicesMongo/serviceuser.js";

const serviceUser = new ServiceUser();

export const changeToRole = async (req, res) => {

    const { uid } = req.params;
/*     const { user } = req.session;
    const userDTO = new UserDTO(user);
    let newRole = {};
    console.log('user', user)
    if(user.role === 'usuario'){
        newRole = {
            role: "premium"
        };
    }else if(user.role === 'premium'){
        newRole = {
            role: "usuario"
        }
    }

    console.log('user', user.role)
    console.log('new role', newRole) */
    try {
        const updateRole = await serviceUser.updateUserService(uid)
        
        if(updateRole.status === 200) {
            res.render('products')
        
        }else{
            req.logger.error('user error');
            res.status(400).send({ message: 'cahnge to role not found' })
        }
    } catch (error) {
        console.log(error);
        req.logger.fatal('user error');
        res.status(400).send({ message: 'change role not found' })
    }


}

export const getIdByEmail = async (email) => {

    try {
        const idUser = await serviceUser.idUser(email);

        if(idUser.status !== 200){
            return false;
        }

        return idUser.id;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}
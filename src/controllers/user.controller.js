import UserDTO from "../dao/dtos/user.dto.js";
import ServiceUser from "../dao/servicesMongo/serviceuser.js";
import { sendMailSessionExpired } from "./mailiing.controller.js";

const serviceUser = new ServiceUser();

export const changeToRole = async (req, res) => {

    const { uid } = req.params;

    try {
        const updateRole = await serviceUser.updateUserService(uid)

        if (updateRole.status === 200) {
            return res.render('products')

        } else {
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

        if (idUser.status !== 200) {
            return false;
        }

        return idUser.id;

    } catch (error) {
        console.error(error);
        return false;
    }

};

export const uploaderFiles = async (req, res) => {

    try {
        const user = req.user;
        const profilesFile = req.files['profiles'];
        const productsFile = req.files['products'];
        const documentsFiles = req.files['documents'];


        if (profilesFile) {
            updateUserDocumentReference(user, 'profiles', profilesFile[0].path.split('public').join(''));
        }

        if (productsFile) {
            updateUserDocumentReference(user, 'products', productsFile[0].path.split('public').join(''));
        }

        if (documentsFiles) {
            documentsFiles.forEach(file => {
                updateUserDocumentReference(user, file.fieldname, file.path.split('public').join(''));
            });
        }
        await user.save();

        res.status(200).json({ message: 'Documentos subidos y usuario actualizado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Ocurrió un error al subir documentos y actualizar usuario.' });
    }

};

/************ENTEGA FINAL *********** */

export const getApiUsers = async (req, res) => {

    try {
        const usersApi = await serviceUser.getUsers();
        const users = usersApi.send.users

        const userDTOs = users.map(user => new UserDTO(user));

        res.status(200).send({ users: userDTOs });
    } catch (error) {
        console.error(error);
        res.status(404).send({ message: 'users not found' });
    }
};

export const deleteInactiveSession = async (req, res) => {
    try {
        const usersApi = await serviceUser.getUsers();
        const users = usersApi.send.users

        const twoDaysAgo = getTwoDaysAgo();

        const inactiveUsers = users.filter(user => {
            const lastConnectionDate = new Date(user.last_connection);
            return lastConnectionDate < twoDaysAgo;
        });

        if (inactiveUsers.length === 0) {
            return res.send({ message: 'No hay cuentas inactivas' })
        };

        const usersDelted = [];
        for (const user of inactiveUsers) {
            try {
                const deleteResult = await serviceUser.deleteUsers(user.email);
                usersDelted.push({ usuario: user.email, estado: deleteResult });
                await sendMailSessionExpired(user.email);
                console.log(`Usuario ${user.email} eliminado: `, deleteResult);
            } catch (error) {
                console.error(`Error eliminando el usuario ${user.email}: `, error);
            }
        }

        return res.send({ deletedUsers: usersDelted })
    } catch (error) {
        console.error(error)
    }
};

export const getApiUsersData = async () => {
    try {
        const usersApi = await serviceUser.getUsers();
    
        const users = usersApi.send.users;
        const userDTOs = users.map(user => new UserDTO(user));
        return userDTOs;
    } catch (error) {
        console.error(error);
    }
};

export const deleteUserByEmail = async (req, res) => {

    const { email } = req.params;

    try {
        const deleteResult = await serviceUser.deleteUsers(email);
        res.status(200).send({ message: 'ok'})
    } catch (error) {
        console.error(error)
    }

};

export const updateRole = async (req, res) => {

    try {
        const { email, newRole } = req.params;
        
        const update = await serviceUser.updateRole(email, newRole);
        res.status(200).send({ message: 'ok'})
    } catch (error) {
        console.error(error)
    }
};

function getTwoDaysAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return date;
}

/* *************************************** */

function updateUserDocumentReference(user, documentType, reference) {

    const documentIndex = user.documents.findIndex(doc => doc.name === documentType);

    if (documentIndex !== -1) {
        user.documents[documentIndex].reference = reference;
    };
}
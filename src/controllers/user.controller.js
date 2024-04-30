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

        if (updateRole.status === 200) {
            res.render('products')

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

function updateUserDocumentReference(user, documentType, reference) {

    const documentIndex = user.documents.findIndex(doc => doc.name === documentType);

    if (documentIndex !== -1) {
        user.documents[documentIndex].reference = reference;
    };
}
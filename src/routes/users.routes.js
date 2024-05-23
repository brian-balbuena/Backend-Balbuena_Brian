import { Router } from "express";
import { checkAuth, checkUploaderDocuments } from "../middlewares/auth.js";
import { changeToRole, deleteInactiveSession, deleteUserByEmail, getApiUsers, updateRole, uploaderFiles } from "../controllers/user.controller.js";
import { uploader } from "../utils/multer.js"

const userSRouter = Router();

userSRouter.post('/premium/:uid', checkUploaderDocuments, changeToRole);

userSRouter.post('/:uid/documents', uploader.fields([{name: 'profiles', maxCount: 1}, {name: 'products', maxCount: 1}, {name: 'documents', maxCount: 3}]), uploaderFiles);

/************ENTEGA FINAL *********** */

userSRouter.get('/', getApiUsers);
userSRouter.delete('/', deleteInactiveSession);
userSRouter.delete('/deleteUser/:email', deleteUserByEmail);
userSRouter.put('/updateRole/:email/:newRole', updateRole);
/* *************************************** */

export default userSRouter;
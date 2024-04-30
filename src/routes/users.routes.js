import { Router } from "express";
import { checkAuth, checkUploaderDocuments } from "../middlewares/auth.js";
import { changeToRole, uploaderFiles } from "../controllers/user.controller.js";
import { uploader } from "../utils/multer.js"

const userSRouter = Router();

userSRouter.post('/premium/:uid', checkUploaderDocuments, changeToRole);

userSRouter.post('/:uid/documents', uploader.fields([{name: 'profiles', maxCount: 1}, {name: 'products', maxCount: 1}, {name: 'documents', maxCount: 3}]), uploaderFiles);

export default userSRouter;
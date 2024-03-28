import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { changeToRole } from "../controllers/user.controller.js";

const userSRouter = Router();

userSRouter.put('/premium/:uid', changeToRole)

export default userSRouter;
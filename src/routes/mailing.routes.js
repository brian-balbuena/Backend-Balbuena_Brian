import { Router } from "express";
import { sendMail } from "../controllers/mailiing.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const mailingRouter = Router();


mailingRouter.get('/sendMail',checkAuth, sendMail);

export default mailingRouter;
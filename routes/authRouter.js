import { Router } from "express";
import * as authController from "../controllers/authController.js";
const authRouter = Router();

authRouter.get("/sign-up", authController.getSignUp);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

export default authRouter;

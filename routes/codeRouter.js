import { Router } from "express";
import * as codeController from "../controllers/codeController.js";
import { isAuth } from "../middleware/authMiddleware.js";
const codeRouter = Router();

codeRouter.get("/codes", isAuth, codeController.getEnterCode);
codeRouter.post("/codes", isAuth, codeController.postEnterCode);

export default codeRouter;

import { Router } from "express";
import * as codeController from "../controllers/codeController.js";
const codeRouter = Router();

codeRouter.get("/codes", codeController.getEnterCode);
codeRouter.post("/codes", codeController.postEnterCode);

export default codeRouter;

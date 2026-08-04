import { Router } from "express";
import * as codeController from "../controllers/codeController.js";
const codeRouter = Router();

codeRouter.get("/codes", codeController.getEnterCode);

export default codeRouter;

import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getIndex);

export default messageRouter;

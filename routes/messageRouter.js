import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getIndex);
messageRouter.get("/add-message", messageController.getAddMessage);

export default messageRouter;

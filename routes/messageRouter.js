import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getIndex);
messageRouter.get("/add-message", messageController.getAddMessage);
messageRouter.post("/add-message", messageController.postAddMessage);
messageRouter.post("/messages/:id/delete", messageController.deleteMessage);

export default messageRouter;

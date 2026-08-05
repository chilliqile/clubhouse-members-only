import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
import { isAuth, isAdmin } from "../middleware/authMiddleware.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getIndex);
messageRouter.get("/add-message", isAuth, messageController.getAddMessage);
messageRouter.post("/add-message", isAuth, messageController.postAddMessage);
messageRouter.post(
  "/messages/:id/delete",
  isAdmin,
  messageController.deleteMessage,
);

export default messageRouter;

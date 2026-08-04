import * as db from "../db/queries.js";
import { body, validationResult } from "express-validator";

export async function getIndex(req, res, next) {
  const isLoggedIn = req.user;
  if (isLoggedIn) {
    const messages = await db.getFullMessages();
    const isAdmin = await db.checkAdmin(req.user.id);
    res.render("index", {
      user: req.user,
      messages: messages,
      isAdmin: isAdmin,
    });
  } else {
    const messages = await db.getPreviewMessages();
    res.render("index", {
      user: null,
      messages: messages,
    });
  }
}

export function getAddMessage(req, res) {
  res.render("add-message");
}

const validateMessage = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("body").trim().notEmpty().withMessage("Message is required"),
];

export const postAddMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("add-message", {
        errors: errors.array(),
      });
    }

    try {
      const { title, body } = req.body;
      const userId = req.user.id;
      await db.addMessage(title, body, userId);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

export async function deleteMessage(req, res) {
  await db.deleteMessage(req.params.id);
  res.redirect("/");
}

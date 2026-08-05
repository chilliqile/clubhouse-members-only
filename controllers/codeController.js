import { body, validationResult } from "express-validator";
import * as db from "../db/queries.js";

export function getEnterCode(req, res) {
  res.render("code", {
    user: req.user,
  });
}

export const postEnterCode = [
  [body("code").trim().notEmpty().withMessage("Enter a code")],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("code", {
        errors: errors.array(),
      });
    }

    try {
      const { code } = req.body;
      let message;
      if (code === "UPGRADE") {
        const membership = await db.getMembership(req.user.id);
        if (membership === "Basic") {
          await db.upgradeMembership(req.user.id);
          message = "You have been promoted to GOLD membership";
        } else {
          message = "You already have GOLD membership";
        }
        res.render("code", {
          message: message,
          user: req.user,
        });
      } else if (code === "ADMIN") {
        const isAdmin = await db.checkAdmin(req.user.id);
        if (isAdmin) {
          message = "You are already an ADMIN";
        } else {
          await db.grantAdmin(req.user.id);
          message = "You are now an ADMIN";
        }
        res.render("code", {
          message: message,
          user: req.user,
        });
      } else {
        res.status(400).render("code", {
          errors: [{ msg: "Invalid code" }],
          user: req.user,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

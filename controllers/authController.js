import { body, validationResult, matchedData } from "express-validator";
import * as db from "../db/queries.js";
import bcrypt from "bcryptjs";
import passport from "passport";

export function getSignUp(req, res) {
  res.render("sign-up", {
    formData: {},
  });
}

const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name should only contain alphabets"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name should only contain alphabets"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),

  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("Confirm your password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const postSignUp = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const { first_name, last_name, username, password } = req.body;
      const usernameExists = await db.getUserByUsername(username);
      if (usernameExists) {
        return res.status(400).render("sign-up", {
          errors: [{ msg: "Username is already used" }],
          formData: req.body,
        });
      }

      const hash = await bcrypt.hash(password, 10);
      await db.addUser({ first_name, last_name, username, hash });
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },
];

export function getLogin(req, res) {
  res.render("login");
}

export const postLogin = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
];

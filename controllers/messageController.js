import * as db from "../db/queries.js";

export async function getIndex(req, res, next) {
  const isLoggedIn = req.user;
  if (isLoggedIn) {
    const messages = await db.getFullMessages();
    res.render("index", {
      user: req.user,
      messages: messages,
    });
  } else {
    const messages = await db.getPreviewMessages();
    res.render("index", {
      user: null,
      messages: messages,
    });
  }
}

export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).render("unauthorized");
  }
}

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).render("unauthorized");
  }
}

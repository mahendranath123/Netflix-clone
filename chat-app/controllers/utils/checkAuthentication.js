function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("req.isAuthenticated", req.isAuthenticated());
    next();
  } else {
    console.log("redirect");
    res.redirect("/sign-up");
  }
}

module.exports = checkAuthentication;

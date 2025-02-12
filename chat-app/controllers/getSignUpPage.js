const getSignUpPage = async (req, res) => {
  if (req.isAuthenticated()) res.redirect("/");
  else {
    const errors = req.session.signupErrors || [];
    req.session.signupErrors = null;
    res.render("sign-up", { errors: errors });
  }
};

module.exports = getSignUpPage;

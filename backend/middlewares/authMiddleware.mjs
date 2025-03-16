export const authVerification = (req, res, next) => {
  if (req.session.isAuthenticated) {
    console.log("User authenticated");
    next();
  } else {
    res.redirect("/register");
  }
};

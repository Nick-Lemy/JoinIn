export const authVerification = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const adminAuthVerification = (req, res, next) => {
  if (req.session.user.id === 1){
    return next()
  } else {
    return res.status(403).send(`<>This page is only for admin</>`)
  }
}
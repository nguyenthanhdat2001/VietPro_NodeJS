const checkLogin = (req, res, next) => {
  if (req.session.username && req.session.password) {
    return res.redirect("/admin/dashboard");
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.session.username || !req.session.password) {
    return res.redirect("/admin/login");
  }
  next();
};

module.exports = {
  checkLogin,
  checkAdmin,
};

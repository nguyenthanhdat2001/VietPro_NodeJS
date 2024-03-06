const UserModel = require("../models/user");

class AuthController {
  //[GET] admin/login
  getLogin(req, res) {
    res.render("admin/auth/login", { data: {} });
  }

  //[POST] admin/login
  async postLogin(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.find(req.body);
    let error = null;

    if (email.trim() == "" || password.trim() == "") {
      error = "Email va mat khau khong duoc bo trong";
    } else if (user.length > 0) {
      req.session.username = email;
      req.session.password = password;
      res.redirect("/admin/dashboard");
    } else {
      error = "Tai khoan mat khau khong chinh xac";
    }
    res.render("admin/auth/login", { data: { error } });
  }

  //[GET] admin/logout
  logout(req, res) {
    req.session.destroy();
    res.redirect("/admin/login");
  }
}

module.exports = new AuthController();

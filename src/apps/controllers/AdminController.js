const User = require("../models/user");
const Product = require("../models/product");
const Comment = require("../models/comments");

class AdminController {
  async index(req, res) {
    const user = await User.find({});
    const product = await Product.find({});
    const comment = await Comment.find({});

    res.render("admin/dashboard", {
      user: user.length,
      product: product.length,
      comment: comment.length,
    });
  }
}

module.exports = new AdminController();

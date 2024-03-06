const CategoryModel = require("../apps/models/category");

module.exports = async (req, res, next) => {
  res.locals.categories = await CategoryModel.find({});
  res.locals.totalCart = req.session.cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);
  next();
};

const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comments");
const paginate = require("../../common/paginate");
const transporter = require("../../common/transporter");
const formatter = require("../../common/formatter");

const config = require("config");
const ejs = require("ejs");
const path = require("path");

const moment = require("moment");
require("moment/locale/vi");

class SiteController {
  async index(req, res) {
    const featured = await ProductModel.find({
      featured: true,
      is_stock: true,
    })
      .sort({ _id: -1 })
      .limit(9);
    const latest = await ProductModel.find({
      is_stock: true,
    })
      .sort({ _id: -1 })
      .limit(9);
    res.render("site", { featured, latest, formatter });
  }

  async category(req, res) {
    const path = req.path;
    const query = req.query;
    const { id } = req.params;
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const total = await ProductModel.find({ cat_id: id }).countDocuments();
    const totalPages = Math.ceil(total / limit);

    const category = await CategoryModel.findById(id);
    const productCategory = await ProductModel.find({ cat_id: id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.render("site/category", {
      productCategory,
      category,
      totalProducts: total,
      path,
      page,
      formatter,
      query,
      totalPages,
      pages: paginate(page, totalPages),
    });
  }

  async product(req, res) {
    const path = req.path;
    const query = req.query;
    const { id } = req.params;
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const total = await CommentModel.find({ prd_id: id }).countDocuments();
    const totalPages = Math.ceil(total / limit);

    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({ prd_id: id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    res.render("site/product", {
      product,
      comments,
      path,
      formatter,
      page,
      query,
      totalPages,
      moment,
      pages: paginate(page, totalPages),
    });
  }

  async comment(req, res) {
    const { id } = req.params;
    const data = req.body;
    await CommentModel.create({ ...data, prd_id: id });
    res.redirect("back");
  }

  async search(req, res) {
    const path = req.path;
    const query = req.query;
    const { q } = req.query || "";
    const filter = {};
    filter.$text = { $search: q || "null" };

    const limit = 12;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const total = await ProductModel.find(filter).countDocuments();
    const totalPages = Math.ceil(total / limit);

    const products = await ProductModel.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    res.render("site/search", {
      products,
      keyword: q,
      page,
      path,
      query,
      total,
      pages: paginate(page, totalPages),
      totalPages,
    });
  }

  success(req, res) {
    res.render("site/success");
  }

  async addToCart(req, res) {
    const { id, qty } = req.body;
    const cart = req.session.cart;
    let isExist = false;
    cart.map((item) => {
      if (item.id === id) {
        isExist = true;
        item.qty += parseInt(qty);
      }
      return item;
    });
    if (!isExist) {
      const product = await ProductModel.findById(id);
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.thumbnail,
        qty: parseInt(qty),
      });
    }
    req.session.cart = cart;
    res.redirect("/cart");
  }

  cart(req, res) {
    const cart = req.session.cart;
    const total = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    res.render("site/cart", { cart, total, formatter });
  }

  updateCart(req, res) {
    const { products } = req.body;
    const cart = req.session.cart;
    cart.map((item) => {
      if (products[item.id]) {
        item.qty = parseInt(products[item.id]["qty"]);
      }
      return item;
    });
    req.session.cart = cart;
    res.redirect("/cart");
  }

  deleteCart(req, res) {
    const { id } = req.params;
    let cart = req.session.cart;
    cart = cart.filter((item) => item.id !== id);
    req.session.cart = cart;
    res.redirect("back");
  }

  async order(req, res) {
    const items = req.session.cart;
    const { name, phone, mail, address } = req.body;
    const viewPath = req.app.get("views");
    const html = await ejs.renderFile(
      path.join(viewPath, "site/sendMail.ejs"),
      { name, phone, address, mail, totalPrice: 0, items, formatter }
    );
    await transporter.sendMail({
      to: mail,
      from: "CellPhone S",
      subject: "Xác nhận đơn hàng từ CellPhone S",
      html,
    });
    req.session.cart = [];
    res.redirect("/success");
  }
}

module.exports = new SiteController();

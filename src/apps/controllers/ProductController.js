const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const slug = require("slug");
const fs = require("fs");
const path = require("path");

class ProductController {
  //[GET] /admin/products
  async index(req, res) {
    const path = req.baseUrl + req.path
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalPages = Math.ceil(
      (await ProductModel.find({}).countDocuments()) / limit
    );

    const products = await ProductModel.find({})
      .skip(skip)
      .limit(limit)
      .populate("cat_id")
      .sort({ _id: -1 });
    if (products) {
      res.render("admin/product/product", {
        products,
        path,
        page,
        totalPages,
        pages: paginate(page, totalPages),
      });
    } else {
      res.status(404).send("No products");
    }
  }
  //[GET] /admin/products/create
  async create(req, res) {
    const categories = await CategoryModel.find({});
    if (categories) {
      res.render("admin/product/add_product", {
        categories,
      });
    }
  }
  //[POST] /admin/products/create_post
  create_post(req, res) {
    const { body, file } = req;
    const product = {
      description: body.description,
      price: body.price,
      cat_id: body.cat_id,
      status: body.status,
      featured: body.featured == "on",
      promotion: body.promotion,
      accessories: body.accessories,
      name: body.name,
      warranty: body.warranty,
      is_stock: body.is_stock,
      slug: slug(body.name),
    };
    if (file) {
      const thumbnail = "products/" + file.originalname;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
      product["thumbnail"] = thumbnail;
      new ProductModel(product).save();
      res.redirect("/admin/products");
    }
  }

  async edit(req, res) {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const categories = await CategoryModel.find({});
    res.render("admin/product/edit_product", {
      product,
      categories,
    });
  }

  async update(req, res) {
    const id = req.params.id;
    const { body, file } = req;

    const product = {
      description: body.description,
      price: body.price,
      cat_id: body.cat_id,
      status: body.status,
      featured: body.featured == "on",
      promotion: body.promotion,
      accessories: body.accessories,
      name: body.name,
      warranty: body.warranty,
      is_stock: body.is_stock,
      slug: slug(body.name),
    };
    if (file) {
      const thumbnail = "products/" + file.originalname;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
      product["thumbnail"] = thumbnail;
    }
    await ProductModel.updateOne({ _id: id }, { $set: product });
    res.redirect("/admin/products");
  }

  async remove(req, res) {
    const id = req.params.id;
    const product = await ProductModel.deleteOne({ _id: id });
    if (product) {
      res.redirect("/admin/products");
    }
  }
}

module.exports = new ProductController();

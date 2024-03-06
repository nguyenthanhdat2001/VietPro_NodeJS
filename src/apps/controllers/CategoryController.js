const paginate = require("../../common/paginate");
const CategoryModel = require("../models/category");
const slug = require("slug");

class CategoryController {
  //[GET] /admin/categories
  async index(req, res) {
    const path = req.baseUrl + req.path;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page * limit - limit;
    const totalPages = Math.ceil(
      (await CategoryModel.find({}).countDocuments()) / limit
    );
    const categories = await CategoryModel.find({})
      .limit(limit)
      .skip(skip)
      .sort({ _id: -1 });
    res.render("admin/category/category", {
      categories,
      page,
      totalPages,
      path,
      pages: paginate(page, totalPages),
      data: {},
    });
  }

  //[GET] /admin/categories/create
  create(req, res) {
    res.render("admin/category/add_category", { data: {} });
  }

  // [POST] /admin/categories
  async createCategory(req, res) {
    const { title, description } = req.body;
    const isExist = await CategoryModel.find({ title });
    if (isExist.length > 0) {
      res.render("admin/category/add_category", {
        data: { error: "Danh mục đã tồn tại" },
      });
    } else {
      const data = { title, description, slug: slug(title) };
      await CategoryModel.create(data);
      res.redirect("/admin/categories");
    }
  }

  // [GET] /admin/categories/:id
  async edit(req, res) {
    const { id } = req.params;
    const category = await CategoryModel.findById({ _id: id });
    res.render("admin/category/edit_category", { category, data: {} });
  }

  // [POST] /admin/categories/:id
  async editCategory(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const data = { title, description, slug: slug(title) };
    let error = null;
    const category = await CategoryModel.find({ _id: id });
    if (category.length > 0) {
      error = `Tên danh mục "${title}" đã tồn tại`;
    } else {
      await CategoryModel.updateOne({ _id: id }, data);
      res.redirect("/admin/categories");
    }
    res.render("admin/category/edit_category", {
      category,
      data: { error },
    });
  }

  async remove(req, res) {
    const { id } = req.params;
    await CategoryModel.deleteOne({ _id: id });
    res.redirect("/admin/categories");
  }
}

module.exports = new CategoryController();

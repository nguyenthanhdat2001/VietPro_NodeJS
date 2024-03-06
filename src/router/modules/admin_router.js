const express = require("express");
const router = express.Router();

const Admin = require("../../apps/controllers/AdminController");
const Auth = require("../../apps/controllers/AuthController");
const Product = require("../../apps/controllers/ProductController");
const Category = require("../../apps/controllers/CategoryController");
const User = require("../../apps/controllers/UserController");

const AuthMiddleware = require("../../middleware/auth");
const UploadMiddleWare = require("../../middleware/upload");

//Admin authentication router
router.get("/dashboard", AuthMiddleware.checkAdmin, Admin.index);
router.get("/login", AuthMiddleware.checkLogin, Auth.getLogin);
router.post("/login", AuthMiddleware.checkLogin, Auth.postLogin);
router.get("/logout", AuthMiddleware.checkAdmin, Auth.logout);

//Admin product router
router.get("/products", AuthMiddleware.checkAdmin, Product.index);
router.get("/products/create", AuthMiddleware.checkAdmin, Product.create);
router.post(
  "/products/store",
  AuthMiddleware.checkAdmin,
  UploadMiddleWare.single("thumbnail"),
  Product.create_post
);
router.get("/products/:id/edit", AuthMiddleware.checkAdmin, Product.edit);
router.post(
  "/products/:id/update",
  AuthMiddleware.checkAdmin,
  UploadMiddleWare.single("thumbnail"),
  Product.update
);
router.get("/products/:id/delete", AuthMiddleware.checkAdmin, Product.remove);

//Admin category router
router.get("/categories", AuthMiddleware.checkAdmin, Category.index);
router.get("/categories/create", AuthMiddleware.checkAdmin, Category.create);
router.post("/categories/create", AuthMiddleware.checkAdmin, Category.createCategory);
router.get("/categories/:id", AuthMiddleware.checkAdmin, Category.edit);
router.post("/categories/:id", AuthMiddleware.checkAdmin, Category.editCategory);
router.get("/categories/:id/delete", AuthMiddleware.checkAdmin, Category.remove);

//Admin user router
router.get("/users", AuthMiddleware.checkAdmin, User.index);

module.exports = router;

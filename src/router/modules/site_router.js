const express = require("express");
const router = express.Router();

const SiteController = require("../../apps/controllers/SiteController");

router.get("/", SiteController.index);
router.get("/product/:slug/:id", SiteController.product);
router.post("/product/:slug/:id", SiteController.comment);
router.get("/category/:slug/:id", SiteController.category);
router.get("/search", SiteController.search);
router.get("/success", SiteController.success);
router.get("/cart", SiteController.cart);
router.post("/addToCart", SiteController.addToCart);
router.post("/cart", SiteController.updateCart);
router.get("/deleteCart/:id", SiteController.deleteCart);
router.post('/order', SiteController.order)

module.exports = router;

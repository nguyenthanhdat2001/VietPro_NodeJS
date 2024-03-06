const AdminRouter = require("./modules/admin_router");
const TestRouter = require("./modules/test_router");
const SiteRouter = require("./modules/site_router");

function router(app) {
  app.use("/admin", AdminRouter);
  app.use("/", SiteRouter);
  app.use("/test", TestRouter);
}

module.exports = router;

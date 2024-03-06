const express = require("express");
const config = require("config");
const session = require("express-session");
const app = express();

//Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: config.get("app.session_key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//nhan du lieu tu form
app.use(express.urlencoded({ extended: true }));
//nhan du lieu tu json file
app.use(express.json());

//static file
app.use("/public", express.static(config.get("app.public_folder")));

//View engine
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

//middleware share
app.use(require("./middleware/cart"));
app.use(require("./middleware/share"));

//router
const router = require(config.get("app.router"));
router(app);

module.exports = app;

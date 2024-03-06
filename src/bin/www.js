// import app from '../app.js'
const app = require("../app");
const config = require("config");

const server = app.listen((port = config.get("app.port")), () => {
  console.log(`App listening on port ${port}`);
});

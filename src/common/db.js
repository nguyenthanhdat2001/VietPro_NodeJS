const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect("mongodb://127.0.0.1:27017/vietpro_shop");
  console.log("Connect success");
  return mongoose;
};

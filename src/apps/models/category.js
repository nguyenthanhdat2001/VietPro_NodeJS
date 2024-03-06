const mongoose = require("../../common/db")();

const categorySchema = mongoose.Schema(
  {
    description: { type: String, default: null },
    title: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema, "categories");

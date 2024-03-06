const mongoose = require("../../common/db")();

const commentSchema = mongoose.Schema(
   {
      email: { type: String, required: true },
      prd_id: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
      body: { type: String, required: true },
      full_name: { type: String, required: true },
      status: { type: Boolean, default: false },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Comment", commentSchema, "comments");

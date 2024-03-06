const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
   {
      user_id: { type: mongoose.Types.ObjectId, ref: "User" },
      name: { type: String, require: true },
      city: { type: String },
      address: { type: String, require: true },
      total_price: { type: Number },
   },
   {
      timestamp: true,
   }
);

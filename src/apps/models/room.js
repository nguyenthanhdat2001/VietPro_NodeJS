const mongoose = require("../../common/db")();

const roomSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    type: { type: Boolean, default: true },
    users: [{ type: mongoose.Types.ObjectId, require: true, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema, "rooms");

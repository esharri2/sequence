const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  sequences: [{ type: Schema.Types.ObjectId, ref: "Sequence" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;

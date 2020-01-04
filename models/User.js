const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  homes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Home"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;

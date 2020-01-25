const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
  title: { type: String, required: true },
  actions: [
    {
      title: { type: String },
      duration: { type: Number }
    }
  ]
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = Sequence;

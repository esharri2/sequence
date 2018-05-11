const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
    title: { type: String, required: true },
    actions: [{ actionTitle: String, duration: Number }]
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = Sequence;

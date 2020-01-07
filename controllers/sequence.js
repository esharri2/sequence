const db = require("../models");

module.exports = {
  getSequence: async (req, res) => {
    try {
      const sequence = await db.Sequence.findOne({ _id: req.query.id });
      console.log(sequence);
      res.json(sequence);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  saveSequence: async (req, res) => {
    console.log("imma save");
    console.log(req.body);
    try {
      const sequence = await db.Sequence.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new: true, upsert: true }
      );
      res.send(sequence);
    } catch (error) {}
  }
};

const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  getAllSequences: async (req, res) => {
    try {
      const response = await db.User.findOne({
        email: req.query.email,
      }).populate("sequences");
      response.sequences.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA > titleB) {
          return 1;
        } else if (titleA < titleB) {
          return -1;
        }
        return 0;
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(422).json(error);
    }
  },
  getSequence: async (req, res) => {
    try {
      const sequence = await db.Sequence.findOne({ _id: req.query._id });
      res.json(sequence);
    } catch (error) {
      console.error(error);
      res.status(422).json(error);
    }
  },
  deleteSequence: async (req, res) => {
    try {
      await db.Sequence.deleteOne({ _id: req.body._id });
      res.send(true);
    } catch (error) {
      console.error(error);
      res.status(422).json(error);
    }
  },
  saveSequence: async (req, res) => {
    console.log("saving sequence...");
    console.log(req.user);
    console.log(req.body);
    const { _id: postedId, title, actions } = req.body;
    const isNew = !postedId;
    const _id = postedId || mongoose.Types.ObjectId();
    try {
      const sequence = await db.Sequence.findOneAndUpdate(
        { _id },
        { $set: { title, actions } },
        { new: true, upsert: true }
      );
      if (isNew) {
        const user = await db.User.findOne({ email: req.user.email });
        user.sequences.push(sequence._id);
        await user.save();
      }
      res.send(sequence);
    } catch (error) {
      console.error(error);
      res.status(422).json(error);
    }
  },
};

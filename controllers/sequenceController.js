const db = require("../models");

module.exports = {
    getSequences: (userId, res) => {
        db.User.findOne({ userId: userId }).populate("sequences").then(sequences => {
            res.json(sequences);
        }).catch(console.error)
    },
    getSequence: (id, res) => {
        db.Sequence.findOne({ _id: id }).then(sequence => {
            res.json(sequence);
        })
    },

    saveSequence: (userId, sequence, res) => {
        db.Sequence.create(sequence).then(sequence => {
            db.User.findOneAndUpdate(
                { userId: userId },
                { $push: { sequences: sequence } },
                { new: true }
            ).then(data => res.json({ id: data._id }))
                .catch(console.error)
        })
    },

    updateSequence: (sequenceId, sequence, res) => {
        console.log(sequenceId, sequence)
        db.Sequence.update(
            { _id: sequenceId },
            { $set: { sequence: sequence } }
        ).then(() => res.sendStatus(200))
            .catch(console.error)
    }
}
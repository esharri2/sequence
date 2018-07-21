const db = require("../models");

module.exports = {
    getSequences: (userId, res) => {
        db.User.findOne({ userId: userId }).populate("sequences")
            .then(sequences => {
                res.json(sequences);
            })
            .catch(console.error)
    },
    getSequence: (id, res) => {
        db.Sequence.findOne({ _id: id })
            .then(sequence => {
                res.json(sequence);
            })
            .catch(console.error)
    },

    saveSequence: (userId, sequence, res) => {        
        !sequence.title ? sequence.title = "Untitled" : null;        
        db.Sequence.create(sequence).then(sequence => {
            db.User.findOneAndUpdate(
                { userId: userId },
                { $push: { sequences: sequence } },
                { new: true }
            )
                .then(() => res.json({ id: sequence._id }))
                .catch(console.error)
        })
    },

    deleteSequence: (id, res) => {
        db.Sequence.deleteOne({ _id: id })
            .then(data => res.json(data))
            .catch(console.error)
    },

    updateSequence: (id, sequence, res) => {
        const { title, actions } = sequence;
        db.Sequence.update(
            { _id: id },
            { $set: { title, actions } }
        )
            .then((data) => {
                res.sendStatus(200)
            })
            .catch(console.error)
    }
}
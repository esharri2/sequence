const db = require("../models");

module.exports = {
    saveSequence: (userId, sequence) => {

        //if sequence id is null...
        db.User.findOneAndUpdate(
            { userId: userId },
            { $push: { sequences: sequence } }
        )

        //if sequence
    },

    updateSequence: (userId, sequence) => {
     //https://stackoverflow.com/questions/13460765/findone-subdocument-in-mongoose   
    }
}
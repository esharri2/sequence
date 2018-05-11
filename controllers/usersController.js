const db = require("../models");

module.exports = {
    findUser: (user) => {
        db.User.findOne({ userId: user.userId }).then(user => {
            return user;
        })
    },
    createUser: (user) => {
        db.User.create(user).then(user => {
            return user;
        })
    },

    findOrCreateUser: (user) => {
        db.User.findOne({ userId: user.userId }).then(data => {
            if (!data) {
                db.User.create(user).then(user => {
                    return user
                })
            } else {
                return user
            }
        })
    }
}
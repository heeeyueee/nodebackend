const User = require('../models/user.model.js');


exports.checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "用户名已被使用" });
            return;
        }

        next();
    });
};




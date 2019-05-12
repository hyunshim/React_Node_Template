const User = require('../models/user');
const mongoose = require('mongoose');
const selectFields = '';

exports.get_all_users = (req, res, next) => {
    User.find()
        .select(selectFields)
        .exec()
        .then(users => {
            const response = {
                user: users.map(user => {
                    return {
                        name: user.name,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: error })
        });
}
const User = require('../models/user');
const mongoose = require('mongoose');
const selectFields = '_id name';

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
            res.status(500).json({ message: `Unable to GET all users`, error: error })
        });
}

exports.get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findOne({ _id: id })
        .select(selectFields)
        .exec()
        .then(user => {
            const response = {
                user: user
            }
            res.status(200).json(response);
        })
        .catch(error => { res.status(500).json({ message: `Unable to GET user of id '${id}'`, error: error }) })
}


exports.create_user = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    user.save().then(user => {
        const response = {
            message: `Created user of id '${user._id}' successfully`,
            user: user
        }
        res.status(201).json({response});
    })
    .catch(error => { res.status(500).json({ message: `Unable to get CREATE user of id '${id}'`, error: error }) })
}

exports.delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.findOneAndDelete({ _id: id })
        .select(selectFields)
        .exec()
        .then(user => {
            const response = {
                message: `Deleted user of id '${user._id}' successfully`
            }
            res.status(200).json({ response })
        })
        .catch(error => { res.status(500).json({ message: `Unable to DELETE user of id '${id}'`, error: error }) })
}
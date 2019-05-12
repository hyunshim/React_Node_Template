const express = require('express');
const router = express.Router();


const UsersController = require('../controllers/users');

router.get('/', UsersController.get_all_users);

module.exports = router;
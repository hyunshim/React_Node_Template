const express = require('express');
const router = express.Router();


const UsersController = require('../controllers/users');

router.get('/', UsersController.get_all_users);
router.get('/:userId', UsersController.get_user);
router.post('/', UsersController.create_user);

module.exports = router;